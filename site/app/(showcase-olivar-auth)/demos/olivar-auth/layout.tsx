import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "@/demos/showcase/olivar-auth/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--ol-font-display", display: "swap" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--ol-font-serif", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Olivar: create your account",
  description:
    "A working sign-up flow for Olivar: account details, a six-digit email confirmation code and a short onboarding step. Concept web application with demonstration content.",
};

export default function OlivarLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="olivar-auth" className={`${display.variable} ${serif.variable}`}>
      <body>
        {children}
        <DemoBar slug="olivar-auth" />
      </body>
    </html>
  );
}
