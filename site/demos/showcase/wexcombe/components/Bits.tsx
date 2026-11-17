import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** Dark green pill with a pale circle holding an arrow. */
export function PillLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={["wx-pill", className ?? ""].join(" ").trim()} onClick={onClick}>
      {children}
      <span aria-hidden="true">
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

/** Bracketed mono label, e.g. [ PRACTICES ]. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="wx-label">
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </p>
  );
}

/** Section heading: a black first line and a grey second line, with an optional link on the right. */
export function Heading({
  label,
  first,
  second,
  link,
  as: Tag = "h2",
}: {
  label: string;
  first: string;
  second: string;
  link?: { href: string; text: string };
  as?: "h1" | "h2";
}) {
  return (
    <div className="wx-heading">
      <div>
        <Label>{label}</Label>
        <Tag>
          {first}
          <br />
          <span>{second}</span>
        </Tag>
      </div>
      {link ? (
        <Link href={link.href} className="wx-textlink">
          {link.text}
        </Link>
      ) : null}
    </div>
  );
}
