import type { Metadata } from "next";
import { MailApp } from "@/demos/showcase/swiftlet/components/app/MailApp";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Swiftlet Mail: a keyboard-first inbox (demo application)",
  description:
    "A working keyboard-first mail client: folders, search, reading pane, compose and one-key actions. Demonstration data, kept in memory.",
};

export default function SwiftletMailPage() {
  return <MailApp />;
}
