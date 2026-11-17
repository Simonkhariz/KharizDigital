import { Bottle, BottleDefs } from "./Bottles";
import "./HeroScene.css";

const stars: [number, number, number][] = [
  [8, 12, 1.2], [14, 46, 0.9], [19, 24, 1.6], [27, 8, 0.8], [33, 58, 1.1], [38, 30, 0.7], [44, 6, 1],
  [52, 62, 0.8], [58, 14, 1.3], [63, 40, 0.7], [69, 22, 1], [74, 56, 1.5], [79, 10, 0.8], [84, 34, 1.1],
  [89, 60, 0.9], [93, 18, 1.4], [96, 44, 0.8], [4, 66, 1], [23, 70, 0.8], [47, 38, 0.9], [71, 72, 1],
  [86, 76, 1.3], [11, 80, 0.9], [61, 4, 0.9], [36, 16, 0.6], [91, 86, 1],
];

export function HeroScene() {
  return (
    <div className="ae-scene" aria-hidden="true">
      <img
        className="ae-scene__clouds"
        src="/showcase/aerelle/sky-clouds.webp"
        alt=""
        width={1920}
        height={1280}
        fetchPriority="high"
      />
      <div className="ae-scene__tint" />
      <div className="ae-scene__rays" />
      <svg className="ae-scene__stars" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map(([x, y, r]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={r * 0.09} ry={r * 0.16} fill="#fff" opacity={0.35 + r * 0.25} />
        ))}
      </svg>
      <svg className="ae-scene__still" viewBox="0 0 416 307">
        <BottleDefs id="ae-hero" />
        <defs>
          <linearGradient id="ae-plinth-low" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9e9f9" />
            <stop offset="1" stopColor="#9fc3ea" />
          </linearGradient>
          <linearGradient id="ae-plinth-tall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6f9fe" />
            <stop offset="1" stopColor="#cfe0f4" />
          </linearGradient>
          <filter id="ae-shadow" x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <rect x="149" y="236" width="267" height="71" fill="url(#ae-plinth-tall)" />
        <path d="M156 226h254l6 10H149Z" fill="#ffffff" />
        <rect x="0" y="258" width="234" height="49" fill="url(#ae-plinth-low)" />
        <path d="M7 249h221l6 9H0Z" fill="#edf4fd" />
        <g filter="url(#ae-shadow)" fill="#6f93bd" opacity=".45">
          <ellipse cx="196" cy="232" rx="36" ry="3" />
          <ellipse cx="288" cy="232" rx="38" ry="3" />
          <ellipse cx="120" cy="254" rx="26" ry="2.500" />
        </g>
        <Bottle kind="pump" id="ae-hero" x={187} y={231} />
        <Bottle kind="cap" id="ae-hero" x={279} y={231} />
        <Bottle kind="serum" id="ae-hero" x={113} y={253} />
      </svg>
    </div>
  );
}
