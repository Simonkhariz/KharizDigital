"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { apiSample, notes, segments } from "../data/content";

/** Hero slider: the active note is sharp, the next one peeks in from the right. */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((index + step + notes.length) % notes.length);

  return (
    <div className="co-slider" role="group" aria-roledescription="carousel" aria-label="How people use Courierly">
      <span className="co-slider-frame" aria-hidden="true" />
      <div className="co-slider-window">
        <ul className="co-slider-track" style={{ transform: `translateX(calc(${index} * (-66% - 14px)))` }}>
          {notes.map((note, position) => (
            <li key={note.role} className="co-note" aria-hidden={position !== index} data-active={position === index}>
              <div className="co-note-who">
                <span aria-hidden="true">{note.initials}</span>
                <p>
                  <strong>{note.role}</strong>
                  {note.team}
                </p>
              </div>
              <blockquote>“{note.quote}”</blockquote>
            </li>
          ))}
        </ul>
      </div>
      <div className="co-slider-controls">
        <button type="button" aria-label="Previous note" onClick={() => go(-1)}>
          <ArrowLeft size={15} aria-hidden="true" />
        </button>
        <p aria-live="polite">
          {index + 1} / {notes.length}
        </p>
        <button type="button" aria-label="Next note" onClick={() => go(1)}>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function Segments() {
  const [active, setActive] = useState<string>(segments[0].id);
  const [open, setOpen] = useState(false);
  const current = segments.find((segment) => segment.id === active) ?? segments[0];

  return (
    <div className="co-segments" id="segments">
      <p className="co-chip">Trusted by professionals worldwide</p>
      <div className="co-segment-row" role="group" aria-label="Customer segment">
        {segments.map((segment) => (
          <button
            key={segment.id}
            type="button"
            aria-pressed={open && segment.id === active}
            onClick={() => {
              setActive(segment.id);
              setOpen(true);
            }}
          >
            {segment.label}
          </button>
        ))}
      </div>
      <p id="co-segment-text" className="co-segment-text" hidden={!open} aria-live="polite">
        <strong>{current.label}.</strong> {current.text}
      </p>
      <button type="button" className="co-btn co-btn-blue" aria-expanded={open} aria-controls="co-segment-text" onClick={() => setOpen(!open)}>
        {open ? "Hide use cases" : "View use cases"}
      </button>
    </div>
  );
}

type Tab = "request" | "response";

export function ApiPanel() {
  const [tab, setTab] = useState<Tab>("request");
  return (
    <div className="co-api">
      <div className="co-api-tabs" role="tablist" aria-label="API example">
        {(["request", "response"] as const).map((name) => (
          <button key={name} type="button" role="tab" id={`co-api-tab-${name}`} aria-selected={tab === name} aria-controls="co-api-panel" onClick={() => setTab(name)}>
            {name === "request" ? "Request" : "Response"}
          </button>
        ))}
        <span>POST /v1/send</span>
      </div>
      <pre id="co-api-panel" role="tabpanel" aria-labelledby={`co-api-tab-${tab}`} tabIndex={0}>
        <code>{apiSample[tab]}</code>
      </pre>
    </div>
  );
}
