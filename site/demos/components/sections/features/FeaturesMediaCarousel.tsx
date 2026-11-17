"use client";

import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

interface CenteredCarouselProps {
  children: ReactNode;
}

/** Renders a looping carousel that highlights the centred slide, with previous/next buttons. */
function CenteredCarousel({ children }: CenteredCarouselProps) {
  const [containerRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slides = Children.toArray(children);

  const handleSelect = useCallback((api: EmblaApi) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);
  const scrollToPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollToNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
    <div className="relative w-full md:w-content-width mx-auto">
      <div ref={containerRef} className="overflow-hidden w-full mask-fade-x-medium">
        <div className="flex w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="shrink-0 w-content-width md:w-[clamp(18rem,50vw,48rem)] mr-3 md:mr-6"
            >
              <div
                className={cn(
                  "transition-all duration-500 ease-out",
                  selectedIndex === index ? "opacity-100 scale-100" : "opacity-70 scale-90",
                )}
              >
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between w-content-width mx-auto pointer-events-none">
        <button
          onClick={scrollToPrevious}
          type="button"
          aria-label="Previous slide"
          className="flex items-center justify-center h-9 aspect-square primary-button rounded cursor-pointer pointer-events-auto"
        >
          <ChevronLeft className="h-2/5 aspect-square text-primary-cta-text" />
        </button>
        <button
          onClick={scrollToNext}
          type="button"
          aria-label="Next slide"
          className="flex items-center justify-center h-9 aspect-square primary-button rounded cursor-pointer pointer-events-auto"
        >
          <ChevronRight className="h-2/5 aspect-square text-primary-cta-text" />
        </button>
      </div>
    </div>
  );
}

interface MediaCarouselItem {
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
  buttonIcon: IconInput;
  buttonHref?: string;
  buttonOnClick?: () => void;
}

interface MediaSlideProps {
  item: MediaCarouselItem;
}

/** Renders one slide: full-bleed media with a caption bar and a round link button. */
function MediaSlide({ item }: MediaSlideProps) {
  const handleClick = useButtonClick(item.buttonHref, item.buttonOnClick);

  return (
    <div className="relative overflow-hidden aspect-square md:aspect-3/2 rounded">
      <ImageOrVideo
        imageSrc={item.imageSrc}
        videoSrc={item.videoSrc}
        className="absolute inset-0"
      />
      <div className="absolute inset-x-4 bottom-4 xl:inset-x-5 xl:bottom-5 2xl:inset-x-6 2xl:bottom-6 flex items-center justify-between gap-5 p-4 xl:p-5 2xl:p-6 card rounded backdrop-blur-sm">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-2xl font-semibold leading-snug truncate">{item.title}</h3>
          <p className="text-base leading-snug truncate">{item.description}</p>
        </div>
        <a
          href={item.buttonHref}
          onClick={handleClick}
          aria-label="View more"
          className="flex items-center justify-center shrink-0 size-9 cursor-pointer primary-button rounded-full"
        >
          <DynamicIcon
            icon={item.buttonIcon}
            className="size-4 text-primary-cta-text"
            strokeWidth={2}
          />
        </a>
      </div>
    </div>
  );
}

interface FeaturesMediaCarouselProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: MediaCarouselItem[];
  textAnimation: TextAnimationVariant;
}

/** Renders a features section with a centred carousel of captioned media slides. */
export default function FeaturesMediaCarousel({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesMediaCarouselProps) {
  return (
    <section aria-label="Features section" className="w-full py-20">
      <div className="flex flex-col w-full gap-8 md:gap-10">
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
        <CenteredCarousel>
          {items.map((item) => (
            <MediaSlide key={item.title} item={item} />
          ))}
        </CenteredCarousel>
      </div>
    </section>
  );
}
