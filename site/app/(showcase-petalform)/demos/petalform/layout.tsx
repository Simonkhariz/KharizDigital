import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "@/demos/showcase/petalform/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Manrope({ subsets: ["latin"], variable: "--pf-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--pf-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Petalform: generate content that attracts organic traffic",
  description:
    "Petalform turns a keyword or product URL into SEO-ready articles, landing pages and newsletters. Concept website with demonstration content.",
};

export default function PetalformLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="petalform" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="petalform" />
      </body>
    </html>
  );
}
