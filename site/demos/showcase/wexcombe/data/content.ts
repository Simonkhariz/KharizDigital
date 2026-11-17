export const base = "/demos/wexcombe";
export const assets = "/showcase/wexcombe";

export const navLinks = [
  { label: "Practices", href: `${base}/practices/` },
  { label: "Partners", href: `${base}/partners/` },
  { label: "About", href: `${base}/#about` },
  { label: "Insights", href: `${base}/insights/` },
] as const;

export const promises = [
  { value: "1", title: "Partner on every search", text: "The partner you brief runs the search, from first call to first day." },
  { value: "4", title: "Searches per partner at a time", text: "Never more. It is how we keep the first promise." },
  { value: "10 days", title: "To a first market map", text: "A written view of who is out there, ten working days after the brief." },
  { value: "12 months", title: "Replacement guarantee", text: "If the appointment does not hold for a year, we run the search again at no fee." },
] as const;

export interface Practice {
  id: string;
  title: string;
  text: string;
  roles: string;
  detail: string;
  points: string[];
  partner: string;
}

export const practices: Practice[] = [
  {
    id: "ceo",
    title: "CEO and Succession",
    text: "Chief executive searches and planned successions for founder-led and family-owned companies.",
    roles: "Chief Executive Officer, President, Managing Director",
    detail:
      "Most of our chief executive work starts two or three years before anyone steps down. We help the board agree what the next decade needs, then look inside the company as carefully as outside it.",
    points: ["Succession planning with the founder or family", "Internal candidates assessed on the same terms as external ones", "A handover plan agreed before the offer"],
    partner: "Helena Wexcombe",
  },
  {
    id: "board",
    title: "Board and Non-Executive Directors",
    text: "Independent directors and chairs who bring judgment the board does not already have.",
    roles: "Chair, Independent Director, Audit Committee Chair",
    detail:
      "A good director changes the quality of every meeting. We start from the gaps around the table, not from a list of well-known names, and we speak to people who are not looking for another seat.",
    points: ["A skills review of the current board", "First-time directors considered alongside experienced ones", "References from fellow directors, not only from chairs"],
    partner: "Mara Castellan",
  },
  {
    id: "finance",
    title: "Finance Leadership",
    text: "Chief financial officers and senior finance leaders for companies preparing for growth, a sale or a succession.",
    roles: "Chief Financial Officer, VP Finance, Controller",
    detail:
      "The finance leader a company needs before a transaction is rarely the one it needed five years earlier. We work with owners and investors to hire for the next stage, not the last one.",
    points: ["Briefs written with the investor and the chief executive together", "Technical assessment by a former CFO", "Support through the first board cycle"],
    partner: "Tobias Lindqvist",
  },
  {
    id: "operations",
    title: "Operations and Technology Leadership",
    text: "Operating and technology leaders who can run the business day to day and modernize it at the same time.",
    roles: "Chief Operating Officer, Chief Technology Officer, Chief Information Officer",
    detail:
      "These roles fail when the brief asks for a transformer and the company wants an operator, or the other way round. We spend the first week finding out which one you need.",
    points: ["Site visits before the brief is written", "Candidates meet the teams they will lead", "A written 100-day plan from each finalist"],
    partner: "Julian Ashby",
  },
];

export const stagesOfSearch = [
  { n: "01", weeks: "Week 1", title: "Brief", text: "We meet the board and the people the new leader will work with, then write the brief together." },
  { n: "02", weeks: "Weeks 2–3", title: "Map the market", text: "We research every company and person who could fit, and share a written market map with you." },
  { n: "03", weeks: "Weeks 3–6", title: "Approach", text: "The partner speaks to each candidate personally. Nobody hears about the role from a junior researcher." },
  { n: "04", weeks: "Weeks 6–9", title: "Assess and shortlist", text: "Structured interviews, and references we take ourselves. You meet a shortlist of three to five people, each with a written assessment." },
  { n: "05", weeks: "Weeks 9–12+", title: "Offer and first 100 days", text: "We help with the offer and the resignation, then check in with you and the new leader through the first 100 days." },
] as const;

export const partners = [
  {
    id: "helena-wexcombe",
    name: "Helena Wexcombe",
    role: "Founding Partner",
    text: "Founded the firm in 2016. Leads chief executive and succession searches.",
    bio: "Helena spent eleven years in search at a large international firm before starting Wexcombe to work with fewer clients at a time. She sits on the board of a regional arts trust.",
    image: `${assets}/partner-1.webp`,
    alt: "Portrait of Helena Wexcombe standing by an office window",
  },
  {
    id: "tobias-lindqvist",
    name: "Tobias Lindqvist",
    role: "Partner",
    text: "Leads finance leadership searches for private equity–backed companies.",
    bio: "Tobias trained as an accountant and was finance director of a manufacturing group before moving into search. He joined the firm in 2018.",
    image: `${assets}/partner-2.webp`,
    alt: "Portrait of Tobias Lindqvist in a navy blazer",
  },
  {
    id: "mara-castellan",
    name: "Mara Castellan",
    role: "Partner",
    text: "Leads board and non-executive director searches.",
    bio: "Mara advised family-owned companies on governance for a decade and has chaired two nominating committees. She joined the firm in 2019.",
    image: `${assets}/partner-3.webp`,
    alt: "Portrait of Mara Castellan outside an office building",
  },
  {
    id: "julian-ashby",
    name: "Julian Ashby",
    role: "Partner",
    text: "Leads operations and technology leadership searches.",
    bio: "Julian ran operations for a logistics company through two acquisitions. He joined the firm in 2021 and works mostly with industrial and software businesses.",
    image: `${assets}/partner-4.webp`,
    alt: "Portrait of Julian Ashby in a suit and striped tie",
  },
] as const;

