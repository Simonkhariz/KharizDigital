"use client";

import { motion } from "motion/react";
import type { Service } from "@/content/services";
import { EASE } from "./motion";

// A line illustration that draws itself, stroke by stroke, when it scrolls
// into view. Each stroke carries its own start delay.
export function LineDrawing({ drawing, className }: { drawing: Service["drawing"]; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <g>
        {drawing.strokes.map((stroke, i) => (
          <motion.path
            key={i}
            d={stroke.d}
            strokeWidth={stroke.w}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: stroke.delay, ease: EASE }}
          />
        ))}
      </g>
    </svg>
  );
}
