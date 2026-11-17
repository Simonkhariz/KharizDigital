"use client";

import { Check, Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { CODE_LENGTH, DEMO_CODE, RESEND_SECONDS, firstName, maskEmail, purposes, terms } from "../data/content";
import type { PurposeId } from "../data/content";
import { CodeInput } from "./CodeInput";

type Step = "signup" | "confirm" | "welcome" | "ready";
type Errors = Partial<Record<"name" | "email" | "password" | "agree" | "code" | "workspace", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const emptyCode = () => Array.from({ length: CODE_LENGTH }, () => "");
const stepNumber: Record<Step, number> = { signup: 1, confirm: 2, welcome: 3, ready: 3 };

/** Black pill with the four corner brackets from the reference. */
function PrimaryButton({ children, disabled, onClick, type = "submit" }: { children: ReactNode; disabled?: boolean; onClick?: () => void; type?: "submit" | "button" }) {
  return (
    <span className="ol-primary">
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <i aria-hidden="true" />
      <button type={type} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </span>
  );
}

export function AuthFlow() {
  const [step, setStep] = useState<Step>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [code, setCode] = useState<string[]>(emptyCode);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [resent, setResent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [purpose, setPurpose] = useState<PurposeId>("personal");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const termsRef = useRef<HTMLDialogElement>(null);

  // Count down to the moment the code can be sent again.
  useEffect(() => {
    if (step !== "confirm" || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [step, seconds]);

  // Move focus to the new heading on steps that have no auto-focused field.
  useEffect(() => {
    if (step === "ready") headingRef.current?.focus();
  }, [step]);

  const go = (next: Step) => {
    setErrors({});
    setStep(next);
  };

  const onSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(email.trim())) next.email = "Enter a valid email address, for example name@example.com.";
    if (password.length < 8 || !/\d/.test(password)) next.password = "Use at least 8 characters, including a number.";
    if (!agree) next.agree = "Agree to the Terms of Service to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setCode(emptyCode());
    setSeconds(RESEND_SECONDS);
    setResent(false);
    setWorkspace(`${firstName(name)}'s workspace`);
    go("confirm");
  };

  const complete = code.every((digit) => digit !== "");

  const onConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!complete) {
      setErrors({ code: `Enter all ${CODE_LENGTH} digits of the code.` });
      return;
    }
    setErrors({});
    setChecking(true);
    // A short pause stands in for the server round trip.
    window.setTimeout(() => {
      setChecking(false);
      if (code.join("") === DEMO_CODE) {
        go("welcome");
      } else {
        setErrors({ code: "That code does not match. Use the demo code shown below." });
        setCode(emptyCode());
      }
    }, 650);
  };

  const onResend = () => {
    setCode(emptyCode());
    setErrors({});
    setSeconds(RESEND_SECONDS);
    setResent(true);
  };

  const onWelcome = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (workspace.trim().length < 2) {
      setErrors({ workspace: "Give your workspace a name." });
      return;
    }
    go("ready");
  };

  const restart = () => {
    setName("");
    setEmail("");
    setPassword("");
    setAgree(false);
    setShowPassword(false);
    go("signup");
  };

  const error = (key: keyof Errors) =>
    errors[key] ? (
      <p id={`ol-e-${key}`} className="ol-error" role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="ol-flow">
      <p className="ol-logo">Olivar</p>

      <div className="ol-stage" key={step}>
        <p className="ol-progress">
          Step {stepNumber[step]} of 3
          <span aria-hidden="true">
            {[1, 2, 3].map((dot) => (
              <i key={dot} data-on={dot <= stepNumber[step]} />
            ))}
          </span>
        </p>

        {step === "signup" && (
          <form onSubmit={onSignup} noValidate>
            <h1>Create your account</h1>
            <p className="ol-sub">A calm place for notes, plans and the things you mean to do.</p>
            <div className="ol-field">
              <label htmlFor="ol-name">Full name</label>
              <input id="ol-name" type="text" autoComplete="name" autoFocus value={name} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "ol-e-name" : undefined} onChange={(event) => setName(event.target.value)} />
              {error("name")}
            </div>
            <div className="ol-field">
              <label htmlFor="ol-email">Email</label>
              <input id="ol-email" type="email" autoComplete="email" placeholder="name@example.com" value={email} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "ol-e-email" : undefined} onChange={(event) => setEmail(event.target.value)} />
              {error("email")}
            </div>
            <div className="ol-field">
              <label htmlFor="ol-password">Password</label>
              <div className="ol-password">
                <input
                  id="ol-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? "ol-e-password" : "ol-password-hint"}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {error("password") ?? (
                <p id="ol-password-hint" className="ol-hint">
                  At least 8 characters, including a number.
                </p>
              )}
            </div>
            <div className="ol-field">
              <label className="ol-check">
                <input type="checkbox" checked={agree} aria-invalid={errors.agree ? true : undefined} aria-describedby={errors.agree ? "ol-e-agree" : undefined} onChange={(event) => setAgree(event.target.checked)} />
                <span>I agree to the Terms of Service</span>
              </label>
              {error("agree")}
            </div>
            <PrimaryButton>Create account</PrimaryButton>
          </form>
        )}

        {step === "confirm" && (
          <form onSubmit={onConfirm} noValidate>
            <h1>Confirm your email</h1>
            <p className="ol-sub">
              We sent a {CODE_LENGTH} digit code to <strong>{maskEmail(email.trim())}</strong>
            </p>
            <CodeInput
              value={code}
              onChange={(next) => {
                setCode(next);
                if (errors.code && next.some((digit) => digit !== "")) setErrors({});
              }}
              invalid={Boolean(errors.code)} describedBy={errors.code ? "ol-e-code" : "ol-demo-code"} disabled={checking} />
            {error("code")}
            <PrimaryButton disabled={checking}>{checking ? "Checking…" : "Continue"}</PrimaryButton>
            <p id="ol-demo-code" className="ol-demo">
              Demo: no email is sent. Use the code <strong>{DEMO_CODE}</strong>.
            </p>
            <p className="ol-links">
              <button type="button" onClick={onResend} disabled={seconds > 0}>
                {seconds > 0 ? `Resend code in 0:${String(seconds).padStart(2, "0")}` : "Resend code"}
              </button>
              <button type="button" onClick={() => go("signup")}>
                Change email
              </button>
            </p>
            <p className="ol-status" role="status">
              {resent ? "A new code is on its way. In this demo the code stays the same." : ""}
            </p>
          </form>
        )}

        {step === "welcome" && (
          <form onSubmit={onWelcome} noValidate>
            <span className="ol-badge" aria-hidden="true">
              <Check size={20} />
            </span>
            <h1>You’re in, {firstName(name)}</h1>
            <p className="ol-sub">Your email is confirmed. Two quick choices and your workspace is ready.</p>
            <div className="ol-field">
              <label htmlFor="ol-workspace">Workspace name</label>
              <input id="ol-workspace" type="text" autoFocus value={workspace} aria-invalid={errors.workspace ? true : undefined} aria-describedby={errors.workspace ? "ol-e-workspace" : undefined} onChange={(event) => setWorkspace(event.target.value)} />
              {error("workspace")}
            </div>
            <fieldset className="ol-field">
              <legend>What will you use Olivar for?</legend>
              <div className="ol-choices">
                {purposes.map((item) => (
                  <label key={item.id}>
                    <input type="radio" name="ol-purpose" value={item.id} checked={purpose === item.id} onChange={() => setPurpose(item.id)} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <PrimaryButton>Open workspace</PrimaryButton>
          </form>
        )}

        {step === "ready" && (
          <div className="ol-ready">
            <span className="ol-badge" aria-hidden="true">
              <Check size={20} />
            </span>
            <h1 ref={headingRef} tabIndex={-1}>
              {workspace.trim()} is ready
            </h1>
            <dl>
              <div>
                <dt>Signed in as</dt>
                <dd>{email.trim()}</dd>
              </div>
              <div>
                <dt>Set up for</dt>
                <dd>{purposes.find((item) => item.id === purpose)?.label}</dd>
              </div>
            </dl>
            <p className="ol-demo" role="status">
              This is where the demo ends. No account was created and nothing was sent.
            </p>
            <PrimaryButton type="button" onClick={restart}>
              Start again
            </PrimaryButton>
          </div>
        )}
      </div>

      <footer className="ol-foot">
        <p>Concept web application with demonstration content.</p>
        <button type="button" onClick={() => termsRef.current?.showModal()}>
          Terms of Service
        </button>
      </footer>

      <dialog ref={termsRef} className="ol-terms" aria-labelledby="ol-terms-title" onClick={(event) => event.target === termsRef.current && termsRef.current?.close()}>
        <div>
          <h2 id="ol-terms-title">Terms of Service</h2>
          <ol>
            {terms.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <PrimaryButton type="button" onClick={() => termsRef.current?.close()}>
            Close
          </PrimaryButton>
        </div>
      </dialog>
    </div>
  );
}
