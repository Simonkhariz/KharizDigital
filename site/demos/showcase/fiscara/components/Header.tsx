"use client";

import { useEffect, useRef, useState } from "react";
import { menuLinks } from "../data/content";
import { Mark } from "./Mark";

export function Header() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="fs-header">
      <div className="fs-brand" ref={rootRef}>
        <a className="fs-brand-link" href="#top" aria-label="Fiscara home">
          <span className="fs-brand-icon">
            <Mark size={17} />
          </span>
          fiscara.
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="fs-menu-toggle"
          aria-expanded={open}
          aria-controls="fs-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <i />
          <i />
        </button>
        <nav id="fs-menu" className="fs-menu" aria-label="Primary" hidden={!open}>
          <p className="fs-menu-title">/Menu/</p>
          <ul>
            {menuLinks.map((link, index) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  <small>0{index + 1}</small>
                  <span>{link.label}</span>
                  <i aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="fs-menu-foot">
            <span />
            All systems posting normally
          </p>
        </nav>
      </div>
      <div className="fs-header-actions">
        <button type="button" className="fs-button" data-fs-open="login">
          Log in
        </button>
        <button type="button" className="fs-button fs-button-white" data-fs-open="signup">
          Sign up
        </button>
      </div>
    </header>
  );
}
