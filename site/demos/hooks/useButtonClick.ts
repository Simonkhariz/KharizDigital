"use client";

import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Returns a click handler for a link-like element.
 *
 * - `https://…` / `www.…` open in a new tab
 * - `mailto:` / `tel:` keep the browser default
 * - `/path#section` navigates with the router, then scrolls to the section
 * - `#section` (or a bare id) smooth-scrolls to the element with that id
 */
export function useButtonClick(href?: string, onClick?: () => void) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();

  const scrollToElement = (id: string, delay = 100) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (!element) return;
      if (lenis) {
        lenis.scrollTo(element, { offset: 0 });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, delay);
  };

  return (event?: MouseEvent<HTMLElement>) => {
    if (href) {
      const isExternal = /^(https?:\/\/|www\.)/.test(href);
      const isContactLink = /^(mailto:|tel:)/.test(href);

      if (isExternal) {
        event?.preventDefault();
        window.open(
          href.startsWith("www.") ? `https://${href}` : href,
          "_blank",
          "noopener,noreferrer",
        );
      } else if (isContactLink) {
        onClick?.();
        return;
      } else if (href.startsWith("/")) {
        event?.preventDefault();
        const [path, sectionId] = href.split("#");
        if (path === pathname) {
          if (sectionId) scrollToElement(sectionId, 50);
        } else {
          router.push(path);
          if (sectionId) {
            setTimeout(() => {
              scrollToElement(sectionId, 100);
            }, 100);
          }
        }
      } else if (href.startsWith("#")) {
        event?.preventDefault();
        scrollToElement(href.slice(1), 50);
      } else {
        event?.preventDefault();
        scrollToElement(href, 50);
      }
    }
    onClick?.();
  };
}
