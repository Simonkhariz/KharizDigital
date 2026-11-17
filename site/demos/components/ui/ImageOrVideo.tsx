import { cn } from "@/demos/lib/utils";

interface ImageOrVideoProps {
  imageSrc?: string;
  /** When set, a muted looping video is shown instead of the image. */
  videoSrc?: string;
  className?: string;
}

/** Renders a looping video when `videoSrc` is given, otherwise the image. */
export default function ImageOrVideo({ imageSrc, videoSrc, className = "" }: ImageOrVideoProps) {
  return videoSrc ? (
    <video
      src={videoSrc}
      aria-label={videoSrc}
      className={cn("w-full h-full min-h-0 object-cover rounded", className)}
      autoPlay
      loop
      muted
      playsInline
    />
  ) : imageSrc ? (
    <img
      src={imageSrc}
      alt={imageSrc}
      className={cn("w-full h-full min-h-0 object-cover rounded", className)}
    />
  ) : null;
}
