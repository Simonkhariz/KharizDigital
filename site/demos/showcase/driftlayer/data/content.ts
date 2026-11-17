export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Journal", href: "#journal" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  title: ["Intelligence,", "light as air."],
  body: "Driftlayer is the ambient assistant layer that quietly connects your tools, your team and your ideas, so the work feels weightless.",
  primary: "Start floating",
  secondary: "See it work",
};

export const intro = {
  pill: "What is Driftlayer",
  titleStart: "One quiet layer of intelligence,",
  titleAccent: "everywhere you work.",
  body: "No new tabs. No prompt gymnastics. Driftlayer lives above your stack like weather. It reads context, moves information and finishes the busywork before you notice it was there.",
  cta: "See how it works",
};

export const principles = {
  titleStart: "Where",
  titleAccent: "simple",
  titleEnd: "meets powerful.",
  body: "Three ideas sit behind everything we build. If it adds weight, it doesn’t ship.",
  cards: [
    {
      image: "card-single-cloud",
      width: 1000,
      height: 750,
      focus: "50% 28%",
      title: "Nothing to open",
      body: "It works inside the tools you already use. There is no extra window to keep an eye on.",
      alt: "A single small white cloud in a deep blue sky",
    },
    {
      image: "card-bubbles",
      width: 900,
      height: 1273,
      focus: "50% 30%",
      title: "Context, not commands",
      body: "It reads the thread, the doc and the calendar, so you never have to explain the situation.",
      alt: "Soap bubbles floating in a clear blue sky",
    },
    {
      image: "card-dusk-clouds",
      width: 900,
      height: 1200,
      focus: "50% 40%",
      title: "Quiet by default",
      body: "It only speaks up when a decision is yours to make. Everything else is done in the background.",
      alt: "Soft pink and violet clouds in a blue evening sky",
    },
  ],
};

export type Nudge = {
  id: string;
  source: string;
  title: string;
  detail: string;
  saves: number;
};

export const nudges: Nudge[] = [
  {
    id: "reply",
    source: "Chat thread, launch-planning",
    title: "Draft a reply with the three open decisions",
    detail: "Pulled from 42 messages since Monday. Two people are waiting on you.",
    saves: 12,
  },
  {
    id: "date",
    source: "Roadmap doc",
    title: "Move the beta date to match the new sprint plan",
    detail: "The sprint board changed yesterday. The doc still shows the old week.",
    saves: 5,
  },
  {
    id: "notes",
    source: "Calendar, design review",
    title: "File the meeting notes and assign four follow-ups",
    detail: "Owners are suggested from who spoke about each item.",
    saves: 18,
  },
  {
    id: "handoff",
    source: "Support inbox",
    title: "Hand a billing question to the finance queue",
    detail: "It has been sitting in the wrong inbox for three hours.",
    saves: 4,
  },
];

export const useCases = [
  {
    id: "product",
    label: "Product",
    title: "Specs that keep themselves current",
    body: "When a decision lands in chat, the spec, the ticket and the roadmap are updated to match, with a note saying why.",
    examples: ["Sync decisions from threads into specs", "Flag tickets that contradict the plan", "Summarise a week of feedback by theme"],
  },
  {
    id: "sales",
    label: "Sales",
    title: "Every call written up before you hang up",
    body: "Notes, next steps and the follow-up email are drafted from the conversation and filed against the right account.",
    examples: ["Draft follow-ups in your own tone", "Update deal stages from call notes", "Surface accounts that have gone quiet"],
  },
  {
    id: "support",
    label: "Support",
    title: "Tickets that arrive already sorted",
    body: "Driftlayer reads each request, attaches the relevant history and routes it to the person who solved the last one like it.",
    examples: ["Route by topic and past resolution", "Attach related tickets and docs", "Draft replies for one-click approval"],
  },
  {
    id: "ops",
    label: "Operations",
    title: "Recurring work that runs without reminders",
    body: "Weekly reports, access requests and vendor renewals are prepared ahead of time and wait for a single approval.",
    examples: ["Assemble weekly reports from live data", "Prepare renewals a month ahead", "Chase missing approvals politely"],
  },
];

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  unit: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "breeze",
    name: "Breeze",
    monthly: 0,
    annual: 0,
    unit: "for one person",
    blurb: "Try the ambient layer on your own work.",
    features: ["2 connected tools", "40 actions a month", "Approve every action yourself"],
  },
  {
    id: "jetstream",
    name: "Jetstream",
    monthly: 15,
    annual: 12,
    unit: "per person, per month",
    blurb: "For teams that want the busywork gone.",
    features: ["Unlimited connected tools", "Unlimited actions", "Shared team context", "Rules for what runs without asking"],
    featured: true,
  },
  {
    id: "stratus",
    name: "Stratus",
    monthly: 30,
    annual: 24,
    unit: "per person, per month",
    blurb: "For companies with stricter controls.",
    features: ["Everything in Jetstream", "Single sign-on and audit log", "Data residency choice", "Named support contact"],
  },
];

export const journal = [
  {
    id: "weather",
    image: "journal-paper-plane",
    width: 900,
    height: 1222,
    focus: "50% 50%",
    tag: "Product thinking",
    title: "Software should behave more like weather",
    minutes: 5,
    summary:
      "Weather does not ask for your attention. It is simply there, and you plan around it. We explain why we built an assistant with no chat window, and what we had to give up to do it.",
  },
  {
    id: "quiet",
    image: "journal-cumulus",
    width: 900,
    height: 1350,
    focus: "50% 62%",
    tag: "Design",
    title: "How we decide when to stay quiet",
    minutes: 4,
    summary:
      "Every suggestion costs a little attention. We walk through the three questions Driftlayer asks before it interrupts you, and the cases where the answer is to do nothing at all.",
  },
  {
    id: "context",
    image: "journal-bubble-cloud",
    width: 900,
    height: 1097,
    focus: "50% 55%",
    tag: "Engineering",
    title: "Context is a permission, not a feature",
    minutes: 6,
    summary:
      "Reading across tools is only useful if people trust what is being read. This piece covers how access is scoped per person, and why Driftlayer never sees more than you can.",
  },
];

export const faqs = [
  {
    q: "Does Driftlayer act without asking me?",
    a: "Only if you tell it to. Every action starts in approve-first mode. You can then set rules for kinds of work you are happy to let run on their own, and change them at any time.",
  },
  {
    q: "Which tools does it connect to?",
    a: "Chat, documents, calendars, ticketing and the common sales and support systems. You connect each one yourself and can disconnect it with one click.",
  },
  {
    q: "What can it see?",
    a: "Exactly what you can see and nothing more. Access follows your own permissions in each tool, per person, and is checked every time.",
  },
  {
    q: "Is our data used to train models?",
    a: "No. Your content is used to help your workspace only and is not used to train shared models.",
  },
  {
    q: "What does early access include?",
    a: "A Jetstream workspace for your team at no cost for the first sixty days, and a direct line to the people building it.",
  },
];

export const access = {
  title: ["Lighter work", "starts here."],
  body: "Join the early access list. We are adding teams in small groups each week.",
  sizes: ["Just me", "2 to 10 people", "11 to 50 people", "More than 50 people"],
};
