/**
 * Demonstration CRM data for the Closient dashboard. Everything is generated from a fixed seed and a
 * fixed reference date, so the server render and the browser agree and every figure on the dashboard
 * can be traced back to the deals listed here.
 */

export type Stage = "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type OpenStage = Exclude<Stage, "won" | "lost">;

export interface Rep {
  id: string;
  name: string;
  initials: string;
  region: string;
  /** Monthly new-business quota in US dollars. */
  monthlyQuota: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  city: string;
  contact: string;
  role: string;
  email: string;
}

export interface Note {
  day: number;
  text: string;
}

export interface Deal {
  id: string;
  title: string;
  companyId: string;
  ownerId: string;
  stage: Stage;
  amount: number;
  source: string;
  /** Day numbers (days since 1 Jan 1970, UTC). */
  createdDay: number;
  /** Actual close day for won and lost deals, expected close day for open ones. */
  closeDay: number;
  notes: Note[];
}

const MS_PER_DAY = 86_400_000;

export function toDay(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  return Math.round(Date.UTC(year, month - 1, day) / MS_PER_DAY);
}

export function dayToDate(day: number): Date {
  return new Date(day * MS_PER_DAY);
}

export function dayToIso(day: number): string {
  return dayToDate(day).toISOString().slice(0, 10);
}

/** The demo's "today". Every relative figure on the dashboard is measured from this date. */
export const TODAY_ISO = "2026-11-14";
export const TODAY = toDay(TODAY_ISO);

export const stageOrder: Stage[] = ["lead", "qualified", "proposal", "negotiation", "won", "lost"];
export const openStages: OpenStage[] = ["lead", "qualified", "proposal", "negotiation"];

export const stageMeta: Record<Stage, { label: string; probability: number }> = {
  lead: { label: "Lead", probability: 0.1 },
  qualified: { label: "Qualified", probability: 0.3 },
  proposal: { label: "Proposal", probability: 0.55 },
  negotiation: { label: "Negotiation", probability: 0.8 },
  won: { label: "Won", probability: 1 },
  lost: { label: "Lost", probability: 0 },
};

export const sources = ["Inbound", "Outbound", "Referral", "Partner", "Event"] as const;

export const reps: Rep[] = [
  { id: "r1", name: "Amara Lindqvist", initials: "AL", region: "Nordics", monthlyQuota: 40_000 },
  { id: "r2", name: "Tomas Okafor", initials: "TO", region: "UK and Ireland", monthlyQuota: 38_000 },
  { id: "r3", name: "Priya Venkataraman", initials: "PV", region: "DACH", monthlyQuota: 38_000 },
  { id: "r4", name: "Luca Marchetti", initials: "LM", region: "Southern Europe", monthlyQuota: 35_000 },
  { id: "r5", name: "Hana Sedlak", initials: "HS", region: "Central Europe", monthlyQuota: 34_000 },
  { id: "r6", name: "Joel Abernathy", initials: "JA", region: "North America", monthlyQuota: 43_000 },
];

/** The signed-in user of the demo. */
export const currentUser = reps[0];

