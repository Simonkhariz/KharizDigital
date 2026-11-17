export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
];

export const partners = ["MAILBARN", "OLVA", "KIRRO", "SEVENDO"];

export type IconKey = "cloud" | "code" | "database" | "mail" | "chat" | "flow" | "text" | "image" | "audio" | "table";

export interface Tile {
  id: string;
  icon: IconKey;
  label: string;
  text: string;
}

export const workspaceTiles: Tile[] = [
  { id: "storage", icon: "cloud", label: "Cloud storage", text: "Files are renamed, filed and shared with the right people as they arrive." },
  { id: "code", icon: "code", label: "Code review", text: "Pull requests get a first pass overnight: failing checks, missing tests, a plain summary." },
  { id: "data", icon: "database", label: "Databases", text: "Ask a question in plain words and get the query, the answer and the caveats." },
  { id: "mail", icon: "mail", label: "Email", text: "Shared inboxes are triaged and drafted, so mornings start with replies to approve." },
  { id: "chat", icon: "chat", label: "Team chat", text: "Long threads are condensed into decisions, owners and dates." },
  { id: "flow", icon: "flow", label: "Workflows", text: "Hand-offs between tools run on their own and report back when something is stuck." },
];

export const modalityTiles: Tile[] = [
  { id: "text", icon: "text", label: "Documents", text: "Contracts, briefs and wikis are read in full, with every claim linked to its page." },
  { id: "code", icon: "code", label: "Code", text: "Repositories are understood as a whole, not one file at a time." },
  { id: "table", icon: "table", label: "Spreadsheets", text: "Tables are checked for breaks in the pattern before anyone builds on them." },
  { id: "image", icon: "image", label: "Images", text: "Screenshots, scans and whiteboard photos become searchable notes." },
  { id: "audio", icon: "audio", label: "Meetings", text: "Recordings turn into minutes with actions assigned to the people who took them." },
  { id: "flow", icon: "flow", label: "Diagrams", text: "Process maps are read as steps, so gaps and loops are flagged." },
];

export const features = [
  {
    title: "A queue that empties itself",
    text: "Assign routine work at six in the evening. Nocturn works through it while the office is dark and leaves each task with its sources attached.",
  },
  {
    title: "Review, do not redo",
    text: "Every result arrives as a draft with what was changed and why. Approve it, edit it or send it back with a note.",
  },
  {
    title: "Knows where things live",
    text: "Nocturn learns your folders, channels and naming habits, so finished work lands where your team would look for it.",
  },
];

export interface NightEntry {
  time: string;
  kind: "Email" | "Docs" | "Code" | "Data";
  text: string;
}

/** A sample night, used by the "while you slept" log. */
export const nightLog: NightEntry[] = [
  { time: "19:42", kind: "Email", text: "Triaged 64 messages in the support inbox and drafted 21 replies." },
  { time: "21:10", kind: "Docs", text: "Merged three versions of the Q3 planning brief and listed five conflicts." },
  { time: "22:35", kind: "Code", text: "Reviewed 7 pull requests; 2 need tests before they can merge." },
  { time: "00:18", kind: "Data", text: "Rebuilt the weekly revenue sheet and flagged one duplicated invoice." },
  { time: "02:47", kind: "Email", text: "Chased 9 unanswered supplier quotes with a polite second note." },
  { time: "04:05", kind: "Docs", text: "Turned Tuesday's all-hands recording into minutes with 12 actions." },
  { time: "06:30", kind: "Data", text: "Prepared the morning summary: 6 tasks done, 3 waiting for review." },
];

export const plans = [
  {
    name: "Dusk",
    price: 0,
    unit: "free for 3 people",
    blurb: "Try a night shift with a small team.",
    features: ["20 overnight tasks a month", "Email and documents", "Morning summary"],
    cta: "Start Free",
  },
  {
    name: "Midnight",
    price: 18,
    unit: "per person / month",
    featured: true,
    blurb: "The full workspace for teams that ship weekly.",
    features: ["Unlimited overnight tasks", "All six tools and modalities", "Review and approval flow", "Shared team memory"],
    cta: "Start Free",
  },
  {
    name: "Dawn",
    price: 42,
    unit: "per person / month",
    blurb: "Controls and support for larger organisations.",
    features: ["Everything in Midnight", "Single sign-on and audit log", "Private deployment option", "A named support engineer"],
    cta: "Book a Demo",
  },
];

export const faqs = [
  {
    question: "Does Nocturn act without anyone checking?",
    answer: "Not by default. Work is prepared as drafts and waits for a person to approve it. You can allow specific low-risk tasks, such as filing documents, to complete on their own.",
  },
  {
    question: "Which tools does it connect to?",
    answer: "Cloud storage, code hosts, databases, email, team chat and workflow tools that offer standard sign-in. Each connection can be limited to chosen folders, repositories or channels.",
  },
  {
    question: "What happens if a task goes wrong overnight?",
    answer: "Nocturn stops, records what it tried and puts the task at the top of the morning summary. Nothing is sent or merged from a failed task.",
  },
  {
    question: "Is our data used to train models?",
    answer: "No. Your workspace data is used only to complete your team's tasks and is deleted when you disconnect a tool.",
  },
];
