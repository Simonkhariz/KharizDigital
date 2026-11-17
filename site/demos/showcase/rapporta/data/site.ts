export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
  { label: "Careers", href: "#careers" },
  { label: "Pricing", href: "#pricing" },
];

export const languages = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
] as const;

export const hero = {
  pill: "New update coming soon",
  titleTop: "AI agents that turn",
  titleBottom: "conversations into loyalty",
  body: "Rapporta resolves customer conversations across chat, email and voice. A unified operating system for high-performing support teams.",
};

export type LogoMark = "wing" | "crate" | "loop" | "grid";

export const trustedBy: { name: string; mark: LogoMark; style: "light" | "condensed" | "heavy" | "bold" }[] = [
  { name: "Fennwave", mark: "wing", style: "light" },
  { name: "cratelo", mark: "crate", style: "condensed" },
  { name: "tessence", mark: "loop", style: "heavy" },
  { name: "Yardhub", mark: "grid", style: "bold" },
];

export type FlowStep = { id: string; label: string; detail: string };

export const flowSteps: FlowStep[] = [
  {
    id: "personalise",
    label: "Create personalized customer experiences.",
    detail:
      "Agents read order history, plan and past conversations before the first reply, so nobody has to repeat themselves.",
  },
  {
    id: "relationships",
    label: "Build meaningful relationships that deepen over time.",
    detail:
      "Every resolved conversation updates the customer record, so the next answer is better informed than the last.",
  },
  {
    id: "resolutions",
    label: "See faster resolutions and higher engagement.",
    detail:
      "Routine requests close without a queue, and your team picks up the remaining cases with full context attached.",
  },
];

export const platformSteps = [
  {
    number: "01",
    title: "Connect your channels",
    body: "Link chat, email, voice and your help centre. Rapporta reads two years of history to learn your tone and policies.",
    meta: "Typical setup: 4 days",
  },
  {
    number: "02",
    title: "Set the guardrails",
    body: "Decide what agents may do alone, such as refunds under a limit, and what always goes to a named team.",
    meta: "Rules in plain language",
  },
  {
    number: "03",
    title: "Resolve and review",
    body: "Agents close routine cases end to end. The control room flags patterns, so product fixes the cause.",
    meta: "Weekly review built in",
  },
];

export type IndustryIcon = "finance" | "utilities" | "communication" | "retail" | "travel" | "health";

export type Industry = { icon: IndustryIcon; title: string; body: string };

export const industries: Industry[] = [
  {
    icon: "finance",
    title: "Financial Services",
    body: "Handle ID checks, card issues and claims securely and at scale.",
  },
  {
    icon: "utilities",
    title: "Utilities",
    body: "Automate high-volume outage and billing questions without the wait times.",
  },
  {
    icon: "communication",
    title: "Communication",
    body: "Sort plan changes, roaming and coverage faults in a single conversation.",
  },
];

export const moreIndustries: Industry[] = [
  {
    icon: "retail",
    title: "Retail",
    body: "Track orders, arrange returns and issue refunds inside your own policy limits.",
  },
  {
    icon: "travel",
    title: "Travel",
    body: "Rebook disrupted trips and answer baggage questions at any hour.",
  },
  {
    icon: "health",
    title: "Healthcare",
    body: "Book, move and confirm appointments while keeping records private.",
  },
];

export type Plan = {
  id: string;
  name: string;
  summary: string;
  monthly: number | null;
  annual: number | null;
  conversations: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const annualSaving = "Save 17%";

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    summary: "For a first support team automating one channel.",
    monthly: 290,
    annual: 240,
    conversations: "2,000 resolved conversations a month",
    features: ["Chat and email agents", "Help centre sync", "Control room dashboard", "Email support"],
    cta: "Get started",
  },
  {
    id: "scale",
    name: "Scale",
    summary: "For growing teams running every channel in one place.",
    monthly: 890,
    annual: 740,
    conversations: "10,000 resolved conversations a month",
    features: [
      "Everything in Launch",
      "Voice agents",
      "Custom guardrails and approvals",
      "Queue routing by team",
      "Priority support",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    summary: "For regulated businesses with their own review process.",
    monthly: null,
    annual: null,
    conversations: "Volume agreed with you",
    features: ["Everything in Scale", "Single sign-on and audit log", "Regional data hosting", "Named solutions engineer"],
    cta: "Contact sales",
  },
];

export const faqs = [
  {
    question: "How long does it take to go live?",
    answer:
      "Most teams connect their channels and switch on the first agent within four working days. Voice usually follows a week later, once call flows are approved.",
  },
  {
    question: "What happens when an agent cannot solve a request?",
    answer:
      "It hands the conversation to the right queue with a summary, the steps already tried and the customer record attached. The customer is told who will reply and when.",
  },
  {
    question: "Can we limit what agents are allowed to do?",
    answer:
      "Yes. Guardrails are written in plain language, for example a refund ceiling or topics that always need a person. Every action is logged in the control room.",
  },
  {
    question: "What counts as a resolved conversation?",
    answer:
      "A conversation the agent closed without a hand-off and that the customer did not reopen within 72 hours. Hand-offs are never billed.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "In the region you choose when you set up your workspace. Enterprise plans can pin storage and processing to a single country.",
  },
];

export const guides = [
  { tag: "Guide", title: "Writing guardrails your legal team will sign", minutes: 8 },
  { tag: "Playbook", title: "Moving a phone queue to voice agents in a month", minutes: 12 },
  { tag: "Report", title: "What 10,000 hand-offs taught us about escalation", minutes: 6 },
];

export const company = {
  statement:
    "We are a team of 46 across Lisbon and Toronto. We build Rapporta because support works best when routine work is handled well and people have time for the hard cases.",
  facts: [
    { value: "2021", label: "Founded" },
    { value: "46", label: "People" },
    { value: "2", label: "Offices" },
  ],
};

export const roles = [
  {
    title: "Senior Product Designer",
    team: "Design",
    location: "Lisbon or remote (EU)",
    detail:
      "Own the control room experience from research to shipped detail. You will work directly with two engineers and our head of support.",
  },
  {
    title: "Conversation Engineer",
    team: "Engineering",
    location: "Toronto",
    detail:
      "Build and evaluate the flows our agents follow for refunds, bookings and identity checks. Strong TypeScript and a taste for clear writing.",
  },
  {
    title: "Solutions Engineer",
    team: "Customer",
    location: "Remote (Americas)",
    detail:
      "Guide new customers from first call to live traffic. You will connect channels, draft guardrails with them and run the first weekly reviews.",
  },
  {
    title: "Support Operations Lead",
    team: "Operations",
    location: "Lisbon",
    detail:
      "Run our own support desk on Rapporta and turn what you learn into product feedback every week.",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#platform" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#product" },
      { label: "Updates", href: "#top" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#guides" },
      { label: "Guides", href: "#guides" },
      { label: "Help center", href: "#resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#company" },
      { label: "Careers", href: "#careers" },
      { label: "Contacts", href: "#contact" },
      { label: "Industries", href: "#industries" },
    ],
  },
];

export const legalNotes = [
  {
    label: "Privacy policy",
    text: "This concept site collects nothing. Forms are checked in your browser and never leave it.",
  },
  {
    label: "Terms of service",
    text: "Rapporta is a fictional product. Plans, prices and figures are demonstration content.",
  },
  {
    label: "Data protection",
    text: "No cookies, analytics or third-party requests are used on this page.",
  },
];
