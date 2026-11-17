"use client";

import { ArrowDownLeft, ArrowUpRight, ChevronRight, CircleArrowDown, CircleArrowUp, Send, Settings2, Snowflake } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import {
  MONTH_SHORT,
  budgetOrder,
  cardSpend,
  cards,
  categoryById,
  dayLabel,
  monthTotals,
  scheduled,
  spendByCategory,
  spendingHistory,
} from "../../data/bank";
import type { AccountId } from "../../data/bank";
import { money, usd } from "../../data/format";
import { BankCard } from "../Artwork";
import type { AppProps } from "./BankApp";
import { Amount, CategoryIcon, Meter, Panel } from "./ui";

function SpendChart({ current }: { current: number }) {
  const series = [...spendingHistory, { month: MONTH_SHORT, total: current }];
  const [active, setActive] = useState(series.length - 1);
  const max = Math.max(...series.map((item) => item.total));
  const average = series.reduce((sum, item) => sum + item.total, 0) / series.length;
  const selected = series[active];
  const previous = active > 0 ? series[active - 1] : null;
  const change = previous ? ((selected.total - previous.total) / previous.total) * 100 : 0;
  const Arrow = change <= 0 ? CircleArrowDown : CircleArrowUp;

  return (
    <div className="dna-chart">
      <div className="dna-chart-head">
        <div>
          <p>Spending · {selected.month}</p>
          <Amount value={selected.total} className="dna-chart-total" />
          {previous && (
            <p className={`dna-chart-delta${change > 0 ? " is-up" : ""}`}>
              <Arrow size={13} strokeWidth={2} aria-hidden="true" />
              {Math.abs(change).toFixed(1)}% {change <= 0 ? "less" : "more"} than {previous.month}
            </p>
          )}
        </div>
        <p className="dna-chart-avg">
          Avg <span className="dn-num">${money(average, 0)}</span>
        </p>
      </div>
      <div className="dna-bars" role="group" aria-label="Spending by month">
        <span className="dna-bars-avg" style={{ "--avg": String(average / max) } as CSSProperties} aria-hidden="true" />
        {series.map((item, index) => (
          <button
            key={item.month}
            type="button"
            className={`dna-bar${index === active ? " is-active" : ""}`}
            aria-pressed={index === active}
            aria-label={`${item.month}: ${usd(item.total)}`}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="dna-bar-track">
              <span className="dna-bar-fill" style={{ height: `${Math.max(6, (item.total / max) * 100)}%` }}>
                {index === active && <span className="dna-bar-tip">${money(item.total, 0)}</span>}
              </span>
            </span>
            <span className="dna-bar-label">{item.month}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Ring({ parts, total }: { parts: { id: string; value: number; color: string }[]; total: number }) {
  const radius = 52;
  const length = 2 * Math.PI * radius;
  const gap = 3;
  let offset = 0;
  return (
    <svg className="dna-ring" viewBox="0 0 120 120" role="img" aria-label="Spending by category">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="#1f1f1f" strokeWidth="9" />
      {total > 0 &&
        parts.map((part) => {
          const size = (part.value / total) * length;
          const dash = Math.max(0.5, size - gap);
          const node = (
            <circle
              key={part.id}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={part.color}
              strokeWidth="9"
              strokeDasharray={`${dash} ${length - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 60 60)"
            />
          );
          offset += size;
          return node;
        })}
    </svg>
  );
}

export function Overview({ state, go, openSend, dispatch, toast, openAccount }: AppProps & { openAccount: (id: AccountId) => void }) {
  const total = state.accounts.reduce((sum, account) => sum + account.balance, 0);
  const { moneyIn, moneyOut } = monthTotals(state.transactions);
  const spend = spendByCategory(state.transactions);
  const parts = [...budgetOrder, "transfers" as const]
    .map((id) => ({ id, value: spend[id], color: categoryById[id].color, label: categoryById[id].label }))
    .filter((part) => part.value > 0)
    .sort((a, b) => b.value - a.value);
  const metal = cards[0];
  const frozen = state.cards.metal.frozen;
  const metalSpend = cardSpend(state.transactions, "metal");
  const everyday = state.accounts.find((account) => account.id === "everyday");
  const recent = state.transactions.slice(0, 6);
  const topBudgets = budgetOrder;

  return (
    <div className="dna-grid">
      <Panel dark className="dna-balance" label="Balance and spending">
        <div className="dna-balance-top">
          <div>
            <p className="dna-kicker">Current balance</p>
            <Amount value={total} className="dna-balance-amount" />
            <p className="dna-balance-kept">
              <CircleArrowUp size={14} strokeWidth={2} aria-hidden="true" />
              {usd(Math.round((moneyIn - moneyOut) * 100) / 100)} kept this month
            </p>
          </div>
          <dl className="dna-flow">
            <div>
              <dt>
                <ArrowDownLeft size={13} strokeWidth={1.8} aria-hidden="true" />
                Money in
              </dt>
              <dd>
                <Amount value={moneyIn} />
              </dd>
            </div>
            <div>
              <dt>
                <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
                Money out
              </dt>
              <dd>
                <Amount value={moneyOut} />
              </dd>
            </div>
          </dl>
        </div>
        <SpendChart current={moneyOut} />
      </Panel>

      <Panel className="dna-cardpanel" label="Your card">
        <div className="dna-cardpanel-stage">
          <BankCard amount={`$ ${money(everyday?.balance ?? 0)}`} last4={metal.last4} frozen={frozen} />
          {frozen && (
            <span className="dna-frost">
              <Snowflake size={14} strokeWidth={1.8} aria-hidden="true" />
              Frozen
            </span>
          )}
        </div>
        <div className="dna-cardpanel-meta">
          <div>
            <p>{metal.name}</p>
            <p>
              {metal.kind} · Everyday account
            </p>
          </div>
          <span className={`dna-chip${frozen ? " is-frozen" : " is-live"}`}>{frozen ? "Frozen" : "Active"}</span>
        </div>
        <div className="dna-limit">
          <p>
            <span>Card spend this month</span>
            <span>
              <b>{usd(metalSpend)}</b> of ${money(metal.limit, 0)}
            </span>
          </p>
          <Meter value={metalSpend} max={metal.limit} label="Card spend against monthly limit" />
        </div>
        <div className="dna-quick">
          <button type="button" onClick={() => openSend("everyday")}>
            <span>
              <Send size={16} strokeWidth={1.6} aria-hidden="true" />
            </span>
            Send
          </button>
          <button
            type="button"
            aria-pressed={frozen}
            onClick={() => {
              dispatch({ type: "setCard", id: "metal", key: "frozen", value: !frozen });
              toast(frozen ? "Card unfrozen" : "Card frozen");
            }}
          >
            <span>
              <Snowflake size={16} strokeWidth={1.6} aria-hidden="true" />
            </span>
            {frozen ? "Unfreeze" : "Freeze"}
          </button>
          <button type="button" onClick={() => go("cards")}>
            <span>
              <Settings2 size={16} strokeWidth={1.6} aria-hidden="true" />
            </span>
            Manage
          </button>
        </div>
      </Panel>

      <Panel
        className="dna-accounts"
        title="Accounts"
        action={
          <button type="button" className="dna-link" onClick={() => go("accounts")}>
            View all
          </button>
        }
      >
        <ul className="dna-acc-list">
          {state.accounts.map((account) => (
            <li key={account.id}>
              <button type="button" onClick={() => openAccount(account.id)}>
                <span className="dna-acc-badge dn-num" aria-hidden="true">
                  {account.name[0]}
                </span>
                <span className="dna-acc-name">
                  {account.name}
                  <small>
                    {account.kind} · {account.number}
                  </small>
                </span>
                <Amount value={account.balance} />
                <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className="dna-upcoming">
          <p className="dna-kicker">Upcoming</p>
          <ul>
            {scheduled.map((item) => (
              <li key={item.id}>
                <span>{dayLabel(item.date)}</span>
                <span>{item.payee}</span>
                <span className="dn-num">${money(item.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel dark className="dna-breakdown" title="Spending breakdown" action={<span className="dna-panel-tag">This month</span>}>
        <div className="dna-breakdown-body">
          <div className="dna-ring-wrap">
            <Ring parts={parts} total={moneyOut} />
            <div>
              <p>Spent</p>
              <Amount value={moneyOut} />
            </div>
          </div>
          <ul className="dna-legend">
            {parts.map((part) => (
              <li key={part.id}>
                <i style={{ background: part.color }} aria-hidden="true" />
                <span>{part.label}</span>
                <span>{moneyOut > 0 ? Math.round((part.value / moneyOut) * 100) : 0}%</span>
                <span className="dn-num">${money(part.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel
        className="dna-recent"
        title="Recent activity"
        action={
          <button type="button" className="dna-link" onClick={() => go("transactions")}>
            See all
          </button>
        }
      >
        <ul className="dna-rows">
          {recent.map((item) => (
            <li key={item.id}>
              <CategoryIcon id={item.category} />
              <span className="dna-row-name">
                {item.payee}
                <small>{categoryById[item.category].label}</small>
              </span>
              <span className="dna-row-date">{dayLabel(item.date)}</span>
              <Amount value={item.amount} sign className={item.amount > 0 ? "is-in" : undefined} />
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        className="dna-budgets-mini"
        title="Budgets"
        action={
          <button type="button" className="dna-link" onClick={() => go("budgets")}>
            Edit
          </button>
        }
      >
        <ul className="dna-mini">
          {topBudgets.map((id) => {
            const over = spend[id] > state.budgets[id];
            return (
              <li key={id}>
                <p>
                  <span>{categoryById[id].label}</span>
                  <span className={over ? "is-over" : undefined}>
                    <b>${money(spend[id], 0)}</b> of ${money(state.budgets[id], 0)}
                  </span>
                </p>
                <Meter value={spend[id]} max={state.budgets[id]} label={`${categoryById[id].label} budget used`} />
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
