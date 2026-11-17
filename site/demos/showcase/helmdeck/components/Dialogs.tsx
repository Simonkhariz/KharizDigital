"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { plans } from "../data/content";
import "./Dialogs.css";

type DialogKind = "download" | "login" | "signup" | "expert";
type Errors = Record<string, string>;

const copy: Record<DialogKind, { title: string; intro: string; submit: string; done: string }> = {
  download: {
    title: "Download Helmdeck 2.0",
    intro: "Choose your platform. The installer is about 148 MB.",
    submit: "Download",
    done: "This is a concept site, so no installer was downloaded.",
  },
  login: {
    title: "Log in",
    intro: "Welcome back. Enter your workspace details.",
    submit: "Log in",
    done: "This is a demo, so no account was checked and nothing was sent.",
  },
  signup: {
    title: "Create your account",
    intro: "Start on any plan. You can change it later.",
    submit: "Create account",
    done: "This is a demo, so no account was created and nothing was sent.",
  },
  expert: {
    title: "Speak to an expert",
    intro: "Tell us about your team and we will suggest a setup.",
    submit: "Request a call",
    done: "This is a demo, so nothing was sent.",
  },
};

const platforms = ["macOS (Apple silicon)", "macOS (Intel)", "Windows", "Linux"] as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isDialogKind(value: string | null): value is DialogKind {
  return value === "download" || value === "login" || value === "signup" || value === "expert";
}

/** One modal for every call to action. Any element with `data-hd-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<DialogKind>("download");
  const [plan, setPlan] = useState<string>("starter");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-hd-open]") : null;
      const next = trigger?.getAttribute("data-hd-open") ?? null;
      if (!trigger || !isDialogKind(next)) return;
      setKind(next);
      setPlan(trigger.getAttribute("data-hd-plan") ?? "starter");
      setErrors({});
      setDone(null);
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
    if (kind !== "download" && !emailPattern.test(value("email"))) next.email = "Enter a valid work email.";
    if ((kind === "login" || kind === "signup") && value("password").length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if ((kind === "signup" || kind === "expert") && value("team").length < 2) next.team = "Enter your team name.";
    if (kind === "expert" && value("message").length < 10) next.message = "Add a sentence or two (10 characters or more).";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const detail =
      kind === "download"
        ? `You picked ${value("platform")}. `
        : kind === "signup"
          ? `Team “${value("team")}” on the ${plans.find((entry) => entry.id === value("plan"))?.name ?? "Starter"} plan. `
          : "";
    setDone(`${detail}${copy[kind].done}`);
  };

  const text = copy[kind];
  const field = (name: string, label: string, type = "text", autoComplete?: string) => (
    <div className="hd-dialog-field">
      <label htmlFor={`hd-field-${name}`}>{label}</label>
      <input
        id={`hd-field-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `hd-error-${name}` : undefined}
      />
      {errors[name] && <span id={`hd-error-${name}`}>{errors[name]}</span>}
    </div>
  );

  return (
    <dialog
      ref={ref}
      className="hd-dialog"
      aria-labelledby="hd-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="hd-dialog-inner">
        <button type="button" className="hd-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={18} aria-hidden="true" />
        </button>
        <h2 id="hd-dialog-title">{text.title}</h2>
        {done ? (
          <div role="status" className="hd-dialog-done">
            <p>Thanks. {done}</p>
            <button type="button" className="hd-button hd-button-large" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            {kind === "download" && (
              <fieldset className="hd-dialog-options">
                <legend className="hd-sr">Platform</legend>
                {platforms.map((platform, index) => (
                  <label key={platform}>
                    <input type="radio" name="platform" value={platform} defaultChecked={index === 0} />
                    {platform}
                  </label>
                ))}
              </fieldset>
            )}
            {kind !== "download" && field("email", "Work email", "email", "email")}
            {(kind === "login" || kind === "signup") &&
              field("password", "Password", "password", kind === "login" ? "current-password" : "new-password")}
            {(kind === "signup" || kind === "expert") && field("team", "Team name", "text", "organization")}
            {kind === "signup" && (
              <div className="hd-dialog-field">
                <label htmlFor="hd-field-plan">Plan</label>
                <select id="hd-field-plan" name="plan" defaultValue={plan === "enterprise" ? "starter" : plan}>
                  {plans
                    .filter((entry) => entry.dialog === "signup")
                    .map((entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.name} ({entry.price}
                        {entry.period})
                      </option>
                    ))}
                </select>
              </div>
            )}
            {kind === "expert" && (
              <div className="hd-dialog-field">
                <label htmlFor="hd-field-message">What would you like to discuss?</label>
                <textarea
                  id="hd-field-message"
                  name="message"
                  rows={3}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "hd-error-message" : undefined}
                />
                {errors.message && <span id="hd-error-message">{errors.message}</span>}
              </div>
            )}
            <button type="submit" className="hd-button hd-button-large">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
