import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Mono, Hanken_Grotesk } from "next/font/google";
import "@/demos/showcase/agentway/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--aw-font-sans", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--aw-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Agentway: a field guide to building for agents",
  description:
    "Agentway is a platform for making software that AI agents can find, call and pay for. Concept website with demonstration content.",
};

export default function AgentwayLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="agentway" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="agentway" />
      </body>
    </html>
  );
}
