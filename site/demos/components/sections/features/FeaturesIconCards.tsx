"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

const PATTERN_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Builds a fresh block of random characters for the spotlight pattern. */
const createRandomPattern = () =>
  Array.from(
    {
      length: 1500,
    },
    () => PATTERN_CHARACTERS[Math.floor(Math.random() * 62)],
  ).join("");

interface CharacterPatternSpotlightProps {
  children: ReactNode;
  className?: string;
}

/** Renders its children over a random character pattern revealed by a spotlight under the cursor. */
function CharacterPatternSpotlight({ children, className = "" }: CharacterPatternSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const [pattern, setPattern] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // The pattern is random, so it is generated after mount rather than as the initial state.
  useEffect(() => {
    setPattern(createRandomPattern());
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && containerRef.current) {
      spotlightX.set(containerRef.current.offsetWidth / 2);
      spotlightY.set(containerRef.current.offsetHeight / 2);
    }
  }, [isMobile, spotlightX, spotlightY]);

  const spotlightMask = useMotionTemplate`radial-gradient(${isMobile ? 110 : 250}px at ${spotlightX}px ${spotlightY}px, white, transparent)`;
  const layerClassName = "absolute inset-0 rounded-[inherit] transition-opacity duration-300";

  return (
    <div
      ref={containerRef}
      className={cn("group/pattern relative", className)}
      onMouseMove={
        isMobile
          ? undefined
          : (event: MouseEvent<HTMLDivElement>) => {
              if (!containerRef.current) {
                return;
              }
              const rect = containerRef.current.getBoundingClientRect();
              spotlightX.set(event.clientX - rect.left);
              spotlightY.set(event.clientY - rect.top);
              setPattern(createRandomPattern());
            }
      }
    >
      {children}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div
          className={cn(
            layerClassName,
            isMobile ? "opacity-25" : "opacity-0 group-hover/pattern:opacity-25",
          )}
          style={{
            background: "linear-gradient(var(--foreground), transparent)",
          }}
        />
        <motion.div
          className={cn(
            layerClassName,
            "bg-linear-to-r from-accent to-accent/50 backdrop-blur-xl",
            isMobile ? "opacity-100" : "opacity-0 group-hover/pattern:opacity-100",
          )}
          style={{
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
        />
        <motion.div
          className={cn(
            layerClassName,
            "mix-blend-overlay",
            isMobile ? "opacity-100" : "opacity-0 group-hover/pattern:opacity-100",
          )}
          style={{
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
        >
          <p className="absolute inset-0 h-full whitespace-pre-wrap wrap-break-word font-mono text-xs font-bold text-foreground">
            {pattern}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

interface IconCardFeature {
  icon: IconInput;
  title: string;
  description: string;
}

interface FeaturesIconCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  features: IconCardFeature[];
  textAnimation: TextAnimationVariant;
}

/** Renders a features section of cards, each with an icon on a cursor-reactive character pattern. */
export default function FeaturesIconCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  features,
  textAnimation,
}: FeaturesIconCardsProps) {
  return (
    <section
      aria-label="Features icon cards section"
      className="flex flex-col gap-8 md:gap-10 py-20"
    >
      <div className="flex flex-col items-center gap-2 w-content-width mx-auto">
        <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
          <p>{tag}</p>
        </div>
        <TextAnimation
          text={title}
          variant={textAnimation}
          gradientText
          tag="h2"
          className="md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance"
        />
        <TextAnimation
          text={description}
          variant={textAnimation}
          gradientText={false}
          tag="p"
          className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance"
        />
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
            {primaryButton && (
              <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
            )}
            {secondaryButton && (
              <Button
                text={secondaryButton.text}
                href={secondaryButton.href}
                variant="secondary"
                animationDelay={0.1}
              />
            )}
          </div>
        )}
      </div>
      <ScrollReveal variant="slide-up">
        <GridOrCarousel>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded"
            >
              <CharacterPatternSpotlight className="flex items-center justify-center aspect-square rounded bg-foreground/5 shadow shadow-foreground/5">
                <div className="relative z-10 flex items-center justify-center size-12 md:size-14 2xl:size-16 primary-button rounded shadow">
                  <DynamicIcon
                    icon={feature.icon}
                    className="size-4 text-primary-cta-text"
                    strokeWidth={1.5}
                  />
                </div>
              </CharacterPatternSpotlight>
              <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                <h3 className="text-2xl font-semibold leading-snug">{feature.title}</h3>
                <p className="text-base leading-snug">{feature.description}</p>
              </div>
            </div>
          ))}
        </GridOrCarousel>
      </ScrollReveal>
    </section>
  );
}
