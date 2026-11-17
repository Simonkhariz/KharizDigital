"use client";

import Button from "@/demos/components/ui/buttons/Button";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface AboutTextSplitProps {
  title: string;
  descriptions: string[];
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  textAnimation: TextAnimationVariant;
}

/** About section with the heading on the left and a stack of paragraphs on the right. */
export default function AboutTextSplit({
  title,
  descriptions,
  primaryButton,
  secondaryButton,
  textAnimation,
}: AboutTextSplitProps) {
  return (
    <section aria-label="About section" className="py-20">
      <div className="flex flex-col gap-20 mx-auto w-content-width">
        <div className="flex flex-col md:flex-row gap-3 md:gap-15">
          <div className="w-full md:w-1/2">
            <TextAnimation
              text={title}
              variant={textAnimation}
              gradientText
              tag="h2"
              className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-balance"
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            {descriptions.map((description, index) => (
              <TextAnimation
                key={index}
                text={description}
                variant={textAnimation}
                gradientText={false}
                tag="p"
                className="text-xl md:text-2xl leading-snug text-balance"
              />
            ))}
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-wrap gap-3 mt-2 md:mt-3">
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
        </div>
        <div className="w-full border-b border-foreground/5" />
      </div>
    </section>
  );
}
