"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Demo pages that are listed in the portfolio as their own project, although
 * they live inside another demo's folder. Key: page address. Value: project slug.
 */
const SEPARATE_PROJECTS: Record<string, string> = {
  "/demos/closient/dashboard": "closient-dashboard",
  "/demos/denarius/app": "denarius-app",
  "/demos/swiftlet/app": "swiftlet-app",
};

/**
 * Small fixed link shown on every demo website. It takes the visitor back to the project's page
 * on the Khariz Digital site. Styled inline so it looks the same on every demo, whatever that
 * demo's own stylesheet does.
 */
export default function DemoBar({ slug }: { slug: string }) {
  const pathname = usePathname().replace(/\/$/, "");
  const project = SEPARATE_PROJECTS[pathname] ?? slug;

  return (
    <Link
      href={`/work/${project}`}
      aria-label="Back to this project on Khariz Digital"
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 2147483000,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 14px",
        borderRadius: 999,
        background: "rgba(10, 10, 10, 0.88)",
        color: "#fafafa",
        font: '500 12px/1 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        letterSpacing: "0.01em",
        textDecoration: "none",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 6,
          background: "#f05a3c",
          display: "inline-block",
        }}
      />
      <span aria-hidden>←</span> Khariz Digital
    </Link>
  );
}
