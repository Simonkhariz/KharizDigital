import type { CurrencyCode } from "../data/content";

/** Brand mark: three arcs of a coin seen edge-on. Drawn in code so it scales from the nav to the footer. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 44" aria-hidden="true" focusable="false">
      <path d="M7.5 14.5C11 8.2 17 4.6 24 4.6s13 3.6 16.5 9.9" fill="none" stroke="currentColor" strokeWidth="6.4" opacity="0.42" />
      <path d="M14 23.4c2.3-3.7 5.9-5.8 10-5.8s7.7 2.1 10 5.8" fill="none" stroke="currentColor" strokeWidth="6.4" />
      <path d="M6.6 28.5C10.2 35.3 16.6 39.4 24 39.4s13.8-4.1 17.4-10.9" fill="none" stroke="currentColor" strokeWidth="6.4" />
    </svg>
  );
}

function Chip() {
  return (
    <svg className="dn-card-chip" viewBox="0 0 52 39" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="dn-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4e4e4" />
          <stop offset="0.5" stopColor="#bdbdbd" />
          <stop offset="1" stopColor="#d6d6d6" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="51" height="38" rx="5" fill="url(#dn-chip)" stroke="#a3a3a3" />
      <g fill="none" stroke="#f4f4f4" strokeWidth="1.3">
        <rect x="5.5" y="6" width="22" height="11.5" rx="5.75" />
        <circle cx="39.5" cy="11.75" r="5.75" />
        <circle cx="11.25" cy="27.25" r="5.75" />
        <rect x="24" y="21.5" width="22" height="11.5" rx="5.75" />
      </g>
    </svg>
  );
}

function Contactless() {
  return (
    <svg className="dn-card-wave" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4.5 9.2c1.1 1.8 1.1 3.8 0 5.6" />
        <path d="M8.8 6.8c2.1 3.3 2.1 7.1 0 10.4" />
        <path d="M13.1 4.5c3.1 4.8 3.1 10.2 0 15" />
        <path d="M17.4 2.2c4.1 6.3 4.1 13.3 0 19.6" />
      </g>
    </svg>
  );
}

/** The metallic bank card: brushed graphite body, champagne stripe, chip, contactless mark and a balance. */
export function BankCard({
  amount,
  label = "Balance",
  className,
  frozen = false,
  last4,
}: {
  amount: string;
  label?: string;
  className?: string;
  frozen?: boolean;
  last4?: string;
}) {
  return (
    <div className={`dn-card${frozen ? " is-frozen" : ""}${className ? ` ${className}` : ""}`}>
      <div className="dn-card-body">
        <Chip />
        {last4 ? <span className="dn-card-digits">•••• {last4}</span> : null}
        <div className="dn-card-balance">
          <span className="dn-card-label">{label}</span>
          <span className="dn-card-amount dn-num">{amount}</span>
        </div>
      </div>
      <div className="dn-card-stripe">
        <Contactless />
      </div>
    </div>
  );
}

/** Typed character texture, used as a mask so it can take any colour. Decorative. */
export function AsciiField({ className }: { className?: string }) {
  return <span className={`dn-ascii${className ? ` ${className}` : ""}`} aria-hidden="true" />;
}

