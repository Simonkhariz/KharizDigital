"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { TODAY, companyById, openStages, repById, reps, stageMeta, stageOrder } from "../../data/crm";
import type { OpenStage, Stage } from "../../data/crm";
import { filterByOwner, formatCompact, formatDay, formatMoney } from "../../data/metrics";
import { useStore } from "./store";

export function Pipeline() {
  const { state, dispatch } = useStore();
  const deals = filterByOwner(state.deals, state.owner);
  const boardRef = useRef<HTMLDivElement>(null);
  const [stagesInView, setStagesInView] = useState<OpenStage[]>([openStages[0]]);

  const columns = openStages.map((stage) => {
    const stageDeals = deals.filter((deal) => deal.stage === stage).sort((a, b) => a.closeDay - b.closeDay);
    return { stage, deals: stageDeals, total: stageDeals.reduce((sum, deal) => sum + deal.amount, 0) };
  });

  // On phones and tablets the board scrolls sideways; the stage switcher follows whichever columns are on screen.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const stage = (entry.target as HTMLElement).dataset.stage ?? "";
          if (entry.intersectionRatio >= 0.5) visible.add(stage);
          else visible.delete(stage);
        }
        setStagesInView(openStages.filter((stage) => visible.has(stage)));
      },
      { root: board, threshold: 0.5 },
    );
    board.querySelectorAll(":scope > section").forEach((column) => observer.observe(column));
    return () => observer.disconnect();
  }, []);

  const showStage = (stage: OpenStage) => {
    const board = boardRef.current;
    const column = board?.querySelector<HTMLElement>(`:scope > [data-stage="${stage}"]`);
    if (!board || !column) return;
    const inset = parseFloat(getComputedStyle(board).scrollPaddingLeft) || 0;
    board.scrollTo({ left: board.scrollLeft + column.getBoundingClientRect().left - board.getBoundingClientRect().left - inset });
  };

  const moveFromMenu = (event: ChangeEvent<HTMLSelectElement>, id: string) => {
    // The card leaves this column, so keyboard focus is handed to its neighbour first.
    const card = event.currentTarget.closest("li");
    const neighbour = card?.nextElementSibling ?? card?.previousElementSibling;
    neighbour?.querySelector<HTMLElement>(".cl-d-deal-open")?.focus({ preventScroll: true });
    dispatch({ type: "stage", id, stage: event.target.value as Stage });
  };

  return (
    <>
      <div className="cl-d-filters">
        <p className="cl-d-range-text">
          <span className="cl-d-hint-pointer">Move a deal with the arrows on its card, or open it to mark it won or lost.</span>
          <span className="cl-d-hint-touch">Swipe between stages. Move a deal from its card, or open it for the details.</span>
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

      <nav className="cl-d-board-tabs" aria-label="Pipeline stages">
        {columns.map(({ stage, deals: column, total }) => (
          <button
            key={stage}
            type="button"
            aria-current={stagesInView.includes(stage) ? "true" : undefined}
            onClick={() => showStage(stage)}
          >
            <strong>{stageMeta[stage].label}</strong>
            <span>
              {column.length}
              <span className="cl-sr"> {column.length === 1 ? "deal" : "deals"},</span>
              <span aria-hidden="true"> · </span>
              {formatCompact(total)}
            </span>
          </button>
        ))}
      </nav>

      <div className="cl-d-board" ref={boardRef}>
        {columns.map(({ stage, deals: column, total }, stageIndex) => {
          return (
            <section key={stage} className="cl-d-column" data-stage={stage} aria-label={`${stageMeta[stage].label} stage`}>
              <header>
                <h2>
                  {stageMeta[stage].label} <em>{column.length}</em>
                </h2>
                <p>
                  {formatCompact(total)} · {Math.round(stageMeta[stage].probability * 100)}% likely
                </p>
              </header>
              {column.length === 0 && <p className="cl-d-empty">No deals at this stage.</p>}
              <ul>
                {column.map((deal) => {
                  const overdue = deal.closeDay < TODAY;
                  return (
                    <li key={deal.id} className="cl-d-deal-card">
                      <button type="button" className="cl-d-deal-open" onClick={() => dispatch({ type: "select", id: deal.id })}>
                        <strong>{companyById(deal.companyId).name}</strong>
                        <span>{deal.title.split(": ")[1] ?? deal.title}</span>
                        <span className="cl-d-deal-amount">{formatMoney(deal.amount)}</span>
                      </button>
                      <div className="cl-d-deal-foot">
                        <span className="cl-d-avatar cl-d-avatar-small" title={repById(deal.ownerId).name}>
                          <span aria-hidden="true">{repById(deal.ownerId).initials}</span>
                          <span className="cl-sr">Owner: {repById(deal.ownerId).name}</span>
                        </span>
                        <span className={overdue ? "cl-d-due cl-d-due-late" : "cl-d-due"}>
                          {overdue ? "Overdue" : "Due"} {formatDay(deal.closeDay, false)}
                        </span>
                        <span className="cl-d-deal-move">
                          <button
                            type="button"
                            disabled={stageIndex === 0}
                            aria-label={`Move ${deal.id} back a stage`}
                            onClick={() => dispatch({ type: "stage", id: deal.id, stage: openStages[stageIndex - 1] })}
                          >
                            <ChevronLeft size={15} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label={stageIndex === openStages.length - 1 ? `Mark ${deal.id} as won` : `Move ${deal.id} forward a stage`}
                            onClick={() =>
                              dispatch({ type: "stage", id: deal.id, stage: openStages[stageIndex + 1] ?? "won" })
                            }
                          >
                            <ChevronRight size={15} aria-hidden="true" />
                          </button>
                        </span>
                        <span className="cl-d-deal-moveto">
                          <span aria-hidden="true">Move</span>
                          <select value="" aria-label={`Move ${deal.id} to another stage`} onChange={(event) => moveFromMenu(event, deal.id)}>
                            <option value="" disabled>
                              Move to…
                            </option>
                            {stageOrder
                              .filter((target) => target !== stage)
                              .map((target) => (
                                <option key={target} value={target}>
                                  {stageMeta[target].label}
                                </option>
                              ))}
                          </select>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
