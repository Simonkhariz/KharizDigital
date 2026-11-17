"use client";

import { ChevronRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { services } from "../data/content";

type Errors = Partial<Record<"name" | "email" | "company" | "notes", string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentFor, setSentFor] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (value("name").length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid work email.";
    if (value("company").length < 2) next.company = "Enter your company name.";
    if (value("notes").length < 10) next.notes = "Describe the workflow in a sentence (10 characters or more).";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setSentFor(value("name").split(" ")[0]);
  };

  const field = (name: keyof Errors, label: string, type = "text", autoComplete?: string) => (
    <div className="ig-field">
      <label htmlFor={`ig-field-${name}`}>{label}</label>
      <input
        id={`ig-field-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `ig-error-${name}` : undefined}
      />
      {errors[name] && <span id={`ig-error-${name}`}>{errors[name]}</span>}
    </div>
  );

  return (
    <section className="ig-book" id="book" aria-labelledby="ig-book-title">
      <div className="ig-book-copy">
        <p className="ig-chip ig-chip-dark">Book a call</p>
        <h2 id="ig-book-title">Tell us about one workflow. We will tell you what it would take.</h2>
        <p>Thirty minutes with an engineer and an operator. You leave with an honest view of what can be automated, how long it takes and what it costs.</p>
      </div>
      {sentFor ? (
        <div className="ig-book-form ig-book-done" role="status">
          <h3>Thanks, {sentFor}.</h3>
          <p>This is a demo, so nothing was sent and no call was booked.</p>
          <button type="button" className="ig-button ig-button-large" onClick={() => setSentFor(null)}>
            Start again
          </button>
        </div>
      ) : (
        <form className="ig-book-form" onSubmit={onSubmit} noValidate>
          <div className="ig-field-pair">
            {field("name", "Your name", "text", "name")}
            {field("email", "Work email", "email", "email")}
          </div>
          {field("company", "Company", "text", "organization")}
          <div className="ig-field">
            <label htmlFor="ig-field-area">Area of work</label>
            <select id="ig-field-area" name="area" defaultValue={services[0].title}>
              {services.map((service) => (
                <option key={service.id}>{service.title}</option>
              ))}
            </select>
          </div>
          <div className="ig-field">
            <label htmlFor="ig-field-notes">What takes your team the most time?</label>
            <textarea
              id="ig-field-notes"
              name="notes"
              rows={3}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? "ig-error-notes" : undefined}
            />
            {errors.notes && <span id="ig-error-notes">{errors.notes}</span>}
          </div>
          <button type="submit" className="ig-button ig-button-large">
            Request a call <ChevronRight size={16} aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
