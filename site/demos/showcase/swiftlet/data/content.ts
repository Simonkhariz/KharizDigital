export const APP_PATH = "/demos/swiftlet/app/";
export const HOME_PATH = "/demos/swiftlet/";

export const navLinks = [
  { label: "Mail", href: "#mail" },
  { label: "Agents", href: "#agents" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
] as const;

export const logos = [
  { name: "Norwick", mark: "lines", style: "plain" },
  { name: "loopline", mark: "loop", style: "plain" },
  { name: "Fieldmere", mark: "grid", style: "condensed" },
  { name: "HALDEN", mark: "peak", style: "spaced" },
  { name: "Brightwell", mark: "ring", style: "plain" },
  { name: "Arcady", mark: "arc", style: "italic" },
] as const;

export type LogoMarkKind = (typeof logos)[number]["mark"];

export const mockAgents = [
  {
    id: "style",
    name: "Style agent",
    color: "#8a63f0",
    summary: "Drafts replies in your voice and matches the tone of the thread.",
    steps: ["Read the last 6 messages in the thread", "Matched tone: friendly, brief", "Drafted a 2-sentence reply", "Waiting for you to send"],
    stat: "14 drafts today",
  },
  {
    id: "brief",
    name: "Daily brief",
    color: "#f08a4b",
    summary: "Summarises what changed overnight and what needs you first.",
    steps: ["Scanned 31 new messages", "Grouped into 4 topics", "Flagged 2 replies that are due today", "Brief delivered at 8:00"],
    stat: "Delivered 8:00",
  },
  {
    id: "triage",
    name: "Triage",
    color: "#3fa56b",
    summary: "Labels incoming mail and moves anything that can wait to Later.",
    steps: ["Checked 12 inbox threads", "Applied 7 labels", "Moved 3 newsletters to Later", "Inbox is sorted"],
    stat: "7 labels applied",
  },
  {
    id: "followup",
    name: "Follow-ups",
    color: "#4a7df0",
    summary: "Watches threads you are waiting on and nudges when they go quiet.",
    steps: ["Watching 3 threads in Waiting", "1 thread quiet for 4 days", "Prepared a short nudge", "Ready when you are"],
    stat: "3 threads watched",
  },
] as const;

export const mockDocs = [
  {
    id: "q3",
    title: "Q3 narrative",
    meta: "Edited 9:12 by Pilar",
    paragraphs: [
      "We shipped the command palette, shared drafts and the first two agents. Search now returns in under 40 ms for every workspace.",
      "Offline mode slipped to next quarter. The sync engine needed one more pass before we were willing to trust it with mail.",
    ],
    before: "Retention is good and we think it will be even better going forward.",
    after: "Week-8 retention rose from 61% to 68%, and the palette is the feature retained users open most.",
  },
  {
    id: "onboarding",
    title: "Onboarding review",
    meta: "Edited 8:55 by Design team",
    paragraphs: [
      "The first-run screen now teaches three shortcuts instead of seven: J and K to move, E to archive.",
      "Import moved after the first sent message, so people feel the speed before they wait for a sync.",
    ],
    before: "Users will probably like this more.",
    after: "In testing, 9 of 12 people archived their first message by keyboard within a minute.",
  },
  {
    id: "offsite",
    title: "Offsite agenda",
    meta: "Edited Monday by Nia",
    paragraphs: [
      "Trains leave at 8:10 on the 14th. Sessions run from 11:00 to 17:00 on both days.",
      "Day one covers the annual plan. Day two is hands-on: every team ships one small improvement before 16:00.",
    ],
    before: "Dinner is at some point in the evening.",
    after: "Dinner is at 19:30 at the harbour hall, a ten-minute walk from the venue.",
  },
] as const;

export const agentCards = {
  inline: {
    label: "Inline suggestions",
    title: "Agents flag what needs fixing as you type. Mid-sentence, mid-thought.",
  },
  chat: {
    label: "Context-aware chat",
    title: "Ask about the thread in front of you. The agent has already read it.",
    prompts: [
      {
        id: "summary",
        ask: "Summarize this thread",
        answer: "Kai wants to move ahead. Two open questions: a start date on the 1st and a walkthrough for regional leads this week.",
      },
      {
        id: "reply",
        ask: "Draft a reply",
        answer: "Glad the direction landed! Happy to walk your team through it. I am free 10 to 12 on Thursday.",
      },
      {
        id: "dates",
        ask: "What dates were mentioned?",
        answer: "Rollout on the 1st, and a walkthrough some time this week. Your calendar is open Thursday morning.",
      },
    ],
  },
  rules: {
    label: "Plain-language rules",
    title: "Tell an agent what to do in one sentence. Switch it off just as fast.",
    items: [
      { id: "r1", text: "Move newsletters to Later", on: true },
      { id: "r2", text: "Label anything with a contract as Legal", on: true },
      { id: "r3", text: "Draft replies to meeting requests", on: false },
    ],
  },
  review: {
    label: "You stay in control",
    title: "Nothing is sent without you. Every draft waits for one key.",
  },
} as const;

export const shortcutGroups = [
  {
    title: "Move",
    items: [
      { keys: ["J"], label: "Next message" },
      { keys: ["K"], label: "Previous message" },
      { keys: ["G", "I"], label: "Go to Inbox" },
      { keys: ["/"], label: "Search" },
    ],
  },
  {
    title: "Act",
    items: [
      { keys: ["E"], label: "Archive" },
      { keys: ["S"], label: "Star" },
      { keys: ["U"], label: "Mark read or unread" },
      { keys: ["H"], label: "Move to Later" },
    ],
  },
  {
    title: "Write",
    items: [
      { keys: ["C"], label: "Compose" },
      { keys: ["R"], label: "Reply" },
      { keys: ["⌘", "Enter"], label: "Send" },
      { keys: ["?"], label: "Show every shortcut" },
    ],
  },
] as const;

export const plans = [
  {
    id: "solo",
    name: "Solo",
    monthly: 0,
    blurb: "One inbox, every shortcut.",
    features: ["1 mail account", "Unlimited docs", "Command palette", "25 agent runs a month"],
    cta: "Start free",
    featured: false,
  },
  {
    id: "team",
    name: "Team",
    monthly: 16,
    blurb: "Shared drafts and agents for the whole team.",
    features: ["Everything in Solo", "Shared inboxes and drafts", "Unlimited agent runs", "Plain-language rules", "Priority support"],
    cta: "Start free trial",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: 28,
    blurb: "Controls and audit trails for larger companies.",
    features: ["Everything in Team", "Single sign-on", "Audit log and retention rules", "Custom agents", "Dedicated onboarding"],
    cta: "Contact sales",
    featured: false,
  },
] as const;

export const YEARLY_DISCOUNT = 0.2;

export const posts = [
  {
    id: "frame",
    date: "October 28",
    tag: "Engineering",
    title: "Why every action has to finish inside one frame",
    excerpt: "How we got the command palette to open in 16 ms, and why we stopped measuring averages.",
    body: "We budget 16 ms for anything that follows a key press. To stay inside it, the list is rendered from a local index, network calls never block input, and every release is tested on a five-year-old laptop. Averages hid the slow cases, so we now track the slowest 5% only.",
  },
  {
    id: "agents",
    date: "October 14",
    tag: "Product",
    title: "Agents that wait for you",
    excerpt: "Drafts, labels and briefs are prepared in the background. Sending stays a human decision.",
    body: "An agent in Swiftlet can read, label, summarise and draft. It cannot send. Every prepared reply waits next to the message with one key to send and one to edit, and each rule can be switched off from the same panel that created it.",
  },
  {
    id: "seven",
    date: "September 30",
    tag: "Design",
    title: "Three shortcuts are enough to start",
    excerpt: "We cut onboarding from seven shortcuts to three and people learned more of them.",
    body: "New users were shown seven shortcuts and remembered one. We now teach J, K and E, then reveal the next key only when it would have saved a click. After four weeks, the median user knows eleven.",
  },
] as const;

export const faqs = [
  {
    q: "Does Swiftlet work with my existing mail account?",
    a: "Yes. Swiftlet connects to standard hosted mail accounts and keeps folders, labels and read state in sync in both directions.",
  },
  {
    q: "Can I use it without learning the shortcuts?",
    a: "Everything is reachable with a pointer. Shortcuts are shown next to each action, so you pick them up as you go.",
  },
  {
    q: "Do agents ever send mail on their own?",
    a: "No. Agents prepare drafts, labels and summaries. A person presses Send every time.",
  },
  {
    q: "What happens to my data?",
    a: "Mail and docs are encrypted in transit and at rest, and are never used to train shared models. Business plans add retention rules and an audit log.",
  },
  {
    q: "Is there a free plan?",
    a: "Solo is free for one account, with 25 agent runs a month. Team and Business start with a 14-day trial.",
  },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Mail", href: "#mail" },
      { label: "Agents", href: "#agents" },
      { label: "Docs", href: "#docs" },
      { label: "Shortcuts", href: "#shortcuts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Blog", href: "#blog" },
      { label: "Questions", href: "#faq" },
    ],
  },
] as const;
