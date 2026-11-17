"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface Avatar {
  name: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface TestimonialAvatarCardProps {
  tag: string;
  title: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  avatars: Avatar[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial call-to-action card with a heading, buttons and a stack of customer avatars. */
export default function TestimonialAvatarCard({
  tag,
  title,
  primaryButton,
  secondaryButton,
  avatars,
  textAnimation,
}: TestimonialAvatarCardProps) {
  const visibleAvatars = avatars.slice(0, 5);
  const hiddenAvatarCount = avatars.length - visibleAvatars.length;

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="w-content-width mx-auto">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col items-center gap-8 md:gap-10 py-20 px-8 rounded card">
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p>{tag}</p>
              </div>
              <TextAnimation
                text={title}
                variant={textAnimation}
                gradientText
                tag="h3"
                className="md:max-w-8/10 text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-center text-balance"
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
              <div className="flex items-center justify-center mt-3 md:mt-4">
                {visibleAvatars.map((avatar, index) => (
                  <div
                    key={avatar.name}
                    className={cn(
                      "relative size-12 md:size-16 overflow-hidden rounded-full border-2 border-background",
                      index > 0 && "-ml-5",
                    )}
                    style={{ zIndex: visibleAvatars.length - index }}
                  >
                    <ImageOrVideo imageSrc={avatar.imageSrc} videoSrc={avatar.videoSrc} />
                  </div>
                ))}
                {hiddenAvatarCount > 0 && (
                  <div
                    className="flex items-center justify-center size-12 md:size-16 -ml-5 rounded-full border-2 border-background card"
                    style={{ zIndex: 0 }}
                  >
                    <span className="text-sm md:text-base font-semibold">+{hiddenAvatarCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
