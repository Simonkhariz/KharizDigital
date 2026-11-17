import { TODAY, accounts, cards, initialBudgets, initialTransactions } from "../../data/bank";
import type { Account, AccountId, BudgetId, CardId, CategoryId, Transaction } from "../../data/bank";

export type View = "overview" | "accounts" | "transactions" | "budgets" | "cards";

export type Filters = { query: string; category: CategoryId | "all"; account: AccountId | "all"; flow: "all" | "in" | "out" };

export type Recipient = { kind: "payee"; name: string; account: string } | { kind: "own"; id: AccountId };

export type Transfer = { from: AccountId; to: Recipient; amount: number; note: string };

export type CardControls = { frozen: boolean; online: boolean; contactless: boolean; cash: boolean };

export type BankState = {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Record<BudgetId, number>;
  cards: Record<CardId, CardControls>;
  /** Count of payments made this session; used to build references. */
  sent: number;
};

export type BankAction =
  | { type: "setBudget"; id: BudgetId; value: number }
  | { type: "resetBudgets" }
  | { type: "send"; transfer: Transfer }
  | { type: "setCard"; id: CardId; key: keyof CardControls; value: boolean };

export const initialState: BankState = {
  accounts,
  transactions: initialTransactions,
  budgets: initialBudgets,
  cards: Object.fromEntries(cards.map((card) => [card.id, { frozen: false, online: true, contactless: true, cash: card.id === "metal" }])) as Record<
    CardId,
    CardControls
  >,
  sent: 0,
};

export const emptyFilters: Filters = { query: "", category: "all", account: "all", flow: "all" };

export const BUDGET_MAX = 5000;
export const TRANSFER_MAX = 10000;

export function paymentReference(count: number): string {
  return `DN-${String(4100 + count).padStart(6, "0")}`;
}

const round = (value: number) => Math.round(value * 100) / 100;

export function bankReducer(state: BankState, action: BankAction): BankState {
  switch (action.type) {
    case "setBudget":
      return { ...state, budgets: { ...state.budgets, [action.id]: Math.min(BUDGET_MAX, Math.max(0, Math.round(action.value))) } };
    case "resetBudgets":
      return { ...state, budgets: initialBudgets };
    case "setCard":
      return { ...state, cards: { ...state.cards, [action.id]: { ...state.cards[action.id], [action.key]: action.value } } };
    case "send": {
      const { from, to, amount, note } = action.transfer;
      const sent = state.sent + 1;
      const reference = paymentReference(sent);
      const source = state.accounts.find((account) => account.id === from);
      const target = to.kind === "own" ? state.accounts.find((account) => account.id === to.id) : undefined;
      const entries: Transaction[] = [
        {
          id: `sent-${sent}`,
          date: TODAY,
          payee: target ? `To ${target.name}` : to.kind === "payee" ? to.name : "",
          note: note || (target ? "Move between accounts" : "Payment"),
          category: "transfers",
          account: from,
          amount: -amount,
          internal: Boolean(target),
          reference,
        },
      ];
      if (target && source) {
        entries.push({
          id: `recv-${sent}`,
          date: TODAY,
          payee: `From ${source.name}`,
          note: note || "Move between accounts",
          category: "transfers",
          account: target.id,
          amount,
          internal: true,
          reference,
        });
      }
      return {
        ...state,
        sent,
        accounts: state.accounts.map((account) => {
          if (account.id === from) return { ...account, balance: round(account.balance - amount) };
          if (target && account.id === target.id) return { ...account, balance: round(account.balance + amount) };
          return account;
        }),
        transactions: [...entries, ...state.transactions],
      };
    }
  }
}
