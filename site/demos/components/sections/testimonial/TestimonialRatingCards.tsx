"use client";

import { Star } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  imageSrc?: string;
  videoSrc?: string;
}

interface TestimonialRatingCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial section with quote cards topped by a star rating. */
export default function TestimonialRatingCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialRatingCardsProps) {
  return (
    <section aria-label="Testimonials section" className="py-20">
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
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 h-full p-6 xl:p-7 2xl:p-8 rounded card"
              >
                <div className="flex flex-col items-start gap-4 xl:gap-5 2xl:gap-6">
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={cn(
                          "size-5 text-accent",
                          starIndex < testimonial.rating ? "fill-accent" : "fill-transparent",
                        )}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-snug">{testimonial.quote}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ImageOrVideo
                    imageSrc={testimonial.imageSrc}
                    videoSrc={testimonial.videoSrc}
                    className="size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-base text-foreground font-semibold leading-snug max-md:truncate xl:truncate">
                      {testimonial.name}
                    </span>
                    <span className="text-base text-foreground/75 leading-snug max-md:truncate xl:truncate">
                      {testimonial.role}
                    </span>
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
