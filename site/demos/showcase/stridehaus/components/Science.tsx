"use client";

import { useState } from "react";
import { SectionHead } from "./Sections";

type Factor = { id: "sleep" | "soreness" | "load"; label: string; min: number; max: number; step: number; unit: string };

const factors: Factor[] = [
  { id: "sleep", label: "Sleep last night", min: 4, max: 10, step: 0.5, unit: "h" },
  { id: "soreness", label: "Muscle soreness", min: 1, max: 10, step: 1, unit: "/ 10" },
  { id: "load", label: "Yesterday's training load", min: 0, max: 200, step: 5, unit: "" },
];

/** Demonstration formula: sleep lifts the score, soreness and load above the athlete's usual 90 pull it down. */
function strideScore(values: Record<Factor["id"], number>) {
  const raw = 46 + (values.sleep - 4) * 8 - (values.soreness - 1) * 3.5 - Math.max(0, values.load - 90) * 0.22;
  return Math.max(5, Math.min(99, Math.round(raw)));
}

function advice(score: number) {
  if (score >= 75) return { verdict: "Push", text: "You are well recovered. A good day for the hardest session of the week." };
  if (score >= 50) return { verdict: "Hold", text: "Train as planned, but keep an eye on how the warm-up feels before you add anything." };
  return { verdict: "Recover", text: "Swap intensity for easy movement today. Sleep and food will do more than another hard rep." };
}

export function Science() {
  const [values, setValues] = useState<Record<Factor["id"], number>>({ sleep: 7.5, soreness: 3, load: 110 });
  const score = strideScore(values);
  const { verdict, text } = advice(score);
  const circumference = 2 * Math.PI * 86;

  return (
    <section className="sh-section sh-science" id="science" aria-label="The science">
      <SectionHead label="the Science" title="One score, three honest inputs.">
        The stride score weighs recovery against recent load. Move the sliders to see how a morning check-in changes the advice.
      </SectionHead>
      <div className="sh-science-box">
        <div className="sh-science-controls">
          {factors.map((factor) => (
            <label key={factor.id}>
              <span>
                {factor.label}
                <b>
                  {values[factor.id]} {factor.unit}
                </b>
              </span>
              <input
                type="range"
                min={factor.min}
                max={factor.max}
                step={factor.step}
                value={values[factor.id]}
                onChange={(event) => setValues((current) => ({ ...current, [factor.id]: Number(event.target.value) }))}
              />
            </label>
          ))}
          <p>Demonstration model. The live app also uses your four-week baseline.</p>
        </div>
        <div className="sh-science-result" aria-live="polite">
          <svg viewBox="0 0 200 200" role="img" aria-label={`Stride score ${score} out of 100`}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#2a2b2e" strokeWidth="14" />
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#a8f76d"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
              transform="rotate(-90 100 100)"
            />
            <text x="100" y="112" textAnchor="middle">
              {score}
            </text>
            <text x="100" y="140" textAnchor="middle" className="sh-science-caption">
              stride score
            </text>
          </svg>
          <strong>{verdict}</strong>
          <p>{text}</p>
        </div>
      </div>
    </section>
  );
}
