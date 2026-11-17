"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarDropdownProps {
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

/** Floating navbar bar whose toggle opens a dropdown list of links. */
export default function NavbarDropdown({ logo, navItems, ctaButton }: NavbarDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
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
    <nav
      data-section="navbar"
      ref={navRef}
      className="fixed z-1000 top-5 left-1/2 -translate-x-1/2 w-content-width"
    >
      <div className="flex items-center justify-between gap-3 p-2 xl:p-3 2xl:p-4 rounded backdrop-blur-sm card">
        <Link href="#top" className="min-w-0 truncate pl-2 text-xl font-medium text-foreground">
          {logo}
        </Link>
        <div className="flex items-center shrink-0 gap-2 xl:gap-3 2xl:gap-4">
          <Button text={ctaButton.text} href={ctaButton.href} variant="primary" animate={false} />
          <div
            className="relative flex items-center justify-center shrink-0 size-10 md:size-9 rounded cursor-pointer primary-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={cn(
                "absolute w-3 h-px bg-primary-cta-text transition-all duration-300",
                isMenuOpen ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute w-3 h-px bg-primary-cta-text transition-all duration-300",
                isMenuOpen ? "-rotate-45" : "translate-y-1",
              )}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute top-full right-2 xl:right-3 2xl:right-4 -mt-1 px-4 py-1 w-3/4 md:w-3/10 2xl:w-25/100 rounded primary-button"
          >
            {navItems.map((navItem, index) => (
              <div key={navItem.name}>
                <a
                  href={navItem.href}
                  onClick={(event) =>
                    handleNavLinkClick(event, navItem.href, () => setIsMenuOpen(false))
                  }
                  className="group flex items-center justify-between py-3 w-full"
                >
                  <span className="text-base text-primary-cta-text group-hover:ml-2 transition-[margin] duration-300">
                    {navItem.name}
                  </span>
                  <ArrowUpRight
                    className="h-(--text-base) w-auto text-primary-cta-text group-hover:rotate-45 group-hover:mr-2 transition-all duration-300"
                    strokeWidth={1.75}
                  />
                </a>
                {index < navItems.length - 1 && <div className="h-px bg-primary-cta-text/20" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
