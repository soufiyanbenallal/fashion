import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

export type Tone = "bone" | "paper" | "oat" | "ink" | "madder";
export type Density = "loose" | "compact";

const tones: Record<Tone, string> = {
  bone: "bg-background text-foreground",
  paper: "bg-paper text-ink",
  oat: "bg-oat text-ink",
  ink: "bg-ink text-bone",
  madder: "bg-accent text-accent-foreground",
};

const padding: Record<Density, { full: string; flush: string }> = {
  loose: { full: "section-y", flush: "pb-20 md:pb-32" },
  compact: { full: "section-y-compact", flush: "pb-10 md:pb-14" },
};

const textures: Partial<Record<Tone, string>> = { oat: "stitch-light", ink: "stitch-dark" };

type SectionProps = {
  index?: string;
  title?: ReactNode;
  action?: { to: string; label: string };
  tone?: Tone;
  /** loose = editorial breathing room, compact = dense commerce rows */
  density?: Density;
  /** Content runs edge to edge; the heading stays on the grid */
  bleed?: boolean;
  bordered?: boolean;
  /** Drop top padding when continuing the previous section on the same tone */
  flushTop?: boolean;
  className?: string;
  children: ReactNode;
};

/** The one wrapper every page section is built from: tone × density × heading. */
export default function Section({ index, title, action, tone = "bone", density = "loose", bleed, bordered, flushTop, className, children }: SectionProps) {
  const texture = textures[tone];
  const heading = title && <SectionHeading index={index ?? "—"} title={title} action={action} compact={density === "compact"} />;

  return (
    <section className={cn("relative overflow-hidden", tones[tone], bordered && "border-y border-foreground", className)}>
      {texture && <div className={cn(texture, "absolute inset-0")} />}
      <div className={cn("relative", padding[density][flushTop ? "flush" : "full"])}>
        {bleed ? (
          <>
            {heading && <div className="shell">{heading}</div>}
            {children}
          </>
        ) : (
          <div className="shell">
            {heading}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
