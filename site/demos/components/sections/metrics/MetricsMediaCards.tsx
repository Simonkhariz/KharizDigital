"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface MediaMetric {
  value: string;
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface MetricsMediaCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  metrics: MediaMetric[];
  textAnimation: TextAnimationVariant;
}

/** Metrics section where each figure card is paired with an image or video. */
export default function MetricsMediaCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  metrics,
  textAnimation,
}: MetricsMediaCardsProps) {
  return (
    <section aria-label="Metrics section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-content-width mx-auto">
          {metrics.map((metric, index) => {
            const isOddIndex = index % 2 == 1;
            const isLastMetric = index === metrics.length - 1;
            const hasOddCount = metrics.length % 2 != 0;
            const isFullWidth = isLastMetric && hasOddCount;
            return (
              <ScrollReveal
                key={metric.value}
                variant="slide-up"
                className={cn("grid grid-cols-2 gap-5", isFullWidth && "lg:col-span-2")}
              >
                <div
                  className={cn(
                    "flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 min-w-0 min-h-40 p-4 md:p-6 xl:p-7 2xl:p-8 card rounded",
                    isFullWidth ? "md:aspect-video" : "md:aspect-square",
                    isOddIndex && "order-2 md:order-1",
                  )}
                >
                  <span className="text-5xl md:text-6xl font-semibold leading-snug truncate">
                    {metric.value}
                  </span>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-xl md:text-2xl font-semibold leading-snug md:truncate">
                      {metric.title}
                    </span>
                    <div className="w-full h-px bg-accent" />
                    <p className="text-base leading-snug max-md:line-clamp-4 md:truncate">
                      {metric.description}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "relative min-h-40 rounded overflow-hidden",
                    isFullWidth ? "md:aspect-video" : "md:aspect-square",
                    isOddIndex && "order-1 md:order-2",
                  )}
                >
                  <ImageOrVideo
                    imageSrc={metric.imageSrc}
                    videoSrc={metric.videoSrc}
                    className="max-md:absolute max-md:inset-0"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
