"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Filter that shows every item regardless of category. */
const ALL_CATEGORIES = "All";

const GRID_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
  },
};

const CARD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface MenuItem {
  name: string;
  /** Must match one of the section's `categories`. */
  category: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface MenuSectionProps {
  tag: string;
  title: string;
  description: string;
  categories: string[];
  items: MenuItem[];
  textAnimation: TextAnimationVariant;
}

/** Menu grid with category filter buttons; the cards re-animate when the filter changes. */
export default function MenuSection({
  tag,
  title,
  description,
  categories,
  items,
  textAnimation,
}: MenuSectionProps) {
  const filterOptions = [ALL_CATEGORIES, ...categories];
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const visibleItems = items.filter(
    (item) => activeCategory === ALL_CATEGORIES || item.category === activeCategory,
  );

  const handleCategorySelect = (category: string) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <section aria-label="Features section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-2 w-content-width mx-auto">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>{tag}</p>
          </div>
          <TextAnimation
            text={title}
            variant={textAnimation}
            gradientText
            tag="h2"
            className="md:max-w-8/10 text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center text-balance"
          />
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance"
          />
          <div role="group" className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
            {filterOptions.map((category) => (
              <button
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => handleCategorySelect(category)}
                className="relative flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer card overflow-hidden"
              >
                <div
                  className={cn(
                    "absolute inset-0 primary-button rounded transition-opacity duration-300",
                    activeCategory === category ? "opacity-100" : "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    activeCategory === category ? "text-primary-cta-text" : "",
                  )}
                >
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="w-content-width mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={GRID_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-live="polite"
              role="list"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:gap-4 2xl:gap-5"
            >
              {visibleItems.map((item) => (
                <motion.div key={item.name} variants={CARD_VARIANTS} role="listitem">
                  <div className="p-1 xl:p-2 2xl:p-3 card rounded overflow-hidden shadow-xl">
                    <div className="relative">
                      <ImageOrVideo
                        imageSrc={item.imageSrc}
                        videoSrc={item.videoSrc}
                        className="w-full aspect-3/4 object-cover rounded"
                      />
                      <div className="absolute bottom-1 xl:bottom-2 2xl:bottom-3 inset-x-1 xl:inset-x-2 2xl:inset-x-3 card rounded p-1 xl:p-2 2xl:p-3">
                        <h4 className="text-xl md:text-3xl max-md:leading-tight text-center max-md:text-balance md:truncate">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
