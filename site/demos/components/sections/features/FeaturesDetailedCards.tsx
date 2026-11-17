"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface DetailedCardItem {
  title: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  videoSrc?: string;
}

interface FeaturesDetailedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: DetailedCardItem[];
  textAnimation: TextAnimationVariant;
}

/** Features section: centered heading above stacked wide cards with title, tags, text and media. */
export default function FeaturesDetailedCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesDetailedCardsProps) {
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
        <div className="flex flex-col w-content-width mx-auto gap-5">
          {items.map((item) => (
            <ScrollReveal
              key={item.title}
              variant="slide-up"
              className="flex flex-col md:grid md:grid-cols-2 mx-auto gap-6 md:gap-20 p-6 md:p-10 card rounded group"
            >
              <div className="flex flex-col justify-between gap-2">
                <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">
                  {item.title}
                </h3>
                <div className="flex flex-col-reverse md:flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    {item.tags.map((itemTag) => (
                      <div key={itemTag} className="px-3 py-1 text-sm card rounded w-fit">
                        <p>{itemTag}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl leading-snug text-balance">{item.description}</p>
                </div>
              </div>
              <div className="aspect-square md:aspect-5/4 rounded overflow-hidden">
                <ImageOrVideo
                  imageSrc={item.imageSrc}
                  videoSrc={item.videoSrc}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
