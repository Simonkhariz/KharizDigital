const PETAL = "M12 11.1C11.3 8.3 9.1 6.4 9.1 4a2.9 2.9 0 0 1 5.8 0c0 2.4-2.2 4.3-2.9 7.1Z";
const ANGLES = [0, 72, 144, 216, 288];

/** Fiscara mark: five teardrop petals, one for each working day of the close. */
export function Mark({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {ANGLES.map((angle) => (
        <path key={angle} d={PETAL} transform={`rotate(${angle} 12 12)`} />
      ))}
    </svg>
  );
}

/** The same petals for use inside a larger SVG, centred on 0,0 and 48 units across. */
export function MarkPetals() {
  return (
    <>
      {ANGLES.map((angle) => (
        <path key={angle} d={PETAL} transform={`rotate(${angle}) scale(2) translate(-12 -12)`} />
      ))}
    </>
  );
}

/** Mono section label with the mark, written as /Label/. */
export function Label({ children, mark = true }: { children: string; mark?: boolean }) {
  return (
    <p className="fs-label">
      {mark && <Mark size={12} />}/{children}/
    </p>
  );
}

/** Small chip label, as used above the About statement. */
export function Tag({ children }: { children: string }) {
  return (
    <p className="fs-tag">
      <Mark size={14} />
      {children}
    </p>
  );
}
