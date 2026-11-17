"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import Transition from "@/demos/components/ui/Transition";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface Testimonial {
  name: string;
  role: string;
  title: string;
  quote: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface TestimonialDetailedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial section showing one detailed quote at a time beside its media, with previous and next buttons. */
export default function TestimonialDetailedCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialDetailedCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10 w-content-width mx-auto">
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
        <ScrollReveal variant="slide-up" className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 p-6 md:p-10 rounded card">
            <Transition
              key={activeIndex}
              transitionType="fade"
              whileInView={false}
              className="flex flex-col gap-2"
            >
              <h3 className="text-3xl md:text-4xl font-semibold leading-[1.15] text-balance">
                {activeTestimonial.title}
              </h3>
              <p className="text-base md:text-lg leading-snug text-balance">
                “{activeTestimonial.quote}”
              </p>
            </Transition>
            <div className="h-px w-full md:hidden bg-foreground/50" />
            <div className="flex items-center justify-between gap-5">
              <Transition
                key={activeIndex}
                transitionType="fade"
                whileInView={false}
                className="flex flex-col min-w-0"
              >
                <span className="text-base text-foreground font-semibold leading-snug max-md:truncate xl:truncate">
                  {activeTestimonial.name}
                </span>
                <span className="text-base text-foreground/75 leading-snug max-md:truncate xl:truncate">
                  {activeTestimonial.role}
                </span>
              </Transition>
              <div className="flex gap-3">
                <button
                  onClick={showPrevious}
                  aria-label="Previous testimonial"
                  className="flex items-center justify-center size-9 cursor-pointer rounded primary-button"
                >
                  <ArrowLeft className="size-4 text-primary-cta-text" strokeWidth={1.5} />
                </button>
                <button
                  onClick={showNext}
                  aria-label="Next testimonial"
                  className="flex items-center justify-center size-9 cursor-pointer rounded primary-button"
                >
                  <ArrowRight className="size-4 text-primary-cta-text" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
          <Transition
            key={activeIndex}
            transitionType="fade"
            whileInView={false}
            className="relative min-h-80 h-full md:aspect-square rounded overflow-hidden"
          >
            <ImageOrVideo
              imageSrc={activeTestimonial.imageSrc}
              videoSrc={activeTestimonial.videoSrc}
            />
          </Transition>
        </ScrollReveal>
      </div>
    </section>
  );
}
