import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Inter } from "next/font/google";
import "@/demos/showcase/indigen/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--ig-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--ig-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Indigen: agents that run your business workflows",
  description:
    "Indigen is an automation consultancy that builds and operates agents inside the systems a company already uses. Concept website with demonstration content.",
};

export default function IndigenLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="indigen" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="indigen" />
      </body>
    </html>
  );
}
