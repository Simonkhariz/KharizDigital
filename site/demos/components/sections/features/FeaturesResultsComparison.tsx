"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { cn } from "@/demos/lib/utils";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface SideLabelProps {
  text: string;
  side: "left" | "right";
}

/** Small label pinned to the bottom corner of a before or after image. */
const SideLabel = ({ text, side }: SideLabelProps) => (
  <div
    className={cn(
      "absolute bottom-3 xl:bottom-3.5 2xl:bottom-4 px-3 py-1 w-fit text-sm card rounded",
      side === "left" ? "left-3 xl:left-3.5 2xl:left-4" : "right-3 xl:right-3.5 2xl:right-4",
    )}
  >
    <p className="font-medium text-foreground">{text}</p>
  </div>
);

interface ResultItem {
  beforeSrc: string;
  afterSrc: string;
  treatment: string;
  detail: string;
}

interface FeaturesResultsComparisonProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: ResultItem[];
  textAnimation: TextAnimationVariant;
}

/** Results section: centered heading above a marquee of before and after image cards. */
export default function FeaturesResultsComparison({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesResultsComparisonProps) {
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section aria-label="Results section" className="pt-20 pb-10">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center w-content-width mx-auto gap-2">
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
          <div className="w-content-width mx-auto overflow-hidden mask-fade-x-medium">
            <div
              className="flex w-max animate-marquee-horizontal"
              style={{
                animationDuration: "60s",
              }}
            >
              {marqueeItems.map((item, index) => (
                <div
                  key={index}
                  className="shrink-0 w-80 md:w-120 2xl:w-140 mb-10 mr-3 md:mr-5 flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded"
                >
                  <div className="relative flex w-full aspect-3/2">
                    <div className="relative overflow-hidden w-1/2 rounded-l-lg rounded-r-none">
                      <ImageOrVideo
                        imageSrc={item.beforeSrc}
                        className="absolute inset-0 object-cover w-full h-full rounded-l rounded-r-none"
                      />
                      <SideLabel text="Before" side="left" />
                    </div>
                    <div className="absolute z-10 left-1/2 top-0 bottom-0 w-0.5 bg-background -translate-x-1/2" />
                    <div className="relative overflow-hidden w-1/2 rounded-r-lg rounded-l-none">
                      <ImageOrVideo
                        imageSrc={item.afterSrc}
                        className="absolute inset-0 object-cover w-full h-full rounded-r rounded-l-none"
                      />
                      <SideLabel text="After" side="right" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                    <h4 className="truncate text-2xl font-semibold leading-snug">
                      {item.treatment}
                    </h4>
                    <p className="text-base leading-snug">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
