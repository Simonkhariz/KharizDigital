"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { Wordmark } from "./Cube";

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
    <header className="sx-header">
      <div className="sx-wrap sx-header-bar">
        <a className="sx-header-logo" href="#top" aria-label="Sixseat home">
          <Wordmark />
        </a>
        <nav className="sx-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sx-header-actions">
          <button type="button" className="sx-link-button" data-sx-open="signin">
            Sign in
          </button>
          <button type="button" className="sx-button" data-sx-open="start">
            Start a session
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="sx-header-toggle"
          aria-expanded={open}
          aria-controls="sx-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="sx-mobile-menu" className="sx-wrap sx-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <div>
          <button type="button" className="sx-button sx-button-light" data-sx-open="signin" onClick={() => setOpen(false)}>
            Sign in
          </button>
          <button type="button" className="sx-button" data-sx-open="start" onClick={() => setOpen(false)}>
            Start a session
          </button>
        </div>
      </nav>
    </header>
  );
}
