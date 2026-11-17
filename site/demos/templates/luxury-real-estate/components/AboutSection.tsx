"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface AboutSectionProps {
  tag?: string;
  /** Statement whose words light up one after another while scrolling. */
  title: string;
  description?: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  textAnimation: TextAnimationVariant;
}

interface ScrollRevealWordProps {
  word: string;
  index: number;
}

/** Centered statement that is revealed word by word on scroll, above a wide image or video. */
export default function AboutSection({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  textAnimation,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWords = title.split(" ");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });

  /** A single title word whose opacity follows its share of the scroll progress. */
  const ScrollRevealWord = ({ word, index }: ScrollRevealWordProps) => {
    const wordOpacity = useTransform(
      scrollYProgress,
      [index / titleWords.length, (index + 1) / titleWords.length],
      [0.15, 1],
    );
    return (
      <motion.span
        className="inline-block"
        style={{
          opacity: wordOpacity,
        }}
      >
        {word}
      </motion.span>
    );
  };

  return (
    <section ref={sectionRef} aria-label="About section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10 mx-auto w-content-width">
        <div className="flex flex-col items-center gap-2">
          {tag && (
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>{tag}</p>
            </div>
          )}
          <h2 className="md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance">
            {titleWords.map((word, index) => (
              <span key={index}>
                {index > 0 && " "}
                <ScrollRevealWord word={word} index={index} />
              </span>
            ))}
          </h2>
          {description && (
            <TextAnimation
              text={description}
              variant={textAnimation}
              gradientText={false}
              tag="p"
              className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance"
            />
          )}
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
        <div className="overflow-hidden rounded aspect-square md:aspect-video">
          <ImageOrVideo
            imageSrc={imageSrc}
            videoSrc={videoSrc}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
