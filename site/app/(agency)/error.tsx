"use client";

// Shown if a page fails while rendering.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="relative">
      <section className="container-x pt-28 md:pt-40 pb-20 md:pb-28 min-h-[70svh] flex flex-col justify-center">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground mb-5">Something went wrong</p>
        <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium tracking-[-0.03em] leading-[1.05]">This page could not be shown.</h1>
        <div className="mt-10">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
