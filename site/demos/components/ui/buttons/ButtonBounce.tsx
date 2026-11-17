"use client";

import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button that tilts and shrinks on hover while its letters roll upward. */
export default function ButtonBounce({
  text,
  variant = "primary",
  href = "#",
  onClick,
  animate = true,
  animationDelay = 0,
  className = "",
}: ButtonProps) {
  const button = (
    <a
      href={href}
      onClick={useButtonClick(href, onClick)}
      className={cn(
        "group flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer transition-transform duration-300 ease-out md:hover:scale-90 md:hover:-rotate-3",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      <span className="truncate overflow-hidden">
        {[...text].map((character, index) => (
          <span
            key={index}
            className="inline-block transition-transform duration-300 ease-out md:group-hover:-translate-y-[1.25em] md:group-hover:rotate-3"
            style={{
              textShadow: "0 1.25em currentColor",
              whiteSpace: character === " " ? "pre" : undefined,
            }}
          >
            {character}
          </span>
        ))}
      </span>
    </a>
  );

  return animate ? (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: animationDelay,
        ease: "easeOut",
      }}
    >
      {button}
    </motion.div>
  ) : (
    button
  );
}
