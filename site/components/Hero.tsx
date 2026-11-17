"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { hero } from "@/content/site";
import { EASE } from "./motion";
import { RotatingWord } from "./RotatingWord";
import { CircleArrowLink } from "./links";

const MEDIA =
  "absolute inset-x-0 top-0 w-full h-auto md:h-full md:object-cover [mask-image:linear-gradient(to_bottom,black_62%,transparent_100%)] md:[mask-image:none]";
const FADE_MASK = "linear-gradient(to bottom, black 0%, black 58%, transparent 94%)";

export function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Show the poster until the video is really playing, and retry play() on
  // the first interaction for browsers that block autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);
    if (!video.paused && video.readyState > 2) setPlaying(true);
    const tryPlay = () => void video.play().catch(() => {});
    tryPlay();
    const events = ["touchend", "click", "keydown", "scroll"];
    events.forEach((e) => window.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => {
      video.removeEventListener("playing", onPlaying);
      events.forEach((e) => window.removeEventListener(e, tryPlay));
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % hero.pairs.length), 2800);
    return () => clearInterval(timer);
  }, []);

  const [what, who] = hero.pairs[index];

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-background">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "multiply", maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-poster.jpg" alt="" className={MEDIA} />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`${MEDIA} transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/hero-shadows.webm" type="video/webm" />
          <source src="/hero-shadows.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative h-full flex flex-col justify-end container-x pb-10 md:pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[clamp(2.1rem,5vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.03em] max-w-5xl"
        >
          <span className="sr-only">{hero.srOnly}</span>
          <span aria-hidden>
            {hero.lead} <RotatingWord text={what} />
            <br />
            {hero.joiner} <RotatingWord text={who} />.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <p className="text-muted-foreground max-w-md text-base md:text-lg leading-relaxed">{hero.line}</p>
          <CircleArrowLink href="#work" direction="down" nowrap>
            {hero.cta}
          </CircleArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
