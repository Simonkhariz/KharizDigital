"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type DialogKind = "login" | "demo";
type Errors = Record<string, string>;

const copy: Record<DialogKind, { title: string; intro: string; submit: string; done: string }> = {
  login: {
    title: "Log in to Campusmind",
    intro: "Use your institutional email. On a live campus this would hand over to single sign-on.",
    submit: "Continue",
    done: "This is a demo, so no account was checked and nothing was sent.",
  },
  demo: {
    title: "Book a demo",
    intro: "Tell us about your institution and we will tailor the walkthrough.",
    submit: "Request a demo",
    done: "This is a demo, so nothing was sent.",
  },
};

const roles = ["Academic leadership", "IT and security", "Teaching and learning", "Student services"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** One modal for the two calls to action. Any element with `data-cm-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<DialogKind>("demo");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-cm-open]") : null;
      const next = trigger?.getAttribute("data-cm-open");
      if (next !== "login" && next !== "demo") return;
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
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (kind === "demo" && value("name").length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid institutional email.";
    if (kind === "login" && value("password").length < 8) next.password = "Use at least 8 characters.";
    if (kind === "demo" && value("institution").length < 2) next.institution = "Enter your institution.";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setDone(true);
  };

  const text = copy[kind];
  const field = (name: string, label: string, type = "text", autoComplete?: string) => (
    <div className="cm-field">
      <label htmlFor={`cm-field-${name}`}>{label}</label>
      <input
        id={`cm-field-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `cm-error-${name}` : undefined}
      />
      {errors[name] && <span id={`cm-error-${name}`}>{errors[name]}</span>}
    </div>
  );

  return (
    <dialog
      ref={ref}
      className="cm-dialog"
      aria-labelledby="cm-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="cm-dialog-inner">
        <button type="button" className="cm-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={18} aria-hidden="true" />
        </button>
        <h2 id="cm-dialog-title">{text.title}</h2>
        {done ? (
          <div role="status" className="cm-dialog-done">
            <p>Thanks. {text.done}</p>
            <button type="button" className="cm-pill cm-pill-large" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            {kind === "demo" && field("name", "Your name", "text", "name")}
            {field("email", "Institutional email", "email", "email")}
            {kind === "login" && field("password", "Password", "password", "current-password")}
            {kind === "demo" && field("institution", "Institution", "text", "organization")}
            {kind === "demo" && (
              <div className="cm-field">
                <label htmlFor="cm-field-role">Your area</label>
                <select id="cm-field-role" name="role" defaultValue={roles[0]}>
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
            )}
            <button type="submit" className="cm-pill cm-pill-large">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
