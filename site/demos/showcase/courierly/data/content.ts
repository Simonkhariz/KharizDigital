export type IconName = "user" | "code" | "pen" | "braces" | "globe" | "clock" | "webhook" | "chart" | "shield" | "refresh" | "at";

export type NavItem = { label: string; href: string; children?: { label: string; note: string; href: string }[] };

export const nav: NavItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "Features",
    href: "#tools",
    children: [
      { label: "Email tools", note: "Drafting, scheduling and analytics", href: "#tools" },
      { label: "Why Courierly", note: "Reliability, security, your own domain", href: "#why" },
      { label: "Pricing", note: "Four plans, billed in naira", href: "#pricing" },
    ],
  },
  {
    label: "Company",
    href: "#audiences",
    children: [
      { label: "Who it is for", note: "Teams and developers", href: "#audiences" },
      { label: "Customer segments", note: "From freelancers to enterprise", href: "#segments" },
    ],
  },
  {
    label: "Docs",
    href: "#api",
    children: [
      { label: "Quick start", note: "Three steps to a first send", href: "#how" },
      { label: "REST API", note: "A send request, line by line", href: "#api" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

/** Notes are illustrative and attributed to roles, not to named people or companies. */
export const notes = [
  {
    role: "Head of operations",
    team: "Logistics start-up, 40 people",
    initials: "HO",
    quote:
      "Courierly changed how our team handles customer email. What used to take hours of manual set-up is now drafted, scheduled and tracked in one place.",
  },
  {
    role: "Backend engineer",
    team: "Payments team, 12 people",
    initials: "BE",
    quote:
      "We wired receipts to the REST API in an afternoon. When our primary provider had an outage, sends moved to the backup route and nobody noticed.",
  },
  {
    role: "Independent consultant",
    team: "Solo practice",
    initials: "IC",
    quote:
      "I describe the email, attach the brief and get a draft I can edit. It goes out from my own domain, at nine in the morning in my client's time zone.",
  },
];

export type Audience = { icon: IconName; tone: "blue" | "dark"; title: string; text: string; points: string[] };

export const audiences: Audience[] = [
  {
    icon: "user",
    tone: "blue",
    title: "For Individuals & Teams",
    text: "Write, edit, and send emails directly from our web application. Perfect for founders, marketers, and personal outreach.",
    points: [
      "Assisted drafts, fully editable before sending",
      "Reusable template library",
      "Timezone-aware scheduling queue",
      "Built-in analytics dashboard",
      "Zero coding required to start",
    ],
  },
  {
    icon: "code",
    tone: "dark",
    title: "For Developers",
    text: "Trigger emails programmatically, route inbound mail through webhooks, and manage custom sender domains, all through the REST API.",
    points: [
      "REST API with per-user API keys",
      "Inbound email webhook for routing replies",
      "Context-aware web scraper API",
      "Custom domain (DKIM) verification",
      "Secure API key management",
    ],
  },
];

export type Feature = { icon: IconName; tone: "blue" | "dark"; title: string; text: string };

export const reasons: Feature[] = [
  {
    icon: "at",
    tone: "blue",
    title: "Send as Yourself, Not Us",
    text: "Every email goes out under your own name and address. Courierly branding never appears in what your recipients see.",
  },
  {
    icon: "refresh",
    tone: "dark",
    title: "Sending That Keeps Working",
    text: "Drafting falls back across multiple providers, and sending falls back to a backup delivery route, so a single outage doesn't stop your email.",
  },
  {
    icon: "shield",
    tone: "dark",
    title: "Security by Design",
    text: "Every record is protected by row-level access controls, and admin access is checked through a dedicated, privilege-safe process, not bolted on after the fact.",
  },
  {
    icon: "globe",
    tone: "blue",
    title: "Your Own Domain",
    text: "Verify a custom sending domain so your API and outgoing mail carry your address, not a shared one.",
  },
];

export const tools: Feature[] = [
  {
    icon: "pen",
    tone: "blue",
    title: "Email Copywriter",
    text: "Describe what you need to say and optionally attach reference documents. Get a clear, professional draft back, fully editable before you send.",
  },
  {
    icon: "braces",
    tone: "dark",
    title: "Public REST API",
    text: "Trigger sends programmatically with per-user API keys. Plug Courierly into your own backend, scripts, or product.",
  },
  {
    icon: "globe",
    tone: "dark",
    title: "Contextual Web Scraper",
    text: "Pull content from a URL, a landing page, product listing, anything, straight into your draft as context.",
  },
  {
    icon: "clock",
    tone: "blue",
    title: "Timezone-Aware Scheduling",
    text: "Pick a timezone and queue your email to go out at exactly the right time, instead of sending the moment it's ready.",
  },
  {
    icon: "webhook",
    tone: "blue",
    title: "Inbound Email Webhooks",
    text: "Route incoming replies and inbound mail into Courierly, view them in your dashboard, and trigger auto-replies automatically.",
  },
  {
    icon: "chart",
    tone: "dark",
    title: "Email Analytics",
    text: "Track opens, clicks, and full send history for every email you've sent, in one dashboard.",
  },
];

export const segments = [
  { id: "startup", label: "Startup", text: "Ship receipts, sign-in links and launch notes from one API key, on the free plan, until volume says otherwise." },
  { id: "enterprise", label: "Enterprise", text: "SSO, audit logs and a dedicated account manager, with sending domains separated per business unit." },
  { id: "business", label: "Business", text: "Schedule campaigns by time zone and watch opens and clicks without exporting a spreadsheet." },
  { id: "agency", label: "Agency", text: "Keep each client on its own verified domain and template library, under one login." },
  { id: "freelancer", label: "Freelancer", text: "Draft outreach from a short brief and send it from your own address, with your own signature." },
] as const;

export const steps = [
  { title: "Create Your Account", text: "Sign up for free and set up your profile in minutes. No credit card required to get started." },
  { title: "Describe Your Email", text: "Tell us the purpose of your email and optionally attach reference documents for context." },
  { title: "Generate & Send", text: "Get a professional email instantly, review it, and send with confidence to your recipients." },
];

export type Plan = {
  id: string;
  name: string;
  /** Monthly price in naira; null means custom pricing. */
  price: number | null;
  blurb: string;
  tone: "blue" | "dark";
  cta: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Courierly Free",
    price: 0,
    blurb: "Perfect for trying out",
    tone: "blue",
    cta: "Get started free",
    features: ["Up to 3,000 emails/month", "Assisted email drafting", "Email templates", "Scheduled sending", "Web scraper for context", "Developer API access"],
  },
  {
    id: "pro",
    name: "Courierly Pro",
    price: 14000,
    blurb: "For regular users",
    tone: "dark",
    cta: "Get pro",
    features: ["Up to 50,000 emails/month", "Personalized email details", "Analytics dashboard", "A/B testing", "Automatic replies", "Inbound webhooks", "Custom sending domains"],
  },
  {
    id: "premium",
    name: "Courierly Premium",
    price: 40000,
    blurb: "For power users",
    tone: "dark",
    cta: "Get premium",
    features: ["Up to 200,000 emails/month", "Everything in Pro", "Priority drafting speed", "Custom logo and banner", "Newsletter formatting", "Multi-tone writing", "16-language email drafting"],
  },
  {
    id: "enterprise",
    name: "Courierly Enterprise",
    price: null,
    blurb: "For teams & organizations",
    tone: "blue",
    cta: "Estimate my price",
    features: ["Everything in Premium", "Migration help", "Dedicated support portal", "SSO/SAML & audit logs", "Dedicated account manager", "Custom integrations & SLAs"],
  },
];

export const apiSample = {
  request: `curl https://api.courierly.example/v1/send \\
  -H "Authorization: Bearer ck_live_••••••••" \\
  -d from="billing@yourdomain.example" \\
  -d to="ada@customer.example" \\
  -d template="receipt" \\
  -d send_at="09:00 Africa/Lagos"`,
  response: `{
  "id": "msg_01J8Q2",
  "status": "scheduled",
  "route": "primary",
  "send_at": "2026-11-16T09:00:00+01:00"
}`,
};

export const demoDraft = {
  subject: "Your October invoice, and one change for November",
  body: [
    "Hello Ada,",
    "Your October invoice is attached. The total is ₦184,500, due by 30 November.",
    "One change from next month: invoices will be sent on the first working day, so they arrive before your own month-end close.",
    "Reply to this email if anything looks wrong and I will fix it the same day.",
    "Kind regards,",
  ],
};

export type FooterLink = { label: string; href?: string; open?: "signin" | "signup" | "contact" };

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#tools" },
      { label: "Pricing", href: "#pricing" },
      { label: "How it works", href: "#how" },
      { label: "Segments", href: "#segments" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "REST API", href: "#api" },
      { label: "Quick start", href: "#how" },
      { label: "Watch demo", href: "#top" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Courierly", href: "#why" },
      { label: "Who it is for", href: "#audiences" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", open: "signin" },
      { label: "Create account", open: "signup" },
      { label: "Talk to sales", open: "contact" },
    ],
  },
];

export function naira(value: number): string {
  return `₦${value.toLocaleString("en-US")}`;
}
