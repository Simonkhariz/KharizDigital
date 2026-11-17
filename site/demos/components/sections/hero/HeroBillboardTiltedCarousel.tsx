"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface CarouselItem {
  imageSrc?: string;
  videoSrc?: string;
}

interface TiltedCarouselProps {
  items: CarouselItem[];
  /** Time between slides, in milliseconds. */
  autoPlayInterval?: number;
}

/** Auto-playing fan of five cards: the active one centered, its neighbours tilted behind it. */
function TiltedCarousel({ items, autoPlayInterval = 4000 }: TiltedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const itemCount = items.length;

  useEffect(() => {
    if (isEntering) {
      const timeoutId = setTimeout(() => setIsEntering(false), 800);
      return () => clearTimeout(timeoutId);
    }
  }, [isEntering]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % itemCount);
    }, autoPlayInterval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlayInterval, itemCount]);

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden">
      <div className="w-[70%] md:w-[40%] aspect-square md:aspect-video opacity-0" />
      {[-2, -1, 0, 1, 2].map((offset) => {
        const itemIndex = (activeIndex + offset + itemCount) % itemCount;
        const carouselItem = items[itemIndex];
        const isCenter = offset === 0;
        const distance = Math.abs(offset);
        const scale = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.8;
        const opacity = +(distance <= 1);
        const xPercent = offset * 100;
        const yPercent = distance === 0 ? 0 : distance === 1 ? 5 : 10;
        const rotation = offset * 2;
        const initialState =
          distance <= 1 && isEntering
            ? isCenter
              ? {
                  opacity: 0,
                  y: "25px",
                  scale: 1,
                  x: "0%",
                  rotate: 0,
                }
              : {
                  opacity: 0,
                  scale: 0.88,
                  x: `calc(${xPercent}% + ${offset > 0 ? 20 : -20}px)`,
                  y: "5%",
                  rotate: rotation,
                }
            : {
                scale,
                opacity,
                x: `${xPercent}%`,
                y: `${yPercent}%`,
                rotate: rotation,
              };

        return (
          <motion.div
            key={itemIndex}
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-hidden"
            style={{
              zIndex: isCenter ? 10 : 5 - distance,
            }}
            initial={initialState}
            animate={{
              scale,
              opacity,
              x: `${xPercent}%`,
              y: `${yPercent}%`,
              rotate: rotation,
            }}
            transition={{
              duration: 0.8,
              ease: [0.65, 0, 0.35, 1],
              delay: distance <= 1 && isEntering ? (isCenter ? 0.45 : 0.6) : 0,
            }}
          >
            <ImageOrVideo
              imageSrc={carouselItem.imageSrc}
              videoSrc={carouselItem.videoSrc}
              className="w-full h-full rounded-lg object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none"
              initial={{
                opacity: +!isCenter,
              }}
              animate={{
                opacity: +!isCenter,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

interface HeroBillboardTiltedCarouselProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  items: CarouselItem[];
  textAnimation: TextAnimationVariant;
}

/** Centered hero with a headline and two buttons above an auto-playing tilted card carousel. */
export default function HeroBillboardTiltedCarousel({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: HeroBillboardTiltedCarouselProps) {
  return (
    <section
      aria-label="Hero section"
      className="relative flex flex-col items-center justify-center gap-8 md:gap-10 w-full min-h-svh pt-25 pb-20 md:pt-30"
    >
      <HeroBackgroundSlot />
      <div className="flex flex-col items-center gap-3 w-content-width mx-auto text-center">
        <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
          <p>{tag}</p>
        </div>
        <TextAnimation
          text={title}
          variant={textAnimation}
          gradientText
          tag="h1"
          className="md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance"
        />
        <TextAnimation
          text={description}
          variant={textAnimation}
          gradientText={false}
          tag="p"
          className="md:max-w-7/10 text-lg md:text-xl leading-snug text-balance"
        />
        <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
          <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
          <Button
            text={secondaryButton.text}
            href={secondaryButton.href}
            variant="secondary"
            animationDelay={0.1}
          />
        </div>
      </div>
      <TiltedCarousel items={items} />
    </section>
  );
}
