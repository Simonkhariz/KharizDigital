"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button whose label slides aside to reveal a leading arrow on hover. */
export default function ButtonSlide({
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
        "group relative flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer overflow-clip",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      <ArrowRight className="absolute left-5 size-3.5 opacity-0 -translate-x-6 md:transition-all md:duration-500 md:ease-[cubic-bezier(0.32,0.72,0,1)] md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-hover:delay-75" />
      <span className="flex items-center gap-1.5 md:transition-transform md:duration-500 md:ease-[cubic-bezier(0.32,0.72,0,1)] md:group-hover:translate-x-4 md:group-hover:delay-75">
        <span className="truncate">{text}</span>
        <ArrowRight className="size-3.5 md:transition-all md:duration-500 md:ease-[cubic-bezier(0.32,0.72,0,1)] md:group-hover:opacity-0 md:group-hover:translate-x-6 md:group-hover:delay-50" />
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
