"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { codeSamples } from "../data/site";

export function ApiSection() {
  const [active, setActive] = useState(codeSamples[0].id);
  const [copied, setCopied] = useState(false);
  const sample = codeSamples.find((item) => item.id === active) ?? codeSamples[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="api" className="md-section md-api" aria-labelledby="meridiem-api">
      <header className="md-sectionHead md-sectionHeadLeft">
        <p className="md-eyebrow">API</p>
        <h2 id="meridiem-api" className="md-h2">
          <span>One endpoint.</span> <span>Built in minutes.</span>
        </h2>
        <p className="md-sub">
          Send a question, choose how hard the model should think, and receive the answer with its reasoning trace.
        </p>
        <ul className="md-ticks">
          <li>Standard or deep effort per request</li>
          <li>Structured trace in every response</li>
          <li>Client libraries for Python and TypeScript</li>
        </ul>
      </header>
      <div className="md-code">
        <div className="md-codeBar">
          <div role="tablist" aria-label="Code sample language">
            {codeSamples.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`meridiem-tab-${item.id}`}
                aria-selected={item.id === active}
                aria-controls="meridiem-code-panel"
                onClick={() => {
                  setActive(item.id);
                  setCopied(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button type="button" className="md-copy" onClick={copy}>
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <pre id="meridiem-code-panel" role="tabpanel" aria-labelledby={`meridiem-tab-${sample.id}`} tabIndex={0}>
          <code>{sample.code}</code>
        </pre>
      </div>
    </section>
  );
}
