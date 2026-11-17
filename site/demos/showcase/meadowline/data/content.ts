import type { PaletteName } from "./palettes";

export const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Use", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blogs", href: "#journal" },
] as const;

export const heroStats = [
  { value: "120K+", label: "Hours Automated" },
  { value: "98%", label: "Process Accuracy" },
  { value: "500+", label: "Workflows Deployed" },
] as const;

export const clientMarks = [
  { name: "Norfelde", style: "heavy" },
  { name: "Haldenby", style: "script" },
  { name: "Brightwether", style: "ring" },
  { name: "TALLISK", style: "slant" },
  { name: "Orchardry", style: "stack" },
  { name: "Fennick & Rowe", style: "shield" },
  { name: "Kestrelane", style: "shield" },
  { name: "Lowmoor", style: "heavy" },
  { name: "Pinecrof", style: "script" },
  { name: "Solvane", style: "ring" },
  { name: "MARROWFIELD", style: "slant" },
] as const;

export type ClientMarkStyle = (typeof clientMarks)[number]["style"];

export type Reason = {
  id: string;
  title: string;
  text: string;
  icon: "bolt" | "target" | "layers" | "chart" | "plug" | "shield";
  palette: PaletteName;
  solid?: boolean;
};

export const reasons: Record<"left" | "centre" | "right", Reason[]> = {
  left: [
    {
      id: "predictable",
      title: "Predictable Results",
      text: "Every workflow is tested to deliver consistent results.",
      icon: "target",
      palette: "lake",
    },
    {
      id: "scalable",
      title: "Scalable Modules",
      text: "Add modules as you grow. No rebuilds, no tech debt.",
      icon: "chart",
      palette: "indigo",
    },
  ],
  centre: [
    {
      id: "fast",
      title: "Fast Implementation",
      text: "Go live in hours, not weeks with no complex setup.",
      icon: "bolt",
      palette: "spring",
      solid: true,
    },
    {
      id: "plug",
      title: "Plug & Play Integration",
      text: "Connect your favorite tools in just a few clicks.",
      icon: "plug",
      palette: "forest",
    },
  ],
  right: [
    {
      id: "prebuilt",
      title: "Pre-built Workflows",
      text: "Ready-to-use workflows for your team and industry.",
      icon: "layers",
      palette: "amber",
    },
    {
      id: "managed",
      title: "Fully Managed",
      text: "We monitor, maintain, and optimize everything for you.",
      icon: "shield",
      palette: "violet",
    },
  ],
};

export const goals = [
  { id: "revenue", title: "Increase Revenue By +25%", progress: 50, owner: "rust" },
  { id: "onboarding", title: "Cut onboarding time to 3 days", progress: 30, owner: "ink" },
] as const;

export const assistantReplies = [
  {
    id: "track",
    question: "Is this project on track?",
    answer: "Yes, everything is on track. 2 tasks are due this week.",
  },
  {
    id: "blocked",
    question: "What is blocked?",
    answer: "One approval is waiting on the client. I sent a reminder at 9:00.",
  },
  {
    id: "next",
    question: "What should I do next?",
    answer: "Review the 6 pending follow-ups. It takes about four minutes.",
  },
] as const;

export const teams = [
  { id: "product", name: "Product Members", count: 32 },
  { id: "design", name: "Design Members", count: 12 },
  { id: "operations", name: "Operations Members", count: 18 },
] as const;

export type UseCase = {
  id: string;
  label: string;
  icon: "founder" | "agency" | "solo";
  text: string;
  suggestion: string;
  detail: string;
  question: string;
  answer: string;
};

export const useCases: UseCase[] = [
  {
    id: "founders",
    label: "Founders",
    icon: "founder",
    text: "Run your business without getting stuck in operations. Meadowline automates repetitive workflows so you can focus on growth.",
    suggestion: "You have 3 investor updates to approve.",
    detail: "The drafts are ready. Review and send before Friday's close.",
    question: "How is runway looking?",
    answer: "14 months at current spend. Two invoices are overdue.",
  },
  {
    id: "agencies",
    label: "Agencies",
    icon: "agency",
    text: "Manage clients, approvals, and communication effortlessly. Meadowline keeps everything streamlined from onboarding to delivery.",
    suggestion: "You have 6 pending follow-ups.",
    detail: "Review and take action to keep projects moving.",
    question: "Is this project on track?",
    answer: "Yes, everything is on track. 2 tasks are due this week.",
  },
  {
    id: "solo",
    label: "Solo Professionals",
    icon: "solo",
    text: "Stay organized without extra tools or complexity. Meadowline helps you manage tasks, follow-ups, and daily workflows.",
    suggestion: "You have 2 proposals awaiting a reply.",
    detail: "I can send a polite nudge to both contacts this afternoon.",
    question: "What is due today?",
    answer: "One invoice and a 15:00 call. Everything else can wait.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Connect Your Data",
    text: "Bring files, sheets and databases from the tools you already use into one system.",
  },
  {
    number: "02",
    title: "Analyze and Optimize",
    text: "We map each workflow, measure where time is lost and tune it until it runs clean.",
  },
  {
    number: "03",
    title: "Let AI Work",
    text: "Streamline tasks and enhance productivity with AI.",
  },
] as const;

export const processMetrics = [
  { label: "Tasks", value: "128" },
  { label: "Accuracy", value: "98%" },
  { label: "Time Saved", value: "32h" },
] as const;

