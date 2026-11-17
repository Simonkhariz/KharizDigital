"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { platformViews } from "../data/content";
import type { PlatformView, RowStatus } from "../data/content";
import { Label } from "./Mark";

const DWELL = 9000;

const money = (value: number) =>
  `${value < 0 ? "−" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** What a "Review" row becomes once somebody has dealt with it. */
const resolved: Record<PlatformView["id"], RowStatus> = { automate: "Posted", reconcile: "Matched", report: "Posted" };

function Trend({ view }: { view: PlatformView }) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 300;
  const height = 190;
  const min = Math.min(...view.series);
  const max = Math.max(...view.series);
  const span = max - min || 1;
  const points = view.series.map((value, index) => ({
    x: 6 + (index / (view.series.length - 1)) * (width - 12),
    y: 14 + (1 - (value - min) / span) * (height - 34),
    value,
  }));
  const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const active = points[hover ?? points.length - 1];
  const unit = view.id === "report" ? " days" : "%";

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - box.left) / box.width;
    setHover(Math.max(0, Math.min(points.length - 1, Math.round(ratio * (points.length - 1)))));
  };

  return (
    <figure className="fs-trend">
      <figcaption>{view.seriesLabel}</figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${view.seriesLabel}: from ${view.series[0]} to ${view.series[view.series.length - 1]}`} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={`fs-trend-${view.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9c6a3" stopOpacity="0.34" />
            <stop offset="1" stopColor="#d9c6a3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((row) => (
          <path key={row} d={`M6 ${14 + row * ((height - 34) / 3)}H${width - 6}`} stroke="#55342e" strokeWidth="1" strokeDasharray="2 4" />
        ))}
        <path d={`${line} L${width - 6} ${height - 14} L6 ${height - 14} Z`} fill={`url(#fs-trend-${view.id})`} />
        <path d={line} fill="none" stroke="#d9c6a3" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
        <path d={`M${active.x} 8V${height - 14}`} stroke="#8a6f66" strokeWidth="1" />
        <circle cx={active.x} cy={active.y} r="4.2" fill="#341815" stroke="#f0e4c9" strokeWidth="1.8" />
        <text x={active.x < 70 ? active.x + 10 : active.x - 10} y={active.y + 3.5} textAnchor={active.x < 70 ? "start" : "end"}>
          {active.value}
          {unit}
        </text>
      </svg>
    </figure>
  );
}

export function Platform() {
  const [activeId, setActiveId] = useState<PlatformView["id"]>("automate");
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const rootRef = useRef<HTMLElement>(null);
  const view = platformViews.find((item) => item.id === activeId) ?? platformViews[0];

  /* The views advance on their own until somebody chooses one. */
  useEffect(() => {
    if (!auto || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      const index = platformViews.findIndex((item) => item.id === activeId);
      setActiveId(platformViews[(index + 1) % platformViews.length].id);
    }, DWELL);
    return () => window.clearTimeout(timer);
  }, [activeId, auto, paused]);

  const choose = (id: PlatformView["id"]) => {
    setAuto(false);
    setActiveId(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : platformViews.length - 1;
    const next = platformViews[(index + step) % platformViews.length];
    choose(next.id);
    rootRef.current?.querySelector<HTMLElement>(`#fs-tab-${next.id}`)?.focus();
  };

  const rows = view.rows.map((row) => {
    const key = `${view.id}:${row.payee}`;
    return { ...row, key, status: done[key] ? resolved[view.id] : row.status, wasReview: row.status === "Review" };
  });
  const open = rows.filter((row) => row.status === "Review").length;

  return (
    <section className="fs-platform fs-on-dark" id="platform" aria-labelledby="fs-platform-title" ref={rootRef}>
      <div className="fs-platform-panel" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="fs-platform-copy">
          <Label>Platform</Label>
          <h2 className="fs-title" id="fs-platform-title">
            One ledger view, <span>from invoice to board pack.</span>
          </h2>
          <div className="fs-tabs" role="tablist" aria-label="Platform areas" aria-orientation="vertical">
            {platformViews.map((item, index) => {
              const selected = item.id === activeId;
              return (
                <div key={item.id} className="fs-tab" data-active={selected}>
                  <button
                    type="button"
                    role="tab"
                    id={`fs-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="fs-platform-view"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(item.id)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    <small>/0{index + 1}/</small>
                    <span>{item.label}</span>
                    <i aria-hidden="true" />
                  </button>
                  <div className="fs-tab-text" aria-hidden={!selected}>
                    <p>
                      <strong>{item.title}.</strong> {item.text}
                    </p>
                  </div>
                  <span className="fs-tab-progress" aria-hidden="true">
                    {selected && auto && <b key={item.id} style={{ animationDuration: `${DWELL}ms`, animationPlayState: paused ? "paused" : "running" }} />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="fs-app" id="fs-platform-view" role="tabpanel" aria-labelledby={`fs-tab-${view.id}`}>
          <div className="fs-app-bar">
            <span className="fs-app-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <p>
              fiscara <b>/</b> {view.label.toLowerCase()} <b>/</b> february-2026
            </p>
            <span className="fs-app-live">
              <i aria-hidden="true" />
              Live
            </span>
          </div>
          <div className="fs-app-body" key={view.id}>
            <dl className="fs-app-figures">
              {view.figures.map((figure) => (
                <div key={figure.label}>
                  <dt>{figure.label}</dt>
                  <dd>{figure.value}</dd>
                  <dd className="fs-app-note">{figure.note}</dd>
                </div>
              ))}
            </dl>
            <div className="fs-app-main">
              <div className="fs-ledger">
                <div className="fs-ledger-head">
                  <h3>{view.tableTitle}</h3>
                  <p aria-live="polite">{open ? `${open} open` : "All clear"}</p>
                </div>
                <table>
                  <thead className="fs-sr">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Entry</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.key}>
                        <td>{row.date}</td>
                        <td>
                          <strong>{row.payee}</strong>
                          <small>{row.detail}</small>
                        </td>
                        <td>{row.amount ? money(row.amount) : ""}</td>
                        <td>
                          {row.wasReview ? (
                            <button
                              type="button"
                              className="fs-status"
                              data-status={row.status}
                              aria-label={row.status === "Review" ? `Resolve ${row.payee}` : `Reopen ${row.payee}`}
                              onClick={() => setDone((state) => ({ ...state, [row.key]: !state[row.key] }))}
                            >
                              {row.status === "Review" ? "Resolve" : row.status}
                            </button>
                          ) : (
                            <span className="fs-status" data-status={row.status}>
                              {row.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Trend view={view} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
