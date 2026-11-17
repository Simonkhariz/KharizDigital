// A strip fixed to the bottom of the screen that blurs the page behind it,
// from no blur at its top edge to 30px at the bottom. Eight stacked layers,
// each twice as blurry as the one before and masked to its own band, give a
// smooth ramp. The footer sits above it (z-50), so the footer stays sharp.
const LAYERS = 8;
const MAX_BLUR = 30;
const STEP = 100 / LAYERS; // 12.5%

export function ProgressiveBlur() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-36 md:h-40">
      {Array.from({ length: LAYERS }, (_, i) => {
        const blur = `blur(${+(MAX_BLUR / 2 ** (LAYERS - 1 - i)).toFixed(3)}px)`;
        const mask = `linear-gradient(to bottom, rgba(0,0,0,0) ${(i - 1) * STEP}%, rgb(0,0,0) ${i * STEP}%, rgb(0,0,0) ${(i + 1) * STEP}%, rgba(0,0,0,0) ${(i + 2) * STEP}%)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{ zIndex: i + 1, backdropFilter: blur, WebkitBackdropFilter: blur, maskImage: mask, WebkitMaskImage: mask }}
          />
        );
      })}
    </div>
  );
}
