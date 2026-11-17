export const navLinks = [
  { label: "Insights", href: "#insights" },
  { label: "Process", href: "#process" },
  { label: "Platform", href: "#platform" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

export type TabKey = "overview" | "sales" | "orders";

export interface InsightTab {
  key: TabKey;
  label: string;
  value: number;
  gain: number;
  note: string;
  chartLabel: string;
  /** Percentages for April to July. */
  bars: [number, number, number, number];
}

/** Figures for the widget stack. The notes are derived from value and gain, so they always agree. */
export const insightTabs: InsightTab[] = [
  {
    key: "overview",
    label: "Overview",
    value: 8458,
    gain: 1124,
    note: "Leads worked this month rose by around 15%",
    chartLabel: "Leads contacted within one day",
    bars: [32.5, 45.5, 75.5, 92.5],
  },
  {
    key: "sales",
    label: "Sales",
    value: 312,
    gain: 58,
    note: "Deals won this month rose by around 23%",
    chartLabel: "Share of monthly sales target reached",
    bars: [41, 52.5, 63, 78],
  },
  {
    key: "orders",
    label: "Orders",
    value: 1946,
    gain: 212,
    note: "Repeat orders this month rose by around 12%",
    chartLabel: "Orders placed without a rep's help",
    bars: [38.5, 49, 66.5, 84.5],
  },
];

export const months = ["Apr", "May", "Jun", "Jul"];

export const benefits = [
  { id: "leads", label: "High-Value Leads", title: "New Leads:", figure: "+1,540", rest: "this month" },
  { id: "predict", label: "Predict Deal Outcomes", title: "Forecast:", figure: "86 deals", rest: "likely to close" },
  { id: "strategy", label: "Optimize Sales Strategy", title: "Best channel:", figure: "41% replies", rest: "by email" },
  { id: "convert", label: "Increase Conversion Rates", title: "Lead to deal:", figure: "3.7%", rest: "up 0.6 points" },
];

export const processSteps = [
  {
    icon: "plug",
    title: "Connect & Integrate",
    text: "Connect your CRM to email, chat and the sales tools your team already uses.",
  },
  {
    icon: "message",
    title: "Automate Outreach",
    text: "Send personal messages at scale, written from each lead's history and timed to their replies.",
  },
  {
    icon: "route",
    title: "Smart Lead Routing",
    text: "Score every lead as it arrives and hand it to the rep most likely to close it.",
  },
] as const;

export const sequence = [
  { day: "Day 1", channel: "Email", text: "Intro with the case that matches their industry" },
  { day: "Day 3", channel: "Chat", text: "Short nudge if the email was opened twice" },
  { day: "Day 6", channel: "Call", text: "Task for the rep, with talking points" },
];

export const routingRules = [
  { id: "r1", when: "Score above 80", then: "Senior rep, same region" },
  { id: "r2", when: "Existing customer", then: "Their account owner" },
  { id: "r3", when: "Out of hours", then: "Reply agent, then round robin" },
];

export const numbers = [
  { value: "8,458", label: "leads worked in the sample month" },
  { value: "3.7%", label: "of those leads became deals" },
  { value: "312", label: "deals won, 58 more than the month before" },
];

export const plans = [
  {
    id: "seed",
    name: "Seed",
    monthly: 24,
    blurb: "One channel and one sequence, for a team finding its rhythm.",
    features: ["2,000 leads a month", "Email outreach", "Lead scoring", "CSV import and export"],
  },
  {
    id: "grove",
    name: "Grove",
    monthly: 54,
    featured: true,
    blurb: "Every channel, routing rules and reports for a full sales team.",
    features: ["20,000 leads a month", "Email, chat and call tasks", "Smart lead routing", "Revenue reports and export", "Priority support"],
  },
  {
    id: "forest",
    name: "Forest",
    monthly: 96,
    blurb: "Several teams, regions and brands on one account.",
    features: ["Unlimited leads", "Team and region workspaces", "Single sign-on", "Dedicated onboarding"],
  },
];

/** Paying yearly costs ten months instead of twelve. */
export const YEARLY_FACTOR = 10 / 12;

export const faqs = [
  {
    question: "Which CRMs can Leadgrove connect to?",
    answer:
      "Any CRM that offers a standard API or CSV export. Set-up is a guided mapping of your fields to ours, and you can run Leadgrove beside your CRM without replacing it.",
  },
  {
    question: "Will automated messages sound like my team?",
    answer:
      "Each sequence starts from templates your reps write. Leadgrove fills in details from the lead's history and holds every first message for approval until you switch that off.",
  },
  {
    question: "How does lead routing decide who gets a lead?",
    answer:
      "Rules you set run in order: score, region, existing ownership and working hours. If no rule matches, the lead goes round robin so that nothing waits unassigned.",
  },
  {
    question: "Can I export my data?",
    answer: "Yes. Every table and report can be exported, and a full account export is available on all plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "The Grove plan is free for 14 days with no card needed. At the end you choose a plan or export your data and leave.",
  },
];
