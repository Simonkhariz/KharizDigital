/**
 * The mountain: a cut-out photograph in a navy and cyan duotone, with the glowing flows laid over it
 * as masked gradient layers. Purely decorative.
 */
export function Mountain({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <div className={`ms-mountain${className ? ` ${className}` : ""}`} aria-hidden="true">
      <img
        src="/showcase/magmashield/mountain-ridge.webp"
        alt=""
        width={1920}
        height={998}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
      <span className="ms-mountain__dots" />
      <span className="ms-mountain__flow">
        <span />
      </span>
      <span className="ms-mountain__rim ms-mountain__rim--glow" />
      <span className="ms-mountain__rim" />
      <span className="ms-mountain__fade" />
    </div>
  );
}
