"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AvatarGroup from "@/demos/components/ui/AvatarGroup";
import Button from "@/demos/components/ui/buttons/Button";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  /** Video whose playback position follows the scroll progress through the hero. */
  videoSrc: string;
  /** Shown in the loading screen and as the small label above the title. */
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton?: ButtonLink;
  /** Caption in the bottom right corner. */
  bottomText: string;
  avatarsSrc?: string[];
  avatarsLabel?: string;
  textAnimation: TextAnimationVariant;
}

/** Full-screen hero with a loading screen and a pinned video that is scrubbed by scrolling. */
export default function HeroSection({
  videoSrc,
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  bottomText,
  avatarsSrc,
  avatarsLabel,
  textAnimation,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleCanPlayThrough = () => {
      setIsVideoReady(true);
    };
    if (video.readyState >= 4) {
      setIsVideoReady(true);
    } else {
      video.addEventListener("canplaythrough", handleCanPlayThrough, {
        once: true,
      });
    }

    const fallbackTimeoutId = setTimeout(() => {
      setIsVideoReady(true);
    }, 8e3);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      clearTimeout(fallbackTimeoutId);
    };
  }, []);

  useGSAP(
    () => {
      if (!isVideoReady) {
        return;
      }
      const video = videoRef.current;
      if (!video) {
        return;
      }

      const createScrubTrigger = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (scrollTrigger) => {
            if (video.duration) {
              video.currentTime = video.duration * scrollTrigger.progress;
            }
          },
        });
      };
      if (video.readyState >= 1) {
        createScrubTrigger();
      } else {
        video.addEventListener("loadedmetadata", createScrubTrigger, {
          once: true,
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [isVideoReady],
    },
  );

  return (
    <>
      <AnimatePresence>
        {isLoaderVisible && (
          <motion.div
            className="fixed inset-0 z-1001 flex flex-col items-center justify-center bg-foreground"
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-6"
              animate={
                isVideoReady
                  ? {
                      opacity: 0,
                      y: -20,
                    }
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.5,
              }}
              onAnimationComplete={() => {
                if (isVideoReady) {
                  setIsLoaderVisible(false);
                }
              }}
            >
              <div className="relative">
                <span className="text-xl md:text-2xl font-medium tracking-tight text-background/20">
                  {tag}
                </span>
                <motion.span
                  className="absolute inset-0 text-xl md:text-2xl font-medium tracking-tight text-background"
                  initial={{
                    clipPath: "inset(0% 100% 0% 0%)",
                  }}
                  animate={{
                    clipPath: "inset(0% 0% 0% 0%)",
                  }}
                  transition={{
                    duration: 2,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {tag}
                </motion.span>
              </div>
              <div className="w-48 h-0.5 bg-background/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-background rounded-full"
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: isVideoReady ? 1 : 0.9,
                  }}
                  style={{
                    originX: 0,
                  }}
                  transition={{
                    duration: isVideoReady ? 0.3 : 3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={containerRef} className="relative h-[300vh] mb-20">
        <section
          aria-label="Hero section"
          className="sticky top-0 overflow-hidden flex flex-col justify-between w-full h-svh"
        >
          <HeroBackgroundSlot />
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div
            className="md:hidden absolute inset-0 bg-linear-to-b from-black/10 via-black/45 via-35% to-transparent to-80%"
            aria-hidden="true"
          />
          <div
            className="absolute z-10 left-0 top-0 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 backdrop-blur mask-[radial-gradient(circle,black_20%,transparent_70%)]"
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 w-content-width mx-auto pt-24 sm:pt-35"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isLoaderVisible
                ? {
                    opacity: 0,
                    y: 30,
                  }
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex flex-col gap-3 w-full md:w-6/10 lg:w-1/2 xl:w-45/100 2xl:w-4/10">
              <div className="w-fit px-3 py-1 mb-1 text-sm card rounded">
                <p>{tag}</p>
              </div>
              <TextAnimation
                text={title}
                variant={textAnimation}
                gradientText
                tag="h1"
                className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-white text-balance"
              />
              <TextAnimation
                text={description}
                variant={textAnimation}
                gradientText={false}
                tag="p"
                className="text-lg md:text-xl text-white leading-snug text-balance"
              />
              <div className="flex flex-wrap gap-3 mt-2 md:mt-3">
                <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
                {secondaryButton && (
                  <Button
                    text={secondaryButton.text}
                    href={secondaryButton.href}
                    variant="secondary"
                    animationDelay={0.1}
                  />
                )}
              </div>
              {avatarsSrc && avatarsSrc.length > 0 && (
                <div className="mt-3 md:mt-4">
                  <AvatarGroup
                    avatarsSrc={avatarsSrc}
                    size="lg"
                    label={avatarsLabel}
                    labelClassName="text-primary-cta-text"
                  />
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            className="relative z-10 flex justify-end mx-auto pb-8 w-content-width"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isLoaderVisible
                ? {
                    opacity: 0,
                    y: 30,
                  }
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="md:max-w-1/2 2xl:max-w-4/10 text-sm md:text-base uppercase tracking-wide leading-normal text-balance text-end text-white/75">
              {bottomText}
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}
