export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "the Science", href: "#science" },
  { label: "for Athletes", href: "#athletes" },
  { label: "for Coaches", href: "#coaches" },
  { label: "for Network", href: "#network" },
];

export const hero = {
  eyebrow: "Find your stride",
  titleLines: ["The App", "for Athletes"],
  body: "Log all your training and performance data in one place for elite level athlete monitoring, insights and performance optimisation.",
};

export const built = {
  titleLines: ["Built for athletes", "by athletes."],
  body: "Stridehaus isn't just a training diary, it's a way to connect, share and engage with athletes around the world.",
  log: {
    title: "Log what matters",
    body: "No complex or expensive devices required. Simply track the data that matters and optimise your peak performance.",
  },
  wearables: {
    title: "Connect your wearables",
    body: "Although not required, seamlessly integrate with popular fitness devices for a holistic view of your training.",
    devices: ["GPS watch", "Smart ring", "Heart-rate strap", "Phone sensors"],
  },
  insights: {
    title: "Personalised Insights",
    body: "Use your own history to get personalised insights tailored to your unique training data.",
    cardTitle: "Personalised Stride Insights",
    cardBody:
      "Today's stride score is 72, but your 7-day average is 64 and trending upwards, indicating a good foundation. Keep recovery consistent tonight so you are primed to break through tomorrow.",
  },
};

/** Last seven days of training load; green bars are completed days, the final two are partial. */
export const loadWidget = { value: 114, days: [1, 1, 1, 1, 1, 0.45, 0.45] };

export const athleteFeatures = [
  { stat: "20 s", title: "Log a session in seconds", body: "Pick the type, set the effort and duration, done. Add splits, lifts or notes only when you want to." },
  { stat: "7 days", title: "Know your load", body: "Acute and chronic load are worked out from every entry, so you can see a spike coming before it becomes an injury." },
  { stat: "1 score", title: "Wake up to a plan", body: "A single stride score each morning tells you whether to push, hold or recover, with the reason behind it." },
];

export type SquadGroup = "Sprints" | "Distance" | "Throws";
export type SquadStatus = "Ready" | "Monitor" | "Recover";

export type SquadAthlete = { name: string; group: SquadGroup; score: number; load: number; trend: number[]; status: SquadStatus };

/** Fictional squad for the coach view. */
export const squad: SquadAthlete[] = [
  { name: "Imani Okafor", group: "Sprints", score: 84, load: 96, trend: [60, 72, 70, 81, 84], status: "Ready" },
  { name: "Lena Voss", group: "Distance", score: 58, load: 148, trend: [74, 70, 66, 61, 58], status: "Monitor" },
  { name: "Tomás Ibarra", group: "Throws", score: 77, load: 102, trend: [70, 71, 75, 74, 77], status: "Ready" },
  { name: "Aiko Tanabe", group: "Distance", score: 41, load: 171, trend: [69, 63, 55, 47, 41], status: "Recover" },
  { name: "Jonas Reed", group: "Sprints", score: 66, load: 121, trend: [72, 70, 69, 65, 66], status: "Monitor" },
  { name: "Mara Lindholm", group: "Throws", score: 88, load: 88, trend: [79, 82, 80, 86, 88], status: "Ready" },
];

export type FeedPost = { id: string; athlete: string; initials: string; discipline: string; title: string; detail: string; metrics: { label: string; value: string }[]; kudos: number };

export const feed: FeedPost[] = [
  {
    id: "p1",
    athlete: "Imani Okafor",
    initials: "IO",
    discipline: "400 m",
    title: "Track session: 6 × 200 m",
    detail: "Last two reps were the fastest. Felt smooth off the bend.",
    metrics: [
      { label: "Best rep", value: "24.8 s" },
      { label: "Effort", value: "8 / 10" },
      { label: "Load", value: "132" },
    ],
    kudos: 41,
  },
  {
    id: "p2",
    athlete: "Lena Voss",
    initials: "LV",
    discipline: "5000 m",
    title: "Easy aerobic run",
    detail: "Kept the heart rate down after Sunday's long run.",
    metrics: [
      { label: "Distance", value: "9.2 km" },
      { label: "Effort", value: "3 / 10" },
      { label: "Load", value: "54" },
    ],
    kudos: 18,
  },
  {
    id: "p3",
    athlete: "Tomás Ibarra",
    initials: "TI",
    discipline: "Javelin",
    title: "Throws and power",
    detail: "Short approach throws, then cleans. Shoulder felt good.",
    metrics: [
      { label: "Throws", value: "24" },
      { label: "Effort", value: "7 / 10" },
      { label: "Load", value: "98" },
    ],
    kudos: 27,
  },
];

export type Plan = { id: string; name: string; blurb: string; monthly: number; yearly: number; unit: string; features: string[]; featured?: boolean };

/** Yearly prices are the total for twelve months. */
export const plans: Plan[] = [
  {
    id: "free",
    name: "Athlete",
    blurb: "Everything you need to log and share your training.",
    monthly: 0,
    yearly: 0,
    unit: "free forever",
    features: ["Unlimited session logging", "Training load and stride score", "Follow up to 50 athletes"],
  },
  {
    id: "pro",
    name: "Athlete Pro",
    blurb: "Deeper insight for athletes chasing a personal best.",
    monthly: 7,
    yearly: 60,
    unit: "per athlete",
    features: ["Personalised daily insights", "Wearable sync", "Season planner and race taper", "Export to your coach or physio"],
    featured: true,
  },
  {
    id: "squad",
    name: "Squad",
    blurb: "For coaches and clubs who look after a group.",
    monthly: 4,
    yearly: 36,
    unit: "per athlete in the squad",
    features: ["Coach dashboard with readiness flags", "Session plans sent to phones", "Group and individual load limits"],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need a watch or any other device?",
    a: "No. Every measure in Stridehaus can be logged by hand in a few taps. If you do wear a device, connecting it simply fills more of the picture in for you.",
  },
  {
    q: "How is the stride score calculated?",
    a: "It combines how much you have trained over the last seven days against your four-week baseline with your sleep and soreness check-in. The app always shows which factor moved the score.",
  },
  {
    q: "Which sports does it cover?",
    a: "Stridehaus started in track and field, and it now has session types for running, throwing, jumping, strength, swimming, cycling and team-sport conditioning.",
  },
  {
    q: "Can my coach see my data?",
    a: "Only if you accept an invitation from them. You choose what a coach can see and you can leave a squad at any time.",
  },
  {
    q: "Is the free plan really free?",
    a: "Yes. Logging, load, the stride score and the network are free with no time limit. Pro adds planning tools and deeper insight.",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  { title: "App", links: [...navLinks] },
  {
    title: "More",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Questions", href: "#faq" },
      { label: "Join for free", href: "#join" },
    ],
  },
];
