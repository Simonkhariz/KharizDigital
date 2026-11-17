"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface Testimonial {
  name: string;
  date: string;
  tag: string;
  title: string;
  quote: string;
  avatarImageSrc?: string;
  avatarVideoSrc?: string;
  imageSrc?: string;
  videoSrc?: string;
}

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

interface TestimonialSplitCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** Testimonial carousel of wide cards split between the quote and its media, with dot navigation. */
export default function TestimonialSplitCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialSplitCardsProps) {
  const [containerRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToSlide = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const handleSelect = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      handleSelect(emblaApi);
      emblaApi.on("select", handleSelect).on("reInit", handleSelect);

      return () => {
        emblaApi.off("select", handleSelect).off("reInit", handleSelect);
      };
    }
  }, [emblaApi, handleSelect]);

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
        <ScrollReveal variant="slide-up" className="flex flex-col">
          <div ref={containerRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-none w-content-width md:w-[calc(var(--width-content-width)*0.8)] mr-5 mb-10"
                >
                  <div className="flex flex-col justify-between md:grid md:grid-cols-2 h-full gap-6 p-6 md:p-10 card rounded overflow-hidden">
                    <div className="flex flex-col justify-between gap-4 md:gap-10">
                      <div className="flex flex-col gap-2">
                        <div className="px-3 py-1 mb-1 w-fit text-sm card rounded">
                          <p>{testimonial.tag}</p>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-balance">
                          {testimonial.title}
                        </h3>
                        <p className="text-base md:text-lg leading-snug text-balance">
                          {testimonial.quote}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <ImageOrVideo
                          imageSrc={testimonial.avatarImageSrc}
                          videoSrc={testimonial.avatarVideoSrc}
                          className="size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="text-base text-foreground font-semibold leading-snug max-md:truncate xl:truncate">
                            {testimonial.name}
                          </span>
                          <span className="text-base text-foreground/75 leading-snug max-md:truncate xl:truncate">
                            {testimonial.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative min-h-80 h-full md:aspect-square">
                      <ImageOrVideo
                        imageSrc={testimonial.imageSrc}
                        videoSrc={testimonial.videoSrc}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  index === selectedIndex ? "bg-foreground" : "bg-foreground/5",
                )}
                aria-label="Go to slide"
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
