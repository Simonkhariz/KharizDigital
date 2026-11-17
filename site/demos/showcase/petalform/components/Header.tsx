"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { navLinks } from "../data/content";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Header() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [signedIn, setSignedIn] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const openSignIn = () => {
    setOpen(false);
    setErrors({});
    setSignedIn(false);
    dialogRef.current?.showModal();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: typeof errors = {};
    if (!emailPattern.test(String(data.get("email") ?? "").trim())) next.email = "Enter a valid email address.";
    if (String(data.get("password") ?? "").length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    const firstInvalid = next.email ? "email" : next.password ? "password" : null;
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setSignedIn(true);
  };

  return (
    <header className="pf-header">
      <div className="pf-wrap pf-header-bar">
        <a className="pf-header-logo" href="#top" onClick={() => setOpen(false)}>
          Petalform
        </a>
        <nav className="pf-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="pf-header-signin" onClick={openSignIn}>
          Sign in
        </button>
        <button
          ref={toggleRef}
          type="button"
          className="pf-header-toggle"
          aria-expanded={open}
          aria-controls="pf-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="pf-mobile-menu" className="pf-wrap pf-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <button type="button" onClick={openSignIn}>
          Sign in
        </button>
      </nav>

      <dialog
        ref={dialogRef}
        className="pf-dialog"
        aria-labelledby="pf-signin-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div>
          <button type="button" className="pf-dialog-close" aria-label="Close" onClick={() => dialogRef.current?.close()}>
            <X size={18} aria-hidden="true" />
          </button>
          <h2 id="pf-signin-title">Sign in to Petalform</h2>
          {signedIn ? (
            <div role="status" className="pf-form">
              <p>Thanks. This is a demo, so no account was checked and nothing was sent.</p>
              <button type="button" className="pf-pill pf-pill-dark" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </div>
          ) : (
            <form className="pf-form" onSubmit={onSubmit} noValidate>
              <div className="pf-field">
                <label htmlFor="pf-signin-email">Email</label>
                <input
                  id="pf-signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "pf-signin-email-error" : undefined}
                />
                {errors.email && <span id="pf-signin-email-error">{errors.email}</span>}
              </div>
              <div className="pf-field">
                <label htmlFor="pf-signin-password">Password</label>
                <input
                  id="pf-signin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "pf-signin-password-error" : undefined}
                />
                {errors.password && <span id="pf-signin-password-error">{errors.password}</span>}
              </div>
              <button type="submit" className="pf-pill pf-pill-dark">
                Sign in
              </button>
            </form>
          )}
        </div>
      </dialog>
    </header>
  );
}
