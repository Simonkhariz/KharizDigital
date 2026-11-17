export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
] as const;

export type TxKind = "income" | "sent" | "request";

export type PhoneTx = { id: string; name: string; initials: string; time: string; amount: number; kind: TxKind; label: string };

/** Demonstration rows for the phone mock-ups. Payers are described by what was paid for, not by real names. */
export const phoneTransactions: PhoneTx[] = [
  { id: "a", name: "Design retainer", initials: "DR", time: "10:30 AM", amount: 350, kind: "income", label: "Receive" },
  { id: "b", name: "Ride home", initials: "RH", time: "08:25 AM", amount: -10, kind: "sent", label: "Transfer" },
  { id: "c", name: "Studio rent share", initials: "SR", time: "09:45 AM", amount: -124, kind: "sent", label: "Send" },
  { id: "d", name: "Invoice 2041", initials: "IN", time: "Yesterday", amount: 310, kind: "request", label: "Requested" },
  { id: "e", name: "Template sale", initials: "TS", time: "Yesterday", amount: 48, kind: "income", label: "Receive" },
];

export const phoneFilters = [
  { id: "all", label: "All" },
  { id: "income", label: "Income" },
  { id: "sent", label: "Sent" },
  { id: "request", label: "Request" },
] as const;

export const ACCOUNT_BALANCE = 86290.49;

export const phoneActions = [
  { id: "send", label: "Send", hint: "Send to a wallet or bank account in 40 countries." },
  { id: "request", label: "Request", hint: "Share a payment link. Paid by card or crypto." },
  { id: "exchange", label: "Exchange", hint: "Convert incoming crypto to digital dollars at settlement." },
  { id: "more", label: "More", hint: "Statements, team seats and payout schedule." },
] as const;

/** Invented company names for the logo strip, set in type. */
export const trusted = ["Northgate Express", "Meridial", "VANTA·CARD", "Cloudharbor", "Orbisline", "Fennec & Co", "Parcelwise", "Lumen Atlas"];

export const features = [
  {
    id: "checkout",
    title: "One checkout, two rails",
    text: "Customers choose card or crypto on the same page. You get one order, one receipt and one webhook either way.",
    size: "wide",
  },
  {
    id: "payouts",
    title: "Payouts in digital dollars",
    text: "Whatever your customer pays with, you can settle in a dollar stablecoin the next business day, or to your bank.",
    size: "tall",
  },
  {
    id: "global",
    title: "Sell in 42 countries",
    text: "Local card acceptance, automatic currency display and tax-ready receipts.",
    size: "small",
  },
  {
    id: "risk",
    title: "Risk checks built in",
    text: "Every payment is screened before it settles. Disputes arrive with the evidence attached.",
    size: "small",
  },
  {
    id: "links",
    title: "Payment links in a minute",
    text: "No code needed: name the product, set the price, share the link.",
    size: "small",
  },
] as const;

export const steps = [
  { title: "Create a payment", text: "Add a product and price in the dashboard, or create a payment with one API call." },
  { title: "Your customer pays their way", text: "Card, wallet or stablecoin on one hosted page, in their own currency." },
  { title: "Receive your payout", text: "Funds settle the next business day in digital dollars, or to your bank account." },
];

export const useCases = [
  {
    id: "saas",
    label: "SaaS",
    title: "Subscriptions that renew wherever your customers are",
    text: "Bill monthly or yearly, retry failed cards automatically and let customers in card-poor markets pay with stablecoin instead.",
    points: ["Recurring billing with smart retries", "Proration and plan changes", "One revenue report across both rails"],
  },
  {
    id: "marketplaces",
    label: "Marketplaces",
    title: "Split every payment between sellers and your platform",
    text: "Take your commission at the moment of payment and pay sellers out in the currency they choose.",
    points: ["Split payments and platform fees", "Seller onboarding with identity checks", "Scheduled or instant seller payouts"],
  },
  {
    id: "creators",
    label: "Creators",
    title: "Sell a course, a template or a membership from one link",
    text: "No storefront required. Share a payment link and deliver the file or the invitation automatically.",
    points: ["Payment links and QR codes", "Automatic digital delivery", "Pay-what-you-want pricing"],
  },
  {
    id: "agencies",
    label: "Agencies",
    title: "Invoice clients abroad without waiting on a wire",
    text: "Send an invoice that can be paid by card or stablecoin, and see it settle before the next stand-up.",
    points: ["Branded invoices with due dates", "Partial payments and deposits", "Export to your accounting tool as CSV"],
  },
] as const;

export const RATES = { cardPercent: 2.9, cardFixed: 0.3, cryptoPercent: 1, averageOrder: 60 };

export const plans = [
  {
    id: "launch",
    name: "Launch",
    price: "0",
    unit: "per month",
    blurb: "Pay only when you get paid.",
    cta: "Start accepting payments",
    dark: false,
    features: ["2.9% + $0.30 per card payment", "1% per crypto payment", "Payment links and hosted checkout", "Next-day payouts"],
  },
  {
    id: "scale",
    name: "Scale",
    price: "149",
    unit: "per month",
    blurb: "For teams processing over $50,000 a month.",
    cta: "Get started",
    dark: true,
    features: ["2.5% + $0.30 per card payment", "0.8% per crypto payment", "Subscriptions and split payments", "Same-day payouts", "Priority support"],
  },
] as const;

export const faqs = [
  {
    q: "Which currencies can my customers pay in?",
    a: "Cards are accepted in 42 countries and shown in the customer's own currency. Crypto payments are accepted in the major dollar stablecoins and two large networks' native coins.",
  },
  {
    q: "How do payouts in digital dollars work?",
    a: "At settlement, your balance is converted to a dollar stablecoin and sent to the wallet you choose. You can also pay out to a bank account, or split between the two.",
  },
  {
    q: "Do I have to hold crypto?",
    a: "No. If you prefer, every crypto payment is converted on arrival and paid out to your bank like a card payment.",
  },
  {
    q: "Is this a real payment service?",
    a: "No. Tessera Pay is a concept website. The rates, coverage and calculator are demonstration content, and no payment can be made here.",
  },
];

export function dollars(value: number, digits = 2): string {
  return `$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}
