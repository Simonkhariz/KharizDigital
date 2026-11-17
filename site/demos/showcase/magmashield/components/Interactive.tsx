"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Check, Pause, Play, X } from "lucide-react";
import { events, navLinks, plans, useCases } from "../data/content";
import { Logo } from "./Marks";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="ms-head">
      <a href="#top" className="ms-head__logo" aria-label="Magmashield, back to top">
        <Logo />
      </a>
      <nav className="ms-head__nav" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <button
        ref={toggleRef}
        type="button"
        className="ms-head__toggle"
        aria-expanded={open}
        aria-controls="ms-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <div id="ms-menu" className="ms-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="ms-btn" data-ms-open="trial" onClick={() => setOpen(false)}>
          Start free trial
        </button>
      </div>
    </header>
  );
}

const VISIBLE = 5;

/** Console mock: a feed of contained threats that advances every few seconds and can be paused. */
export function ThreatFeed() {
  const [offset, setOffset] = useState(0);
  const [running, setRunning] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setOffset((value) => value + 1), 2600);
    return () => window.clearInterval(timer);
  }, [running]);

  const rows = Array.from({ length: VISIBLE }, (_, k) => events[(offset + VISIBLE - 1 - k) % events.length]);
  const active = rows.find((row) => row.id === selected) ?? rows[0];
  const contained = 18_412 + offset;

  return (
    <div className="ms-console">
      <div className="ms-console__bar">
        <p>
          <i data-on={running} aria-hidden="true" />
          Live incidents · {running ? "streaming" : "paused"}
        </p>
        <p className="ms-console__count">{contained.toLocaleString("en-US")} contained today</p>
        <button type="button" onClick={() => setRunning((value) => !value)} aria-pressed={!running}>
          {running ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          {running ? "Pause" : "Resume"}
        </button>
      </div>
      <div className="ms-console__body">
        <ul>
          {rows.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                aria-pressed={row.id === active.id}
                onClick={() => {
                  setSelected(row.id);
                  setRunning(false);
                }}
              >
                <span className="ms-sev" data-sev={row.severity}>
                  {row.severity}
                </span>
                <span className="ms-console__title">{row.title}</span>
                <span className="ms-console__ms">{row.ms} ms</span>
              </button>
            </li>
          ))}
        </ul>
        <dl aria-live="polite">
          <div>
            <dt>Incident</dt>
            <dd>{active.id}</dd>
          </div>
          <div>
            <dt>Asset</dt>
            <dd>{active.asset}</dd>
          </div>
          <div>
            <dt>Action taken</dt>
            <dd>{active.action}</dd>
          </div>
          <div>
            <dt>Time to contain</dt>
            <dd>
              {active.ms} ms
              <span className="ms-console__meter" aria-hidden="true">
                <i style={{ width: `${Math.min(100, active.ms / 13)}%` }} />
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function UseCaseTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = useCases[active];

  const onKeyDown = (event: ReactKeyboardEvent) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = (active + delta + useCases.length) % useCases.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="ms-cases">
      <div role="tablist" aria-label="Teams" className="ms-cases__list" onKeyDown={onKeyDown}>
        {useCases.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`ms-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="ms-tabpanel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="ms-tabpanel" aria-labelledby={`ms-tab-${current.id}`} className="ms-cases__panel" tabIndex={0}>
        <div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <ul>
            {current.points.map((point) => (
              <li key={point}>
                <Check size={16} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="ms-cases__metric">
          <strong>{current.metric.value}</strong>
          <span>{current.metric.label}</span>
        </p>
      </div>
    </div>
  );
}

export function PricingPlans() {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <div className="ms-switch" role="group" aria-label="Billing period">
        <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
          Monthly
        </button>
        <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
          Annual · save 20%
        </button>
      </div>
      <ul className="ms-plans">
        {plans.map((plan) => {
          const price = annual ? plan.annual : plan.monthly;
          return (
            <li key={plan.id} data-featured={plan.featured ?? false}>
              <h3>{plan.name}</h3>
              <p className="ms-plans__price">
                {price === null ? "Custom" : `$${price}`}
                <small>{plan.unit}</small>
              </p>
              <p>{plan.text}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>
                    <Check size={15} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.featured ? "ms-btn" : "ms-btn ms-btn--dark"}
                data-ms-open={price === null ? "sales" : "trial"}
                data-ms-plan={plan.name}
              >
                {price === null ? "Talk to sales" : "Start free trial"}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

type Kind = "trial" | "sales" | "notice";
type Errors = Partial<Record<"email" | "company", string>>;

const copy: Record<Kind, { title: string; intro: string; submit: string; done: string }> = {
  trial: {
    title: "Start free trial",
    intro: "Fourteen days on the Business plan. No card required.",
    submit: "Start trial",
    done: "Thanks. This is a demo, so no trial was started and nothing was sent.",
  },
  sales: {
    title: "Talk to sales",
    intro: "Tell us where to reach you and roughly how many assets you protect.",
    submit: "Request a call",
    done: "Thanks. This is a demo, so nothing was sent.",
  },
  notice: {
    title: "Concept website",
    intro: "Magmashield is a fictional product. Documentation, status and legal pages do not exist for this demonstration.",
    submit: "",
    done: "",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isKind = (value: string | null): value is Kind => value !== null && value in copy;

/** One modal for every call to action. Any element with `data-ms-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("trial");
  const [plan, setPlan] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-ms-open]") : null;
      const next = trigger?.getAttribute("data-ms-open") ?? null;
      if (!trigger || !isKind(next)) return;
      setKind(next);
      setPlan(trigger.getAttribute("data-ms-plan"));
      setErrors({});
      setDone(false);
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
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid work email.";
    if (value("company").length < 2) next.company = "Enter your company name.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDone(true);
  };

  const text = copy[kind];
  const close = () => ref.current?.close();
  const message = done ? text.done : kind === "notice" ? text.intro : null;

  return (
    <dialog
      ref={ref}
      className="ms-dialog"
      aria-labelledby="ms-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="ms-dialog__in">
        <button type="button" className="ms-dialog__close" onClick={close} aria-label="Close">
          <X size={16} aria-hidden="true" />
        </button>
        <h2 id="ms-dialog-title">{text.title}</h2>
        {plan && !message ? <p className="ms-dialog__plan">{plan} plan</p> : null}
        {message ? (
          <div role="status">
            <p>{message}</p>
            <button type="button" className="ms-btn" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="ms-err-email" />
              <span id="ms-err-email">{errors.email}</span>
            </label>
            <label>
              Company
              <input name="company" type="text" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby="ms-err-company" />
              <span id="ms-err-company">{errors.company}</span>
            </label>
            <button type="submit" className="ms-btn">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
