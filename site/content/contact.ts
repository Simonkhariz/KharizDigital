// The one place for contact details. Every link on the site reads from here.

const WHATSAPP_NUMBER = "2348022899964";

/**
 * The two reasons someone gets in touch, each with the words shown on the
 * site and the message WhatsApp opens with.
 *  - project: a client who wants something designed or built (the main route)
 *  - collaboration: a developer, designer or creator who wants to team up
 */
export const enquiries = {
  project: {
    label: "Start a project",
    message: "Hello Khariz Digital! I'd like to start a project with your team.",
    placeholder: "Tell us about your project",
  },
  collaboration: {
    label: "Collaborate",
    message: "Hello Khariz Digital! I'm a developer/creator and I'd like to collaborate with your team.",
    placeholder: "Tell us what you do and what you have in mind",
  },
} as const;

export type EnquiryKind = keyof typeof enquiries;

/** Builds a WhatsApp chat link with a prefilled (URL-encoded) message. */
export function whatsappLink(message: string = enquiries.project.message): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  // Primary contact method.
  whatsapp: {
    label: "WhatsApp",
    display: "+234 802 289 9964",
    href: whatsappLink(),
    /** Opens with the collaborator's message instead of the client's. */
    collaborateHref: whatsappLink(enquiries.collaboration.message),
  },
  // Secondary contact method.
  email: {
    label: "Email",
    display: "Khariz.digital@gmail.com",
    href: "mailto:Khariz.digital@gmail.com",
  },
};

// Where the agency is based. Shown in the footer and on the contact and about pages.
export const address = {
  street: "26 Mount Street",
  city: "Enugu",
  country: "Nigeria",
  /** One line, e.g. for the footer. */
  full: "26 Mount Street, Enugu, Nigeria",
};

export type SocialLink = { label: string; handle: string; href: string };

export const socialLinks: SocialLink[] = [
  { label: "X", handle: "@smnkhariz", href: "https://x.com/smnkhariz?s=11" },
  { label: "Telegram", handle: "@smnKhariz", href: "https://t.me/smnKhariz" },
  { label: "TikTok", handle: "@kharizdigital", href: "https://www.tiktok.com/@kharizdigital" },
];
