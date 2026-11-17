import type { Metadata } from "next";
import { BankApp } from "@/demos/showcase/denarius/components/app/BankApp";
import "@/demos/showcase/denarius/components/Site.css";
import "@/demos/showcase/denarius/components/app/App.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Denarius web app: accounts, budgets and payments",
  description:
    "A working personal-finance web application: accounts, searchable transactions, a spending breakdown, editable budgets, card controls and a send-money flow. Concept application with demonstration data.",
};

export default function DenariusAppPage() {
  return <BankApp />;
}
