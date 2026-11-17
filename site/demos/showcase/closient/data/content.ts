export const DASHBOARD_PATH = "/demos/closient/dashboard/";

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

export const resourceLinks = [
  { label: "Live dashboard demo", text: "Explore a working workspace", href: DASHBOARD_PATH },
  { label: "Results", text: "Figures from the demo workspace", href: "#results" },
  { label: "Questions", text: "Security, data and set-up", href: "#faq" },
];

export const clients = ["Haldane", "orbitly", "Pennant", "marlowe", "tessel"];

export const features = [
  {
    id: "qualify",
    eyebrow: "Qualify",
    title: "Every inbound lead scored before your first coffee",
    text: "The qualification agent reads the form, the company profile and past conversations, then scores the lead and writes the first reply for a rep to approve.",
  },
  {
    id: "hygiene",
    eyebrow: "Keep current",
    title: "A pipeline that updates itself after each call",
    text: "Call notes and emails become stage changes, next steps and close dates. Reps review a short list of suggestions instead of filling in fields.",
  },
  {
    id: "forecast",
    eyebrow: "Forecast",
    title: "A forecast you can trace back to the deals behind it",
    text: "Each open deal is weighted by stage and history, so the number in the board meeting matches the number in the pipeline.",
  },
] as const;

export const leadScores = [
  { company: "Tessel Robotics", detail: "Asked for pricing, 40 seats", score: 92 },
  { company: "Quillpoint Media", detail: "Downloaded the forecasting guide", score: 74 },
  { company: "Ironleaf Cycles", detail: "Newsletter sign-up", score: 31 },
];

export const suggestions = [
  { id: "s1", deal: "Northfold Bank", change: "Move to Proposal", reason: "Pricing sent after Tuesday's call" },
  { id: "s2", deal: "Solvane Travel", change: "Close date to 12 Dec", reason: "Legal review takes two weeks" },
  { id: "s3", deal: "Calyx Biotech", change: "Add next step", reason: "Security questionnaire requested" },
];

export const steps = [
  {
    title: "Connect your inbox and calendar",
    text: "Closient reads the conversations your team already has. Set-up takes about ten minutes and no data is moved out of your mail provider.",
  },
  {
    title: "Choose what the agents may do",
    text: "Start with suggestions only, then let agents update fields, draft replies or book meetings once you trust their work.",
  },
  {
    title: "Review, approve and sell",
    text: "Each morning reps get a short review list. Everything an agent changed is logged against the deal, with the source it was taken from.",
  },
];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For a founder or a first sales hire.",
    monthly: 30,
    features: ["1 qualification agent", "Up to 3 seats", "Pipeline board and deals table", "Email and calendar sync"],
  },
  {
    id: "team",
    name: "Team",
    blurb: "For a sales team that reports a forecast.",
    monthly: 60,
    featured: true,
    features: ["All three agents", "Unlimited seats", "Weighted forecast and reports", "Approval rules for agent actions", "Priority support"],
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "For several teams and regions.",
    monthly: 96,
    features: ["Everything in Team", "Regional quotas and roll-ups", "Single sign-on", "Audit log export", "A named success manager"],
  },
];

/** Annual billing takes two months off the yearly total. */
export const ANNUAL_FACTOR = 10 / 12;

export const faqs = [
  {
    question: "What can an agent do without asking?",
    answer:
      "Nothing, until you say so. Every workspace starts in suggestion mode, where agents only propose changes. You can then allow specific actions, such as updating a close date, per team.",
  },
  {
    question: "Which tools does Closient connect to?",
    answer:
      "Mail and calendar providers that support standard sign-in, plus CSV import and export for everything else. Your existing CRM records can be imported in one pass.",
  },
  {
    question: "How is the forecast calculated?",
    answer:
      "Each open deal is multiplied by the likelihood of its stage: 10% for a lead, 30% once qualified, 55% at proposal and 80% in negotiation. You can see the same sum in the dashboard demo.",
  },
  {
    question: "Is my customer data used to train models?",
    answer: "No. Conversation data is processed to produce suggestions for your workspace only and is deleted when you remove the connection.",
  },
  {
    question: "Can I try it with my own team first?",
    answer: "Yes. The trial runs for 14 days on the Team plan with no card required, and you can export everything if you decide not to continue.",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
      { label: "Dashboard demo", href: DASHBOARD_PATH },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Results", href: "#results" },
      { label: "Questions", href: "#faq" },
    ],
  },
];
