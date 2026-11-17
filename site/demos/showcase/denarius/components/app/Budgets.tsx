"use client";

import { Check, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DAYS_LEFT, budgetOrder, categoryById, initialBudgets, spendByCategory } from "../../data/bank";
import type { BudgetId, CategoryId } from "../../data/bank";
import { money } from "../../data/format";
import type { AppProps } from "./BankApp";
import { BUDGET_MAX } from "./state";
import { Amount, CategoryIcon, Meter, Panel } from "./ui";

const STEP = 10;

function BudgetCard({
  id,
  spent,
  limit,
  onChange,
  onShow,
}: {
  id: BudgetId;
  spent: number;
  limit: number;
  onChange: (value: number) => void;
  onShow: () => void;
}) {
  /** Text being typed; null means the field shows the saved limit. */
  const [draft, setDraft] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const label = categoryById[id].label;
  const left = Math.round((limit - spent) * 100) / 100;
  const over = left < 0;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const commit = (value: number) => {
    const next = Math.min(BUDGET_MAX, Math.max(0, Math.round(Number.isFinite(value) ? value : limit)));
    setDraft(null);
    if (next === limit) return;
    onChange(next);
    setSaved(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <li className={`dna-budget${over ? " is-over" : ""}`}>
      <div className="dna-budget-head">
        <CategoryIcon id={id} />
        <h3>{label}</h3>
        <span className={`dna-saved${saved ? " is-on" : ""}`} aria-hidden={!saved}>
          <Check size={12} strokeWidth={2.4} aria-hidden="true" />
          Saved
        </span>
      </div>
      <p className="dna-budget-figures">
        <Amount value={spent} />
        <span>of ${money(limit, 0)}</span>
      </p>
      <Meter value={spent} max={limit} label={`${label} budget used`} />
      <p className="dna-budget-status">
        {over ? `Over by $${money(-left)}` : `$${money(left)} left`}
        <button type="button" className="dna-link" onClick={onShow}>
          View payments
        </button>
      </p>
      <div className="dna-stepper">
        <button type="button" aria-label={`Lower ${label} budget by $${STEP}`} disabled={limit <= 0} onClick={() => commit(limit - STEP)}>
          <Minus size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <label>
          <span className="dn-sr">{label} monthly limit in dollars</span>
          <span aria-hidden="true">$</span>
          <input
            inputMode="numeric"
            value={draft ?? String(limit)}
            onChange={(event) => setDraft(event.target.value.replace(/[^\d]/g, "").slice(0, 4))}
            onBlur={() => commit(draft === null || draft === "" ? limit : Number(draft))}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
              if (event.key === "Escape") setDraft(null);
            }}
          />
        </label>
        <button type="button" aria-label={`Raise ${label} budget by $${STEP}`} disabled={limit >= BUDGET_MAX} onClick={() => commit(limit + STEP)}>
          <Plus size={15} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

export function Budgets({ state, dispatch, toast, showCategory }: AppProps & { showCategory: (category: CategoryId) => void }) {
  const spend = spendByCategory(state.transactions);
  const budgeted = budgetOrder.reduce((sum, id) => sum + state.budgets[id], 0);
  const spent = Math.round(budgetOrder.reduce((sum, id) => sum + spend[id], 0) * 100) / 100;
  const left = Math.round((budgeted - spent) * 100) / 100;
  const overCount = budgetOrder.filter((id) => spend[id] > state.budgets[id]).length;
  const changed = budgetOrder.some((id) => state.budgets[id] !== initialBudgets[id]);

  return (
    <div className="dna-budgets-view">
      <Panel dark className="dna-budget-sum" label="Budget summary">
        <div>
          <p className="dna-kicker">{left >= 0 ? "Left to spend" : "Over budget"}</p>
          <Amount value={Math.abs(left)} className="dna-balance-amount" />
          <p className="dna-budget-sub">
            <b>${money(spent)}</b> spent of <b>${money(budgeted, 0)}</b> budgeted
          </p>
        </div>
        <dl className="dna-budget-stats">
          <div>
            <dt>Days left</dt>
            <dd className="dn-num">{DAYS_LEFT}</dd>
          </div>
          <div>
            <dt>Daily allowance</dt>
            <dd className="dn-num">${money(Math.max(0, left) / DAYS_LEFT)}</dd>
          </div>
          <div>
            <dt>Over limit</dt>
            <dd className="dn-num">
              {overCount}
              <small> of {budgetOrder.length}</small>
            </dd>
          </div>
        </dl>
        <div className="dna-budget-sum-bar">
          <Meter value={spent} max={budgeted} label="Total budget used" />
          <p>
            <span>{budgeted > 0 ? Math.round((spent / budgeted) * 100) : 0}% used</span>
            <button
              type="button"
              className="dna-link"
              disabled={!changed}
              onClick={() => {
                dispatch({ type: "resetBudgets" });
                toast("Budgets reset to the sample limits");
              }}
            >
              <RotateCcw size={12} strokeWidth={1.8} aria-hidden="true" />
              Reset limits
            </button>
          </p>
        </div>
      </Panel>

      <ul className="dna-budget-grid">
        {budgetOrder.map((id) => (
          <BudgetCard
            key={id}
            id={id}
            spent={spend[id]}
            limit={state.budgets[id]}
            onChange={(value) => dispatch({ type: "setBudget", id, value })}
            onShow={() => showCategory(id)}
          />
        ))}
      </ul>
    </div>
  );
}
