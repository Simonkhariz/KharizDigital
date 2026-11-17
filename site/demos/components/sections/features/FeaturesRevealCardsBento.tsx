"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { cn } from "@/demos/lib/utils";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface RevealBentoItem {
  title: string;
  description: string;
  href?: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface FeaturesRevealCardsBentoProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: RevealBentoItem[];
  textAnimation: TextAnimationVariant;
}

/** Features section: centered heading above a bento grid of linked media cards that reveal text on hover. */
export default function FeaturesRevealCardsBento({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesRevealCardsBentoProps) {
  const columnSpanClasses = [
    "md:col-span-2",
    "md:col-span-4",
    "md:col-span-3",
    "md:col-span-3",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
  ];

  const revealDelays = [0, 0.1, 0, 0.1, 0, 0.1, 0.2];

  return (
    <section aria-label="Features reveal cards bento section" className="py-20">
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
        <div className="w-content-width mx-auto grid grid-cols-1 md:grid-cols-6 gap-3">
          {items.map((item, index) => (
            <ScrollReveal
              key={item.title}
              variant="slide-up"
              delay={revealDelays[index]}
              className={cn("col-span-1 group", columnSpanClasses[index])}
            >
              <a href={item.href} className="block relative overflow-hidden rounded">
                <div className="h-80 xl:h-100 2xl:h-120 overflow-hidden">
                  <ImageOrVideo
                    imageSrc={item.imageSrc}
                    videoSrc={item.videoSrc}
                    className="rounded group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  className="absolute -inset-x-px -bottom-px h-2/5 backdrop-blur-xl mask-fade-top-overlay"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-3 bottom-3 2xl:inset-x-4 2xl:bottom-4 z-10">
                  <div className="relative flex flex-col gap-1 md:gap-0 md:group-hover:gap-1 p-3 2xl:p-4 transition-all duration-400">
                    <div className="absolute inset-0 -z-10 card rounded translate-y-0 opacity-100 md:translate-y-full md:opacity-0 transition-all duration-400 ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100" />
                    <h3 className="text-2xl font-semibold leading-snug text-foreground md:text-white transition-colors duration-400 md:group-hover:text-foreground">
                      {item.title}
                    </h3>
                    <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] transition-all duration-400 ease-out md:group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-base leading-snug text-foreground opacity-100 md:opacity-0 transition-opacity duration-400 md:group-hover:opacity-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
