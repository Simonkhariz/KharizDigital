"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button that squashes and springs back when hovered. */
export default function ButtonElastic({
  text,
  variant = "primary",
  href = "#",
  onClick,
  animate = true,
  animationDelay = 0,
  className = "",
}: ButtonProps) {
  const handleClick = useButtonClick(href, onClick);
  const stretch = useSpring(1, {
    stiffness: 300,
    damping: 10,
  });
  const scaleX = useTransform(stretch, [1, 1.08], [1, 1.08]);
  const scaleY = useTransform(stretch, [1, 1.08], [1, 0.95]);

  const button = (
    <motion.a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => {
        if (!(window.innerWidth < 768)) {
          stretch.set(1.08);
          setTimeout(() => stretch.set(1), 100);
        }
      }}
      style={{
        scaleX,
        scaleY,
      }}
      className={cn(
        "flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      {text}
    </motion.a>
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
        duration: 0.4,
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
