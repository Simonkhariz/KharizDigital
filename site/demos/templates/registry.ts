export interface TemplateInfo {
  /** URL segment: the template is served at `/<slug>`. */
  slug: string;
  /** Human readable name, shown on the index page and in the page title. */
  name: string;
  /** Extra stylesheets (display fonts hosted outside Google Fonts) the template needs. */
  fontStylesheets?: string[];
}

export const templates: TemplateInfo[] = [
  { slug: "web-agency", name: "Web Agency" },
  { slug: "creative-portfolio", name: "Creative Portfolio" },
  { slug: "saas-platform", name: "SaaS Platform" },
  { slug: "ai-consulting", name: "AI Consulting" },
  { slug: "ai-email-platform", name: "AI Email Platform" },
  { slug: "ai-ugc-creator", name: "AI UGC Creator" },
  { slug: "auto-detailing", name: "Auto Detailing" },
  { slug: "boutique-hotel", name: "Boutique Hotel" },
  {
    slug: "coffee-shop",
    name: "Coffee Shop",
    fontStylesheets: ["https://fonts.cdnfonts.com/css/messy-handwritten"],
  },
  { slug: "dental-practice", name: "Dental Practice" },
  { slug: "hvac-management", name: "HVAC Management" },
  { slug: "landscaping-services", name: "Landscaping Services" },
  {
    slug: "luxury-real-estate",
    name: "Luxury Real Estate",
    fontStylesheets: ["https://fonts.cdnfonts.com/css/argon-2"],
  },
  { slug: "med-spa", name: "Med Spa" },
  { slug: "natural-skincare", name: "Natural Skincare" },
  { slug: "perfume-brand", name: "Perfume Brand" },
  {
    slug: "personal-blogger",
    name: "Personal Blogger",
    fontStylesheets: ["https://fonts.cdnfonts.com/css/messy-handwritten"],
  },
  { slug: "plumbing-services", name: "Plumbing Services" },
  { slug: "product-showcase", name: "Product Showcase" },
  { slug: "real-estate-agency", name: "Real Estate Agency" },
  { slug: "roofing-company", name: "Roofing Company" },
  { slug: "travel-agency", name: "Travel Agency" },
  { slug: "wellness-center", name: "Wellness Center" },
];

export function getTemplate(slug: string) {
  return templates.find((template) => template.slug === slug);
}
