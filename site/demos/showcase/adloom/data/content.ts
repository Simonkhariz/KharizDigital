export const announcement = {
  text: "We raised $5.2M to make social commerce actually work.",
  cta: "Learn more",
  href: "#story",
};

export const hero = {
  eyebrow: "Ad Video Studio",
  headline: ["Scale your ads from a few to thousands", "in weeks, on autopilot."],
  body: "Never be short on creatives. The Video Studio uses your products, your briefs, and your top-performing content as context. You generate variants. You still review them. This burns credits. The library, the storefronts, and the campaigns do not.",
};

export const logoRow = {
  caption: "Producing ad creative for growth teams at independent commerce brands every week",
  brands: ["Parcelle", "tidewell", "MARLOWE", "Oru Supply", "kindred", "Brightline", "Palisade"],
};

export type PlatformTab = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  panel: { heading: string; rows: { name: string; meta: string; value: number }[]; unit: string };
};

export const platformTabs: PlatformTab[] = [
  {
    id: "studio",
    label: "Video Studio",
    title: "Brief once. Get a reviewed batch back.",
    body: "Describe the concept in a sentence and point at the assets to use. The studio returns stills and short videos in the formats you chose, each one tied to the brief that produced it.",
    points: ["Mention any library collection with @", "Pick model, ratio, resolution and length", "5 credits per video, 1 per still"],
    panel: {
      heading: "Batch 0412, summer frames",
      unit: "variants",
      rows: [
        { name: "Hook-first, 8 seconds", meta: "9:16", value: 48 },
        { name: "Product close-ups", meta: "1:1", value: 36 },
        { name: "Creator voiceover", meta: "9:16", value: 24 },
        { name: "Storefront banner loops", meta: "16:9", value: 12 },
      ],
    },
  },
  {
    id: "library",
    label: "Content Library",
    title: "Everything the studio is allowed to use.",
    body: "Product shots, creator clips, brand fonts and past winners live in one place. Tag a collection and it becomes context for every brief, with usage rights attached to each file.",
    points: ["Syncs with your storefront catalogue", "Rights and expiry stored per asset", "Free to store, never metered"],
    panel: {
      heading: "Library, Halden Eyewear",
      unit: "assets",
      rows: [
        { name: "Creator clips, summer", meta: "Video", value: 142 },
        { name: "Halden product shots", meta: "Image", value: 86 },
        { name: "Brand kit and fonts", meta: "Mixed", value: 24 },
        { name: "Top performers, Q2", meta: "Video", value: 20 },
      ],
    },
  },
  {
    id: "campaigns",
    label: "Campaigns",
    title: "Approved variants go straight to where they sell.",
    body: "Group variants into campaigns, push them to your ad accounts and storefront widgets, and see which concept each sale came from. Nothing ships without an approval.",
    points: ["One approval queue for the whole team", "Results roll up by concept, not by file", "Pause a concept everywhere in one click"],
    panel: {
      heading: "Live campaigns",
      unit: "variants live",
      rows: [
        { name: "Summer frames launch", meta: "Live", value: 96 },
        { name: "Autumn drop teaser", meta: "In review", value: 64 },
        { name: "Coast restock", meta: "Live", value: 48 },
        { name: "Gift guide", meta: "Draft", value: 36 },
      ],
    },
  },
  {
    id: "creators",
    label: "Creators",
    title: "Real footage keeps generated ads honest.",
    body: "Post an open call, brief the creators you pick and collect their clips in the library. The studio remixes that footage, so new variants still look like your customers.",
    points: ["Open calls with built-in applications", "Briefs, delivery and payment in one thread", "Clips arrive already tagged"],
    panel: {
      heading: "Clips delivered this month",
      unit: "clips",
      rows: [
        { name: "Beach and travel", meta: "4 briefs", value: 31 },
        { name: "Street style", meta: "3 briefs", value: 22 },
        { name: "Outdoor sport", meta: "2 briefs", value: 14 },
        { name: "Studio reviewers", meta: "2 briefs", value: 9 },
      ],
    },
  },
];

