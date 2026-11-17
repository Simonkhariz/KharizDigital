"use client";

import { useState } from "react";

type InputId = "age" | "sleep" | "active" | "pulse";

const inputs: { id: InputId; label: string; min: number; max: number; step: number; unit: string }[] = [
  { id: "age", label: "Your age", min: 20, max: 80, step: 1, unit: "years" },
  { id: "sleep", label: "Average sleep", min: 4, max: 10, step: 0.5, unit: "hours" },
  { id: "active", label: "Active days per week", min: 0, max: 7, step: 1, unit: "days" },
  { id: "pulse", label: "Resting heart rate", min: 45, max: 95, step: 1, unit: "bpm" },
];

/**
 * A lifestyle-only illustration of the idea. The app itself works from blood markers;
 * this keeps the page honest by saying so next to the result.
 */
function estimate(values: Record<InputId, number>) {
  const shift = (7.5 - values.sleep) * 0.9 + (3 - values.active) * 0.7 + (values.pulse - 62) * 0.12;
  return Math.round(values.age + Math.max(-9, Math.min(9, shift)));
}

export function AgeCalculator() {
  const [values, setValues] = useState<Record<InputId, number>>({ age: 36, sleep: 7.5, active: 4, pulse: 58 });
  const biological = estimate(values);
  const gap = biological - values.age;
  const verdict = gap === 0 ? "Right on your age" : `${Math.abs(gap)} ${Math.abs(gap) === 1 ? "year" : "years"} ${gap < 0 ? "younger" : "older"}`;

  return (
    <section className="vd-section" id="age" aria-labelledby="vd-age-title">
      <h2 id="vd-age-title" className="vd-title">
        How old is your body, <span>really?</span>
      </h2>
      <div className="vd-calc">
        <div className="vd-calc-inputs">
          {inputs.map((input) => (
            <label key={input.id}>
              <span>
                {input.label}
                <b>
                  {values[input.id]} {input.unit}
                </b>
              </span>
              <input
                type="range"
                min={input.min}
                max={input.max}
                step={input.step}
                value={values[input.id]}
                onChange={(event) => setValues((current) => ({ ...current, [input.id]: Number(event.target.value) }))}
              />
            </label>
          ))}
        </div>
        <div className="vd-calc-result" data-direction={gap <= 0 ? "younger" : "older"} aria-live="polite">
          <span>Estimated biological age</span>
          <strong>{biological}</strong>
          <em>{verdict}</em>
          <p>A quick lifestyle estimate to show the idea. In the app, biological age is calculated from your blood markers.</p>
          <a className="vd-store vd-store-dark" href="#get">
            Get my real number
          </a>
        </div>
      </div>
    </section>
  );
}
