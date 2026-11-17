import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "@/demos/showcase/verdance/styles/base.css";
import "@/demos/showcase/verdance/styles/site.css";
import "@/demos/showcase/verdance/styles/editor.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-verdance-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-verdance-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-verdance-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Verdance | One platform, everything under control",
  description:
    "Verdance is a developer platform with an in-editor assistant, preview environments and staged deploys. Concept website with demonstration content.",
};

export default function VerdanceLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="verdance" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="verdance" />
      </body>
    </html>
  );
}
