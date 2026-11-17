"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import type { TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

const WORD_VARIANTS: Record<TextAnimationVariant, Variants> = {
  "slide-up": {
    hidden: {
      opacity: 0,
      y: "50%",
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
      filter: "none",
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

const EASING_BY_VARIANT: Record<TextAnimationVariant, [number, number, number, number]> = {
  "slide-up": [0.25, 0.46, 0.45, 0.94],
  "fade-blur": [0.45, 0, 0.55, 1],
  fade: [0.45, 0, 0.55, 1],
};

interface TextAnimationProps {
  text: string;
  variant: TextAnimationVariant;
  /** Fill the text with a gradient from the foreground to the primary colour. */
  gradientText?: boolean;
  /** The HTML element to render. */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
}

/** Text that animates in word by word the first time it scrolls into view. */
export default function TextAnimation({
  text,
  variant,
  gradientText,
  tag = "p",
  className = "",
}: TextAnimationProps) {
  const MotionTag = motion[tag];
  const words = text.split(" ");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const gradientClassName = gradientText
    ? "bg-gradient-to-r from-foreground to-primary-cta bg-clip-text text-transparent pb-[0.1em] -mb-[0.1em]"
    : "";

  useEffect(() => {
    if (hasAnimated && !isSettled) {
      const timeoutId = setTimeout(
        () => {
          setIsSettled(true);
        },
        variant === "fade-blur" && gradientText ? 0 : 700,
      );
      return () => clearTimeout(timeoutId);
    }
  }, [hasAnimated, isSettled, variant, gradientText]);

  return isSettled ? (
    <MotionTag className={cn("leading-[1.2]", gradientClassName, className)} initial={false}>
      {text}
    </MotionTag>
  ) : (
    <MotionTag
      className={cn(
        "leading-[1.2] transition-all duration-700",
        hasAnimated && gradientClassName,
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-20%",
      }}
      transition={{
        staggerChildren: 0.04,
      }}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      {words.map((word, index) => (
        <span key={index}>
          {index > 0 && " "}
          <motion.span
            className="inline-block"
            variants={WORD_VARIANTS[variant]}
            transition={{
              duration: 0.6,
              ease: EASING_BY_VARIANT[variant],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
