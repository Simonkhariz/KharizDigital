export type ColumnId = "detected" | "acknowledged" | "progress";

export const columns: { id: ColumnId; label: string }[] = [
  { id: "detected", label: "Detected" },
  { id: "acknowledged", label: "Acknowledged" },
  { id: "progress", label: "In progress" },
];

export type Incident = {
  id: string;
  title: string;
  column: ColumnId;
  origin: string;
  priority: "High Impact" | "Medium Impact" | "Low Impact";
  handler: string;
  window: string;
  owner: string;
  /** Day index (0 = Monday) the incident is due to be resolved. */
  dueDay: number;
  /** Day index the incident was opened. */
  startDay: number;
};

export const units = ["Platform operations", "Billing desk", "Voice team"];
export const origins = ["Customer Mobile App", "Web Chat", "Phone Line", "Email"];
export const windows = ["Under 4 hours", "Same day", "This week"];

export const initialIncidents: Incident[] = [
  {
    id: "OPS-129",
    title: "Service Flow Interruption",
    column: "detected",
    origin: "Customer Mobile App",
    priority: "High Impact",
    handler: "Platform operations",
    window: "Under 4 hours",
    owner: "MO",
    startDay: 3,
    dueDay: 3,
  },
  {
    id: "OPS-131",
    title: "Refund Loop on Annual Plans",
    column: "detected",
    origin: "Web Chat",
    priority: "Medium Impact",
    handler: "Billing desk",
    window: "Same day",
    owner: "TS",
    startDay: 2,
    dueDay: 3,
  },
  {
    id: "OPS-134",
    title: "Callback Requests Not Logged",
    column: "detected",
    origin: "Phone Line",
    priority: "Low Impact",
    handler: "Voice team",
    window: "This week",
    owner: "RA",
    startDay: 3,
    dueDay: 5,
  },
  {
    id: "OPS-126",
    title: "Identity Check Timeout",
    column: "acknowledged",
    origin: "Customer Mobile App",
    priority: "High Impact",
    handler: "Platform operations",
    window: "Under 4 hours",
    owner: "TS",
    startDay: 2,
    dueDay: 3,
  },
  {
    id: "OPS-127",
    title: "Duplicate Invoice Replies",
    column: "acknowledged",
    origin: "Email",
    priority: "Medium Impact",
    handler: "Billing desk",
    window: "Same day",
    owner: "MO",
    startDay: 1,
    dueDay: 4,
  },
  {
    id: "OPS-118",
    title: "Voice Hand-off Drops Context",
    column: "progress",
    origin: "Phone Line",
    priority: "High Impact",
    handler: "Voice team",
    window: "Same day",
    owner: "RA",
    startDay: 0,
    dueDay: 3,
  },
  {
    id: "OPS-121",
    title: "Address Change Needs Two Tries",
    column: "progress",
    origin: "Web Chat",
    priority: "Medium Impact",
    handler: "Platform operations",
    window: "This week",
    owner: "MO",
    startDay: 1,
    dueDay: 5,
  },
  {
    id: "OPS-123",
    title: "Late Fee Wording Disputed",
    column: "progress",
    origin: "Email",
    priority: "Low Impact",
    handler: "Billing desk",
    window: "This week",
    owner: "TS",
    startDay: 2,
    dueDay: 6,
  },
];

/** Titles used, in order, when the visitor adds a new activity. */
export const newActivityTitles = [
  "Password Reset Email Delayed",
  "Chat Widget Slow to Load",
  "Wrong Tariff Quoted",
  "Missed Appointment Reminder",
];

export const firstNewId = 135;

export const owners: Record<string, { name: string; tone: string }> = {
  MO: { name: "Mara Ortiz", tone: "#f3c9a9" },
  TS: { name: "Theo Sandhu", tone: "#c9d8f3" },
  RA: { name: "Ruth Abara", tone: "#d3ecc7" },
};

export const kpis = [
  { id: "escalated", label: "Escalated Today", value: "27", delta: "+12%", note: "vs last week" },
  { id: "review", label: "In Review", value: "41", delta: "5%", note: "vs last week" },
  { id: "blocked", label: "Blocked", value: "9", delta: "+3", note: "new issues" },
  { id: "resolved", label: "Resolved by Agents", value: "68%", delta: "+18%", note: "this quarter" },
] as const;

export const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Index of "today" in the demo week. Later days have no data yet. */
export const todayIndex = 3;

export const series = {
  resolved: {
    label: "Conversations resolved by agents",
    values: [317, 289, 402, 142, null, null, null] as (number | null)[],
  },
  handed: {
    label: "Conversations handed to people",
    values: [96, 121, 88, 47, null, null, null] as (number | null)[],
  },
};

export type SeriesId = keyof typeof series;

export type SectionId = "overview" | "control" | "integrations" | "queues" | "copilot";

export const sections: { id: SectionId; label: string; intro: string; rows: { label: string; value: string }[] }[] = [
  { id: "overview", label: "Overview", intro: "", rows: [] },
  {
    id: "control",
    label: "Control Room",
    intro: "Live view of what agents are doing right now and which rules they applied.",
    rows: [
      { label: "Active conversations", value: "184" },
      { label: "Waiting on a person", value: "12" },
      { label: "Guardrail stops in the last hour", value: "3" },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    intro: "Channels and systems this workspace is connected to.",
    rows: [
      { label: "Web chat", value: "Connected" },
      { label: "Shared inbox", value: "Connected" },
      { label: "Phone line", value: "Needs review" },
    ],
  },
  {
    id: "queues",
    label: "Queues",
    intro: "Where conversations go when an agent hands them over.",
    rows: [
      { label: "Platform operations", value: "5 waiting" },
      { label: "Billing desk", value: "4 waiting" },
      { label: "Voice team", value: "3 waiting" },
    ],
  },
  {
    id: "copilot",
    label: "Copilot",
    intro: "Suggestions drafted for your team from this week's conversations.",
    rows: [
      { label: "Help articles to update", value: "6" },
      { label: "Replies drafted for review", value: "19" },
      { label: "Patterns flagged to product", value: "2" },
    ],
  },
];

export const notifications = [
  "OPS-129 was detected in Customer Mobile App.",
  "Billing desk acknowledged OPS-127.",
  "Weekly review is ready to read.",
];

export const workspaces = ["Acme", "Acme Labs"];
