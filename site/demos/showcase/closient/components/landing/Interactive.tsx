"use client";

import { Check, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ANNUAL_FACTOR, DASHBOARD_PATH, faqs, plans, steps, suggestions } from "../../data/content";

export function SuggestionList() {
  const [applied, setApplied] = useState<string[]>([]);
  return (
    <ul className="cl-art cl-art-suggest">
      {suggestions.map((item) => {
        const done = applied.includes(item.id);
        return (
          <li key={item.id}>
            <span>
              <strong>
                {item.deal}: {item.change}
              </strong>
              <small>{item.reason}</small>
            </span>
            <button
              type="button"
              aria-pressed={done}
              aria-label={`${done ? "Undo" : "Apply"}: ${item.deal}, ${item.change}`}
              onClick={() => setApplied(done ? applied.filter((id) => id !== item.id) : [...applied, item.id])}
            >
              {done ? (
                <>
                  <Check size={12} aria-hidden="true" /> Applied
                </>
              ) : (
                "Apply"
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <section className="cl-pricing cl-wrap" id="pricing" aria-labelledby="cl-pricing-title">
      <header className="cl-section-head">
        <p className="cl-eyebrow">Pricing</p>
        <h2 id="cl-pricing-title">
          Priced per seat, <span>agents included.</span>
        </h2>
        <div className="cl-billing" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <em>2 months free</em>
          </button>
        </div>
      </header>
      <div className="cl-plans">
        {plans.map((plan) => {
          const price = annual ? plan.monthly * ANNUAL_FACTOR : plan.monthly;
          return (
            <article key={plan.id} className="cl-plan" data-featured={plan.featured ?? false}>
              <h3>{plan.name}</h3>
              <p>{plan.blurb}</p>
              <p className="cl-plan-price">
                <strong>${Number.isInteger(price) ? price : price.toFixed(2)}</strong>
                <span>
                  per seat / month
                  <br />
                  {annual ? `$${plan.monthly * 10} billed yearly` : "billed monthly"}
                </span>
              </p>
              <button type="button" className={plan.featured ? "cl-pill" : "cl-pill cl-pill-dark"} data-cl-open="signup" data-cl-plan={plan.name}>
                Start with {plan.name}
              </button>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="cl-faq cl-wrap" id="faq" aria-labelledby="cl-faq-title">
      <header className="cl-section-head">
        <p className="cl-eyebrow">Questions</p>
        <h2 id="cl-faq-title">
          Asked before <span>every roll-out.</span>
        </h2>
      </header>
      <ul>
        {faqs.map((item, index) => (
          <li key={item.question}>
            <h3>
              <button type="button" aria-expanded={open === index} aria-controls={`cl-faq-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                {item.question}
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            <p id={`cl-faq-${index}`} hidden={open !== index}>
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

type DialogKind = "signup" | "tour";

/** One shared dialog, opened by any element carrying a data-cl-open attribute. */
export function Dialogs() {
  const [kind, setKind] = useState<DialogKind | null>(null);
  const [plan, setPlan] = useState("Team");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-cl-open]");
      if (!trigger) return;
      openerRef.current = trigger;
      setPlan(trigger.dataset.clPlan ?? "Team");
      setStep(0);
      setSent(false);
      setErrors({});
      setKind(trigger.dataset.clOpen === "tour" ? "tour" : "signup");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!kind) return;
    panelRef.current?.querySelector<HTMLElement>("input, button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setKind(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [kind]);

  if (!kind) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid work email.";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <div className="cl-dialog-layer">
      <button type="button" className="cl-dialog-scrim" aria-label="Close" onClick={() => setKind(null)} />
      <div ref={panelRef} className="cl-dialog" role="dialog" aria-modal="true" aria-labelledby="cl-dialog-title">
        <button type="button" className="cl-dialog-close" aria-label="Close" onClick={() => setKind(null)}>
          <X size={18} aria-hidden="true" />
        </button>

        {kind === "tour" && (
          <>
            <p className="cl-eyebrow">
              How it works · step {step + 1} of {steps.length}
            </p>
            <h2 id="cl-dialog-title">{steps[step].title}</h2>
            <p>{steps[step].text}</p>
            <div className="cl-dialog-dots" aria-hidden="true">
              {steps.map((item, index) => (
                <span key={item.title} data-on={index === step} />
              ))}
            </div>
            <div className="cl-dialog-actions">
              <button type="button" className="cl-pill cl-pill-outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </button>
              {step < steps.length - 1 ? (
                <button type="button" className="cl-pill cl-pill-dark" onClick={() => setStep(step + 1)}>
                  Next
                </button>
              ) : (
                <Link className="cl-pill cl-pill-dark" href={DASHBOARD_PATH}>
                  Open the dashboard
                </Link>
              )}
            </div>
          </>
        )}

        {kind === "signup" && sent && (
          <>
            <h2 id="cl-dialog-title">Thanks, {values.name.trim().split(" ")[0]}.</h2>
            <p>This is a demo, so nothing was sent and no account was created. You can still explore the full dashboard.</p>
            <div className="cl-dialog-actions">
              <Link className="cl-pill cl-pill-dark" href={DASHBOARD_PATH}>
                Open the dashboard
              </Link>
            </div>
          </>
        )}

        {kind === "signup" && !sent && (
          <form onSubmit={submit} noValidate>
            <p className="cl-eyebrow">{plan} plan · 14-day trial</p>
            <h2 id="cl-dialog-title">Create your Closient account</h2>
            <label>
              <span>Full name</span>
              <input
                type="text"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "cl-err-name" : undefined}
                onChange={(event) => setValues({ ...values, name: event.target.value })}
              />
              {errors.name && <em id="cl-err-name">{errors.name}</em>}
            </label>
            <label>
              <span>Work email</span>
              <input
                type="email"
                autoComplete="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "cl-err-email" : undefined}
                onChange={(event) => setValues({ ...values, email: event.target.value })}
              />
              {errors.email && <em id="cl-err-email">{errors.email}</em>}
            </label>
            <div className="cl-dialog-actions">
              <button type="submit" className="cl-pill cl-pill-dark">
                Start free trial
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
