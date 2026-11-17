"use client";

import AuroraBackground from "@/demos/components/backgrounds/AuroraBackground";
import CornerGlowBackground from "@/demos/components/backgrounds/CornerGlowBackground";
import FloatingGradientBackground from "@/demos/components/backgrounds/FloatingGradientBackground";
import GridLinesBackground from "@/demos/components/backgrounds/GridLinesBackground";
import NoiseBackground from "@/demos/components/backgrounds/NoiseBackground";
import NoiseGradientBackground from "@/demos/components/backgrounds/NoiseGradientBackground";
import { useStyle } from "@/demos/components/providers/StyleProvider";

/** Renders the page-wide background chosen by the template's StyleProvider, if any. */
export default function SiteBackgroundSlot() {
  const { siteBackground } = useStyle();

  switch (siteBackground) {
    case "aurora":
      return <AuroraBackground position="fixed" />;
    case "cornerGlow":
      return <CornerGlowBackground position="fixed" />;
    case "floatingGradient":
      return <FloatingGradientBackground position="fixed" />;
    case "gridLines":
      return <GridLinesBackground position="fixed" />;
    case "noise":
      return <NoiseBackground position="fixed" />;
    case "noiseGradient":
      return <NoiseGradientBackground position="fixed" />;
    default:
      return null;
  }
}
