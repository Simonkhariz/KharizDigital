import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, JetBrains_Mono, Manrope } from "next/font/google";
import "@/demos/showcase/fiscara/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--fs-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--fs-font-mono", display: "swap" });
// The dashboard widgets are set in their own interface face, as in the product.
const ui = Manrope({ subsets: ["latin"], variable: "--fs-font-ui", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Fiscara: smarter financial management",
  description:
    "Fiscara helps finance managers automate manual work, see performance in real time and close the books sooner. Concept website with demonstration content.",
};

export default function FiscaraLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="fiscara" className={`${sans.variable} ${mono.variable} ${ui.variable}`}>
      <body>
        {children}
        <DemoBar slug="fiscara" />
      </body>
    </html>
  );
}
