"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Move the pill to the section currently in view.
  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector<HTMLElement>(link.href)).filter((node) => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  return (
    <header className="nc-header nc-wrap">
      <a className="nc-logo" href="#top" aria-label="Nocturn home">
        Nocturn
      </a>
      <nav className="nc-nav" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} aria-current={active === link.href ? "true" : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="nc-pill nc-pill-dark nc-header-contact" href="#contact">
        Contact
      </a>
      <button
        ref={toggleRef}
        type="button"
        className="nc-header-toggle"
        aria-expanded={open}
        aria-controls="nc-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav id="nc-mobile-menu" className="nc-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nc-pill nc-pill-dark" href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
}
