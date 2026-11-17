import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "@/demos/showcase/helmdeck/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--hd-font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--hd-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--hd-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Helmdeck 2.0: the command center for engineering teams",
  description:
    "Helmdeck is a desktop command center that brings your editor, pipelines and an assistant into one window. Concept website with demonstration content.",
};

export default function HelmdeckLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="helmdeck" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="helmdeck" />
      </body>
    </html>
  );
}
