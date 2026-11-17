import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, VT323 } from "next/font/google";
import "@/demos/showcase/runemark/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Geist({ subsets: ["latin"], variable: "--rm-font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--rm-font-mono", display: "swap" });
const pixel = VT323({ subsets: ["latin"], weight: "400", variable: "--rm-font-pixel", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Runemark: one control plane for every agent",
  description: "Runemark deploys, routes and monitors AI agents in production from one place. Concept website with demonstration content.",
};

export default function RunemarkLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="runemark" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body>
        {children}
        <DemoBar slug="runemark" />
      </body>
    </html>
  );
}
