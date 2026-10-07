import type { ReactNode } from "react";

type HeroHeaderProps = {
  image: string;
  imageAlt: string;
  label: string;
  caption?: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  imagePosition?: string;
};

/** Full-bleed campaign opener: image, meta row on top, mega title at the foot. */
export default function HeroHeader({ image, imageAlt, label, caption, title, intro, actions, imagePosition = "center" }: HeroHeaderProps) {
  return (
    <section className="relative h-[calc(100svh-var(--header-h))] min-h-[560px] overflow-hidden bg-ink text-bone">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full animate-hero-zoom object-cover" style={{ objectPosition: imagePosition }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30" />
      <div className="shell relative flex h-full flex-col justify-between py-6 md:py-8">
        <div className="meta flex justify-between text-bone/80">
          <span>{label}</span>
          {caption && <span className="hidden md:block">{caption}</span>}
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
          <h1 className="text-mega animate-fade-up [animation-delay:200ms]">{title}</h1>
          {(intro || actions) && (
            <div className="flex animate-fade-up flex-col gap-3 [animation-delay:350ms]">
              {intro && <div className="mb-3 text-sm leading-6 text-bone/80">{intro}</div>}
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