export const outcomes = [
  {
    team: "Agency teams",
    size: "10 to 40 people",
    metric: "31 h",
    metricLabel: "saved per week on average",
    text: "Client onboarding drops from nine manual steps to three. Approvals are chased automatically, so account managers stop living in their inbox.",
    palette: "amber" as PaletteName,
  },
  {
    team: "Founder-led companies",
    size: "2 to 15 people",
    metric: "4.2x",
    metricLabel: "faster investor and board reporting",
    text: "Monthly numbers are collected, reconciled and drafted before the founder opens the report. One review, one click to send.",
    palette: "spring" as PaletteName,
  },
  {
    team: "Solo professionals",
    size: "1 person",
    metric: "0",
    metricLabel: "missed follow-ups in a typical month",
    text: "Proposals, invoices and reminders run on a schedule. The day starts with a short list of what actually needs a human.",
    palette: "violet" as PaletteName,
  },
] as const;

export type Plan = {
  id: string;
  name: string;
  summary: string;
  monthly: number;
  annual: number;
  workflows: string;
  features: string[];
  featured?: boolean;
};

/** Annual prices are per month, billed yearly, and 20% below monthly. */
export const plans: Plan[] = [
  {
    id: "seed",
    name: "Seed",
    summary: "For solo professionals automating their first routines.",
    monthly: 45,
    annual: 36,
    workflows: "Up to 5 workflows",
    features: ["Pre-built workflow library", "Meadowline AI assistant", "Email support, replies in one day"],
  },
  {
    id: "grove",
    name: "Grove",
    summary: "For founders and small teams running daily operations.",
    monthly: 140,
    annual: 112,
    workflows: "Up to 25 workflows",
    features: [
      "Everything in Seed",
      "Custom workflow design sessions",
      "Team roles and approvals",
      "Weekly optimization report",
    ],
    featured: true,
  },
  {
    id: "valley",
    name: "Valley",
    summary: "For agencies managing many clients and pipelines.",
    monthly: 390,
    annual: 312,
    workflows: "Unlimited workflows",
    features: [
      "Everything in Grove",
      "Client workspaces",
      "Fully managed monitoring",
      "Dedicated automation lead",
    ],
  },
];

export const articles = [
  {
    id: "audit",
    category: "Guides",
    readTime: "6 min read",
    title: "How to audit a workflow before you automate it",
    excerpt: "Automating a messy process only makes the mess faster. A four-question audit to run first.",
    body: [
      "Before anything is automated, write the workflow down as it really happens, not as the handbook says it happens. Count the steps, the people and the tools involved.",
      "Then ask four questions of every step: does it need judgement, does it wait on someone, does it copy data between tools, and what breaks if it is skipped. Steps that only copy or wait are the first candidates.",
      "Finally, measure one week of the manual process. Without a baseline you cannot tell whether the automation helped.",
    ],
    palette: "spring" as PaletteName,
  },
  {
    id: "handoffs",
    category: "Operations",
    readTime: "4 min read",
    title: "Five client handoffs every agency should automate",
    excerpt: "From signed proposal to first invoice: the handoffs where work most often stalls.",
    body: [
      "Most agency delays happen between people, not during the work itself. The five handoffs worth automating first are: proposal to kickoff, kickoff to brief, draft to approval, approval to delivery and delivery to invoice.",
      "Each one has a clear trigger and a clear owner, which makes it a good fit for a workflow. Start with approvals: an automatic reminder after two working days removes most of the chasing.",
    ],
    palette: "amber" as PaletteName,
  },
  {
    id: "assistant",
    category: "Product",
    readTime: "5 min read",
    title: "What an AI assistant should and should not decide",
    excerpt: "A simple rule for drawing the line between suggestions and actions.",
    body: [
      "Our rule is short: the assistant may prepare anything, and may complete anything that can be undone. Everything else is a suggestion that waits for a person.",
      "Drafting a follow-up, sorting an inbox or rescheduling an internal task can be reversed, so the assistant does them. Sending a contract or issuing a refund cannot, so it asks first.",
      "Keeping that line visible in the product is what lets teams trust the automation they did not build themselves.",
    ],
    palette: "violet" as PaletteName,
  },
] as const;

export const faqs = [
  {
    question: "How long does it take to go live?",
    answer:
      "Pre-built workflows are usually live the same day. A custom workflow takes one to two weeks: a mapping session, a build, and a test run with your real data.",
  },
  {
    question: "Which tools can Meadowline connect to?",
    answer:
      "Most tools with an API or an export: mail, calendars, spreadsheets, storage drives, CRMs, invoicing and project boards. If a tool has neither, we tell you before you sign up.",
  },
  {
    question: "Do we need a developer on our side?",
    answer:
      "No. We design, build and maintain the workflows. Your team approves the logic in plain language and reviews results in the dashboard.",
  },
  {
    question: "What happens when a workflow fails?",
    answer:
      "The run pauses, nothing is sent twice, and the owner gets a message that says what stopped and why. On Grove and Valley plans we fix it for you.",
  },
  {
    question: "Can we change plans later?",
    answer:
      "Yes. You can move up or down at the end of any billing period, and annual plans can be upgraded at any time with the difference pro-rated.",
  },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Core features", href: "#features" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Process", href: "#process" },
      { label: "Results", href: "#results" },
      { label: "Journal", href: "#journal" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Questions", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
] as const;
