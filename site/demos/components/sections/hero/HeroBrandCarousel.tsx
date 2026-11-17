"use client";

import { useEffect, useState } from "react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AutoFillText from "@/demos/components/ui/AutoFillText";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { cn } from "@/demos/lib/utils";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

/** How long each slide stays on screen, in milliseconds. */
const SLIDE_DURATION_MS = 4000;

interface BrandCarouselSlide {
  imageSrc?: string;
  videoSrc?: string;
}

interface HeroBrandCarouselProps {
  brand: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  items: BrandCarouselSlide[];
  textAnimation: TextAnimationVariant;
}

/** Full-screen hero that cycles background slides behind a full-width brand name and progress bars. */
export default function HeroBrandCarousel({
  brand,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: HeroBrandCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % items.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(intervalId);
  }, [activeIndex, items.length]);

  return (
    <section
      aria-label="Hero section"
      className="relative w-full h-svh overflow-hidden flex flex-col justify-end mb-20"
    >
      <HeroBackgroundSlot />
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            activeIndex === index ? "opacity-100 z-1" : "opacity-0 pointer-events-none",
          )}
          aria-hidden={activeIndex !== index}
        >
          <ImageOrVideo
            imageSrc={item.imageSrc}
            videoSrc={item.videoSrc}
            className="absolute inset-0 w-full h-full object-cover rounded-none"
          />
        </div>
      ))}
      <div
        className="absolute z-10 w-full h-[50svh] md:h-[75svh] left-0 bottom-0 backdrop-blur-xl mask-[linear-gradient(to_bottom,transparent,black_60%)]"
        aria-hidden="true"
      />
      <div
        className="md:hidden absolute z-10 inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 w-content-width mx-auto pb-5">
        <div className="flex flex-col">
          <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-5">
            <TextAnimation
              text={description}
              variant={textAnimation}
              gradientText={false}
              tag="p"
              className="w-full md:w-1/2 text-lg md:text-2xl text-balance font-normal text-white leading-snug"
            />
            <div className="w-full md:w-1/2 flex justify-start md:justify-end">
              <div className="flex flex-wrap gap-3">
                <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
                <Button
                  text={secondaryButton.text}
                  href={secondaryButton.href}
                  variant="secondary"
                  animationDelay={0.1}
                />
              </div>
            </div>
          </div>
          <AutoFillText className="font-semibold text-white">{brand}</AutoFillText>
          <div className="flex gap-3 pb-5">
            {items.map((item, index) => (
              <button
                key={index}
                className="relative h-1 w-full rounded overflow-hidden bg-primary-cta-text/20 cursor-pointer"
                onClick={() => setActiveIndex(index)}
                aria-label="Slide"
                aria-current={activeIndex === index}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-primary-cta-text rounded origin-left",
                    activeIndex === index
                      ? "animate-progress"
                      : index < activeIndex
                        ? "scale-x-100"
                        : "scale-x-0",
                  )}
                  style={{
                    animationDuration: `${SLIDE_DURATION_MS}ms`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
