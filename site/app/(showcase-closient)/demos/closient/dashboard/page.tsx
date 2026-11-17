import type { Metadata } from "next";
import { DashboardApp } from "@/demos/showcase/closient/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "Closient dashboard: pipeline, deals and revenue",
  description:
    "Working sales dashboard for the Closient concept: KPIs, revenue and pipeline charts, a deals table and a pipeline board. Demonstration data only.",
};

export default function ClosientDashboardPage() {
  return <DashboardApp />;
}
