"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import AutoFillText from "@/demos/components/ui/AutoFillText";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonLink } from "@/demos/lib/types";

interface RollingTextProps {
  text: string;
}

/** Button label whose letters roll upwards one after another when the parent group is hovered. */
function RollingText({ text }: RollingTextProps) {
  return (
    <span className="truncate overflow-hidden">
      {[...text].map((character, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-400 ease-out md:group-hover:-translate-y-[1.25em]"
          style={{
            textShadow: "0 1.25em currentColor",
            transitionDelay: `${index * 0.01}s`,
            whiteSpace: character === " " ? "pre" : undefined,
          }}
        >
          {character}
        </span>
      ))}
    </span>
  );
}

interface HeroExpandProps {
  title: string;
  videoSrc?: string;
  imageSrc?: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  /** Called once the intro overlay has finished. */
  onComplete?: () => void;
}

/** Full-screen media hero that opens with an expanding intro overlay, then reveals the title and buttons. */
export default function HeroExpand({
  title,
  videoSrc,
  imageSrc,
  primaryButton,
  secondaryButton,
  onComplete,
}: HeroExpandProps) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const handlePrimaryClick = useButtonClick(primaryButton.href);
  const handleSecondaryClick = useButtonClick(secondaryButton.href);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const expandTimeoutId = setTimeout(() => setIsExpanded(true), 600);
    const revealTimeoutId = setTimeout(() => {
      setIsIntroVisible(false);
      onComplete?.();
    }, 1500);
    return () => {
      clearTimeout(expandTimeoutId);
      clearTimeout(revealTimeoutId);
    };
    // The intro plays once on mount; a new onComplete callback must not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence>
        {isIntroVisible && (
          <motion.div
            key={"loader"}
            className="fixed inset-0 z-100 bg-background"
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{
                opacity: 0,
                clipPath: "inset(25% 20% 25% 20% round 24px)",
              }}
              animate={
                isExpanded
                  ? {
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0% round 0px)",
                    }
                  : {
                      opacity: 1,
                      clipPath: "inset(25% 20% 25% 20% round 24px)",
                    }
              }
              transition={{
                duration: isExpanded ? 1.4 : 1.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} className="rounded-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section
        ref={sectionRef}
        aria-label="Hero section"
        className="relative w-full h-svh overflow-hidden mb-20"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: mediaY,
            scale: mediaScale,
          }}
        >
          <ImageOrVideo
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            className="absolute inset-0 w-full h-full object-cover rounded-none"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-background/0" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8 md:pb-12 xl:pb-16 2xl:pb-20">
          <div className="w-content-width mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={
                isIntroVisible
                  ? {
                      opacity: 0,
                      y: 20,
                    }
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <AutoFillText className="font-medium text-white" paddingY="0">
                {title}
              </AutoFillText>
            </motion.div>
            <div className="flex items-center gap-3">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={
                  isIntroVisible
                    ? {
                        opacity: 0,
                        y: 20,
                      }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="flex-1 min-w-0 md:flex-none"
              >
                <a
                  href={primaryButton.href}
                  onClick={handlePrimaryClick}
                  className="group w-full md:w-auto h-14 xl:h-16 2xl:h-18 px-4 md:px-8 xl:px-10 2xl:px-12 text-lg xl:text-xl font-medium text-nowrap inline-flex items-center justify-center rounded-2xl cursor-pointer primary-button text-primary-cta-text"
                >
                  <RollingText text={primaryButton.text} />
                </a>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={
                  isIntroVisible
                    ? {
                        opacity: 0,
                        y: 20,
                      }
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="flex-1 min-w-0 md:flex-none"
              >
                <a
                  href={secondaryButton.href}
                  onClick={handleSecondaryClick}
                  className="group w-full md:w-auto h-14 xl:h-16 2xl:h-18 px-4 md:px-8 xl:px-10 2xl:px-12 text-lg xl:text-xl font-medium text-nowrap inline-flex items-center justify-center rounded-2xl cursor-pointer secondary-button text-secondary-cta-text"
                >
                  <RollingText text={secondaryButton.text} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
