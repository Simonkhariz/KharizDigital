"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type DialogKind = "open" | "signin" | "sales";
type FieldName = "name" | "email" | "password" | "company" | "message";
type Errors = Partial<Record<FieldName, string>>;

const copy: Record<DialogKind, { title: string; intro: string; submit: string; fields: FieldName[] }> = {
  open: {
    title: "Open an account",
    intro: "Tell us who you are. Verification usually takes two working days.",
    submit: "Start application",
    fields: ["name", "email", "company"],
  },
  signin: {
    title: "Sign in",
    intro: "Welcome back. Enter your account details.",
    submit: "Sign in",
    fields: ["email", "password"],
  },
  sales: {
    title: "Talk to sales",
    intro: "Tell us about your payment volumes and we will be in touch.",
    submit: "Send message",
    fields: ["email", "company", "message"],
  },
};

const labels: Record<FieldName, string> = {
  name: "Your name",
  email: "Work email",
  password: "Password",
  company: "Company",
  message: "What would you like to discuss?",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isDialogKind(value: string | null): value is DialogKind {
  return value === "open" || value === "signin" || value === "sales";
}

function validate(kind: DialogKind, value: (name: FieldName) => string): Errors {
  const errors: Errors = {};
  for (const name of copy[kind].fields) {
    const entry = value(name);
    if (name === "email" && !emailPattern.test(entry)) errors.email = "Enter a valid email address.";
    if (name === "password" && entry.length < 8) errors.password = "Use at least 8 characters.";
    if (name === "name" && entry.length < 2) errors.name = "Enter your name.";
    if (name === "company" && entry.length < 2) errors.company = "Enter your company name.";
    if (name === "message" && entry.length < 10) errors.message = "Add a sentence or two (10 characters or more).";
  }
  return errors;
}

/** One modal for every call to action. Any element with `data-gd-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<DialogKind>("open");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-gd-open]") : null;
      const next = trigger?.getAttribute("data-gd-open") ?? null;
      if (!trigger || !isDialogKind(next)) return;
      setKind(next);
      setErrors({});
      setDone(false);
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = validate(kind, (name) => String(data.get(name) ?? "").trim());
    setErrors(next);
    const firstInvalid = copy[kind].fields.find((name) => next[name]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setDone(true);
  };

  const text = copy[kind];

  return (
    <dialog
      ref={ref}
      className="gd-dialog"
      aria-labelledby="gd-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="gd-dialog-inner">
        <button type="button" className="gd-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={16} aria-hidden="true" />
        </button>
        <h2 id="gd-dialog-title">{text.title}</h2>
        {done ? (
          <div role="status" className="gd-dialog-done">
            <p>Thanks. This is a demo, so nothing was sent and no account was opened.</p>
            <button type="button" className="gd-button" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            {text.fields.map((name) => (
              <div className="gd-field" key={name}>
                <label htmlFor={`gd-field-${name}`}>{labels[name]}</label>
                {name === "message" ? (
                  <textarea
                    id={`gd-field-${name}`}
                    name={name}
                    rows={3}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `gd-error-${name}` : undefined}
                  />
                ) : (
                  <input
                    id={`gd-field-${name}`}
                    name={name}
                    type={name === "email" ? "email" : name === "password" ? "password" : "text"}
                    autoComplete={name === "email" ? "email" : name === "password" ? "current-password" : name === "company" ? "organization" : "name"}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `gd-error-${name}` : undefined}
                  />
                )}
                {errors[name] && (
                  <span className="gd-field-error" id={`gd-error-${name}`}>
                    {errors[name]}
                  </span>
                )}
              </div>
            ))}
            <button type="submit" className="gd-button">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
