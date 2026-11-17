"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import type { ButtonLink, NavItem } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  ctaButton: ButtonLink;
}

/** Smooth-scrolls to in-page anchors, then runs the callback. */
function handleNavLinkClick(
  event: ReactMouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate: () => void,
) {
  if (href.startsWith("#")) {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  onNavigate();
}

/** Navbar over the hero whose toggle wipes a full-screen menu of large links over the page. */
export default function Navbar({ logo, navItems, ctaButton }: NavbarProps) {
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav data-section="navbar" className="absolute inset-0 z-1000 pointer-events-none">
      <div className="absolute z-10 top-5 left-1/2 -translate-x-1/2 flex items-center justify-between gap-3 w-content-width pointer-events-auto">
        <Link href="#top" className="min-w-0 truncate text-xl font-medium text-background">
          {logo}
        </Link>
        <div className="flex items-center shrink-0 gap-2 xl:gap-3 2xl:gap-4">
          <div
            className={cn(
              "hidden sm:block transition-opacity duration-300",
              isMenuOpen && "opacity-0 pointer-events-none",
            )}
          >
            <Button text={ctaButton.text} href={ctaButton.href} variant="primary" animate={false} />
          </div>
          <div
            className={cn(
              "relative flex items-center justify-center size-10 md:size-9 rounded cursor-pointer",
              isMenuOpen ? "bg-background" : "primary-button",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={cn(
                "absolute w-3 h-px transition-all duration-300",
                isMenuOpen ? "rotate-45 bg-foreground" : "-translate-y-1 bg-primary-cta-text",
              )}
            />
            <span
              className={cn(
                "absolute w-3 h-px transition-all duration-300",
                isMenuOpen ? "-rotate-45 bg-foreground" : "translate-y-1 bg-primary-cta-text",
              )}
            />
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 flex flex-col items-center overflow-y-auto py-24 bg-foreground pointer-events-auto transition-[clip-path] duration-700 ease-[cubic-bezier(0.9,0,0.1,1)]"
        style={{
          clipPath: isMenuOpen
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
      >
        <div className="flex flex-col items-center my-auto">
          {navItems.map((navItem, index) => (
            <div key={navItem.name} className="overflow-hidden">
              <a
                href={navItem.href}
                onClick={(event) =>
                  handleNavLinkClick(event, navItem.href, () => setIsMenuOpen(false))
                }
                className="group flex items-center gap-4 py-4"
                style={{
                  transform: isMenuOpen ? "translateY(0%)" : "translateY(100%)",
                  transition: "transform 0.5s cubic-bezier(0.7, 0, 0.3, 1)",
                  transitionDelay: isMenuOpen
                    ? `${0.3 + index * 0.05}s`
                    : `${(navItems.length - 1 - index) * 0.05}s`,
                }}
              >
                <span className="text-5xl sm:text-7xl md:text-9xl font-medium text-background group-hover:ml-4 transition-[margin] duration-300">
                  {navItem.name}
                </span>
                <ArrowUpRight
                  className="h-10 sm:h-(--text-7xl) md:h-(--text-9xl) w-auto text-background group-hover:rotate-45 group-hover:mr-4 transition-all duration-300"
                  strokeWidth={1.5}
                />
              </a>
              {index < navItems.length - 1 && <div className="h-px bg-background/20" />}
            </div>
          ))}
          <div className="mt-8 sm:hidden" onClick={() => setIsMenuOpen(false)}>
            <Button text={ctaButton.text} href={ctaButton.href} variant="primary" animate={false} />
          </div>
        </div>
      </div>
    </nav>
  );
}
