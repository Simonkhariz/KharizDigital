import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Jost, Outfit } from "next/font/google";
import "@/demos/showcase/aerelle/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-head", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Aerelle | Skincare with nothing to hide",
  description:
    "Aerelle makes a short range of skincare built on a handful of proven ingredients. Shop the collection or build a routine for your skin.",
};

export default function AerelleLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="aerelle" className={`${outfit.variable} ${jost.variable} ${instrument.variable}`}>
      <body>
        {children}
        <DemoBar slug="aerelle" />
      </body>
    </html>
  );
}
