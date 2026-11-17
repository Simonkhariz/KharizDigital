"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { cn } from "@/demos/lib/utils";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

/** Where each of the three KPI cards sits around the media frame. */
const KPI_POSITIONS = ["top-[5%] left-0", "top-[40%] right-0", "bottom-[5%] left-[5%]"];

interface HeroKpi {
  value: string;
  label: string;
}

interface HeroSplitKpiProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  kpis: HeroKpi[];
  textAnimation: TextAnimationVariant;
}

/** Split hero: copy on the left, a framed image or video on the right with KPI cards that follow the pointer. */
export default function HeroSplitKpi({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  kpis,
  textAnimation,
}: HeroSplitKpiProps) {
  const kpiCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      return;
    }
    let pointerX = 0;
    let pointerY = 0;
    const cardOffsets = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
    ];
    const parallaxStrengths = [-0.25, -0.5, 0.25];
    let frameId: number;
    const handleMouseMove = (event: MouseEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 100 - 50;
      pointerY = (event.clientY / window.innerHeight) * 100 - 50;
    };
    const updateCardPositions = () => {
      cardOffsets.forEach((offset, index) => {
        offset.x += (pointerX * parallaxStrengths[index] - offset.x) * 0.025;
        offset.y += (pointerY * parallaxStrengths[index] - offset.y) * 0.025;
        const card = kpiCardRefs.current[index];
        if (card) {
          card.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
        }
      });
      frameId = requestAnimationFrame(updateCardPositions);
    };
    updateCardPositions();
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      aria-label="Hero section"
      className="relative flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0"
    >
      <HeroBackgroundSlot />
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-content-width mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>{tag}</p>
            </div>
            <TextAnimation
              text={title}
              variant={textAnimation}
              gradientText
              tag="h1"
              className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center md:text-left text-balance"
            />
            <TextAnimation
              text={description}
              variant={textAnimation}
              gradientText={false}
              tag="p"
              className="md:max-w-8/10 text-lg md:text-xl leading-snug text-center md:text-left text-balance"
            />
            <div className="flex flex-wrap max-md:justify-center gap-3 mt-2 md:mt-3">
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
        <div className="relative w-full md:w-1/2 h-100 md:h-[65vh] md:max-h-[75svh]">
          <ScrollReveal
            variant="slide-up"
            delay={0.2}
            className="w-full h-full p-2 xl:p-3 2xl:p-4 card rounded overflow-hidden scale-85"
          >
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </ScrollReveal>
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              ref={(element) => {
                kpiCardRefs.current[index] = element;
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.4 + index * 0.1,
              }}
              className={cn(
                "absolute flex flex-col items-center p-3 xl:p-4 2xl:p-5 card backdrop-blur-sm rounded",
                KPI_POSITIONS[index],
              )}
            >
              <p className="text-2xl md:text-4xl text-foreground font-medium">{kpi.value}</p>
              <p className="text-sm md:text-base text-foreground/75">{kpi.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
