"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/demos/lib/utils";

interface ImageOrVideoProps {
  imageSrc?: string;
  /** When set, a muted looping video is shown instead of the image. */
  videoSrc?: string;
  className?: string;
}

/**
 * The first frame of a video, saved next to it as `<name>-poster.jpg` by
 * `npm run videos` (scripts/optimize-videos.mjs).
 */
export function videoPoster(videoSrc: string) {
  return videoSrc.replace(/\.[a-z0-9]+$/i, "-poster.jpg");
}

/**
 * A muted looping video that shows its first frame straight away, downloads
 * nothing until it is near the screen, and pauses while it is off screen.
 */
function LazyVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNearScreen = useInView(videoRef, { margin: "200px 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (isNearScreen) {
      // Rejected when the browser blocks autoplay (e.g. low-power mode); the poster stays.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isNearScreen]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={videoPoster(src)}
      preload="none"
      aria-hidden="true"
      className={className}
      loop
      muted
      playsInline
    />
  );
}

/** Renders a looping video when `videoSrc` is given, otherwise the image. */
export default function ImageOrVideo({ imageSrc, videoSrc, className = "" }: ImageOrVideoProps) {
  const classes = cn("w-full h-full min-h-0 object-cover rounded", className);
  return videoSrc ? (
    <LazyVideo src={videoSrc} className={classes} />
  ) : imageSrc ? (
    <img src={imageSrc} alt={imageSrc} className={classes} />
  ) : null;
}
