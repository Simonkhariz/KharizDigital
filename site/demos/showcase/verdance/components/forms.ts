export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(value: string): string | null {
  const email = value.trim();
  if (!email) return "Enter your work email.";
  if (!emailPattern.test(email)) return "Enter a valid email, such as name@company.com.";
  return null;
}
