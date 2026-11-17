"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, resourceLinks } from "../../data/content";
import { LogoMark } from "../Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen && !resourcesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) toggleRef.current?.focus();
      setMenuOpen(false);
      setResourcesOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) setResourcesOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, resourcesOpen]);

  return (
    <header className="cl-header">
      <a className="cl-header-logo" href="#top" aria-label="Closient home">
        <LogoMark size={30} />
      </a>
      <nav className="cl-header-nav" aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <div className="cl-header-resources" ref={resourcesRef}>
          <button type="button" aria-expanded={resourcesOpen} aria-controls="cl-resources" onClick={() => setResourcesOpen((value) => !value)}>
            Resources <ChevronDown size={16} aria-hidden="true" />
          </button>
          <ul id="cl-resources" hidden={!resourcesOpen}>
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setResourcesOpen(false)}>
                  <strong>{link.label}</strong>
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <button type="button" className="cl-pill cl-header-signup" data-cl-open="signup">
        Sign Up
      </button>
      <button
        ref={toggleRef}
        type="button"
        className="cl-header-toggle"
        aria-expanded={menuOpen}
        aria-controls="cl-mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <nav id="cl-mobile-menu" className="cl-header-mobile" aria-label="Mobile" hidden={!menuOpen}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        {resourceLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <button type="button" className="cl-pill" data-cl-open="signup" onClick={() => setMenuOpen(false)}>
          Sign Up
        </button>
      </nav>
    </header>
  );
}
