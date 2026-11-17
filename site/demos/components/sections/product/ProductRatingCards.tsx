"use client";

import { LoaderCircle, Star } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useProducts } from "@/demos/hooks/useProducts";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface ProductCard {
  name: string;
  brand: string;
  rating: number;
  reviewCount: string;
  price: string;
  imageSrc?: string;
  onClick?: () => void;
}

interface ProductRatingCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  textAnimation: TextAnimationVariant;
  /** Shown when the store returns no products. */
  products?: ProductCard[];
}

/** Product section with image cards showing the brand, a star rating, the review count and the price. */
export default function ProductRatingCards({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  textAnimation,
  products,
}: ProductRatingCardsProps) {
  const { products: fetchedProducts, isLoading } = useProducts();
  const displayedProducts: ProductCard[] | undefined =
    fetchedProducts.length > 0
      ? fetchedProducts.map((product) => ({
          brand: product.brand || "",
          name: product.name,
          price: product.price,
          rating: product.rating || 0,
          reviewCount: product.reviewCount || "0",
          imageSrc: product.imageSrc,
          onClick: product.onProductClick,
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
            {displayedProducts.map((product) => (
              <button
                key={product.name}
                onClick={product.onClick}
                className="group h-full flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 text-left card rounded cursor-pointer"
              >
                <div className="aspect-square rounded overflow-hidden">
                  <ImageOrVideo imageSrc={product.imageSrc} />
                </div>
                <div className="flex flex-col gap-2 p-3 xl:p-3.5 2xl:p-4">
                  <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                    <p className="truncate">{product.brand}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-medium leading-snug md:truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={cn(
                              "size-5 text-accent",
                              starIndex < Math.floor(product.rating)
                                ? "fill-accent"
                                : "fill-transparent",
                            )}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <p className="text-base">({product.reviewCount})</p>
                    </div>
                  </div>
                  <p className="text-2xl font-semibold mt-1">{product.price}</p>
                </div>
              </button>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
