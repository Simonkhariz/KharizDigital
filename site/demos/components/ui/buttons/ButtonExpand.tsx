"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button whose arrow chip background expands to fill the whole button on hover. */
export default function ButtonExpand({
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
        "group relative flex items-center gap-3 min-w-0 w-fit max-w-full py-0.5 pl-5 pr-0.5 text-sm rounded cursor-pointer",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      <span
        className={cn(
          "relative z-10 flex-1 truncate md:transition-colors md:duration-500 md:ease-out",
          variant === "primary"
            ? "text-primary-cta-text md:group-hover:text-secondary-cta-text"
            : "text-secondary-cta-text md:group-hover:text-primary-cta-text",
        )}
      >
        {text}
      </span>
      <div
        className={cn(
          "relative z-10 flex items-center justify-center size-8 rounded",
          variant === "primary" ? "text-secondary-cta-text" : "text-primary-cta-text",
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0.5 z-0 overflow-hidden rounded pointer-events-none">
        <div
          className={cn(
            "h-full w-full rounded -translate-x-[calc(-100%+2rem)] md:transition-transform md:duration-500 md:ease-out md:group-hover:translate-x-0",
            variant === "primary" ? "secondary-button" : "primary-button",
          )}
        />
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
