"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { nudges } from "../data/content";
import "./Feed.css";

type Status = "open" | "done" | "skipped";

const initial: Record<string, Status> = Object.fromEntries(nudges.map((nudge) => [nudge.id, "open"]));

export function Feed() {
  const [status, setStatus] = useState(initial);
  const [auto, setAuto] = useState(false);

  const saved = nudges.reduce((sum, nudge) => (status[nudge.id] === "done" ? sum + nudge.saves : sum), 0);
  const open = nudges.filter((nudge) => status[nudge.id] === "open").length;

  const set = (id: string, value: Status) => setStatus((all) => ({ ...all, [id]: value }));

  const toggleAuto = () => {
    const nextAuto = !auto;
    setAuto(nextAuto);
    if (nextAuto) setStatus(Object.fromEntries(nudges.map((nudge) => [nudge.id, "done"])));
  };

  const reset = () => {
    setAuto(false);
    setStatus(initial);
  };

  return (
    <section id="product" className="dl-section dl-feed" aria-labelledby="dl-feed-title">
      <div className="dl-wrap dl-feed__inner">
        <div className="dl-feed__copy">
          <p className="dl-pill">Product</p>
          <h2 id="dl-feed-title" className="dl-h2">
            It notices. <em>You decide.</em>
          </h2>
          <p>
            Driftlayer watches for work that is stuck, stale or sitting with the wrong person, and lines up the fix. Try the feed: let an item drift, or wave it away.
          </p>
          <dl className="dl-feed__stats" aria-live="polite">
            <div>
              <dt>{saved} min</dt>
              <dd>handed back so far</dd>
            </div>
            <div>
              <dt>{open}</dt>
              <dd>waiting on you</dd>
            </div>
          </dl>
        </div>

        <div className="dl-feed__panel">
          <div className="dl-feed__bar">
            <p>Today, quietly</p>
            <button type="button" role="switch" aria-checked={auto} className="dl-feed__switch" onClick={toggleAuto}>
              <span aria-hidden="true" />
              Run without asking
            </button>
          </div>
          <ul>
            {nudges.map((nudge) => {
              const state = status[nudge.id];
              return (
                <li key={nudge.id} data-state={state}>
                  <div>
                    <p className="dl-feed__source">{nudge.source}</p>
                    <h3>{nudge.title}</h3>
                    <p className="dl-feed__detail">
                      {state === "done" ? `Done. About ${nudge.saves} minutes handed back.` : state === "skipped" ? "Left as it is. Driftlayer will not raise this again." : nudge.detail}
                    </p>
                  </div>
                  {state === "open" ? (
                    <div className="dl-feed__actions">
                      <button type="button" className="dl-feed__go" onClick={() => set(nudge.id, "done")}>
                        <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                        Let it drift
                      </button>
                      <button type="button" className="dl-feed__skip" aria-label={`Dismiss: ${nudge.title}`} onClick={() => set(nudge.id, "skipped")}>
                        <X size={16} strokeWidth={2.4} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="dl-feed__undo" onClick={() => set(nudge.id, "open")} disabled={auto}>
                      Undo
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <button type="button" className="dl-feed__reset" onClick={reset}>
            <RotateCcw size={14} aria-hidden="true" />
            Reset the feed
          </button>
        </div>
      </div>
    </section>
  );
}
