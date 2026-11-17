"use client";

import { useLayoutEffect, useRef, type Ref } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import type { ButtonLink } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface MediaCardProps {
  imageSrc?: string;
  videoSrc?: string;
  cardRef: Ref<HTMLDivElement>;
  className?: string;
}

/** Renders one framed image or video card that flies in from the side. */
function MediaCard({ imageSrc, videoSrc, cardRef, className = "" }: MediaCardProps) {
  return (
    <div ref={cardRef} className={cn("card rounded p-1 overflow-hidden", className)}>
      <ImageOrVideo
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
}

interface StickyCardsItem {
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  leftImageSrc?: string;
  leftVideoSrc?: string;
  rightImageSrc?: string;
  rightVideoSrc?: string;
}

interface FeaturesStickyCardsProps {
  items: StickyCardsItem[];
}

/** Renders numbered feature blocks whose left and right media cards slide in as the page scrolls. */
export default function FeaturesStickyCards({ items }: FeaturesStickyCardsProps) {
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const mediaMatcher = gsap.matchMedia();

    const getDesktopTween = (itemIndex: number, isLeftCard: boolean) => {
      const isOddItem = itemIndex % 2 == 1;
      return isLeftCard
        ? {
            from: {
              xPercent: -225,
              rotation: -45,
            },
            to: {
              rotation: isOddItem ? 10 : -10,
            },
          }
        : {
            from: {
              xPercent: 225,
              rotation: 45,
            },
            to: {
              rotation: isOddItem ? -10 : 10,
            },
          };
    };

    const animateCards = (isMobile: boolean) => {
      items.forEach((_item, itemIndex) => {
        [0, 1].forEach((side) => {
          const cardIndex = itemIndex * 2 + side;
          const card = isMobile
            ? mobileCardRefs.current[cardIndex]
            : desktopCardRefs.current[cardIndex];
          if (card) {
            const isLeftCard = side === 0;
            const fromVars = isMobile
              ? {
                  xPercent: isLeftCard ? -150 : 150,
                  rotation: isLeftCard ? -25 : 25,
                }
              : getDesktopTween(itemIndex, isLeftCard).from;
            const toVars = isMobile
              ? {
                  xPercent: 0,
                  rotation: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1,
                  },
                }
              : {
                  xPercent: 0,
                  rotation: getDesktopTween(itemIndex, isLeftCard).to.rotation,
                  scrollTrigger: {
                    trigger: textBlockRefs.current[itemIndex],
                    start: "top bottom",
                    end: "top top",
                    scrub: 1,
                  },
                };
            gsap.fromTo(card, fromVars, toVars);
          }
        });
      });
    };

    mediaMatcher.add("(max-width: 767px)", () => animateCards(true));
    mediaMatcher.add("(min-width: 768px)", () => animateCards(false));
    return () => {
      mediaMatcher.revert();
      desktopCardRefs.current = [];
      mobileCardRefs.current = [];
      textBlockRefs.current = [];
    };
  }, [items]);

  const scrollTrackStyle = {
    height: `${items.length * 100}vh`,
  };

  return (
    <section
      aria-label="Features sticky cards section"
      className="py-20 overflow-hidden md:overflow-visible"
    >
      <div className="flex flex-col gap-8">
        <div className="hidden md:flex relative" style={scrollTrackStyle}>
          <div
            className="absolute top-0 left-0 flex flex-col w-6/10 mx-auto right-0 z-10"
            style={scrollTrackStyle}
          >
            {items.map((item, index) => (
              <div
                key={index}
                ref={(element) => {
                  textBlockRefs.current[index] = element;
                }}
                className="w-full mx-auto h-screen flex justify-center items-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center justify-center text-sm card rounded h-8 w-8 mb-1">
                    <p>{index + 1}</p>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-semibold text-center text-balance">
                    {item.title}
                  </h3>
                  <p className="md:max-w-6/10 text-lg leading-snug text-center">
                    {item.description}
                  </p>
                  {(item.primaryButton || item.secondaryButton) && (
                    <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
                      {item.primaryButton && (
                        <Button
                          text={item.primaryButton.text}
                          href={item.primaryButton.href}
                          variant="primary"
                        />
                      )}
                      {item.secondaryButton && (
                        <Button
                          text={item.secondaryButton.text}
                          href={item.secondaryButton.href}
                          variant="secondary"
                          animationDelay={0.1}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
            {items.map((item, index) => (
              <div key={index} className="h-screen w-full absolute top-0 left-0">
                <div className="w-content-width mx-auto h-full flex flex-row justify-between items-center">
                  <MediaCard
                    imageSrc={item.leftImageSrc}
                    videoSrc={item.leftVideoSrc}
                    cardRef={(element) => {
                      desktopCardRefs.current[index * 2] = element;
                    }}
                    className="w-25/100 xl:w-27/100 2xl:w-29/100 h-[70vh]"
                  />
                  <MediaCard
                    imageSrc={item.rightImageSrc}
                    videoSrc={item.rightVideoSrc}
                    cardRef={(element) => {
                      desktopCardRefs.current[index * 2 + 1] = element;
                    }}
                    className="w-25/100 xl:w-27/100 2xl:w-28/100 h-[70vh]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden flex flex-col gap-20 w-content-width mx-auto">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center justify-center text-sm card rounded h-8 w-8 mb-1">
                  <p>{index + 1}</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold text-center text-balance">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg leading-snug text-center">{item.description}</p>
                {(item.primaryButton || item.secondaryButton) && (
                  <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
                    {item.primaryButton && (
                      <Button
                        text={item.primaryButton.text}
                        href={item.primaryButton.href}
                        variant="primary"
                      />
                    )}
                    {item.secondaryButton && (
                      <Button
                        text={item.secondaryButton.text}
                        href={item.secondaryButton.href}
                        variant="secondary"
                        animationDelay={0.1}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-3 justify-center">
                <MediaCard
                  imageSrc={item.leftImageSrc}
                  videoSrc={item.leftVideoSrc}
                  cardRef={(element) => {
                    mobileCardRefs.current[index * 2] = element;
                  }}
                  className="w-1/2 aspect-9/16"
                />
                <MediaCard
                  imageSrc={item.rightImageSrc}
                  videoSrc={item.rightVideoSrc}
                  cardRef={(element) => {
                    mobileCardRefs.current[index * 2 + 1] = element;
                  }}
                  className="w-1/2 aspect-9/16"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
