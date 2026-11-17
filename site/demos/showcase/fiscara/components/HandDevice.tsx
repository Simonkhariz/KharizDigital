import { MarkPetals } from "./Mark";

const SRC = "/showcase/fiscara/hand.webp";
const W = 2090;
const H = 2940;
const LID = { x: -395, y: -420, width: 790, height: 840, rx: 238 };
/* The lit seam: along the lower edge of the lid, round the corner and up the right-hand side. */
const SEAM = "M-210 419H157A237 237 0 0 0 394 182V-70";
const CUFF = "M468 2562C470 2530 500 2512 540 2512C900 2440 1330 2300 1690 2152C1730 2136 1768 2150 1782 2186";

/**
 * The hero object. A photograph of a raised hand (cut out from its backdrop) with the Fiscara
 * key drawn over the object it was holding, lit from its seam, and a knitted cuff drawn at the wrist.
 * Everything shares one coordinate system, so the layers stay registered at any size.
 */
export function HandDevice() {
  return (
    <svg className="fs-hand" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A raised hand holding the Fiscara key, a small sage-green device with a glowing edge">
      <defs>
        <mask id="fsd-hand" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <image href={SRC} width={W} height={H} />
        </mask>
        <filter id="fsd-b2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="fsd-b6" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="fsd-b14" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="fsd-b30" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="fsd-b60" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <filter id="fsd-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 -0.3" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Lit from the upper right, as the hand is. */}
        <linearGradient id="fsd-lid" x1="0.88" y1="0.02" x2="0.16" y2="0.96">
          <stop offset="0" stopColor="#c0c4b6" />
          <stop offset="0.3" stopColor="#a3a799" />
          <stop offset="0.62" stopColor="#898d7e" />
          <stop offset="1" stopColor="#5d6355" />
        </linearGradient>
        <radialGradient id="fsd-sheen" cx="0.78" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fsd-rim-light" x1="1" y1="0" x2="0.45" y2="0.55">
          <stop offset="0" stopColor="#f1f3e6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f1f3e6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fsd-rim-dark" x1="0.7" y1="0.25" x2="0.1" y2="1">
          <stop offset="0" stopColor="#353a30" stopOpacity="0" />
          <stop offset="1" stopColor="#353a30" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="fsd-shell" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a5f52" />
          <stop offset="0.5" stopColor="#3c4035" />
          <stop offset="1" stopColor="#262921" />
        </linearGradient>
        <linearGradient id="fsd-core" gradientUnits="userSpaceOnUse" x1="-210" y1="440" x2="410" y2="-70">
          <stop offset="0" stopColor="#f3c27a" stopOpacity="0" />
          <stop offset="0.16" stopColor="#f6cf8e" stopOpacity="0.75" />
          <stop offset="0.42" stopColor="#fff8e6" />
          <stop offset="0.82" stopColor="#fff3d6" />
          <stop offset="1" stopColor="#ffca7e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fsd-halo" gradientUnits="userSpaceOnUse" x1="-210" y1="440" x2="410" y2="-70">
          <stop offset="0" stopColor="#ff8f2e" stopOpacity="0" />
          <stop offset="0.25" stopColor="#ff9a3a" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#ffb155" />
          <stop offset="0.85" stopColor="#ff9a3a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ff8f2e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="fsd-cast">
          <stop offset="0" stopColor="#ffb055" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ff8a2a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="fsd-lid-clip">
          <rect {...LID} />
        </clipPath>
        <clipPath id="fsd-body-clip">
          <path d="M-395-182A238 238 0 0 1-157-420H157A238 238 0 0 1 395-182V182L407 228A238 238 0 0 1 169 466H-145A238 238 0 0 1-383 228Z" />
        </clipPath>
        <linearGradient id="fsd-sleeve" gradientUnits="userSpaceOnUse" x1="560" y1="2700" x2="1800" y2="2260">
          <stop offset="0" stopColor="#0c1f1e" />
          <stop offset="0.16" stopColor="#17403b" />
          <stop offset="0.42" stopColor="#1f5049" />
          <stop offset="0.7" stopColor="#163b37" />
          <stop offset="1" stopColor="#0a1a19" />
        </linearGradient>
        <pattern id="fsd-rib" width="15" height="15" patternUnits="userSpaceOnUse" patternTransform="rotate(-21)">
          <rect width="5" height="15" fill="#061312" opacity="0.5" />
          <rect x="8" width="3" height="15" fill="#4f8a80" opacity="0.2" />
        </pattern>
        <path id="fsd-sleeve-shape" d={`${CUFF}L2090 2880V2940H640Z`} />
        <clipPath id="fsd-sleeve-clip">
          <use href="#fsd-sleeve-shape" />
        </clipPath>
      </defs>

      <image href={SRC} width={W} height={H} />

      {/* Shadow of the device on the palm and fingers. */}
      <g mask="url(#fsd-hand)">
        <g transform="translate(905 560) rotate(5)" filter="url(#fsd-b30)" opacity="0.75">
          <rect x="-380" y="-380" width="790" height="880" rx="238" fill="#1c0d05" />
        </g>
      </g>
      {/* Warm light thrown on the skin by the seam. */}
      <g mask="url(#fsd-hand)" className="fs-hand-cast">
        <ellipse cx="1290" cy="800" rx="330" ry="420" fill="url(#fsd-cast)" opacity="0.9" />
        <ellipse cx="1060" cy="1010" rx="380" ry="150" fill="url(#fsd-cast)" opacity="0.38" />
      </g>

      <g transform="translate(890 512) rotate(5)">
        <g className="fs-hand-glow">
          <path d={SEAM} fill="none" stroke="url(#fsd-halo)" strokeWidth="70" strokeLinecap="round" filter="url(#fsd-b30)" opacity="0.75" />
        </g>
        {/* Lower shell, with the port. */}
        <rect x="-383" y="-374" width="790" height="840" rx="238" fill="url(#fsd-shell)" />
        <g clipPath="url(#fsd-body-clip)" className="fs-hand-glow">
          <path d="M60 462H169A238 238 0 0 0 413 214V80" fill="none" stroke="#e58a2f" strokeWidth="30" filter="url(#fsd-b14)" opacity="0.45" />
        </g>
        <rect x="-60" y="431" width="112" height="22" rx="11" fill="#0d0e09" />
        <rect x="-58" y="432.5" width="108" height="19" rx="9.5" fill="none" stroke="#7d8272" strokeOpacity="0.55" strokeWidth="2" />
        <rect x="-391" y="-410" width="790" height="840" rx="238" fill="#2f3329" opacity="0.8" filter="url(#fsd-b6)" clipPath="url(#fsd-body-clip)" />

        {/* Lid. */}
        <rect {...LID} fill="url(#fsd-lid)" />
        <rect {...LID} fill="url(#fsd-sheen)" />
        <g clipPath="url(#fsd-lid-clip)">
          <rect {...LID} fill="none" stroke="url(#fsd-rim-dark)" strokeWidth="90" filter="url(#fsd-b30)" />
          <rect {...LID} fill="none" stroke="url(#fsd-rim-light)" strokeWidth="26" filter="url(#fsd-b14)" />
          <rect {...LID} fill="#6f7565" filter="url(#fsd-grain)" opacity="0.22" />
          <g className="fs-hand-glow">
            <path d={SEAM} fill="none" stroke="url(#fsd-halo)" strokeWidth="110" filter="url(#fsd-b30)" opacity="0.5" />
          </g>
        </g>

        {/* The mark, pressed into the lid. */}
        <g transform="translate(-10 -40) scale(2.6)">
          <g fill="#cfd3c2" opacity="0.55" transform="translate(0.9 1.25)">
            <MarkPetals />
          </g>
          <g fill="#5c6253">
            <MarkPetals />
          </g>
        </g>

        {/* The lit seam: a bright band just inside the edge of the lid. */}
        <g fill="none" strokeLinecap="round" clipPath="url(#fsd-lid-clip)">
          <path d={SEAM} stroke="url(#fsd-halo)" strokeWidth="84" filter="url(#fsd-b14)" opacity="0.8" />
          <path d={SEAM} stroke="url(#fsd-core)" strokeWidth="58" filter="url(#fsd-b6)" />
          <path d={SEAM} stroke="url(#fsd-core)" strokeWidth="38" filter="url(#fsd-b2)" />
          <path d={SEAM} stroke="#fffdf4" strokeOpacity="0.9" strokeWidth="14" strokeDasharray="520 2000" strokeDashoffset="-250" filter="url(#fsd-b2)" />
        </g>
      </g>

      {/* Sleeve. */}
      <g mask="url(#fsd-hand)">
        <use href="#fsd-sleeve-shape" fill="#140803" opacity="0.7" filter="url(#fsd-b30)" transform="translate(-6 -34)" />
      </g>
      <use href="#fsd-sleeve-shape" fill="url(#fsd-sleeve)" />
      <g clipPath="url(#fsd-sleeve-clip)">
        <rect x="400" y="2100" width="1700" height="840" fill="url(#fsd-rib)" />
        <rect x="400" y="2100" width="1700" height="840" fill="#2c6159" filter="url(#fsd-grain)" opacity="0.5" />
        <path d={CUFF} fill="none" stroke="#3f8076" strokeOpacity="0.55" strokeWidth="26" filter="url(#fsd-b14)" transform="translate(4 26)" />
        <path d={CUFF} fill="none" stroke="#041110" strokeOpacity="0.7" strokeWidth="16" filter="url(#fsd-b6)" />
      </g>
    </svg>
  );
}
