"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { base, navLinks } from "../data/content";
import { PillLink } from "./Bits";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  const isCurrent = (href: string) => !href.includes("#") && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="wx-head">
      <div className="wx-head__in">
        <Link href={`${base}/`} className="wx-head__logo" onClick={() => setOpen(false)}>
          Wexcombe
        </Link>
        <nav className="wx-head__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <PillLink href={`${base}/#brief`} className="wx-head__cta">
          Brief us on a search
        </PillLink>
        <button
          ref={toggleRef}
          type="button"
          className="wx-head__toggle"
          aria-expanded={open}
          aria-controls="wx-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <div id="wx-menu" className="wx-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <PillLink href={`${base}/#brief`} onClick={() => setOpen(false)}>
          Brief us on a search
        </PillLink>
      </div>
    </header>
  );
}
