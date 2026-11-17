"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button with an arrow chip that shrinks and turns on hover. */
export default function ButtonArrow({
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
        "group flex items-center justify-between gap-2 h-10 px-6 text-sm rounded cursor-pointer",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      <span className="truncate md:transition-transform md:duration-300 md:ease-out md:group-hover:translate-x-2">
        {text}
      </span>
      <div
        className={cn(
          "size-5 flex items-center justify-center rounded md:transition-all md:duration-300 md:ease-out md:group-hover:scale-[0.2] md:group-hover:rotate-90",
          variant === "primary"
            ? "secondary-button text-secondary-cta-text"
            : "primary-button text-primary-cta-text",
        )}
      >
        <ArrowRight className="size-3 md:transition-opacity md:duration-700 md:group-hover:opacity-0" />
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
