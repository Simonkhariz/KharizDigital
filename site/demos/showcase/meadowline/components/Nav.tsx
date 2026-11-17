"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { navLinks } from "../data/content";
import { Logo } from "./Brand";
import "./Nav.css";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className={clsx("ml-nav-header", (scrolled || open) && "ml-nav-solid")}>
      <div className="ml-nav-bar">
        <a href="#top" aria-label="Meadowline home" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav className="ml-nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ml-nav-contact" href="#contact">
          Contact
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="ml-nav-toggle"
          aria-expanded={open}
          aria-controls="ml-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="ml-mobile-menu" className="ml-nav-mobile" aria-label="Mobile" hidden={!open}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </nav>
    </header>
  );
}
