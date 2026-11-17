"use client";

import { useEffect, useState } from "react";
import { runsToday, stages } from "../data/content";
import { Pixel } from "./Marks";

const COLS = 14;
const ROWS = 5;
/** The dissolve is drawn on a finer grid: ten pixels per diagram cell. */
const FINE = 10;

function noise(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function buildDissolve() {
  const width = COLS * FINE;
  const depth = 16;
  const top = ROWS * FINE - depth;
  let d = "";
  for (let y = 0; y < depth; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = (x - width / 2) / 58;
      const dy = (depth - y) / 18;
      const density = 1 - Math.sqrt(dx * dx + dy * dy);
      const filled =
        density > 0.74
          ? noise(x, y) > 0.03
          : density > 0.46
            ? (x + y) % 2 === 0
            : x % 2 === 0 && y % 2 === 0 && noise(x, y) < density * 1.7;
      if (filled) d += `M${x} ${top + y}h1v1h-1z`;
    }
  }
  return d;
}

const dissolve = buildDissolve();
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** Diagram of one agent run. Two stages are lit at a time and the highlight walks along the run. */
export function Pipeline() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [runs, setRuns] = useState(runsToday);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % stages.length);
      setRuns((value) => value + 137);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [paused]);

  const lit = (index: number) => index === step || index === (step + 2) % stages.length;
  const current = stages[step];

  return (
    <div className="rm-pipe" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="rm-pipe__grid">
        <svg className="rm-pipe__dissolve" viewBox={`0 0 ${COLS * FINE} ${ROWS * FINE}`} shapeRendering="crispEdges" aria-hidden="true">
          <path d={dissolve} fill="currentColor" />
        </svg>
        <p className="rm-pipe__runs">
          Runs <strong>{runs.toLocaleString("en-US")}</strong>
        </p>
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            className="rm-stage"
            data-lit={lit(index)}
            aria-pressed={index === step}
            style={{
              left: pct(stage.col, COLS),
              top: pct(stage.row, ROWS),
              width: pct(stage.span, COLS),
              height: pct(1, ROWS),
            }}
            onClick={() => {
              setStep(index);
              setPaused(true);
            }}
          >
            <span className="rm-stage__cut" aria-hidden="true">
              <svg viewBox="0 0 10 10" preserveAspectRatio="none">
                <path d="M0 10 10 0" vectorEffect="non-scaling-stroke" />
              </svg>
              <em>{stage.seconds}</em>
            </span>
            <span className="rm-stage__label">
              <Pixel name={stage.icon} size={16} />
              {stage.label}
            </span>
          </button>
        ))}
      </div>
      <p className="rm-pipe__note" aria-live="polite">
        <span aria-hidden="true" />
        {current.label}: {current.detail} Median {current.seconds}s.
      </p>
    </div>
  );
}
