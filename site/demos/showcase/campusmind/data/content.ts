export type NavLink = { label: string; href: string; note?: string };
export type NavItem = NavLink | { label: string; menu: NavLink[] };

export const navItems: NavItem[] = [
  {
    label: "Platform",
    menu: [
      { label: "Workbench", href: "#platform", note: "One place for every assistant" },
      { label: "Knowledge base", href: "#hub", note: "Answers grounded in campus sources" },
      { label: "Agents and automations", href: "#platform", note: "Work that finishes itself" },
    ],
  },
  {
    label: "Solutions",
    menu: [
      { label: "For students", href: "#solutions", note: "Study help and campus answers" },
      { label: "For faculty", href: "#solutions", note: "Course design and feedback" },
      { label: "For staff and IT", href: "#solutions", note: "Service desks and governance" },
    ],
  },
  { label: "Integrations", href: "#integrations" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
];

export const hero = {
  titleLines: ["The Institutional Assistant Platform", "for Higher Education"],
  body: "Campusmind's personalised workbench, agents and automation platform takes the heavy lifting out of adopting assistants across a university.",
};

/** Invented institutions, set in type. */
export const institutions: { name: string; small?: string; style: "serif" | "caps" | "bold" | "italic" | "mono" }[] = [
  { name: "Ashbourne", small: "College", style: "serif" },
  { name: "Northmere Tech", style: "bold" },
  { name: "Calloway", small: "University", style: "italic" },
  { name: "Lindqvist Institute", small: "of Technology", style: "caps" },
  { name: "harborline", style: "bold" },
  { name: "St. Aldric", small: "School of Medicine", style: "serif" },
  { name: "West Fenn", small: "Community College", style: "caps" },
  { name: "Pinecrest State", style: "italic" },
  { name: "TALLIS/POLY", style: "mono" },
];

export const hub = {
  titleLines: ["One hub for every assistant,", "measurable outcomes for education"],
  cards: [
    {
      id: "models",
      title: "Unlimited, all-in-one access to leading models",
      body: "We work with the leading model labs so your campus has the best, newest and fastest models as soon as they are available, without the cost of managing vendors or the risk of lock-in.",
    },
    {
      id: "knowledge",
      title: "Intelligent and integrated Knowledge Base",
      body: "Securely connect assistants to your institutional data and documents. Build a reliable knowledge base for each person on campus.",
    },
    {
      id: "agents",
      title: "Agents for the service desks students rely on",
      body: "Publish agents for admissions, financial aid, the registrar and IT help. Each one answers from approved sources and hands over to staff when it should.",
    },
  ],
};

export type Assistant = { id: string; name: string; audience: string; prompt: string; answer: string; sources: string[] };

export const assistants: Assistant[] = [
  {
    id: "syllabus",
    name: "Syllabus Helper",
    audience: "Students",
    prompt: "When is the BIO 204 lab report due, and what is the late policy?",
    answer: "The lab report is due Friday of week 7 at 5 pm. Late reports lose 5% per day for up to three days; after that you need an extension from your section leader.",
    sources: ["BIO 204 syllabus, p. 3", "Department late-work policy"],
  },
  {
    id: "writing",
    name: "Writing Coach",
    audience: "Students",
    prompt: "Give me feedback on the structure of my draft introduction.",
    answer: "Your thesis arrives in the last sentence, which works, but the second paragraph repeats the first. Try merging them and ending on the question your essay answers. I have not rewritten anything for you.",
    sources: ["Writing Centre rubric", "Academic integrity guide"],
  },
  {
    id: "course",
    name: "Course Designer",
    audience: "Faculty",
    prompt: "Draft learning outcomes for a 10-week introduction to statistics.",
    answer: "Here are six outcomes mapped to your programme framework, from describing distributions in week 2 to interpreting a regression in week 9. Each one is paired with a suggested assessment.",
    sources: ["Programme outcomes framework", "STAT 101, previous syllabus"],
  },
  {
    id: "registrar",
    name: "Registrar Desk",
    audience: "Staff",
    prompt: "Can a student add a class after the census date?",
    answer: "Only with a late-add petition signed by the instructor and the dean's office. The form is due within ten working days of census; I can open a pre-filled petition for you.",
    sources: ["Academic calendar 2026-27", "Registration policy 4.2"],
  },
];

export type CampusAgent = { id: string; name: string; desk: string; resolved: number; enabled: boolean };

export const campusAgents: CampusAgent[] = [
  { id: "aid", name: "Financial Aid Agent", desk: "Student finance", resolved: 82, enabled: true },
  { id: "admissions", name: "Admissions Agent", desk: "Admissions office", resolved: 76, enabled: true },
  { id: "it", name: "IT Help Agent", desk: "Service desk", resolved: 68, enabled: true },
  { id: "housing", name: "Housing Agent", desk: "Residential life", resolved: 71, enabled: false },
];

export const automation = {
  name: "Transcript request",
  steps: [
    { title: "Request received", detail: "Student submits the form in the portal" },
    { title: "Holds checked", detail: "Finance and library holds are looked up" },
    { title: "Transcript generated", detail: "Sealed PDF created from the records system" },
    { title: "Delivered", detail: "Sent to the recipient and logged for audit" },
  ],
  before: "3 working days",
  after: "4 minutes",
};

export const solutions = [
  {
    title: "Students",
    body: "Course-aware study help, writing feedback that respects academic integrity, and answers about deadlines, aid and housing at any hour.",
    points: ["Assistants scoped to each course", "Citations on every answer", "Accessible on any device"],
  },
  {
    title: "Faculty",
    body: "Build an assistant for a module in minutes, draft outcomes and rubrics, and see where a cohort is struggling before the midterm.",
    points: ["No-code assistant builder", "Rubric-aligned feedback drafts", "Cohort insight reports"],
  },
  {
    title: "Staff and IT",
    body: "Agents for the busiest service desks, with central control of models, spending, data access and retention.",
    points: ["Role-based access from your directory", "Usage and cost dashboards", "Policy controls per department"],
  },
];

export const outcomes = [
  { value: "64%", label: "of routine service-desk questions resolved without a ticket" },
  { value: "5.2 h", label: "saved per faculty member each week during term" },
  { value: "91%", label: "of students used an assistant at least weekly" },
  { value: "38", label: "institutions live across four countries" },
];

export const integrations = [
  "Learning management",
  "Student records",
  "Single sign-on",
  "Library catalogue",
  "Document storage",
  "Email and calendar",
  "Help desk",
  "Data warehouse",
];

export const security = [
  { title: "Your data stays yours", body: "Institutional content is never used to train shared models, and each campus has its own isolated tenant." },
  { title: "Access follows your directory", body: "Roles, courses and departments are read from single sign-on, so people only see what they should." },
  { title: "Built for student-privacy law", body: "Retention, consent and audit controls designed around education privacy regulations." },
  { title: "Every answer is traceable", body: "Prompts, sources and outputs are logged and exportable for review by your governance board." },
];

/** Demonstration pricing: an annual platform fee plus a per-student rate that falls with enrolment. */
export const pricing = {
  platformFee: 18000,
  tiers: [
    { upTo: 5000, rate: 14 },
    { upTo: 15000, rate: 11 },
    { upTo: 40000, rate: 8 },
  ],
  min: 1000,
  max: 40000,
  step: 500,
  initial: 12000,
  included: ["Unlimited staff and faculty seats", "All models, no usage caps", "Knowledge base and agents", "Onboarding and training for campus champions"],
};

export const faqs: { q: string; a: string }[] = [
  {
    q: "How long does a campus roll-out take?",
    a: "Most institutions connect single sign-on and the learning management system in the first two weeks, pilot with three departments for a term, and open to the whole campus the term after.",
  },
  {
    q: "Which models can our campus use?",
    a: "All the leading general-purpose and specialist models, selected per assistant. Your administrators decide which are available to which groups and can change that at any time.",
  },
  {
    q: "How do you support academic integrity?",
    a: "Faculty set what an assistant may do in each course, for example feedback but not drafting. Students see those rules, and every conversation can be shared with an instructor by the student.",
  },
  {
    q: "Is student data used to train models?",
    a: "No. Prompts, files and outputs stay in your tenant and are excluded from model training under our agreements with every model provider.",
  },
  {
    q: "What does it cost for part-time and continuing-education students?",
    a: "Pricing is based on full-time-equivalent enrolment, so part-time students are counted proportionally. Staff and faculty are always included.",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Workbench", href: "#platform" },
      { label: "Knowledge base", href: "#hub" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Institution",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Security", href: "#security" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Questions", href: "#faq" },
      { label: "Book a demo", href: "#demo" },
    ],
  },
];
