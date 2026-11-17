import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree } from "next/font/google";
import "@/demos/showcase/verdia/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Figtree({ subsets: ["latin"], variable: "--vd-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Verdia: know your health, before you have to",
  description:
    "Verdia turns a routine blood test into a biological age, clear category scores and plain-language explanations. Concept website with demonstration content.",
};

export default function VerdiaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="verdia" className={sans.variable}>
      <body>
        {children}
        <DemoBar slug="verdia" />
      </body>
    </html>
  );
}
