"use client";

import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface TeamMember {
  name: string;
  role: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface TeamOverlayCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  members: TeamMember[];
  textAnimation: TextAnimationVariant;
}

/** Team section with portrait cards and an overlaid name and role bar, as a grid or carousel. */
export default function TeamOverlayCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  members,
  textAnimation,
}: TeamOverlayCardsProps) {
  return (
    <section aria-label="Team section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-2 w-content-width mx-auto">
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
            {members.map((member) => (
              <div key={member.name} className="relative aspect-4/5 card rounded">
                <div className="relative w-full h-full rounded overflow-hidden">
                  <ImageOrVideo imageSrc={member.imageSrc} videoSrc={member.videoSrc} />
                  <div className="absolute inset-x-4 bottom-4 xl:inset-x-5 xl:bottom-5 2xl:inset-x-6 2xl:bottom-6 flex max-md:flex-wrap md:max-xl:flex-col md:max-xl:items-start items-center justify-between gap-x-4 gap-y-2 xl:gap-5 2xl:gap-6 p-4 xl:p-5 2xl:p-6 card backdrop-blur-sm rounded">
                    <span className="text-xl font-semibold leading-snug xl:truncate">
                      {member.name}
                    </span>
                    <div className="max-w-full px-3 py-2 text-sm primary-button text-primary-cta-text rounded">
                      <p className="truncate">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
