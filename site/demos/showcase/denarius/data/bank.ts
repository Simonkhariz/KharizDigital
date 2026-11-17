/** Demonstration data for the Denarius web app. Everything here is invented and lives in memory only. */

export type AccountId = "everyday" | "savings" | "travel";

export type Account = {
  id: AccountId;
  name: string;
  kind: string;
  detail: string;
  number: string;
  sort: string;
  balance: number;
};

export type CategoryId =
  | "groceries"
  | "dining"
  | "transport"
  | "housing"
  | "subscriptions"
  | "shopping"
  | "health"
  | "transfers"
  | "income";

export type Category = { id: CategoryId; label: string; color: string };

export type Transaction = {
  id: string;
  /** ISO date. */
  date: string;
  payee: string;
  note?: string;
  category: CategoryId;
  account: AccountId;
  /** Negative for money out, positive for money in. */
  amount: number;
  /** Money moved between the member's own accounts: not spending, not income. */
  internal?: boolean;
  reference?: string;
};

export type Payee = { id: string; name: string; account: string; last: string };

export type CardId = "metal" | "virtual";

export type BankCardInfo = {
  id: CardId;
  name: string;
  kind: string;
  last4: string;
  expiry: string;
  account: AccountId;
  limit: number;
};

/** The demo runs on a fixed day so the figures never drift. */
export const TODAY = "2026-11-16";
export const MONTH_LABEL = "November 2026";
export const MONTH_SHORT = "Nov";
export const DAYS_LEFT = 14;

export const accounts: Account[] = [
  { id: "everyday", name: "Everyday account", kind: "Current", detail: "Salary and card payments", number: "•• 4821", sort: "20-41-08", balance: 8420.16 },
  { id: "savings", name: "Savings vault", kind: "Savings", detail: "3.1% AER, paid monthly", number: "•• 7730", sort: "20-41-08", balance: 31860.93 },
  { id: "travel", name: "Travel pot", kind: "Pot", detail: "Goal: $7,500 by June", number: "•• 1196", sort: "20-41-08", balance: 5000 },
];

/** Champagne, stone and graphite: one family, told apart by lightness and by the legend labels. */
export const categories: Category[] = [
  { id: "housing", label: "Housing", color: "#d4c7be" },
  { id: "groceries", label: "Groceries", color: "#ffffff" },
  { id: "shopping", label: "Shopping", color: "#a08a78" },
  { id: "dining", label: "Dining", color: "#9c9c9c" },
  { id: "health", label: "Health", color: "#bcae9f" },
  { id: "transport", label: "Transport", color: "#75675b" },
  { id: "subscriptions", label: "Subscriptions", color: "#646464" },
  { id: "transfers", label: "Transfers", color: "#3d3d3d" },
  { id: "income", label: "Income", color: "#5fe3a1" },
];

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, Category>;

export type BudgetId = Exclude<CategoryId, "transfers" | "income">;

export const initialBudgets: Record<BudgetId, number> = {
  housing: 1650,
  groceries: 520,
  shopping: 150,
  dining: 260,
  health: 120,
  transport: 180,
  subscriptions: 70,
};

export const budgetOrder = Object.keys(initialBudgets) as BudgetId[];

export const payees: Payee[] = [
  { id: "p1", name: "Alder Court Lettings", account: "40127734", last: "Rent, 2 Nov" },
  { id: "p2", name: "Studio Kessel", account: "20984415", last: "Never paid" },
  { id: "p3", name: "Flat kitty", account: "77310026", last: "$60.00, 18 Oct" },
];

export const cards: BankCardInfo[] = [
  { id: "metal", name: "Denarius Metal", kind: "Physical card", last4: "4821", expiry: "09/29", account: "everyday", limit: 2000 },
  { id: "virtual", name: "Online card", kind: "Virtual card", last4: "9034", expiry: "02/28", account: "everyday", limit: 500 },
];

/** Which card each card payment was made with. Bills and transfers are not card payments. */
export const cardOfTransaction: Record<string, CardId> = {
  t1: "metal",
  t2: "metal",
  t3: "metal",
  t4: "metal",
  t5: "virtual",
  t6: "virtual",
  t7: "metal",
  t8: "metal",
  t9: "metal",
  t10: "virtual",
  t11: "metal",
  t13: "metal",
  t14: "virtual",
  t15: "metal",
  t20: "virtual",
};

