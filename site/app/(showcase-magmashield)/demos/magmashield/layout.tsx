import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DotGothic16, Inter } from "next/font/google";
import "@/demos/showcase/magmashield/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Inter({ subsets: ["latin"], variable: "--ms-font-sans", display: "swap" });
const pixel = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--ms-font-pixel", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Magmashield: stop cyber attacks before they happen",
  description:
    "Magmashield uses real-time AI to detect hidden vulnerabilities, stop intrusions and give you 24/7 protection. Concept website with demonstration content.",
};

export default function MagmashieldLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="magmashield" className={`${sans.variable} ${pixel.variable}`}>
      <body>
        {children}
        <DemoBar slug="magmashield" />
      </body>
    </html>
  );
}
