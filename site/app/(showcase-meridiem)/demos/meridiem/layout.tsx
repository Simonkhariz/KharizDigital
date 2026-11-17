import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "@/demos/showcase/meridiem/styles/base.css";
import "@/demos/showcase/meridiem/styles/site.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-meridiem-serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-meridiem-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-meridiem-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Meridiem | The reasoning model built for what matters",
  description:
    "Meridiem is a reasoning-model API that works through problems carefully before it answers. Concept website with demonstration content.",
};

export default function MeridiemLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="meridiem" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="meridiem" />
      </body>
    </html>
  );
}
