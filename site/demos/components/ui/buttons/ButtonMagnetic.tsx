"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button that is pulled slightly towards the pointer. */
export default function ButtonMagnetic({
  text,
  variant = "primary",
  href = "#",
  onClick,
  animate = true,
  animationDelay = 0,
  className = "",
}: ButtonProps) {
  const handleClick = useButtonClick(href, onClick);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, {
    stiffness: 150,
    damping: 15,
  });
  const springY = useSpring(offsetY, {
    stiffness: 150,
    damping: 15,
  });

  const button = (
    <motion.a
      ref={anchorRef}
      href={href}
      onClick={handleClick}
      onMouseMove={(event) => {
        if (!anchorRef.current || window.innerWidth < 768) {
          return;
        }
        const rect = anchorRef.current.getBoundingClientRect();
        const pullX = (event.clientX - rect.left - rect.width / 2) * 0.15;
        const pullY = (event.clientY - rect.top - rect.height / 2) * 0.15;
        offsetX.set(pullX);
        offsetY.set(pullY);
      }}
      onMouseLeave={() => {
        offsetX.set(0);
        offsetY.set(0);
      }}
      style={{
        x: springX,
        y: springY,
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
