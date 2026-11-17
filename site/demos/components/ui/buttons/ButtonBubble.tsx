"use client";

import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button whose arrow bubble moves from the right edge to the left on hover. */
export default function ButtonBubble({
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
        "group relative flex items-center min-w-0 max-w-full text-sm rounded cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center size-10 rounded relative scale-0 md:transition-transform md:duration-500 md:ease-out md:origin-left md:group-hover:scale-100",
          variant === "primary"
            ? "primary-button text-primary-cta-text"
            : "secondary-button text-secondary-cta-text",
        )}
      >
        <ArrowDownRight className="size-3.5 md:transition-transform md:duration-500 md:group-hover:-rotate-45" />
      </div>
      <div
        className={cn(
          "flex items-center justify-between flex-1 h-10 px-4 min-w-0 max-w-full rounded relative -translate-x-10 md:transition-transform md:duration-500 md:ease-out md:group-hover:translate-x-0",
          variant === "primary"
            ? "primary-button text-primary-cta-text"
            : "secondary-button text-secondary-cta-text",
        )}
      >
        <span className="truncate">{text}</span>
      </div>
      <div
        className={cn(
          "flex items-center justify-center size-10 rounded absolute right-0 z-20 scale-100 md:transition-transform md:duration-500 md:ease-out md:origin-right md:group-hover:scale-0",
          variant === "primary"
            ? "primary-button text-primary-cta-text"
            : "secondary-button text-secondary-cta-text",
        )}
      >
        <ArrowDownRight className="size-3.5 md:transition-transform md:duration-500 md:group-hover:-rotate-45" />
      </div>
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
