"use client";

import { useEffect } from "react";

const SELECTOR = "[data-colour-on-scroll]";

/**
 * Black-and-white pictures turn to colour on hover. Touch screens cannot hover,
 * so there each element marked `data-colour-on-scroll` gets `data-in-view`
 * while it crosses the middle of the screen, and its picture shows its colours
 * through the `group-data-[in-view]:grayscale-0` class.
 * Mounted once in the agency layout; it also picks up cards added later
 * (gallery filters, pagination, page changes).
 */
export function ColourOnScroll() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.toggleAttribute("data-in-view", entry.isIntersecting);
        }
      },
      // The middle 40% of the screen.
      { rootMargin: "-30% 0px -30% 0px" },
    );
    const watched = new WeakSet<Element>();
    const watchNew = () => {
      for (const element of document.querySelectorAll(SELECTOR)) {
        if (!watched.has(element)) {
          watched.add(element);
          observer.observe(element);
        }
      }
    };
    watchNew();
    const mutations = new MutationObserver(watchNew);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
