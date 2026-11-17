"use client";

import { useState, type FormEvent } from "react";
import { agents } from "../data/content";
import { Chip } from "./Sections";

type FieldName = "name" | "email" | "company";
type Errors = Partial<Record<FieldName, string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function DemoForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (value("name").length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid work email.";
    if (value("company").length < 2) next.company = "Enter your company name.";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setSummary(`${value("name").split(" ")[0]}, a demo of the ${value("agent")} for ${value("company")}`);
  };

  const field = (name: FieldName, label: string, type = "text", autoComplete?: string) => (
    <div className="aw-field">
      <label htmlFor={`aw-field-${name}`}>{label}</label>
      <input
        id={`aw-field-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `aw-error-${name}` : undefined}
      />
      {errors[name] && <span id={`aw-error-${name}`}>{errors[name]}</span>}
    </div>
  );

  return (
    <section className="aw-dark aw-demo" id="demo" aria-labelledby="aw-demo-title">
      <div className="aw-demo-copy">
        <Chip>Book a demo</Chip>
        <h2 id="aw-demo-title">
          See an agent finish a workflow <span>on your own data.</span>
        </h2>
        <p>Forty minutes with a solutions engineer. Bring one process that takes your team too long and we will map it live.</p>
      </div>
      {summary ? (
        <div className="aw-demo-form aw-demo-done" role="status">
          <h3>Thanks. This is a demo, so nothing was sent.</h3>
          <p>On a live site we would now confirm: {summary}.</p>
          <button type="button" className="aw-button aw-button-outline" onClick={() => setSummary(null)}>
            Start again
          </button>
        </div>
      ) : (
        <form className="aw-demo-form" onSubmit={onSubmit} noValidate>
          {field("name", "Your name", "text", "name")}
          {field("email", "Work email", "email", "email")}
          {field("company", "Company", "text", "organization")}
          <div className="aw-field">
            <label htmlFor="aw-field-agent">Which agent interests you most?</label>
            <select id="aw-field-agent" name="agent" defaultValue={agents[0].name}>
              {agents.map((agent) => (
                <option key={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="aw-button">
            Book a Demo
          </button>
        </form>
      )}
    </section>
  );
}
