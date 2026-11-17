export const brand = "Runemark";
export const installCommand = "npm install @runemark/sdk";

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#sdk" },
] as const;

export type StageIcon = "burst" | "stack" | "check" | "plus" | "arrow";

export interface Stage {
  id: string;
  label: string;
  icon: StageIcon;
  /** Median seconds spent in this stage (demonstration data). */
  seconds: string;
  /** Position on the 14 x 5 diagram grid: column and row of the diagonal cell, and label width in cells. */
  col: number;
  row: number;
  span: number;
  detail: string;
}

export const stages: Stage[] = [
  { id: "router", label: "Router", icon: "burst", seconds: "0.349", col: 1, row: 1, span: 3, detail: "Picks a model and a fallback for the request." },
  { id: "retrieve", label: "Retrieve", icon: "stack", seconds: "2.31", col: 4, row: 0, span: 3, detail: "Pulls context from the sources the agent may read." },
  { id: "tool", label: "Tool call", icon: "plus", seconds: "1.778", col: 6, row: 2, span: 3, detail: "Runs the tool in an isolated worker with a budget." },
  { id: "verify", label: "Verify", icon: "check", seconds: "1.39", col: 9, row: 1, span: 3, detail: "Checks the output against your policies." },
  { id: "respond", label: "Respond", icon: "arrow", seconds: "2.268", col: 11, row: 3, span: 3, detail: "Returns the answer and closes the trace." },
];

export const runsToday = 12_408_224;

export const logos = [
  { name: "Tidewire", style: "sans", mark: "burst" },
  { name: "NORVO", style: "wide", mark: "grid" },
  { name: "glasshex", style: "mono", mark: "hex" },
  { name: "Lumenstack", style: "pixel", mark: "bars" },
  { name: "FERRO/AI", style: "pixel", mark: "shield" },
] as const;

export const problems = [
  { value: "40+", title: "Scripts per team", text: "Every agent ships its own runner.", hot: false },
  { value: "5", title: "Places logs end up", text: "Or none, when it matters.", hot: false },
  { value: "$0", title: "Budget limits", text: "Token spend has no ceiling.", hot: false },
  { value: "0", title: "Traces when it fails", text: "You hear about it from users.", hot: true },
] as const;

export const steps = [
  {
    n: "A",
    title: "Wrap the agent you already have",
    text: "Import the SDK and declare the model route, the tools and a budget. Your prompts and business logic stay where they are.",
    code: "runemark init",
  },
  {
    n: "B",
    title: "Deploy a version",
    text: "Each deploy is an immutable, isolated version with its own secrets. Send it 5% of traffic first, then promote it.",
    code: "runemark deploy --canary 5",
  },
  {
    n: "C",
    title: "Watch every run",
    text: "Every step lands in one trace: the route taken, tool inputs and outputs, tokens, cost and the policy checks that ran.",
    code: "runemark trace --follow",
  },
] as const;

export const features = [
  {
    id: "routing",
    tag: "Routing",
    title: "Model routing with fallbacks",
    text: "Route by cost, latency or task. When a provider slows down or errors, the run moves to your fallback without a redeploy.",
    rows: [
      ["primary", "large", "62%"],
      ["fallback", "small", "35%"],
      ["rerouted", "on error", "3%"],
    ],
  },
  {
    id: "budgets",
    tag: "Budgets",
    title: "Spend limits per run, agent and team",
    text: "Set a ceiling in dollars. A run that reaches it stops cleanly and tells you which step used the money.",
    rows: [
      ["per run", "$0.02", "hard"],
      ["per agent / day", "$180", "hard"],
      ["per team / month", "$4,000", "alert"],
    ],
  },
  {
    id: "traces",
    tag: "Traces",
    title: "Step-level traces you can replay",
    text: "Open any run, see each step with its inputs, and replay it against a new version before you ship the fix.",
    rows: [
      ["router", "0.349s", "ok"],
      ["tool: postgres", "1.778s", "ok"],
      ["verify", "1.39s", "ok"],
    ],
  },
  {
    id: "policies",
    tag: "Policies",
    title: "Guardrails and an audit log",
    text: "Declare which tools an agent may call and what needs approval. Every action is written to an append-only log.",
    rows: [
      ["refund > $200", "needs approval", "on"],
      ["pii in output", "redact", "on"],
      ["write to prod db", "deny", "on"],
    ],
  },
] as const;

export const reliability = [
  "99.99% uptime SLA on Runemark Cloud",
  "Versioned, isolated deploys with instant rollback",
  "Automatic horizontal scaling across regions",
] as const;

