"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useCases } from "../data/content";
import "./UseCases.css";

export function UseCases() {
  const [activeId, setActiveId] = useState(useCases[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = useCases.find((item) => item.id === activeId) ?? useCases[0];

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const target = (index + step + useCases.length) % useCases.length;
    setActiveId(useCases[target].id);
    tabs.current[target]?.focus();
  };

  return (
    <section id="use-cases" className="dl-section" aria-labelledby="dl-uses-title">
      <div className="dl-wrap">
        <div className="dl-split-head">
          <h2 id="dl-uses-title" className="dl-h2">
            One layer,
            <br />
            <em>every team.</em>
          </h2>
          <p>The same quiet help, shaped by the work each team actually does.</p>
        </div>

        <div className="dl-uses">
          <div role="tablist" aria-label="Teams" className="dl-uses__tabs">
            {useCases.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`dl-tab-${item.id}`}
                aria-selected={item.id === activeId}
                aria-controls="dl-uses-panel"
                tabIndex={item.id === activeId ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div id="dl-uses-panel" role="tabpanel" aria-labelledby={`dl-tab-${active.id}`} className="dl-uses__panel" key={active.id}>
            <div>
              <h3>{active.title}</h3>
              <p>{active.body}</p>
            </div>
            <ul>
              {active.examples.map((example, index) => (
                <li key={example}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
