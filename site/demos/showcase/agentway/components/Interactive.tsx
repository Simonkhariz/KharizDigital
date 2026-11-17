"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { CornerDownLeft, X } from "lucide-react";
import { navLinks, platform, topics } from "../data/content";
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
    <header className="aw-head">
      <div className="aw-head__in">
        <a href="#top" className="aw-head__logo" aria-label="Agentway, back to top">
          <Logo />
        </a>
        <nav className="aw-head__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="aw-head__actions">
          <button type="button" className="aw-head__login" data-aw-open="login">
            Log in
          </button>
          <button type="button" className="aw-btn" data-aw-open="start">
            Get started
            <span aria-hidden="true">
              <CornerDownLeft size={12} />
            </span>
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="aw-head__toggle"
          aria-expanded={open}
          aria-controls="aw-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="aw-menu" className="aw-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div>
          <button type="button" className="aw-btn aw-btn--line" data-aw-open="login" onClick={() => setOpen(false)}>
            Log in
          </button>
          <button type="button" className="aw-btn" data-aw-open="start" onClick={() => setOpen(false)}>
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

/** Tabs for the four parts of the platform, each with a short code sample. Arrow keys move between tabs. */
export function PlatformTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = platform[active];

  const onKeyDown = (event: ReactKeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    const next = (active + delta + platform.length) % platform.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="aw-tabs">
      <div role="tablist" aria-label="Parts of the platform" className="aw-tabs__list" onKeyDown={onKeyDown}>
        {platform.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`aw-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="aw-tabpanel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="aw-tabpanel" aria-labelledby={`aw-tab-${current.id}`} className="aw-tabs__panel" tabIndex={0}>
        <div>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
        <pre>
          <code>{current.code.join("\n")}</code>
        </pre>
      </div>
    </div>
  );
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: ContactErrors = {};
    if (value("name").length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid email address.";
    if (value("message").length < 10) next.message = "Add a sentence or two (10 characters or more).";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="aw-form aw-form--done" role="status">
        <p className="aw-kicker">Received</p>
        <h3>Thanks. This is a demo, so nothing was sent.</h3>
        <button type="button" className="aw-btn aw-btn--line" onClick={() => setDone(false)}>
          Write another
        </button>
      </div>
    );
  }

  return (
    <form className="aw-form" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="aw-err-name" />
        <span id="aw-err-name">{errors.name}</span>
      </label>
      <label>
        Work email
        <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="aw-err-email" />
        <span id="aw-err-email">{errors.email}</span>
      </label>
      <label>
        Topic
        <select name="topic" defaultValue={topics[0]}>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
        <span />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} aria-invalid={Boolean(errors.message)} aria-describedby="aw-err-message" />
        <span id="aw-err-message">{errors.message}</span>
      </label>
      <button type="submit" className="aw-btn">
        Send message
        <span aria-hidden="true">
          <CornerDownLeft size={12} />
        </span>
      </button>
    </form>
  );
}

type Kind = "start" | "login" | "notice";
const copy: Record<Kind, { title: string; intro: string; submit: string; done: string }> = {
  start: {
    title: "Start building",
    intro: "Create a sandbox and publish your first contract. Free, with no card.",
    submit: "Create sandbox",
    done: "Thanks. This is a demo, so no sandbox was created and nothing was sent.",
  },
  login: {
    title: "Log in",
    intro: "We will email you a sign-in link.",
    submit: "Send link",
    done: "This is a demo, so no link was sent.",
  },
  notice: {
    title: "Concept website",
    intro: "Agentway is a fictional product. The documentation, full articles and legal pages do not exist for this demonstration.",
    submit: "",
    done: "",
  },
};
const isKind = (value: string | null): value is Kind => value !== null && value in copy;

/** One modal for every call to action. Any element with `data-aw-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("start");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-aw-open]") : null;
      const next = trigger?.getAttribute("data-aw-open") ?? null;
      if (!isKind(next)) return;
      setKind(next);
      setError("");
      setDone(false);
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = event.currentTarget.querySelector<HTMLInputElement>('[name="email"]');
    if (!field || !emailPattern.test(field.value.trim())) {
      setError("Enter a valid work email.");
      field?.focus();
      return;
    }
    setError("");
    setDone(true);
  };

  const text = copy[kind];
  const close = () => ref.current?.close();
  const message = done ? text.done : kind === "notice" ? text.intro : null;

  return (
    <dialog
      ref={ref}
      className="aw-dialog"
      aria-labelledby="aw-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="aw-dialog__in">
        <button type="button" className="aw-dialog__close" onClick={close} aria-label="Close">
          <X size={16} aria-hidden="true" />
        </button>
        <p className="aw-kicker">Agentway</p>
        <h2 id="aw-dialog-title">{text.title}</h2>
        {message ? (
          <div role="status">
            <p>{message}</p>
            <button type="button" className="aw-btn" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p>{text.intro}</p>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(error)} aria-describedby="aw-err-dialog" />
              <span id="aw-err-dialog">{error}</span>
            </label>
            <button type="submit" className="aw-btn">
              {text.submit}
              <span aria-hidden="true">
                <CornerDownLeft size={12} />
              </span>
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
