"use client";

import { useState } from "react";
import clsx from "clsx";
import { annualSaving, plans } from "../data/site";
import { useDialog } from "./Dialogs";
import { page as styles, ui } from "@/demos/showcase/rapporta/styles";

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const open = useDialog();

  return (
    <section id="pricing" aria-labelledby="pricing-title">
      <div className={styles.band}>
        <div className={clsx(styles.inner, styles.sectionHead)}>
          <div>
            <h2 className={styles.h2} id="pricing-title">
              Pay for resolutions, <span>not for seats</span>
            </h2>
            <p className={styles.lede}>Hand-offs to your team are never billed. Change plan at any time.</p>
          </div>
          <div className={styles.toggle} role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
              Annual <small>{annualSaving}</small>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.band}>
        <ul className={clsx(styles.inner, styles.cells3)}>
          {plans.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <li key={plan.id} className={clsx(styles.plan, plan.highlighted && styles.planHighlighted)}>
                <h3 className={styles.planName}>
                  {plan.name}
                  {plan.highlighted && <span className={styles.planTag}>Most chosen</span>}
                </h3>
                <p className={styles.planSummary}>{plan.summary}</p>
                <p className={styles.price}>
                  {price === null ? "Custom" : `$${price}`}
                  {price !== null && <small>per month</small>}
                </p>
                <p className={styles.priceNote}>
                  {price === null
                    ? "Priced on volume and hosting needs"
                    : annual
                      ? `Billed yearly at $${(price * 12).toLocaleString("en-US")}`
                      : "Billed monthly, cancel any time"}
                </p>
                <ul className={styles.planFeatures}>
                  <li>{plan.conversations}</li>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={clsx(ui.btn, ui.md, ui.block, styles.planCta, plan.highlighted ? ui.dark : ui.light)}
                  onClick={() =>
                    open(
                      plan.monthly === null
                        ? { kind: "demo", topic: "Talk to sales" }
                        : { kind: "start", plan: plan.name },
                    )
                  }
                >
                  {plan.cta}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
