"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/site";
import { emailError } from "./forms";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [done, setDone] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function openSignIn() {
    setMenuOpen(false);
    setErrors({});
    setDone(false);
    dialog.current?.showModal();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: typeof errors = {};
    const email = emailError(String(data.get("email") ?? ""));
    if (email) next.email = email;
    if (String(data.get("password") ?? "").length < 8) next.password = "Enter your password (at least 8 characters).";
    setErrors(next);
    if (next.email) form.querySelector<HTMLElement>("[name=email]")?.focus();
    else if (next.password) form.querySelector<HTMLElement>("[name=password]")?.focus();
    else setDone(true);
  }

  return (
    <header className="vd-header">
      <div className="vd-nav vd-box">
        <a href="#top" className="vd-logo">
          Verdance
        </a>
        <nav className="vd-navLinks" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="vd-btn vd-btnDark vd-btnSmall vd-signin" onClick={openSignIn}>
          Sign in
        </button>
        <button
          type="button"
          ref={menuButton}
          className="vd-menuButton"
          aria-expanded={menuOpen}
          aria-controls="verdance-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <div id="verdance-menu" className="vd-menuPanel" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="vd-btn vd-btnDark" onClick={openSignIn}>
          Sign in
        </button>
      </div>

      <dialog
        ref={dialog}
        className="vd-dialog"
        aria-labelledby="verdance-signin-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="vd-dialogHead">
          <h2 id="verdance-signin-title">Sign in to Verdance</h2>
          <button type="button" aria-label="Close" onClick={() => dialog.current?.close()}>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        {done ? (
          <div className="vd-dialogBody" role="status">
            <p>Thanks. This is a demo, so there is no workspace to open.</p>
            <button type="button" className="vd-btn vd-btnDark" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </div>
        ) : (
          <form className="vd-dialogBody" onSubmit={handleSubmit} noValidate>
            <div className="vd-field">
              <label htmlFor="verdance-signin-email">Work email</label>
              <input
                id="verdance-signin-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "verdance-signin-email-error" : undefined}
              />
              {errors.email && <p id="verdance-signin-email-error">{errors.email}</p>}
            </div>
            <div className="vd-field">
              <label htmlFor="verdance-signin-password">Password</label>
              <input
                id="verdance-signin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? "verdance-signin-password-error" : undefined}
              />
              {errors.password && <p id="verdance-signin-password-error">{errors.password}</p>}
            </div>
            <button type="submit" className="vd-btn vd-btnDark">
              Sign in
            </button>
          </form>
        )}
      </dialog>
    </header>
  );
}
