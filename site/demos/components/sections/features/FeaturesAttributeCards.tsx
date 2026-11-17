"use client";

import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface AttributeDetail {
  icon: IconInput;
  label: string;
  value: string | number;
}

interface AttributeCardItem {
  title: string;
  tags: string;
  badge?: string | null;
  details: AttributeDetail[];
  imageSrc?: string;
  videoSrc?: string;
}

interface FeaturesAttributeCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: AttributeCardItem[];
  textAnimation: TextAnimationVariant;
}

/** Features section: centered heading above media cards listing a badge, tags and icon details. */
export default function FeaturesAttributeCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesAttributeCardsProps) {
  return (
    <section aria-label="Features attribute cards section" className="py-20">
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
          <div className="w-content-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {items.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col gap-2 xl:gap-3 2xl:gap-4 h-full rounded"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded">
                  <ImageOrVideo
                    imageSrc={item.imageSrc}
                    videoSrc={item.videoSrc}
                    className="rounded group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-2 left-2 xl:top-3 xl:left-3 2xl:top-4 2xl:left-4 px-3 py-1 text-sm text-foreground font-medium card rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold leading-snug">{item.title}</h3>
                  <p className="text-base leading-snug">{item.tags}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base mt-0.5">
                    {item.details.map((detail) => (
                      <span
                        key={detail.label}
                        className="flex items-center gap-1 whitespace-nowrap"
                      >
                        <DynamicIcon icon={detail.icon} className="size-[1em]" strokeWidth={1.5} />
                        {detail.label}
                        {": "}
                        {detail.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
