import type { BottleKind } from "../data/products";
import { Bottle, BottleDefs } from "./Bottles";

type Props = { id: string; alt: string; bottle: BottleKind };

function Backdrop({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2=".6" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx=".85" cy=".05" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
    </>
  );
}

function Single({ id, bottle }: { id: string; bottle: BottleKind }) {
  const tall = bottle === "pump" || bottle === "cap" || bottle === "mist";
  return (
    <>
      <Backdrop id={id} from="#a9cde3" to="#deedf6" />
      <rect width="400" height="400" fill={`url(#${id}-sun)`} opacity=".8" />
      <path d="M-20 210 420 70v60L-20 300Z" fill="#fff" opacity=".25" filter={`url(#${id}-soft)`} />
      <rect y="322" width="400" height="78" fill="#c9e0ee" />
      <ellipse cx="200" cy="330" rx="104" ry="18" fill="#e9f4fa" />
      <rect x="96" y="330" width="208" height="26" fill="#d5e8f3" />
      <ellipse cx="200" cy="356" rx="104" ry="18" fill="#d5e8f3" />
      <ellipse cx="200" cy="330" rx="104" ry="18" fill="#eef7fc" />
      <ellipse cx="214" cy="332" rx="52" ry="7" fill="#6d9cbd" opacity=".35" filter={`url(#${id}-soft)`} />
      <Bottle kind={bottle} id={id} x={200} y={330} scale={tall ? 1.02 : bottle === "jar" ? 1.25 : 1.2} />
    </>
  );
}

export function ProductArt({ id, alt, bottle }: Props) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={alt} preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <BottleDefs id={id} />
      <Single id={id} bottle={bottle} />
    </svg>
  );
}
