"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import Transition from "@/demos/components/ui/Transition";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface Testimonial {
  title: string;
  quote: string;
  name: string;
  role: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface TestimonialsSectionProps {
  tag: string;
  title: string;
  /** Extra words appended to the title in serif italics. */
  titleHighlight?: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  testimonials: Testimonial[];
  textAnimation: TextAnimationVariant;
}

/** One testimonial at a time, with its media beside it and previous/next buttons. */
export default function TestimonialsSection({
  tag,
  title,
  titleHighlight,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
  textAnimation,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    );
  };
  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10 w-content-width mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>{tag}</p>
          </div>
          <motion.h2
            className="md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-normal text-center text-balance"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-20%",
            }}
            transition={{
              staggerChildren: 0.04,
            }}
          >
            {(() => {
              const titleWords = title.split(" ");
              const highlightWords = titleHighlight ? titleHighlight.split(" ") : [];
              return [...titleWords, ...highlightWords].map((word, index) => {
                const isHighlighted = index >= titleWords.length;
                return (
                  <span key={index}>
                    {index > 0 && " "}
                    <motion.span
                      className={isHighlighted ? "inline-block font-serif italic" : "inline-block"}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: "50%",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              });
            })()}
          </motion.h2>
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
              <h3 className="text-3xl md:text-4xl font-normal leading-[1.15] text-balance">
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
                <span className="text-base text-foreground font-normal leading-snug max-md:truncate xl:truncate">
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
