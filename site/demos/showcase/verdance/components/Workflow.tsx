"use client";

import { useState } from "react";
import { workflow } from "../data/site";

export function Workflow() {
  const [active, setActive] = useState(workflow[0].id);
  const step = workflow.find((item) => item.id === active) ?? workflow[0];

  return (
    <section id="workflow" className="vd-section vd-wrap" aria-labelledby="verdance-workflow">
      <header className="vd-sectionHead">
        <p className="vd-kicker">Workflow</p>
        <h2 id="verdance-workflow">From first line to production, without changing tools</h2>
      </header>
      <div className="vd-workflow vd-box">
        <div className="vd-workflowTabs" role="tablist" aria-label="Workflow stage">
          {workflow.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`verdance-wf-${item.id}`}
              aria-selected={item.id === active}
              aria-controls="verdance-wf-panel"
              onClick={() => setActive(item.id)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="vd-workflowPanel" id="verdance-wf-panel" role="tabpanel" aria-labelledby={`verdance-wf-${step.id}`}>
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
          <pre key={step.id} aria-label={`${step.label} terminal output`}>
            {step.log.map((line, index) => (
              <span key={line} style={{ animationDelay: `${index * 140}ms` }}>
                {line}
              </span>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}
