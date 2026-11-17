"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarFloatingLogoProps {
  logo: string;
  logoImageSrc: string;
  navItems: NavItem[];
  ctaButton: ButtonLink;
}

/** Runs the optional callback, then smooth-scrolls to in-page anchors. */
function handleNavLinkClick(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void,
) {
  onNavigate?.();
  if (href.startsWith("#")) {
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    // The collapsing menu re-measures its height on the next frame and pins the scroll position
    // while it does, which cancels a smooth scroll already under way. Start scrolling after that.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }
}

/** Floating navbar card with a logo image that expands downwards to reveal the links. */
export default function NavbarFloatingLogo({
  logo,
  logoImageSrc,
  navItems,
  ctaButton,
}: NavbarFloatingLogoProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.15,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="fixed inset-0 z-999 bg-foreground"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <nav
        data-section="navbar"
        className="fixed z-1000 top-5 left-1/2 -translate-x-1/2 w-content-width"
      >
        <div className="mx-auto w-full md:w-1/2 max-h-[calc(100svh-2.5rem)] overflow-x-hidden overflow-y-auto rounded backdrop-blur-sm card">
          <div className="relative z-10 flex items-center justify-between gap-3 xl:gap-4 2xl:gap-5 p-3 xl:p-4 2xl:p-5">
            <Link href="#top" className="flex items-center gap-2 min-w-0">
              <img
                src={logoImageSrc}
                alt={logo}
                className="shrink-0 h-8 w-8 rounded-full object-cover"
              />
              <span className="truncate text-xl font-medium text-foreground">{logo}</span>
            </Link>
            <div
              className="flex items-center justify-center shrink-0 size-10 md:size-9 rounded cursor-pointer primary-button"
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
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{
                  height: 0,
                }}
                animate={{
                  height: "auto",
                }}
                exit={{
                  height: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.625, 0.05, 0, 1],
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 xl:gap-4 2xl:gap-5 p-3 xl:p-4 2xl:p-5 pt-0 xl:pt-0 2xl:pt-0">
                  <div className="px-3 xl:px-4 2xl:px-5 py-0 md:py-1 2xl:py-2 rounded card">
                    {navItems.map((navItem, index) => (
                      <div key={navItem.name}>
                        <a
                          href={navItem.href}
                          onClick={(event) =>
                            handleNavLinkClick(event, navItem.href, () => setIsMenuOpen(false))
                          }
                          className="group flex items-center justify-between py-3 w-full"
                        >
                          <span className="text-xl md:text-2xl font-medium text-foreground group-hover:ml-3 transition-[margin] duration-300">
                            {navItem.name}
                          </span>
                          <ArrowUpRight
                            className="h-(--text-xl) md:h-(--text-2xl) w-auto text-foreground group-hover:rotate-45 group-hover:mr-3 transition-all duration-300"
                            strokeWidth={2}
                          />
                        </a>
                        {index < navItems.length - 1 && <div className="h-px bg-accent/50" />}
                      </div>
                    ))}
                  </div>
                  <div onClick={() => setIsMenuOpen(false)}>
                    <Button
                      text={ctaButton.text}
                      href={ctaButton.href}
                      variant="primary"
                      animate={false}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
