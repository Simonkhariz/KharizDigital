"use client";

import { CalendarDays } from "lucide-react";
import type { ReactNode } from "react";
import { reps, stageMeta } from "../../data/crm";
import type { Stage } from "../../data/crm";
import { describeRange, getRange, rangeOptions } from "../../data/metrics";
import { useStore } from "./store";

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className="cl-d-stage" data-stage={stage}>
      {stageMeta[stage].label}
    </span>
  );
}

export function Delta({ value }: { value: number | null }) {
  if (value === null) return <span className="cl-d-delta" data-tone="flat">new</span>;
  const percent = Math.abs(value * 100);
  const text = `${value >= 0 ? "+" : "-"}${percent >= 100 ? Math.round(percent) : percent.toFixed(1)}%`;
  return (
    <span className="cl-d-delta" data-tone={value >= 0 ? "up" : "down"}>
      <span className="cl-sr">{value >= 0 ? "Up" : "Down"} </span>
      {text}
    </span>
  );
}

export function Card({ title, hint, action, children, className }: { title: string; hint?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={className ? `cl-d-card ${className}` : "cl-d-card"}>
      <header className="cl-d-card-head">
        <div>
          <h2>{title}</h2>
          {hint && <p>{hint}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

/** Date-range switch and owner filter shared by the overview and the reports. */
export function RangeBar() {
  const { state, dispatch } = useStore();
  const range = getRange(state.range);

  return (
    <div className="cl-d-filters">
      <div className="cl-d-segment" role="group" aria-label="Date range">
        {rangeOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            aria-pressed={state.range === option.key}
            onClick={() => dispatch({ type: "range", range: option.key })}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="cl-d-range-text">
        <CalendarDays size={15} aria-hidden="true" />
        {describeRange(range)}
      </p>
      <label className="cl-d-select">
        <span className="cl-sr">Sales rep</span>
        <select value={state.owner} onChange={(event) => dispatch({ type: "owner", owner: event.target.value })}>
          <option value="all">All reps</option>
          {reps.map((rep) => (
            <option key={rep.id} value={rep.id}>
              {rep.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
