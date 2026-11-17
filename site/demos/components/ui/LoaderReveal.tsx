"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LoaderRevealProps {
  imageSrc: string;
  title: string;
  /** Called once the loader has slid out of view. */
  onComplete?: () => void;
}

/**
 * Full-screen intro loader: a progress bar fills, then the screen slides up to reveal the page.
 * The portrait and name are larger on phones so they hold the screen instead of floating in it.
 */
export default function LoaderReveal({ imageSrc, title, onComplete }: LoaderRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div className="fixed inset-0 z-100 text-primary-cta-text">
          <motion.div
            className="absolute inset-0 w-full h-full bg-background-accent"
            exit={{
              y: "-101%",
            }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-2 bg-primary-cta-text"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: +!isLoaded,
              }}
              style={{
                originX: +!!isLoaded,
              }}
              transition={{
                duration: isLoaded ? 0.5 : 3,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={() => {
                if (isLoaded) {
                  setIsVisible(false);
                } else {
                  setIsLoaded(true);
                }
              }}
            />
          </motion.div>
          <motion.div
            className="relative z-2 flex flex-col justify-center items-center w-full h-full gap-6 md:gap-5 px-6"
            animate={
              isLoaded
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 1,
                  }
            }
            transition={{
              duration: 0.5,
            }}
          >
            <div className="card p-px rounded-full">
              <img src={imageSrc} alt="" className="size-24 md:size-16 rounded-full object-cover" />
            </div>
            <div className="relative flex justify-center items-center">
              <span className="absolute text-center text-4xl md:text-4xl font-medium tracking-tight whitespace-nowrap opacity-20">
                {title}
              </span>
              <motion.span
                className="text-4xl md:text-4xl font-medium tracking-tight whitespace-nowrap"
                initial={{
                  clipPath: "inset(0% 100% 0% 0%)",
                }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                }}
                transition={{
                  duration: 3,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {title}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
