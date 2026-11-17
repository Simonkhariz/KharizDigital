"use client";

import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface TestimonialMarqueeCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial section with two rows of quote cards scrolling horizontally in opposite directions. */
export default function TestimonialMarqueeCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialMarqueeCardsProps) {
  const topRowSize = Math.ceil(testimonials.length / 2);
  const topRow = testimonials.slice(0, topRowSize);
  const bottomRow = testimonials.slice(topRowSize);

  return (
    <section aria-label="Testimonials section" className="pt-20 pb-10">
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
        <ScrollReveal variant="slide-up" className="flex flex-col w-content-width mx-auto">
          <div className="overflow-hidden mask-fade-x">
            <div
              className="flex w-max animate-marquee-horizontal mb-5"
              style={{ animationDuration: "30s" }}
            >
              {[...topRow, ...topRow, ...topRow, ...topRow].map((testimonial, index) => (
                <div
                  key={`top-${index}`}
                  className="flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 shrink-0 w-72 md:w-80 mr-5 p-6 xl:p-7 2xl:p-8 rounded card"
                >
                  <p className="text-lg leading-snug line-clamp-3">{testimonial.quote}</p>
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
            </div>
          </div>
          <div className="overflow-hidden mask-fade-x">
            <div
              className="flex w-max animate-marquee-horizontal-reverse mb-10"
              style={{ animationDuration: "30s" }}
            >
              {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map(
                (testimonial, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 shrink-0 w-72 md:w-80 mr-5 p-6 xl:p-7 2xl:p-8 rounded card"
                  >
                    <p className="text-lg leading-snug line-clamp-3">{testimonial.quote}</p>
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
                ),
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
