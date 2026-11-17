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

interface FaqTwoColumnProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: FaqItem[];
  textAnimation: TextAnimationVariant;
}

/** FAQ section with expandable questions split across two columns inside one card. */
export default function FaqTwoColumn({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FaqTwoColumnProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (itemIndex: number) => {
    setOpenIndex(openIndex === itemIndex ? null : itemIndex);
  };

  const firstColumnCount = Math.ceil(items.length / 2);
  const firstColumnItems = items.slice(0, firstColumnCount);
  const secondColumnItems = items.slice(firstColumnCount);

  const renderItem = (item: FaqItem, itemIndex: number) => (
    <div
      key={itemIndex}
      onClick={() => toggleItem(itemIndex)}
      className="p-3 xl:p-3.5 2xl:p-4 rounded card cursor-pointer select-none"
    >
      <div className="flex items-center justify-between gap-3 xl:gap-3.5 2xl:gap-4">
        <h3 className="text-lg md:text-xl font-medium leading-snug">{item.question}</h3>
        <div className="flex shrink-0 items-center justify-center size-8 md:size-9 rounded primary-button">
          <Plus
            className={cn(
              "size-3.5 md:size-4 text-primary-cta-text transition-transform duration-300",
              openIndex === itemIndex && "rotate-45",
            )}
            strokeWidth={2}
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {openIndex === itemIndex && (
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
  );

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
        <ScrollReveal variant="slide-up" className="card rounded p-6 xl:p-10">
          <div className="flex flex-col md:flex-row gap-3 xl:gap-3.5 2xl:gap-4">
            <div className="flex flex-1 flex-col gap-3 xl:gap-3.5 2xl:gap-4">
              {firstColumnItems.map((item, index) => renderItem(item, index))}
            </div>
            {secondColumnItems.length > 0 && (
              <div className="flex flex-1 flex-col gap-3 xl:gap-3.5 2xl:gap-4">
                {secondColumnItems.map((item, index) => renderItem(item, index + firstColumnCount))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
