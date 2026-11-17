"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { TODAY, companyById, isOpen, openStages, repById, stageMeta } from "../../data/crm";
import type { Deal } from "../../data/crm";
import { formatDay, formatMoney } from "../../data/metrics";
import { StageBadge } from "./Shared";
import { useStore } from "./store";

/** Timeline entries derived from the deal's own dates, followed by notes added in this session. */
function buildTimeline(deal: Deal): Array<{ day: number; text: string }> {
  const company = companyById(deal.companyId);
  const owner = repById(deal.ownerId);
  const span = Math.max(2, deal.closeDay - deal.createdDay);
  const reached = isOpen(deal.stage) ? openStages.indexOf(deal.stage) : deal.stage === "won" ? 4 : 2;
  const steps = [
    { at: 0, text: `Deal created by ${owner.name} from ${deal.source.toLowerCase()} lead.` },
    { at: 0.2, text: `Discovery call with ${company.contact}; need confirmed and deal qualified.` },
    { at: 0.45, text: `Proposal for ${formatMoney(deal.amount)} sent to ${company.name}.` },
    { at: 0.75, text: "Terms under negotiation with procurement." },
  ];
  const entries = steps
    .slice(0, Math.min(reached, 3) + 1)
    .map((step) => ({ day: Math.min(deal.createdDay + Math.round(span * step.at), TODAY), text: step.text }));
  if (deal.stage === "won") entries.push({ day: deal.closeDay, text: `Closed as won for ${formatMoney(deal.amount)}.` });
  if (deal.stage === "lost") entries.push({ day: deal.closeDay, text: "Closed as lost." });
  return [...entries, ...deal.notes.map((note) => ({ day: note.day, text: `Note: ${note.text}` }))].reverse();
}

export function DealDrawer() {
  const { state, dispatch } = useStore();
  const deal = state.deals.find((item) => item.id === state.selectedDealId) ?? null;
  const [note, setNote] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const dealId = deal?.id;

  useEffect(() => {
    if (!dealId) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch({ type: "select", id: null });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [dealId, dispatch]);

  if (!deal) return null;

  const company = companyById(deal.companyId);
  const owner = repById(deal.ownerId);
  const open = isOpen(deal.stage);
  const close = () => dispatch({ type: "select", id: null });

  const addNote = (event: FormEvent) => {
    event.preventDefault();
    if (!note.trim()) return;
    dispatch({ type: "note", id: deal.id, text: note.trim() });
    setNote("");
  };

  return (
    <div className="cl-d-overlay">
      <button type="button" className="cl-d-overlay-scrim" aria-label="Close deal" onClick={close} />
      <aside className="cl-d-drawer" role="dialog" aria-modal="true" aria-labelledby="cl-d-drawer-title">
        <header>
          <div>
            <p className="cl-d-mono">{deal.id}</p>
            <h2 id="cl-d-drawer-title">{deal.title}</h2>
          </div>
          <button ref={closeRef} type="button" className="cl-d-icon-button" aria-label="Close deal" onClick={close}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="cl-d-drawer-body">
          <div className="cl-d-drawer-amount">
            <strong>{formatMoney(deal.amount)}</strong>
            <StageBadge stage={deal.stage} />
            <span>{Math.round(stageMeta[deal.stage].probability * 100)}% likely</span>
          </div>

          <div className="cl-d-steps" role="group" aria-label="Stage">
            {openStages.map((stage) => {
              const done = !open ? deal.stage === "won" : openStages.indexOf(stage) < openStages.indexOf(deal.stage as (typeof openStages)[number]);
              return (
                <button
                  key={stage}
                  type="button"
                  aria-pressed={deal.stage === stage}
                  data-done={done}
                  onClick={() => dispatch({ type: "stage", id: deal.id, stage })}
                >
                  {done && <Check size={13} aria-hidden="true" />}
                  {stageMeta[stage].label}
                </button>
              );
            })}
          </div>

          <div className="cl-d-drawer-actions">
            {open ? (
              <>
                <button type="button" className="cl-d-button cl-d-button-primary" onClick={() => dispatch({ type: "stage", id: deal.id, stage: "won" })}>
                  Mark as won
                </button>
                <button type="button" className="cl-d-button" onClick={() => dispatch({ type: "stage", id: deal.id, stage: "lost" })}>
                  Mark as lost
                </button>
              </>
            ) : (
              <button type="button" className="cl-d-button" onClick={() => dispatch({ type: "stage", id: deal.id, stage: "negotiation" })}>
                Reopen in negotiation
              </button>
            )}
          </div>

          <dl className="cl-d-facts">
            <div>
              <dt>Company</dt>
              <dd>
                {company.name}
                <small>
                  {company.industry}, {company.city}
                </small>
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                {company.contact}
                <small>{company.email}</small>
              </dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>
                {owner.name}
                <small>{owner.region}</small>
              </dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{deal.source}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{formatDay(deal.createdDay)}</dd>
            </div>
            <div>
              <dt>{open ? "Expected close" : "Closed"}</dt>
              <dd>
                {formatDay(deal.closeDay)}
                {open && deal.closeDay < TODAY && <small className="cl-d-due-late">Overdue</small>}
              </dd>
            </div>
          </dl>

          <h3>Activity</h3>
          <ol className="cl-d-timeline">
            {buildTimeline(deal).map((entry, index) => (
              <li key={`${entry.day}-${index}`}>
                <time dateTime={new Date(entry.day * 86_400_000).toISOString().slice(0, 10)}>{formatDay(entry.day)}</time>
                <p>{entry.text}</p>
              </li>
            ))}
          </ol>

          <form className="cl-d-note" onSubmit={addNote}>
            <label htmlFor="cl-d-note-input">Add a note</label>
            <div>
              <input
                id="cl-d-note-input"
                type="text"
                value={note}
                maxLength={160}
                placeholder="Called to confirm the start date"
                onChange={(event) => setNote(event.target.value)}
              />
              <button type="submit" className="cl-d-button" disabled={!note.trim()}>
                Add
              </button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}
