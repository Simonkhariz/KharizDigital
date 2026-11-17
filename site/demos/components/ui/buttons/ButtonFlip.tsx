"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Button whose letters flip away one by one and are replaced by a second copy on hover. */
export default function ButtonFlip({
  text,
  variant = "primary",
  href = "#",
  onClick,
  animate = true,
  animationDelay = 0,
  className = "",
}: ButtonProps) {
  const handleClick = useButtonClick(href, onClick);
  const [isHovered, setIsHovered] = useState(false);
  const lastIndex = Math.max(text.length - 1, 1);

  /** Per-letter delay, tilt and sideways drift, so the letters fan out from the middle. */
  const getLetterMotion = (index: number) => {
    const progress = index / lastIndex;
    const offsetFromCenter = index - lastIndex / 2;
    const delayCurve = Math.sin(progress * 1.5 * (Math.PI / 180));
    const tiltCurve = Math.sin(progress * 30 * (Math.PI / 180));
    const direction = Math.max(-1, Math.min(1, offsetFromCenter));
    return {
      delay: 0.05 + delayCurve * 2.9,
      rotateZ: direction * tiltCurve * 36 * -1,
      translateX: offsetFromCenter * 0.125,
    };
  };

  const button = (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer active:scale-[0.96]",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      <span className="grid">
        <span className="col-start-1 row-start-1 perspective-[10em] transform-3d">
          {[...text].map((character, index) => {
            const { delay, rotateZ, translateX } = getLetterMotion(index);
            return (
              <motion.span
                key={index}
                className="inline-block"
                initial={false}
                animate={
                  isHovered
                    ? {
                        x: `${translateX}em`,
                        y: "-1.25em",
                        rotateX: 72,
                        rotateZ,
                        scale: 0.65,
                        opacity: 0,
                      }
                    : {
                        x: 0,
                        y: 0,
                        rotateX: 0,
                        rotateZ: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.35,
                  delay: isHovered ? delay : 0,
                  ease: [0.675, 0.15, 0.1, 1],
                }}
                style={{
                  whiteSpace: character === " " ? "pre" : undefined,
                }}
              >
                {character}
              </motion.span>
            );
          })}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 perspective-[10em] transform-3d"
        >
          {[...text].map((character, index) => {
            const { delay, rotateZ, translateX } = getLetterMotion(index);
            return (
              <motion.span
                key={index}
                className="inline-block"
                initial={false}
                animate={
                  isHovered
                    ? {
                        x: 0,
                        y: 0,
                        rotateX: 0,
                        rotateZ: 0,
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        x: `${translateX}em`,
                        y: "1.25em",
                        rotateX: -72,
                        rotateZ,
                        scale: 0.65,
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 0.35,
                  delay: isHovered ? delay + 0.05 : 0,
                  ease: [0.675, 0.15, 0.1, 1],
                }}
                style={{
                  whiteSpace: character === " " ? "pre" : undefined,
                }}
              >
                {character}
              </motion.span>
            );
          })}
        </span>
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
