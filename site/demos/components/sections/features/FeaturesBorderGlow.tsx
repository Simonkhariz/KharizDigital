"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { animate } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Half-width of the glowing arc, in degrees. */
const GLOW_SPREAD = 40;
/** How far outside the card (in px) the pointer still lights up the border. */
const GLOW_PROXIMITY = 64;
/** Thickness of the glowing border, in px. */
const GLOW_BORDER_WIDTH = 1.5;

interface GlowingBorderProps {
  className?: string;
}

/** Renders a border highlight that rotates to follow the pointer around its parent card. */
function GlowingBorder({ className }: GlowingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const { clientX, clientY } = event;
        const isPointerNear =
          clientX > left - GLOW_PROXIMITY &&
          clientX < left + width + GLOW_PROXIMITY &&
          clientY > top - GLOW_PROXIMITY &&
          clientY < top + height + GLOW_PROXIMITY;
        if ((container.style.setProperty("--active", isPointerNear ? "1" : "0"), !isPointerNear)) {
          return;
        }
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const currentAngle = parseFloat(container.style.getPropertyValue("--start")) || 0;
        animate(
          currentAngle,
          currentAngle +
            ((((Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI +
              90 -
              currentAngle +
              180) %
              360) -
              180),
          {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (angle) => container.style.setProperty("--start", String(angle)),
          },
        );
      });
    };

    document.body.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--spread": GLOW_SPREAD,
          "--start": 0,
          "--active": 0,
          "--border-width": `${GLOW_BORDER_WIDTH}px`,
          "--gradient":
            "radial-gradient(circle, var(--color-accent) 10%, transparent 20%),\n    radial-gradient(circle at 40% 40%, var(--color-background-accent) 5%, transparent 15%),\n    repeating-conic-gradient(from 236.84deg at 50% 50%, var(--color-accent) 0%, var(--color-background-accent) 5%, var(--color-accent) 10%)",
        } as CSSProperties
      }
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
    >
      <div
        className={cn(
          "rounded-[inherit]",
          'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--border-width))]',
          "after:[border:var(--border-width)_solid_transparent]",
          "after:[background:var(--gradient)] after:bg-fixed",
          "after:opacity-(--active) after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box] after:mask-intersect",
          "after:mask-[linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
        )}
      />
    </div>
  );
}

interface BorderGlowFeature {
  icon: IconInput;
  title: string;
  description: string;
}

interface FeaturesBorderGlowProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  features: BorderGlowFeature[];
  textAnimation: TextAnimationVariant;
}

/** Renders a features section of icon cards whose borders glow towards the pointer. */
export default function FeaturesBorderGlow({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  features,
  textAnimation,
}: FeaturesBorderGlowProps) {
  return (
    <section
      aria-label="Features border glow section"
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
              className="relative flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 p-6 xl:p-7 2xl:p-8 mt-0.5 h-full min-h-60 md:min-h-70 2xl:min-h-80 card rounded"
            >
              <div className="flex items-center justify-center size-12 md:size-14 2xl:size-16 primary-button rounded-full">
                <DynamicIcon
                  icon={feature.icon}
                  className="size-4 text-primary-cta-text"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold leading-snug text-balance">
                  {feature.title}
                </h3>
                <p className="text-base leading-snug text-balance">{feature.description}</p>
              </div>
              <GlowingBorder />
            </div>
          ))}
        </GridOrCarousel>
      </ScrollReveal>
    </section>
  );
}
