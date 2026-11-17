"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useProducts } from "@/demos/hooks/useProducts";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

interface ProductCard {
  name: string;
  variant: string;
  price: string;
  imageSrc: string;
  onClick?: () => void;
}

interface ProductsSectionProps {
  tag: string;
  title: string;
  /** Extra words appended to the title in serif italics. */
  titleHighlight?: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  textAnimation: TextAnimationVariant;
  /** Shown when the store returns no products. */
  products?: ProductCard[];
}

/** Product grid: uses the store catalogue when it has products, otherwise the given list. */
export default function ProductsSection({
  tag,
  title,
  titleHighlight,
  description,
  primaryButton,
  secondaryButton,
  textAnimation,
  products,
}: ProductsSectionProps) {
  const { products: storeProducts, isLoading } = useProducts();
  const displayedProducts: ProductCard[] | undefined =
    storeProducts.length > 0
      ? storeProducts.map((storeProduct) => ({
          name: storeProduct.name,
          variant: storeProduct.variant || "",
          price: storeProduct.price,
          imageSrc: storeProduct.imageSrc,
          onClick: storeProduct.onProductClick,
        }))
      : products;

  return isLoading && !products ? (
    <section aria-label="Products section" className="py-20">
      <div className="w-content-width mx-auto flex justify-center">
        <LoaderCircle className="size-8 animate-spin text-foreground" strokeWidth={1.5} />
      </div>
    </section>
  ) : !displayedProducts || displayedProducts.length === 0 ? null : (
    <section aria-label="Products section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center w-content-width mx-auto gap-2">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>{tag}</p>
          </div>
          <motion.h2
            className="md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-normal text-center text-balance"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-20%",
            }}
            transition={{
              staggerChildren: 0.04,
            }}
          >
            {(() => {
              const titleWords = title.split(" ");
              const highlightWords = titleHighlight ? titleHighlight.split(" ") : [];
              return [...titleWords, ...highlightWords].map((word, index) => {
                const isHighlighted = index >= titleWords.length;
                return (
                  <span key={index}>
                    {index > 0 && " "}
                    <motion.span
                      className={isHighlighted ? "inline-block font-serif italic" : "inline-block"}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: "50%",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              });
            })()}
          </motion.h2>
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
            {displayedProducts.map((product) => (
              <button
                key={product.name}
                onClick={product.onClick}
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer"
              >
                <div className="relative aspect-square rounded overflow-hidden">
                  <ImageOrVideo
                    imageSrc={product.imageSrc}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:bg-background/20 group-hover:backdrop-blur-xs transition-all duration-300">
                    <div className="flex items-center justify-center size-12 rounded-full primary-button opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <ArrowUpRight className="size-5 text-primary-cta-text" strokeWidth={2} />
                    </div>
                  </div>
                </div>
                <div className="flex max-md:flex-wrap items-center justify-between gap-x-3 gap-y-1 p-3 xl:p-3.5 2xl:p-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-3/5 md:min-w-0">
                    <h3 className="text-2xl font-normal leading-snug text-balance">
                      {product.name}
                    </h3>
                    <p className="text-base text-foreground/75 md:truncate">{product.variant}</p>
                  </div>
                  <span className="text-xl font-normal shrink-0">{product.price}</span>
                </div>
              </button>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
