"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check, Menu, X } from "lucide-react";
import { languages, navLinks } from "../data/site";
import { DialogButton } from "./Dialogs";
import { LogoMark } from "./Logo";
import { header as styles, ui } from "@/demos/showcase/rapporta/styles";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof languages)[number]["code"]>("EN");
  const menuButton = useRef<HTMLButtonElement>(null);
  const langWrap = useRef<HTMLDivElement>(null);
  const langButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (langOpen) {
        setLangOpen(false);
        langButton.current?.focus();
      } else {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (langOpen && !langWrap.current?.contains(event.target as Node)) setLangOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen, langOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href="#top" className={styles.logo} aria-label="Rapporta home">
          <LogoMark size={26} />
        </a>

        <nav className={styles.links} aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.lang} ref={langWrap}>
            <button
              type="button"
              ref={langButton}
              className={styles.langButton}
              aria-haspopup="true"
              aria-expanded={langOpen}
              aria-label={`Language: ${language}`}
              onClick={() => setLangOpen((value) => !value)}
            >
              {language}
            </button>
            {langOpen && (
              <div className={styles.langMenu}>
                <ul>
                  {languages.map((item) => (
                    <li key={item.code}>
                      <button
                        type="button"
                        className={styles.langItem}
                        aria-pressed={item.code === language}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangOpen(false);
                          langButton.current?.focus();
                        }}
                      >
                        <span>{item.label}</span>
                        {item.code === language && <Check size={14} aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className={styles.langNote}>Demo: page copy is available in English only.</p>
              </div>
            )}
          </div>
          <DialogButton request={{ kind: "signin" }} className={clsx(ui.btn, ui.dark, ui.sm, styles.signin)}>
            Sign in
          </DialogButton>
          <button
            type="button"
            ref={menuButton}
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="rapporta-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="rapporta-mobile-menu" className={styles.mobile} hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.mobileActions} onClick={() => setMenuOpen(false)}>
          <DialogButton request={{ kind: "signin" }} className={clsx(ui.btn, ui.light, ui.md)}>
            Sign in
          </DialogButton>
          <DialogButton request={{ kind: "demo" }} className={clsx(ui.btn, ui.dark, ui.md)}>
            Book a demo
          </DialogButton>
        </div>
      </div>
    </header>
  );
}
