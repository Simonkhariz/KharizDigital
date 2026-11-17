"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { APP_PATH, navLinks } from "../data/content";
import { LogoMark } from "./Artwork";

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
    <header className={`dn-header${open ? " is-open" : ""}`}>
      <div className="dn-header-bar">
        <a className="dn-logo" href="#top" aria-label="Denarius home" onClick={() => setOpen(false)}>
          <LogoMark />
          <span>denarius</span>
        </a>
        <nav className="dn-header-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="dn-header-actions">
          <Link className="dn-btn dn-btn-dark dn-btn-sm" href={APP_PATH}>
            Log In
          </Link>
          <a className="dn-btn dn-btn-soft dn-btn-sm" href="#signup">
            Sign Up
          </a>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="dn-header-toggle"
          aria-expanded={open}
          aria-controls="dn-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} strokeWidth={1.6} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.6} aria-hidden="true" />}
        </button>
      </div>
      <div id="dn-mobile-menu" className="dn-mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="dn-mobile-actions">
          <Link className="dn-btn dn-btn-dark" href={APP_PATH}>
            Log In
          </Link>
          <a className="dn-btn dn-btn-soft" href="#signup" onClick={() => setOpen(false)}>
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
