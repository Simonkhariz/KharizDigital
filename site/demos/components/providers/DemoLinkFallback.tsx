"use client";

import { useEffect } from "react";

/**
 * Safety net for the demo sites: no link is ever a dead end.
 *
 * Some links in a template have no destination of their own (a call to action with no page
 * behind it, a social link for a fictional brand, a menu item pointing at a section this
 * template does not include). Clicking one of those scrolls to the contact section if the page
 * has one, otherwise to the footer, where the visitor can get in touch.
 */
export default function DemoLinkFallback() {
  useEffect(() => {
    const fallbackTarget = () =>
      document.getElementById("contact") ??
      document.querySelector("footer") ??
      document.body.lastElementChild;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (href === "#top") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const hasNoDestination = href === null || href === "" || href === "#";
      const pointsAtMissingSection =
        href !== null &&
        href.length > 1 &&
        href.startsWith("#") &&
        !document.getElementById(href.slice(1));
      if (!hasNoDestination && !pointsAtMissingSection) return;

      event.preventDefault();
      fallbackTarget()?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Capture phase, so this runs before a link's own handler tries (and fails) to scroll.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