export const sectors = [
  "Manufacturing",
  "Healthcare services",
  "Financial services",
  "Consumer brands",
  "Software",
  "Logistics",
  "Family-owned business",
  "Private equity–backed",
] as const;

export type Sector = (typeof sectors)[number];

export interface Appointment {
  role: string;
  client: string;
  year: number;
  sectors: Sector[];
}

export const appointments: Appointment[] = [
  { role: "Chief Financial Officer", client: "Family-owned food manufacturer", year: 2026, sectors: ["Manufacturing", "Family-owned business"] },
  { role: "Chief Executive Officer", client: "Founder-led industrial distributor", year: 2026, sectors: ["Logistics", "Family-owned business"] },
  { role: "Independent Director", client: "Private equity–backed healthcare services group", year: 2025, sectors: ["Healthcare services", "Private equity–backed"] },
  { role: "Chief Operating Officer", client: "Regional logistics company", year: 2025, sectors: ["Logistics"] },
  { role: "Chief Technology Officer", client: "Private equity–backed software company", year: 2025, sectors: ["Software", "Private equity–backed"] },
  { role: "Chair", client: "Family-owned consumer goods company", year: 2025, sectors: ["Consumer brands", "Family-owned business"] },
  { role: "VP Finance", client: "Specialty lender", year: 2024, sectors: ["Financial services"] },
  { role: "Managing Director", client: "Precision components manufacturer", year: 2024, sectors: ["Manufacturing", "Private equity–backed"] },
  { role: "Audit Committee Chair", client: "Community bank", year: 2024, sectors: ["Financial services"] },
  { role: "President", client: "Direct-to-consumer homeware brand", year: 2024, sectors: ["Consumer brands"] },
];

/** Unattributed remarks, described by role only. Clients stay unnamed. */
export const voices = [
  { quote: "We spoke to the same partner every week for three months. I never had to explain the business twice.", by: "Chair, family-owned manufacturer" },
  { quote: "They told us two of our favorite candidates were wrong for the role, and explained why. They were right.", by: "Managing Partner, private equity firm" },
  { quote: "The market map alone changed how the board thought about the job.", by: "Founder and CEO, consumer brand" },
] as const;

export const insights = [
  {
    id: "brief",
    title: "The brief is the search",
    date: "March 2026",
    minutes: 6,
    summary: "Most failed appointments can be traced to a brief nobody argued about. A week spent disagreeing early saves a year later.",
    body: [
      "When an appointment fails inside eighteen months, the reason is rarely that the person was not capable. More often the board hired for a job that was never properly described, or for two jobs that pulled against each other.",
      "We ask every director the same three questions separately, then show the board where the answers differ. The differences are the brief.",
    ],
    image: `${assets}/insight-1.webp`,
    alt: "Overhead view of a desk covered in sketches and notes",
  },
  {
    id: "succession",
    title: "Succession starts three years out",
    date: "January 2026",
    minutes: 8,
    summary: "Founders who plan their own handover get a better successor and a better price. What the first conversation should cover.",
    body: [
      "A founder who announces a departure and a search in the same quarter has already narrowed the field. The strongest candidates want to see that the handover has been thought through.",
      "Three years out, the useful work is quiet: agreeing what the founder will do afterwards, testing internal candidates with real responsibility, and writing down what the company cannot afford to lose.",
    ],
    image: `${assets}/insight-2.webp`,
    alt: "Empty lounge area of a glass-walled office",
  },
  {
    id: "references",
    title: "References are an interview, not a formality",
    date: "November 2025",
    minutes: 5,
    summary: "The calls we take ourselves, the questions we ask, and why we speak to people the candidate did not suggest.",
    body: [
      "A reference taken by a researcher from a list the candidate supplied tells you very little. We take every reference ourselves and always ask who else we should speak to.",
      "The most useful question is a plain one: what would you tell this person's next chair in their first week?",
    ],
    image: `${assets}/insight-3.webp`,
    alt: "Reception desk in a quiet, warmly lit lobby",
  },
] as const;

export const roleOptions = ["Chief Executive Officer", "Chief Financial Officer", "Chief Operating Officer", "Chair or director", "Another role"] as const;

export const office = {
  address: ["Wexcombe Partners", "14 Marlow Court, 6th floor", "Chicago, IL"],
  phone: "(312) 555-0142",
  email: "search@wexcombe.example",
} as const;
