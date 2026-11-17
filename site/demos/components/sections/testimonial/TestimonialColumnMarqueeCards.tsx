"use client";

import { Quote } from "lucide-react";
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

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** A single quote card with the author's avatar, name and role. */
function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col justify-between gap-4 xl:gap-5 2xl:gap-6 h-full p-6 xl:p-7 2xl:p-8 rounded card">
      <div className="flex flex-col items-start gap-4 xl:gap-5 2xl:gap-6">
        <Quote className="size-5 text-accent fill-accent" strokeWidth={1.5} />
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
  );
}

interface TestimonialColumnMarqueeCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial section with three columns of quote cards scrolling vertically in alternating directions. */
export default function TestimonialColumnMarqueeCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialColumnMarqueeCardsProps) {
  const columnSize = Math.ceil(testimonials.length / 3);
  const leftColumn = testimonials.slice(0, columnSize);
  const middleColumn = testimonials.slice(columnSize, columnSize * 2);
  const rightColumn = testimonials.slice(columnSize * 2);

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
        <ScrollReveal variant="slide-up" className="w-content-width mx-auto">
          <div className="flex gap-5 h-[450px] md:h-[550px] overflow-hidden mask-fade-y-medium">
            <div className="flex-1 overflow-hidden">
              <div
                className="flex flex-col gap-5 animate-marquee-vertical-reverse"
                style={{ animationDuration: "50s" }}
              >
                {[...leftColumn, ...leftColumn, ...leftColumn, ...leftColumn].map(
                  (testimonial, index) => (
                    <TestimonialCard key={`left-${index}`} testimonial={testimonial} />
                  ),
                )}
              </div>
            </div>
            <div className="hidden md:block flex-1 overflow-hidden">
              <div
                className="flex flex-col gap-5 animate-marquee-vertical"
                style={{ animationDuration: "45s" }}
              >
                {[...middleColumn, ...middleColumn, ...middleColumn, ...middleColumn].map(
                  (testimonial, index) => (
                    <TestimonialCard key={`mid-${index}`} testimonial={testimonial} />
                  ),
                )}
              </div>
            </div>
            <div className="hidden md:block flex-1 overflow-hidden">
              <div
                className="flex flex-col gap-5 animate-marquee-vertical-reverse"
                style={{ animationDuration: "55s" }}
              >
                {[...rightColumn, ...rightColumn, ...rightColumn, ...rightColumn].map(
                  (testimonial, index) => (
                    <TestimonialCard key={`right-${index}`} testimonial={testimonial} />
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
