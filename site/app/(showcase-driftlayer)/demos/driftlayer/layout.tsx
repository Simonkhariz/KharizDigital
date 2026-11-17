import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Fredoka } from "next/font/google";
import "@/demos/showcase/driftlayer/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-round", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Driftlayer | Intelligence, light as air",
  description:
    "Driftlayer is an ambient assistant layer that sits above your tools, reads context and finishes the busywork before you notice it was there.",
};

export default function DriftlayerLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="driftlayer" className={`${figtree.variable} ${fredoka.variable}`}>
      <body>
        {children}
        <DemoBar slug="driftlayer" />
      </body>
    </html>
  );
}
