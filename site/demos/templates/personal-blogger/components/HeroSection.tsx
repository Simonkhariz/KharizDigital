"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { motion } from "motion/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import { cn } from "@/demos/lib/utils";
import SocialLinkButton, { type SocialLink } from "./SocialLinkButton";

gsap.registerPlugin(Draggable);

interface StickerPlacement {
  /** Tailwind position classes: a band above and below the portrait on phones, spread around it from md up. */
  position: string;
  rotate: string;
  /** Tailwind width classes. */
  size: string;
}

/** Where each draggable sticker starts, in the order the sticker images are passed. */
const STICKER_PLACEMENTS: StickerPlacement[] = [
  {
    position: "top-[3%] left-[5%] md:top-[6%] md:left-[14%]",
    rotate: "-12deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
  {
    position: "top-[4%] right-[6%] md:top-[10%] md:right-[12%]",
    rotate: "10deg",
    size: "w-18 md:w-30 2xl:w-36",
  },
  {
    position: "top-[11%] left-[30%] md:top-[40%] md:left-[10%]",
    rotate: "8deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
  {
    position: "top-[12%] right-[29%] md:top-[42%] md:right-[9%]",
    rotate: "-6deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
  {
    position: "bottom-[11%] left-[4%] md:bottom-[20%] md:left-[12%]",
    rotate: "-5deg",
    size: "w-18 md:w-30 2xl:w-36",
  },
  {
    position: "bottom-[12%] right-[5%] md:bottom-[22%] md:right-[13%]",
    rotate: "14deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
  {
    position: "bottom-[3%] left-[29%] md:bottom-[7%] md:left-[22%]",
    rotate: "4deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
  {
    position: "bottom-[3%] right-[28%] md:bottom-[8%] md:right-[20%]",
    rotate: "-10deg",
    size: "w-16 md:w-28 2xl:w-32",
  },
];

/** A piece of the sentence on the back of the card: plain text, emphasised text or an inline photo. */
type BackTextSegment =
  { type: "text" | "highlight"; content: string } | { type: "photo"; src: string };

interface HeroSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  backTextSegments: BackTextSegment[];
  stickerImageSrcs: string[];
  socialLinks: SocialLink[];
  clickBadgeText: string;
}

/** Full-height hero with a flip card portrait, draggable stickers and social links. */
export default function HeroSection({
  title,
  description,
  imageSrc,
  backTextSegments,
  stickerImageSrcs,
  socialLinks,
  clickBadgeText,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const ctx = gsap.context(() => {
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-sticker]") ?? [],
      ).forEach((sticker, index) => {
        gsap.set(sticker, {
          willChange: "transform",
          force3D: true,
        });
        gsap.fromTo(
          sticker,
          {
            autoAlpha: 0,
            scale: 0.5,
            y: 30,
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: 0.8 + index * 0.08,
            ease: "back.out(2)",
          },
        );
        Draggable.create(sticker, {
          type: "x,y",
          bounds: containerRef.current,
          dragResistance: 0.1,
          onPress() {
            gsap.to(sticker, {
              scale: 1.15,
              rotation: (Math.random() - 0.5) * 20,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          },
          onRelease() {
            gsap.to(sticker, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(3)",
              overwrite: true,
            });
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      aria-label="Hero section"
      className="relative h-svh flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroBackgroundSlot />
      <div ref={containerRef} className="absolute inset-0 pointer-events-auto z-0">
        {stickerImageSrcs.map((stickerImageSrc, index) => {
          const placement = STICKER_PLACEMENTS[index];
          const stickerStyle: CSSProperties = {
            opacity: 0,
            visibility: "hidden",
            rotate: placement.rotate,
          };
          return (
            <div
              key={index}
              data-sticker
              className={cn(
                "absolute cursor-grab active:cursor-grabbing",
                placement.position,
                placement.size,
              )}
              style={stickerStyle}
            >
              <ImageOrVideo
                imageSrc={stickerImageSrc}
                className="h-auto drop-shadow-lg rounded-none"
              />
            </div>
          );
        })}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-5 w-content-width mx-auto pointer-events-none">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-auto cursor-pointer select-none"
          style={{
            perspective: 800,
          }}
          onClick={() => setIsFlipped((previous) => !previous)}
          onMouseEnter={() => {
            if (window.innerWidth >= 768) {
              setIsFlipped(true);
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) {
              setIsFlipped(false);
            }
          }}
        >
          <div
            className="relative size-60 md:size-75 2xl:size-85 transition-transform duration-1200 ease-[cubic-bezier(0.22,0.68,0,1.2)]"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-4xl bg-card p-2 xl:p-3 2xl:p-4 shadow-2x"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden relative">
                <ImageOrVideo imageSrc={imageSrc} className="rounded-none" />
                <div className="absolute top-3 left-3 px-3 py-1.5 md:px-3.5 md:py-2 2xl:px-4 2xl:py-2.5 card rounded-full flex items-center justify-center leading-none">
                  <span className="text-xs md:text-sm font-medium text-foreground">
                    {clickBadgeText}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 rounded-4xl bg-card p-2 xl:p-3 2xl:p-4 shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden bg-foreground flex items-center justify-center p-7 md:p-9 2xl:p-11">
                <p className="text-lg md:text-2xl 2xl:text-3xl leading-relaxed font-medium">
                  {backTextSegments.map((backTextSegment, index) => (
                    <span key={index}>
                      {backTextSegment.type === "text" && (
                        <span className="text-background/40">{backTextSegment.content}</span>
                      )}
                      {backTextSegment.type === "highlight" && (
                        <span className="text-background font-medium">
                          {backTextSegment.content}
                        </span>
                      )}
                      {backTextSegment.type === "photo" && (
                        <span className="inline-block align-middle size-9 md:size-10 2xl:size-11 rounded-lg overflow-hidden card p-0.5 mx-1 -mt-1">
                          <ImageOrVideo imageSrc={backTextSegment.src} className="rounded-md" />
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-5xl 2xl:text-6xl leading-[1.15] font-semibold text-foreground"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-lg md:text-xl text-foreground/50 leading-snug"
          >
            {description}
          </motion.p>
          {socialLinks.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3 mt-0.75 pointer-events-auto"
            >
              {socialLinks.map((socialLink, index) => (
                <SocialLinkButton key={index} link={socialLink} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
