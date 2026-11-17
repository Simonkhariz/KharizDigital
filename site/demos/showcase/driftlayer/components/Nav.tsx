"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "../data/content";
import "./Nav.css";

export function Brand() {
  return (
    <span className="dl-brand">
      <span className="dl-brand__mark" aria-hidden="true" />
      Driftlayer
    </span>
  );
}

export function Nav() {
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

  const close = () => setOpen(false);

  return (
    <header className="dl-nav">
      <div className="dl-wrap">
        <div className="dl-nav__bar">
          <a href="#top" aria-label="Driftlayer home" onClick={close}>
            <Brand />
          </a>
          <nav aria-label="Main" className="dl-nav__links">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#access" className="dl-btn dl-btn--navy dl-nav__cta" onClick={close}>
            Get early access
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="dl-nav__toggle"
            aria-expanded={open}
            aria-controls="dl-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav id="dl-mobile-menu" aria-label="Mobile" className="dl-nav__menu" hidden={!open}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#access" className="dl-btn dl-btn--navy" onClick={close}>
            Get early access
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
