"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AvatarGroup from "@/demos/components/ui/AvatarGroup";
import Button from "@/demos/components/ui/buttons/Button";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

gsap.registerPlugin(ScrollTrigger);

/** Still frames made from a video by scripts/video-frames.mjs (npm run frames). */
interface ScrollFrames {
  /** Folder holding wide/001.webp... and tall/001.webp...; its first frame is <path>-poster.jpg. */
  path: string;
  /** Number of frames in each set. */
  count: number;
}

const frameUrl = (path: string, set: "wide" | "tall", index: number) =>
  `${path}/${set}/${String(index + 1).padStart(3, "0")}.webp`;

/** Frame 0 first, then every 8th, 4th and 2nd, then the rest: scrolling works long before all have arrived. */
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  for (const step of [count, 8, 4, 2, 1]) {
    for (let index = 0; index < count; index += step) {
      if (!seen.has(index)) {
        seen.add(index);
        order.push(index);
      }
    }
  }
  return order;
}

interface HeroSectionProps {
  /** Frames drawn in step with the scroll progress through the hero. */
  frames: ScrollFrames;
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

/**
 * Full-screen hero with a loading screen and a pinned scene that plays as you scroll.
 * The scene is a sequence of still frames drawn on a canvas, not a <video>: setting a
 * video's currentTime on scroll shows nothing on iPhones and stutters on Android.
 */
export default function HeroSection({
  frames,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const { path: framesPath, count: frameCount } = frames;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    const path = framesPath;
    const count = frameCount;
    // Phones held upright get the portrait crop: smaller files, same picture.
    const portrait = window.matchMedia("(max-aspect-ratio: 1/1)");
    let images: (HTMLImageElement | null)[] = [];
    let generation = 0;
    let target = 0;
    let drawnImage: HTMLImageElement | null = null;

    const nearestLoaded = (index: number) => {
      for (let distance = 0; distance < count; distance++) {
        const before = images[index - distance];
        if (before) {
          return before;
        }
        const after = images[index + distance];
        if (after) {
          return after;
        }
      }
      return null;
    };

    const draw = () => {
      const image = nearestLoaded(target);
      if (!image || image === drawnImage) {
        return;
      }
      drawnImage = image;
      // Like object-fit: cover.
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * pixelRatio);
      canvas.height = Math.round(canvas.clientHeight * pixelRatio);
      drawnImage = null;
      draw();
    };

    const load = () => {
      const set = portrait.matches ? "tall" : "wide";
      const current = ++generation;
      images = new Array(count).fill(null);
      drawnImage = null;
      const order = loadOrder(count);
      let next = 0;
      const worker = async () => {
        while (next < order.length && current === generation) {
          const index = order[next++];
          const image = new Image();
          image.src = frameUrl(path, set, index);
          try {
            // Decode now so drawing it while scrolling never stalls.
            await image.decode();
          } catch {
            continue;
          }
          if (current !== generation) {
            return;
          }
          images[index] = image;
          if (index === 0) {
            setIsSceneReady(true);
          }
          draw();
        }
      };
      for (let lane = 0; lane < 6; lane++) {
        void worker();
      }
    };

    // Smooths the scroll position, like the scrub on the old video.
    const playhead = { frame: 0 };
    const tween = gsap.to(playhead, {
      frame: count - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        target = Math.round(playhead.frame);
        draw();
      },
    });

    resize();
    load();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    portrait.addEventListener("change", load);
    // Never keep visitors on the loader: the poster covers the hero until frames arrive.
    const fallbackTimeoutId = setTimeout(() => setIsSceneReady(true), 2500);

    return () => {
      generation++;
      clearTimeout(fallbackTimeoutId);
      portrait.removeEventListener("change", load);
      resizeObserver.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [framesPath, frameCount]);

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
                isSceneReady
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
                if (isSceneReady) {
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
                    scaleX: isSceneReady ? 1 : 0.9,
                  }}
                  style={{
                    originX: 0,
                  }}
                  transition={{
                    duration: isSceneReady ? 0.3 : 3,
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
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${framesPath}-poster.jpg)` }}
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
