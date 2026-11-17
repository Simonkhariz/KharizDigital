export const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
] as const;

export const stats = [
  { value: "2.4M+", label: "Articles Generated" },
  { value: "18K+", label: "Businesses growing with content" },
  { value: "6.2M+", label: "organic visitors generated" },
] as const;

export const contentTypes = [
  {
    id: "product",
    image: "/showcase/petalform/bouquet-portrait.webp",
    alt: "Person holding a dried bouquet in front of their face against a violet-blue wall",
    title: "Paste a product URL and ship articles that rank",
    text: "Paste a product URL and get a full article brief, draft and meta tags ready to publish. Cover more search terms in a week than a freelance roster would in a month.",
  },
  {
    id: "landing",
    image: "/showcase/petalform/sunflower-bicycle.webp",
    alt: "Bicycle basket overflowing with sunflowers",
    title: "Landing pages for every search intent",
    text: "Build page variants for each keyword cluster, test headlines against each other, and keep iterating on what earns clicks. No production queue, ship new pages the same day.",
  },
  {
    id: "newsletter",
    image: "/showcase/petalform/clematis-mailbox.webp",
    alt: "Purple clematis climbing over a metal mailbox",
    title: "Turn one article into a month of newsletters",
    text: "Every published piece is split into email-sized stories with subject lines, so organic visitors have a reason to come back.",
  },
  {
    id: "local",
    image: "/showcase/petalform/window-box.webp",
    alt: "Window box planted with yellow, blue and white flowers on a brick wall",
    title: "Local pages for every storefront",
    text: "Generate a page per city or branch with opening hours, services and locally phrased questions, all from one spreadsheet.",
  },
] as const;


export const formats = [
  { id: "guide", label: "How-to guide", words: 1800, sections: ["What it is and who it is for", "Step-by-step method", "Common mistakes", "Tools and costs", "Questions people also ask"] },
  { id: "comparison", label: "Comparison", words: 1400, sections: ["Quick verdict", "How we compared", "Option by option", "Pricing side by side", "Which one to choose"] },
  { id: "listicle", label: "List article", words: 1200, sections: ["Why this list", "The shortlist", "How to pick", "What to avoid", "Next steps"] },
] as const;

export const sampleTopics = ["indoor herb garden", "small business payroll", "trail running shoes"] as const;

export const steps = [
  { number: "1", title: "Describe the topic", text: "Type a keyword or paste a product URL. Petalform reads what already ranks." },
  { number: "2", title: "Review the outline", text: "You get headings, a target length and the questions searchers ask." },
  { number: "3", title: "Publish and track", text: "Send the draft to your site and watch rankings in one view." },
] as const;

export type Plan = {
  id: string;
  name: string;
  summary: string;
  monthly: number;
  yearly: number;
  articles: string;
  features: string[];
  featured?: boolean;
};

/** Yearly prices are per month, billed once a year, and 25% below monthly. */
export const plans: Plan[] = [
  {
    id: "sprout",
    name: "Sprout",
    summary: "For a solo site finding its first readers.",
    monthly: 0,
    yearly: 0,
    articles: "5 articles a month",
    features: ["Outline and draft generator", "Meta titles and descriptions", "1 website"],
  },
  {
    id: "bloom",
    name: "Bloom",
    summary: "For growing teams publishing every week.",
    monthly: 48,
    yearly: 36,
    articles: "60 articles a month",
    features: ["Everything in Sprout", "Keyword clustering", "Rank tracking for 500 terms", "3 websites, 5 seats"],
    featured: true,
  },
  {
    id: "meadow",
    name: "Meadow",
    summary: "For agencies and multi-brand companies.",
    monthly: 160,
    yearly: 120,
    articles: "300 articles a month",
    features: ["Everything in Bloom", "Brand voice profiles", "Local page generator", "Unlimited websites and seats"],
  },
];

export const faqs = [
  {
    question: "Will search engines penalise generated content?",
    answer:
      "Search engines rank pages on usefulness, not on how they were written. Petalform drafts are built from a brief, cite their sources and are meant to be reviewed by a person before publishing.",
  },
  {
    question: "Can it write in our brand voice?",
    answer:
      "Yes. Paste three pieces you are happy with and Petalform builds a voice profile: sentence length, vocabulary, and phrases to avoid. Meadow plans can keep a separate profile per brand.",
  },
  {
    question: "Which platforms can I publish to?",
    answer:
      "Any site that accepts HTML or Markdown. Drafts can be copied, downloaded, or pushed through a webhook to your content system.",
  },
  {
    question: "How is an article counted?",
    answer:
      "One article is one published draft of any length. Outlines, rewrites and meta tags for the same piece are not counted again.",
  },
  {
    question: "Is there a contract?",
    answer: "No. Monthly plans can be cancelled at any time, and yearly plans are refunded pro rata within the first 30 days.",
  },
] as const;

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Content types", href: "#solutions" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Questions", href: "#resources" },
      { label: "Try the generator", href: "#how" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Get started", href: "#start" },
    ],
  },
] as const;
