"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { DarkTraces } from "./Circuit";
import { Label } from "./Mark";

const whole = (value: number) => Math.round(value).toLocaleString("en-US");

/* Demonstration model: the assumptions are printed under the result. */
const MINUTES_PER_INVOICE = 9;
const HOURS_PER_PERSON = 6;

interface Control {
  key: "invoices" | "people" | "rate";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}

const controls: Control[] = [
  { key: "invoices", label: "Invoices each month", min: 100, max: 5000, step: 50, format: whole },
  { key: "people", label: "People in the finance team", min: 1, max: 40, step: 1, format: whole },
  { key: "rate", label: "Loaded cost per hour", min: 30, max: 150, step: 5, format: (value) => `$${value}` },
];

export function Estimator() {
  const [values, setValues] = useState({ invoices: 1200, people: 6, rate: 65 });

  const hours = (values.invoices * MINUTES_PER_INVOICE) / 60 + values.people * HOURS_PER_PERSON;
  const yearly = hours * 12 * values.rate;
  const before = Math.min(15, Math.max(5, Math.round(4 + values.invoices / 400 + values.people * 0.15)));
  const after = Math.max(2, Math.round(before * 0.35));
  const fte = hours / 160;

  return (
    <section className="fs-estimate fs-on-dark" id="estimate" aria-labelledby="fs-estimate-title">
      <DarkTraces />
      <DarkTraces flip />
      <header className="fs-head">
        <div>
          <Label>Estimate</Label>
          <h2 className="fs-title" id="fs-estimate-title">
            See what a faster close <span>is worth to your team.</span>
          </h2>
        </div>
        <p>Move the three sliders to match your month. The figures update as you go and never leave this page.</p>
      </header>

      <div className="fs-estimate-grid">
        <form className="fs-sliders" onSubmit={(event) => event.preventDefault()}>
          {controls.map((control, index) => {
            const value = values[control.key];
            const fill = ((value - control.min) / (control.max - control.min)) * 100;
            return (
              <label key={control.key} className="fs-slider">
                <span>
                  <small>/0{index + 1}/</small>
                  {control.label}
                </span>
                <output>{control.format(value)}</output>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={value}
                  style={{ "--fs-fill": `${fill}%` } as CSSProperties}
                  onChange={(event) => setValues({ ...values, [control.key]: Number(event.target.value) })}
                />
                <i aria-hidden="true">
                  <b>{control.format(control.min)}</b>
                  <b>{control.format(control.max)}</b>
                </i>
              </label>
            );
          })}
        </form>

        <div className="fs-result" role="status" aria-live="polite">
          <p className="fs-result-kicker">Time handed back each month</p>
          <p className="fs-result-big">
            {whole(hours)}
            <span>hours</span>
          </p>
          <dl>
            <div>
              <dt>Worth each year</dt>
              <dd>${whole(yearly)}</dd>
            </div>
            <div>
              <dt>Equivalent to</dt>
              <dd>{fte.toFixed(1)} full-time roles</dd>
            </div>
          </dl>
          <div className="fs-close">
            <p>Working days to close the month</p>
            <div className="fs-close-row">
              <span>Today</span>
              <i style={{ width: `${(before / 15) * 100}%` }} />
              <b>{before}</b>
            </div>
            <div className="fs-close-row" data-after="true">
              <span>With Fiscara</span>
              <i style={{ width: `${(after / 15) * 100}%` }} />
              <b>{after}</b>
            </div>
          </div>
          <p className="fs-result-note">
            Assumes {MINUTES_PER_INVOICE} minutes saved per invoice and {HOURS_PER_PERSON} hours of reconciliation per person each month. A demonstration
            model, not a quotation.
          </p>
          <a className="fs-button fs-button-white" href="#demo">
            Check it against your ledger
          </a>
        </div>
      </div>
    </section>
  );
}
