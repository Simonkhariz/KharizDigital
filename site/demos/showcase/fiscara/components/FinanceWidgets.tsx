"use client";

import { useEffect, useId, useRef, useState } from "react";
import { financeWidgets } from "../data/content";
import type { FinanceWidget } from "../data/content";

const money = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const SHADES = ["#e4e1d2", "#8f8a86", "#cbc8c6"];
const R = 26.2;
const CIRCUMFERENCE = 2 * Math.PI * R;
const GAP = 1.6;

type Mode = "total" | "average";
type Chart = "donut" | "bars";

function Donut({ widget, total, active, onActive }: { widget: FinanceWidget; total: number; active: number | null; onActive: (index: number | null) => void }) {
  /* The two small slices start at twelve o'clock; the large one takes the rest of the ring. */
  const order = [1, 2, 0];
  const arcs = order.reduce<Array<{ index: number; length: number; start: number }>>((list, index) => {
    const previous = list[list.length - 1];
    const start = previous ? previous.start + previous.length : 0;
    return [...list, { index, start, length: (widget.categories[index].amount / total) * CIRCUMFERENCE }];
  }, []);
  const share = active === null ? null : Math.round((widget.categories[active].amount / total) * 100);

  return (
    <svg className="fs-donut" viewBox="0 0 64 64" role="img" aria-label={`${widget.title} by category`}>
      <g transform="rotate(-90 32 32)" fill="none" strokeWidth="9.4">
        {arcs.map((arc) => (
          <circle
            key={arc.index}
            cx="32"
            cy="32"
            r={R}
            stroke={SHADES[arc.index]}
            strokeDasharray={`${Math.max(arc.length - GAP, 0.6)} ${CIRCUMFERENCE}`}
            strokeDashoffset={-arc.start - GAP / 2}
            opacity={active === null || active === arc.index ? 1 : 0.28}
            onPointerEnter={() => onActive(arc.index)}
            onPointerLeave={() => onActive(null)}
          />
        ))}
      </g>
      {share !== null && (
        <text x="32" y="35" textAnchor="middle" className="fs-donut-share">
          {share}%
        </text>
      )}
    </svg>
  );
}

function Bars({ widget, active, onActive }: { widget: FinanceWidget; active: number | null; onActive: (index: number | null) => void }) {
  const max = Math.max(...widget.categories.map((category) => category.amount));
  return (
    <svg className="fs-donut" viewBox="0 0 64 64" role="img" aria-label={`${widget.title} by category`}>
      <path d="M2 61.5H62" stroke="#6b4a45" strokeWidth="1" />
      {widget.categories.map((category, index) => {
        const height = Math.max(3, (category.amount / max) * 55);
        return (
          <rect
            key={category.name}
            x={5 + index * 20}
            y={60 - height}
            width="14"
            height={height}
            rx="2"
            fill={SHADES[index]}
            opacity={active === null || active === index ? 1 : 0.28}
            onPointerEnter={() => onActive(index)}
            onPointerLeave={() => onActive(null)}
          />
        );
      })}
    </svg>
  );
}

function ModeSelect({ mode, onChange, label }: { mode: Mode; onChange: (mode: Mode) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options: Array<{ value: Mode; text: string }> = [
    { value: "total", text: "Total" },
    { value: "average", text: "Average" },
  ];

  return (
    <div className="fs-select" ref={rootRef}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-controls={id} aria-label={`${label}: show ${mode}`} onClick={() => setOpen((value) => !value)}>
        {mode === "total" ? "Total" : "Avg"}
        <svg viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.8 5 6.8 8 3.8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id={id} role="listbox" aria-label={`${label} figure`} hidden={!open}>
        {options.map((option) => (
          <li key={option.value} role="option" aria-selected={mode === option.value}>
            <button
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Widget({ widget }: { widget: FinanceWidget }) {
  const [chart, setChart] = useState<Chart>("donut");
  const [mode, setMode] = useState<Mode>("total");
  const [active, setActive] = useState<number | null>(null);
  const total = widget.categories.reduce((sum, category) => sum + category.amount, 0);
  const shown = mode === "total" ? total : total / widget.transactions;

  return (
    <article className="fs-widget" aria-label={widget.title}>
      <div className="fs-widget-in">
        <header>
          <div>
            <h3>{mode === "total" ? widget.title : widget.title.replace("Total", "Average")}</h3>
            <p>{widget.range}</p>
          </div>
          <div className="fs-widget-tools">
            <div className="fs-toggle" role="group" aria-label={`${widget.title} chart type`}>
              <button type="button" aria-pressed={chart === "donut"} aria-label="Donut chart" onClick={() => setChart("donut")}>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.3" fill="none" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M6 1.7V6h4.3" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" aria-pressed={chart === "bars"} aria-label="Bar chart" onClick={() => setChart("bars")}>
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2.5 10V5.5h2V10M5.5 10V2.5h2V10M8.5 10V4.5h2V10M1.5 10.2h9.5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ModeSelect mode={mode} onChange={setMode} label={widget.title} />
          </div>
        </header>
        <p className="fs-widget-amount" aria-live="polite">
          <span>$</span> {money(shown)}
          {mode === "average" && <small>per transaction</small>}
        </p>
        <p className="fs-widget-change">
          <span>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <rect x="1" y="1" width="10" height="10" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M3.3 7.6 5.2 5.7 6.6 7.1 8.8 4.6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {widget.change.toFixed(1)}%
          </span>
          from last month
        </p>
        <div className="fs-widget-body">
          {chart === "donut" ? <Donut widget={widget} total={total} active={active} onActive={setActive} /> : <Bars widget={widget} active={active} onActive={setActive} />}
          <div className="fs-legend">
            <h4>All categories</h4>
            <ul>
              {widget.categories.map((category, index) => (
                <li key={category.name} data-dim={active !== null && active !== index} onPointerEnter={() => setActive(index)} onPointerLeave={() => setActive(null)}>
                  <i style={{ background: SHADES[index] }} />
                  <span>{category.name}</span>
                  <b>${money(category.amount)}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export function FinanceWidgets() {
  return (
    <div className="fs-widgets">
      {financeWidgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
