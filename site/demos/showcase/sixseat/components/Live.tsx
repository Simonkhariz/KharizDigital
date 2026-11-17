"use client";

import { ChevronDown, Hand, Pause, Play, RotateCcw, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { layers, posts, seats, sessionSteps, toneColors, useCases, type Tone } from "../data/content";
import { Cube, CursorLabel } from "./Cube";

/** The filled row of the comparison: seats are taken one by one and can be replayed. */
export function SeatRow() {
  const [taken, setTaken] = useState<number>(seats.length);

  useEffect(() => {
    if (taken >= seats.length) return;
    const timer = window.setTimeout(() => setTaken((value) => value + 1), 380);
    return () => window.clearTimeout(timer);
  }, [taken]);

  return (
    <div className="sx-compare-row">
      <div className="sx-compare-label">
        <h3>In Sixseat</h3>
        <p role="status">
          {taken} of {seats.length} seats taken
        </p>
        <button type="button" className="sx-mini" onClick={() => setTaken(1)}>
          <RotateCcw size={13} aria-hidden="true" /> Replay
        </button>
      </div>
      <ul className="sx-seats">
        {seats.map((seat, index) => (
          <li key={seat.id} data-label={seat.labelAt}>
            <Cube tone={seat.tone} size={88} tile ghost={index >= taken} />
            {seat.labelAt !== "none" && index < taken && <CursorLabel label={seat.label} tone={seat.tone} />}
            <span className="sx-sr">{index < taken ? seat.label : "Empty seat"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Line = { who: string; tone: Tone; text: string; kind?: "note" | "system" };

/** A simulated shared run: steps arrive on a timer, and the visitor can steer, pause or take over. */
export function Session() {
  const [count, setCount] = useState(2);
  const [extra, setExtra] = useState<Line[]>([]);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [joined, setJoined] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const done = count >= sessionSteps.length;

  useEffect(() => {
    if (paused || holding || done) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 2200);
    return () => window.clearTimeout(timer);
  }, [count, paused, holding, done]);

  const lines: Line[] = [...sessionSteps.slice(0, count), ...extra];

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines.length]);

  const steer = (event: FormEvent) => {
    event.preventDefault();
    const text = note.trim();
    if (text.length < 3) {
      setError("Write a short note for the agent first.");
      return;
    }
    setError(null);
    setJoined(true);
    setExtra((current) => [
      ...current,
      { who: "You", tone: "ink", text, kind: "note" },
      { who: "Agent 03", tone: "orange", text: "Read your note. Adjusting the next step. (Demo reply: nothing was sent.)" },
    ]);
    setNote("");
  };

  const toggleHold = () => {
    setJoined(true);
    setHolding((value) => !value);
    setExtra((current) => [
      ...current,
      holding
        ? { who: "Session", tone: "ink", text: "You handed the run back to Agent 03.", kind: "system" }
        : { who: "Session", tone: "ink", text: "You took the handoff. Agent 03 is paused with its history attached.", kind: "system" },
    ]);
  };

  const restart = () => {
    setCount(1);
    setExtra([]);
    setPaused(false);
    setHolding(false);
  };

  const people = [
    { name: "Maya", tone: "blue" as Tone, role: "Watching" },
    { name: "Agent 03", tone: "orange" as Tone, role: holding ? "Paused" : done ? "Waiting for review" : "Working" },
    { name: "Research agent", tone: "green" as Tone, role: "Assisting" },
    { name: "Theo", tone: "pink" as Tone, role: "Watching" },
    ...(joined ? [{ name: "You", tone: "ink" as Tone, role: holding ? "Holding the run" : "Steering" }] : []),
  ];

  return (
    <div className="sx-session">
      <header>
        <span className="sx-session-live" data-paused={paused || holding || done}>
          {holding ? "Held by you" : paused ? "Paused" : done ? "Ready for review" : "Live"}
        </span>
        <strong>Vendor contract review</strong>
        <span className="sx-session-seats">
          {people.length} of 6 seats
        </span>
      </header>
      <div className="sx-session-body">
        <aside aria-label="In this session">
          <ul>
            {people.map((person) => (
              <li key={person.name}>
                <i style={{ background: toneColors[person.tone] }} aria-hidden="true" />
                <span>
                  <strong>{person.name}</strong>
                  {person.role}
                </span>
              </li>
            ))}
          </ul>
          {!joined && (
            <button type="button" className="sx-mini" onClick={() => setJoined(true)}>
              Take a seat
            </button>
          )}
        </aside>
        <div className="sx-session-main">
          <ol ref={logRef} className="sx-session-log" aria-live="polite" tabIndex={0} aria-label="Session transcript">
            {lines.map((line, index) => (
              <li key={index} data-kind={line.kind ?? "step"}>
                <b style={{ color: toneColors[line.tone] }}>{line.who}</b>
                <span>{line.text}</span>
              </li>
            ))}
            {!done && !paused && !holding && (
              <li className="sx-session-typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </li>
            )}
          </ol>
          <form onSubmit={steer} noValidate>
            <label className="sx-sr" htmlFor="sx-steer">
              Steer the agent
            </label>
            <input
              id="sx-steer"
              value={note}
              placeholder="Steer the agent: leave a note for its next step"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "sx-steer-error" : undefined}
              onChange={(event) => {
                setNote(event.target.value);
                setError(null);
              }}
            />
            <button type="submit" className="sx-button" aria-label="Send note">
              <Send size={15} aria-hidden="true" />
            </button>
            {error && (
              <p className="sx-field-error" id="sx-steer-error">
                {error}
              </p>
            )}
          </form>
          <div className="sx-session-actions">
            <button type="button" className="sx-mini" disabled={holding || done} onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />} {paused ? "Resume" : "Pause"}
            </button>
            <button type="button" className="sx-mini" aria-pressed={holding} onClick={toggleHold}>
              <Hand size={13} aria-hidden="true" /> {holding ? "Hand it back" : "Take the handoff"}
            </button>
            <button type="button" className="sx-mini" onClick={restart}>
              <RotateCcw size={13} aria-hidden="true" /> Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LayerList() {
  return (
    <ol className="sx-layers">
      {layers.map((layer, index) => (
        <li key={layer.id}>
          <span aria-hidden="true">{index + 1}</span>
          <h3>{layer.title}</h3>
          <p>{layer.text}</p>
        </li>
      ))}
    </ol>
  );
}

type CaseId = (typeof useCases)[number]["id"];

export function CaseTabs() {
  const [id, setId] = useState<CaseId>("engineering");
  const item = useCases.find((entry) => entry.id === id) ?? useCases[0];

  return (
    <div className="sx-cases">
      <div className="sx-cases-tabs" role="tablist" aria-label="Use cases">
        {useCases.map((entry) => (
          <button key={entry.id} type="button" role="tab" id={`sx-case-tab-${entry.id}`} aria-selected={entry.id === id} aria-controls="sx-case-panel" onClick={() => setId(entry.id)}>
            {entry.label}
          </button>
        ))}
      </div>
      <div className="sx-case" id="sx-case-panel" role="tabpanel" aria-labelledby={`sx-case-tab-${id}`}>
        <div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <ul>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="sx-case-art" aria-hidden="true">
          {item.seats.map((tone, index) => (
            <Cube key={`${id}-${index}`} tone={tone} size={84} tile />
          ))}
          {Array.from({ length: 6 - item.seats.length }, (_, index) => (
            <Cube key={`ghost-${index}`} size={84} tile ghost />
          ))}
        </div>
        <p className="sx-case-count">
          {item.seats.length} of 6 seats in a typical {item.label.toLowerCase()} session
        </p>
      </div>
    </div>
  );
}

export function PostList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="sx-posts">
      {posts.map((post) => (
        <li key={post.id}>
          <p className="sx-post-tag">{post.tag}</p>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          {open === post.id && (
            <p className="sx-post-body" id={`sx-post-${post.id}`}>
              {post.body}
            </p>
          )}
          <button type="button" aria-expanded={open === post.id} aria-controls={`sx-post-${post.id}`} onClick={() => setOpen((current) => (current === post.id ? null : post.id))}>
            {open === post.id ? "Close" : "Keep reading"} <ChevronDown size={14} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
