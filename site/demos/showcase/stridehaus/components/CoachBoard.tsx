"use client";

import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { squad, type SquadGroup } from "../data/content";
import { SectionHead } from "./Sections";

const groups: ("All" | SquadGroup)[] = ["All", "Sprints", "Distance", "Throws"];

function Trend({ values }: { values: number[] }) {
  const points = values.map((value, index) => `${index * 18},${34 - ((value - 35) / 60) * 30}`).join(" ");
  const rising = values[values.length - 1] >= values[0];
  return (
    <svg className="sh-coach-trend" viewBox="-2 0 76 36" aria-hidden="true">
      <polyline points={points} fill="none" stroke={rising ? "#12a33f" : "#c2453a"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CoachBoard() {
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const [byLoad, setByLoad] = useState(false);

  const rows = squad
    .filter((athlete) => group === "All" || athlete.group === group)
    .sort((a, b) => (byLoad ? b.load - a.load : b.score - a.score));
  const flagged = rows.filter((athlete) => athlete.status !== "Ready").length;

  return (
    <section className="sh-section" id="coaches" aria-label="For coaches">
      <SectionHead label="for Coaches" title="See the whole squad before the warm-up.">
        Every athlete&rsquo;s readiness and load on one screen, with flags for anyone who needs a lighter day.
      </SectionHead>
      <div className="sh-coach">
        <div className="sh-coach-bar">
          <div role="group" aria-label="Filter by group">
            {groups.map((entry) => (
              <button key={entry} type="button" aria-pressed={entry === group} onClick={() => setGroup(entry)}>
                {entry}
              </button>
            ))}
          </div>
          <button type="button" className="sh-coach-sort" onClick={() => setByLoad((value) => !value)}>
            <ArrowDownUp size={14} aria-hidden="true" /> Sorted by {byLoad ? "load" : "stride score"}
          </button>
        </div>
        <div className="sh-coach-scroll">
          <table>
            <caption className="sh-sr">Squad readiness</caption>
            <thead>
              <tr>
                <th scope="col">Athlete</th>
                <th scope="col">Group</th>
                <th scope="col">Stride score</th>
                <th scope="col">7-day load</th>
                <th scope="col">Trend</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((athlete) => (
                <tr key={athlete.name}>
                  <th scope="row">{athlete.name}</th>
                  <td>{athlete.group}</td>
                  <td>
                    <b>{athlete.score}</b>
                  </td>
                  <td>{athlete.load}</td>
                  <td>
                    <Trend values={athlete.trend} />
                  </td>
                  <td>
                    <span className="sh-coach-status" data-status={athlete.status}>
                      {athlete.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sh-coach-foot" aria-live="polite">
          {rows.length} athletes shown, {flagged} flagged for a lighter day. Demonstration squad.
        </p>
      </div>
    </section>
  );
}
