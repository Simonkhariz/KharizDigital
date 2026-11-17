"use client";

import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AutoFillText from "@/demos/components/ui/AutoFillText";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface HeroBillboardBrandProps {
  brand: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

/** Hero with a full-width brand name, right-aligned intro text and a framed image or video. */
export default function HeroBillboardBrand({
  brand,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  textAnimation,
}: HeroBillboardBrandProps) {
  return (
    <section aria-label="Hero section" className="relative pt-25 pb-20 md:pt-30">
      <HeroBackgroundSlot />
      <div className="flex flex-col gap-10 md:gap-12 w-content-width mx-auto">
        <div className="flex flex-col items-start md:items-end gap-5">
          <AutoFillText className="w-full font-semibold" paddingY="">
            {brand}
          </AutoFillText>
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="w-full md:w-1/2 text-lg md:text-2xl leading-snug text-balance md:text-right"
          />
          <div className="flex flex-wrap md:justify-end gap-3 mt-1 md:mt-2">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
            <Button
              text={secondaryButton.text}
              href={secondaryButton.href}
              variant="secondary"
              animationDelay={0.1}
            />
          </div>
        </div>
        <ScrollReveal
          variant="slide-up"
          delay={0.2}
          className="w-full p-2 xl:p-3 2xl:p-4 card rounded overflow-hidden"
        >
          <ImageOrVideo
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            className="aspect-4/5 md:aspect-video"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
