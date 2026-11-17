// Agency details, navigation and footer text.

export const site = {
  name: "Khariz Digital",
  descriptor: "Web Development Agency",
  slogan: "Crafting Digital Experiences.",
  // Shown in the footer and used as the default meta description.
  description:
    "We are a web design and development agency. We design and build websites, web applications and brand identities for businesses, brands and startups.",
  // One short line shown in the footer.
  footerNote: "Web design and development for businesses, brands and startups.",
  // Oversized word at the bottom of the footer. It is scaled to fit the width.
  wordmark: "khariz.digital",
  availability: "Open for projects",
  // Footer copyright line. Update the year when needed.
  copyright: "© 2026 Khariz Digital",
  // Public address of this website. Set NEXT_PUBLIC_SITE_URL when deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export type NavLink = { label: string; href: string };

// Header links. The Contact pill is separate (contactLink).
export const navLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];
export const contactLink: NavLink = { label: "Contact", href: "/contact" };

export const footerMenu: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Home page hero: "We craft [what] for [who]." The pair changes every 2.8 seconds.
export const hero = {
  srOnly: "Khariz Digital, a web development agency. Crafting digital experiences.",
  lead: "We craft",
  joiner: "for",
  pairs: [
    ["websites", "startups"],
    ["web apps", "businesses"],
    ["identities", "brands"],
    ["experiences", "people"],
  ] as [string, string][],
  line: "Khariz Digital. Web Development Agency. Crafting Digital Experiences.",
  cta: "View work",
};

// Home page section 02.
export const studio = {
  statement:
    "We design and develop digital experiences for businesses, brands and startups: websites that are clear to use, quick to load and built to be kept up.",
  // Small labelled facts under the statement.
  facts: [
    { label: "Focus", value: "Web Design, Web Development, Logo Design & Branding" },
    { label: "Works with", value: "Businesses, brands and startups" },
    { label: "Based in", value: "Enugu, Nigeria" },
  ],
};

// Call to action above the footer.
export const collaboration = {
  heading: ["Have a project in mind?", "Let's build something meaningful together."],
  // Main button, for clients.
  button: "Start a project",
  // Smaller link under it, for developers and designers who want to team up.
  secondary: { lead: "Developer or Designer?", label: "Collaborate with us" },
};
