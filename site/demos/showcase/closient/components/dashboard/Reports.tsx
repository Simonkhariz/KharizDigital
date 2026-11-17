"use client";

import { Download } from "lucide-react";
import {
  averageCycle,
  filterByOwner,
  formatCompact,
  formatMoney,
  formatPercent,
  getRange,
  periodTotals,
  repLeaderboard,
  revenueBySource,
} from "../../data/metrics";
import { Meter } from "./Charts";
import { Card, RangeBar } from "./Shared";
import { useStore } from "./store";

export function Reports() {
  const { state, dispatch } = useStore();
  const range = getRange(state.range);
  const deals = filterByOwner(state.deals, state.owner);
  const totals = periodTotals(deals, range.start, range.end);
  const leaders = repLeaderboard(state.deals, range, state.settings.quotaScale).filter(
    (rep) => state.owner === "all" || rep.id === state.owner,
  );
  const bySource = revenueBySource(deals, range);
  const topSource = Math.max(1, ...bySource.map((row) => row.wonRevenue));
  const cycle = averageCycle(deals, range);
  const teamQuota = leaders.reduce((sum, rep) => sum + rep.quota, 0);
  const teamWon = leaders.reduce((sum, rep) => sum + rep.wonRevenue, 0);

  const summary = [
    { label: "Won revenue", value: formatMoney(totals.wonRevenue) },
    { label: "Quota for the period", value: formatMoney(teamQuota) },
    { label: "Attainment", value: teamQuota ? formatPercent(teamWon / teamQuota) : "n/a" },
    { label: "Average sales cycle", value: cycle === null ? "n/a" : `${cycle} days` },
  ];

  return (
    <>
      <RangeBar />

      <dl className="cl-d-summary">
        {summary.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <Card
        title="Rep performance"
        hint={`${range.label}, quota scaled to the period`}
        action={
          <button
            type="button"
            className="cl-d-button"
            onClick={() => dispatch({ type: "toast", text: "Export is switched off in this demo. Nothing was downloaded." })}
          >
            <Download size={15} aria-hidden="true" /> Export CSV
          </button>
        }
      >
        <div className="cl-d-table-wrap">
          <table className="cl-d-table cl-d-table-static">
            <thead>
              <tr>
                <th scope="col">Rep</th>
                <th scope="col">Region</th>
                <th scope="col" className="cl-d-num">Won</th>
                <th scope="col" className="cl-d-num">Deals won</th>
                <th scope="col" className="cl-d-num">Win rate</th>
                <th scope="col" className="cl-d-num">Open pipeline</th>
                <th scope="col">Quota attainment</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((rep) => (
                <tr key={rep.id}>
                  <td data-label="Rep" className="cl-d-cell-title">
                    <strong>{rep.name}</strong>
                  </td>
                  <td data-label="Region">{rep.region}</td>
                  <td data-label="Won" className="cl-d-num">{formatMoney(rep.wonRevenue)}</td>
                  <td data-label="Deals won" className="cl-d-num">{rep.wonCount}</td>
                  <td data-label="Win rate" className="cl-d-num">{rep.winRate === null ? "n/a" : formatPercent(rep.winRate)}</td>
                  <td data-label="Open pipeline" className="cl-d-num">{formatMoney(rep.openValue)}</td>
                  <td data-label="Quota attainment">
                    <span className="cl-d-attain">
                      <Meter ratio={rep.attainment} label={`${formatPercent(rep.attainment)} of ${formatMoney(rep.quota)} quota`} />
                      <span>{formatPercent(rep.attainment)}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Revenue by source" hint="Where won deals in the range first came from">
        <ul className="cl-d-sources">
          {bySource.map((row) => (
            <li key={row.source}>
              <span className="cl-d-source-name">{row.source}</span>
              <Meter ratio={row.wonRevenue / topSource} label={`${row.source}: ${formatMoney(row.wonRevenue)}`} />
              <strong>{formatCompact(row.wonRevenue)}</strong>
              <small>
                {row.wonCount} won{row.winRate === null ? "" : ` · ${formatPercent(row.winRate)} win rate`}
              </small>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
