"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { plans } from "../data/content";
import "./Pricing.css";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="dl-section dl-pricing" aria-labelledby="dl-pricing-title">
      <div className="dl-wrap">
        <div className="dl-split-head">
          <h2 id="dl-pricing-title" className="dl-h2">
            Priced to stay
            <br />
            <em>out of the way.</em>
          </h2>
          <div className="dl-pricing__switch" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
              Yearly, 20% off
            </button>
          </div>
        </div>
        <ul className="dl-pricing__grid">
          {plans.map((plan) => (
            <li key={plan.id} data-featured={plan.featured || undefined}>
              <h3>{plan.name}</h3>
              <p className="dl-pricing__blurb">{plan.blurb}</p>
              <p className="dl-pricing__price">
                <strong>${annual ? plan.annual : plan.monthly}</strong>
                <span>
                  {plan.unit}
                  {plan.monthly > 0 && (annual ? ", billed yearly" : ", billed monthly")}
                </span>
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#access" className={`dl-btn ${plan.featured ? "dl-btn--white" : "dl-btn--navy"}`}>
                {plan.monthly === 0 ? "Start free" : "Get early access"}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="dl-pricing__note">Prices in US dollars and shown for demonstration.</p>
      </div>
    </section>
  );
}
