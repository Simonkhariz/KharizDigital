"use client";

import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface AboutFeatureItem {
  icon: IconInput;
  title: string;
  description: string;
}

interface AboutFeaturesSplitProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: AboutFeatureItem[];
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

/** About section with a centered heading, a card listing features and a media panel beside it. */
export default function AboutFeaturesSplit({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  imageSrc,
  videoSrc,
  textAnimation,
}: AboutFeaturesSplitProps) {
  return (
    <section aria-label="About section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10 mx-auto w-content-width">
        <div className="flex flex-col items-center gap-2">
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
        <div className="flex flex-col md:flex-row md:items-stretch gap-5">
          <div className="flex flex-col justify-center gap-4 xl:gap-5 2xl:gap-6 p-6 xl:p-7 2xl:p-8 w-full md:w-4/10 2xl:w-35/100 card rounded">
            {items.map((item, index) => (
              <div key={item.title}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center shrink-0 mb-1 size-10 primary-button rounded">
                    <DynamicIcon
                      icon={item.icon}
                      className="h-2/5 w-2/5 text-primary-cta-text"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-base leading-snug">{item.description}</p>
                </div>
                {index < items.length - 1 && (
                  <div className="mt-4 xl:mt-5 2xl:mt-6 border-b border-accent/40" />
                )}
              </div>
            ))}
          </div>
          <div className="p-px w-full md:w-6/10 2xl:w-7/10 h-80 md:h-auto card rounded overflow-hidden">
            <div className="relative size-full">
              <ImageOrVideo
                imageSrc={imageSrc}
                videoSrc={videoSrc}
                className="absolute inset-0 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
