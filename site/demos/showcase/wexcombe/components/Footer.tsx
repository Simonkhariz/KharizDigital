import Link from "next/link";
import { base, navLinks, office, practices } from "../data/content";

export function Footer() {
  return (
    <footer className="wx-foot">
      <div className="wx-foot__in">
        <div className="wx-foot__brand">
          <Link href={`${base}/`} className="wx-foot__logo">
            Wexcombe
          </Link>
          <p>Partner-led executive search for founder-led, family-owned and private equity–backed companies.</p>
        </div>
        <nav aria-label="Footer: firm">
          <h2>Firm</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href={`${base}/#process`}>Process</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Footer: practices">
          <h2>Practices</h2>
          <ul>
            {practices.map((practice) => (
              <li key={practice.id}>
                <Link href={`${base}/practices/#${practice.id}`}>{practice.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Office</h2>
          <address>
            {office.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span>{office.phone}</span>
            <span>{office.email}</span>
          </address>
        </div>
      </div>
      <div className="wx-foot__legal">
        <p>&copy; 2026 Wexcombe Partners</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
