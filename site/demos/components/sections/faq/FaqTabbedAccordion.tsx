"use client";

import { useState } from "react";
import Accordion from "@/demos/components/ui/Accordion";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import SelectorButton from "@/demos/components/ui/SelectorButton";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import Transition from "@/demos/components/ui/Transition";
import type { TextAnimationVariant } from "@/demos/lib/types";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
}

/** Contact person shown under the questions, with a button to reach them. */
interface FaqContactCta {
  imageSrc?: string;
  videoSrc?: string;
  name: string;
  role: string;
  buttonText: string;
  buttonHref: string;
}

interface FaqTabbedAccordionProps {
  tag: string;
  title: string;
  description: string;
  categories: FaqCategory[];
  cta?: FaqContactCta;
  textAnimation: TextAnimationVariant;
}

/** FAQ section where category tabs switch the list of expandable questions inside one card. */
export default function FaqTabbedAccordion({
  tag,
  title,
  description,
  categories,
  cta,
  textAnimation,
}: FaqTabbedAccordionProps) {
  const [activeCategoryName, setActiveCategoryName] = useState(categories[0]?.name || "");

  const accordionItems = (
    categories.find((category) => category.name === activeCategoryName)?.items || []
  ).map((item) => ({
    title: item.question,
    content: item.answer,
  }));

  return (
    <section aria-label="FAQ section" className="py-20">
      <div className="w-content-width mx-auto">
        <div className="card rounded flex flex-col gap-6 md:gap-10 p-6 md:p-10">
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
            <SelectorButton
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
              activeValue={activeCategoryName}
              onValueChange={setActiveCategoryName}
              className="mt-2 md:mt-3"
            />
          </div>
          <ScrollReveal variant="slide-up">
            <Transition key={activeCategoryName} whileInView={false} className="">
              <Accordion items={accordionItems} />
            </Transition>
          </ScrollReveal>
          {cta && (
            <>
              <div className="w-full h-px bg-foreground/5" />
              <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                <div className="flex items-center gap-3">
                  <ImageOrVideo
                    imageSrc={cta.imageSrc}
                    videoSrc={cta.videoSrc}
                    className="size-10 md:size-11 2xl:size-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-base text-foreground font-semibold leading-snug md:truncate">
                      {cta.name}
                    </span>
                    <span className="text-base text-foreground/75 leading-snug truncate">
                      {cta.role}
                    </span>
                  </div>
                </div>
                <Button text={cta.buttonText} href={cta.buttonHref} variant="primary" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
