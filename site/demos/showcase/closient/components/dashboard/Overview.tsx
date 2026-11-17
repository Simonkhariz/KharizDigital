"use client";

import { ChevronRight, Info, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { TODAY, companyById, isOpen, repById } from "../../data/crm";
import {
  buildKpis,
  filterByOwner,
  formatCompact,
  formatDay,
  formatMoney,
  formatPercent,
  getRange,
  periodTotals,
  pipelineByStage,
  repLeaderboard,
  revenueSeries,
  weightedForecast,
} from "../../data/metrics";
import type { Kpi } from "../../data/metrics";
import { RevenueChart, StageChart, WinDonut } from "./Charts";
import { Card, Delta, RangeBar, StageBadge } from "./Shared";
import { useStore } from "./store";
import type { DealFilters } from "./store";

const kpiTargets: Record<Kpi["id"], Partial<DealFilters>> = {
  revenue: { stage: "won" },
  pipeline: { stage: "open" },
  winRate: { stage: "lost" },
  average: { stage: "won" },
};

export function Overview() {
  const { state, dispatch } = useStore();
  const [insight, setInsight] = useState<number | null>(null);
  const range = getRange(state.range);
  const deals = useMemo(() => filterByOwner(state.deals, state.owner), [state.deals, state.owner]);
  const kpis = buildKpis(deals, range);
  const series = revenueSeries(deals, range);
  const totals = periodTotals(deals, range.start, range.end);
  const previous = periodTotals(deals, range.prevStart, range.prevEnd);
  const forecast = weightedForecast(deals);
  const slices = pipelineByStage(deals, range);
  const leaders = repLeaderboard(state.deals, range, state.settings.quotaScale);
  const closingSoon = deals
    .filter((deal) => isOpen(deal.stage))
    .sort((a, b) => a.closeDay - b.closeDay)
    .slice(0, 5);
  const ownerFilter = state.owner;

  const best = series.reduce((top, point) => (point.current > top.current ? point : top), series[0]);
  const stalled = deals.filter((deal) => isOpen(deal.stage) && deal.closeDay < TODAY + 7 && deal.stage !== "negotiation");
  const insights = [
    {
      question: "Which period brought in the most revenue?",
      answer: `${best.title} was the strongest stretch with ${formatMoney(best.current)} won, out of ${formatMoney(totals.wonRevenue)} for the whole range.`,
    },
    {
      question: "What should the team expect to close next?",
      answer: `Open deals are worth ${formatMoney(deals.filter((deal) => isOpen(deal.stage)).reduce((sum, deal) => sum + deal.amount, 0))}. Weighted by stage, the forecast is ${formatMoney(forecast)}.`,
    },
    {
      question: "Which deals are at risk of slipping?",
      answer: stalled.length
        ? `${stalled.length} open ${stalled.length === 1 ? "deal is" : "deals are"} due within a week but not yet in negotiation, starting with ${stalled[0].id} (${companyById(stalled[0].companyId).name}).`
        : "No open deal is due within a week without already being in negotiation.",
    },
  ];

  return (
    <>
      <RangeBar />

      <div className="cl-d-kpis">
        {kpis.map((kpi) => (
          <article key={kpi.id} className="cl-d-kpi">
            <div className="cl-d-kpi-body">
              <h2>
                {kpi.label}
                <span className="cl-d-info" tabIndex={0} aria-label={kpi.hint} data-tip={kpi.hint}>
                  <Info size={13} aria-hidden="true" />
                </span>
              </h2>
              <p className="cl-d-kpi-value">{kpi.value}</p>
            </div>
            <div className="cl-d-kpi-foot">
              <span className="cl-d-mono">{kpi.deltaText}</span>
              <Delta value={kpi.delta} />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "filters", filters: { ...kpiTargets[kpi.id], owner: ownerFilter }, open: true })
                }
              >
                View details <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="cl-d-grid-main">
        <Card title="Statistics" hint={`Won revenue, ${range.label.toLowerCase()}, against the period before`} className="cl-d-stats">
          <dl className="cl-d-stat-row">
            <div>
              <dt>
                <i className="cl-d-key cl-d-key-a" /> Won revenue
              </dt>
              <dd>
                {formatMoney(totals.wonRevenue)}
                <Delta value={previous.wonRevenue ? (totals.wonRevenue - previous.wonRevenue) / previous.wonRevenue : null} />
              </dd>
            </div>
            <div>
              <dt>
                <i className="cl-d-key cl-d-key-b" /> Previous period
              </dt>
              <dd>{formatMoney(previous.wonRevenue)}</dd>
            </div>
            <div>
              <dt>
                <i className="cl-d-key cl-d-key-c" /> Weighted forecast
              </dt>
              <dd>{formatMoney(forecast)}</dd>
            </div>
          </dl>
          <RevenueChart series={series} caption={`Won revenue, ${range.label.toLowerCase()}, compared with the previous period`} />
        </Card>

        <Card title="Ask the assistant" hint="Answers are worked out from the deals in this demo" className="cl-d-assist">
          <ul className="cl-d-insights">
            {insights.map((item, index) => (
              <li key={item.question}>
                <button type="button" aria-expanded={insight === index} onClick={() => setInsight(insight === index ? null : index)}>
                  <Sparkles size={15} aria-hidden="true" />
                  <span>{item.question}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
                {insight === index && <p>{item.answer}</p>}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="cl-d-grid-three">
        <Card title="Pipeline by stage" hint="Open deals created in the range">
          <StageChart
            slices={slices}
            onSelect={(stage) => dispatch({ type: "filters", filters: { stage, owner: ownerFilter }, open: true })}
          />
        </Card>

        <Card title="Win rate" hint="Deals closed in the range">
          <WinDonut totals={totals} />
          <p className="cl-d-footnote">
            {previous.winRate === null
              ? "Nothing was closed in the period before."
              : `Previous period: ${formatPercent(previous.winRate)} from ${previous.wonCount + previous.lostCount} closed deals.`}
          </p>
        </Card>

        <Card title="Top reps" hint="Won revenue against quota">
          <ol className="cl-d-leaders">
            {leaders.slice(0, 5).map((rep) => (
              <li key={rep.id}>
                <span className="cl-d-avatar cl-d-avatar-small" aria-hidden="true">
                  {rep.initials}
                </span>
                <span>
                  <strong>{rep.name}</strong>
                  <small>{rep.wonCount} won</small>
                </span>
                <span className="cl-d-leader-value">
                  <strong>{formatCompact(rep.wonRevenue)}</strong>
                  <small>{formatPercent(rep.attainment)} of quota</small>
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card
        title="Closing next"
        hint="Open deals by expected close date"
        action={
          <button type="button" className="cl-d-link" onClick={() => dispatch({ type: "view", view: "pipeline" })}>
            Open pipeline <ChevronRight size={14} aria-hidden="true" />
          </button>
        }
      >
        {closingSoon.length === 0 ? (
          <p className="cl-d-empty">There are no open deals for this rep.</p>
        ) : (
          <ul className="cl-d-next">
            {closingSoon.map((deal) => (
              <li key={deal.id}>
                <button type="button" onClick={() => dispatch({ type: "select", id: deal.id })}>
                  <span className="cl-d-next-title">
                    <strong>{deal.title}</strong>
                    <small>
                      {deal.id} · {repById(deal.ownerId).name}
                    </small>
                  </span>
                  <StageBadge stage={deal.stage} />
                  <span className="cl-d-next-date">{formatDay(deal.closeDay, false)}</span>
                  <span className="cl-d-next-amount">{formatMoney(deal.amount)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
