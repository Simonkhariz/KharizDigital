export type ArtScene = "product" | "closeup" | "flatlay";
export type ArtPalette = "sky" | "ember" | "dune" | "pool" | "olive" | "plum";
export type AdTile = { scene: ArtScene; palette: ArtPalette; alt: string };

export type Conversation = {
  id: string;
  title: string;
  prompt: string;
  reply: string;
  tiles: [AdTile, AdTile, AdTile];
  /** How many tiles are finished when the conversation is first opened. */
  ready: number;
};

export const conversations: Conversation[] = [
  {
    id: "hooks",
    title: "Top hooks for summer eyewear",
    prompt: "Generate 3 premium sunglasses ad concepts using product shots and brand inputs.",
    reply: "Here are your first generated sunglasses ad concepts",
    tiles: [
      { scene: "product", palette: "sky", alt: "Concept one: dark sunglasses held up against a clear sky" },
      { scene: "closeup", palette: "ember", alt: "Concept two: close-up of a tinted lens in warm light" },
      { scene: "flatlay", palette: "dune", alt: "Concept three: sunglasses laid on pale sand" },
    ],
    ready: 2,
  },
  {
    id: "ugc",
    title: "Winning UGC concepts",
    prompt: "Rework our three best creator clips into unboxing-style concepts for the Halden Coast frame.",
    reply: "Three unboxing concepts built from your top creator clips",
    tiles: [
      { scene: "flatlay", palette: "pool", alt: "Concept one: sunglasses on a pool-blue surface" },
      { scene: "product", palette: "olive", alt: "Concept two: sunglasses against an olive backdrop" },
      { scene: "closeup", palette: "plum", alt: "Concept three: lens close-up in plum evening light" },
    ],
    ready: 3,
  },
  {
    id: "top",
    title: "Top performing ad remixes",
    prompt: "Take last month's best ad and give me three colder-toned versions for the autumn drop.",
    reply: "Three cooler remixes of your best performer from last month",
    tiles: [
      { scene: "closeup", palette: "pool", alt: "Concept one: lens close-up in cool blue light" },
      { scene: "flatlay", palette: "plum", alt: "Concept two: sunglasses on a plum surface" },
      { scene: "product", palette: "dune", alt: "Concept three: sunglasses against pale dunes" },
    ],
    ready: 3,
  },
];

export const freshTiles: [AdTile, AdTile, AdTile] = [
  { scene: "product", palette: "ember", alt: "New concept one: sunglasses in warm evening light" },
  { scene: "flatlay", palette: "sky", alt: "New concept two: sunglasses on a sky-blue surface" },
  { scene: "closeup", palette: "olive", alt: "New concept three: lens close-up in olive tones" },
];

export const composerDefault = {
  before: "Generate premium eyewear ad concepts using ",
  mention: "@Halden product shots",
  after: " and creator content",
};

export const models = ["Loom Motion 2.5", "Loom Motion 2 Fast", "Loom Still 1"] as const;
export const aspectRatios = ["9:16", "1:1", "16:9"] as const;
export const resolutions = ["720p", "1080p"] as const;
export const durations = ["8s", "15s", "30s"] as const;

export type SidebarId =
  | "start"
  | "dashboard"
  | "library"
  | "campaigns"
  | "creators"
  | "studio"
  | "products"
  | "widgets"
  | "recruitment"
  | "billing";

export type SidebarView = {
  id: SidebarId;
  label: string;
  summary: string;
  columns: [string, string, string];
  rows: [string, string, string][];
};

export const sidebarViews: SidebarView[] = [
  {
    id: "start",
    label: "Get started",
    summary: "Four setup steps. Two are done for the Halden Eyewear workspace.",
    columns: ["Step", "Owner", "Status"],
    rows: [
      ["Connect storefront", "Workspace admin", "Done"],
      ["Upload brand kit", "Design", "Done"],
      ["Import top 20 ads", "Growth", "In progress"],
      ["Invite reviewers", "Workspace admin", "Not started"],
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    summary: "This week across every connected storefront.",
    columns: ["Metric", "This week", "Last week"],
    rows: [
      ["Variants generated", "412", "286"],
      ["Variants approved", "318", "201"],
      ["Live in campaigns", "244", "163"],
      ["Credits used", "1,840", "1,265"],
    ],
  },
  {
    id: "library",
    label: "Content Library",
    summary: "Assets the studio can use as context.",
    columns: ["Collection", "Assets", "Updated"],
    rows: [
      ["Halden product shots", "86", "Today"],
      ["Creator clips, summer", "142", "Yesterday"],
      ["Brand kit and fonts", "24", "3 days ago"],
      ["Top performers, Q2", "20", "Last week"],
    ],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    summary: "Approved variants grouped by where they run.",
    columns: ["Campaign", "Variants", "Status"],
    rows: [
      ["Summer frames launch", "96", "Live"],
      ["Coast restock", "48", "Live"],
      ["Autumn drop teaser", "64", "In review"],
      ["Gift guide", "36", "Draft"],
    ],
  },
  {
    id: "creators",
    label: "My Creators",
    summary: "Creators with an active brief this month.",
    columns: ["Creator group", "Briefs", "Clips delivered"],
    rows: [
      ["Beach and travel", "4", "31"],
      ["Street style", "3", "22"],
      ["Outdoor sport", "2", "14"],
      ["Studio reviewers", "2", "9"],
    ],
  },
  {
    id: "products",
    label: "Product Center",
    summary: "Catalogue items synced from the storefront.",
    columns: ["Product", "Shots", "In stock"],
    rows: [
      ["Halden Coast, tortoise", "18", "Yes"],
      ["Halden Coast, black", "22", "Yes"],
      ["Halden Ridge, amber", "14", "Low"],
      ["Halden Pier, clear", "11", "Yes"],
    ],
  },
  {
    id: "widgets",
    label: "Website Widgets",
    summary: "Shoppable video blocks embedded on the storefront.",
    columns: ["Widget", "Placement", "Videos"],
    rows: [
      ["Homepage reel", "Above the fold", "8"],
      ["Product page carousel", "Below gallery", "12"],
      ["Cart reminder", "Cart drawer", "3"],
    ],
  },
  {
    id: "recruitment",
    label: "Creator Recruitment",
    summary: "Open calls and how many applications each has.",
    columns: ["Open call", "Applications", "Closes"],
    rows: [
      ["Autumn drop, lifestyle", "58", "In 6 days"],
      ["Sport frames, outdoor", "34", "In 12 days"],
      ["Unboxing, studio", "21", "In 19 days"],
    ],
  },
  {
    id: "billing",
    label: "Billing",
    summary: "Growth plan, billed monthly.",
    columns: ["Item", "Amount", "Note"],
    rows: [
      ["Growth plan", "$199", "Renews on the 1st"],
      ["Credits included", "2,500", "660 left this cycle"],
      ["Extra credits", "$0", "None bought"],
    ],
  },
];
