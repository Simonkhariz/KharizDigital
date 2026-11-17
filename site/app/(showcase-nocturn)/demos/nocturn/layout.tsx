import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "@/demos/showcase/nocturn/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Outfit({ subsets: ["latin"], variable: "--nc-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--nc-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--nc-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Nocturn: the workspace assistant that works the night shift",
  description:
    "Nocturn is a team workspace assistant that clears repetitive work overnight and hands your team a finished list each morning. Concept website with demonstration content.",
};

export default function NocturnLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="nocturn" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="nocturn" />
      </body>
    </html>
  );
}
