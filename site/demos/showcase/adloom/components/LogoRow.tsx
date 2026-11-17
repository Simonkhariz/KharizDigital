import { logoRow } from "../data/content";
import "./LogoRow.css";

export function LogoRow() {
  return (
    <section className="al-logo-row-section" aria-label="Brands using Adloom">
      <div className="al-container">
        <p className="al-logo-row-caption">{logoRow.caption}</p>
        <ul className="al-logo-row-row">
          {logoRow.brands.map((brand, index) => (
            <li key={brand} className={`al-logo-row-brand${index}`}>
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
