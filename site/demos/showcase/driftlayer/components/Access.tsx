"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { access } from "../data/content";
import "./Access.css";

type Errors = { email?: string; size?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Access() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const size = String(data.get("size") ?? "");
    const found: Errors = {};
    if (!emailPattern.test(email)) found.email = "Enter a valid work email.";
    if (!size) found.size = "Choose a team size.";
    setErrors(found);
    if (found.email) event.currentTarget.querySelector<HTMLElement>('[name="email"]')?.focus();
    else if (found.size) event.currentTarget.querySelector<HTMLElement>('[name="size"]')?.focus();
    else setDone(true);
  };

  return (
    <section id="access" className="dl-access dl-on-sky" aria-labelledby="dl-access-title">
      <div className="dl-wrap">
        <div className="dl-access__panel">
          <img className="dl-access__art" src="/showcase/driftlayer/access-sky.webp" alt="" width={1600} height={1068} loading="lazy" decoding="async" />
          <h2 id="dl-access-title">
            {access.title[0]}
            <br />
            {access.title[1]}
          </h2>
          <p>{access.body}</p>
          {done ? (
            <div className="dl-access__done" role="status">
              <strong>You are on the list.</strong>
              <span>This is a demo, so nothing was sent and no account was created.</span>
              <button type="button" className="dl-btn dl-btn--soft" onClick={() => setDone(false)}>
                Add another address
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="dl-access__form">
              <div className="dl-access__fields">
                <label htmlFor="dl-access-email" className="dl-sr">
                  Work email
                </label>
                <input id="dl-access-email" name="email" type="email" autoComplete="email" placeholder="Work email" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "dl-access-email-error" : undefined} />
                <label htmlFor="dl-access-size" className="dl-sr">
                  Team size
                </label>
                <select id="dl-access-size" name="size" defaultValue="" aria-invalid={errors.size ? true : undefined} aria-describedby={errors.size ? "dl-access-size-error" : undefined}>
                  <option value="" disabled>
                    Team size
                  </option>
                  {access.sizes.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
                <button type="submit" className="dl-btn dl-btn--navy">
                  Get early access
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
              {(errors.email || errors.size) && (
                <p className="dl-access__errors" role="alert">
                  {errors.email && <span id="dl-access-email-error">{errors.email}</span>}
                  {errors.size && <span id="dl-access-size-error">{errors.size}</span>}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
