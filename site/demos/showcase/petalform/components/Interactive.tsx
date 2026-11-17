"use client";

import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { faqs, plans } from "../data/content";

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="pf-wrap pf-pricing">
      <header className="pf-heading">
        <h2>Pricing that grows with your traffic</h2>
        <p>Start free. Upgrade when the articles start paying for themselves.</p>
        <div className="pf-switch" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly · save 25%
          </button>
        </div>
      </header>
      <ul className="pf-plans">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <li key={plan.id} className={plan.featured ? "pf-plan is-featured" : "pf-plan"}>
              <h3>{plan.name}</h3>
              <p>{plan.summary}</p>
              <p className="pf-plan-price" aria-live="polite">
                <strong>${price}</strong>
                <span>
                  {price === 0
                    ? "free forever"
                    : yearly
                      ? `per month, $${(price * 12).toLocaleString("en-US")} billed yearly`
                      : "per month"}
                </span>
              </p>
              <p className="pf-plan-quota">{plan.articles}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                className={plan.featured ? "pf-pill pf-pill-white" : "pf-pill pf-pill-dark"}
                href="#start"
                data-pf-plan={plan.id}
              >
                {price === 0 ? "Start free" : `Choose ${plan.name}`}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="resources" className="pf-wrap pf-faq">
      <header className="pf-heading">
        <h2>Questions, answered plainly</h2>
        <p>The things teams ask before they publish their first generated article.</p>
      </header>
      <ul>
        {faqs.map((faq, index) => {
          const expanded = open === index;
          return (
            <li key={faq.question}>
              <h3>
                <button
                  type="button"
                  id={`pf-faq-button-${index}`}
                  aria-expanded={expanded}
                  aria-controls={`pf-faq-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  {faq.question}
                  <Plus size={18} aria-hidden="true" />
                </button>
              </h3>
              <div id={`pf-faq-${index}`} role="region" aria-labelledby={`pf-faq-button-${index}`} hidden={!expanded}>
                <p>{faq.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState(plans[0].id);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-pf-plan]") : null;
      const next = trigger?.getAttribute("data-pf-plan");
      if (next) {
        setPlan(next);
        setSent(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="pf-signup" role="status">
        <p className="pf-signup-done">
          Thanks. This is a demo, so nothing was sent. On a live site, {email.trim()} would get a link to start on the{" "}
          {plans.find((entry) => entry.id === plan)?.name} plan.
        </p>
        <button
          type="button"
          className="pf-pill pf-pill-glass"
          onClick={() => {
            setEmail("");
            setSent(false);
          }}
        >
          Use another email
        </button>
      </div>
    );
  }

  return (
    <form className="pf-signup" onSubmit={onSubmit} noValidate>
      <div className="pf-signup-row">
        <label htmlFor="pf-signup-email" className="pf-sr">
          Work email
        </label>
        <input
          ref={inputRef}
          id="pf-signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "pf-signup-error" : undefined}
        />
        <label htmlFor="pf-signup-plan" className="pf-sr">
          Plan
        </label>
        <select id="pf-signup-plan" value={plan} onChange={(event) => setPlan(event.target.value)}>
          {plans.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {entry.name}
            </option>
          ))}
        </select>
        <button type="submit" className="pf-pill pf-pill-white">
          Get started free
        </button>
      </div>
      {error && (
        <p id="pf-signup-error" className="pf-signup-error">
          {error}
        </p>
      )}
    </form>
  );
}
