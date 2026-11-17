"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { codeSamples, EARN_RATE, money, PAYOUT_FEE, posts } from "../data/content";

type SampleId = (typeof codeSamples)[number]["id"];

export function ApiTabs() {
  const [id, setId] = useState<SampleId>("payout");
  const sample = codeSamples.find((entry) => entry.id === id) ?? codeSamples[0];

  return (
    <div className="gd-code">
      <div className="gd-code-tabs" role="tablist" aria-label="API examples">
        {codeSamples.map((entry) => (
          <button key={entry.id} type="button" role="tab" id={`gd-code-tab-${entry.id}`} aria-selected={entry.id === id} aria-controls="gd-code-panel" onClick={() => setId(entry.id)}>
            {entry.label}
          </button>
        ))}
      </div>
      <div id="gd-code-panel" role="tabpanel" aria-labelledby={`gd-code-tab-${id}`} tabIndex={0}>
        <p>Request</p>
        <pre>
          <code>{sample.lines.join("\n")}</code>
        </pre>
        <p>Response</p>
        <pre className="gd-code-response">
          <code>{sample.response.join("\n")}</code>
        </pre>
      </div>
    </div>
  );
}

export function Calculator() {
  const [payouts, setPayouts] = useState(120);
  const [idle, setIdle] = useState(250000);
  const cost = payouts * PAYOUT_FEE;
  const earned = (idle * EARN_RATE) / 12;

  return (
    <div className="gd-calc">
      <h3>Work out your month</h3>
      <label htmlFor="gd-calc-payouts">
        <span>Payouts a month</span>
        <output htmlFor="gd-calc-payouts">{payouts}</output>
      </label>
      <input id="gd-calc-payouts" type="range" min={10} max={1000} step={10} value={payouts} onChange={(event) => setPayouts(Number(event.target.value))} />
      <label htmlFor="gd-calc-idle">
        <span>Average idle balance</span>
        <output htmlFor="gd-calc-idle">${money(idle, 0)}</output>
      </label>
      <input id="gd-calc-idle" type="range" min={0} max={2000000} step={25000} value={idle} onChange={(event) => setIdle(Number(event.target.value))} />
      <dl aria-live="polite">
        <div>
          <dt>Payout fees</dt>
          <dd>${money(cost)}</dd>
        </div>
        <div>
          <dt>Yield earned at 4.1% a year</dt>
          <dd className="gd-positive">+${money(earned)}</dd>
        </div>
        <div>
          <dt>Net for the month</dt>
          <dd>
            {earned - cost >= 0 ? "+" : "−"}${money(Math.abs(earned - cost))}
          </dd>
        </div>
      </dl>
      <p>An illustration using the demonstration rates on this page.</p>
    </div>
  );
}

export function JournalList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="gd-posts">
      {posts.map((post) => (
        <li key={post.id}>
          <p className="gd-post-date">{post.date}</p>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          {open === post.id && (
            <p className="gd-post-body" id={`gd-post-${post.id}`}>
              {post.body}
            </p>
          )}
          <button
            type="button"
            aria-expanded={open === post.id}
            aria-controls={`gd-post-${post.id}`}
            onClick={() => setOpen((current) => (current === post.id ? null : post.id))}
          >
            {open === post.id ? "Close" : "Read the note"} <ChevronDown size={14} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
