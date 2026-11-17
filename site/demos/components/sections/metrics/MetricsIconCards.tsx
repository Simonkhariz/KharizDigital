"use client";

import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface IconMetric {
  value: string;
  title: string;
  icon: IconInput;
}

interface MetricsIconCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  metrics: IconMetric[];
  textAnimation: TextAnimationVariant;
}

/** Metrics section where each card shows an icon, a label and a large figure. */
export default function MetricsIconCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  metrics,
  textAnimation,
}: MetricsIconCardsProps) {
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
        <ScrollReveal variant="slide-up">
          <GridOrCarousel>
            {metrics.map((metric) => (
              <div
                key={metric.value}
                className="flex flex-col items-center justify-center gap-3 xl:gap-3.5 2xl:gap-4 p-6 xl:p-7 2xl:p-8 min-h-56 md:min-h-70 xl:min-h-80 2xl:min-h-90 h-full card rounded"
              >
                <div className="flex items-center justify-center gap-2 min-w-0">
                  <div className="flex items-center justify-center shrink-0 size-8 primary-button rounded">
                    <DynamicIcon
                      icon={metric.icon}
                      className="h-2/5 w-2/5 text-primary-cta-text"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xl truncate min-w-0">{metric.title}</span>
                </div>
                <span className="text-9xl md:text-8xl font-semibold leading-none truncate">
                  {metric.value}
                </span>
              </div>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
