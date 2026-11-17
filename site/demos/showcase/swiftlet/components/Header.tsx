"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HOME_PATH, navLinks } from "../data/content";
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
    <header className="sw-header">
      <div className="sw-wrap sw-header-bar">
        <a className="sw-header-logo" href={HOME_PATH} aria-label="Swiftlet home">
          <Wordmark />
        </a>
        <nav className="sw-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sw-header-actions">
          <button type="button" className="sw-link-button" data-sw-open="sales">
            Contact sales
          </button>
          <button type="button" className="sw-button sw-button-light" data-sw-open="signin">
            Sign in
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="sw-header-toggle"
          aria-expanded={open}
          aria-controls="sw-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="sw-mobile-menu" className="sw-wrap sw-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <div>
          <button type="button" className="sw-button sw-button-light" data-sw-open="sales" onClick={() => setOpen(false)}>
            Contact sales
          </button>
          <button type="button" className="sw-button" data-sw-open="signin" onClick={() => setOpen(false)}>
            Sign in
          </button>
        </div>
      </nav>
    </header>
  );
}
