export const hero = {
  body: "Discover your Biological Age, track your health over time, and receive clear, personal insights from every blood test.",
  rating: { score: "4.6", label: "average rating", reviews: "38K reviews" },
};

export const languages = ["English", "Deutsch", "Español", "Français"] as const;

export const steps = [
  { id: "01", lead: "Upload;", text: "Take a photo or upload your blood test PDF." },
  { id: "02", lead: "Understand;", text: "Verdia explains every marker in plain language." },
  { id: "03", lead: "Act & Track;", text: "Track changes to see how your health evolves." },
];

/** The three category scores that appear across the page. All are out of 100. */
export const categories = [
  { id: "metabolism", label: "Metabolism", score: 80, color: "#e5484d" },
  { id: "energy", label: "Energy", score: 72.6, color: "#7fb800" },
  { id: "immunity", label: "Immunity", score: 96.2, color: "#7a4fd6" },
] as const;

export const result = { biologicalAge: 32, actualAge: 36, healthScore: 88.4 };

export const features = [
  {
    id: "categories",
    title: "Category Breakdown",
    body: "A simple 0-100 score across Metabolic Health, Thyroid, Cardiovascular, and Nutritional Status.",
  },
  {
    id: "age",
    title: "Biological Age Calculator",
    body: "Discover how old your body really is compared to your chronological age. Our most shareable “wow” moment.",
  },
  {
    id: "plain",
    title: "Plain-language Interpretation",
    body: "Every marker comes with what it measures, why it matters and what usually moves it, without the jargon.",
  },
  {
    id: "score",
    title: "Health Score",
    body: "One number that sums up your latest test, so you can see at a glance whether you are heading the right way.",
  },
];

/** Health score at each test. The last entry equals `result.healthScore`. */
export const trend = [
  { date: "18 Mar", value: 79.6 },
  { date: "24 Jun", value: 84.3 },
  { date: "16 Nov", value: 82.9 },
  { date: "02 Feb", value: 88.4 },
];

export type MarkerStatus = "In range" | "Slightly low" | "Slightly high";

export type Marker = {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  /** The scale shown on the bar, and the healthy band within it. */
  scale: [number, number];
  healthy: [number, number];
  status: MarkerStatus;
  plain: string;
  action: string;
};

/** Sample results for the marker explorer. Reference bands are typical adult ranges, for illustration only. */
export const markers: Marker[] = [
  {
    id: "vitd",
    name: "Vitamin D",
    category: "Nutrition",
    value: 22,
    unit: "ng/mL",
    scale: [0, 80],
    healthy: [30, 60],
    status: "Slightly low",
    plain: "Vitamin D helps your body absorb calcium and supports muscles and immunity. Yours is a little under the usual range, which is common after winter.",
    action: "More daylight and oily fish help. Ask your doctor whether a supplement makes sense for you.",
  },
  {
    id: "ferritin",
    name: "Ferritin",
    category: "Energy",
    value: 64,
    unit: "ng/mL",
    scale: [0, 250],
    healthy: [30, 200],
    status: "In range",
    plain: "Ferritin shows how much iron you have in reserve. Iron carries oxygen, so low stores often show up as tiredness. Yours is comfortably in range.",
    action: "Nothing to change. Verdia will flag it if the trend starts to fall.",
  },
  {
    id: "hba1c",
    name: "HbA1c",
    category: "Metabolism",
    value: 5.8,
    unit: "%",
    scale: [4, 8],
    healthy: [4, 5.6],
    status: "Slightly high",
    plain: "HbA1c reflects your average blood sugar over about three months. Yours is just above the usual range, an early signal worth watching rather than a diagnosis.",
    action: "A walk after meals and fewer sugary drinks often bring it down. Share this result with your doctor.",
  },
  {
    id: "tsh",
    name: "TSH",
    category: "Thyroid",
    value: 2.1,
    unit: "mIU/L",
    scale: [0, 6],
    healthy: [0.4, 4],
    status: "In range",
    plain: "TSH is the signal your brain sends to your thyroid, the gland that sets the pace of your metabolism. Yours sits in the middle of the range.",
    action: "No action needed. Retest with your next routine panel.",
  },
  {
    id: "ldl",
    name: "LDL cholesterol",
    category: "Heart",
    value: 118,
    unit: "mg/dL",
    scale: [40, 200],
    healthy: [40, 100],
    status: "Slightly high",
    plain: "LDL carries cholesterol to your arteries, where too much can build up over the years. Yours is a little above the ideal level.",
    action: "More fibre and regular exercise help most people. Your doctor can put the number in context with your overall risk.",
  },
];

export const trust = [
  { title: "Your results stay private", body: "Tests are encrypted on your phone and in transit. We never sell health data, and you can delete everything in two taps." },
  { title: "Reviewed by clinicians", body: "Every explanation is written with doctors and updated as guidance changes. Each one links to its sources." },
  { title: "Works with any lab", body: "Upload a PDF or a photo from any laboratory. Verdia reads more than 120 common markers and tells you if it cannot read one." },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is Verdia a replacement for my doctor?",
    a: "No. Verdia helps you understand your results and prepare better questions. It does not diagnose conditions or prescribe treatment, and anything urgent should go to a medical professional.",
  },
  {
    q: "How is biological age calculated?",
    a: "From a set of routine blood markers that change predictably with age, compared with people of the same sex and age. The app shows which markers pulled your number up or down.",
  },
  {
    q: "Which blood tests can I upload?",
    a: "Any routine panel from any lab, as a PDF or a clear photo. A standard check-up with a blood count, lipids, glucose, liver, kidney and thyroid markers gives the fullest picture.",
  },
  {
    q: "What does it cost?",
    a: "Your first test is free, including the full breakdown. Verdia Plus adds unlimited tests, trends over time and family profiles for a small yearly fee shown in the app.",
  },
  {
    q: "Can I delete my data?",
    a: "Yes, at any time from Settings. Deleting your account removes your tests and results from our systems within 30 days.",
  },
];

export const platforms = ["iPhone", "Android"] as const;
export type Platform = (typeof platforms)[number];
