"use client";

import { ChevronRight, Menu, X } from "lucide-react";
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
    <header className="ig-header">
      <div className="ig-header-bar">
        <a className="ig-header-logo" href="#top" aria-label="Indigen home" onClick={() => setOpen(false)}>
          <LogoMark />
        </a>
        <nav className="ig-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ig-button ig-header-cta" href="#book">
          Let&rsquo;s Talk <ChevronRight size={15} aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="ig-header-toggle"
          aria-expanded={open}
          aria-controls="ig-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="ig-mobile-menu" className="ig-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="ig-button" href="#book" onClick={() => setOpen(false)}>
          Let&rsquo;s Talk <ChevronRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
