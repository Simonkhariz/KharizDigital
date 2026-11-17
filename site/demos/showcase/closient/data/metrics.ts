import { TODAY, dayToDate, isOpen, openStages, reps, sources, stageMeta, toDay } from "./crm";
import type { Deal, OpenStage } from "./crm";

export type RangeKey = "30d" | "90d" | "12m";

export interface RangeInfo {
  key: RangeKey;
  label: string;
  start: number;
  end: number;
  prevStart: number;
  prevEnd: number;
  /** Number of months the range covers, used to scale quotas. */
  months: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const rangeOptions: Array<{ key: RangeKey; label: string }> = [
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "12m", label: "12 months" },
];

export function formatDay(day: number, withYear = true): string {
  const date = dayToDate(day);
  const text = `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
  return withYear ? `${text} ${date.getUTCFullYear()}` : text;
}

export function formatMoney(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 10_000) return `$${Math.round(value / 1_000)}K`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${Math.round(value)}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function monthStart(monthsBack: number): number {
  const today = dayToDate(TODAY);
  const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - monthsBack, 1));
  return toDay(date.toISOString().slice(0, 10));
}

export function getRange(key: RangeKey): RangeInfo {
  if (key === "12m") {
    const start = monthStart(11);
    return { key, label: "Last 12 months", start, end: TODAY, prevStart: monthStart(23), prevEnd: TODAY - 365, months: 11.5 };
  }
  const length = key === "30d" ? 30 : 90;
  const start = TODAY - length + 1;
  return {
    key,
    label: key === "30d" ? "Last 30 days" : "Last 90 days",
    start,
    end: TODAY,
    prevStart: start - length,
    prevEnd: start - 1,
    months: length / 30,
  };
}

export function describeRange(range: RangeInfo): string {
  return `${formatDay(range.start)} to ${formatDay(range.end)}`;
}

function within(day: number, start: number, end: number): boolean {
  return day >= start && day <= end;
}

export function filterByOwner(deals: Deal[], ownerId: string): Deal[] {
  return ownerId === "all" ? deals : deals.filter((deal) => deal.ownerId === ownerId);
}

function sum(deals: Deal[]): number {
  return deals.reduce((total, deal) => total + deal.amount, 0);
}

function change(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return (current - previous) / previous;
}

export interface PeriodTotals {
  wonRevenue: number;
  wonCount: number;
  lostCount: number;
  lostValue: number;
  createdValue: number;
  createdCount: number;
  winRate: number | null;
  averageDeal: number | null;
}

export function periodTotals(deals: Deal[], start: number, end: number): PeriodTotals {
  const won = deals.filter((deal) => deal.stage === "won" && within(deal.closeDay, start, end));
  const lost = deals.filter((deal) => deal.stage === "lost" && within(deal.closeDay, start, end));
  const created = deals.filter((deal) => within(deal.createdDay, start, end));
  const closed = won.length + lost.length;
  return {
    wonRevenue: sum(won),
    wonCount: won.length,
    lostCount: lost.length,
    lostValue: sum(lost),
    createdValue: sum(created),
    createdCount: created.length,
    winRate: closed ? won.length / closed : null,
    averageDeal: won.length ? sum(won) / won.length : null,
  };
}

export interface Kpi {
  id: "revenue" | "pipeline" | "winRate" | "average";
  label: string;
  hint: string;
  value: string;
  deltaText: string;
  /** Relative change against the previous period, or null when there is nothing to compare with. */
  delta: number | null;
}

export function buildKpis(deals: Deal[], range: RangeInfo): Kpi[] {
  const now = periodTotals(deals, range.start, range.end);
  const before = periodTotals(deals, range.prevStart, range.prevEnd);
  const signed = (value: number, format: (v: number) => string) => `${value >= 0 ? "+" : "-"}${format(Math.abs(value))}`;
  const pointDiff =
    now.winRate !== null && before.winRate !== null ? Math.round((now.winRate - before.winRate) * 100) : null;

  return [
    {
      id: "revenue",
      label: "Won revenue",
      hint: "Total value of deals closed as won in the selected period.",
      value: formatMoney(now.wonRevenue),
      deltaText: signed(now.wonRevenue - before.wonRevenue, formatMoney),
      delta: change(now.wonRevenue, before.wonRevenue),
    },
    {
      id: "pipeline",
      label: "New pipeline",
      hint: "Total value of deals created in the selected period, whatever their stage today.",
      value: formatMoney(now.createdValue),
      deltaText: `${now.createdCount} deals`,
      delta: change(now.createdValue, before.createdValue),
    },
    {
      id: "winRate",
      label: "Win rate",
      hint: "Won deals as a share of all deals closed in the selected period.",
      value: now.winRate === null ? "n/a" : formatPercent(now.winRate),
      deltaText: pointDiff === null ? "No earlier data" : `${pointDiff >= 0 ? "+" : "-"}${Math.abs(pointDiff)} pts`,
      delta: now.winRate !== null && before.winRate !== null ? change(now.winRate, before.winRate) : null,
    },
    {
      id: "average",
      label: "Average won deal",
      hint: "Won revenue divided by the number of won deals in the selected period.",
      value: now.averageDeal === null ? "n/a" : formatMoney(now.averageDeal),
      deltaText: `${now.wonCount} won`,
      delta: now.averageDeal !== null && before.averageDeal !== null ? change(now.averageDeal, before.averageDeal) : null,
    },
  ];
}

export interface SeriesPoint {
  label: string;
  /** Longer description used in the tooltip. */
  title: string;
  current: number;
  previous: number;
}

/** Won revenue split into buckets, with the same buckets of the previous period for comparison. */
export function revenueSeries(deals: Deal[], range: RangeInfo): SeriesPoint[] {
  const won = deals.filter((deal) => deal.stage === "won");
  const total = (start: number, end: number) => sum(won.filter((deal) => within(deal.closeDay, start, end)));

  if (range.key === "12m") {
    return Array.from({ length: 12 }, (_, index) => {
      const start = monthStart(11 - index);
      const end = Math.min(monthStart(10 - index) - 1, TODAY);
      const prevStart = monthStart(23 - index);
      const prevEnd = Math.min(monthStart(22 - index) - 1, range.prevEnd);
      const date = dayToDate(start);
      return {
        label: MONTHS[date.getUTCMonth()],
        title: `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}${index === 11 ? " (to date)" : ""}`,
        current: total(start, end),
        previous: total(prevStart, prevEnd),
      };
    });
  }

  const size = range.key === "30d" ? 5 : 10;
  const length = range.end - range.start + 1;
  return Array.from({ length: length / size }, (_, index) => {
    const start = range.start + index * size;
    const end = start + size - 1;
    return {
      label: formatDay(end, false),
      title: `${formatDay(start, false)} to ${formatDay(end, false)}`,
      current: total(start, end),
      previous: total(start - length, end - length),
    };
  });
}

export interface StageSlice {
  stage: OpenStage;
  label: string;
  count: number;
  value: number;
}

/** Open deals created in the range, grouped by their current stage. */
export function pipelineByStage(deals: Deal[], range: RangeInfo): StageSlice[] {
  return openStages.map((stage) => {
    const matching = deals.filter((deal) => deal.stage === stage && within(deal.createdDay, range.start, range.end));
    return { stage, label: stageMeta[stage].label, count: matching.length, value: sum(matching) };
  });
}

export function weightedForecast(deals: Deal[]): number {
  return deals
    .filter((deal) => isOpen(deal.stage))
    .reduce((total, deal) => total + deal.amount * stageMeta[deal.stage].probability, 0);
}

export interface RepRow {
  id: string;
  name: string;
  initials: string;
  region: string;
  wonRevenue: number;
  wonCount: number;
  winRate: number | null;
  openValue: number;
  quota: number;
  attainment: number;
}

export function repLeaderboard(deals: Deal[], range: RangeInfo, quotaScale: number): RepRow[] {
  return reps
    .map((rep) => {
      const own = deals.filter((deal) => deal.ownerId === rep.id);
      const totals = periodTotals(own, range.start, range.end);
      const quota = Math.round(rep.monthlyQuota * range.months * quotaScale);
      return {
        id: rep.id,
        name: rep.name,
        initials: rep.initials,
        region: rep.region,
        wonRevenue: totals.wonRevenue,
        wonCount: totals.wonCount,
        winRate: totals.winRate,
        openValue: sum(own.filter((deal) => isOpen(deal.stage))),
        quota,
        attainment: quota ? totals.wonRevenue / quota : 0,
      };
    })
    .sort((a, b) => b.wonRevenue - a.wonRevenue);
}

export interface SourceRow {
  source: string;
  wonRevenue: number;
  wonCount: number;
  winRate: number | null;
}

export function revenueBySource(deals: Deal[], range: RangeInfo): SourceRow[] {
  return sources
    .map((source) => {
      const totals = periodTotals(
        deals.filter((deal) => deal.source === source),
        range.start,
        range.end,
      );
      return { source, wonRevenue: totals.wonRevenue, wonCount: totals.wonCount, winRate: totals.winRate };
    })
    .sort((a, b) => b.wonRevenue - a.wonRevenue);
}

/** Average number of days between creating and winning a deal in the range. */
export function averageCycle(deals: Deal[], range: RangeInfo): number | null {
  const won = deals.filter((deal) => deal.stage === "won" && within(deal.closeDay, range.start, range.end));
  if (!won.length) return null;
  return Math.round(won.reduce((total, deal) => total + (deal.closeDay - deal.createdDay), 0) / won.length);
}
