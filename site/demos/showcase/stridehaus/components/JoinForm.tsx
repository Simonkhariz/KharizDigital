"use client";

import { useState, type FormEvent } from "react";

const roles = ["Athlete", "Coach", "Club or team"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function JoinForm() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [joined, setJoined] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next: typeof errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (next.name) form.querySelector<HTMLElement>('[name="name"]')?.focus();
    else if (next.email) form.querySelector<HTMLElement>('[name="email"]')?.focus();
    else setJoined(`${name.split(" ")[0]} (${String(data.get("role"))})`);
  };

  return (
    <section className="sh-join" id="join" aria-labelledby="sh-join-title">
      <div className="sh-join-inner">
        <div>
          <h2 id="sh-join-title">Your next personal best starts with one logged session.</h2>
          <p>Create a free account in under a minute. No card, no device required.</p>
        </div>
        {joined ? (
          <div className="sh-join-form" role="status">
            <h3>Thanks, {joined}.</h3>
            <p>This is a demo, so no account was created and nothing was sent.</p>
            <button type="button" className="sh-button sh-button-large" onClick={() => setJoined(null)}>
              Start again
            </button>
          </div>
        ) : (
          <form className="sh-join-form" onSubmit={onSubmit} noValidate>
            <div className="sh-field">
              <label htmlFor="sh-field-name">Name</label>
              <input id="sh-field-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "sh-error-name" : undefined} />
              {errors.name && <span id="sh-error-name">{errors.name}</span>}
            </div>
            <div className="sh-field">
              <label htmlFor="sh-field-email">Email</label>
              <input
                id="sh-field-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "sh-error-email" : undefined}
              />
              {errors.email && <span id="sh-error-email">{errors.email}</span>}
            </div>
            <fieldset className="sh-roles">
              <legend>I am joining as</legend>
              {roles.map((role, index) => (
                <label key={role}>
                  <input type="radio" name="role" value={role} defaultChecked={index === 0} />
                  <span>{role}</span>
                </label>
              ))}
            </fieldset>
            <button type="submit" className="sh-button sh-button-large">
              Join for free
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
