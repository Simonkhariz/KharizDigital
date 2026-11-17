"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { formatCompact, formatMoney, formatPercent } from "../../data/metrics";
import type { PeriodTotals, SeriesPoint, StageSlice } from "../../data/metrics";

/** Tracks the rendered width of a chart container so the SVG can be drawn at 1:1 scale. */
function useWidth(initial: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(240, Math.round(entry.contentRect.width))));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

function niceCeiling(value: number): number {
  if (value <= 0) return 1000;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 1.5, 2, 3, 4, 5, 6, 8, 10].find((candidate) => candidate * magnitude >= value) ?? 10;
  return step * magnitude;
}

/** Smooth path through the points that never overshoots between neighbours. */
function smoothPath(points: Array<[number, number]>): string {
  return points
    .map(([x, y], index) => {
      if (index === 0) return `M${x},${y}`;
      const [prevX, prevY] = points[index - 1];
      const mid = (prevX + x) / 2;
      return `C${mid},${prevY} ${mid},${y} ${x},${y}`;
    })
    .join(" ");
}

export function RevenueChart({ series, caption }: { series: SeriesPoint[]; caption: string }) {
  const [ref, width] = useWidth(720);
  const [active, setActive] = useState<number | null>(null);
  const height = 260;
  const pad = { top: 14, right: 16, bottom: 30, left: 52 };
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;
  const max = niceCeiling(Math.max(...series.map((point) => Math.max(point.current, point.previous))));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => max * ratio);
  const x = (index: number) => pad.left + (series.length === 1 ? innerWidth / 2 : (index / (series.length - 1)) * innerWidth);
  const y = (value: number) => pad.top + innerHeight - (value / max) * innerHeight;
  const current = series.map((point, index): [number, number] => [x(index), y(point.current)]);
  const previous = series.map((point, index): [number, number] => [x(index), y(point.previous)]);
  const labelEvery = Math.ceil(series.length / Math.max(2, Math.floor(innerWidth / 56)));
  const activeIndex = active !== null && active < series.length ? active : null;
  const activePoint = activeIndex === null ? null : series[activeIndex];

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left - pad.left) / innerWidth;
    setActive(Math.min(series.length - 1, Math.max(0, Math.round(ratio * (series.length - 1)))));
  };

  return (
    <div className="cl-d-chart" ref={ref}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={caption}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setActive(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line className="cl-d-grid" x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} />
            <text className="cl-d-axis" x={pad.left - 10} y={y(tick) + 4} textAnchor="end">
              {formatCompact(tick)}
            </text>
          </g>
        ))}
        {series.map((point, index) => (
          <g key={point.title}>
            <line className="cl-d-grid" x1={x(index)} x2={x(index)} y1={pad.top} y2={pad.top + innerHeight} />
            {(series.length - 1 - index) % labelEvery === 0 && (
              <text className="cl-d-axis" x={x(index)} y={height - 8} textAnchor={index === series.length - 1 ? "end" : "middle"}>
                {point.label}
              </text>
            )}
          </g>
        ))}
        <path
          className="cl-d-area"
          d={`${smoothPath(current)} L${x(series.length - 1)},${pad.top + innerHeight} L${x(0)},${pad.top + innerHeight} Z`}
        />
        <path className="cl-d-line cl-d-line-prev" d={smoothPath(previous)} />
        <path className="cl-d-line" d={smoothPath(current)} />
        {activeIndex !== null && activePoint && (
          <g>
            <line className="cl-d-guide" x1={x(activeIndex)} x2={x(activeIndex)} y1={pad.top} y2={pad.top + innerHeight} />
            <circle className="cl-d-dot cl-d-dot-prev" cx={x(activeIndex)} cy={y(activePoint.previous)} r="4" />
            <circle className="cl-d-dot" cx={x(activeIndex)} cy={y(activePoint.current)} r="4.5" />
          </g>
        )}
      </svg>
      {activeIndex !== null && activePoint && (
        <div
          className="cl-d-tip"
          style={{
            left: Math.min(Math.max(x(activeIndex), 92), width - 92),
            top: Math.max(8, Math.min(y(activePoint.current), y(activePoint.previous)) - 78),
          }}
        >
          <strong>{activePoint.title}</strong>
          <span>
            <i className="cl-d-key cl-d-key-a" /> {formatMoney(activePoint.current)}
          </span>
          <span>
            <i className="cl-d-key cl-d-key-b" /> {formatMoney(activePoint.previous)} before
          </span>
        </div>
      )}
      <div className="cl-sr">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Period</th>
            <th scope="col">Won revenue</th>
            <th scope="col">Previous period</th>
          </tr>
        </thead>
        <tbody>
          {series.map((point) => (
            <tr key={point.title}>
              <th scope="row">{point.title}</th>
              <td>{formatMoney(point.current)}</td>
              <td>{formatMoney(point.previous)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export function StageChart({ slices, onSelect }: { slices: StageSlice[]; onSelect: (stage: StageSlice["stage"]) => void }) {
  const [ref, width] = useWidth(420);
  const rowHeight = 46;
  const labelWidth = 92;
  const valueWidth = 64;
  const barWidth = Math.max(40, width - labelWidth - valueWidth);
  const max = Math.max(1, ...slices.map((slice) => slice.value));
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  const shades = [0.3, 0.5, 0.72, 1];

  return (
    <div className="cl-d-chart" ref={ref}>
      <svg
        width={width}
        height={rowHeight * slices.length}
        role="img"
        aria-label={`Open pipeline by stage, ${formatMoney(total)} in total`}
      >
        {slices.map((slice, index) => {
          const top = index * rowHeight;
          const length = slice.value ? Math.max(4, (slice.value / max) * barWidth) : 0;
          return (
            <g
              key={slice.stage}
              className="cl-d-stage-row"
              tabIndex={0}
              role="button"
              aria-label={`${slice.label}: ${slice.count} deals worth ${formatMoney(slice.value)}. Show these deals.`}
              onClick={() => onSelect(slice.stage)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(slice.stage);
                }
              }}
            >
              <rect className="cl-d-stage-hit" x="0" y={top} width={width} height={rowHeight - 4} rx="6" />
              <text className="cl-d-stage-label" x="8" y={top + 19}>
                {slice.label}
              </text>
              <text className="cl-d-axis" x="8" y={top + 34}>
                {slice.count} {slice.count === 1 ? "deal" : "deals"}
              </text>
              <rect className="cl-d-stage-track" x={labelWidth} y={top + 12} width={barWidth} height="18" rx="4" />
              <rect
                className="cl-d-stage-bar"
                x={labelWidth}
                y={top + 12}
                width={length}
                height="18"
                rx="4"
                style={{ opacity: shades[index] }}
              />
              <text className="cl-d-stage-value" x={width - 8} y={top + 26} textAnchor="end">
                {formatCompact(slice.value)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function WinDonut({ totals }: { totals: PeriodTotals }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const rate = totals.winRate ?? 0;
  const gap = totals.wonCount && totals.lostCount ? 3 : 0;
  const wonLength = Math.max(0, circumference * rate - gap);
  const lostLength = Math.max(0, circumference * (1 - rate) - gap);
  const label =
    totals.winRate === null
      ? "No deals were closed in this period"
      : `Win rate ${formatPercent(rate)}: ${totals.wonCount} won, ${totals.lostCount} lost`;

  return (
    <div className="cl-d-donut">
      <svg width="148" height="148" viewBox="0 0 148 148" role="img" aria-label={label}>
        <g transform="rotate(-90 74 74)" fill="none" strokeWidth="16">
          <circle className="cl-d-donut-track" cx="74" cy="74" r={radius} />
          {totals.wonCount > 0 && (
            <circle className="cl-d-donut-won" cx="74" cy="74" r={radius} strokeDasharray={`${wonLength} ${circumference}`} />
          )}
          {totals.lostCount > 0 && (
            <circle
              className="cl-d-donut-lost"
              cx="74"
              cy="74"
              r={radius}
              strokeDasharray={`${lostLength} ${circumference}`}
              strokeDashoffset={-(circumference * rate)}
            />
          )}
        </g>
        <text className="cl-d-donut-value" x="74" y="76" textAnchor="middle">
          {totals.winRate === null ? "n/a" : formatPercent(rate)}
        </text>
        <text className="cl-d-axis" x="74" y="94" textAnchor="middle">
          win rate
        </text>
      </svg>
      <dl className="cl-d-donut-legend">
        <div>
          <dt>
            <i className="cl-d-key cl-d-key-won" /> Won
          </dt>
          <dd>
            <strong>{totals.wonCount}</strong> {formatCompact(totals.wonRevenue)}
          </dd>
        </div>
        <div>
          <dt>
            <i className="cl-d-key cl-d-key-lost" /> Lost
          </dt>
          <dd>
            <strong>{totals.lostCount}</strong> {formatCompact(totals.lostValue)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/** Thin horizontal meter used in tables (quota attainment, source share). */
export function Meter({ ratio, label }: { ratio: number; label: string }) {
  const clamped = Math.min(1, Math.max(0, ratio));
  return (
    <svg className="cl-d-meter" viewBox="0 0 100 8" preserveAspectRatio="none" role="img" aria-label={label}>
      <rect className="cl-d-meter-track" width="100" height="8" rx="4" />
      <rect className={ratio >= 1 ? "cl-d-meter-fill cl-d-meter-full" : "cl-d-meter-fill"} width={clamped * 100} height="8" rx="4" />
    </svg>
  );
}