export const agents = [
  {
    id: "hook",
    name: "Hook Writer",
    role: "Writes the first three seconds",
    body: "Reads the openings of your best-performing ads and drafts new ones in the same voice, ranked by how closely they follow what has already worked.",
    sample: ["“You are squinting for no reason.”", "“The pair I stopped taking off.”", "“Packed for the coast in one frame.”"],
  },
  {
    id: "variant",
    name: "Variant Builder",
    role: "Turns one concept into a batch",
    body: "Takes an approved concept and produces it in every ratio, length and product colour you sell, keeping the framing safe for each placement.",
    sample: ["9:16, 8s, tortoise", "1:1, 15s, black", "16:9, 30s, amber"],
  },
  {
    id: "review",
    name: "Review Desk",
    role: "Checks before a person does",
    body: "Flags off-brand colours, unreadable text, missing disclosures and expired usage rights, so your reviewers only see variants that are worth their time.",
    sample: ["Logo clear space: pass", "Caption contrast: pass", "Creator rights: expires in 9 days"],
  },
];

export const steps = [
  { title: "Connect", body: "Link your storefront and ad accounts. Products, prices and past ads sync into the library." },
  { title: "Brief", body: "Write the concept in plain language and mention the collections the studio should draw on." },
  { title: "Review", body: "Variants arrive in one queue. Approve, request a change or reject, with every decision logged." },
  { title: "Ship", body: "Approved variants go to campaigns and storefront widgets. Results come back grouped by concept." },
];

export const useCases = [
  {
    id: "dtc",
    title: "Direct-to-consumer brands",
    body: "A two-person growth team keeps forty concepts in rotation without waiting on a shoot.",
    stat: "40",
    statLabel: "concepts in rotation",
  },
  {
    id: "agencies",
    title: "Agencies",
    body: "Separate workspaces, brand kits and approval queues per client, with one credit pool to manage.",
    stat: "12",
    statLabel: "client workspaces on Scale",
  },
  {
    id: "marketplace",
    title: "Marketplace sellers",
    body: "Turn a catalogue of product photos into short shoppable videos for every listing.",
    stat: "1 per SKU",
    statLabel: "video for each listing",
  },
];

export const story = {
  eyebrow: "Funding note",
  title: "What the $5.2M round pays for",
  body: [
    "Most ad tools stop at the file. We think the hard part of social commerce is everything around it: knowing which concept sold, who has the rights to a clip, and whether the next batch is any different from the last.",
    "The seed round funds three things over the next eighteen months, and we will report on each of them here.",
  ],
  commitments: [
    { figure: "60%", label: "Engineering", note: "Faster video models and concept-level reporting" },
    { figure: "25%", label: "Creator programme", note: "Paying creators for footage the studio learns from" },
    { figure: "15%", label: "Review and safety", note: "Rights tracking and disclosure checks" },
  ],
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  credits: number;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const creditCost = { video: 5, still: 1 };

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 49,
    annual: 39,
    credits: 500,
    blurb: "For a founder testing their first concepts.",
    features: ["1 storefront", "2 seats", "Content Library and Campaigns", "Hook Writer agent"],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 199,
    annual: 159,
    credits: 2500,
    blurb: "For a team shipping new creative every week.",
    features: ["3 storefronts", "10 seats", "All three agents", "Approval queue with roles", "Creator workspace"],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 649,
    annual: 519,
    credits: 10000,
    blurb: "For agencies and multi-brand groups.",
    features: ["Unlimited storefronts", "Unlimited seats", "Client workspaces", "Shared credit pool", "Priority rendering"],
  },
];

export const faqs = [
  {
    q: "What exactly uses credits?",
    a: "Only generation. A video variant costs 5 credits and a still costs 1. Storing assets, running campaigns, storefront widgets and extra seats within your plan are not metered.",
  },
  {
    q: "Do variants go live automatically?",
    a: "No. Every variant lands in a review queue and needs an approval from someone with the reviewer role before it can be added to a campaign.",
  },
  {
    q: "Who owns what the studio generates?",
    a: "You do. Variants are yours to use on any channel. Creator footage keeps the usage terms agreed in its brief, and the Review Desk warns you before those terms expire.",
  },
  {
    q: "Is our content used to train models for other customers?",
    a: "No. Your library is context for your workspace only. It is not shared across workspaces or used to train shared models.",
  },
  {
    q: "What happens to unused credits?",
    a: "Credits roll over for one billing cycle on Growth and Scale. On Starter they reset each month.",
  },
  {
    q: "Can we try it before talking to anyone?",
    a: "Yes. The free trial includes 50 credits, enough for ten videos or fifty stills, and does not need a card.",
  },
];

export const startForm = {
  title: "See your own products in the studio",
  body: "Tell us where you sell and how many ads you run. We will set up a workspace with 50 trial credits and walk you through a first batch.",
  volumes: ["Fewer than 20 ads a month", "20 to 100 ads a month", "100 to 500 ads a month", "More than 500 ads a month"],
};
