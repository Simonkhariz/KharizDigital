"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cardOfTransaction, cards, categories, categoryById, dayLabel } from "../../data/bank";
import type { Transaction } from "../../data/bank";
import { usd } from "../../data/format";
import type { AppProps } from "./BankApp";
import { emptyFilters } from "./state";
import type { Filters } from "./state";
import { Amount, CategoryIcon, EmptyState, Panel } from "./ui";

const flows: { id: Filters["flow"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in", label: "Money in" },
  { id: "out", label: "Money out" },
];

export function Transactions({ state, filters, onFilters }: AppProps & { filters: Filters; onFilters: (filters: Filters) => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const accountName = (id: string) => state.accounts.find((account) => account.id === id)?.name ?? "";

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return state.transactions.filter((item) => {
      if (filters.category !== "all" && item.category !== filters.category) return false;
      if (filters.account !== "all" && item.account !== filters.account) return false;
      if (filters.flow === "in" && item.amount <= 0) return false;
      if (filters.flow === "out" && item.amount >= 0) return false;
      if (!query) return true;
      const haystack = `${item.payee} ${item.note ?? ""} ${categoryById[item.category].label} ${Math.abs(item.amount).toFixed(2)}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [state.transactions, filters]);

  const groups = useMemo(() => {
    const byDay = new Map<string, Transaction[]>();
    for (const item of results) byDay.set(item.date, [...(byDay.get(item.date) ?? []), item]);
    return [...byDay.entries()];
  }, [results]);

  const totalIn = results.reduce((sum, item) => (item.amount > 0 ? sum + item.amount : sum), 0);
  const totalOut = results.reduce((sum, item) => (item.amount < 0 ? sum - item.amount : sum), 0);
  const active = filters.query !== "" || filters.category !== "all" || filters.account !== "all" || filters.flow !== "all";
  const set = (patch: Partial<Filters>) => onFilters({ ...filters, ...patch });

  return (
    <Panel className="dna-tx" label="Transactions">
      <div className="dna-tx-tools">
        <label className="dna-search">
          <Search size={16} strokeWidth={1.6} aria-hidden="true" />
          <span className="dn-sr">Search transactions</span>
          <input
            type="search"
            placeholder="Search payee, note or amount"
            value={filters.query}
            onChange={(event) => set({ query: event.target.value })}
          />
          {filters.query && (
            <button type="button" aria-label="Clear search" onClick={() => set({ query: "" })}>
              <X size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
        </label>
        <div className="dna-seg" role="group" aria-label="Direction">
          {flows.map((flow) => (
            <button key={flow.id} type="button" aria-pressed={filters.flow === flow.id} onClick={() => set({ flow: flow.id })}>
              {flow.label}
            </button>
          ))}
        </div>
        <label className="dna-select">
          <span className="dn-sr">Account</span>
          <select value={filters.account} onChange={(event) => set({ account: event.target.value as Filters["account"] })}>
            <option value="all">All accounts</option>
            {state.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          <ChevronDown size={15} strokeWidth={1.6} aria-hidden="true" />
        </label>
      </div>

      <div className="dna-chips" role="group" aria-label="Category">
        <button type="button" aria-pressed={filters.category === "all"} onClick={() => set({ category: "all" })}>
          All categories
        </button>
        {categories.map((category) => (
          <button key={category.id} type="button" aria-pressed={filters.category === category.id} onClick={() => set({ category: category.id })}>
            {category.label}
          </button>
        ))}
      </div>

      <div className="dna-tx-summary" aria-live="polite">
        <p>
          <b>{results.length}</b> {results.length === 1 ? "transaction" : "transactions"}
        </p>
        <p>
          In <span className="dn-num">{usd(Math.round(totalIn * 100) / 100)}</span>
        </p>
        <p>
          Out <span className="dn-num">{usd(Math.round(totalOut * 100) / 100)}</span>
        </p>
        {active && (
          <button type="button" className="dna-link" onClick={() => onFilters(emptyFilters)}>
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No transactions match"
          text="Nothing in the sample month fits this search. Try a shorter search or a different category."
          action={
            <button type="button" className="dn-btn dn-btn-soft" onClick={() => onFilters(emptyFilters)}>
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="dna-tx-list">
          {groups.map(([date, items]) => (
            <section key={date} aria-label={dayLabel(date)}>
              <h2 className="dna-tx-day">
                <span>{dayLabel(date)}</span>
                <span className="dn-num">{usd(Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100)}</span>
              </h2>
              <ul>
                {items.map((item) => {
                  const expanded = open === item.id;
                  const card = cards.find((entry) => entry.id === cardOfTransaction[item.id]);
                  return (
                    <li key={item.id} className={expanded ? "is-open" : undefined}>
                      <button type="button" className="dna-tx-row" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : item.id)}>
                        <CategoryIcon id={item.category} />
                        <span className="dna-row-name">
                          {item.payee}
                          <small>{item.note ?? categoryById[item.category].label}</small>
                        </span>
                        <span className="dna-tx-cat">{categoryById[item.category].label}</span>
                        <span className="dna-tx-acc">{accountName(item.account)}</span>
                        <Amount value={item.amount} sign className={item.amount > 0 ? "is-in" : undefined} />
                        <ChevronDown size={15} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                      {expanded && (
                        <dl className="dna-tx-detail">
                          <div>
                            <dt>Status</dt>
                            <dd>Completed</dd>
                          </div>
                          <div>
                            <dt>Reference</dt>
                            <dd className="dna-mono">{item.reference ?? "DN-000000"}</dd>
                          </div>
                          <div>
                            <dt>Paid {item.amount > 0 ? "into" : "from"}</dt>
                            <dd>{accountName(item.account)}</dd>
                          </div>
                          <div>
                            <dt>Method</dt>
                            <dd>{card ? `${card.name} •• ${card.last4}` : item.amount > 0 ? "Bank credit" : item.internal ? "Own-account move" : "Bank transfer"}</dd>
                          </div>
                        </dl>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Panel>
  );
}
