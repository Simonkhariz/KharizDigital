"use client";

import { Check } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface PricingPlan {
  tag: string;
  price: string;
  /** Accepted for parity with the other pricing sections; this layout does not show it. */
  description?: string;
  /** Label of the banner shown above the card; omit for a regular plan. */
  highlight?: string;
  features: string[];
  primaryButton: ButtonLink;
  secondaryButton?: ButtonLink;
}

interface PricingHighlightedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  plans: PricingPlan[];
  textAnimation: TextAnimationVariant;
}

/** Pricing section with centered plan cards; a plan can carry a highlight banner above it. */
export default function PricingHighlightedCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  plans,
  textAnimation,
}: PricingHighlightedCardsProps) {
  return (
    <section aria-label="Pricing section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center w-content-width mx-auto gap-2">
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
            {plans.map((plan) => (
              <div key={plan.tag} className="flex flex-col h-full">
                <div
                  className={cn(
                    "px-5 py-2 text-base",
                    plan.highlight
                      ? "text-center primary-button rounded-t text-primary-cta-text"
                      : "invisible",
                  )}
                >
                  {plan.highlight || "placeholder"}
                </div>
                <div
                  className={cn(
                    "flex flex-col items-center gap-4 xl:gap-5 2xl:gap-6 p-6 xl:p-7 2xl:p-8 flex-1 card text-center",
                    plan.highlight ? "rounded-t-none rounded-b" : "rounded",
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-5xl md:text-6xl font-semibold">{plan.price}</span>
                    <span className="text-base font-medium">{plan.tag}</span>
                  </div>
                  <div className="h-px w-full bg-foreground/20" />
                  <div className="flex flex-col gap-3 w-full">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="flex items-center justify-center shrink-0 size-6 primary-button rounded">
                          <Check className="size-3 text-primary-cta-text" strokeWidth={2} />
                        </div>
                        <span className="text-base text-left">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3 w-full mt-auto">
                    <Button
                      text={plan.primaryButton.text}
                      href={plan.primaryButton.href}
                      variant="primary"
                      className="w-full"
                    />
                    {plan.secondaryButton && (
                      <Button
                        text={plan.secondaryButton.text}
                        href={plan.secondaryButton.href}
                        variant="secondary"
                        className="w-full"
                      />
                    )}
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
