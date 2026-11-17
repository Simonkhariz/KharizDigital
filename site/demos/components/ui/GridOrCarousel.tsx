"use client";

import { Children, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarouselControls } from "@/demos/hooks/useCarouselControls";
import { cn } from "@/demos/lib/utils";

interface GridOrCarouselProps {
  children: ReactNode;
}

/**
 * Lays out one or two children as a grid and five or more as a draggable carousel. Three children
 * are a grid except on tablets, and four only on wide screens: wherever the columns would get too
 * narrow for the cards, the carousel takes over.
 */
export default function GridOrCarousel({ children }: GridOrCarouselProps) {
  const [containerRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const { prevDisabled, nextDisabled, scrollPrev, scrollNext, scrollProgress } =
    useCarouselControls(emblaApi);
  const items = Children.toArray(children);
  const itemCount = items.length;

  if (itemCount <= 2) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-5 mx-auto w-content-width",
          itemCount === 2 && "md:grid-cols-2",
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      {itemCount === 3 && (
        <div className="grid md:hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-5 mx-auto w-content-width">
          {children}
        </div>
      )}
      {itemCount === 4 && (
        <div className="hidden 2xl:grid grid-cols-4 gap-5 mx-auto w-content-width">{children}</div>
      )}
      <div
        className={cn(
          "flex-col gap-5 w-full overflow-hidden",
          itemCount === 3 ? "hidden md:flex lg:hidden" : "flex",
          itemCount === 4 && "2xl:hidden",
        )}
      >
        <div ref={containerRef} className="w-full cursor-grab">
          <div className="flex gap-4 items-stretch">
            <div className="shrink-0 w-carousel-padding" />
            {items.map((item, index) => (
              <div
                key={index}
                className="shrink-0 *:h-full w-carousel-item-3 2xl:w-carousel-item-4"
              >
                {item}
              </div>
            ))}
            <div className="shrink-0 w-carousel-padding" />
          </div>
        </div>
        <div className="flex w-full">
          <div className="shrink-0 w-carousel-padding-controls" />
          <div className="flex justify-between items-center w-full">
            <div className="relative h-2 w-1/2 card rounded overflow-hidden">
              <div
                className="absolute top-0 bottom-0 -left-full w-full primary-button rounded"
                style={{
                  transform: `translate3d(${scrollProgress}%,0px,0px)`,
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                disabled={prevDisabled}
                type="button"
                aria-label="Previous"
                className="flex items-center justify-center h-10 md:h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="h-2/5 aspect-square text-secondary-cta-text" />
              </button>
              <button
                onClick={scrollNext}
                disabled={nextDisabled}
                type="button"
                aria-label="Next"
                className="flex items-center justify-center h-10 md:h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50"
              >
                <ChevronRight className="h-2/5 aspect-square text-secondary-cta-text" />
              </button>
            </div>
          </div>
          <div className="shrink-0 w-carousel-padding-controls" />
        </div>
      </div>
    </>
  );
}
