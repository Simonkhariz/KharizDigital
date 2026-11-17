"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { TextAnimationVariant } from "@/demos/lib/types";

interface SocialLink {
  icon: IconInput;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface AboutTestimonialParallaxProps {
  tag: string;
  quote: string;
  author: string;
  role: string;
  imageSrc?: string;
  videoSrc?: string;
  socialLinks?: SocialLink[];
  textAnimation: TextAnimationVariant;
}

/** Translucent pill link with an icon, shown over the media panel. */
function SocialLinkPill({ icon, label, href, onClick }: SocialLink) {
  return (
    <a
      href={href}
      onClick={useButtonClick(href, onClick)}
      className="flex items-center justify-center gap-2 h-9 px-3 text-sm rounded-full cursor-pointer backdrop-blur-xl bg-primary-cta-text/15 border border-primary-cta-text/20 text-primary-cta-text font-medium hover:bg-primary-cta-text/25 transition-all duration-300 ease-out"
    >
      <DynamicIcon icon={icon} className="size-4" strokeWidth={1.5} />
      <span>{label}</span>
    </a>
  );
}

/** About section with a quote card next to media that zooms out on scroll, with social links. */
export default function AboutTestimonialParallax({
  tag,
  quote,
  author,
  role,
  imageSrc,
  videoSrc,
  socialLinks,
  textAnimation,
}: AboutTestimonialParallaxProps) {
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mediaContainerRef,
    offset: ["start end", "end start"],
  });
  const mediaScale = useTransform(scrollYProgress, [0, 0.6], [1.3, 1]);

  return (
    <section aria-label="About section" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto w-content-width">
        <div className="relative md:col-span-3 p-10 md:p-20 card rounded">
          <div className="absolute flex items-center justify-center -top-7 -left-4 md:-top-8 md:-left-8 size-14 md:size-16 primary-button rounded">
            <Quote className="h-5/10 text-primary-cta-text" strokeWidth={1.5} />
          </div>
          <div className="relative flex flex-col justify-center gap-5 h-full">
            <div className="w-fit px-3 py-1 mb-1 text-sm card rounded">
              <p>{tag}</p>
            </div>
            <TextAnimation
              text={quote}
              variant={textAnimation}
              gradientText={false}
              tag="h1"
              className="text-4xl md:text-5xl leading-[1.15] font-semibold text-balance"
            />
            <div className="flex max-xl:flex-wrap items-center gap-x-2 min-w-0">
              <span className="text-base font-medium max-md:truncate xl:truncate">{author}</span>
              <span className="text-accent shrink-0">•</span>
              <span className="text-base font-medium max-md:truncate xl:truncate">{role}</span>
            </div>
          </div>
        </div>
        <div
          ref={mediaContainerRef}
          className="p-px md:col-span-2 aspect-square md:aspect-auto md:h-full card rounded overflow-hidden relative"
        >
          <motion.div
            style={{
              scale: mediaScale,
            }}
            className="w-full h-full origin-center"
          >
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </motion.div>
          {socialLinks && socialLinks.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-center gap-3 p-6 xl:p-7 2xl:p-8">
              {socialLinks.map((socialLink, index) => (
                <SocialLinkPill key={index} {...socialLink} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
