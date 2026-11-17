"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ButtonVariant =
  | "default"
  | "arrow"
  | "bounce"
  | "bubble"
  | "elastic"
  | "expand"
  | "flip"
  | "magnetic"
  | "pill"
  | "shift"
  | "slide"
  | "stagger";

export type SiteBackground =
  "none" | "aurora" | "cornerGlow" | "floatingGradient" | "gridLines" | "noise" | "noiseGradient";

export type HeroBackground =
  | "none"
  | "cornerGlow"
  | "gradientBars"
  | "horizonGlow"
  | "lightRaysCenter"
  | "lightRaysCorner"
  | "radialGradient";

export interface StyleSettings {
  buttonVariant: ButtonVariant;
  siteBackground: SiteBackground;
  heroBackground: HeroBackground;
}

export const StyleContext = createContext<StyleSettings>({
  buttonVariant: "default",
  siteBackground: "none",
  heroBackground: "none",
});

/** Read the style settings (button variant, backgrounds) of the current template. */
export function useStyle() {
  return useContext(StyleContext);
}

interface StyleProviderProps extends Partial<StyleSettings> {
  children: ReactNode;
}

/** Chooses which button variant and decorative backgrounds the sections below render. */
export default function StyleProvider({
  buttonVariant = "default",
  siteBackground = "none",
  heroBackground = "none",
  children,
}: StyleProviderProps) {
  return (
    <StyleContext.Provider value={{ buttonVariant, siteBackground, heroBackground }}>
      {children}
    </StyleContext.Provider>
  );
}
