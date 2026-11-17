"use client";

import { useState } from "react";
import { plans } from "../data/site";

type Effort = "standard" | "deep";

export function Pricing() {
  const [effort, setEffort] = useState<Effort>("standard");

  return (
    <section id="pricing" className="md-section" aria-labelledby="meridiem-pricing">
      <header className="md-sectionHead">
        <p className="md-eyebrow">Pricing</p>
        <h2 id="meridiem-pricing" className="md-h2">
          <span>Pay for thinking,</span> <span>only when you need it.</span>
        </h2>
        <div className="md-toggle" role="group" aria-label="Reasoning effort">
          <button type="button" aria-pressed={effort === "standard"} onClick={() => setEffort("standard")}>
            Standard effort
          </button>
          <button type="button" aria-pressed={effort === "deep"} onClick={() => setEffort("deep")}>
            Deep effort
          </button>
        </div>
      </header>
      <ul className="md-plans">
        {plans.map((plan) => (
          <li key={plan.name} className={plan.featured ? "md-plan md-planFeatured" : "md-plan"}>
            <h3>{plan.name}</h3>
            <p className="md-planSummary">{plan.summary}</p>
            <p className="md-price">
              <span>{plan.price[effort]}</span> {plan.unit}
            </p>
            <p className="md-planDetail">{plan.detail[effort]}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a href="#waitlist" className={plan.featured ? "md-button" : "md-button md-buttonLight"}>
              {plan.cta}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
