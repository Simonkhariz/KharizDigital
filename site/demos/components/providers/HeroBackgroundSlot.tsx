"use client";

import CornerGlowBackground from "@/demos/components/backgrounds/CornerGlowBackground";
import GradientBarsBackground from "@/demos/components/backgrounds/GradientBarsBackground";
import HorizonGlowBackground from "@/demos/components/backgrounds/HorizonGlowBackground";
import LightRaysCenterBackground from "@/demos/components/backgrounds/LightRaysCenterBackground";
import LightRaysCornerBackground from "@/demos/components/backgrounds/LightRaysCornerBackground";
import RadialGradientBackground from "@/demos/components/backgrounds/RadialGradientBackground";
import { useStyle } from "@/demos/components/providers/StyleProvider";

/** Renders the hero background chosen by the template's StyleProvider, if any. */
export default function HeroBackgroundSlot() {
  const { heroBackground } = useStyle();

  switch (heroBackground) {
    case "cornerGlow":
      return <CornerGlowBackground position="absolute" />;
    case "gradientBars":
      return <GradientBarsBackground position="absolute" />;
    case "horizonGlow":
      return <HorizonGlowBackground position="absolute" />;
    case "lightRaysCenter":
      return <LightRaysCenterBackground position="absolute" />;
    case "lightRaysCorner":
      return <LightRaysCornerBackground position="absolute" />;
    case "radialGradient":
      return <RadialGradientBackground position="absolute" />;
    default:
      return null;
  }
}
