export type MenuLink = { label: string; note: string; href: string };
export type MenuGroup = { id: string; label: string; links: MenuLink[] };

export const menuGroups: MenuGroup[] = [
  {
    id: "platform",
    label: "Platform",
    links: [
      { label: "Video Studio", note: "Generate ad variants from briefs and product shots", href: "#platform" },
      { label: "Content Library", note: "Every asset, tagged and searchable", href: "#platform" },
      { label: "Campaigns", note: "Ship approved variants to your storefronts", href: "#platform" },
      { label: "Creator workspace", note: "Recruit, brief and pay creators in one place", href: "#platform" },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    links: [
      { label: "Hook Writer", note: "Opening lines drawn from your winners", href: "#agents" },
      { label: "Variant Builder", note: "One concept, every format and length", href: "#agents" },
      { label: "Review Desk", note: "Brand and policy checks before anything ships", href: "#agents" },
    ],
  },
  {
    id: "usecases",
    label: "Usecases",
    links: [
      { label: "Direct-to-consumer brands", note: "Keep creative fresh without a bigger team", href: "#usecases" },
      { label: "Agencies", note: "Run many client accounts from one workspace", href: "#usecases" },
      { label: "Marketplace sellers", note: "Turn a catalogue into shoppable video", href: "#usecases" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    links: [
      { label: "How it works", note: "From brief to live campaign in four steps", href: "#how" },
      { label: "Funding note", note: "What the $5.2M round pays for", href: "#story" },
      { label: "Questions", note: "Credits, rights, review and data", href: "#faq" },
    ],
  },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Video Studio", href: "#platform" },
      { label: "Content Library", href: "#platform" },
      { label: "Campaigns", href: "#platform" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Agents",
    links: [
      { label: "Hook Writer", href: "#agents" },
      { label: "Variant Builder", href: "#agents" },
      { label: "Review Desk", href: "#agents" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Funding note", href: "#story" },
      { label: "Usecases", href: "#usecases" },
      { label: "Questions", href: "#faq" },
      { label: "Book a demo", href: "#start" },
    ],
  },
];
