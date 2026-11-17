"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSimpleProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: FaqItem[];
  textAnimation: TextAnimationVariant;
}

/** FAQ section with a centered heading and a single column of expandable questions. */
export default function FaqSimple({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FaqSimpleProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (itemIndex: number) => {
    setOpenIndex(openIndex === itemIndex ? null : itemIndex);
  };

  return (
    <section aria-label="FAQ section" className="py-20">
      <div className="w-content-width mx-auto flex flex-col gap-8 md:gap-10">
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
        <ScrollReveal variant="slide-up" className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleItem(index)}
              className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none"
            >
              <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
                <h3 className="text-lg md:text-xl font-medium leading-snug">{item.question}</h3>
                <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button">
                  <Plus
                    className={cn(
                      "size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300",
                      openIndex === index && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 text-base leading-snug">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
