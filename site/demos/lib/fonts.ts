import { Geist, Inter, Inter_Tight, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair-display",
  display: "swap",
});

/** Class names that expose every font as a CSS variable (--font-inter, --font-geist, ...). */
export const fontVariables = [
  inter.variable,
  interTight.variable,
  geist.variable,
  playfairDisplay.variable,
].join(" ");
