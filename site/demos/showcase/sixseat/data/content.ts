export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
  { label: "Blog", href: "#blog" },
] as const;

export type Tone = "blue" | "orange" | "pink" | "green" | "ink" | "white";

export const toneColors: Record<Tone, string> = {
  blue: "#3b5bfd",
  orange: "#c2500a",
  pink: "#d6336c",
  green: "#0f8a4f",
  ink: "#17181c",
  white: "#ffffff",
};

export const marquee = [
  { name: "Hollin Labs", serif: true },
  { name: "Paralline", serif: false },
  { name: "Marsh & Co.", serif: true },
  { name: "Ostrow", serif: false },
  { name: "Lumina Health", serif: true },
  { name: "Pennant", serif: false },
  { name: "Quorate", serif: true },
] as const;

export const seats = [
  { id: "maya", label: "Maya", tone: "blue", labelAt: "top" },
  { id: "agent03", label: "Agent 03", tone: "orange", labelAt: "bottom" },
  { id: "theo", label: "Theo", tone: "pink", labelAt: "top" },
  { id: "research", label: "Research agent", tone: "green", labelAt: "bottom" },
  { id: "imani", label: "Imani", tone: "ink", labelAt: "top" },
  { id: "open", label: "Open seat", tone: "white", labelAt: "none" },
] as const;

export const layers = [
  {
    id: "presence",
    title: "Presence",
    text: "See who is in the run, human or agent, and what each of them is looking at right now.",
  },
  {
    id: "steering",
    title: "Steering",
    text: "Leave a note mid-task. The agent reads it at its next step and changes course without restarting.",
  },
  {
    id: "handoff",
    title: "Handoff",
    text: "Take the run yourself with the full history attached, then hand it back when you are done.",
  },
] as const;

export const sessionSteps = [
  { who: "Agent 03", tone: "orange", text: "Opened the vendor contract and the two earlier amendments." },
  { who: "Agent 03", tone: "orange", text: "Compared clause 7 across all three versions. Notice period differs: 30, 30 and 60 days." },
  { who: "Maya", tone: "blue", text: "Flag anything that changes liability, not only notice." },
  { who: "Agent 03", tone: "orange", text: "Noted. Re-reading clauses 9 to 12 for liability changes." },
  { who: "Research agent", tone: "green", text: "Pulled the liability cap from last year's master agreement: 12 months of fees." },
  { who: "Agent 03", tone: "orange", text: "Clause 11 lowers the cap to 6 months of fees. Drafting a summary for review." },
] as const;

export const useCases = [
  {
    id: "engineering",
    label: "Engineering",
    title: "Review the migration while it runs",
    text: "A coding agent works through a schema migration. The on-call engineer watches the plan, stops it before the destructive step and takes the last mile.",
    points: ["Live diff and command log for everyone in the session", "Pause before any step marked destructive", "Handoff keeps the shell history and open files"],
    seats: ["blue", "orange", "ink"],
  },
  {
    id: "support",
    label: "Support",
    title: "Sit in on the difficult ticket",
    text: "A support agent drafts a refund reply. A team lead drops in, adjusts the tone in one note and approves the send.",
    points: ["Leads can join any run from the queue", "Notes apply at the agent's next step", "Approval is recorded with the transcript"],
    seats: ["pink", "orange"],
  },
  {
    id: "legal",
    label: "Legal",
    title: "Redline with counsel in the room",
    text: "A contract agent compares versions clause by clause. Counsel steers what counts as material and signs off on the summary.",
    points: ["Clause-level comparison in a shared view", "Every instruction is attributed and timestamped", "Export the session as a review record"],
    seats: ["green", "blue", "orange", "pink"],
  },
  {
    id: "research",
    label: "Research",
    title: "Follow the sources as they are found",
    text: "A research agent gathers and reads sources. Analysts watch the list build, drop weak ones and redirect the search.",
    points: ["Source list updates live", "Remove a source and the agent re-plans", "Two agents can share one run"],
    seats: ["green", "orange", "blue"],
  },
] as const;

export const plans = [
  {
    id: "duo",
    name: "Duo",
    price: 0,
    unit: "free for 2 seats",
    text: "One person and one agent, sharing a run.",
    features: ["2 seats per session", "7-day session history", "Watch and steer"],
    cta: "Start a session",
    dialog: "start",
    featured: false,
  },
  {
    id: "table",
    name: "Table",
    price: 18,
    unit: "per human seat a month",
    text: "The full six seats, for teams that work alongside agents.",
    features: ["6 seats per session", "Agent seats are free", "Handoff with full history", "Unlimited session history"],
    cta: "Start a 14-day trial",
    dialog: "start",
    featured: true,
  },
  {
    id: "hall",
    name: "Hall",
    price: null,
    unit: "custom",
    text: "Many tables, with the controls a larger company needs.",
    features: ["Unlimited tables", "Single sign-on and audit export", "Private deployment", "Named support contact"],
    cta: "Talk to us",
    dialog: "contact",
    featured: false,
  },
] as const;

export const changelog = [
  { version: "2.4", date: "Nov 3", title: "Hand a run back", text: "After a handoff you can return the run to the agent with a note about what you changed." },
  { version: "2.3", date: "Oct 20", title: "Named cursors for agents", text: "Agents now show a labelled cursor on the step they are working on, just as people do." },
  { version: "2.2", date: "Oct 6", title: "Pause before destructive steps", text: "Mark a kind of step as destructive and the session waits for a person before running it." },
  { version: "2.1", date: "Sep 22", title: "Session export", text: "Download any session as a single review record with every instruction attributed." },
] as const;

export const posts = [
  {
    id: "audience",
    tag: "Essay",
    title: "The audience-of-one problem",
    excerpt: "Why most agent work is seen by the one person who started it, and what that costs a team.",
    body: "An agent run usually lives in one person's terminal or chat window. The reviewer sees a summary, the owner sees a result, and nobody sees the decisions in between. A shared session moves review from after the work to during it, when a one-line note is still cheap.",
  },
  {
    id: "six",
    tag: "Design",
    title: "Why six seats",
    excerpt: "We tested sessions from two to twenty participants. Six was where steering stopped helping.",
    body: "With two or three people in a run, notes are quick and rarely conflict. Past six, instructions start to contradict each other and the agent spends its steps reconciling them. Six seats is a constraint that keeps a session readable.",
  },
  {
    id: "handoff",
    tag: "Engineering",
    title: "What a clean handoff carries",
    excerpt: "History, open files, pending steps: the state we move when a person takes the run.",
    body: "A handoff that only transfers the transcript forces the person to rebuild context. Ours moves the working state as well: files, variables, the plan and the steps still pending, so taking over feels like continuing rather than starting again.",
  },
] as const;

export const faqs = [
  { q: "Which agents can join a session?", a: "Any agent that can call a web API. You add a short adapter and the agent appears as a seat with its own cursor and name." },
  { q: "Can an agent ignore a steering note?", a: "Notes are delivered at the agent's next step and logged either way. You can also require an acknowledgement before the run continues." },
  { q: "Do agent seats cost money?", a: "No. On the Table plan you pay for human seats only; agents sit for free." },
  { q: "What is stored after a session ends?", a: "The transcript, the notes and the handoff state, for as long as your plan's history allows. You can delete any session at any time." },
] as const;

export const footerColumns = [
  { title: "Product", links: [{ label: "Three layers", href: "#product" }, { label: "Use cases", href: "#use-cases" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Updates", links: [{ label: "Changelog", href: "#changelog" }, { label: "Blog", href: "#blog" }, { label: "Questions", href: "#faq" }] },
] as const;
