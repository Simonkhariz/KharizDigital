"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/site";
import { emailPattern, Field } from "./Field";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const login = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [signedIn, setSignedIn] = useState(false);

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

  function openLogin() {
    setMenuOpen(false);
    setErrors({});
    setSignedIn(false);
    login.current?.showModal();
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const next: typeof errors = {};
    if (!emailPattern.test(email)) next.email = "Enter the email address you signed up with.";
    if (password.length < 8) next.password = "Enter your password (at least 8 characters).";
    setErrors(next);
    if (next.email) event.currentTarget.querySelector<HTMLInputElement>("[name=email]")?.focus();
    else if (next.password) event.currentTarget.querySelector<HTMLInputElement>("[name=password]")?.focus();
    else setSignedIn(true);
  }

  return (
    <header className="md-header">
      <div className="md-nav">
        <a href="#top" className="md-logo">
          Meridiem
        </a>
        <nav className="md-navLinks" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md-navActions">
          <button type="button" className="md-login" onClick={openLogin}>
            Log In
          </button>
          <a href="#waitlist" className="md-join">
            Join Now
          </a>
          <button
            type="button"
            ref={menuButton}
            className="md-menuButton"
            aria-expanded={menuOpen}
            aria-controls="meridiem-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="meridiem-menu" className="md-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md-menuActions">
          <button type="button" className="md-button md-buttonLight" onClick={openLogin}>
            Log In
          </button>
          <a href="#waitlist" className="md-button" onClick={() => setMenuOpen(false)}>
            Join Now
          </a>
        </div>
      </div>

      <dialog ref={login} className="md-dialog" aria-labelledby="meridiem-login-title" onClick={(event) => {
          if (event.target === login.current) login.current?.close();
        }}>
        <div className="md-dialogInner">
          <button type="button" className="md-dialogClose" aria-label="Close" onClick={() => login.current?.close()}>
            <X size={18} aria-hidden="true" />
          </button>
          <h2 id="meridiem-login-title">Welcome back</h2>
          {signedIn ? (
            <div role="status" className="md-confirm">
              <p>Thanks. This is a demo, so there is no account to open.</p>
              <button type="button" className="md-button" onClick={() => login.current?.close()}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} noValidate className="md-form">
              <Field id="meridiem-login-email" label="Email" error={errors.email}>
                <input
                  id="meridiem-login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "meridiem-login-email-error" : undefined}
                />
              </Field>
              <Field id="meridiem-login-password" label="Password" error={errors.password}>
                <input
                  id="meridiem-login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? "meridiem-login-password-error" : undefined}
                />
              </Field>
              <button type="submit" className="md-button">
                Log In
              </button>
            </form>
          )}
        </div>
      </dialog>
    </header>
  );
}
