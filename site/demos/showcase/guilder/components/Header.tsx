"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { Wordmark } from "./Logo";

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
    <header className="gd-header">
      <div className="gd-wrap gd-header-bar">
        <a className="gd-header-logo" href="#top" aria-label="Guilder home">
          <Wordmark />
        </a>
        <nav className="gd-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="gd-header-actions">
          <button type="button" className="gd-link-button" data-gd-open="signin">
            Sign in
          </button>
          <button type="button" className="gd-button gd-button-small" data-gd-open="open">
            Open an account
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="gd-header-toggle"
          aria-expanded={open}
          aria-controls="gd-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="gd-mobile-menu" className="gd-wrap gd-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <div>
          <button type="button" className="gd-button gd-button-ghost" data-gd-open="signin" onClick={() => setOpen(false)}>
            Sign in
          </button>
          <button type="button" className="gd-button" data-gd-open="open" onClick={() => setOpen(false)}>
            Open an account
          </button>
        </div>
      </nav>
    </header>
  );
}
