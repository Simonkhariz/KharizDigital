export type PlanId = "starter" | "growth" | "enterprise";
export type Billing = "monthly" | "yearly";

export const YEARLY_DISCOUNT = 0.5;

export type Plan = {
  id: PlanId;
  name: string;
  /** Price per month when billed monthly, in US dollars. */
  monthly: number;
  blurb: string;
  features: string[];
  cta: string;
  featured: boolean;
  /** Largest amount of storage, in GB, this plan is recommended for. */
  upTo: number;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 29,
    blurb: "Great for freelancers and solo creators who need reliable storage without the clutter.",
    features: ["50 GB Secure Storage", "Version History (30 days)", "Share up to 10 Files", "Email Support"],
    cta: "Get Started",
    featured: false,
    upTo: 50,
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 79,
    blurb: "Built for growing teams that collaborate daily and need room to scale.",
    features: ["Everything in Starter", "500 GB Secure Storage", "Real-Time Collaboration", "Dedicated Account Manager"],
    cta: "Get Started",
    featured: true,
    upTo: 500,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 149,
    blurb: "For established teams that need advanced security, unlimited scale, and white-glove support.",
    features: ["Everything in Growth", "Unlimited Storage", "SSO & Advanced Permissions", "24/7 Priority Support"],
    cta: "Contact Sales",
    featured: false,
    upTo: Number.POSITIVE_INFINITY,
  },
];

export const planById = Object.fromEntries(plans.map((plan) => [plan.id, plan])) as Record<PlanId, Plan>;

/** Price per month for the chosen billing period. */
export function monthlyPrice(plan: Plan, billing: Billing): number {
  return billing === "yearly" ? plan.monthly * (1 - YEARLY_DISCOUNT) : plan.monthly;
}

export function formatPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

/** Amount charged at checkout: one month, or twelve discounted months. */
export function dueToday(plan: Plan, billing: Billing): number {
  return billing === "yearly" ? monthlyPrice(plan, billing) * 12 : plan.monthly;
}

export function recommend(gigabytes: number): Plan {
  return plans.find((plan) => gigabytes <= plan.upTo) ?? plans[plans.length - 1];
}

export const navLinks = [
  { label: "Why Stowbox", href: "#why" },
  { label: "Pricing", href: "#pricing" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
] as const;

export const reasons = [
  { title: "Everything in one place", text: "Briefs, drafts and final files live in shared folders with clear owners, not in six inboxes." },
  { title: "Every version kept", text: "Roll any file back to an earlier save. Nothing is overwritten for good." },
  { title: "Share without worry", text: "Links expire, can be password protected, and show you who opened them." },
];

type Cell = string | boolean;

export const comparison: { label: string; values: Record<PlanId, Cell> }[] = [
  { label: "Secure storage", values: { starter: "50 GB", growth: "500 GB", enterprise: "Unlimited" } },
  { label: "Version history", values: { starter: "30 days", growth: "180 days", enterprise: "Unlimited" } },
  { label: "Shared files", values: { starter: "Up to 10", growth: "Unlimited", enterprise: "Unlimited" } },
  { label: "Real-time collaboration", values: { starter: false, growth: true, enterprise: true } },
  { label: "Dedicated account manager", values: { starter: false, growth: true, enterprise: true } },
  { label: "SSO and advanced permissions", values: { starter: false, growth: false, enterprise: true } },
  { label: "Support", values: { starter: "Email", growth: "Email and chat", enterprise: "24/7 priority" } },
];

export const faqs = [
  {
    q: "How does yearly billing work?",
    a: "You pay for twelve months up front at half the monthly rate. Starter is $174 a year instead of $348, Growth $474 instead of $948, and Enterprise $894 instead of $1,788.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes. Upgrades apply straight away and you pay the difference for the rest of the period. Downgrades apply at the next renewal.",
  },
  {
    q: "What happens if I run out of storage?",
    a: "Nothing is deleted. Uploads pause, existing files stay available, and you are prompted to tidy up or move to the next plan.",
  },
  {
    q: "Is there a free trial?",
    a: "Starter and Growth include 14 days free. You are not charged until the trial ends, and you can cancel before then.",
  },
  {
    q: "Is Stowbox a real service?",
    a: "No. This is a concept website. Plans and prices are demonstration content, and the sign-up form does not create an account.",
  },
];
