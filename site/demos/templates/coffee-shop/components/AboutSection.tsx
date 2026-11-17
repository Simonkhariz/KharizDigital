"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TrailMedia {
  imageSrc?: string;
  videoSrc?: string;
}

interface AboutSectionProps {
  tag: string;
  /** Replaces the tag on phones and tablets, where the photos react to scrolling instead of a cursor. */
  mobileTag?: string;
  title: string;
  /** Images that pop up along the cursor path (desktop) or sit in two fans around the headline (mobile). */
  media: TrailMedia[];
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  textAnimation: TextAnimationVariant;
}

/** Number of photos in each fan shown on phones and tablets. */
const FAN_SIZE = 3;

interface PhotoFanProps {
  media: TrailMedia[];
  className?: string;
}

/** Overlapping row of framed photos, shown instead of the cursor trail below the desktop breakpoint. */
function PhotoFan({ media, className }: PhotoFanProps) {
  return (
    <div data-fan="wrapper" className={cn("relative w-full h-40 sm:h-56 lg:hidden", className)}>
      {media.map((mediaItem, index) => (
        <div
          key={index}
          data-fan="card"
          className={cn(
            "absolute top-0 left-1/2 w-28 sm:w-40 -ml-14 sm:-ml-20 p-1 sm:p-1.5 card rounded overflow-hidden shadow-lg",
            index === Math.floor(media.length / 2) && "z-10",
          )}
        >
          <ImageOrVideo
            imageSrc={mediaItem.imageSrc}
            videoSrc={mediaItem.videoSrc}
            className="aspect-3/4 w-full object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Centered headline with two buttons. On desktop an image trail follows the cursor; on phones
 * and tablets the same photos sit in two fans around the headline and open up while scrolling.
 */
export default function AboutSection({
  tag,
  mobileTag = tag,
  title,
  media,
  primaryButton,
  secondaryButton,
  textAnimation,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const containerElement = containerRef.current;
    if (!sectionElement || !containerElement) {
      return;
    }
    const section: HTMLElement = sectionElement;
    const container: HTMLDivElement = containerElement;
    const mediaMatcher = gsap.matchMedia();

    // Desktop: reveal the next image under the cursor each time it has moved far enough.
    mediaMatcher.add("(min-width: 1024px)", () => {
      const trailItems = Array.from(container.querySelectorAll<HTMLElement>('[data-trail="item"]'));
      if (!trailItems.length) {
        return;
      }

      let shownCount = 0;
      let lastX = 0;
      let lastY = 0;
      let hideTimeout: ReturnType<typeof setTimeout> | undefined;
      let isListening = false;
      const minDistance = window.innerWidth / 15;

      function handleMouseMove(event: MouseEvent) {
        if (!isListening) {
          return;
        }
        const rect = container.getBoundingClientRect();
        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;
        if (
          !(pointerX < 0 || pointerY < 0 || pointerX > rect.width || pointerY > rect.height) &&
          Math.hypot(pointerX - lastX, pointerY - lastY) > minDistance
        ) {
          if (shownCount >= trailItems.length) {
            gsap.to(trailItems[(shownCount - trailItems.length) % trailItems.length], {
              autoAlpha: 0,
              scale: 0.2,
              duration: 0.8,
              ease: "expo.out",
            });
          }
          const trailItem = trailItems[shownCount % trailItems.length];
          gsap.set(trailItem, {
            x: pointerX - trailItem.offsetWidth / 2,
            y: pointerY - trailItem.offsetHeight / 2,
            zIndex: shownCount,
            force3D: true,
          });
          gsap.fromTo(
            trailItem,
            {
              autoAlpha: 0,
              scale: 0.8,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.2,
              overwrite: true,
            },
          );
          lastX = pointerX;
          lastY = pointerY;
          shownCount++;
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(
            () =>
              trailItems.forEach((item) =>
                gsap.to(item, {
                  autoAlpha: 0,
                  scale: 0.2,
                  duration: 0.8,
                  ease: "expo.out",
                }),
              ),
            350,
          );
        }
      }

      function handleMouseLeave() {
        clearTimeout(hideTimeout);
        trailItems.forEach((item) =>
          gsap.to(item, {
            autoAlpha: 0,
            scale: 0.2,
            duration: 0.5,
            ease: "expo.out",
          }),
        );
        lastX = 0;
        lastY = 0;
      }

      function startListening() {
        if (!(isListening || !container)) {
          isListening = true;
          container.addEventListener("mousemove", handleMouseMove);
          container.addEventListener("mouseleave", handleMouseLeave);
        }
      }

      function stopListening() {
        if (!(!isListening || !container)) {
          isListening = false;
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
          clearTimeout(hideTimeout);
          trailItems.forEach((item) => {
            gsap.killTweensOf(item);
            gsap.set(item, {
              autoAlpha: 0,
              scale: 1,
            });
          });
        }
      }

      const scrollTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: startListening,
        onEnterBack: startListening,
        onLeave: stopListening,
        onLeaveBack: stopListening,
      });

      return () => {
        stopListening();
        scrollTrigger.kill();
      };
    });

    // Phones and tablets: two fans of photos that spread open as the section scrolls into view.
    mediaMatcher.add("(max-width: 1023px)", () => {
      const fans = Array.from(section.querySelectorAll<HTMLElement>('[data-fan="wrapper"]'));
      const tweens = fans.map((fan, fanIndex) => {
        const cards = Array.from(fan.querySelectorAll<HTMLElement>('[data-fan="card"]'));
        const middle = (cards.length - 1) / 2;
        // The top fan arches upwards, the bottom one downwards.
        const arch = fanIndex === 0 ? 1 : -1;
        return gsap.fromTo(
          cards,
          {
            xPercent: (index) => (index - middle) * 30,
            y: 0,
            rotation: (index) => (index - middle) * 4 * arch,
          },
          {
            xPercent: (index) => (index - middle) * 82,
            y: (index) => Math.abs(index - middle) * 14 * arch,
            rotation: (index) => (index - middle) * 10 * arch,
            ease: "none",
            scrollTrigger: {
              trigger: fan,
              start: "top bottom",
              end: "center 55%",
              scrub: 0.4,
            },
          },
        );
      });

      return () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
        gsap.set(section.querySelectorAll('[data-fan="card"]'), { clearProps: "transform" });
      };
    });

    return () => mediaMatcher.revert();
  }, []);

  const fanSize = Math.min(FAN_SIZE, Math.floor(media.length / 2));

  return (
    <section ref={sectionRef} aria-label="About section" className="relative pt-10 pb-4 lg:py-60">
      <div
        ref={containerRef}
        data-trail="wrapper"
        className="w-full h-full absolute inset-0 z-0 max-lg:hidden"
      >
        {media.map((mediaItem, index) => (
          <div
            key={index}
            data-trail="item"
            className="invisible rounded w-[15em] h-[20em] absolute overflow-hidden"
          >
            <ImageOrVideo
              imageSrc={mediaItem.imageSrc}
              videoSrc={mediaItem.videoSrc}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2 w-content-width mx-auto text-center pointer-events-none">
        <PhotoFan media={media.slice(0, fanSize)} className="mb-8" />
        <h3 className="text-3xl md:text-5xl font-medium">
          <span className="lg:hidden">{mobileTag}</span>
          <span className="max-lg:hidden">{tag}</span>
        </h3>
        <TextAnimation
          text={title}
          variant={textAnimation}
          gradientText
          tag="h2"
          className="text-7xl md:text-8xl leading-[1.15] font-semibold text-center text-balance"
        />
        <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3 pointer-events-auto">
          <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
          <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" />
        </div>
        <PhotoFan media={media.slice(fanSize, fanSize * 2)} className="mt-10" />
      </div>
    </section>
  );
}
