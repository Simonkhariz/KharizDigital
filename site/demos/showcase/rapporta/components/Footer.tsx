import { footerColumns, legalNotes } from "../data/site";
import { DialogButton } from "./Dialogs";
import { LogoMark } from "./Logo";
import { page as styles } from "@/demos/showcase/rapporta/styles";

export function Footer() {
  return (
    <footer className={styles.footerBand}>
      <div className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.footerBrand}>
              <LogoMark size={20} /> Rapporta
            </p>
            <p className={styles.footerTagline}>AI agents that turn customer conversations into loyalty.</p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} className={styles.footerCol} aria-label={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className={styles.footerCol}>
            <h3>Legal</h3>
            <ul>
              {legalNotes.map((note, index) => (
                <li key={note.label}>
                  <DialogButton request={{ kind: "legal", index }} className={styles.footerLink}>
                    {note.label}
                  </DialogButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.footerNote}>Concept website with demonstration content.</p>
        <svg className={styles.wordmark} viewBox="0 0 1000 300" role="img" aria-label="Rapporta">
          <defs>
            <filter id="rapporta-rough" x="-2%" y="-5%" width="104%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>
          </defs>
          <text x="0" y="222" fontSize="262" textLength="1000" lengthAdjust="spacingAndGlyphs" filter="url(#rapporta-rough)">
            Rapporta
          </text>
        </svg>
      </div>
    </footer>
  );
}