/** Monochrome round flags for the currency tiles, tinted with currentColor. */
export function Flag({ code }: { code: CurrencyCode }) {
  const light = "#f3f1ef";
  const clip = `dn-flag-${code}`;
  return (
    <svg className="dn-flag" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <circle cx="22" cy="22" r="22" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {code === "AUD" && (
          <>
            <rect width="44" height="44" fill="currentColor" />
            <path d="M0 0h20v18H0z" fill="currentColor" />
            <path d="M0 0l20 18M20 0L0 18" stroke={light} strokeWidth="3" />
            <path d="M10 0v18M0 9h20" stroke={light} strokeWidth="4.5" />
            {[
              [31, 15, 1.7],
              [35.5, 22, 1.5],
              [28, 25, 1.5],
              [32.5, 32, 1.7],
              [12, 31, 2.3],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={light} />
            ))}
          </>
        )}
        {code === "CHF" && (
          <>
            <rect width="44" height="44" fill="currentColor" />
            <path d="M18 11h8v7h7v8h-7v7h-8v-7h-7v-8h7z" fill={light} />
          </>
        )}
        {code === "KRW" && (
          <>
            <rect width="44" height="44" fill="currentColor" />
            <circle cx="22" cy="22" r="8" fill={light} />
            <path d="M14 22a8 8 0 0016 0z" fill="#161616" />
            <g stroke={light} strokeWidth="1.8">
              <path d="M7.5 12.5l6-6M9.8 14.8l6-6M12.1 17.1l6-6" />
              <path d="M30.5 6.5l6 6M28.2 8.8l6 6M25.9 11.1l6 6" strokeDasharray="3.6 1.2" />
              <path d="M7.5 31.5l6 6M9.8 29.2l6 6M12.1 26.9l6 6" strokeDasharray="3.6 1.2" />
              <path d="M30.5 37.5l6-6M28.2 35.2l6-6M25.9 32.9l6-6" />
            </g>
          </>
        )}
        {code === "SGD" && (
          <>
            <rect width="44" height="22" fill="currentColor" />
            <rect y="22" width="44" height="22" fill="#ececec" />
            <path d="M17 6.5a6.2 6.2 0 100 11 5 5 0 110-11z" fill={light} />
            {[
              [22, 8],
              [19.5, 10.5],
              [24.5, 10.5],
              [20.5, 14],
              [23.5, 14],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" fill={light} />
            ))}
          </>
        )}
        {code === "USD" && (
          <>
            <rect width="44" height="44" fill={light} />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (i % 2 === 0 ? <rect key={i} y={i * 6.3} width="44" height="6.3" fill="currentColor" /> : null))}
            <rect width="22" height="24" fill="currentColor" />
            {[
              [5.5, 6.5],
              [11.5, 6.5],
              [17.5, 6.5],
              [8.5, 12],
              [14.5, 12],
              [5.5, 17.5],
              [11.5, 17.5],
              [17.5, 17.5],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.3" fill={light} />
            ))}
          </>
        )}
        {code === "SEK" && (
          <>
            <rect width="44" height="44" fill="#ececec" />
            <path d="M12 0h6v19h26v6H18v19h-6V25H0v-6h12z" fill="currentColor" />
          </>
        )}
      </g>
    </svg>
  );
}

/** Five invented partner wordmarks for the hero strip, each with its own small device. */
export function PartnerMark({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <span className="dn-partner dn-partner-round">Quillbank</span>;
    case 1:
      return (
        <span className="dn-partner dn-partner-union">
          <svg viewBox="0 0 26 26" aria-hidden="true" focusable="false">
            <circle cx="13" cy="13" r="11" fill="none" stroke="currentColor" strokeWidth="2.6" />
            <path d="M7.5 9.5l5.5 9 5.5-9" fill="none" stroke="currentColor" strokeWidth="2.8" />
          </svg>
          <span>
            Verdane<small>Credit Union</small>
          </span>
        </span>
      );
    case 2:
      return (
        <span className="dn-partner dn-partner-valley">
          <svg viewBox="0 0 40 16" aria-hidden="true" focusable="false">
            <path d="M0 16l9-11 5 6 6-11 7 10 4-5 9 11z" fill="currentColor" />
          </svg>
          <span>TamberValeBank</span>
        </span>
      );
    case 3:
      return (
        <span className="dn-partner dn-partner-bars" aria-label="Northline">
          <svg viewBox="0 0 46 30" role="img" aria-label="Northline">
            <g fill="currentColor">
              <path d="M14 0h9L9 12H0z" />
              <path d="M26 0h9L15 18H6z" />
              <path d="M38 2h8L22 24h-9z" />
              <path d="M46 10v7L30 30h-9z" />
            </g>
          </svg>
        </span>
      );
    default:
      return (
        <span className="dn-partner dn-partner-thin">
          <b>Flare</b>mont
        </span>
      );
  }
}
