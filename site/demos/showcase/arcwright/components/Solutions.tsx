"use client";

import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { agents } from "../data/content";
import { SectionHead } from "./Sections";

export function Solutions() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const agent = agents[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + agents.length) % agents.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="aw-section" id="solutions" aria-label="Solutions">
      <SectionHead chip="Solutions" title="One platform, an agent for each team.">
        Start with the department that feels the most pressure, then add agents as the results come in.
      </SectionHead>
      <div className="aw-solutions">
        <div className="aw-solutions-tabs" role="tablist" aria-label="Agents" aria-orientation="vertical" onKeyDown={onKeyDown}>
          {agents.map((entry, index) => (
            <button
              key={entry.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`aw-solution-tab-${entry.id}`}
              aria-selected={index === active}
              aria-controls="aw-solution-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <strong>{entry.name}</strong>
              <em>{entry.summary}</em>
            </button>
          ))}
        </div>
        <div className="aw-solutions-panel" role="tabpanel" id="aw-solution-panel" aria-labelledby={`aw-solution-tab-${agent.id}`} key={agent.id}>
          <h3>{agent.headline}</h3>
          <p>{agent.body}</p>
          <dl>
            {agent.outcomes.map((outcome) => (
              <div key={outcome.label}>
                <dd>{outcome.value}</dd>
                <dt>{outcome.label}</dt>
              </div>
            ))}
          </dl>
          <div className="aw-solutions-foot">
            <ul aria-label="Connects to">
              {agent.connects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="#demo">
              See it on your data <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
