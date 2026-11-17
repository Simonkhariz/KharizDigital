"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AutoFillText from "@/demos/components/ui/AutoFillText";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface FloatingCardLayout {
  position: "left" | "right";
  bottom: string;
  aspect: string;
  /** How far the card travels vertically while the hero scrolls out of view. */
  movement: string;
}

/** Placement and parallax distance of the two floating cards, in order. */
const FLOATING_CARD_LAYOUTS: FloatingCardLayout[] = [
  {
    position: "left",
    bottom: "30%",
    aspect: "aspect-3/4",
    movement: "-100%",
  },
  {
    position: "right",
    bottom: "14%",
    aspect: "aspect-square",
    movement: "-75%",
  },
];

interface FloatingCard {
  name: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface HeroSectionProps {
  brand: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  /** Up to two cards that float beside the content and drift upwards on scroll. */
  floatingCards: FloatingCard[];
  textAnimation: TextAnimationVariant;
}

/** Hero with a full-width brand name, intro copy, two buttons, a large media card and floating product cards. */
export default function HeroSection({
  brand,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  floatingCards,
  textAnimation,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const floatingCardOffsets = [
    useTransform(scrollYProgress, [0, 1], ["0%", FLOATING_CARD_LAYOUTS[0].movement]),
    useTransform(scrollYProgress, [0, 1], ["0%", FLOATING_CARD_LAYOUTS[1].movement]),
  ];

  return (
    <section ref={sectionRef} aria-label="Hero section" className="relative pt-25 pb-20 md:pt-30">
      <HeroBackgroundSlot />
      {floatingCards.map((floatingCard, index) => (
        <motion.div
          key={index}
          style={{
            y: floatingCardOffsets[index],
            bottom: FLOATING_CARD_LAYOUTS[index].bottom,
          }}
          className={cn(
            "absolute z-10 w-28 xl:w-48 2xl:w-52 p-1 xl:p-2 2xl:p-3 card rounded overflow-hidden shadow-xl",
            FLOATING_CARD_LAYOUTS[index].position === "left"
              ? "left-[calc((100vw-var(--width-content-width))/2)] translate-x-1/4 lg:-translate-x-1/2"
              : "right-[calc((100vw-var(--width-content-width))/2)] -translate-x-1/4 lg:translate-x-1/2",
          )}
        >
          <div className="relative">
            <ImageOrVideo
              imageSrc={floatingCard.imageSrc}
              videoSrc={floatingCard.videoSrc}
              className={cn("w-full object-cover rounded", FLOATING_CARD_LAYOUTS[index].aspect)}
            />
            <div className="absolute bottom-1 xl:bottom-2 2xl:bottom-3 inset-x-1 xl:inset-x-2 2xl:inset-x-3 card rounded p-1 xl:p-2 2xl:p-3">
              <h3 className="text-2xl md:text-3xl text-center truncate">{floatingCard.name}</h3>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="flex flex-col gap-10 md:gap-12 w-content-width mx-auto">
        <div className="flex flex-col items-start md:items-end gap-5">
          <AutoFillText className="w-full font-semibold" paddingY="">
            {brand}
          </AutoFillText>
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="w-full md:w-1/2 text-lg md:text-2xl leading-snug text-balance md:text-right"
          />
          <div className="flex flex-wrap md:justify-end gap-3 mt-1 md:mt-2">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
            <Button
              text={secondaryButton.text}
              href={secondaryButton.href}
              variant="secondary"
              animationDelay={0.1}
            />
          </div>
        </div>
        <ScrollReveal
          variant="slide-up"
          delay={0.2}
          className="w-full p-2 xl:p-3 2xl:p-4 card rounded overflow-hidden"
        >
          <ImageOrVideo
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            className="aspect-4/5 md:aspect-video"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
