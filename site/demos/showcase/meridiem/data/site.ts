export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

export const hero = {
  announcement: "Announcing our Series A:",
  announcementStrong: "$23M in total funding",
  titleTop: "The reasoning model",
  titleBottom: "built for what matters.",
  body: "Meridiem is an AI model that works through problems carefully before producing an answer. Connect via API, build in minutes, and ship intelligence you can actually trust.",
  proof: "10k+ developers already joined",
};

export const answerStyles = ["Concise", "Step by step", "Formal"] as const;

export type Suggestion = {
  chip: string;
  prompt: string;
  steps: string[];
  answer: string;
};

export const suggestions: Suggestion[] = [
  {
    chip: "Analyze my contract",
    prompt: "Analyze my contract and flag any unusual clauses.",
    steps: [
      "Reading the agreement structure and defined terms",
      "Comparing each clause with standard supplier terms",
      "Checking flagged clauses against each other",
    ],
    answer:
      "Three clauses stand out: an automatic renewal with a 90-day notice period, uncapped liability for data loss, and a unilateral price change right. I would raise the liability clause first.",
  },
  {
    chip: "Summarize this log",
    prompt: "Summarize this log and tell me what failed first.",
    steps: [
      "Grouping entries by service and timestamp",
      "Tracing the earliest error to its cause",
      "Ruling out the retries that followed",
    ],
    answer:
      "The first failure is a connection pool timeout in the billing service. The gateway errors that follow are retries of the same request, so there is one root cause, not four.",
  },
  {
    chip: "Review my code",
    prompt: "Review my code for bugs before I open a pull request.",
    steps: [
      "Following the data flow through each function",
      "Testing edge cases: empty input, repeated calls",
      "Confirming the suggested fix keeps behaviour the same",
    ],
    answer:
      "One real bug: the cache key ignores the locale, so two users can receive each other's formatted totals. Add the locale to the key. The rest is style and can wait.",
  },
];

export const genericRun = {
  steps: ["Restating the question in plain terms", "Listing what is known and what is missing", "Checking the draft answer for gaps"],
  answer:
    "This is a demo, so no model was called. With API access, Meridiem would work through your question step by step and show that reasoning beside the answer.",
};

export const partners = ["birchline", "clinicweave", "Veritade", "twillow", "Harbor Health"];

export const principles = [
  {
    number: "I",
    title: "It shows its work",
    body: "Every response carries a readable trace of the steps taken, so your team can audit a conclusion instead of taking it on faith.",
  },
  {
    number: "II",
    title: "It knows what it does not know",
    body: "Meridiem reports a confidence level with each claim and says plainly when the material you gave it is not enough.",
  },
  {
    number: "III",
    title: "It checks before it answers",
    body: "A second pass tests the draft against the source documents. Contradictions are fixed or flagged before you see a word.",
  },
];

export const stats = [
  { value: "400k", label: "tokens of context in one request" },
  { value: "2 passes", label: "draft, then verification" },
  { value: "99.9%", label: "API uptime target" },
];

export type CodeSample = { id: string; label: string; code: string };

export const codeSamples: CodeSample[] = [
  {
    id: "curl",
    label: "cURL",
    code: `curl https://api.meridiem.example/v1/reason \\
  -H "Authorization: Bearer $MERIDIEM_KEY" \\
  -d '{
    "model": "meridiem-1",
    "effort": "deep",
    "input": "Which clause conflicts with section 4?"
  }'`,
  },
  {
    id: "python",
    label: "Python",
    code: `from meridiem import Meridiem

client = Meridiem()

result = client.reason(
    model="meridiem-1",
    effort="deep",
    input="Which clause conflicts with section 4?",
)

print(result.answer)
print(result.trace)`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    code: `import { Meridiem } from "meridiem";

const client = new Meridiem();

const result = await client.reason({
  model: "meridiem-1",
  effort: "deep",
  input: "Which clause conflicts with section 4?",
});

console.log(result.answer, result.trace);`,
  },
];

