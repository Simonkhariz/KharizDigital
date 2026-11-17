import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import "@/demos/showcase/substrata/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--sb-font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--sb-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Substrata: persistent machines for autonomous software",
  description:
    "Substrata gives every agent, workflow and user its own always-on virtual machine that boots in half a second. Concept website with demonstration content.",
};

export default function SubstrataLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="substrata" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="substrata" />
      </body>
    </html>
  );
}
