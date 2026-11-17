"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { appointments, roleOptions, sectors, type Sector } from "../data/content";
import { Heading, Label } from "./Bits";

/** Sector chips that filter the appointments table below them. */
export function SectorsAndAppointments() {
  const [sector, setSector] = useState<Sector | null>(null);
  const [all, setAll] = useState(false);
  const matching = sector ? appointments.filter((item) => item.sectors.includes(sector)) : appointments;
  const rows = sector || all ? matching : matching.slice(0, 5);

  return (
    <>
      <section className="wx-band" id="sectors" aria-label="Sectors">
        <div className="wx-section wx-sectors">
          <div className="wx-heading">
            <div>
              <Label>Sectors</Label>
              <h2>
                Where we work.
                <br />
                <span>Eight sectors we know well.</span>
              </h2>
            </div>
          </div>
          <div>
            <ul className="wx-chips" aria-label="Filter recent appointments by sector">
              {sectors.map((name) => (
                <li key={name}>
                  <button type="button" aria-pressed={sector === name} onClick={() => setSector(sector === name ? null : name)}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <p className="wx-chips__note" aria-live="polite">
              {sector
                ? `${matching.length} recent ${matching.length === 1 ? "appointment" : "appointments"} in ${sector.toLowerCase()}, listed below.`
                : "Choose a sector to filter the appointments below."}
            </p>
          </div>
        </div>
      </section>
      <section className="wx-section" id="appointments" aria-label="Recent appointments">
        <Heading label="Recent appointments" first="Recent appointments." second="Clients stay unnamed." />
        <table className="wx-table">
          <caption>{sector ? `Recent appointments in ${sector}` : "Recent appointments"}</caption>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Client</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={`${item.role}-${item.client}`}>
                <th scope="row">{item.role}</th>
                <td>{item.client}</td>
                <td>{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="wx-table__foot">
          {sector ? (
            <button type="button" className="wx-ghost" onClick={() => setSector(null)}>
              Clear filter: {sector}
            </button>
          ) : (
            <button type="button" className="wx-ghost" aria-expanded={all} onClick={() => setAll(!all)}>
              {all ? "Show fewer" : `Show all ${appointments.length}`}
            </button>
          )}
        </div>
      </section>
    </>
  );
}

type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Confidential brief form. It validates and confirms, and sends nothing. */
export function BriefForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentFor, setSentFor] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (value("name").length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid email address.";
    if (value("company").length < 2) next.company = "Enter your company.";
    if (value("message").length < 20) next.message = "Tell us a little more (20 characters or more).";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSentFor(value("role"));
  };

  if (sentFor !== null) {
    return (
      <div className="wx-form wx-form--done" role="status">
        <h3>Thank you.</h3>
        <p>
          This is a demo, so nothing was sent. On a live site a partner would reply within one working day about your{" "}
          {sentFor.toLowerCase()} search.
        </p>
        <button type="button" className="wx-ghost" onClick={() => setSentFor(null)}>
          Write another brief
        </button>
      </div>
    );
  }

  const field = (name: keyof Errors, label: string, type = "text", autoComplete?: string) => (
    <label>
      {label}
      <input name={name} type={type} autoComplete={autoComplete} aria-invalid={Boolean(errors[name])} aria-describedby={`wx-err-${name}`} />
      <span id={`wx-err-${name}`} className="wx-form__err">
        {errors[name]}
      </span>
    </label>
  );

  return (
    <form className="wx-form" onSubmit={onSubmit} noValidate>
      <div className="wx-form__pair">
        {field("name", "Your name", "text", "name")}
        {field("email", "Email", "email", "email")}
      </div>
      <div className="wx-form__pair">
        {field("company", "Company", "text", "organization")}
        <label>
          Role you are hiring
          <select name="role" defaultValue={roleOptions[0]}>
            {roleOptions.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <span className="wx-form__err" />
        </label>
      </div>
      <label>
        What should we know?
        <textarea name="message" rows={4} aria-invalid={Boolean(errors.message)} aria-describedby="wx-err-message" />
        <span id="wx-err-message" className="wx-form__err">
          {errors.message}
        </span>
      </label>
      <div className="wx-form__foot">
        <button type="submit" className="wx-pill">
          Send the brief
          <span aria-hidden="true">
            <ArrowRight size={14} />
          </span>
        </button>
        <p>Read by a partner only. Never shared.</p>
      </div>
    </form>
  );
}
