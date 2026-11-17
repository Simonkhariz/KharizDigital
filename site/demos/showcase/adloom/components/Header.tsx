"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { menuGroups } from "../data/navigation";
import { Logo } from "./Logo";
import { LoginDialog } from "./LoginDialog";
import "./Header.css";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (openMenu && navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const openLogin = () => {
    closeAll();
    setLoginOpen(true);
  };

  return (
    <header className="al-header-header" data-menu-open={mobileOpen || undefined}>
      <div className="al-container al-header-inner">
        <a href="#top" className="al-header-brand" aria-label="Adloom home" onClick={closeAll}>
          <Logo />
        </a>

        <nav ref={navRef} className="al-header-nav" aria-label="Main">
          <ul className="al-header-nav-list">
            {menuGroups.map((group) => {
              const open = openMenu === group.id;
              return (
                <li key={group.id} className="al-header-nav-item">
                  <button
                    type="button"
                    className="al-header-nav-button"
                    aria-expanded={open}
                    aria-controls={`al-menu-${group.id}`}
                    onClick={() => setOpenMenu(open ? null : group.id)}
                  >
                    {group.label}
                    <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className={open ? "al-header-chev-open" : "al-header-chev"} />
                  </button>
                  <div id={`al-menu-${group.id}`} className="al-header-menu" hidden={!open}>
                    <ul>
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href} className="al-header-menu-link" onClick={closeAll}>
                            <span className="al-header-menu-label">{link.label}</span>
                            <span className="al-header-menu-note">{link.note}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
            <li>
              <a href="#pricing" className="al-header-nav-button" onClick={closeAll}>
                Pricing
              </a>
            </li>
          </ul>
        </nav>

        <div className="al-header-actions">
          <button type="button" className="al-header-login" onClick={openLogin}>
            <User size={16} strokeWidth={1.75} aria-hidden="true" />
            Login
          </button>
          <a href="#start" className="al-btn al-btn--light">
            Book a demo
          </a>
          <a href="#start" className="al-btn al-btn--dark">
            Try for free
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="al-header-toggle"
          aria-expanded={mobileOpen}
          aria-controls="al-mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      <div id="al-mobile-menu" className="al-header-mobile" hidden={!mobileOpen}>
        <nav aria-label="Mobile" className="al-header-mobile-nav">
          {menuGroups.map((group) => (
            <div key={group.id} className="al-header-mobile-group">
              <p className="al-header-mobile-heading">{group.label}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={closeAll}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="al-header-mobile-group">
            <p className="al-header-mobile-heading">Plans</p>
            <ul>
              <li>
                <a href="#pricing" onClick={closeAll}>
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="al-header-mobile-actions">
          <button type="button" className="al-btn al-btn--light" onClick={openLogin}>
            Login
          </button>
          <a href="#start" className="al-btn al-btn--light" onClick={closeAll}>
            Book a demo
          </a>
          <a href="#start" className="al-btn al-btn--dark" onClick={closeAll}>
            Try for free
          </a>
        </div>
      </div>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
