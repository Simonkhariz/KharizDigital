"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarProps {
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

/** Transparent navbar over the hero, with a drop-down menu card on mobile. */
export default function Navbar({ logo, navItems, ctaButton }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        data-section="navbar"
        className="absolute z-1000 top-0 left-1/2 -translate-x-1/2 w-content-width"
      >
        <div className="relative flex items-center justify-between py-5">
          <Link href="#top" className="text-xl font-medium text-background">
            {logo}
          </Link>
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            {navItems.map((navItem) => (
              <a
                key={navItem.name}
                href={navItem.href}
                onClick={(event) => handleNavLinkClick(event, navItem.href)}
                className="text-base whitespace-nowrap text-background hover:opacity-70 transition-opacity"
              >
                {navItem.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4">
            <Button
              text={ctaButton.text}
              href={ctaButton.href}
              variant="primary"
              animate={false}
              className="hidden md:flex"
            />
            <div
              className="flex md:hidden items-center justify-center shrink-0 size-9 rounded cursor-pointer primary-button"
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
            ref={mobileMenuRef}
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
                className="flex items-center justify-center shrink-0 size-9 rounded cursor-pointer primary-button"
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
            <div className="flex flex-col gap-3 mt-6" onClick={() => setIsMenuOpen(false)}>
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
