export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "What we build", href: "#build" },
  { label: "How we work", href: "#process" },
  { label: "Case studies", href: "#cases" },
  { label: "About", href: "#about" },
];

export const hero = {
  chip: "Your automation partner for the next decade",
  titleLines: ["Turn your company", "into a high-growth machine."],
  body: "Indigen helps companies move critical work from people to intelligent systems, from handling orders and documents to qualifying customers, following up, reconciling data, and managing calls.",
  cta: "Book a call",
};

/** Invented client names, set in type. */
export const clients: { name: string; style: "block" | "wide" | "node" | "lower" | "serif" | "round" | "slant" }[] = [
  { name: "PAWPOST", style: "block" },
  { name: "FAIRWAY NINE", style: "wide" },
  { name: "linkr", style: "node" },
  { name: "strata", style: "lower" },
  { name: "Hale & Morrow", style: "serif" },
  { name: "cloudcrest", style: "round" },
  { name: "T/R", style: "slant" },
];

export const pitch = {
  chip: "Your automation partner for the next decade",
  chipTag: "founders",
  titleLines: ["Agents that run your", "business workflows."],
  body: "Indigen builds and deploys agents inside the systems your company already uses, handling complete workflows from intake to resolution.",
};

export type Service = { id: string; title: string; body: string; points: string[] };

export const services: Service[] = [
  {
    id: "01",
    title: "Order and fulfilment agents",
    body: "Agents that watch every order from checkout to doorstep, spot delays early and reroute stock before a customer has to ask.",
    points: ["Delay detection", "Carrier rerouting", "Proactive customer updates"],
  },
  {
    id: "02",
    title: "Document intake",
    body: "Invoices, contracts and claims are read, checked against your records and filed in the right system, with exceptions sent to a person.",
    points: ["Extraction and validation", "Three-way matching", "Exception queues"],
  },
  {
    id: "03",
    title: "Lead qualification",
    body: "Every inbound enquiry is researched, scored against your ideal customer profile and booked with the right rep within minutes.",
    points: ["Enrichment", "Scoring rules you control", "Calendar hand-off"],
  },
  {
    id: "04",
    title: "Follow-up and collections",
    body: "Polite, persistent follow-up on quotes, renewals and overdue invoices, written in your tone and logged in your CRM.",
    points: ["Renewal reminders", "Payment plans", "Full audit trail"],
  },
  {
    id: "05",
    title: "Data reconciliation",
    body: "Agents compare ledgers, payment processors and warehouse counts every night and resolve the differences they are allowed to resolve.",
    points: ["Nightly matching", "Auto-resolution limits", "Month-end pack"],
  },
  {
    id: "06",
    title: "Voice and call handling",
    body: "Inbound calls are answered at once, routine requests are completed on the line and complex ones arrive with a written summary.",
    points: ["24-hour answering", "Warm transfer", "Call summaries"],
  },
];

export type Step = { week: string; title: string; body: string; output: string };

export const steps: Step[] = [
  {
    week: "Week 1",
    title: "Map the work",
    body: "We sit with the people who do the job today and write down each workflow as it really runs, including the awkward exceptions.",
    output: "A ranked list of workflows with the hours and cost attached to each.",
  },
  {
    week: "Weeks 2 to 3",
    title: "Build inside your stack",
    body: "Agents are built against your order system, CRM, finance tools and inboxes. Nothing is migrated and no one changes how they log in.",
    output: "A working agent in a staging copy of your systems.",
  },
  {
    week: "Weeks 4 to 5",
    title: "Run in shadow",
    body: "The agent handles live work next to your team. Every decision is compared with the human one until the two agree.",
    output: "An accuracy report and a go-live threshold you sign off.",
  },
  {
    week: "Week 6 onward",
    title: "Go live and operate",
    body: "We switch the agent on, monitor it every day and keep improving it. You pay for outcomes, not for seats.",
    output: "A monthly review with volumes, savings and the next workflow to automate.",
  },
];

export type CaseStudy = {
  id: string;
  sector: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "retail",
    sector: "Online retail",
    title: "A pet-supplies subscription stopped losing customers to late parcels.",
    summary:
      "An order agent now checks 41,000 monthly shipments against carrier scans. When a parcel slips, it reroutes from the nearest fulfilment centre and tells the customer before they notice.",
    metrics: [
      { value: "72%", label: "fewer 'where is my order' tickets" },
      { value: "4 min", label: "average time from delay to customer update" },
      { value: "6 weeks", label: "from kickoff to go-live" },
    ],
    stack: ["Order management", "Carrier feeds", "Help desk", "Finance ledger"],
  },
  {
    id: "finance",
    sector: "Financial services",
    title: "A regional lender cut loan-document checks from two days to forty minutes.",
    summary:
      "A document-intake agent reads pay slips, statements and ID, cross-checks them with the application and prepares a file for the underwriter with every discrepancy flagged.",
    metrics: [
      { value: "40 min", label: "median time to a complete file" },
      { value: "98.6%", label: "field-level extraction accuracy in audit" },
      { value: "3.1x", label: "applications handled per underwriter" },
    ],
    stack: ["Loan origination", "Document store", "Identity checks", "Email"],
  },
  {
    id: "hospitality",
    sector: "Leisure and venues",
    title: "A driving-range group now answers every booking call, even at midnight.",
    summary:
      "A voice agent takes bay bookings, moves reservations and handles group enquiries across nine venues, handing over to staff only for events and complaints.",
    metrics: [
      { value: "100%", label: "of calls answered within three rings" },
      { value: "31%", label: "more bookings taken outside opening hours" },
      { value: "9", label: "venues live on one configuration" },
    ],
    stack: ["Telephony", "Booking system", "Payments", "CRM"],
  },
];

export const about = {
  statement:
    "We are forty engineers, operators and former founders who think the next decade of company-building will be decided by how well work is delegated to software.",
  body: "Indigen was started in 2021 by a team that had spent years running operations by hand. We do not sell a platform. We embed with your team, build what the workflow needs, and stay accountable for the result.",
  stats: [
    { value: "63", label: "workflows in production" },
    { value: "2.4m", label: "tasks completed by our agents last quarter" },
    { value: "19", label: "clients, 17 of them on a second engagement" },
    { value: "6 wk", label: "typical time to a first live agent" },
  ],
};

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do we need to replace any of our software?",
    a: "No. Agents work through the systems you already have: your order platform, CRM, finance tools, inboxes and phone lines. If a system has no interface we can use, we tell you in week one.",
  },
  {
    q: "What happens when an agent is unsure?",
    a: "It stops and hands over. Every workflow has confidence limits and spending limits agreed with you, and anything outside them goes to a named person with the full context attached.",
  },
  {
    q: "How is our data handled?",
    a: "Agents run in your cloud account or a dedicated tenant, with access scoped to the workflow. We keep a complete, searchable log of every action so that your auditors can follow each decision.",
  },
  {
    q: "How do you charge?",
    a: "A fixed fee for the six-week build, then a monthly operating fee tied to completed work, such as orders resolved or documents processed. There are no per-seat licences.",
  },
  {
    q: "How soon will we see a result?",
    a: "Most clients have one agent handling live work in week six. The shadow period before that gives you measured accuracy on your own data before anything is switched on.",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Practice",
    links: [
      { label: "What we build", href: "#build" },
      { label: "How we work", href: "#process" },
      { label: "Case studies", href: "#cases" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Questions", href: "#faq" },
      { label: "Book a call", href: "#book" },
    ],
  },
];
