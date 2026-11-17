export const APP_PATH = "/demos/denarius/app/";
export const HOME_PATH = "/demos/denarius/";
export const ASSETS = "/showcase/denarius";

export const navLinks = [
  { label: "Features", href: "#security" },
  { label: "Personal", href: "#platform" },
  { label: "Solutions", href: "#payments" },
] as const;

/** Invented partner names for the hero strip. Each is drawn as a small wordmark in code. */
export const partners = ["Quillbank", "Verdane", "Tamber Vale", "Northline", "Flaremont"] as const;

export type CurrencyCode = "AUD" | "CHF" | "KRW" | "SGD" | "USD" | "SEK";

export type Currency = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Demonstration rate against the US dollar. */
  rate: number;
  digits: number;
};

export const BALANCE_USD = 45281.09;

/** Tile order follows the reference: three to the left of the card, three to the right. */
export const currencies: Currency[] = [
  { code: "AUD", label: "Australian dollar", symbol: "A$", rate: 1.52, digits: 2 },
  { code: "CHF", label: "Swiss franc", symbol: "Fr", rate: 0.88, digits: 2 },
  { code: "KRW", label: "South Korean won", symbol: "₩", rate: 1384, digits: 0 },
  { code: "SGD", label: "Singapore dollar", symbol: "S$", rate: 1.34, digits: 2 },
  { code: "USD", label: "US dollar", symbol: "$", rate: 1, digits: 2 },
  { code: "SEK", label: "Swedish krona", symbol: "kr", rate: 10.46, digits: 2 },
];

export type SecurityCard = {
  id: "protection" | "monitoring" | "transactions";
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  points: string[];
};

export const securityCards: SecurityCard[] = [
  {
    id: "protection",
    title: "Smart Protection",
    text: "Stay one step ahead with security designed to protect every transaction.",
    image: "temple-hephaestus.webp",
    imageAlt: "Doric temple seen from below against a dark blue sky",
    points: [
      "Biometric sign-in on every device, with a passcode fallback",
      "Cards freeze in one tap and unfreeze just as quickly",
      "Savings sit in their own vault, apart from everyday spending",
    ],
  },
  {
    id: "monitoring",
    title: "Real-Time Monitoring",
    text: "Get continuous protection against unusual activity and potential threats.",
    image: "acropolis-hill.webp",
    imageAlt: "Hilltop temple above dark trees at dusk",
    points: [
      "Instant alerts for every payment, refund and sign-in",
      "Unusual spending is paused until you approve it",
      "A daily summary of what moved and why",
    ],
  },
  {
    id: "transactions",
    title: "Secure Every Transaction",
    text: "Manage your money confidently with reliable security built into every payment.",
    image: "painting-acropolis.webp",
    imageAlt: "Nineteenth-century painting of an ancient citadel in warm evening light",
    points: [
      "Payee names are checked before money leaves",
      "Single-use card numbers for online shopping",
      "Every transfer is confirmed with a second step",
    ],
  },
];

export type PlatformItem = {
  title: string;
  text: string;
  /** What the phone shows when this item is selected. */
  screen: { label: string; delta: string; values: number[] };
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] as const;

export const platformItems: PlatformItem[] = [
  {
    title: "Know Where Your Money Goes",
    text: "Every payment is sorted into a category the moment it lands, so the month explains itself.",
    screen: { label: "Spending", delta: "32.1%", values: [3420, 2350, 3520, 2780, 4130, 3520, 1081.32] },
  },
  {
    title: "One View, Every Account",
    text: "Current accounts, savings and travel pots sit side by side, with one combined balance.",
    screen: { label: "Deposits", delta: "12.4%", values: [5200, 5200, 5650, 4300, 6100, 5900, 5200] },
  },
  {
    title: "Plan Today, Reach Tomorrow",
    text: "Set a limit for each category and watch the month fill up against it, not after it.",
    screen: { label: "Budgeted", delta: "4.0%", values: [2300, 2100, 2350, 2350, 2600, 2350, 2150] },
  },
  {
    title: "Build a Stronger Financial Future",
    text: "Round-ups and scheduled transfers move money into savings before you can miss it.",
    screen: { label: "Saved", delta: "18.6%", values: [820, 1040, 1180, 1260, 1520, 1610, 1690.48] },
  },
];

export const PHONE_BALANCE = 280120.23;

export type Story = { quote: string; role: string; since: string; bust: string; bustAlt: string };

/**
 * Member stories are illustrative and attributed to roles, not to named people.
 * Each is paired with a marble portrait bust instead of a photograph of a person.
 */
export const stories: Story[] = [
  {
    quote:
      "Before using this app, I often lost track of where my money was going. Now I can see my expenses clearly, manage my budget, and know exactly how much I can save each month",
    role: "Freelance illustrator",
    since: "Member since 2023",
    bust: "bust-1.webp",
    bustAlt: "Marble portrait bust of a young man looking to one side",
  },
  {
    quote:
      "We run the household from one shared view. Rent, groceries and the holiday pot each have a limit, and nobody has to ask who paid for what",
    role: "Couple sharing a budget",
    since: "Members since 2022",
    bust: "bust-2.webp",
    bustAlt: "Marble portrait bust of a woman with braided hair",
  },
  {
    quote:
      "The alert arrived before the card reader had finished printing the receipt. When a payment looked wrong, I froze the card from the same screen",
    role: "Hospital pharmacist",
    since: "Member since 2024",
    bust: "bust-3.webp",
    bustAlt: "Marble portrait bust of a man with short curled hair",
  },
  {
    quote:
      "I get paid in three currencies. Seeing everything as one balance, at one rate, is the first time my income has made sense on a single page",
    role: "Remote product designer",
    since: "Member since 2023",
    bust: "bust-4.webp",
    bustAlt: "Marble portrait bust of a woman wearing a diadem",
  },
  {
    quote:
      "Round-ups felt like a gimmick until the first year closed. The savings pot had grown without a single transfer I had to remember",
    role: "Secondary school teacher",
    since: "Member since 2021",
    bust: "bust-5.webp",
    bustAlt: "Marble portrait bust of a woman in a draped tunic",
  },
];

export const faqs = [
  {
    q: "Is Denarius a bank?",
    a: "No. Denarius is a concept personal-finance app. In this demonstration, balances and payments are sample data held in your browser only.",
  },
  {
    q: "What does it cost?",
    a: "The core app is free: accounts, categories, budgets and alerts. Denarius Plus adds multi-currency pots and shared budgets for $6 a month.",
  },
  {
    q: "Can I try it without signing up?",
    a: "Yes. Open the web app from any button on this page. It starts with a sample profile and resets when you reload.",
  },
  {
    q: "Which currencies are supported?",
    a: "The demo card converts between US and Australian dollars, Swiss francs, Singapore dollars, Swedish kronor and Korean won at fixed demonstration rates.",
  },
];

export const footerMenu = [
  { label: "Features", href: "#security" },
  { label: "Solutions", href: "#payments" },
  { label: "Platform", href: "#platform" },
  { label: "Stories", href: "#stories" },
  { label: "Questions", href: "#faq" },
] as const;

export const contact = {
  phone: "+1 (555) 010-0142",
  email: "hello@denarius.example",
  address: "14 Forum Row, Suite 3 (demonstration address)",
};