export type Token = { t: string; k?: "kw" | "num" | "dim" };

export const codeLines: Token[][] = [
  [{ t: "import", k: "kw" }, { t: " { agent, tool, route, budget } " }, { t: "from", k: "kw" }, { t: " '@runemark/sdk'" }],
  [{ t: "export default", k: "kw" }, { t: " agent({" }],
  [{ t: "  name: 'support-triage'," }],
  [{ t: "  model: route({ primary: 'large', fallback: 'small' })," }],
  [{ t: "  tools: [tool.helpdesk(), tool.postgres('tickets')]," }],
  [{ t: "  budget: budget.perRun({ usd: " }, { t: "0.02", k: "num" }, { t: " })," }],
  [{ t: "})" }],
];

export const stats = [
  { value: "12M+", label: "Agent runs per day" },
  { value: "99.99%", label: "Uptime" },
  { value: "40%", label: "Lower token spend" },
  { value: "<10", label: "Minutes to set up" },
] as const;

/** Use-case cards. They stand in for customer quotes, which a concept site should not invent. */
export const useCases = [
  {
    tag: "Self-hosted",
    text: "Run the control plane inside your own VPC in an afternoon. Security reviews go faster because every action lands in the audit log.",
    title: "Private deployment",
    meta: "Helm chart + Terraform",
  },
  {
    tag: "Cost control",
    text: "One place to see every agent run. Routing small tasks to a small model typically cuts the token bill by about a third.",
    title: "Model routing",
    meta: "Budgets per run",
  },
  {
    tag: "Migration",
    text: "Replace forty cron scripts with one control plane. On-call goes from nightly pages to a quiet weekly review of failed runs.",
    title: "Script consolidation",
    meta: "Import from cron",
  },
  {
    tag: "Support",
    text: "Triage tickets with an agent that can read the help desk and the orders table, and that asks a human before any refund over $200.",
    title: "Approval gates",
    meta: "Human in the loop",
  },
  {
    tag: "Data",
    text: "Nightly research agents fan out over thousands of documents. Failed branches retry on the fallback model and the trace shows why.",
    title: "Batch runs",
    meta: "Automatic retries",
  },
] as const;

export interface Plan {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  blurb: string;
  cta: string;
  open: "trial" | "engineer";
  features: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For a first agent in production.",
    cta: "Start free",
    open: "trial",
    features: ["50,000 runs a month", "3 agents", "7-day trace retention", "Community support"],
  },
  {
    id: "team",
    name: "Team",
    monthly: 240,
    annual: 200,
    blurb: "For teams running agents every day.",
    cta: "Start free trial",
    open: "trial",
    featured: true,
    features: ["2 million runs a month", "Unlimited agents", "30-day trace retention", "Budgets, policies and approvals", "99.9% uptime SLA"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    blurb: "For regulated and high-volume workloads.",
    cta: "Talk to an engineer",
    open: "engineer",
    features: ["Custom run volume", "Self-hosting in your VPC", "1-year trace retention", "SSO, SCIM and audit export", "99.99% uptime SLA"],
  },
];

export const faqs = [
  {
    q: "What is Runemark?",
    a: "A control plane for AI agents. You deploy agents to it, and it handles model routing, tool isolation, budgets, traces and rollbacks.",
  },
  {
    q: "Do I have to rewrite my agents?",
    a: "No. You wrap your existing agent with the SDK and declare its route, tools and budget. Prompts and logic stay as they are.",
  },
  {
    q: "Which models and frameworks are supported?",
    a: "Any model reachable over HTTPS, including ones you host. The SDK is available for TypeScript and Python and works alongside common agent frameworks.",
  },
  {
    q: "How do budgets work?",
    a: "You set a ceiling per run, per agent or per team. When a run reaches its limit it stops cleanly, and the trace shows which step spent the money.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. The Team plan is free for 14 days with no card, and the Starter plan stays free up to 50,000 runs a month.",
  },
  {
    q: "Where does my data live?",
    a: "On Runemark Cloud you choose a region in the EU or the US. On Enterprise you can self-host, so prompts and traces never leave your VPC.",
  },
] as const;

export const footerLinks = [
  { n: "02", label: "Product", href: "#product" },
  { n: "03", label: "Features", href: "#features" },
  { n: "04", label: "Pricing", href: "#pricing" },
  { n: "05", label: "FAQ", href: "#faq" },
  { n: "06", label: "Docs", href: "#sdk" },
  { n: "07", label: "Workflow", href: "#how" },
] as const;
