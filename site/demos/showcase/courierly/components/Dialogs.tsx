"use client";

import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { demoDraft, naira, plans } from "../data/content";

type Kind = "signin" | "signup" | "contact" | "estimate" | "demo";
type Errors = Record<string, string>;

const copy: Record<Exclude<Kind, "demo">, { title: string; intro: string; submit: string; done: string }> = {
  signin: {
    title: "Sign in",
    intro: "Welcome back. Enter the email and password for your workspace.",
    submit: "Sign in",
    done: "This is a demo, so no account was checked and nothing was sent.",
  },
  signup: {
    title: "Create your account",
    intro: "Start sending in minutes. You can change plan at any time.",
    submit: "Create account",
    done: "Thanks. This is a demo, so no account was created and nothing was sent.",
  },
  contact: {
    title: "Talk to us",
    intro: "Tell us what you are sending and we will suggest a set-up.",
    submit: "Send message",
    done: "Thanks. This is a demo, so nothing was sent.",
  },
  estimate: {
    title: "Estimate an Enterprise price",
    intro: "A rough monthly figure from your sending volume and team size.",
    submit: "Estimate my price",
    done: "This is a demonstration estimate, not a quote. Nothing was sent.",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const kinds: Kind[] = ["signin", "signup", "contact", "estimate", "demo"];
const isKind = (value: string | null): value is Kind => kinds.includes(value as Kind);

/** Demonstration formula: Premium price, plus ₦150 per extra 1,000 emails and ₦2,500 per seat. */
function estimate(emails: number, seats: number): number {
  return 40000 + Math.max(0, Math.ceil((emails - 200000) / 1000)) * 150 + seats * 2500;
}

function DemoPane() {
  const [brief, setBrief] = useState("Send October's invoice and explain the new invoicing date");
  const [stage, setStage] = useState<"brief" | "draft" | "sent">("brief");
  const [error, setError] = useState("");

  const onDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (brief.trim().length < 10) {
      setError("Describe the email in at least a few words.");
      return;
    }
    setError("");
    setStage("draft");
  };

  return (
    <div className="co-demo">
      <h2 id="co-dialog-title">Watch it work</h2>
      <p>A three-step walk-through with a canned draft. Nothing leaves your browser.</p>
      <ol className="co-demo-steps" aria-label="Progress">
        {["Describe", "Review", "Send"].map((label, index) => (
          <li key={label} aria-current={["brief", "draft", "sent"].indexOf(stage) === index ? "step" : undefined}>
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      {stage === "brief" && (
        <form onSubmit={onDraft} noValidate>
          <label htmlFor="co-demo-brief">What should this email say?</label>
          <textarea
            id="co-demo-brief"
            rows={3}
            value={brief}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "co-demo-error" : undefined}
            onChange={(event) => setBrief(event.target.value)}
          />
          {error && (
            <p id="co-demo-error" className="co-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="co-btn co-btn-blue co-btn-lg">
            Draft email
          </button>
        </form>
      )}
      {stage === "draft" && (
        <div>
          <div className="co-demo-mail">
            <p>
              <span>From</span> you@yourdomain.example
            </p>
            <p>
              <span>Subject</span> {demoDraft.subject}
            </p>
            <div>
              {demoDraft.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="co-dialog-actions">
            <button type="button" className="co-btn co-btn-blue co-btn-lg" onClick={() => setStage("sent")}>
              Schedule for 09:00
            </button>
            <button type="button" className="co-btn co-btn-line co-btn-lg" onClick={() => setStage("brief")}>
              Edit brief
            </button>
          </div>
        </div>
      )}
      {stage === "sent" && (
        <div className="co-done" role="status">
          <Check size={18} aria-hidden="true" />
          <p>Scheduled for 09:00 in the recipient&apos;s time zone. This is a demo, so no email was sent.</p>
          <button type="button" className="co-btn co-btn-line co-btn-lg" onClick={() => setStage("brief")}>
            Start again
          </button>
        </div>
      )}
    </div>
  );
}

/** One modal for every call to action. Any element with `data-co-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("signup");
  const [plan, setPlan] = useState("free");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-co-open]") : null;
      const next = trigger?.getAttribute("data-co-open") ?? null;
      if (!trigger || !isKind(next)) return;
      setKind(next);
      setPlan(trigger.getAttribute("data-co-plan") ?? "free");
      setErrors({});
      setDone(null);
      setSession((value) => value + 1);
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (kind === "signup" && value("name").length < 2) next.name = "Enter your name.";
    if (kind !== "estimate" && !emailPattern.test(value("email"))) next.email = "Enter a valid email address, for example name@example.com.";
    if (kind === "signin" && value("password").length < 8) next.password = "Enter your password (at least 8 characters).";
    if (kind === "contact" && value("message").length < 10) next.message = "Tell us a little more (at least 10 characters).";
    if (kind === "estimate") {
      if (!(Number(value("emails")) >= 1000)) next.emails = "Enter a monthly volume of at least 1,000 emails.";
      if (!(Number(value("seats")) >= 1)) next.seats = "Enter at least 1 seat.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (kind === "estimate") {
      const total = estimate(Number(value("emails")), Number(value("seats")));
      setDone(`About ${naira(total)} a month for ${Number(value("emails")).toLocaleString("en-US")} emails and ${value("seats")} seats. ${copy.estimate.done}`);
    } else if (kind !== "demo") {
      setDone(copy[kind].done);
    }
  };

  const field = (name: string, label: string, type = "text", extra: { autoComplete?: string; defaultValue?: string } = {}) => (
    <div className="co-field">
      <label htmlFor={`co-f-${name}`}>{label}</label>
      <input
        id={`co-f-${name}`}
        name={name}
        type={type}
        inputMode={type === "number" ? "numeric" : undefined}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `co-e-${name}` : undefined}
        {...extra}
      />
      {errors[name] && (
        <p id={`co-e-${name}`} className="co-error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <dialog ref={ref} className="co-dialog" aria-labelledby="co-dialog-title" onClick={(event) => event.target === ref.current && ref.current?.close()}>
      <div className="co-dialog-body" key={session}>
        <button type="button" className="co-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={18} aria-hidden="true" />
        </button>
        {kind === "demo" ? (
          <DemoPane />
        ) : done ? (
          <div className="co-done" role="status">
            <Check size={18} aria-hidden="true" />
            <h2 id="co-dialog-title">{kind === "estimate" ? "Your estimate" : "All set"}</h2>
            <p>{done}</p>
            <button type="button" className="co-btn co-btn-blue co-btn-lg" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="co-dialog-title">{copy[kind].title}</h2>
            <p>{copy[kind].intro}</p>
            {kind === "signup" && field("name", "Full name", "text", { autoComplete: "name" })}
            {kind !== "estimate" && field("email", "Work email", "email", { autoComplete: "email" })}
            {kind === "signin" && field("password", "Password", "password", { autoComplete: "current-password" })}
            {kind === "signup" && (
              <div className="co-field">
                <label htmlFor="co-f-plan">Plan</label>
                <select id="co-f-plan" name="plan" value={plan} onChange={(event) => setPlan(event.target.value)}>
                  {plans.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {item.price === null ? "Custom" : `${naira(item.price)}/month`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {kind === "contact" && (
              <div className="co-field">
                <label htmlFor="co-f-message">Message</label>
                <textarea
                  id="co-f-message"
                  name="message"
                  rows={4}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "co-e-message" : undefined}
                />
                {errors.message && (
                  <p id="co-e-message" className="co-error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
            )}
            {kind === "estimate" && field("emails", "Emails per month", "number", { defaultValue: "500000" })}
            {kind === "estimate" && field("seats", "Team seats", "number", { defaultValue: "12" })}
            <button type="submit" className="co-btn co-btn-blue co-btn-lg">
              {copy[kind].submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
