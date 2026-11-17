"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCases } from "../data/site";
import { emailPattern, Field } from "./Field";

export function Waitlist() {
  const [errors, setErrors] = useState<{ email?: string; useCase?: string }>({});
  const [joined, setJoined] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const useCase = String(data.get("useCase") ?? "");
    const next: typeof errors = {};
    if (!email) next.email = "Enter your work email.";
    else if (!emailPattern.test(email)) next.email = "Enter a valid email, such as name@company.com.";
    if (!useCase) next.useCase = "Choose what you plan to build.";
    setErrors(next);
    if (next.email) form.querySelector<HTMLElement>("[name=email]")?.focus();
    else if (next.useCase) form.querySelector<HTMLElement>("[name=useCase]")?.focus();
    else setJoined(email);
  }

  return (
    <section id="waitlist" className="md-panel md-waitlist" aria-labelledby="meridiem-waitlist">
      <img
        className="md-meadow md-meadowDusk"
        src="/showcase/meridiem/meadow-golden-hour.webp"
        alt=""
        width={1920}
        height={1286}
        loading="lazy"
      />
      <div className="md-glass md-waitlistCard">
        <h2 id="meridiem-waitlist" className="md-h2">
          <span>Join the waitlist.</span>
        </h2>
        {joined ? (
          <div role="status" className="md-confirm">
            <p>
              Thanks. <strong>{joined}</strong> would now be on the list. This is a demo, so nothing was sent.
            </p>
            <button type="button" className="md-pill" onClick={() => setJoined(null)}>
              Add another address
            </button>
          </div>
        ) : (
          <>
            <p>We admit new teams every two weeks, in the order they joined.</p>
            <form onSubmit={handleSubmit} noValidate className="md-form">
              <Field id="meridiem-wl-email" label="Work email" error={errors.email}>
                <input
                  id="meridiem-wl-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "meridiem-wl-email-error" : undefined}
                />
              </Field>
              <Field id="meridiem-wl-use" label="What will you build?" error={errors.useCase}>
                <select
                  id="meridiem-wl-use"
                  name="useCase"
                  defaultValue=""
                  aria-invalid={errors.useCase ? true : undefined}
                  aria-describedby={errors.useCase ? "meridiem-wl-use-error" : undefined}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {useCases.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </Field>
              <button type="submit" className="md-button">
                Join the waitlist <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
