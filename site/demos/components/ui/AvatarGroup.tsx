import { cn } from "@/demos/lib/utils";

const SIZE_CLASSES = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

interface AvatarGroupProps {
  avatarsSrc: string[];
  /** How many avatars to show before collapsing the rest into a "+N" bubble. */
  max?: number;
  size?: keyof typeof SIZE_CLASSES;
  label?: string;
  labelClassName?: string;
  className?: string;
}

/** A row of overlapping avatars with an optional label next to it. */
export default function AvatarGroup({
  avatarsSrc,
  max = 5,
  size = "md",
  label,
  labelClassName,
  className = "",
}: AvatarGroupProps) {
  const visibleAvatars = avatarsSrc.slice(0, max);
  const hiddenCount = avatarsSrc.length - visibleAvatars.length;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center">
        {visibleAvatars.map((avatarSrc, index) => (
          <div
            key={index}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-full border-2 border-background",
              SIZE_CLASSES[size],
              index > 0 && "-ml-3",
            )}
          >
            <img src={avatarSrc} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
        {hiddenCount > 0 && (
          <div
            className={cn(
              "flex items-center justify-center shrink-0 rounded-full border-2 border-background secondary-button font-medium text-secondary-cta-text -ml-3",
              SIZE_CLASSES[size],
            )}
          >
            +{hiddenCount}
          </div>
        )}
      </div>
      {label && (
        <span className={cn("text-base font-medium text-foreground", labelClassName)}>{label}</span>
      )}
    </div>
  );
}
