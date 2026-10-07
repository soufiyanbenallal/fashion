import { cn } from "@/lib/utils";

/** The stitch mark: two stacked V's — a single knit stitch, seen up close. */
export function StitchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="square" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M5 4.5 12 11l7-6.5" />
      <path d="M5 12 12 18.5 19 12" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif lowercase leading-none tracking-[-0.03em]", className)}>
      emasole<span className="text-accent">.</span>
    </span>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <StitchMark className="h-[0.7em] w-[0.7em] text-accent" />
      <Wordmark />
    </span>
  );
}
