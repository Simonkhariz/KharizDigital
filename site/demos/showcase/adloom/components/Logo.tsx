import "./Logo.css";

export function LogoMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path d="M3 6.5c0-2 1.5-3.5 3.5-3.5h7C15.5 3 17 4.500 17 6.500S15.500 10 13.500 10h-7C4.500 10 3 11.500 3 13.500S4.500 17 6.500 17h7c2 0 3.500-1.500 3.500-3.500" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M8.200 6.500h3.600M8.200 13.500h3.600" stroke="var(--surface, #fff)" strokeWidth="1.200" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ variant = "site" }: { variant?: "site" | "app" }) {
  if (variant === "app") {
    return (
      <span className="al-logo-app">
        <LogoMark size={17} />
        <span>adloom</span>
      </span>
    );
  }
  return <span className="al-logo-site">Adloom</span>;
}
