"use client";

import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Info,
  KanbanSquare,
  LayoutGrid,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  Table2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DASHBOARD_PATH } from "../../data/content";
import { currentUser, initialDeals } from "../../data/crm";
import {
  buildKpis,
  describeRange,
  formatCompact,
  formatMoney,
  getRange,
  periodTotals,
  rangeOptions,
  revenueSeries,
  weightedForecast,
} from "../../data/metrics";
import type { RangeKey } from "../../data/metrics";
import { LogoMark } from "../Logo";

const menu = [
  { label: "Overview", icon: LayoutGrid, view: "overview" },
  { label: "Pipeline", icon: KanbanSquare, view: "pipeline" },
  { label: "Deals", icon: Table2, view: "deals" },
  { label: "Contacts", icon: Users, view: "contacts" },
  { label: "Reports", icon: BarChart3, view: "reports" },
];

function percent(current: number, previous: number): string {
  if (!previous) return "new";
  const value = ((current - previous) / previous) * 100;
  return `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(1)}%`;
}

/** A small live preview of the dashboard. It reads the same demonstration deals as the full app. */
export function HeroMock() {
  const [rangeKey, setRangeKey] = useState<RangeKey>("12m");
  const range = getRange(rangeKey);
  const kpis = buildKpis(initialDeals, range).slice(0, 2);
  const totals = periodTotals(initialDeals, range.start, range.end);
  const previous = periodTotals(initialDeals, range.prevStart, range.prevEnd);
  const series = revenueSeries(initialDeals, range);
  const max = Math.max(...series.map((point) => point.current)) * 1.15;
  const width = 560;
  const height = 150;
  const points = series.map((point, index): [number, number] => [
    48 + (index / (series.length - 1)) * (width - 48),
    height - (point.current / max) * height,
  ]);
  const path = points
    .map(([x, y], index) => {
      if (index === 0) return `M${x},${y}`;
      const [px, py] = points[index - 1];
      const mid = (px + x) / 2;
      return `C${mid},${py} ${mid},${y} ${x},${y}`;
    })
    .join(" ");

  const stats = [
    { label: "Won revenue", tone: "a", value: formatMoney(totals.wonRevenue), delta: percent(totals.wonRevenue, previous.wonRevenue) },
    { label: "Previous period", tone: "b", value: formatMoney(previous.wonRevenue), delta: null },
    { label: "Forecast", tone: "c", value: formatMoney(weightedForecast(initialDeals)), delta: null },
  ];

  return (
    <div className="cl-mock" aria-label="Preview of the Closient dashboard">
      <div className="cl-mock-window">
        <div className="cl-mock-side">
          <div className="cl-mock-brand">
            <span>
              <LogoMark size={15} /> Closient
            </span>
            <PanelLeft size={12} aria-hidden="true" />
          </div>
          <div className="cl-mock-user">
            <span className="cl-mock-avatar" aria-hidden="true">
              {currentUser.initials}
            </span>
            <span>
              <strong>{currentUser.name}</strong>
              <small>
                <em>TRIAL</em> 12 days left
              </small>
            </span>
            <ChevronDown size={11} aria-hidden="true" />
          </div>
          <Link href={`${DASHBOARD_PATH}#deals`} className="cl-mock-search">
            <Search size={11} aria-hidden="true" />
            <span>Search</span>
            <kbd aria-hidden="true">⌘ /</kbd>
          </Link>
          <p className="cl-mock-label">Main menu</p>
          <Link href={DASHBOARD_PATH} className="cl-mock-item cl-mock-item-ink">
            <Sparkles size={12} aria-hidden="true" /> Assistant <em>NEW</em>
          </Link>
          {menu.map((item) => (
            <Link
              key={item.view}
              href={`${DASHBOARD_PATH}#${item.view}`}
              className="cl-mock-item"
              aria-current={item.view === "overview" ? "true" : undefined}
            >
              <item.icon size={12} aria-hidden="true" /> {item.label}
            </Link>
          ))}
          <p className="cl-mock-label cl-mock-label-rule">Tools</p>
          <Link href={`${DASHBOARD_PATH}#settings`} className="cl-mock-item">
            <Settings size={12} aria-hidden="true" /> Settings
          </Link>
        </div>

        <div className="cl-mock-main">
          <p className="cl-mock-title">Dashboard</p>
          <div className="cl-mock-body">
            <div className="cl-mock-filters">
              <div className="cl-mock-range">
                <label>
                  <span className="cl-sr">Date range</span>
                  <select value={rangeKey} onChange={(event) => setRangeKey(event.target.value as RangeKey)}>
                    {rangeOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        Last {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <span>
                  <CalendarDays size={12} aria-hidden="true" /> {describeRange(range)}
                </span>
              </div>
              <span className="cl-mock-chip">
                All reps <ChevronDown size={11} aria-hidden="true" />
              </span>
            </div>

            <div className="cl-mock-kpis">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="cl-mock-kpi">
                  <div>
                    <p>
                      {kpi.label} <Info size={10} aria-hidden="true" />
                    </p>
                    <strong>{kpi.value}</strong>
                  </div>
                  <div>
                    <span className="cl-mock-mono">{kpi.deltaText}</span>
                    {kpi.delta !== null && (
                      <span className="cl-mock-delta" data-down={kpi.delta < 0}>
                        {kpi.delta >= 0 ? "+" : "-"}
                        {Math.abs(kpi.delta * 100).toFixed(1)}%
                      </span>
                    )}
                    <Link href={`${DASHBOARD_PATH}#deals`}>
                      View details <ChevronRight size={11} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="cl-mock-stats">
              <p className="cl-mock-stats-title">
                Statistics <Info size={10} aria-hidden="true" />
              </p>
              <div className="cl-mock-trio">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p>
                      <i data-tone={stat.tone} /> {stat.label} <Info size={10} aria-hidden="true" />
                    </p>
                    <strong>
                      {stat.value}
                      {stat.delta && <span className="cl-mock-delta">{stat.delta}</span>}
                    </strong>
                  </div>
                ))}
              </div>
              <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={`Won revenue, ${range.label.toLowerCase()}`}>
                {[0.2, 0.6].map((ratio) => (
                  <g key={ratio}>
                    <line x1="48" x2={width} y1={height * ratio} y2={height * ratio} />
                    <text x="0" y={height * ratio + 4}>
                      {formatCompact(max * (1 - ratio))}
                    </text>
                  </g>
                ))}
                {points.map(([x]) => (
                  <line key={x} x1={x} x2={x} y1={height * 0.2} y2={height} />
                ))}
                <path d={path} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
