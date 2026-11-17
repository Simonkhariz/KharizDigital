export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
] as const;

export const badges = [
  { mark: "seal", code: "MSB", title: "Registered", text: "US money transmitter" },
  { mark: "stars", code: "EMI", title: "Licensed", text: "E-money licence, EU" },
  { mark: "shield", code: "", title: "Audited", text: "Reserves checked monthly" },
  { mark: "seal", code: "SEC", title: "Certified", text: "Independent security audit" },
] as const;

export type BadgeMark = (typeof badges)[number]["mark"];

/** Flat fee charged on every payout, in US dollars. */
export const PAYOUT_FEE = 0.4;
export const EARN_RATE = 0.041;

export const recipients = [
  { id: "kirana", name: "Kirana Studio", account: "Bank ••• 4410", currency: "IDR", rate: 16060.5, decimals: 0 },
  { id: "morel", name: "Atelier Morel", account: "IBAN ••• 2207", currency: "EUR", rate: 0.92, decimals: 2 },
  { id: "sora", name: "Sora Works", account: "Bank ••• 9031", currency: "JPY", rate: 151.2, decimals: 0 },
  { id: "tidal", name: "Tidal Freight", account: "Wallet ••• c4e9", currency: "USD", rate: 1, decimals: 2 },
] as const;

export const accountDetails = {
  usd: {
    label: "USD",
    rows: [
      ["Account holder", "Brightwater & Co."],
      ["Bank", "Quayside Trust Bank"],
      ["Routing number", "026 073 150"],
      ["Account number", "8392 0041 77"],
      ["Type", "Checking"],
    ],
    note: "Share these with clients. Payments arrive the same day.",
  },
  eur: {
    label: "EUR",
    rows: [
      ["Account holder", "Brightwater & Co."],
      ["Bank", "Guilder Europe"],
      ["IBAN", "NL00 GLDR 0417 2290 36"],
      ["BIC", "GLDRNL2A"],
      ["Type", "Business current"],
    ],
    note: "Share these with clients in Europe. Instant transfers arrive in seconds.",
  },
  digital: {
    label: "Digital USD",
    rows: [
      ["Account holder", "Brightwater & Co."],
      ["Asset", "Dollar stablecoin"],
      ["Network", "Guilder settlement"],
      ["Wallet address", "gld1 q7f3 9k2m x0ae"],
      ["Memo", "Not required"],
    ],
    note: "Send from any supported wallet. Funds are credited after one confirmation.",
  },
} as const;

export type AccountTab = keyof typeof accountDetails;

export const balances = [
  { id: "usd", label: "US dollars", amount: 842100, symbol: "$" },
  { id: "digital", label: "Digital dollars", amount: 442400, symbol: "$" },
  { id: "eur", label: "Euro", amount: 0, symbol: "€" },
] as const;

export const cards = [
  { id: "marketing", name: "Marketing", last4: "4021", holder: "Ana Ruiz", spent: 2140, limit: 10000 },
  { id: "travel", name: "Travel", last4: "8830", holder: "Sam Okoye", spent: 6480, limit: 8000 },
  { id: "software", name: "Software", last4: "1175", holder: "Lena Vos", spent: 912, limit: 3000 },
] as const;

export const steps = [
  {
    title: "Open the account",
    text: "Apply online with your company documents. Most businesses are verified within two working days.",
  },
  {
    title: "Fund it your way",
    text: "Receive a bank transfer in dollars or euros, or deposit digital dollars from a wallet you already use.",
  },
  {
    title: "Pay anyone",
    text: "Send to a bank account or wallet in 140 countries. The recipient gets local currency in seconds.",
  },
] as const;

