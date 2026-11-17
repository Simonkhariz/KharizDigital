"use client";

import { Check, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { languages } from "../data/content";
import { LogoTile } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof languages)[number]>("English");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="vd-header">
      <a href="#top" aria-label="Verdia home">
        <LogoTile />
      </a>
      <div className="vd-header-actions">
        <div className="vd-lang" ref={rootRef}>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="vd-lang-menu"
            aria-label={`Language: ${language}`}
            onClick={() => setOpen((value) => !value)}
          >
            <Globe size={16} aria-hidden="true" />
            <span>{language.slice(0, 2).toUpperCase()}</span>
          </button>
          <div id="vd-lang-menu" className="vd-lang-menu" hidden={!open}>
            <ul>
              {languages.map((entry) => (
                <li key={entry}>
                  <button
                    type="button"
                    aria-pressed={entry === language}
                    onClick={() => {
                      setLanguage(entry);
                      setOpen(false);
                      buttonRef.current?.focus();
                    }}
                  >
                    {entry}
                    {entry === language && <Check size={15} aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
            <p>The app is available in these languages. This concept page stays in English.</p>
          </div>
        </div>
        <a className="vd-header-cta" href="#get">
          Get Verdia app
        </a>
      </div>
    </header>
  );
}
