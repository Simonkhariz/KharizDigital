"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { faqs } from "../data/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="fs-faq-list">
      {faqs.map((item, index) => {
        const expanded = open === index;
        return (
          <li key={item.question} data-open={expanded}>
            <h3>
              <button type="button" aria-expanded={expanded} aria-controls={`fs-faq-${index}`} onClick={() => setOpen(expanded ? null : index)}>
                <small>/0{index + 1}/</small>
                <span>{item.question}</span>
                <i aria-hidden="true" />
              </button>
            </h3>
            <div className="fs-faq-answer" id={`fs-faq-${index}`} role="region" aria-hidden={!expanded}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sizes = ["1 to 5", "6 to 15", "16 to 40", "More than 40"];

export function DemoForm() {
  const [values, setValues] = useState({ name: "", email: "", company: "", size: "" });
  const [errors, setErrors] = useState<Partial<typeof values>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<typeof values> = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(values.email.trim())) next.email = "Enter a valid work email.";
    if (values.company.trim().length < 2) next.company = "Enter your company name.";
    if (!values.size) next.size = "Choose a team size.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = (["name", "email", "company", "size"] as const).find((key) => next[key]);
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="fs-form fs-form-done" role="status">
        <span>
          <Check size={20} aria-hidden="true" />
        </span>
        <h3>Thanks, {values.name.trim().split(" ")[0]}.</h3>
        <p>
          This is a demonstration, so nothing was sent and no meeting was booked. On a live site, a walkthrough for {values.company.trim()} would now be
          on its way to {values.email.trim()}.
        </p>
        <button
          type="button"
          className="fs-button"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", company: "", size: "" });
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const fields = [
    { key: "name", label: "Full name", type: "text", autoComplete: "name" },
    { key: "email", label: "Work email", type: "email", autoComplete: "email" },
    { key: "company", label: "Company", type: "text", autoComplete: "organization" },
  ] as const;

  return (
    <form className="fs-form" onSubmit={submit} noValidate>
      <p className="fs-label">/Request/</p>
      {fields.map((field) => (
        <label key={field.key} className="fs-field">
          <span>{field.label}</span>
          <input
            name={field.key}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.key]}
            aria-invalid={Boolean(errors[field.key])}
            aria-describedby={errors[field.key] ? `fs-err-${field.key}` : undefined}
            onChange={(event) => setValues({ ...values, [field.key]: event.target.value })}
          />
          {errors[field.key] && <em id={`fs-err-${field.key}`}>{errors[field.key]}</em>}
        </label>
      ))}
      <label className="fs-field">
        <span>Finance team size</span>
        <select
          name="size"
          value={values.size}
          aria-invalid={Boolean(errors.size)}
          aria-describedby={errors.size ? "fs-err-size" : undefined}
          onChange={(event) => setValues({ ...values, size: event.target.value })}
        >
          <option value="">Choose one</option>
          {sizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
        {errors.size && <em id="fs-err-size">{errors.size}</em>}
      </label>
      <button type="submit" className="fs-button">
        Request demo
      </button>
      <p className="fs-form-note">Demonstration form: nothing is sent or stored.</p>
    </form>
  );
}

type Mode = "login" | "signup";

/** Shared account dialog, opened by any element with a data-fs-open attribute. */
export function AccountDialog() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-fs-open]");
      if (!trigger) return;
      openerRef.current = trigger;
      setSent(false);
      setErrors({});
      setPassword("");
      setMode(trigger.dataset.fsOpen === "login" ? "login" : "signup");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!mode) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("input")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMode(null);
      if (event.key !== "Tab" || !panel) return;
      /* Keep the focus inside the dialog while it is open. */
      const items = [...panel.querySelectorAll<HTMLElement>("button, input, a[href]")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      openerRef.current?.focus();
    };
  }, [mode]);

  if (!mode) return null;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!emailPattern.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <div className="fs-dialog-layer">
      <button type="button" className="fs-dialog-scrim" aria-label="Close" tabIndex={-1} onClick={() => setMode(null)} />
      <div ref={panelRef} className="fs-dialog" role="dialog" aria-modal="true" aria-labelledby="fs-dialog-title">
        <button type="button" className="fs-dialog-close" aria-label="Close" onClick={() => setMode(null)}>
          <X size={17} aria-hidden="true" />
        </button>
        <p className="fs-label">/{mode === "login" ? "Log in" : "Sign up"}/</p>
        {sent ? (
          <>
            <h2 id="fs-dialog-title">{mode === "login" ? "Demo only: no one was signed in." : "Demo only: no account was created."}</h2>
            <p>Thanks for trying the form. Nothing you typed was sent or stored.</p>
            <button type="button" className="fs-button" onClick={() => setMode(null)}>
              Back to the site
            </button>
          </>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id="fs-dialog-title">{mode === "login" ? "Welcome back" : "Start with Fiscara"}</h2>
            <label className="fs-field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "fs-dlg-email" : undefined}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && <em id="fs-dlg-email">{errors.email}</em>}
            </label>
            <label className="fs-field">
              <span>Password</span>
              <input
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "fs-dlg-password" : undefined}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && <em id="fs-dlg-password">{errors.password}</em>}
            </label>
            <button type="submit" className="fs-button">
              {mode === "login" ? "Log in" : "Create account"}
            </button>
            <button type="button" className="fs-dialog-swap" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
              {mode === "login" ? "New here? Sign up instead" : "Already registered? Log in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
