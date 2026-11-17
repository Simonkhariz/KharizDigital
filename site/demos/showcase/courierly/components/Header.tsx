"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav } from "../data/content";
import { LogoMark } from "./Art";

export function Header() {
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menu && !dropdown) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menu) toggleRef.current?.focus();
      setMenu(false);
      setDropdown(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setDropdown(null);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [menu, dropdown]);

  const close = () => {
    setMenu(false);
    setDropdown(null);
  };

  return (
    <header className="co-header" ref={headerRef}>
      <div className="co-header-bar">
        <a className="co-logo" href="#top" aria-label="Courierly home" onClick={close}>
          <LogoMark />
          <span>Courierly</span>
        </a>
        <nav className="co-nav" aria-label="Primary">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="co-nav-group">
                <button
                  type="button"
                  aria-expanded={dropdown === item.label}
                  aria-controls={`co-drop-${item.label}`}
                  onClick={() => setDropdown(dropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={12} strokeWidth={3} aria-hidden="true" />
                </button>
                <div id={`co-drop-${item.label}`} className="co-drop" hidden={dropdown !== item.label}>
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href} onClick={close}>
                      <strong>{child.label}</strong>
                      <span>{child.note}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={close}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <button type="button" className="co-btn co-btn-blue co-header-signin" data-co-open="signin">
          Sign in
        </button>
        <button
          ref={toggleRef}
          type="button"
          className="co-header-toggle"
          aria-expanded={menu}
          aria-controls="co-mobile-menu"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((value) => !value)}
        >
          {menu ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="co-mobile-menu" className="co-mobile" aria-label="Mobile" hidden={!menu}>
        {nav.map((item) => (
          <div key={item.label}>
            <a href={item.href} onClick={close}>
              {item.label}
            </a>
            {item.children?.map((child) => (
              <a key={child.label} className="co-mobile-sub" href={child.href} onClick={close}>
                {child.label}
              </a>
            ))}
          </div>
        ))}
        <button type="button" className="co-btn co-btn-blue" data-co-open="signin" onClick={close}>
          Sign in
        </button>
      </nav>
    </header>
  );
}
