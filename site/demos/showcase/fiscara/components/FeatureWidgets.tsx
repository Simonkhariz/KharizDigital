"use client";

import { Check, Download, RotateCcw } from "lucide-react";
import { useState } from "react";
import { approvalSteps, auditTrail, forecastWeeks } from "../data/content";

/* ---------- Approval route ---------- */

export function ApprovalFlow() {
  /* Index of the step that is waiting. The route starts at the second approver. */
  const start = approvalSteps.findIndex((step) => step.state === "current");
  const [current, setCurrent] = useState(start);
  const finished = current >= approvalSteps.length;

  return (
    <div className="fs-flow">
      <p className="fs-flow-rule">
        <span>rule</span> amount &gt; $2,500 <b>→</b> two approvers <i>PO-1182 · $4,820.00</i>
      </p>
      <ol>
        {approvalSteps.map((step, index) => {
          const state = index < current ? "done" : index === current ? "current" : "next";
          return (
            <li key={step.role} data-state={state}>
              <span className="fs-flow-node" aria-hidden="true">
                {state === "done" ? <Check size={13} strokeWidth={2.4} /> : <i />}
              </span>
              <small>{step.role}</small>
              <strong>{step.name}</strong>
              <em>{state === "done" && index >= start ? (index === approvalSteps.length - 1 ? "Payment queued" : "Approved just now") : step.note}</em>
            </li>
          );
        })}
      </ol>
      <div className="fs-flow-actions">
        {finished ? (
          <>
            <p role="status">Route complete. Payment is queued for Feb 07.</p>
            <button type="button" className="fs-button fs-button-ghost" onClick={() => setCurrent(start)}>
              <RotateCcw size={14} aria-hidden="true" /> Replay
            </button>
          </>
        ) : (
          <>
            <p role="status">
              Waiting on <b>{approvalSteps[current].name}</b>
            </p>
            <button type="button" className="fs-button fs-button-white" onClick={() => setCurrent(current + 1)}>
              {current === approvalSteps.length - 1 ? "Release payment" : `Approve as ${approvalSteps[current].name}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Thirteen-week forecast ---------- */

const FLOOR = 380;

export function ForecastChart() {
  const lowest = forecastWeeks.reduce((low, week, index) => (week.cash < forecastWeeks[low].cash ? index : low), 0);
  const [active, setActive] = useState(lowest);
  const max = Math.max(...forecastWeeks.map((week) => week.cash));
  const week = forecastWeeks[active];
  const buffer = week.cash - FLOOR;

  return (
    <div className="fs-forecast">
      <dl className="fs-forecast-read" aria-live="polite">
        <div>
          <dt>Week</dt>
          <dd>{week.week}</dd>
        </div>
        <div>
          <dt>Closing cash</dt>
          <dd>${week.cash}k</dd>
        </div>
        <div>
          <dt>Committed spend</dt>
          <dd>${week.committed}k</dd>
        </div>
        <div data-warn={buffer < 0}>
          <dt>Against ${FLOOR}k floor</dt>
          <dd>
            {buffer < 0 ? "−" : "+"}${Math.abs(buffer)}k
          </dd>
        </div>
      </dl>
      <div className="fs-forecast-plot">
        <span className="fs-forecast-floor" style={{ bottom: `calc(22px + (100% - 22px) * ${(FLOOR / max).toFixed(4)})` }}>
          <i>floor ${FLOOR}k</i>
        </span>
        <ul>
          {forecastWeeks.map((item, index) => (
            <li key={item.week}>
              <button
                type="button"
                aria-label={`${item.week}: closing cash $${item.cash}k, committed spend $${item.committed}k`}
                aria-pressed={index === active}
                data-low={item.cash < FLOOR}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span style={{ height: `${(item.cash / max) * 100}%` }}>
                  <b style={{ height: `${(item.committed / item.cash) * 100}%` }} />
                </span>
              </button>
              <small>{item.week.slice(1)}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Audit trail ---------- */

export function AuditLog() {
  const [saved, setSaved] = useState(false);

  /* Builds the file in the browser; nothing is requested from a server. */
  const download = () => {
    const lines = [["time", "actor", "action", "target"], ...auditTrail.map((entry) => [entry.time, entry.actor, entry.action, entry.target])];
    const csv = lines.map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "fiscara-audit-trail-demo.csv";
    link.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  return (
    <div className="fs-audit">
      <div className="fs-audit-head">
        <span>audit.log</span>
        <span>PO-1182 · Feb 03, 2026</span>
      </div>
      <ol>
        {auditTrail.map((entry) => (
          <li key={entry.time}>
            <time>{entry.time}</time>
            <span>{entry.actor}</span>
            <b data-action={entry.action}>{entry.action}</b>
            <em>{entry.target}</em>
          </li>
        ))}
      </ol>
      <div className="fs-audit-foot">
        <p role="status">{saved ? "Saved a 5-line demonstration file to your downloads." : "5 events · tamper-evident · exportable"}</p>
        <button type="button" className="fs-button" onClick={download}>
          <Download size={14} aria-hidden="true" /> Export CSV
        </button>
      </div>
    </div>
  );
}
