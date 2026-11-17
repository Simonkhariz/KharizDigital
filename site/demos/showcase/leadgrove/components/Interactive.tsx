"use client";

import { ArrowRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { YEARLY_FACTOR, faqs, plans, routingRules } from "../data/content";

export function RoutingRules() {
  const [off, setOff] = useState<string[]>([]);
  return (
    <ul className="lg-rules">
      {routingRules.map((rule) => {
        const enabled = !off.includes(rule.id);
        return (
          <li key={rule.id} data-off={!enabled}>
            <span>
              <small>When</small> {rule.when}
              <br />
              <small>Send to</small> {rule.then}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              aria-label={`Rule: ${rule.when}`}
              onClick={() => setOff(enabled ? [...off, rule.id] : off.filter((id) => id !== rule.id))}
            >
              <i />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="lg-pricing lg-wrap" id="pricing" aria-labelledby="lg-pricing-title">
      <header className="lg-head">
        <div>
          <p className="lg-chip">Pricing</p>
          <h2 id="lg-pricing-title">
            Plans that grow
            <br />
            with your pipeline
          </h2>
        </div>
        <div className="lg-billing" role="group" aria-label="Billing period">
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly, 2 months free
          </button>
        </div>
      </header>
      <div className="lg-plans">
        {plans.map((plan) => (
          <article key={plan.id} className="lg-plan" data-featured={plan.featured ?? false}>
            <h3>{plan.name}</h3>
            <p>{plan.blurb}</p>
            <p className="lg-price">
              <strong>${yearly ? plan.monthly * YEARLY_FACTOR : plan.monthly}</strong> per seat / month
              <small>{yearly ? `$${plan.monthly * 10} a seat, billed yearly` : "billed monthly"}</small>
            </p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" /> {feature}
                </li>
              ))}
            </ul>
            <a className={plan.featured ? "lg-button" : "lg-button lg-button-dark"} href="#start">
              Choose {plan.name} <ArrowRight size={17} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="lg-faq lg-wrap" id="faq" aria-labelledby="lg-faq-title">
      <header>
        <p className="lg-chip">Questions</p>
        <h2 id="lg-faq-title">
          Before you
          <br />
          plant anything
        </h2>
      </header>
      <ul>
        {faqs.map((item, index) => (
          <li key={item.question}>
            <h3>
              <button type="button" aria-expanded={open === index} aria-controls={`lg-faq-${index}`} onClick={() => setOpen(open === index ? null : index)}>
                {item.question}
                <span aria-hidden="true">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <p id={`lg-faq-${index}`} hidden={open !== index}>
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StartForm() {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [errors, setErrors] = useState<{ email?: string; team?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid work email.";
    if (!team) next.team = "Choose a team size.";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="lg-form lg-form-done" role="status">
        <Check size={22} aria-hidden="true" />
        <p>
          <strong>Thanks. This is a demo, so nothing was sent.</strong>
          No trial was created for {email.trim()}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setEmail("");
            setTeam("");
          }}
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <form className="lg-form" onSubmit={submit} noValidate>
      <label>
        <span>Work email</span>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "lg-err-email" : undefined}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <em id="lg-err-email">{errors.email}</em>}
      </label>
      <label>
        <span>Sales team size</span>
        <select value={team} aria-invalid={Boolean(errors.team)} aria-describedby={errors.team ? "lg-err-team" : undefined} onChange={(event) => setTeam(event.target.value)}>
          <option value="">Choose</option>
          <option>1 to 5 reps</option>
          <option>6 to 20 reps</option>
          <option>More than 20 reps</option>
        </select>
        {errors.team && <em id="lg-err-team">{errors.team}</em>}
      </label>
      <button type="submit" className="lg-button">
        Start Outreach <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
