"use client";

import Button from "@/demos/components/ui/buttons/Button";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface AboutTextProps {
  title: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  textAnimation: TextAnimationVariant;
}

/** About section made of a single centered statement with optional buttons. */
export default function AboutText({
  title,
  primaryButton,
  secondaryButton,
  textAnimation,
}: AboutTextProps) {
  return (
    <section aria-label="About section" className="py-20">
      <div className="w-content-width mx-auto flex flex-col gap-2 items-center">
        <TextAnimation
          text={title}
          variant={textAnimation}
          gradientText={false}
          tag="h2"
          className="text-5xl md:text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance"
        />
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-wrap gap-3 justify-center mt-2 md:mt-3">
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
    </section>
  );
}
