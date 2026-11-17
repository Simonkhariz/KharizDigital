"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data/content";
import { Logo } from "./Marks";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: string = navLinks[0].href;
      for (const section of [...sections].sort((a, b) => a.offsetTop - b.offsetTop)) {
        if (section.getBoundingClientRect().top <= line) current = `#${section.id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="rm-head">
      <div className="rm-head__in">
        <a href="#top" className="rm-head__logo" aria-label="Runemark, back to top">
          <Logo />
        </a>
        <nav className="rm-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="rm-nav__link" aria-current={active === link.href ? "true" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="rm-boxbtn rm-head__cta" data-rm-open="trial">
          Start free
        </button>
        <button
          ref={toggleRef}
          type="button"
          className="rm-boxbtn rm-head__toggle"
          aria-expanded={open}
          aria-controls="rm-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="rm-mobile-menu" className="rm-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <button type="button" className="rm-btn" data-rm-open="trial" onClick={() => setOpen(false)}>
          Start free trial
        </button>
      </div>
    </header>
  );
}
