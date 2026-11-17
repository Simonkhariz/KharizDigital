"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import type { TextAnimationVariant } from "@/demos/lib/types";

const REVEAL_VARIANTS: Record<TextAnimationVariant, Variants> = {
  "slide-up": {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  "fade-blur": {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
  fade: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant: TextAnimationVariant;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  className?: string;
}

/** Reveals its children with the given animation the first time they scroll into view. */
export default function ScrollReveal({
  children,
  variant,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-20%",
      }}
      variants={REVEAL_VARIANTS[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
