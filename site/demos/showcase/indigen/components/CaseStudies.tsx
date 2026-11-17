"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { caseStudies } from "../data/content";

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const study = caseStudies[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + caseStudies.length) % caseStudies.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="ig-section ig-cases" id="cases" aria-label="Case studies">
      <div className="ig-head">
        <p className="ig-chip">Case studies</p>
        <h2>Results from workflows that are live today.</h2>
      </div>
      <div className="ig-cases-box">
        <div className="ig-cases-tabs" role="tablist" aria-label="Case studies by sector" onKeyDown={onKeyDown}>
          {caseStudies.map((entry, index) => (
            <button
              key={entry.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`ig-case-tab-${entry.id}`}
              aria-selected={index === active}
              aria-controls="ig-case-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {entry.sector}
            </button>
          ))}
        </div>
        <div className="ig-cases-panel" role="tabpanel" id="ig-case-panel" aria-labelledby={`ig-case-tab-${study.id}`} key={study.id}>
          <div className="ig-cases-copy">
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <ul aria-label="Systems connected">
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <dl className="ig-cases-metrics">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
