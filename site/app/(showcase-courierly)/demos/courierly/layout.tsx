import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import "@/demos/showcase/courierly/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Manrope({ subsets: ["latin"], variable: "--co-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--co-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--co-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Courierly: email that won't go down",
  description:
    "Courierly is an email-sending platform with assisted drafting, scheduling, analytics and a REST API. Concept website with demonstration content.",
};

export default function CourierlyLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="courierly" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="courierly" />
      </body>
    </html>
  );
}
