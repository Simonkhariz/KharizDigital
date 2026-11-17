import type { ClientMark } from "../data/content";

export function LogoMark() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true" focusable="false">
      <path d="M0 0h26l8 22H8Z" fill="#1e1e1e" />
      <path d="M11 8h5l1.500 2H24l2 6H13.500Z" fill="#ffffff" />
    </svg>
  );
}

export function ClientLogo({ name, mark, tone }: { name: string; mark: ClientMark; tone: string }) {
  return (
    <li className={`hd-clients-item hd-clients-${mark}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" focusable="false">
        {mark === "envelope" && (
          <>
            <rect x="2" y="6" width="26" height="17" rx="2" fill={tone} />
            <path d="m3 8 12 8 12-8" fill="none" stroke="#ffffff" strokeWidth="2" />
          </>
        )}
        {mark === "disc" && (
          <>
            <circle cx="15" cy="15" r="12" fill={tone} />
            <path d="M15 7v16M7 15h16" stroke="#ffffff" strokeWidth="1.500" opacity="0.8" />
          </>
        )}
        {mark === "bolt" && <path d="M17 2 6 17h7l-2 11 13-16h-8Z" fill={tone} />}
        {mark === "loop" && (
          <path
            d="M19 5c-5-2-10 1-9 5 1 5 10 4 11 9 1 4-4 7-9 5"
            fill="none"
            stroke={tone}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {mark === "ring" && (
          <>
            <circle cx="15" cy="15" r="12" fill={tone} />
            <circle cx="15" cy="15" r="6" fill="none" stroke="#f3e6a8" strokeWidth="3" />
          </>
        )}
      </svg>
      <span>{name}</span>
    </li>
  );
}
