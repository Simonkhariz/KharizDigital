import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Inter } from "next/font/google";
import "@/demos/showcase/stridehaus/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--sh-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--sh-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Stridehaus: the app for athletes",
  description:
    "Stridehaus is a training app for athletes and coaches: log sessions, track load and get a daily stride score. Concept website with demonstration content.",
};

export default function StridehausLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="stridehaus" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="stridehaus" />
      </body>
    </html>
  );
}
