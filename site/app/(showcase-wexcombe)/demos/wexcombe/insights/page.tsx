import type { Metadata } from "next";
import { InsightsPage } from "@/demos/showcase/wexcombe/components/Pages";

export const metadata: Metadata = { title: "Insights | Wexcombe Partners" };

export default function Page() {
  return <InsightsPage />;
}
