export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const logos = [
  { name: "tindra", style: "soft" },
  { name: "KESTREL", style: "wide" },
  { name: "oakhaven", style: "soft" },
  { name: "brillo", style: "bold" },
  { name: "portside", style: "bold" },
  { name: "ALTAMIRA", style: "wide" },
  { name: "zuma", style: "soft" },
] as const;

export type Severity = "critical" | "high" | "medium";

export interface ThreatEvent {
  id: string;
  severity: Severity;
  title: string;
  asset: string;
  action: string;
  /** Milliseconds from detection to automatic containment. */
  ms: number;
}

/** Demonstration events for the live feed. The feed cycles through them. */
export const events: ThreatEvent[] = [
  { id: "EV-48213", severity: "critical", title: "Credential stuffing against SSO", asset: "auth-gateway", action: "Blocked 1,204 source addresses", ms: 310 },
  { id: "EV-48214", severity: "high", title: "Unsigned binary started on build host", asset: "ci-runner-07", action: "Process killed, host isolated", ms: 420 },
  { id: "EV-48215", severity: "medium", title: "Storage bucket made public", asset: "exports-eu-2", action: "Access reverted, owner notified", ms: 890 },
  { id: "EV-48216", severity: "high", title: "Lateral movement over SMB", asset: "fin-ws-112", action: "Session ended, token revoked", ms: 280 },
  { id: "EV-48217", severity: "critical", title: "Known exploit against VPN appliance", asset: "edge-vpn-1", action: "Virtual patch applied", ms: 190 },
  { id: "EV-48218", severity: "medium", title: "Dependency with a new advisory", asset: "billing-api", action: "Pull request opened with fix", ms: 1250 },
  { id: "EV-48219", severity: "high", title: "Impossible travel sign-in", asset: "staff account 4471", action: "Step-up authentication required", ms: 240 },
  { id: "EV-48220", severity: "medium", title: "Outbound traffic to new domain", asset: "analytics-job", action: "Connection held for review", ms: 610 },
];

export const platformStats = [
  { value: "1.4B", label: "Signals analysed a day" },
  { value: "0.4s", label: "Median time to contain" },
  { value: "99.2%", label: "Alerts closed without a person" },
] as const;

export const features = [
  { icon: "eye", title: "Attack-path mapping", text: "See how an intruder could move from a forgotten test server to your customer data, and close the path before anyone walks it." },
  { icon: "bolt", title: "Automatic containment", text: "Isolate a host, revoke a token or apply a virtual patch in under a second, with every action written to an audit trail." },
  { icon: "scan", title: "Continuous exposure scans", text: "Every asset is checked against new advisories within minutes of publication, not at the next scheduled scan." },
  { icon: "brain", title: "Models trained on your normal", text: "Baselines are learned per team and per service, so a Tuesday deploy does not page the on-call engineer." },
  { icon: "plug", title: "Works with what you run", text: "Agentless connectors for the major clouds, identity providers, endpoint tools and ticketing systems." },
  { icon: "file", title: "Evidence on demand", text: "Export the timeline of any incident, mapped to SOC 2 and ISO 27001 controls, in one click." },
] as const;

export const useCases = [
  {
    id: "soc",
    label: "Security operations",
    title: "Clear the queue without growing the team.",
    text: "Magmashield triages every alert, joins related ones into a single incident and resolves the routine cases itself. Analysts start with the three that matter.",
    points: ["94% fewer alerts reaching an analyst", "One timeline per incident", "Playbooks you can read and edit"],
    metric: { value: "94%", label: "fewer alerts to triage" },
  },
  {
    id: "cloud",
    label: "Cloud and platform",
    title: "Catch the misconfiguration before the scanner does.",
    text: "Changes to infrastructure are checked as they are applied. Risky ones are reverted or held, and the owner gets the diff and the reason.",
    points: ["Covers three major clouds and Kubernetes", "Drift reverted in under a second", "Fix suggested as a pull request"],
    metric: { value: "0.9s", label: "to revert a public bucket" },
  },
  {
    id: "grc",
    label: "Risk and compliance",
    title: "Answer the auditor from one screen.",
    text: "Controls are tested continuously and evidence is collected as a side effect of protection. Audit season becomes an export.",
    points: ["SOC 2, ISO 27001 and PCI DSS mappings", "Evidence refreshed every day", "Read-only auditor access"],
    metric: { value: "312", label: "controls tested daily" },
  },
] as const;

export const steps = [
  { n: "01", title: "Connect", text: "Link your cloud accounts, identity provider and endpoint tool. No agents to install. Most teams finish in an afternoon." },
  { n: "02", title: "Learn", text: "For seven days Magmashield watches and builds a baseline. It reports what it would have done, and does nothing yet." },
  { n: "03", title: "Protect", text: "Turn on containment one playbook at a time. Every automatic action can be reviewed and undone." },
] as const;

export interface Plan {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  unit: string;
  text: string;
  points: string[];
  featured?: boolean;
}

/** Prices in US dollars per protected asset per month. Annual billing is 20% lower. */
export const plans: Plan[] = [
  { id: "team", name: "Team", monthly: 5, annual: 4, unit: "per asset / month", text: "Detection and exposure scans for small teams.", points: ["Up to 500 assets", "Continuous exposure scans", "Email and chat alerts", "30-day event history"] },
  { id: "business", name: "Business", monthly: 10, annual: 8, unit: "per asset / month", text: "Automatic containment and compliance evidence.", points: ["Unlimited assets", "Automatic containment", "Attack-path mapping", "SOC 2 and ISO 27001 evidence", "1-year event history"], featured: true },
  { id: "enterprise", name: "Enterprise", monthly: null, annual: null, unit: "annual agreement", text: "Dedicated tenancy and a named response team.", points: ["Single-tenant deployment", "Custom playbooks and models", "24/7 named response team", "7-year event history"] },
];

export const faqs = [
  { q: "Do we need to install agents?", a: "No. Magmashield connects through the APIs of your cloud, identity and endpoint tools. If you already run an endpoint agent, we read from it." },
  { q: "What does it do on its own?", a: "Only what you switch on. Each containment playbook is off by default, shows what it would have done during the learning week, and can be undone after it runs." },
  { q: "Where is our data processed?", a: "In the region you choose at signup: the United States, the European Union or Australia. Event data never leaves that region." },
  { q: "How long does the trial last?", a: "Fourteen days on the Business plan, with every feature available and no card required." },
  { q: "Can it replace our SIEM?", a: "For many teams it does. It can also sit beside one and forward incidents, timelines and evidence to it." },
] as const;
