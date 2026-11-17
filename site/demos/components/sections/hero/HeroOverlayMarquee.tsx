"use client";

import type { LucideIcon } from "lucide-react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import AvatarGroup from "@/demos/components/ui/AvatarGroup";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface MarqueeItem {
  icon: LucideIcon;
  text: string;
}

interface HeroOverlayMarqueeProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  avatarsSrc?: string[];
  avatarsLabel?: string;
  items: MarqueeItem[];
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

/** Full-screen media hero with the copy at the top left and a marquee of icon badges at the bottom. */
export default function HeroOverlayMarquee({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  avatarsSrc,
  avatarsLabel,
  items,
  imageSrc,
  videoSrc,
  textAnimation,
}: HeroOverlayMarqueeProps) {
  return (
    <section
      aria-label="Hero section"
      className="relative overflow-hidden flex flex-col justify-between mb-20 w-full h-svh"
    >
      <HeroBackgroundSlot />
      <ImageOrVideo
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        className="absolute inset-0 object-cover w-full h-full rounded-none"
      />
      <div
        className="absolute z-10 left-0 top-0 w-[150vw] h-[150vw] -translate-x-1/2 -translate-y-1/2 backdrop-blur mask-[radial-gradient(circle,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="md:hidden absolute z-10 inset-0 bg-linear-to-b from-black/10 via-black/50 via-35% to-transparent to-80%"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto pt-35 w-content-width">
        <div className="flex flex-col gap-3 w-full md:w-6/10 lg:w-1/2 xl:w-45/100 2xl:w-4/10">
          <div className="mb-1 px-3 py-1 w-fit text-sm card rounded">
            <p>{tag}</p>
          </div>
          <TextAnimation
            text={title}
            variant={textAnimation}
            gradientText
            tag="h1"
            className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-balance text-white"
          />
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="text-lg md:text-xl leading-snug text-balance text-white"
          />
          <div className="flex flex-wrap gap-3 mt-2 md:mt-3">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
            <Button
              text={secondaryButton.text}
              href={secondaryButton.href}
              variant="secondary"
              animationDelay={0.1}
            />
          </div>
          {avatarsSrc && avatarsSrc.length > 0 && (
            <div className="mt-3 md:mt-4">
              <AvatarGroup
                avatarsSrc={avatarsSrc}
                size="lg"
                label={avatarsLabel}
                labelClassName="text-primary-cta-text"
              />
            </div>
          )}
        </div>
      </div>
      <div className="relative z-10 overflow-hidden mx-auto pb-8 w-content-width mask-fade-x">
        <div
          className="flex w-max animate-marquee-horizontal"
          style={{
            animationDuration: "30s",
          }}
        >
          {[...items, ...items, ...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center shrink-0 gap-1 mx-3 pl-2 pr-4 py-2 card rounded"
            >
              <item.icon className="h-(--text-base) text-foreground" />
              <span className="whitespace-nowrap text-base font-medium text-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
