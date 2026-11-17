"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";
import "./Header.css";

export function Wordmark() {
  return (
    <span className="ae-wordmark">
      <svg width="12" height="15" viewBox="0 0 12 15" aria-hidden="true">
        <path d="M6 0c2.600 3.300 6 6 6 9.200A5.900 5.900 0 0 1 6 15a5.900 5.900 0 0 1-6-5.800C0 6 3.400 3.300 6 0Z" fill="currentColor" />
      </svg>
      AERELLE
    </span>
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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="ae-header ae-on-sky">
      <div className="ae-wrap ae-header__bar">
        <a href="#top" aria-label="Aerelle home" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>
        <nav aria-label="Main" className="ae-header__nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ae-header__end">
          <a href="#formula" className="ae-header__cta" onClick={() => setOpen(false)}>
            Get Your Formula
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="ae-header__toggle"
            aria-expanded={open}
            aria-controls="ae-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      <nav id="ae-mobile-menu" aria-label="Mobile" className="ae-header__menu" hidden={!open}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
