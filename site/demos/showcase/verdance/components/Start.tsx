"use client";

import { useState, type FormEvent } from "react";
import { emailError } from "./forms";

export function Start() {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.querySelector<HTMLInputElement>("[name=email]");
    const value = input?.value ?? "";
    const message = emailError(value);
    setError(message);
    if (message) input?.focus();
    else setEmail(value.trim());
  }

  return (
    <section id="start" className="vd-start" aria-labelledby="verdance-start">
      <img
        className="vd-field-art vd-field-artLow"
        src="/showcase/verdance/cosmos-field.webp"
        alt=""
        width={1920}
        height={1280}
        loading="lazy"
      />
      <div className="vd-startCard">
        <h2 id="verdance-start">Create your workspace</h2>
        {email ? (
          <div role="status" className="vd-startDone">
            <p>
              Thanks. A workspace for <b>{email}</b> would be created now. This is a demo, so nothing was sent.
            </p>
            <button type="button" className="vd-btn vd-btnLight" onClick={() => setEmail(null)}>
              Use another email
            </button>
          </div>
        ) : (
          <>
            <p>Free for up to 3 seats. Connect a repository and get your first preview in about two minutes.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="vd-field">
                <label htmlFor="verdance-start-email">Work email</label>
                <input
                  id="verdance-start-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "verdance-start-error" : undefined}
                />
                {error && <p id="verdance-start-error">{error}</p>}
              </div>
              <button type="submit" className="vd-btn vd-btnDark">
                Start Building
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
