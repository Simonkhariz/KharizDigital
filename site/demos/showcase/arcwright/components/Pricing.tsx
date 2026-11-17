"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { plans } from "../data/content";
import { SectionHead } from "./Sections";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="aw-section" id="pricing" aria-label="Pricing">
      <div className="aw-pricing-top">
        <SectionHead chip="Pricing" title="Priced by the work that gets done.">
          Every plan includes onboarding with an Arcwright engineer.
        </SectionHead>
        <div className="aw-billing" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly <span>2 months free</span>
          </button>
        </div>
      </div>
      <ul className="aw-plans">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <li key={plan.id} data-featured={plan.featured ?? false}>
              <h3>{plan.name}</h3>
              <p className="aw-plans-blurb">{plan.blurb}</p>
              <p className="aw-plans-price" aria-live="polite">
                <strong>{price === null ? "Custom" : money.format(price)}</strong>
                <span>{price === null ? plan.unit : yearly ? "per month, billed yearly" : plan.unit}</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className={plan.featured ? "aw-button" : "aw-button aw-button-outline"} href={`#demo`} data-plan={plan.name}>
                {plan.cta}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
