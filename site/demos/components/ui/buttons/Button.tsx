"use client";

import { motion } from "motion/react";
import { useStyle } from "@/demos/components/providers/StyleProvider";
import ButtonArrow from "@/demos/components/ui/buttons/ButtonArrow";
import ButtonBounce from "@/demos/components/ui/buttons/ButtonBounce";
import ButtonBubble from "@/demos/components/ui/buttons/ButtonBubble";
import ButtonElastic from "@/demos/components/ui/buttons/ButtonElastic";
import ButtonExpand from "@/demos/components/ui/buttons/ButtonExpand";
import ButtonFlip from "@/demos/components/ui/buttons/ButtonFlip";
import ButtonMagnetic from "@/demos/components/ui/buttons/ButtonMagnetic";
import ButtonPill from "@/demos/components/ui/buttons/ButtonPill";
import ButtonShift from "@/demos/components/ui/buttons/ButtonShift";
import ButtonSlide from "@/demos/components/ui/buttons/ButtonSlide";
import ButtonStagger from "@/demos/components/ui/buttons/ButtonStagger";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { ButtonProps } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** Plain button, used when the template does not pick an animated variant. */
function ButtonDefault({
  text,
  variant = "primary",
  href = "#",
  onClick,
  animate = true,
  animationDelay = 0,
  className = "",
}: ButtonProps) {
  const button = (
    <a
      href={href}
      onClick={useButtonClick(href, onClick)}
      className={cn(
        "flex items-center justify-center h-10 px-6 text-sm rounded cursor-pointer",
        variant === "primary"
          ? "primary-button text-primary-cta-text"
          : "secondary-button text-secondary-cta-text",
        className,
      )}
    >
      {text}
    </a>
  );

  return animate ? (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: animationDelay,
        ease: "easeOut",
      }}
    >
      {button}
    </motion.div>
  ) : (
    button
  );
}

/** Call-to-action link rendered in the button variant chosen by the template's StyleProvider. */
export default function Button(props: ButtonProps) {
  const { buttonVariant } = useStyle();

  switch (buttonVariant) {
    case "arrow":
      return <ButtonArrow {...props} />;
    case "bounce":
      return <ButtonBounce {...props} />;
    case "bubble":
      return <ButtonBubble {...props} />;
    case "elastic":
      return <ButtonElastic {...props} />;
    case "expand":
      return <ButtonExpand {...props} />;
    case "flip":
      return <ButtonFlip {...props} />;
    case "magnetic":
      return <ButtonMagnetic {...props} />;
    case "pill":
      return <ButtonPill {...props} />;
    case "shift":
      return <ButtonShift {...props} />;
    case "slide":
      return <ButtonSlide {...props} />;
    case "stagger":
      return <ButtonStagger {...props} />;
    default:
      return <ButtonDefault {...props} />;
  }
}
