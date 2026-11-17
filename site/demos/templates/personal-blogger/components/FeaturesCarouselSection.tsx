import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface LabelPlacement {
  /** Tailwind offset classes for the corner the label sits on. */
  pos: string;
  /** Tailwind rotation class. */
  rotate: string;
}

/** Position and tilt of the label pill, cycled across the cards. */
const LABEL_PLACEMENTS: LabelPlacement[] = [
  {
    pos: "-top-3 -left-2",
    rotate: "-rotate-3",
  },
  {
    pos: "-bottom-3 -right-2",
    rotate: "rotate-3",
  },
  {
    pos: "-top-3 -right-3",
    rotate: "rotate-6",
  },
  {
    pos: "-bottom-3 -left-3",
    rotate: "-rotate-3",
  },
  {
    pos: "-top-2 left-4",
    rotate: "-rotate-6",
  },
  {
    pos: "-bottom-2 right-4",
    rotate: "rotate-3",
  },
];

interface CarouselItem {
  imageSrc?: string;
  videoSrc?: string;
  label: string;
}

interface FeaturesCarouselSectionProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: CarouselItem[];
  textAnimation: TextAnimationVariant;
}

/** Section heading followed by an endless marquee of labelled photo cards. */
export default function FeaturesCarouselSection({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesCarouselSectionProps) {
  const marqueeItems = [...items, ...items, ...items, ...items];
  return (
    <section aria-label="Features carousel section" className="pt-20 pb-14">
      <div className="flex flex-col gap-2 md:gap-4">
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
          <div className="w-full overflow-hidden mask-fade-x-medium py-6">
            <div
              className="flex w-max animate-marquee-horizontal items-center"
              style={{
                animationDuration: "60s",
              }}
            >
              {marqueeItems.map((item, index) => {
                const labelPlacement = LABEL_PLACEMENTS[index % LABEL_PLACEMENTS.length];
                return (
                  <div
                    key={index}
                    className="relative shrink-0 w-60 md:w-65 2xl:w-70 aspect-3/4 mr-3 md:mr-5 p-2 xl:p-3 2xl:p-4 card rounded-lg overflow-visible"
                  >
                    <ImageOrVideo
                      imageSrc={item.imageSrc}
                      videoSrc={item.videoSrc}
                      className="w-full h-full rounded-lg object-cover"
                    />
                    <div
                      className={cn(
                        "absolute px-5 py-2.5 rounded-full card z-10 flex items-center justify-center",
                        labelPlacement.pos,
                        labelPlacement.rotate,
                      )}
                    >
                      <h3 className="text-base font-normal leading-none text-foreground">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
