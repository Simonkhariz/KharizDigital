"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { aboutHero } from "@/content/about";
import { EASE } from "./motion";
import { RotatingWord } from "./RotatingWord";
import { CircleArrowLink } from "./links";

const FADE_MASK = "linear-gradient(to bottom, black 0%, black 58%, transparent 94%)";

export function AboutHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % aboutHero.roles.length), 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-background">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "multiply", maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        aria-hidden
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/about-water-3-poster.jpg"
          className="absolute inset-x-0 top-0 w-full h-auto md:h-full md:object-cover [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)] md:[mask-image:none]"
        >
          <source src="/about-water-3.webm" type="video/webm" />
          <source src="/about-water-3.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative h-full flex flex-col justify-end container-x pb-10 md:pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[clamp(2.1rem,5vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.03em] max-w-5xl"
        >
          <span className="sr-only">{aboutHero.srOnly}</span>
          <span aria-hidden>
            {aboutHero.lead}
            <RotatingWord block text={aboutHero.roles[index]} />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <p className="text-muted-foreground max-w-md text-base md:text-lg leading-relaxed">{aboutHero.line}</p>
          <CircleArrowLink href="/contact" nowrap>
            {aboutHero.cta}
          </CircleArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
