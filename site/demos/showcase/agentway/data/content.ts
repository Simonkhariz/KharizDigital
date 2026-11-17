export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#notes" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const masthead = { left: "A field guide to building for agents", middle: "Agentway · Vol. 2", right: "October 2026" } as const;

export const heroStats = [
  { value: "2,000+", label: "Products agent-ready" },
  { value: "2.1B", label: "Agent calls a month" },
  { value: "41s", label: "To first paid call" },
] as const;

export const logos = [
  { name: "Tallybook", icon: "ledger" },
  { name: "Southdraft", icon: "wind" },
  { name: "Merrow", icon: "waves" },
  { name: "Pilot Works", icon: "flask" },
  { name: "Cartwell", icon: "bag" },
] as const;

export interface Idea {
  n: string;
  tag: string;
  title: string;
  text: string;
  part: string;
  proof: {
    label: string;
    rows: { name: string; note: string; value: string; share: number; win?: boolean }[];
    caption: string;
  };
}

/** `share` is the bar length as a fraction of the slowest or largest row. */
export const ideas: Idea[] = [
  {
    n: "01",
    tag: "Interfaces",
    title: "Agents don’t click.",
    text: "Every form, modal and CAPTCHA is a wall to a user that reads JSON. Give agents a contract instead of a screen, and they finish in seconds what takes minutes through a browser.",
    part: "Contracts turn any workflow into one typed call.",
    proof: {
      label: "Book a freight pickup",
      rows: [
        { name: "Browser", note: "10 steps", value: "3:12", share: 1 },
        { name: "Contract", note: "1 call", value: "0:04", share: 0.021, win: true },
      ],
      caption: "Median of 1,200 agent runs against the same carrier, September 2026.",
    },
  },
  {
    n: "02",
    tag: "Discovery",
    title: "Agents don’t browse.",
    text: "An agent never sees your landing page. It asks a registry what can do the job, reads the schema and the price, and picks. If you are not listed, you do not exist.",
    part: "The registry publishes what you do, in a form agents can compare.",
    proof: {
      label: "How agents found a product",
      rows: [
        { name: "Registry lookup", note: "schema + price", value: "71%", share: 0.71, win: true },
        { name: "Docs crawl", note: "unstructured", value: "22%", share: 0.22 },
        { name: "Web search", note: "landing pages", value: "7%", share: 0.07 },
      ],
      caption: "Share of first calls by discovery path, across Agentway traffic.",
    },
  },
  {
    n: "03",
    tag: "Payments",
    title: "Agents don’t have cards.",
    text: "They have a budget and a mandate. Signup forms, seat plans and invoices all assume a person. Price per call, settle instantly, and let the mandate say how far the agent may go.",
    part: "Metering prices each call and settles it against a spending mandate.",
    proof: {
      label: "Time to first paid call",
      rows: [
        { name: "Signup + card", note: "needs a person", value: "2 days", share: 1 },
        { name: "Mandate", note: "no person", value: "41s", share: 0.012, win: true },
      ],
      caption: "Median from first discovery to first settled call.",
    },
  },
  {
    n: "04",
    tag: "Trust",
    title: "Agents don’t remember.",
    text: "So someone has to be able to check. Every call needs a receipt: who asked, on whose behalf, what was promised and what it cost. Disputes become lookups.",
    part: "Receipts sign every call so both sides can prove what happened.",
    proof: {
      label: "Disputed calls resolved",
      rows: [
        { name: "With receipts", note: "automatic", value: "98%", share: 0.98, win: true },
        { name: "With logs only", note: "by email", value: "34%", share: 0.34 },
      ],
      caption: "Resolved within one hour, over the last 90 days.",
    },
  },
];

export const platform = [
  {
    id: "contract",
    label: "Contracts",
    title: "Describe the job once.",
    text: "A contract is a typed description of something your product can do. Agentway turns it into an endpoint, a schema and a registry listing.",
    code: [
      "contract book_pickup {",
      "  input  { origin: Address, pallets: int, by: Date }",
      "  output { pickup_id: string, window: TimeRange }",
      "  price  0.40 USD per call",
      "}",
    ],
  },
  {
    id: "registry",
    label: "Registry",
    title: "Be found by the right agents.",
    text: "Listings carry the schema, price, latency and success rate, so an agent can compare you with alternatives before it calls.",
    code: [
      "$ agentway find \"book freight pickup\"",
      "  1  northdock/book_pickup    $0.40   p50 1.1s   99.2%",
      "  2  haulwise/schedule        $0.55   p50 2.4s   97.8%",
      "  3  loadline/pickup_v2       $0.38   p50 3.9s   94.1%",
    ],
  },
  {
    id: "metering",
    label: "Metering",
    title: "Get paid per call.",
    text: "Agents present a spending mandate. Each call is priced, checked against the mandate and settled, with no signup and no invoice.",
    code: [
      "mandate m_81f2 {",
      "  on_behalf_of  \"ops@customer.example\"",
      "  limit         50.00 USD per day",
      "  allow         book_pickup, track",
      "}",
    ],
  },
  {
    id: "receipts",
    label: "Receipts",
    title: "Prove what happened.",
    text: "Both sides receive a signed receipt for every call. It records the request, the result, the price and the mandate that paid.",
    code: [
      "receipt r_5c09a1",
      "  contract  northdock/book_pickup",
      "  mandate   m_81f2",
      "  result    ok · pickup_id PU-20418",
      "  charged   0.40 USD · signed by both parties",
    ],
  },
] as const;

export const plans = [
  {
    name: "Sandbox",
    price: "$0",
    unit: "",
    text: "Build and test contracts with simulated agents.",
    points: ["3 contracts", "10,000 test calls a month", "Private registry listing"],
    cta: "Start building",
  },
  {
    name: "Live",
    price: "2%",
    unit: "of settled calls",
    text: "Go public in the registry and get paid per call.",
    points: ["Unlimited contracts", "Public registry listing", "Mandates and instant settlement", "Signed receipts, kept 1 year"],
    cta: "Start building",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    unit: "",
    text: "For more than 5 million calls a month.",
    points: ["Volume pricing", "Dedicated region", "Receipts kept 7 years", "Solutions engineer"],
    cta: "Talk to us",
  },
] as const;

export const notes = [
  { n: "2.4", title: "What agents read before they call you", text: "We logged every field agents requested from registry listings. Price and success rate were read nine times in ten; marketing copy, never.", minutes: 6 },
  { n: "2.3", title: "A mandate is not an API key", text: "Keys say who is calling. Mandates say on whose behalf, for what, and up to how much. That difference is what makes delegation safe.", minutes: 8 },
  { n: "2.2", title: "Designing errors for readers that retry", text: "An agent will try again in forty milliseconds. Errors should say whether to retry, change the input, or stop and ask a person.", minutes: 5 },
] as const;

export const topics = ["Making a product agent-ready", "Pricing and metering", "Partnerships", "Something else"] as const;
