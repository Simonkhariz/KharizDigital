"use client";

import { useState } from "react";
import { plans } from "../data/content";
import { Label, Mark } from "./Mark";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="fs-pricing" id="pricing" aria-labelledby="fs-pricing-title">
      <header className="fs-head">
        <div>
          <Label>Pricing</Label>
          <h2 className="fs-title" id="fs-pricing-title">
            Flat monthly plans. <span>No charge per transaction.</span>
          </h2>
        </div>
        <div className="fs-billing" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <small>2 months free</small>
          </button>
        </div>
      </header>

      <div className="fs-plans">
        {plans.map((plan, index) => {
          /* Annual billing is ten monthly payments, shown as a monthly equivalent. */
          const price = annual ? Math.round((plan.monthly * 10) / 12) : plan.monthly;
          return (
            <article key={plan.name} className="fs-plan" data-featured={plan.featured ?? false}>
              <header>
                <small>/0{index + 1}/</small>
                {plan.featured && <span className="fs-plan-flag">Most teams</span>}
              </header>
              <h3>{plan.name}</h3>
              <p className="fs-plan-blurb">{plan.blurb}</p>
              <p className="fs-plan-price" aria-live="polite">
                <strong>${price}</strong>
                <span>
                  per month
                  <br />
                  {annual ? `$${(plan.monthly * 10).toLocaleString("en-US")} billed yearly` : "billed monthly"}
                </span>
              </p>
              <p className="fs-plan-seats">{plan.seats}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Mark size={13} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" className={plan.featured ? "fs-button fs-button-white" : "fs-button"} data-fs-open="signup">
                Choose {plan.name}
              </button>
            </article>
          );
        })}
      </div>
      <div className="fs-plans-note">
        <span>/Every plan/</span>
        <ul>
          <li>Unlimited transactions</li>
          <li>Encryption in transit and at rest</li>
          <li>Export or delete your data at any time</li>
        </ul>
      </div>
    </section>
  );
}
