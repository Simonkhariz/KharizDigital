"use client";

import { ArrowUpRight, Check, ChevronDown, CreditCard, Menu, Wallet, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { RATES, dollars, faqs, navLinks, useCases } from "../data/content";

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 1.500l11 6.200v12.600L14 26.500 3 20.300V7.700z" fill="currentColor" />
      <path d="M8.500 11l5.500 3 5.500-3M14 14v6.500" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="tp-header">
      <div className="tp-header-bar">
        <a className="tp-logo" href="#top" aria-label="Tessera Pay home" onClick={() => setOpen(false)}>
          <LogoMark />
          Tessera
        </a>
        <nav className="tp-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="tp-header-actions">
          <button type="button" className="tp-btn tp-btn-light" data-tp-open="login">
            Login
          </button>
          <button type="button" className="tp-btn tp-btn-dark" data-tp-open="signup">
            Get Started
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="tp-header-toggle"
          aria-expanded={open}
          aria-controls="tp-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="tp-mobile-menu" className="tp-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <div>
          <button type="button" className="tp-btn tp-btn-light" data-tp-open="login" onClick={() => setOpen(false)}>
            Login
          </button>
          <button type="button" className="tp-btn tp-btn-dark" data-tp-open="signup" onClick={() => setOpen(false)}>
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}

type Rail = "card" | "crypto";

/** A small hosted-checkout mock: pick a rail, pay, and see how it settles. */
export function CheckoutDemo() {
  const [rail, setRail] = useState<Rail>("card");
  const [paid, setPaid] = useState(false);
  const fee = rail === "card" ? 48 * (RATES.cardPercent / 100) + RATES.cardFixed : 48 * (RATES.cryptoPercent / 100);

  return (
    <div className="tp-checkout" role="group" aria-label="Checkout demonstration">
      <p className="tp-checkout-top">
        <span>Brand kit template</span>
        <strong>$48.00</strong>
      </p>
      <div className="tp-rails" role="group" aria-label="Payment method">
        <button
          type="button"
          aria-pressed={rail === "card"}
          onClick={() => {
            setRail("card");
            setPaid(false);
          }}
        >
          <CreditCard size={16} aria-hidden="true" />
          Card
        </button>
        <button
          type="button"
          aria-pressed={rail === "crypto"}
          onClick={() => {
            setRail("crypto");
            setPaid(false);
          }}
        >
          <Wallet size={16} aria-hidden="true" />
          Crypto
        </button>
      </div>
      <p className="tp-checkout-line">
        {rail === "card" ? "Card ending 4242, charged in the customer's currency" : "48.00 in a dollar stablecoin, from the customer's wallet"}
      </p>
      {paid ? (
        <div className="tp-checkout-done" role="status">
          <Check size={16} aria-hidden="true" />
          <p>
            Paid. You receive <strong>{dollars(48 - fee)}</strong> after a {dollars(fee)} fee, settled next business day. Demo only: no
            payment was made.
          </p>
        </div>
      ) : (
        <button type="button" className="tp-btn tp-btn-dark tp-btn-block" onClick={() => setPaid(true)}>
          Pay $48.00
        </button>
      )}
      {paid && (
        <button type="button" className="tp-link" onClick={() => setPaid(false)}>
          Run it again
        </button>
      )}
    </div>
  );
}

