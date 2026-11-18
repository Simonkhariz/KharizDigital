"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";

gsap.registerPlugin(ScrollTrigger);

/** Distance from the top of the document to the element, ignoring any transform applied to it. */
function getDocumentTop(element: HTMLElement) {
  let top = 0;
  for (
    let node: HTMLElement | null = element;
    node;
    node = node.offsetParent as HTMLElement | null
  ) {
    top += node.offsetTop;
  }
  return top;
}

interface AvatarButtonLink extends ButtonLink {
  /** Portrait shown inside the button. */
  avatarSrc?: string;
  /** Short text shown in the second avatar that slides out on hover. */
  avatarLabel?: string;
}

interface WorkItem {
  title: string;
  description: string;
  tag: string;
  imageSrc: string;
}

interface HeroWorkScrollStackProps {
  tag: string;
  title: string;
  titleHighlight?: string;
  description: string;
  descriptionMuted?: string;
  primaryButton: AvatarButtonLink;
  sectionTag: string;
  sectionTitle: string;
  sectionDescription: string;
  items: WorkItem[];
  secondaryButton?: ButtonLink;
  /** Delay of the hero copy fade-in, in seconds. */
  heroAnimationDelay?: number;
  textAnimation: TextAnimationVariant;
}

/** Hero followed by a work section: the three work cards start stacked beside the hero copy and settle into their grid on scroll. */
export default function HeroWorkScrollStack({
  tag,
  title,
  titleHighlight,
  description,
  descriptionMuted,
  primaryButton,
  sectionTag,
  sectionTitle,
  sectionDescription,
  items,
  secondaryButton,
  heroAnimationDelay,
  textAnimation,
}: HeroWorkScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackAnchorRef = useRef<HTMLDivElement>(null);
  const workHeaderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const secondCardRef = useRef<HTMLDivElement>(null);
  const thirdCardRef = useRef<HTMLDivElement>(null);
  const handlePrimaryClick = useButtonClick(primaryButton.href);
  const handleSecondaryClick = useButtonClick(secondaryButton?.href || "#");

  useEffect(() => {
    // gsap.matchMedia rebuilds the animation whenever the layout crosses the
    // phone/desktop breakpoint (a rotated tablet, a resized window, a browser's
    // phone preview). Deciding once on load left the cards scattered until a reload.
    const media = gsap.matchMedia(containerRef);
    const cardRefs = [firstCardRef, secondCardRef, thirdCardRef];

    /** Vertical distance that puts the card's centre on the stack anchor's centre. */
    const distanceToAnchor = (card: HTMLElement, stackAnchor: HTMLElement) =>
      getDocumentTop(stackAnchor) +
      stackAnchor.offsetHeight / 2 -
      (getDocumentTop(card) + card.offsetHeight / 2);

    /** The layout is still settling when the breakpoint flips, so measure again once it has. */
    const remeasureSoon = () => {
      const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 350);
      return () => clearTimeout(timeoutId);
    };

    media.add("(min-width: 768px)", () => {
      const stackAnchor = stackAnchorRef.current;
      if (!stackAnchor) {
        return;
      }
      // The horizontal offsets suit the full 61rem content width; narrower layouts scale them down
      // so the stack stays beside the copy instead of running off the right edge.
      const offsetScale = () => Math.min(1, (gridRef.current?.offsetWidth ?? Infinity) / (61 * 16));
      const xOffsets = [32, 14.5, -1.8];
      const yOffsets = [0, -48, 0];
      const rotations = [-5, 0, 5];
      const scales = [1.35, 1.3, 1.25];
      const zIndexes = [30, 20, 10];
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      cardRefs.forEach(({ current: card }, index) => {
        if (!card) {
          return;
        }
        gsap.set(card, { zIndex: zIndexes[index], willChange: "transform", force3D: true });
        timeline.fromTo(
          card,
          {
            x: () => `${xOffsets[index] * offsetScale()}rem`,
            y: () => distanceToAnchor(card, stackAnchor) + yOffsets[index],
            rotation: rotations[index],
            scale: scales[index],
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "none",
          },
          0,
        );
        timeline.to(
          card,
          {
            zIndex: 1,
            duration: 0.1,
            ease: "none",
          },
          0.3,
        );
      });
      return remeasureSoon();
    });

    media.add("(max-width: 767px)", () => {
      const stackAnchor = stackAnchorRef.current;
      if (!stackAnchor) {
        return;
      }
      // Phones: the cards sit fanned under the hero copy, then follow the scroll down into the list.
      // The work heading lies on their path, so it fades out while they pass over it.
      const widthFactors = [0, 0.09, -0.09];
      const yOffsets = [6, -12, -4];
      const rotations = [-3, 6, -8];
      const scales = [0.8, 0.76, 0.72];
      const zIndexes = [30, 20, 10];
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stackAnchor,
          start: "clamp(center 35%)",
          endTrigger: gridRef.current,
          end: "top 55%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      cardRefs.forEach(({ current: card }, index) => {
        if (!card) {
          return;
        }
        gsap.set(card, { zIndex: zIndexes[index], willChange: "transform", force3D: true });
        timeline.fromTo(
          card,
          {
            x: () => card.offsetWidth * widthFactors[index],
            y: () => distanceToAnchor(card, stackAnchor) + yOffsets[index],
            rotation: rotations[index],
            scale: scales[index],
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          0,
        );
      });
      timeline.to(
        workHeaderRef.current,
        {
          keyframes: {
            "0%": { autoAlpha: 1 },
            "15%": { autoAlpha: 1 },
            "30%": { autoAlpha: 0 },
            "68%": { autoAlpha: 0 },
            "90%": { autoAlpha: 1 },
            "100%": { autoAlpha: 1 },
          },
          duration: 1,
          ease: "none",
        },
        0,
      );
      return remeasureSoon();
    });

    // Fonts and images can change the page height after the positions were measured.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div id="hero" data-section="hero">
        <section
          aria-label="Hero section"
          className="relative h-fit md:h-svh pt-30 pb-6 md:py-0 flex items-center overflow-hidden md:overflow-visible"
        >
          <HeroBackgroundSlot />
          <div className="w-content-width mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full">
              <motion.div
                initial={{
                  y: 10,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: heroAnimationDelay ?? 0,
                }}
                className="w-full md:w-[46%] flex flex-col items-center md:items-start gap-3"
              >
                <div className="card backdrop-blur flex items-center gap-2 px-3 py-1 rounded">
                  <span className="size-2 rounded-full bg-green-500 animate-pulsate [--accent:#22c55e]" />
                  <p className="text-sm leading-snug font-medium text-foreground">{tag}</p>
                </div>
                <h1 className="text-6xl md:text-7xl 2xl:text-8xl font-medium leading-[1.05] tracking-tight text-center md:text-left">
                  <span className="inline pb-[0.1em] -mb-[0.1em] bg-linear-to-r from-foreground to-primary-cta bg-clip-text text-transparent">
                    {title} <span className="font-bold">{titleHighlight}</span>
                  </span>
                </h1>
                <p className="text-base md:text-lg font-medium leading-snug text-center text-balance md:text-left max-w-[95%]">
                  {description} <span className="text-foreground/50">{descriptionMuted}</span>
                </p>
                <a
                  href={primaryButton.href}
                  onClick={handlePrimaryClick}
                  className="group flex items-center gap-3 mt-2 text-primary-cta-text rounded-full pl-3 pr-6 py-3 w-fit primary-button transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="card p-px rounded-full transition-transform duration-500 ease-out group-hover:-rotate-6">
                      <img
                        src={primaryButton.avatarSrc}
                        className="w-9 h-9 rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-500 ease-out">
                      <div className="overflow-hidden flex items-center">
                        <span className="text-primary-cta-text text-sm font-medium mx-2 transition-transform duration-500 ease-out -translate-x-3 group-hover:translate-x-0">
                          +
                        </span>
                        <div className="card p-px rounded-full shrink-0 transition-transform duration-500 ease-out -translate-x-5 group-hover:translate-x-0 group-hover:rotate-6">
                          <span className="w-9 h-9 rounded-full flex items-center justify-center">
                            <span className="text-foreground text-xs font-bold">
                              {primaryButton.avatarLabel}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-base font-medium whitespace-nowrap">
                    {primaryButton.text}
                  </span>
                </a>
              </motion.div>
              <div
                ref={stackAnchorRef}
                className="w-full md:w-[54%] aspect-4/3 md:aspect-auto md:h-96"
              />
            </div>
          </div>
        </section>
      </div>
      <div id="work" data-section="work">
        <section aria-label="Work section" className="py-20 md:pt-0">
          <div className="flex flex-col gap-8 w-content-width mx-auto">
            <div ref={workHeaderRef} className="flex flex-col items-center gap-2">
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p>{sectionTag}</p>
              </div>
              <TextAnimation
                text={sectionTitle}
                variant={textAnimation}
                gradientText
                tag="h2"
                className="md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance"
              />
              <TextAnimation
                text={sectionDescription}
                variant={textAnimation}
                gradientText={false}
                tag="p"
                className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance"
              />
            </div>
            {/* grid-cols-1 and min-w-0 keep each column to the screen width. Without them
                Safari sizes the column to the image's full resolution (1281px on an iPhone),
                which blew the cards up and scattered the hero stack. */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {items.map((item, index) => (
                <div key={item.title} className="flex flex-col gap-3 xl:gap-4 2xl:gap-5 min-w-0">
                  <div
                    ref={index === 0 ? firstCardRef : index === 1 ? secondCardRef : thirdCardRef}
                    className="aspect-4/3 rounded-2xl shadow-2xl relative card p-2 xl:p-3 2xl:p-4"
                  >
                    <div className="w-full h-full aspect-4/3 rounded-xl overflow-hidden relative">
                      <ImageOrVideo
                        imageSrc={item.imageSrc}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 xl:bottom-3 xl:left-3 2xl:bottom-4 2xl:left-4 px-3 py-1.5 text-xs font-medium text-primary-cta-text rounded-full backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg md:text-xl lg:text-2xl leading-snug">
                    <span className="font-semibold text-foreground">
                      {item.title}
                      {". "}
                    </span>
                    <span className="text-foreground/50">{item.description}</span>
                  </p>
                </div>
              ))}
            </div>
            {secondaryButton && (
              <div className="flex justify-center">
                <a
                  href={secondaryButton.href}
                  onClick={handleSecondaryClick}
                  className="group flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full secondary-button text-secondary-cta-text transition-all duration-300"
                >
                  <span>{secondaryButton.text}</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
