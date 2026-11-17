"use client";

import { ChevronDown, CircleUserRound, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "../data/content";
import { Logo } from "./Logo";

export function Header() {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu && !mobile) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menu) headerRef.current?.querySelector<HTMLElement>(`[data-menu="${menu}"]`)?.focus();
      else toggleRef.current?.focus();
      setMenu(null);
      setMobile(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenu(null);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMobile(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [menu, mobile]);

  const closeAll = () => {
    setMenu(null);
    setMobile(false);
  };

  return (
    <header className="cm-header" ref={headerRef}>
      <div className="cm-header-bar">
        <a className="cm-header-logo" href="#top" aria-label="Campusmind home" onClick={closeAll}>
          <Logo />
        </a>
        <nav className="cm-header-nav" aria-label="Primary">
          {navItems.map((item) =>
            "menu" in item ? (
              <div key={item.label} className="cm-header-drop">
                <button
                  type="button"
                  data-menu={item.label}
                  aria-expanded={menu === item.label}
                  aria-controls={`cm-menu-${item.label}`}
                  onClick={() => setMenu((current) => (current === item.label ? null : item.label))}
                >
                  {item.label} <ChevronDown size={14} aria-hidden="true" />
                </button>
                <ul id={`cm-menu-${item.label}`} hidden={menu !== item.label}>
                  {item.menu.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} onClick={closeAll}>
                        <strong>{link.label}</strong>
                        <span>{link.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={closeAll}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="cm-header-actions">
          <button type="button" className="cm-header-login" data-cm-open="login">
            <CircleUserRound size={17} strokeWidth={1.5} aria-hidden="true" /> Login
          </button>
          <button type="button" className="cm-pill cm-pill-outline" data-cm-open="demo">
            Book a demo
          </button>
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="cm-header-toggle"
          aria-expanded={mobile}
          aria-controls="cm-mobile-menu"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((value) => !value)}
        >
          {mobile ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="cm-mobile-menu" className="cm-header-mobile" aria-label="Mobile" hidden={!mobile}>
        {navItems.map((item) =>
          "menu" in item ? (
            <div key={item.label}>
              <p>{item.label}</p>
              {item.menu.map((link) => (
                <a key={link.label} href={link.href} onClick={closeAll}>
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <a key={item.label} href={item.href} onClick={closeAll}>
              {item.label}
            </a>
          ),
        )}
        <div className="cm-header-mobile-actions">
          <button type="button" className="cm-pill cm-pill-outline" data-cm-open="login" onClick={closeAll}>
            Login
          </button>
          <button type="button" className="cm-pill" data-cm-open="demo" onClick={closeAll}>
            Book a demo
          </button>
        </div>
      </nav>
    </header>
  );
}
