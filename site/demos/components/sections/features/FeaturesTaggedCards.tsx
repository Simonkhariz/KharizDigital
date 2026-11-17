"use client";

import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface TaggedCardItem {
  title: string;
  description: string;
  tag: string;
  primaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
}

interface FeaturesTaggedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: TaggedCardItem[];
  textAnimation: TextAnimationVariant;
}

/** Features section: centered heading above cards with a tag over the media and a button. */
export default function FeaturesTaggedCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesTaggedCardsProps) {
  return (
    <section aria-label="Features section" className="py-20">
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
          <GridOrCarousel>
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded group"
              >
                <div className="relative aspect-square rounded overflow-hidden">
                  <ImageOrVideo
                    imageSrc={item.imageSrc}
                    videoSrc={item.videoSrc}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 xl:top-3.5 xl:right-3.5 2xl:top-4 2xl:right-4 px-3 py-1 text-sm card rounded w-fit">
                    <p>{item.tag}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-1 gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold leading-snug text-balance">
                      {item.title}
                    </h3>
                    <p className="text-base leading-snug text-balance">{item.description}</p>
                  </div>
                  <Button
                    text={item.primaryButton.text}
                    href={item.primaryButton.href}
                    variant="primary"
                    className="w-full mt-2 md:mt-3"
                  />
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
