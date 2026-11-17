"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarCenteredProps {
  logo: string;
  navItems: NavItem[];
  ctaButton: ButtonLink;
}

/** Smooth-scrolls to in-page anchors, then runs the optional callback. */
function handleNavLinkClick(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void,
) {
  if (href.startsWith("#")) {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  onNavigate?.();
}

/** Full-width navbar with centred links that shrinks on scroll and opens a card menu on mobile. */
export default function NavbarCentered({ logo, navItems, ctaButton }: NavbarCenteredProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        data-section="navbar"
        className={cn(
          "fixed z-1000 top-0 left-0 w-full transition-all duration-500 ease-in-out",
          isScrolled
            ? "h-15 bg-background/80 backdrop-blur-sm"
            : "h-20 bg-background/0 backdrop-blur-0",
        )}
      >
        <div className="relative mx-auto flex items-center justify-between gap-3 h-full w-content-width">
          <Link href="#top" className="min-w-0 truncate text-xl font-medium text-foreground">
            {logo}
          </Link>
          <div className="hidden md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center gap-4 lg:gap-6">
            {navItems.map((navItem) => (
              <a
                key={navItem.name}
                href={navItem.href}
                onClick={(event) => handleNavLinkClick(event, navItem.href)}
                className="text-base whitespace-nowrap text-foreground hover:opacity-70 transition-opacity"
              >
                {navItem.name}
              </a>
            ))}
          </div>
          <div className="flex items-center shrink-0 gap-2 xl:gap-3 2xl:gap-4">
            <div className="hidden md:block">
              <Button
                text={ctaButton.text}
                href={ctaButton.href}
                variant="primary"
                animate={false}
              />
            </div>
            <div
              className="flex md:hidden items-center justify-center shrink-0 size-10 rounded cursor-pointer primary-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Plus
                className={cn(
                  "w-1/2 h-1/2 text-primary-cta-text transition-transform duration-300",
                  isMenuOpen ? "rotate-45" : "rotate-0",
                )}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={containerRef}
            initial={{
              y: "-135%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "-135%",
            }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 170,
            }}
            className="md:hidden fixed z-1000 top-3 left-3 right-3 max-h-[calc(100svh-1.5rem)] overflow-y-auto p-6 rounded card"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl text-foreground">Menu</p>
              <div
                className="flex items-center justify-center shrink-0 size-10 rounded cursor-pointer primary-button"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="w-1/2 h-1/2 text-primary-cta-text rotate-45" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {navItems.map((navItem, index) => (
                <div key={navItem.name}>
                  <a
                    href={navItem.href}
                    onClick={(event) =>
                      handleNavLinkClick(event, navItem.href, () => setIsMenuOpen(false))
                    }
                    className="flex items-center justify-between py-3 text-lg font-medium text-foreground"
                  >
                    {navItem.name}
                    <ArrowRight className="size-4 text-foreground" strokeWidth={1.5} />
                  </a>
                  {index < navItems.length - 1 && (
                    <div className="h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6" onClick={() => setIsMenuOpen(false)}>
              <Button
                text={ctaButton.text}
                href={ctaButton.href}
                variant="primary"
                animate={false}
                className="w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
