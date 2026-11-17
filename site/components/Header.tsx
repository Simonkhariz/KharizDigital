"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contactLink, navLinks, site } from "@/content/site";
import { Logo } from "./Logo";

// Pages that open with a full-height hero: the header stays transparent
// over the hero and gains its frosted background after scrolling past it.
const HERO_PAGES = ["/", "/about"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0.65 * window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const transparent = HERO_PAGES.includes(pathname) && !scrolled && !menuOpen;
  const blur = transparent ? "none" : "blur(16px)";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`absolute inset-0 bg-white/70 transition-opacity duration-500 ${transparent ? "opacity-0" : "opacity-100"}`}
        style={{ backdropFilter: blur, WebkitBackdropFilter: blur }}
      />
      <div
        className={`relative container-x py-2.5 md:py-3 flex items-center justify-between border-b text-foreground transition-colors duration-500 ${
          transparent ? "border-transparent" : "border-border/70"
        }`}
      >
        <Link href="/" aria-label={`${site.name}, home`} className="inline-flex items-center">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-sm transition-colors duration-200 hover:text-foreground ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {item.label}
                {/* The current page keeps its line, in the brand orange. */}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[1px] transition-all duration-300 group-hover:w-full ${active ? "w-full bg-brand" : "w-0 bg-foreground"}`}
                />
              </Link>
            );
          })}
          <Link
            href={contactLink.href}
            className="group relative inline-flex items-center gap-2 border rounded-full px-4 py-1 text-sm overflow-hidden transition-colors duration-300 border-foreground/30 hover:border-foreground"
          >
            <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full bg-foreground" />
            <span className="relative transition-colors duration-300 group-hover:text-background">{contactLink.label}</span>
            <span className="relative flex items-center transition-colors duration-300 group-hover:text-background">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative w-9 h-9 flex items-center justify-center text-foreground -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="overflow-visible">
            <motion.line
              x1="3"
              y1={menuOpen ? "10" : "6.5"}
              x2="17"
              y2={menuOpen ? "10" : "6.5"}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              animate={menuOpen ? { rotate: 45, transformOrigin: "10px 10px" } : { rotate: 0, transformOrigin: "10px 6.5px" }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="3"
              y1={menuOpen ? "10" : "13.5"}
              x2="17"
              y2={menuOpen ? "10" : "13.5"}
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              animate={menuOpen ? { rotate: -45, transformOrigin: "10px 10px" } : { rotate: 0, transformOrigin: "10px 13.5px" }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-6 py-6 gap-4">
              {[...navLinks, contactLink].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group relative text-lg hover:text-muted-foreground transition-colors w-fit"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