export const codeSamples = [
  {
    id: "payout",
    label: "Create a payout",
    lines: [
      "POST /v1/payouts",
      "{",
      '  "recipient": "rcp_kirana_studio",',
      '  "amount": "25000.00",',
      '  "source_currency": "USD",',
      '  "target_currency": "IDR"',
      "}",
    ],
    response: ['{ "id": "po_7f3k29", "status": "delivered",', '  "fee": "0.40", "target_amount": "401512500" }'],
  },
  {
    id: "balance",
    label: "Read balances",
    lines: ["GET /v1/balances"],
    response: ["{", '  "usd": "842100.00",', '  "digital_usd": "442400.00",', '  "eur": "0.00"', "}"],
  },
  {
    id: "webhook",
    label: "Listen for deposits",
    lines: ["POST /v1/webhooks", "{", '  "url": "https://example.test/hooks/guilder",', '  "events": ["deposit.received"]', "}"],
    response: ['{ "id": "wh_19ax04", "status": "active" }'],
  },
] as const;

export const prices = [
  { title: "Account", price: "$0", unit: "a month", text: "No minimum balance and no setup fee." },
  { title: "Payouts", price: "$0.40", unit: "each", text: "The same flat fee to all 140 countries." },
  { title: "Cards", price: "$0", unit: "per card", text: "No monthly fee and no charge for spending abroad." },
] as const;

export const reserves = [
  { label: "Short-dated government bills", share: 80 },
  { label: "Cash at partner banks", share: 20 },
] as const;

export const facts = [
  { value: "1:1", label: "Every digital dollar is backed by a real one" },
  { value: "140", label: "Countries you can pay from one account" },
  { value: "4.1%", label: "Yearly yield on idle dollar balances" },
] as const;

export const posts = [
  {
    id: "reserves",
    date: "October 2026",
    title: "Reading our monthly reserve report",
    excerpt: "What the attestation covers, what it does not, and how to check the figures yourself.",
    body: "Each month an independent firm compares the digital dollars in circulation with the assets held to back them. The report lists every holding by type and maturity. This note walks through October's report line by line and explains why 80% sits in bills that mature within three months.",
  },
  {
    id: "payroll",
    date: "September 2026",
    title: "Paying a team in nine currencies on one afternoon",
    excerpt: "A worked example of contractor payroll, with the fees and exchange rates shown at every step.",
    body: "A design studio with contractors in nine countries used to send nine wires over three days. With one funded dollar balance, the same payroll is nine payouts at $0.40 each, and every recipient is paid in local currency before the afternoon ends.",
  },
  {
    id: "cards",
    date: "August 2026",
    title: "Card limits that match how teams spend",
    excerpt: "Why we built per-card monthly limits, and how finance leads are using them.",
    body: "A shared company card hides who spent what. Giving each budget its own card and its own monthly limit makes the statement readable: Marketing, Travel and Software are separate lines, and any card can be frozen without touching the others.",
  },
] as const;

export const faqs = [
  {
    q: "What backs the digital dollars in my account?",
    a: "Each digital dollar is backed one to one by cash and short-dated government bills held in segregated accounts. An independent firm checks the reserves every month.",
  },
  {
    q: "How fast is a payout?",
    a: "Most payouts are delivered in seconds. Payouts to a few banking systems follow local cut-off times and arrive the same working day.",
  },
  {
    q: "Do recipients need a Guilder account?",
    a: "No. They receive local currency in their usual bank account, or digital dollars in a wallet if they prefer.",
  },
  {
    q: "How is the 4.1% yield paid?",
    a: "Interest accrues daily on idle dollar balances and is paid on the first day of each month. You can switch it off at any time.",
  },
  {
    q: "Which businesses can apply?",
    a: "Registered companies in the United States and the European Union can apply today. Sole traders and other regions are on the roadmap.",
  },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Send", href: "#product" },
      { label: "Receive", href: "#product" },
      { label: "Hold", href: "#product" },
      { label: "Spend", href: "#product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Journal", href: "#journal" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API overview", href: "#developers" },
      { label: "How it works", href: "#how" },
      { label: "Questions", href: "#faq" },
    ],
  },
] as const;

export function money(value: number, decimals = 2) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
