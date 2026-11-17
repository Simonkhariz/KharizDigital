export const menuLinks = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "Features", href: "#features" },
  { label: "Estimate", href: "#estimate" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
  { label: "Request demo", href: "#demo" },
];

/* ---------- Hero widgets ---------- */

export interface Category {
  name: string;
  amount: number;
}

export interface FinanceWidget {
  id: "expenses" | "income";
  title: string;
  range: string;
  /** Change against the previous month, in percent. */
  change: number;
  /** Number of transactions in the range, used for the "Average" view. */
  transactions: number;
  /** The amounts add up to the total shown in the widget. */
  categories: Category[];
}

export const financeWidgets: FinanceWidget[] = [
  {
    id: "expenses",
    title: "Total Expenses",
    range: "Feb 01, 2026 - Feb 05, 2026",
    change: 10.5,
    transactions: 9,
    categories: [
      { name: "Dining & Drinks", amount: 553.59 },
      { name: "Charity & Donations", amount: 84.64 },
      { name: "Uncategorized", amount: 40 },
    ],
  },
  {
    id: "income",
    title: "Total Income",
    range: "Feb 01, 2026 - Feb 05, 2026",
    change: 9.5,
    transactions: 4,
    categories: [
      { name: "Salary & Wages", amount: 12150 },
      { name: "Freelance Income", amount: 1950 },
      { name: "Uncategorized", amount: 900 },
    ],
  },
];

export const stats = [
  { value: "500+", label: "Companies Optimizing" },
  { value: "80%", label: "Faster Financial Reporting" },
  { value: "$20B+", label: "Financial Data Processed" },
];

/* ---------- Platform band ---------- */

export type RowStatus = "Posted" | "Matched" | "Review" | "Routed";

export interface LedgerRow {
  date: string;
  payee: string;
  detail: string;
  amount: number;
  status: RowStatus;
}

export interface PlatformView {
  id: "automate" | "reconcile" | "report";
  label: string;
  title: string;
  text: string;
  /** Three figures shown above the table. */
  figures: Array<{ label: string; value: string; note: string }>;
  tableTitle: string;
  rows: LedgerRow[];
  /** Twelve values for the small chart, oldest first. */
  series: number[];
  seriesLabel: string;
}

export const platformViews: PlatformView[] = [
  {
    id: "automate",
    label: "Automate",
    title: "Invoices coded and routed without a keystroke",
    text: "Fiscara reads each bill, suggests the account and cost centre, and sends it to the approver your policy names.",
    figures: [
      { label: "Coded automatically", value: "94%", note: "of 1,284 invoices" },
      { label: "Median approval", value: "3h 12m", note: "was 2.4 days" },
      { label: "Waiting on you", value: "2", note: "over your limit" },
    ],
    tableTitle: "Payables inbox",
    rows: [
      { date: "Feb 03", payee: "Harbourline Freight", detail: "6120 Logistics · Operations", amount: -4820, status: "Routed" },
      { date: "Feb 03", payee: "Brightdesk Software", detail: "6410 Subscriptions · Product", amount: -1290, status: "Posted" },
      { date: "Feb 04", payee: "Oakmere Catering", detail: "6730 Dining & Drinks · People", amount: -553.59, status: "Review" },
      { date: "Feb 05", payee: "Civic Arts Fund", detail: "6900 Charity & Donations", amount: -84.64, status: "Posted" },
      { date: "Feb 05", payee: "Tallow & Finch Print", detail: "6250 Marketing · Brand", amount: -2140, status: "Routed" },
    ],
    series: [62, 66, 71, 70, 76, 81, 84, 83, 88, 90, 92, 94],
    seriesLabel: "Invoices coded without edits, last 12 weeks (%)",
  },
  {
    id: "reconcile",
    label: "Reconcile",
    title: "Bank lines matched to the ledger as they arrive",
    text: "Rules you approve once are applied every day, so month-end starts with a short list of exceptions.",
    figures: [
      { label: "Matched today", value: "318", note: "of 326 bank lines" },
      { label: "Exceptions", value: "8", note: "2 need a receipt" },
      { label: "Unreconciled", value: "$730.00", note: "across 2 accounts" },
    ],
    tableTitle: "Bank feed · Operating account",
    rows: [
      { date: "Feb 01", payee: "Payroll run 02/01", detail: "Matched to JE-2041", amount: -48210, status: "Matched" },
      { date: "Feb 02", payee: "Studio Lindqvist", detail: "Matched to INV-0932", amount: 12150, status: "Matched" },
      { date: "Feb 04", payee: "Transfer ref 88214", detail: "No ledger entry found", amount: 700, status: "Review" },
      { date: "Feb 05", payee: "Card ending 4410", detail: "Receipt missing", amount: -30, status: "Review" },
      { date: "Feb 05", payee: "Northquay Rent", detail: "Matched to rule: Rent", amount: -6400, status: "Matched" },
    ],
    series: [88, 91, 90, 93, 94, 93, 95, 96, 96, 97, 97, 98],
    seriesLabel: "Bank lines matched automatically, last 12 weeks (%)",
  },
  {
    id: "report",
    label: "Report",
    title: "A live close, not a quarterly scramble",
    text: "Income, spend and cash position update with every posting. Share a read-only view with the board in one click.",
    figures: [
      { label: "Income to date", value: "$15,000.00", note: "+9.5% on January" },
      { label: "Expenses to date", value: "$678.23", note: "+10.5% on January" },
      { label: "Net position", value: "$14,321.77", note: "Feb 01 to Feb 05" },
    ],
    tableTitle: "Close checklist · February",
    rows: [
      { date: "Day 1", payee: "Bank and card feeds", detail: "All 4 accounts reconciled", amount: 0, status: "Posted" },
      { date: "Day 1", payee: "Accruals and prepayments", detail: "12 journals drafted", amount: 0, status: "Posted" },
      { date: "Day 2", payee: "Intercompany", detail: "1 difference of $700.00", amount: 0, status: "Review" },
      { date: "Day 2", payee: "Management pack", detail: "Draft shared with 3 readers", amount: 0, status: "Routed" },
      { date: "Day 3", payee: "Board view", detail: "Publishes on sign-off", amount: 0, status: "Routed" },
    ],
    series: [9, 9, 8, 8, 7, 6, 6, 5, 4, 4, 3, 3],
    seriesLabel: "Working days to close, last 12 months",
  },
];

