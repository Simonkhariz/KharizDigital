"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { plans } from "../data/content";
import { SectionHead } from "./Sections";

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="sh-section" id="pricing" aria-label="Pricing">
      <SectionHead label="Pricing" title="Free to log. Fair to upgrade." />
      <div className="sh-billing" role="group" aria-label="Billing period">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
          Monthly
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
          Yearly
        </button>
      </div>
      <ul className="sh-plans">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <li key={plan.id} data-featured={plan.featured ?? false}>
              <h3>{plan.name}</h3>
              <p>{plan.blurb}</p>
              <p className="sh-plans-price" aria-live="polite">
                <strong>£{price}</strong>
                <span>{price === 0 ? plan.unit : `${plan.unit}, ${yearly ? "per year" : "per month"}`}</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className={plan.featured ? "sh-button sh-button-large" : "sh-button sh-button-large sh-button-dark"} href="#join">
                {plan.monthly === 0 ? "Join for free" : `Choose ${plan.name}`}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
