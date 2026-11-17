"use client";

import { ArrowDownLeft, ArrowUpRight, Copy, Send } from "lucide-react";
import { categoryById, dayLabel } from "../../data/bank";
import type { AccountId } from "../../data/bank";
import { money } from "../../data/format";
import type { AppProps } from "./BankApp";
import { Amount, CategoryIcon, EmptyState, Meter, Panel } from "./ui";

const TRAVEL_GOAL = 7500;

export function Accounts({
  state,
  openSend,
  toast,
  selected,
  onSelect,
  showAll,
}: AppProps & { selected: AccountId; onSelect: (id: AccountId) => void; showAll: (id: AccountId) => void }) {
  const account = state.accounts.find((item) => item.id === selected) ?? state.accounts[0];
  const total = state.accounts.reduce((sum, item) => sum + item.balance, 0);
  const activity = state.transactions.filter((item) => item.account === account.id);
  const moneyIn = activity.reduce((sum, item) => (item.amount > 0 ? sum + item.amount : sum), 0);
  const moneyOut = activity.reduce((sum, item) => (item.amount < 0 ? sum - item.amount : sum), 0);

  return (
    <div className="dna-accounts-view">
      <div className="dna-acc-tabs" role="group" aria-label="Choose an account">
        {state.accounts.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === account.id}
            className="dna-acc-tab"
            onClick={() => onSelect(item.id)}
          >
            <span className="dna-acc-tab-top">
              <span>{item.name}</span>
              <span>{item.number}</span>
            </span>
            <Amount value={item.balance} />
            <span className="dna-acc-tab-foot">
              <span>{item.kind}</span>
              <span>{Math.round((item.balance / total) * 100)}% of total</span>
            </span>
          </button>
        ))}
      </div>

      <div className="dna-acc-detail" key={account.id}>
        <Panel className="dna-acc-facts" title={account.name}>
          <dl className="dna-facts">
            <div>
              <dt>Type</dt>
              <dd>{account.kind}</dd>
            </div>
            <div>
              <dt>Detail</dt>
              <dd>{account.detail}</dd>
            </div>
            <div>
              <dt>Sort code</dt>
              <dd className="dna-mono">{account.sort}</dd>
            </div>
            <div>
              <dt>Account</dt>
              <dd className="dna-mono">
                {account.number}
                <button type="button" className="dna-icon-btn" aria-label="Copy account details" onClick={() => toast("Account details copied (demonstration)")}>
                  <Copy size={13} strokeWidth={1.6} aria-hidden="true" />
                </button>
              </dd>
            </div>
          </dl>
          {account.id === "travel" && (
            <div className="dna-goal">
              <p>
                <span>Goal progress</span>
                <span>
                  <b>${money(account.balance, 0)}</b> of ${money(TRAVEL_GOAL, 0)}
                </span>
              </p>
              <Meter value={account.balance} max={TRAVEL_GOAL} label="Travel pot goal progress" />
            </div>
          )}
          <dl className="dna-inout">
            <div>
              <dt>
                <ArrowDownLeft size={13} strokeWidth={1.8} aria-hidden="true" />
                In this month
              </dt>
              <dd>
                <Amount value={moneyIn} />
              </dd>
            </div>
            <div>
              <dt>
                <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                Out this month
              </dt>
              <dd>
                <Amount value={moneyOut} />
              </dd>
            </div>
          </dl>
          <button type="button" className="dn-btn dn-btn-black dna-wide" onClick={() => openSend(account.id)}>
            Send from this account
            <Send size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </Panel>

        <Panel
          className="dna-acc-activity"
          title="Activity"
          action={
            activity.length > 0 ? (
              <button type="button" className="dna-link" onClick={() => showAll(account.id)}>
                Open in transactions
              </button>
            ) : undefined
          }
        >
          {activity.length === 0 ? (
            <EmptyState
              title="Nothing has moved this month"
              text={`${account.name} has no payments in or out since 1 November. Money you move here will show up straight away.`}
              action={
                <button type="button" className="dn-btn dn-btn-soft" onClick={() => openSend("everyday")}>
                  Move money in
                </button>
              }
            />
          ) : (
            <ul className="dna-rows">
              {activity.slice(0, 9).map((item) => (
                <li key={item.id}>
                  <CategoryIcon id={item.category} />
                  <span className="dna-row-name">
                    {item.payee}
                    <small>{item.note ?? categoryById[item.category].label}</small>
                  </span>
                  <span className="dna-row-date">{dayLabel(item.date)}</span>
                  <Amount value={item.amount} sign className={item.amount > 0 ? "is-in" : undefined} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
