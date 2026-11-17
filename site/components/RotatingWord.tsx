"use client";

import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./motion";

// One slot of a headline whose text is swapped: the old text slides up and
// out, the new one slides in from below. `block` makes the slot a full line.
export function RotatingWord({ text, block = false }: { text: string; block?: boolean }) {
  return (
    <span className={block ? "relative block overflow-hidden" : "relative inline-flex overflow-hidden align-bottom"}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.55, ease: EASE }}
          className={block ? "block" : "inline-block"}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
