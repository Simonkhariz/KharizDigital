"use client";

import { ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { TODAY, initialDeals, isOpen } from "../../data/crm";
import { formatMoney, getRange, repLeaderboard, weightedForecast } from "../../data/metrics";
import { LogoMark } from "../Logo";

const quarter = getRange("90d");
const topRep = repLeaderboard(initialDeals, quarter, 1)[0];
const dueSoon = initialDeals.filter((deal) => isOpen(deal.stage) && deal.closeDay <= TODAY + 14);

const prompts = [
  {
    question: "Top-performing rep this quarter",
    answer: `${topRep.name} leads the last 90 days with ${formatMoney(topRep.wonRevenue)} won across ${topRep.wonCount} deals.`,
  },
  {
    question: "Predict revenue from the open pipeline",
    answer: `Weighted by stage, the open pipeline is forecast to bring in ${formatMoney(weightedForecast(initialDeals))}.`,
  },
  {
    question: "Find deals that close in the next two weeks",
    answer: `${dueSoon.length} open deals worth ${formatMoney(dueSoon.reduce((sum, deal) => sum + deal.amount, 0))} are due within 14 days.`,
  },
];

export function InsightCard() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="cl-insight">
      <img src="/showcase/closient/portrait.webp" alt="Profile silhouette of a woman with her head tilted up, in black and white" width={900} height={990} />
      <div className="cl-insight-panel">
        <span className="cl-insight-mark">
          <LogoMark size={24} />
        </span>
        <h2>Sell smarter with Closient</h2>
        <p>Ask about the demo workspace. Answers are worked out from its deals.</p>
        <ul>
          {prompts.map((prompt, index) => (
            <li key={prompt.question}>
              <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
                <Sparkles size={13} aria-hidden="true" />
                <span>{prompt.question}</span>
                <ChevronRight size={13} aria-hidden="true" />
              </button>
              {open === index && <p>{prompt.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
