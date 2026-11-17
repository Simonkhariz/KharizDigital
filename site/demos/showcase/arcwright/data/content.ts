export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
];

export const hero = {
  chip: "Automation you can count on.",
  title: "Agents That Think,",
  titleAccent: "Automate & Deliver",
  body: "Arcwright builds and deploys agents inside the systems your company already uses, handling complete workflows from intake to resolution.",
};

export type AgentId = "operations" | "sales" | "support";

export type Agent = {
  id: AgentId;
  name: string;
  summary: string;
  /** Rows shown on the "Agents in action" screen in the hero illustration. */
  tasks: string[];
  /** Bar heights (0 to 1) for the small chart on that screen. */
  trend: number[];
  headline: string;
  body: string;
  outcomes: { value: string; label: string }[];
  connects: string[];
};

export const agents: Agent[] = [
  {
    id: "operations",
    name: "Operations Agent",
    summary: "Reconciles orders, stock and invoices across your systems overnight.",
    tasks: ["Orders matched", "Stock corrected", "Invoices posted"],
    trend: [0.3, 0.42, 0.5, 0.7, 0.92],
    headline: "Close the day's books before anyone logs in.",
    body: "The Operations Agent reads orders, shipments and supplier invoices, matches them line by line and posts the result. Anything it cannot match is queued for a person with the evidence attached.",
    outcomes: [
      { value: "94%", label: "of invoices matched without review" },
      { value: "6 h", label: "saved per finance analyst each week" },
    ],
    connects: ["ERP", "Warehouse system", "Supplier inbox", "Ledger"],
  },
  {
    id: "sales",
    name: "Sales Agent",
    summary: "Researches, qualifies and books every inbound lead within minutes.",
    tasks: ["Lead enriched", "Fit scored", "Meeting booked"],
    trend: [0.25, 0.5, 0.45, 0.75, 0.85],
    headline: "Answer every lead while the intent is still warm.",
    body: "The Sales Agent enriches each enquiry, scores it against rules your revenue team writes, replies in your voice and books the right rep. Your CRM is updated before the first call.",
    outcomes: [
      { value: "3 min", label: "median time to first reply" },
      { value: "+28%", label: "more qualified meetings per month" },
    ],
    connects: ["CRM", "Calendar", "Email", "Enrichment data"],
  },
  {
    id: "support",
    name: "Support Agent",
    summary: "Resolves routine tickets end to end and hands over the rest with context.",
    tasks: ["Ticket classified", "Refund issued", "Customer updated"],
    trend: [0.4, 0.38, 0.6, 0.72, 0.95],
    headline: "Resolve the routine and escalate the rest, with context.",
    body: "The Support Agent reads the ticket, checks the order and the policy, takes the action it is allowed to take and writes back. Edge cases reach your team with a summary and a suggested reply.",
    outcomes: [
      { value: "61%", label: "of tickets resolved without a hand-off" },
      { value: "24/7", label: "coverage in eleven languages" },
    ],
    connects: ["Help desk", "Order system", "Payments", "Knowledge base"],
  },
];

export const sources = ["Your Systems", "Documents", "Apps & Tools"] as const;

export const reliable = {
  chip: "Automation you can count on.",
  title: "Reliable automation at every scale.",
  body: "Deploy agents that handle complex workflows, connect your tools, and scale with your business.",
  blockTitle: "Built for agents that deliver.",
  blockBody: "Reliable, scalable automation that takes your agents from simple tasks to complex business workflows.",
  checklist: [
    "Execute workflows around the clock",
    "Connect tools and systems effortlessly",
    "Scale automation as your business grows",
  ],
  stats: [
    { value: "99.98%", label: "workflow uptime over the last 12 months" },
    { value: "41m", label: "tasks executed by Arcwright agents" },
    { value: "180+", label: "systems with a maintained connector" },
    { value: "< 2 s", label: "median time for an agent to pick up a task" },
  ],
};

export type Feature = { icon: "route" | "shield" | "history" | "plug" | "gauge" | "users"; title: string; body: string };

export const features: Feature[] = [
  { icon: "route", title: "Workflow planner", body: "Agents break a goal into steps, choose the tools for each and recover on their own when a step fails." },
  { icon: "shield", title: "Guardrails and limits", body: "Set what an agent may read, change and spend. Anything outside the limits waits for approval." },
  { icon: "history", title: "Complete audit trail", body: "Every decision, tool call and message is recorded and searchable, so reviews take minutes." },
  { icon: "plug", title: "Connectors", body: "More than 180 maintained connectors, plus a simple way to wrap your internal services." },
  { icon: "gauge", title: "Live evaluation", body: "Agents are scored against your own test cases on every change before they touch production." },
  { icon: "users", title: "Human hand-off", body: "When confidence drops, work is routed to the right person with a summary and a suggested next step." },
];

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  monthly: number | null;
  yearly: number | null;
  unit: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

/** Yearly prices are per month, billed annually (two months free). */
export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    blurb: "One agent on one workflow, for teams proving the case.",
    monthly: 1200,
    yearly: 1000,
    unit: "per month",
    features: ["1 production agent", "Up to 20,000 tasks a month", "12 connectors", "Email support"],
    cta: "Start with Launch",
  },
  {
    id: "scale",
    name: "Scale",
    blurb: "Several agents working across departments.",
    monthly: 4800,
    yearly: 4000,
    unit: "per month",
    features: ["Up to 8 production agents", "250,000 tasks a month", "All connectors", "Approval flows and audit export", "Shared channel with our engineers"],
    cta: "Start with Scale",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "Private deployment, custom limits and a named team.",
    monthly: null,
    yearly: null,
    unit: "annual agreement",
    features: ["Unlimited agents", "Deployment in your cloud", "Single sign-on and role mapping", "99.99% uptime commitment"],
    cta: "Talk to us",
  },
];

/** Invented customer names, set in type. */
export const customers = ["Northwind Freight", "Halden Bank", "Orbit Health", "Kestrel Supply", "Maple & Finch", "Tidewater Energy"];

export const customerStats = [
  { value: "312", label: "companies run Arcwright agents in production" },
  { value: "9 days", label: "median time from contract to first live workflow" },
  { value: "4.3x", label: "average first-year return reported in customer reviews" },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What does an Arcwright agent actually do?",
    a: "It takes a workflow that a person does today, such as resolving a late order, and carries it out across your systems: reading the request, checking records, taking the action and confirming the result.",
  },
  {
    q: "How do agents connect to our systems?",
    a: "Through maintained connectors for common tools and through your own interfaces for internal services. Access is scoped per agent and can be read-only until you are ready.",
  },
  {
    q: "What stops an agent from making an expensive mistake?",
    a: "Limits and approvals. You set what each agent can change and how much it can spend. Actions above a limit wait for a named approver, and every action can be reversed from the audit trail.",
  },
  {
    q: "Where does our data live?",
    a: "In the region you choose. Enterprise customers can run the whole platform inside their own cloud account. Data is never used to train shared models.",
  },
  {
    q: "How is a task counted for billing?",
    a: "A task is one completed unit of work, for example one ticket resolved or one invoice matched. Steps, retries and tool calls inside a task are not counted separately.",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: "#customers" },
      { label: "Questions", href: "#faq" },
      { label: "Book a demo", href: "#demo" },
    ],
  },
];
