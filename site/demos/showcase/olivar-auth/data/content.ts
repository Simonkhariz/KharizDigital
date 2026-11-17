/** The code this demonstration accepts. It is shown on screen because no email is ever sent. */
export const DEMO_CODE = "202692";
export const CODE_LENGTH = 6;
export const RESEND_SECONDS = 30;

export const purposes = [
  { id: "personal", label: "Personal notes" },
  { id: "team", label: "Team projects" },
  { id: "clients", label: "Client work" },
  { id: "exploring", label: "Just exploring" },
] as const;

export type PurposeId = (typeof purposes)[number]["id"];

export const terms = [
  "Olivar is a concept product. This page demonstrates a sign-up flow and does not create an account.",
  "Nothing you type is sent, stored or shared. It stays in this browser tab and is cleared when you reload.",
  "No email is delivered. The confirmation code is fixed and displayed on the screen for the demonstration.",
];

/** Keeps the first two characters of the mailbox name and hides the rest. */
export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"•".repeat(Math.max(3, name.length - 2))}@${domain}`;
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}
