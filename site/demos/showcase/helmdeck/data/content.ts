export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#stack" },
  { label: "About", href: "#numbers" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const clients = [
  { name: "LEDGERLY", mark: "envelope", tone: "#f3d78a" },
  { name: "OKTAVE", mark: "disc", tone: "#8fd3d8" },
  { name: "VOLTRIX", mark: "bolt", tone: "#1e1e1e" },
  { name: "SERELLO", mark: "loop", tone: "#a9d79a" },
  { name: "quorva", mark: "ring", tone: "#a9bfe6" },
] as const;

export type ClientMark = (typeof clients)[number]["mark"];

export const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "500ms", label: "Global latency" },
  { value: "25k+", label: "Teams scaling" },
] as const;

export type Integration = {
  id: string;
  icon: "cloud" | "code" | "database" | "mail" | "chat" | "pipeline";
  name: string;
  status: string;
  summary: string;
  command: string;
};

export const integrations: Integration[] = [
  {
    id: "cloud",
    icon: "cloud",
    name: "Cloud runtimes",
    status: "3 regions linked",
    summary:
      "Helmdeck reads your deploy targets and shows every environment in one sidebar. Promote a build from staging to production without leaving the editor.",
    command: "helm deploy --env production",
  },
  {
    id: "code",
    icon: "code",
    name: "Source control",
    status: "214 repositories indexed",
    summary:
      "Branches, reviews and blame are indexed locally, so Helm AI can answer questions about why a line exists and who last changed it.",
    command: "helm review --branch auth-refactor",
  },
  {
    id: "database",
    icon: "database",
    name: "Databases",
    status: "Schema synced 2 min ago",
    summary:
      "Schemas stay in sync with the editor. Autocomplete knows your tables and columns, and migrations are checked against production before they run.",
    command: "helm db diff --against production",
  },
  {
    id: "mail",
    icon: "mail",
    name: "Alerts and mail",
    status: "On-call routing active",
    summary:
      "Incidents arrive next to the code that caused them. Acknowledge, assign and reply to the thread from the command palette.",
    command: "helm alerts ack --latest",
  },
  {
    id: "chat",
    icon: "chat",
    name: "Team chat",
    status: "12 channels connected",
    summary:
      "Share a snippet, a diff or a terminal session to any channel with one shortcut. Replies come back as comments on the exact line.",
    command: "helm share --channel platform",
  },
  {
    id: "pipeline",
    icon: "pipeline",
    name: "CI pipelines",
    status: "Last run passed in 452ms",
    summary:
      "Every pipeline run is a tab. Failed steps open at the failing line with the log beside it, and Helm AI proposes a fix you can apply or discard.",
    command: "helm ci rerun --failed",
  },
];

export const releaseNote = {
  version: "Release notes, 2.0",
  title: "Orchestration without the manual wiring",
  text: "In 2.0 the assistant reads your whole workspace before it suggests a change. In our own benchmark project, a token-handling refactor across 14 files took one review pass instead of an afternoon of manual configuration.",
};

export type Plan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  dialog: "signup" | "expert";
  primary?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "/mo",
    features: ["Up to 3 users", "5GB Vector Storage", "Community Support"],
    cta: "Get Started",
    dialog: "signup",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$13",
    period: "/mo",
    features: ["Unlimited users", "100GB Vector Storage", "Priority Support", "Custom API access"],
    cta: "Get started with pro",
    dialog: "signup",
    primary: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    features: ["Dedicated Clusters", "SOC2 Compliance", "24/7 Phone Support", "Dedicated Success Manager"],
    cta: "Contact Sales",
    dialog: "expert",
  },
];

export type FooterLink = { label: string; href?: string; dialog?: "download" | "login" | "signup" | "expert" };

export const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#editor" },
      { label: "Integrations", href: "#stack" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#numbers" },
      { label: "Release notes", href: "#notes" },
      { label: "Contact", dialog: "expert" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Download", dialog: "download" },
      { label: "Live editor", href: "#editor" },
      { label: "Status", href: "#numbers" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", dialog: "login" },
      { label: "Sign up", dialog: "signup" },
    ],
  },
];
