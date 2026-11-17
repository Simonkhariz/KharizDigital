"use client";

import { Check } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { pricing } from "../data/content";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const count = new Intl.NumberFormat("en-US");

function rateFor(students: number) {
  return (pricing.tiers.find((tier) => students <= tier.upTo) ?? pricing.tiers[pricing.tiers.length - 1]).rate;
}

export function PricingEstimator() {
  const [students, setStudents] = useState(pricing.initial);
  const rate = rateFor(students);
  const total = pricing.platformFee + students * rate;

  return (
    <section className="cm-section" id="pricing" aria-label="Pricing">
      <div className="cm-head">
        <h2>Simple pricing by enrolment</h2>
        <p>One annual licence covers the whole campus. Move the slider to estimate yours.</p>
      </div>
      <div className="cm-pricing">
        <div className="cm-pricing-controls">
          <label htmlFor="cm-pricing-range">Full-time-equivalent students</label>
          <output htmlFor="cm-pricing-range">{count.format(students)}</output>
          <input
            id="cm-pricing-range"
            type="range"
            min={pricing.min}
            max={pricing.max}
            step={pricing.step}
            value={students}
            onChange={(event) => setStudents(Number(event.target.value))}
            style={{ "--cm-fill": `${((students - pricing.min) / (pricing.max - pricing.min)) * 100}%` } as CSSProperties}
          />
          <div className="cm-pricing-scale" aria-hidden="true">
            <span>{count.format(pricing.min)}</span>
            <span>{count.format(pricing.max)}</span>
          </div>
          <ul className="cm-pricing-tiers">
            {pricing.tiers.map((tier, index) => (
              <li key={tier.upTo} data-active={tier.rate === rate}>
                <span>
                  {index === 0 ? "Up to" : `${count.format(pricing.tiers[index - 1].upTo + 1)} to`} {count.format(tier.upTo)}
                </span>
                <strong>{money.format(tier.rate)} per student</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="cm-pricing-result">
          <p>Estimated annual licence</p>
          <strong aria-live="polite">{money.format(total)}</strong>
          <span>
            {money.format(pricing.platformFee)} platform fee + {count.format(students)} × {money.format(rate)}
          </span>
          <ul>
            {pricing.included.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <button type="button" className="cm-pill cm-pill-large" data-cm-open="demo">
            Get a formal quote
          </button>
        </div>
      </div>
    </section>
  );
}
