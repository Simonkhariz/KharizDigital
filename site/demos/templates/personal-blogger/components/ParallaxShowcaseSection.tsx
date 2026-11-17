"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";

interface ParallaxShowcaseSectionProps {
  title: string;
  backgroundSrc?: string;
  backgroundVideoSrc?: string;
  leftImageSrc: string;
  rightImageSrc: string;
}

/** Full-height backdrop with a title and two cut-out images that drift and tilt on scroll. */
export default function ParallaxShowcaseSection({
  title,
  backgroundSrc,
  backgroundVideoSrc,
  leftImageSrc,
  rightImageSrc,
}: ParallaxShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftImageY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const leftImageRotate = useTransform(scrollYProgress, [0, 1], [-13, 8]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], ["-5%", "25%"]);
  const rightImageRotate = useTransform(scrollYProgress, [0, 1], [6, -7]);
  return (
    <section
      ref={sectionRef}
      aria-label="Parallax showcase section"
      className="relative w-full h-svh overflow-hidden my-20"
    >
      <div className="absolute inset-0">
        <ImageOrVideo
          imageSrc={backgroundSrc}
          videoSrc={backgroundVideoSrc}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full pt-16 md:pt-22 text-center">
        <h2 className="text-7xl md:text-8xl text-white font-serif">{title}</h2>
      </div>
      <motion.div
        style={{
          y: leftImageY,
          rotate: leftImageRotate,
        }}
        className="absolute left-[5%] md:left-[12%] top-[28%] md:top-[2%] w-[50vw] md:w-[26vw] max-w-[420px] drop-shadow-2xl pointer-events-none"
      >
        <ImageOrVideo imageSrc={leftImageSrc} className="w-full h-auto" />
      </motion.div>
      <motion.div
        style={{
          y: rightImageY,
          rotate: rightImageRotate,
        }}
        className="absolute right-[5%] md:right-[12%] top-[60%] md:top-[12%] w-[45vw] md:w-[20vw] max-w-[340px] drop-shadow-2xl pointer-events-none"
      >
        <ImageOrVideo imageSrc={rightImageSrc} className="w-full h-auto" />
      </motion.div>
    </section>
  );
}
