import { cn } from "@/demos/lib/utils";

interface ActiveBadgeProps {
  text: string;
  className?: string;
}

/** A small badge with a pulsing dot, for statuses such as "Available". */
export default function ActiveBadge({ text, className }: ActiveBadgeProps) {
  return (
    <div className={cn("card backdrop-blur flex items-center gap-2 px-3 py-1 rounded", className)}>
      <span className="size-2 rounded-full bg-accent animate-pulsate" />
      <p className="text-sm leading-snug font-medium text-foreground">{text}</p>
    </div>
  );
}