export type Plan = {
  name: string;
  summary: string;
  price: { standard: string; deep: string };
  unit: string;
  detail: { standard: string; deep: string };
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Explore",
    summary: "For trying Meridiem on your own problems.",
    price: { standard: "$0", deep: "$0" },
    unit: "while on the waitlist",
    detail: { standard: "200 standard requests a day", deep: "25 deep requests a day" },
    features: ["Playground access", "Reasoning traces", "Community forum"],
    cta: "Join the waitlist",
  },
  {
    name: "Build",
    summary: "For products that run on the API.",
    price: { standard: "$3", deep: "$9" },
    unit: "per million input tokens",
    detail: { standard: "$12 per million output tokens", deep: "$36 per million output tokens" },
    features: ["Everything in Explore", "400k token context", "Usage dashboard and limits", "Email support"],
    cta: "Join the waitlist",
    featured: true,
  },
  {
    name: "Scale",
    summary: "For teams with volume and compliance needs.",
    price: { standard: "Custom", deep: "Custom" },
    unit: "annual agreement",
    detail: { standard: "Committed-use discounts", deep: "Committed-use discounts" },
    features: ["Everything in Build", "Dedicated capacity", "Zero data retention", "Named engineer"],
    cta: "Talk to us",
  },
];

export type Post = {
  id: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  tone: "gold" | "rose" | "dusk";
};

export const posts: Post[] = [
  {
    id: "series-a",
    tag: "Company",
    date: "November 4, 2026",
    title: "Announcing our Series A: $23M in total funding",
    excerpt: "What the round pays for, and what stays the same.",
    body: [
      "We have raised a Series A that brings our total funding to $23M. The money goes to two things: more compute for verification passes, and a larger evaluation team.",
      "What stays the same is the pace. We will keep admitting waitlist teams in small groups so that every one of them gets working support in the first week.",
    ],
    tone: "gold",
  },
  {
    id: "traces",
    tag: "Research",
    date: "October 21, 2026",
    title: "Why we ship the reasoning trace with every answer",
    excerpt: "An answer you cannot audit is an answer you cannot use.",
    body: [
      "In regulated work, a correct answer is only half of the requirement. Someone has to be able to show how it was reached.",
      "Meridiem returns a structured trace beside every response. It lists the steps taken, the sources read at each step and where the model was unsure, in language a reviewer can follow.",
    ],
    tone: "rose",
  },
  {
    id: "effort",
    tag: "Product",
    date: "October 2, 2026",
    title: "Standard and deep: choosing how hard the model thinks",
    excerpt: "One parameter trades speed for scrutiny.",
    body: [
      "Not every question deserves a minute of thought. The effort parameter lets you pick: standard answers quickly with one verification pass, deep explores alternatives before committing.",
      "In our own use, about one request in eight is worth running deep. Contract review and incident analysis usually are. Reformatting a date is not.",
    ],
    tone: "dusk",
  },
];

export const faqs = [
  {
    question: "When will I get access?",
    answer:
      "We admit teams from the waitlist every two weeks, in the order they joined. You will get an email with an API key and a short setup guide.",
  },
  {
    question: "How is a reasoning model different from a chat model?",
    answer:
      "It spends time planning and checking before it writes. That makes it slower on simple requests and noticeably more reliable on multi-step ones.",
  },
  {
    question: "Do you train on what I send?",
    answer: "No. Requests are not used for training. On Scale, they are not stored at all once the response is returned.",
  },
  {
    question: "Can I see the reasoning in the API response?",
    answer:
      "Yes. Each response includes a trace field with the steps taken and a confidence level for the final answer.",
  },
];

export const useCases = ["Document review", "Engineering tools", "Research and analysis", "Customer support", "Something else"];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Try a prompt", href: "#try" },
      { label: "API", href: "#api" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Questions", href: "#faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Join the waitlist", href: "#waitlist" },
      { label: "Back to top", href: "#top" },
    ],
  },
];