export function UseCases() {
  const [active, setActive] = useState<string>(useCases[0].id);
  const current = useCases.find((item) => item.id === active) ?? useCases[0];

  return (
    <div className="tp-cases">
      <div className="tp-tabs" role="tablist" aria-label="Use cases">
        {useCases.map((item) => (
          <button key={item.id} type="button" role="tab" id={`tp-tab-${item.id}`} aria-selected={item.id === active} aria-controls="tp-case-panel" onClick={() => setActive(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div key={current.id} id="tp-case-panel" className="tp-case" role="tabpanel" aria-labelledby={`tp-tab-${current.id}`}>
        <div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <button type="button" className="tp-btn tp-btn-light" data-tp-open="talk">
            Talk with us
          </button>
        </div>
        <ul>
          {current.points.map((point) => (
            <li key={point}>
              <Check size={15} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FeeCalculator() {
  const [volume, setVolume] = useState(40000);
  const [share, setShare] = useState(30);
  const cardVolume = volume * (1 - share / 100);
  const cryptoVolume = volume - cardVolume;
  const cardFee = cardVolume * (RATES.cardPercent / 100) + (cardVolume / RATES.averageOrder) * RATES.cardFixed;
  const cryptoFee = cryptoVolume * (RATES.cryptoPercent / 100);
  const total = cardFee + cryptoFee;
  const allCard = volume * (RATES.cardPercent / 100) + (volume / RATES.averageOrder) * RATES.cardFixed;

  return (
    <div className="tp-calc">
      <h3>Fee calculator</h3>
      <p className="tp-calc-note">Launch plan rates, with an average order of ${RATES.averageOrder}.</p>
      <label htmlFor="tp-volume">
        Monthly volume <output htmlFor="tp-volume">{dollars(volume, 0)}</output>
      </label>
      <input id="tp-volume" type="range" min={5000} max={250000} step={5000} value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
      <label htmlFor="tp-share">
        Paid with crypto <output htmlFor="tp-share">{share}%</output>
      </label>
      <input id="tp-share" type="range" min={0} max={100} step={5} value={share} onChange={(event) => setShare(Number(event.target.value))} />
      <dl aria-live="polite">
        <div>
          <dt>Card fees</dt>
          <dd>{dollars(cardFee)}</dd>
        </div>
        <div>
          <dt>Crypto fees</dt>
          <dd>{dollars(cryptoFee)}</dd>
        </div>
        <div className="tp-calc-total">
          <dt>Total, {((total / volume) * 100).toFixed(2)}% effective</dt>
          <dd>{dollars(total)}</dd>
        </div>
      </dl>
      <p className="tp-calc-save">{share > 0 ? `${dollars(allCard - total)} less than taking every payment by card.` : "Move the crypto slider to see the difference."}</p>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="tp-faq">
      {faqs.map((item, index) => (
        <div key={item.q} className="tp-faq-item">
          <h3>
            <button type="button" aria-expanded={open === index} aria-controls={`${base}-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </h3>
          <p id={`${base}-${index}`} hidden={open !== index}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

type Kind = "login" | "signup" | "talk";

const copy: Record<Kind, { title: string; intro: string; submit: string; done: string }> = {
  login: { title: "Log in", intro: "Enter the email and password for your dashboard.", submit: "Log in", done: "This is a demo, so no account was checked and nothing was sent." },
  signup: { title: "Start accepting payments", intro: "Create an account in a minute. No card needed.", submit: "Create account", done: "Thanks. This is a demo, so no account was created and nothing was sent." },
  talk: { title: "Talk with us", intro: "Tell us what you sell and where. We will suggest a set-up.", submit: "Send message", done: "Thanks. This is a demo, so nothing was sent." },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isKind = (value: string | null): value is Kind => value === "login" || value === "signup" || value === "talk";

/** One modal for every call to action. Any element with `data-tp-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("signup");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-tp-open]") : null;
      const next = trigger?.getAttribute("data-tp-open") ?? null;
      if (!isKind(next)) return;
      setKind(next);
      setErrors({});
      setDone(false);
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
    const next: Record<string, string> = {};
    if (kind === "signup" && value("business").length < 2) next.business = "Enter your business name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid email address, for example name@example.com.";
    if (kind === "login" && value("password").length < 8) next.password = "Enter your password (at least 8 characters).";
    if (kind === "talk" && value("message").length < 10) next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  const field = (name: string, label: string, type: string, autoComplete?: string) => (
    <div className="tp-field">
      <label htmlFor={`tp-f-${name}`}>{label}</label>
      {type === "textarea" ? (
        <textarea id={`tp-f-${name}`} name={name} rows={4} aria-invalid={errors[name] ? true : undefined} aria-describedby={errors[name] ? `tp-e-${name}` : undefined} />
      ) : (
        <input
          id={`tp-f-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={errors[name] ? `tp-e-${name}` : undefined}
        />
      )}
      {errors[name] && (
        <p id={`tp-e-${name}`} className="tp-error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <dialog ref={ref} className="tp-dialog" aria-labelledby="tp-dialog-title" onClick={(event) => event.target === ref.current && ref.current?.close()}>
      <div className="tp-dialog-body" key={session}>
        <button type="button" className="tp-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <X size={18} aria-hidden="true" />
        </button>
        {done ? (
          <div className="tp-done" role="status">
            <span aria-hidden="true">
              <Check size={20} />
            </span>
            <h2 id="tp-dialog-title">All set</h2>
            <p>{copy[kind].done}</p>
            <button type="button" className="tp-btn tp-btn-dark tp-btn-block" onClick={() => ref.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="tp-dialog-title">{copy[kind].title}</h2>
            <p>{copy[kind].intro}</p>
            {kind === "signup" && field("business", "Business name", "text", "organization")}
            {field("email", "Work email", "email", "email")}
            {kind === "login" && field("password", "Password", "password", "current-password")}
            {kind === "talk" && field("message", "What do you sell?", "textarea")}
            <button type="submit" className="tp-btn tp-btn-dark tp-btn-block">
              {copy[kind].submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
