"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarInlineProps {
  logo: string;
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

/** Floating navbar bar with the links inline between the logo and the call to action; on phones the bar expands downwards to reveal them. */
export default function NavbarInline({ logo, navItems, ctaButton }: NavbarInlineProps) {
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
            className="md:hidden fixed inset-0 z-999 bg-foreground"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <nav
        data-section="navbar"
        className="fixed z-1000 top-5 left-1/2 -translate-x-1/2 w-content-width"
      >
        <div className="max-h-[calc(100svh-2.5rem)] overflow-x-hidden overflow-y-auto md:max-h-none md:overflow-visible rounded backdrop-blur-sm card">
          <div className="flex items-center justify-between gap-3 p-2 xl:p-3 2xl:p-4">
            <Link href="#top" className="min-w-0 truncate pl-2 text-xl font-medium text-foreground">
              {logo}
            </Link>
            <div className="hidden md:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center gap-4 lg:gap-6">
              {navItems.map((navItem) => (
                <a
                  key={navItem.name}
                  href={navItem.href}
                  onClick={(event) => handleNavLinkClick(event, navItem.href)}
                  className="relative text-base whitespace-nowrap text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                >
                  {navItem.name}
                </a>
              ))}
            </div>
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
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-3 p-2 pt-1">
                  <div className="px-2">
                    {navItems.map((navItem, index) => (
                      <div key={navItem.name}>
                        <a
                          href={navItem.href}
                          onClick={(event) =>
                            handleNavLinkClick(event, navItem.href, () => setIsMenuOpen(false))
                          }
                          className="flex items-center justify-between py-3 w-full"
                        >
                          <span className="text-xl font-medium text-foreground">
                            {navItem.name}
                          </span>
                          <ArrowUpRight
                            className="h-(--text-xl) w-auto text-foreground"
                            strokeWidth={2}
                          />
                        </a>
                        {index < navItems.length - 1 && <div className="h-px bg-foreground/15" />}
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