const companySeed: Array<[name: string, industry: string, city: string, contact: string, role: string]> = [
  ["Haldane Freight", "Logistics", "Rotterdam", "Mirela Kovac", "Head of Operations"],
  ["Orbitly Labs", "Software", "Berlin", "Jonas Reuter", "VP Sales"],
  ["Pennant Insurance", "Insurance", "Dublin", "Aoife Brennan", "Commercial Director"],
  ["Marlowe Studio", "Design", "Lisbon", "Rui Carvalho", "Managing Partner"],
  ["Tessel Robotics", "Manufacturing", "Munich", "Greta Hallmann", "Procurement Lead"],
  ["Brackenridge Dental", "Healthcare", "Leeds", "Samir Qureshi", "Practice Director"],
  ["Kestrow Energy", "Energy", "Oslo", "Ingrid Solheim", "Head of Partnerships"],
  ["Vantry Foods", "Food and drink", "Lyon", "Camille Besson", "Sales Operations Lead"],
  ["Northfold Bank", "Financial services", "Edinburgh", "Callum Reid", "Head of Business Banking"],
  ["Lumen & Loom", "Retail", "Copenhagen", "Freja Dahl", "E-commerce Director"],
  ["Stonebridge Legal", "Legal", "Manchester", "Naomi Adeyemi", "Operations Partner"],
  ["Calyx Biotech", "Life sciences", "Basel", "Matteo Brunner", "Commercial Lead"],
  ["Ferrowick Tools", "Manufacturing", "Turin", "Elena Ricci", "Sales Director"],
  ["Quillpoint Media", "Media", "Amsterdam", "Daan Visser", "Revenue Lead"],
  ["Ashgrove Property", "Real estate", "Birmingham", "Leona Whitfield", "Lettings Director"],
  ["Solvane Travel", "Travel", "Barcelona", "Marc Puig", "Head of Growth"],
  ["Brightwater Schools", "Education", "Bristol", "Hattie Collins", "Bursar"],
  ["Ironleaf Cycles", "Retail", "Ghent", "Wout Peeters", "Managing Director"],
  ["Meridale Clinics", "Healthcare", "Vienna", "Katharina Wolf", "Chief Operating Officer"],
  ["Tidewell Marine", "Logistics", "Hamburg", "Henrik Lorenz", "Fleet Sales Manager"],
  ["Copperline Telecom", "Telecoms", "Prague", "Tereza Novak", "Channel Manager"],
  ["Fablewood Games", "Software", "Stockholm", "Elias Berg", "Head of Publishing"],
  ["Greyfield Security", "Security", "Toronto", "Dana Whitlock", "VP Revenue"],
  ["Harrowgate Hotels", "Hospitality", "York", "Oliver Tennant", "Group Sales Manager"],
  ["Junipera Wellness", "Wellness", "Austin", "Renee Castillo", "Director of Sales"],
  ["Larkspur Analytics", "Software", "Boston", "Devon Hartley", "Chief Revenue Officer"],
  ["Monteverde Coffee", "Food and drink", "Milan", "Sofia Galli", "Wholesale Lead"],
  ["Oakhollow Farms", "Agriculture", "Cork", "Padraig Nolan", "Commercial Manager"],
  ["Pinecrest Outdoor", "Retail", "Denver", "Tessa Lindgren", "Head of Wholesale"],
  ["Rivermark Payments", "Financial services", "Warsaw", "Marek Zielinski", "Partnerships Lead"],
  ["Silverthread Apparel", "Retail", "Porto", "Ines Faria", "Sales Director"],
  ["Umbrafield Events", "Events", "Brussels", "Chloe Lambert", "Head of Sponsorship"],
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
}

export const companies: Company[] = companySeed.map(([name, industry, city, contact, role], index) => ({
  id: `c${index + 1}`,
  name,
  industry,
  city,
  contact,
  role,
  // The reserved ".example" domain keeps every address fictional.
  email: `${contact.split(" ")[0].toLowerCase()}@${slugify(name)}.example`,
}));

const products = [
  "Platform licence",
  "Agent seats",
  "Forecasting add-on",
  "Onboarding package",
  "Seat expansion",
  "Annual renewal",
  "Call insights add-on",
];

/** Small deterministic generator (mulberry32). */
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function generateDeals(): Deal[] {
  const random = createRandom(20261114);
  const pick = <T,>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
  const deals: Deal[] = [];
  const monthsBack = 27;
  const today = dayToDate(TODAY);

  for (let back = monthsBack; back >= 0; back -= 1) {
    const monthStart = toDay(
      new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - back, 1)).toISOString().slice(0, 10),
    );
    const monthEnd = toDay(
      new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - back + 1, 0)).toISOString().slice(0, 10),
    );
    const lastDay = Math.min(monthEnd, TODAY);
    // The team grows through the period, so newer months open more deals.
    const count = 8 + Math.round(((monthsBack - back) / monthsBack) * 5) + Math.floor(random() * 3);

    for (let index = 0; index < count; index += 1) {
      const company = pick(companies);
      const owner = pick(reps);
      const product = pick(products);
      const createdDay = monthStart + Math.floor(random() * (lastDay - monthStart + 1));
      const cycle = 16 + Math.floor(random() * 58);
      const base = pick([4_800, 7_200, 9_600, 12_000, 14_400, 18_000, 24_000, 31_200, 42_000, 58_800]);
      const amount = base + Math.floor(random() * 12) * 200;
      const closeDay = createdDay + cycle;
      const winChance = 0.5 + ((monthsBack - back) / monthsBack) * 0.12;

      let stage: Stage;
      if (closeDay <= TODAY) {
        stage = random() < winChance ? "won" : "lost";
      } else {
        const progress = (TODAY - createdDay) / cycle;
        stage = progress < 0.2 ? "lead" : progress < 0.45 ? "qualified" : progress < 0.75 ? "proposal" : "negotiation";
      }

      deals.push({
        id: "",
        title: `${company.name}: ${product}`,
        companyId: company.id,
        ownerId: owner.id,
        stage,
        amount,
        source: pick(sources),
        createdDay,
        closeDay,
        notes: [],
      });
    }
  }

  deals.sort((a, b) => a.createdDay - b.createdDay);
  return deals.map((deal, index) => ({ ...deal, id: `CL-${1001 + index}` }));
}

export const initialDeals: Deal[] = generateDeals();

export function companyById(id: string): Company {
  return companies.find((company) => company.id === id) ?? companies[0];
}

export function repById(id: string): Rep {
  return reps.find((rep) => rep.id === id) ?? reps[0];
}

export function isOpen(stage: Stage): stage is OpenStage {
  return stage !== "won" && stage !== "lost";
}
