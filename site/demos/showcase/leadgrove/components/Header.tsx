"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { LogoMark } from "./Logo";

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
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="lg-header lg-wrap">
      <a className="lg-logo" href="#top" aria-label="Leadgrove home">
        <LogoMark /> Leadgrove
      </a>
      <nav className="lg-nav" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="lg-button lg-header-cta" href="#start">
        Start Outreach <ArrowRight size={17} aria-hidden="true" />
      </a>
      <button
        ref={toggleRef}
        type="button"
        className="lg-header-toggle"
        aria-expanded={open}
        aria-controls="lg-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav id="lg-mobile-menu" className="lg-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="lg-button" href="#start" onClick={() => setOpen(false)}>
          Start Outreach <ArrowRight size={17} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
