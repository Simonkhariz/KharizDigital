"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, rates, sizes } from "../data/content";
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
    <header className="sb-head">
      <div className="sb-head__in">
        <a href="#top" aria-label="Substrata, back to top">
          <Logo />
        </a>
        <nav className="sb-head__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sb-head__actions">
          <button type="button" className="sb-btn sb-btn--dark" data-sb-open="login">
            Log in
          </button>
          <button type="button" className="sb-btn" data-sb-open="start">
            Get started
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="sb-head__toggle"
          aria-expanded={open}
          aria-controls="sb-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      <div id="sb-menu" className="sb-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div>
          <button type="button" className="sb-btn sb-btn--dark" data-sb-open="login" onClick={() => setOpen(false)}>
            Log in
          </button>
          <button type="button" className="sb-btn" data-sb-open="start" onClick={() => setOpen(false)}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

const usd = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** Usage estimate: machines, active hours and disk priced with the demonstration rates. */
export function Calculator() {
  const [machines, setMachines] = useState(20);
  const [hours, setHours] = useState(6);
  const [disk, setDisk] = useState(40);
  const [sizeId, setSizeId] = useState<string>(sizes[0].id);
  const size = sizes.find((item) => item.id === sizeId) ?? sizes[0];

  const hourly = size.vcpu * rates.vcpuHour + size.gb * rates.gbHour;
  const compute = machines * hours * 30 * hourly;
  const storage = machines * disk * rates.diskGbMonth;
  const total = Math.max(0, compute + storage - rates.freeCredit);

  return (
    <div className="sb-calc">
      <div className="sb-calc__controls">
        <label>
          <span>
            Machines <output>{machines}</output>
          </span>
          <input type="range" min={1} max={200} value={machines} onChange={(event) => setMachines(Number(event.target.value))} />
        </label>
        <label>
          <span>
            Active hours per day <output>{hours}</output>
          </span>
          <input type="range" min={0} max={24} value={hours} onChange={(event) => setHours(Number(event.target.value))} />
        </label>
        <label>
          <span>
            Disk per machine <output>{disk} GB</output>
          </span>
          <input type="range" min={10} max={200} step={10} value={disk} onChange={(event) => setDisk(Number(event.target.value))} />
        </label>
        <fieldset>
          <legend>Machine size</legend>
          {sizes.map((item) => (
            <label key={item.id} data-checked={item.id === sizeId}>
              <input type="radio" name="sb-size" value={item.id} checked={item.id === sizeId} onChange={() => setSizeId(item.id)} />
              {item.label}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="sb-calc__result" aria-live="polite">
        <p className="sb-eyebrow">Estimated monthly cost</p>
        <p className="sb-calc__total">{usd(total)}</p>
        <dl>
          <div>
            <dt>Compute while awake</dt>
            <dd>{usd(compute)}</dd>
          </div>
          <div>
            <dt>Disk, always on</dt>
            <dd>{usd(storage)}</dd>
          </div>
          <div>
            <dt>Included usage</dt>
            <dd>−{usd(rates.freeCredit)}</dd>
          </div>
        </dl>
        <p className="sb-calc__note">
          {usd(hourly)} per machine-hour awake · ${rates.diskGbMonth.toFixed(2)} per GB-month · asleep machines pay for disk only.
        </p>
        <button type="button" className="sb-btn" data-sb-open="start">
          Start free
        </button>
      </div>
    </div>
  );
}

type Kind = "start" | "login" | "sales" | "notice";
type Errors = Partial<Record<"email" | "password" | "company", string>>;

const copy: Record<Kind, { title: string; intro: string; submit: string; done: string }> = {
  start: {
    title: "Create your account",
    intro: "Your first machine boots in under a second. $5 of usage is included every month.",
    submit: "Create account",
    done: "Thanks. This is a demo, so no account was created and nothing was sent.",
  },
  login: {
    title: "Log in",
    intro: "Welcome back.",
    submit: "Log in",
    done: "This is a demo, so no account was checked and nothing was sent.",
  },
  sales: {
    title: "Talk to us",
    intro: "Tell us where to reach you and we will set up a call about committed use.",
    submit: "Request a call",
    done: "Thanks. This is a demo, so nothing was sent.",
  },
  notice: {
    title: "Concept website",
    intro: "Substrata is a fictional product. Documentation, status and legal pages do not exist for this demonstration.",
    submit: "",
    done: "",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isKind = (value: string | null): value is Kind => value !== null && value in copy;

/** One modal for every call to action. Any element with `data-sb-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("start");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-sb-open]") : null;
      const next = trigger?.getAttribute("data-sb-open") ?? null;
      if (!isKind(next)) return;
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
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid email address.";
    if (kind !== "sales" && value("password").length < 8) next.password = "Use at least 8 characters.";
    if (kind === "sales" && value("company").length < 2) next.company = "Enter your company name.";
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
      className="sb-dialog"
      aria-labelledby="sb-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="sb-dialog__in">
        <button type="button" className="sb-dialog__close" onClick={close} aria-label="Close">
          <X size={16} aria-hidden="true" />
        </button>
        <h2 id="sb-dialog-title">{text.title}</h2>
        {message ? (
          <div role="status">
            <p>{message}</p>
            <button type="button" className="sb-btn" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="sb-err-email" />
              <span id="sb-err-email">{errors.email}</span>
            </label>
            {kind === "sales" ? (
              <label>
                Company
                <input name="company" type="text" autoComplete="organization" aria-invalid={Boolean(errors.company)} aria-describedby="sb-err-company" />
                <span id="sb-err-company">{errors.company}</span>
              </label>
            ) : (
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  autoComplete={kind === "login" ? "current-password" : "new-password"}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby="sb-err-password"
                />
                <span id="sb-err-password">{errors.password}</span>
              </label>
            )}
            <button type="submit" className="sb-btn">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
