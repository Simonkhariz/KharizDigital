"use client";

import { Menu, X } from "lucide-react";
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
      if (window.innerWidth > 820) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="hd-header">
      <div className="hd-page hd-header-bar">
        <a className="hd-header-logo" href="#top" aria-label="Helmdeck home" onClick={() => setOpen(false)}>
          <LogoMark />
        </a>
        <nav className="hd-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hd-header-actions">
          <button type="button" className="hd-button hd-button-outline" data-hd-open="download">
            Download
          </button>
          <button type="button" className="hd-button" data-hd-open="login">
            Login
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="hd-header-toggle"
          aria-expanded={open}
          aria-controls="hd-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="hd-mobile-menu" className="hd-page hd-header-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <div>
          <button type="button" className="hd-button hd-button-outline" data-hd-open="download" onClick={() => setOpen(false)}>
            Download
          </button>
          <button type="button" className="hd-button" data-hd-open="login" onClick={() => setOpen(false)}>
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
