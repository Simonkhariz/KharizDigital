import { FlaskConical, ReceiptText, ShoppingBag, Waves, Wind } from "lucide-react";

export function Logo() {
  return (
    <span className="aw-logo">
      <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true" focusable="false">
        <path d="M11 1 21 6.5v11L11 23 1 17.5v-11z" fill="currentColor" />
        <path d="M11 12 2.5 7.3M11 12l8.5-4.7M11 12v9.5" stroke="#fff" strokeWidth="1.6" fill="none" />
      </svg>
      agentway
    </span>
  );
}

const icons = { ledger: ReceiptText, wind: Wind, waves: Waves, flask: FlaskConical, bag: ShoppingBag } as const;

export function LogoIcon({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return <Icon size={17} strokeWidth={1.6} aria-hidden="true" />;
}
