"use client";

import { useState } from "react";
import { apiSample, endpoints } from "../data/site";

export function ApiSection() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(apiSample);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="api" className="vd-section vd-wrap" aria-labelledby="verdance-api">
      <header className="vd-sectionHead">
        <p className="vd-kicker">API</p>
        <h2 id="verdance-api">Everything in the dashboard is an API call</h2>
      </header>
      <div className="vd-api vd-box">
        <ul className="vd-endpoints">
          {endpoints.map((item) => (
            <li key={item.method + item.path}>
              <span className={`vd-method vd-method${item.method}`}>{item.method}</span>
              <code>{item.path}</code>
              <span>{item.note}</span>
            </li>
          ))}
        </ul>
        <div className="vd-sample">
          <div className="vd-sampleBar">
            <span>create-preview.ts</span>
            <button type="button" onClick={copy}>
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre tabIndex={0}>
            <code>{apiSample}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
