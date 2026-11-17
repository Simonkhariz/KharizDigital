export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "API", href: "#api" },
];

export const hero = {
  titleTop: "One platform, everything",
  titleBottom: "under control",
  body: "Transform your organization's technical mastery with Verdance AI. A unified operating system for high-performance SaaS teams.",
};

export const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "500ms", label: "Global latency" },
  { value: "25k+", label: "Teams scaling" },
];

export const features = [
  {
    code: "01 / EDITOR",
    title: "An assistant that reads the whole repository",
    body: "Verdance AI works from your actual code, not a single open file. It proposes refactors as reviewable diffs and never applies one without you.",
  },
  {
    code: "02 / PREVIEW",
    title: "A live environment for every pull request",
    body: "Each branch gets its own URL, database branch and logs within a minute of the first push, and is removed when the branch merges.",
  },
  {
    code: "03 / DEPLOY",
    title: "Releases you can reverse in one step",
    body: "Ship to 18 regions with staged rollouts. If error rates rise, traffic returns to the previous build automatically.",
  },
  {
    code: "04 / OBSERVE",
    title: "Logs, traces and builds in one timeline",
    body: "Follow a request from the edge to the query that slowed it down, then jump to the commit that introduced it.",
  },
];

export type WorkflowStep = { id: string; label: string; title: string; body: string; log: string[] };

export const workflow: WorkflowStep[] = [
  {
    id: "write",
    label: "Write",
    title: "Start in the editor, with context",
    body: "Open a workspace in the browser or connect your local editor. The assistant already knows your services, types and conventions.",
    log: ["$ verdance dev", "Workspace ready in 2.1s", "Assistant indexed 1,284 files", "Listening on localhost:4000"],
  },
  {
    id: "review",
    label: "Review",
    title: "Review a running app, not just a diff",
    body: "Every pull request carries a preview link, test results and the assistant's notes on risky changes, so reviewers see behaviour as well as code.",
    log: ["$ git push origin fix/session-check", "Preview pr-218 building...", "42 tests passed, 0 failed", "Preview pr-218 is live"],
  },
  {
    id: "ship",
    label: "Ship",
    title: "Roll out gradually, roll back instantly",
    body: "Promote a preview to production in stages. Verdance watches latency and error rates at each stage and stops the rollout if they move.",
    log: ["$ verdance deploy --staged", "10% of traffic: healthy", "50% of traffic: healthy", "100% of traffic: live in 18 regions"],
  },
];

export type Plan = {
  name: string;
  summary: string;
  monthly: number | null;
  yearly: number | null;
  unit: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    summary: "For side projects and first prototypes.",
    monthly: 0,
    yearly: 0,
    unit: "up to 3 seats",
    features: ["1 workspace", "Preview environments", "200 assistant requests a month", "Community support"],
    cta: "Start building",
  },
  {
    name: "Team",
    summary: "For product teams shipping every week.",
    monthly: 24,
    yearly: 19,
    unit: "per seat, per month",
    features: ["Unlimited workspaces", "Staged rollouts and rollback", "Unlimited assistant requests", "Logs kept for 30 days", "Email support"],
    cta: "Start building",
    featured: true,
  },
  {
    name: "Enterprise",
    summary: "For organisations with compliance needs.",
    monthly: null,
    yearly: null,
    unit: "annual agreement",
    features: ["Everything in Team", "99.99% uptime SLA", "Single sign-on and audit log", "Private regions", "Dedicated engineer"],
    cta: "Talk to sales",
  },
];

export const apiSample = `import { Verdance } from "@verdance/sdk";

const verdance = new Verdance({ token: process.env.VERDANCE_TOKEN });

const preview = await verdance.previews.create({
  project: "storefront",
  branch: "fix/session-check",
});

console.log(preview.url);`;

export const endpoints = [
  { method: "POST", path: "/v1/previews", note: "Create a preview from a branch" },
  { method: "POST", path: "/v1/deployments", note: "Start a staged rollout" },
  { method: "GET", path: "/v1/deployments/:id", note: "Read rollout status" },
  { method: "POST", path: "/v1/deployments/:id/rollback", note: "Return to the previous build" },
];

export const faqs = [
  {
    question: "Do we have to use the Verdance editor?",
    answer: "No. The assistant and previews work with a local editor through the Verdance extension and the command line.",
  },
  {
    question: "Does the assistant change code on its own?",
    answer: "Never. Every suggestion arrives as a diff with Apply and Discard. Applied changes are ordinary commits you can revert.",
  },
  {
    question: "Is our code used to train models?",
    answer: "No. Your repositories are indexed for your workspace only and are deleted when you remove the project.",
  },
  {
    question: "How is the uptime SLA measured?",
    answer: "On Enterprise, 99.99% is measured monthly across all production regions. Credits apply automatically if it is missed.",
  },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API", href: "#api" },
      { label: "Editor demo", href: "#editor" },
      { label: "Questions", href: "#faq" },
    ],
  },
  {
    title: "Start",
    links: [
      { label: "Create a workspace", href: "#start" },
      { label: "Back to top", href: "#top" },
    ],
  },
];
