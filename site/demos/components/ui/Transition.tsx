"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

interface TransitionProps {
  children: ReactNode;
  className?: string;
  /** `full` fades and slides up; `fade` only fades. */
  transitionType?: "full" | "fade";
  /** Animate when scrolled into view (default) instead of immediately on mount. */
  whileInView?: boolean;
}

/** Fades its children in, optionally sliding them up, on mount or when scrolled into view. */
export default function Transition({
  children,
  className = "flex flex-col w-full gap-6",
  transitionType = "full",
  whileInView = true,
}: TransitionProps) {
  const hiddenState =
    transitionType === "full"
      ? {
          opacity: 0,
          y: 20,
        }
      : {
          opacity: 0,
        };

  const visibleState =
    transitionType === "full"
      ? {
          opacity: 1,
          y: 0,
        }
      : {
          opacity: 1,
        };

  return (
    <motion.div
      initial={hiddenState}
      {...(whileInView
        ? {
            whileInView: visibleState,
            viewport: {
              once: true,
              margin: "-15%",
            },
          }
        : {
            animate: visibleState,
          })}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
