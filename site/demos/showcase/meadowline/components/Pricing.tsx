"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { plans } from "../data/content";
import { ArrowLink, Tag } from "./Brand";
import "./Pricing.css";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="ml-pricing-section">
      <header className="ml-pricing-header">
        <Tag>Pricing</Tag>
        <h2>
          Simple plans that
          <br />
          grow <em>with you.</em>
        </h2>
        <p>Every plan includes setup, monitoring and a named person to talk to. Change or cancel at any time.</p>
        <div className="ml-pricing-switch" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <span>save 20%</span>
          </button>
        </div>
      </header>
      <ul className="ml-pricing-grid">
        {plans.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <li key={plan.id} className={clsx("ml-pricing-plan", plan.featured && "ml-pricing-featured")}>
              {plan.featured && <span className="ml-pricing-flag">Most chosen</span>}
              <h3>{plan.name}</h3>
              <p className="ml-pricing-summary">{plan.summary}</p>
              <p className="ml-pricing-price" aria-live="polite">
                <strong>${price}</strong>
                <span>
                  per month
                  <br />
                  {annual ? `billed $${(price * 12).toLocaleString("en-US")} yearly` : "billed monthly"}
                </span>
              </p>
              <p className="ml-pricing-workflows">{plan.workflows}</p>
              <ul className="ml-pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ArrowLink href="#contact" plan={plan.id}>Choose {plan.name}</ArrowLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
