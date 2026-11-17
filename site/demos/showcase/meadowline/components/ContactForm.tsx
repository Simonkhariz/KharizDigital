"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { plans } from "../data/content";
import "./Contact.css";

type Fields = { name: string; email: string; plan: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", plan: "", message: "" };

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) errors.email = "Please enter a valid email address.";
  if (fields.message.trim().length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-ml-plan]") : null;
      const plan = target?.getAttribute("data-ml-plan");
      if (plan) {
        setSent(false);
        setFields((current) => ({ ...current, plan }));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof Fields>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div ref={doneRef} className="ml-contact-form" role="status" tabIndex={-1}>
        <CheckCircle2 size={34} className="ml-contact-done-icon" aria-hidden="true" />
        <h3>Thanks, {fields.name.trim().split(" ")[0]}.</h3>
        <p className="ml-contact-done-text">
          This is a demo, so nothing was sent. On a live site a plan for your workflow would reach {fields.email.trim()}{" "}
          within one working day.
        </p>
        <button
          type="button"
          className="ml-contact-submit"
          onClick={() => {
            setFields(empty);
            setSent(false);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="ml-contact-form" onSubmit={onSubmit} noValidate>
      <h3>Start your workflow</h3>
      <div className="ml-contact-field">
        <label htmlFor="ml-name">Name</label>
        <input
          id="ml-name"
          name="name"
          autoComplete="name"
          value={fields.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "ml-name-error" : undefined}
        />
        {errors.name && <span id="ml-name-error">{errors.name}</span>}
      </div>
      <div className="ml-contact-field">
        <label htmlFor="ml-email">Work email</label>
        <input
          id="ml-email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "ml-email-error" : undefined}
        />
        {errors.email && <span id="ml-email-error">{errors.email}</span>}
      </div>
      <div className="ml-contact-field">
        <label htmlFor="ml-plan">Plan you are considering</label>
        <select id="ml-plan" name="plan" value={fields.plan} onChange={(event) => update("plan", event.target.value)}>
          <option value="">Not sure yet</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}: {plan.workflows.toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-contact-field">
        <label htmlFor="ml-message">The workflow you want to automate</label>
        <textarea
          id="ml-message"
          name="message"
          rows={4}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "ml-message-error" : undefined}
        />
        {errors.message && <span id="ml-message-error">{errors.message}</span>}
      </div>
      <button type="submit" className="ml-contact-submit">
        Send request
        <ArrowUpRight size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