/* ---------- Features ---------- */

export const approvalSteps = [
  { role: "Requester", name: "Operations", state: "done" as const, note: "Raised Feb 03, 09:14" },
  { role: "Budget owner", name: "Head of Logistics", state: "done" as const, note: "Approved in 41 min" },
  { role: "Second approver", name: "Finance Director", state: "current" as const, note: "Over $2,500 limit" },
  { role: "Payment", name: "Scheduled Feb 07", state: "next" as const, note: "Runs on approval" },
];

/** Thirteen weeks of forecast closing cash, in thousands of dollars. */
export const forecastWeeks = [
  { week: "W06", cash: 412, committed: 96 },
  { week: "W07", cash: 398, committed: 112 },
  { week: "W08", cash: 441, committed: 88 },
  { week: "W09", cash: 367, committed: 148 },
  { week: "W10", cash: 389, committed: 104 },
  { week: "W11", cash: 436, committed: 92 },
  { week: "W12", cash: 458, committed: 97 },
  { week: "W13", cash: 402, committed: 151 },
  { week: "W14", cash: 427, committed: 109 },
  { week: "W15", cash: 469, committed: 94 },
  { week: "W16", cash: 492, committed: 101 },
  { week: "W17", cash: 448, committed: 156 },
  { week: "W18", cash: 487, committed: 108 },
];

export const auditTrail = [
  { time: "09:14:02", actor: "ops.requester", action: "raised", target: "PO-1182 Harbourline Freight" },
  { time: "09:14:03", actor: "fiscara.rules", action: "coded", target: "6120 Logistics · Operations" },
  { time: "09:55:40", actor: "head.logistics", action: "approved", target: "step 1 of 2" },
  { time: "10:02:17", actor: "fiscara.policy", action: "routed", target: "Finance Director (over $2,500)" },
  { time: "10:02:18", actor: "fiscara.ledger", action: "drafted", target: "JE-2057, not yet posted" },
];

export const connections = ["Bank feeds", "General ledger", "Payroll", "Company cards", "Billing", "Expenses"];

/* ---------- Pricing ---------- */

export interface Plan {
  name: string;
  monthly: number;
  blurb: string;
  featured?: boolean;
  seats: string;
  features: string[];
}

/** Annual billing takes two months off: the yearly price is ten times the monthly one. */
export const plans: Plan[] = [
  {
    name: "Ledger",
    monthly: 49,
    blurb: "For a small finance team getting off spreadsheets.",
    seats: "Up to 3 users",
    features: ["Bank feeds and reconciliation", "Receipt capture", "Standard reports", "Email support"],
  },
  {
    name: "Control",
    monthly: 149,
    featured: true,
    blurb: "For teams that need approvals and a faster close.",
    seats: "Up to 15 users",
    features: ["Everything in Ledger", "Approval policies", "13-week cash forecast", "Board view sharing", "Audit trail export"],
  },
  {
    name: "Group",
    monthly: 399,
    blurb: "For several entities and currencies.",
    seats: "Unlimited users",
    features: ["Everything in Control", "Multi-entity consolidation", "Single sign-on", "Dedicated onboarding"],
  },
];

export const faqs = [
  {
    question: "Does Fiscara replace our accounting system?",
    answer:
      "No. Fiscara sits on top of your general ledger. It prepares, checks and posts entries, and your accounting system remains the book of record.",
  },
  {
    question: "How long does set-up take?",
    answer:
      "Most teams connect their bank feeds and ledger in a day. Approval policies and coding rules are usually in place within the first two weeks.",
  },
  {
    question: "Who can approve payments?",
    answer:
      "Whoever your policy names. You set limits by amount, cost centre and supplier, and can require two approvers above a threshold.",
  },
  {
    question: "Where is our financial data stored?",
    answer: "In the region you choose at sign-up, encrypted in transit and at rest. You can export or delete it at any time.",
  },
  {
    question: "What happens when the automation is unsure?",
    answer:
      "It stops and asks. Anything below the confidence level you set lands in a review queue with the reason shown, and nothing is posted until a person confirms it.",
  },
];
