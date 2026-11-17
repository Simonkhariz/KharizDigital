"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { creditCost, plans } from "../data/content";
import "./Pricing.css";

const number = new Intl.NumberFormat("en-US");

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="al-section" aria-labelledby="al-pricing-title">
      <div className="al-container">
        <div className="al-section-head">
          <p className="al-eyebrow">Pricing</p>
          <h2 id="al-pricing-title" className="al-display">
            Pay for generation, nothing else
          </h2>
          <p>
            A video variant costs {creditCost.video} credits and a still costs {creditCost.still}. The library, campaigns and storefront widgets are included on every plan.
          </p>
          <div className="al-pricing-switch" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
              Annual <span>save 20%</span>
            </button>
          </div>
        </div>

        <ul className="al-pricing-grid">
          {plans.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <li key={plan.id} className={plan.featured ? "al-pricing-featured" : "al-pricing-card"}>
                <div className="al-pricing-top">
                  <h3>{plan.name}</h3>
                  {plan.featured && <span className="al-pricing-badge">Most teams</span>}
                </div>
                <p className="al-pricing-blurb">{plan.blurb}</p>
                <p className="al-pricing-price">
                  <span className="al-display">${price}</span>
                  <span>per month{annual ? ", billed yearly" : ""}</span>
                </p>
                <p className="al-pricing-credits">
                  {number.format(plan.credits)} credits a month, up to {number.format(plan.credits / creditCost.video)} videos
                </p>
                <ul className="al-pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} strokeWidth={2} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#start" className={`al-btn al-btn--lg ${plan.featured ? "al-btn--light" : "al-btn--dark"}`}>
                  {plan.id === "scale" ? "Talk to sales" : "Start free trial"}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="al-pricing-note">Prices in US dollars. The free trial includes 50 credits and needs no card.</p>
      </div>
    </section>
  );
}
