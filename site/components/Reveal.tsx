"use client";

import { motion } from "motion/react";
import type { ComponentProps } from "react";

type Tag = "div" | "p";

type RevealProps = {
  as?: Tag;
  /** Distance in px the element rises from. 0 gives a plain fade. */
  y?: number;
  duration?: number;
  delay?: number;
} & Omit<ComponentProps<typeof motion.div>, "initial" | "whileInView" | "viewport" | "transition">;

// Fades (and lifts) its children in the first time they scroll into view.
export function Reveal({ as = "div", y = 16, duration = 0.5, delay = 0, ...rest }: RevealProps) {
  const Component = (as === "p" ? motion.p : motion.div) as typeof motion.div;
  return (
    <Component
      initial={y ? { opacity: 0, y } : { opacity: 0 }}
      whileInView={y ? { opacity: 1, y: 0 } : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
      {...rest}
    />
  );
}
