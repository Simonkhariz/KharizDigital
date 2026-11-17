"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { cn } from "@/demos/lib/utils";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

/** How long each testimonial stays on screen, in milliseconds. */
const TESTIMONIAL_INTERVAL_MS = 5000;

interface HeroTestimonial {
  /** Number of filled stars, out of five. */
  rating: number;
  text: string;
  name: string;
  handle: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface HeroOverlayTestimonialProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  testimonials: HeroTestimonial[];
  textAnimation: TextAnimationVariant;
}

/** Full-screen media hero with the copy at the top left and a rotating testimonial card at the bottom right. */
export default function HeroOverlayTestimonial({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  testimonials,
  textAnimation,
}: HeroOverlayTestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }
    const intervalId = setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % testimonials.length);
    }, TESTIMONIAL_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [activeIndex, testimonials.length]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      aria-label="Hero section"
      className="relative w-full h-svh overflow-hidden flex flex-col justify-start mb-20"
    >
      <HeroBackgroundSlot />
      <ImageOrVideo
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />
      <div
        className="absolute z-10 w-[150vw] h-[150vw] left-0 top-0 -translate-x-1/2 -translate-y-1/2 backdrop-blur mask-[radial-gradient(circle,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="md:hidden absolute z-10 inset-0 bg-linear-to-b from-black/10 via-black/50 via-35% to-transparent to-80%"
        aria-hidden="true"
      />
      <div className="relative z-10 w-content-width mx-auto pt-35">
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
            <Button
              text={secondaryButton.text}
              href={secondaryButton.href}
              variant="secondary"
              animationDelay={0.1}
            />
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.3,
          }}
          className="absolute z-10 left-4 right-4 bottom-4 md:left-auto md:right-5 md:bottom-5 2xl:right-6 2xl:bottom-6 md:max-w-25/100 2xl:max-w-2/10 p-4 xl:p-5 2xl:p-6 card rounded flex flex-col gap-3 xl:gap-4 2xl:gap-5"
        >
          <div className="flex gap-1.5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-5 text-accent",
                  index < activeTestimonial.rating ? "fill-accent" : "fill-transparent",
                )}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <p className="text-lg leading-snug text-balance">{activeTestimonial.text}</p>
          <div className="flex items-center gap-3">
            <ImageOrVideo
              imageSrc={activeTestimonial.imageSrc}
              videoSrc={activeTestimonial.videoSrc}
              className="size-10 md:size-11 2xl:size-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-base text-foreground leading-snug font-medium">
                {activeTestimonial.name}
              </span>
              <span className="text-base text-foreground/75 leading-snug">
                {activeTestimonial.handle}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