const tx = (id: number, day: string, payee: string, category: CategoryId, amount: number, note?: string, account: AccountId = "everyday"): Transaction => ({
  id: `t${id}`,
  date: `2026-11-${day}`,
  payee,
  category,
  amount,
  note,
  account,
  reference: `DN-${String(3000 + id * 7).padStart(6, "0")}`,
});

export const initialTransactions: Transaction[] = [
  tx(1, "14", "Marlowe Market", "groceries", -84.32, "Weekly shop"),
  tx(2, "14", "Tram pass top-up", "transport", -30),
  tx(3, "13", "Osteria Lunetta", "dining", -46.8, "Dinner for two"),
  tx(4, "12", "Fernhill Pharmacy", "health", -18.45),
  tx(5, "12", "Loomstream", "subscriptions", -12.99, "Monthly plan"),
  tx(6, "10", "Halden Outfitters", "shopping", -129, "Winter coat"),
  tx(7, "09", "Marlowe Market", "groceries", -62.17),
  tx(8, "08", "Cafe Brisa", "dining", -9.6),
  tx(9, "07", "City cycle hire", "transport", -14.5),
  tx(10, "06", "Pagewise Books", "shopping", -34.2),
  tx(11, "05", "Corner Greengrocer", "groceries", -27.85),
  tx(12, "05", "Studio Kessel", "income", 1850, "Invoice 114"),
  tx(13, "04", "Quartz Gym", "health", -39, "Membership"),
  tx(14, "03", "Tonewell Music", "subscriptions", -10.99),
  tx(15, "03", "Noodle Bar Sato", "dining", -23.4),
  tx(16, "02", "Rent, Alder Court", "housing", -1450),
  tx(17, "02", "Power and water", "housing", -96.3),
  tx(18, "01", "Salary, Brightwater Studio", "income", 4200),
  tx(19, "01", "Fibre broadband", "housing", -42),
  tx(20, "01", "Cloud storage", "subscriptions", -2.99),
  tx(21, "01", "Monthly interest", "income", 81.2, "Savings vault", "savings"),
];

/** Money out in the six months before the demonstration month. November is worked out from the transactions. */
export const spendingHistory: { month: string; total: number }[] = [
  { month: "May", total: 3120.4 },
  { month: "Jun", total: 2890.15 },
  { month: "Jul", total: 3410.02 },
  { month: "Aug", total: 2760.88 },
  { month: "Sep", total: 3015.6 },
  { month: "Oct", total: 3248.31 },
];

export const scheduled = [
  { id: "s1", payee: "Quartz Gym", date: "2026-11-18", amount: 39, category: "health" as CategoryId },
  { id: "s2", payee: "Savings vault", date: "2026-11-25", amount: 400, category: "transfers" as CategoryId },
  { id: "s3", payee: "Rent, Alder Court", date: "2026-12-02", amount: 1450, category: "housing" as CategoryId },
];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dayLabel(date: string): string {
  if (date === TODAY) return "Today";
  const [, month, day] = date.split("-").map(Number);
  return `${day} ${monthNames[month - 1]}`;
}

const round = (value: number) => Math.round(value * 100) / 100;

/** Money out per category, as positive numbers. Moves between own accounts are left out. */
export function spendByCategory(transactions: Transaction[]): Record<CategoryId, number> {
  const totals = Object.fromEntries(categories.map((category) => [category.id, 0])) as Record<CategoryId, number>;
  for (const item of transactions) {
    if (item.amount < 0 && !item.internal) totals[item.category] = round(totals[item.category] - item.amount);
  }
  return totals;
}

export function monthTotals(transactions: Transaction[]): { moneyIn: number; moneyOut: number } {
  let moneyIn = 0;
  let moneyOut = 0;
  for (const item of transactions) {
    if (item.internal) continue;
    if (item.amount > 0) moneyIn += item.amount;
    else moneyOut -= item.amount;
  }
  return { moneyIn: round(moneyIn), moneyOut: round(moneyOut) };
}

export function cardSpend(transactions: Transaction[], card: CardId): number {
  return round(transactions.reduce((sum, item) => (cardOfTransaction[item.id] === card ? sum - item.amount : sum), 0));
}
