"use client";

import { useCallback, useEffect, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

/** Previous/next handlers, their disabled state and the scroll progress (0-100) of an Embla carousel. */
const useCarouselControls = (emblaApi: EmblaApi | undefined) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const updateDisabledState = useCallback((api: EmblaApi) => {
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  }, []);

  const updateScrollProgress = useCallback((api: EmblaApi) => {
    setScrollProgress(Math.max(0, Math.min(1, api.scrollProgress())) * 100);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      updateDisabledState(emblaApi);
      updateScrollProgress(emblaApi);
      emblaApi.on("reInit", updateDisabledState).on("select", updateDisabledState);
      emblaApi.on("reInit", updateScrollProgress).on("scroll", updateScrollProgress);
      return () => {
        emblaApi.off("reInit", updateDisabledState).off("select", updateDisabledState);
        emblaApi.off("reInit", updateScrollProgress).off("scroll", updateScrollProgress);
      };
    }
  }, [emblaApi, updateDisabledState, updateScrollProgress]);

  return {
    prevDisabled,
    nextDisabled,
    scrollPrev,
    scrollNext,
    scrollProgress,
  };
};

export { useCarouselControls };
