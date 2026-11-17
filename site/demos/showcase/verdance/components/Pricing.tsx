"use client";

import { useState } from "react";
import { plans } from "../data/site";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="vd-section vd-wrap" aria-labelledby="verdance-pricing">
      <header className="vd-sectionHead vd-sectionHeadRow">
        <div>
          <p className="vd-kicker">Pricing</p>
          <h2 id="verdance-pricing">Priced per seat, not per build</h2>
        </div>
        <div className="vd-toggle" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly, save 20%
          </button>
        </div>
      </header>
      <ul className="vd-plans vd-box">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <li key={plan.name} className={plan.featured ? "vd-plan vd-planFeatured" : "vd-plan"}>
              <h3>
                {plan.name}
                {plan.featured && <span>Most teams</span>}
              </h3>
              <p className="vd-planSummary">{plan.summary}</p>
              <p className="vd-price">
                <b>{price === null ? "Custom" : `$${price}`}</b>
                <span>{plan.unit}</span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#start" className={plan.featured ? "vd-btn vd-btnDark" : "vd-btn vd-btnLight"}>
                {plan.cta}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
