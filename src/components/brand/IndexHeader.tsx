import type { ReactNode } from "react";

type IndexHeaderProps = {
  label: string;
  aside?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
};

/** Typographic page opener used across catalogue pages: meta row, mega title, intro. */
export default function IndexHeader({ label, aside, title, intro }: IndexHeaderProps) {
  return (
    <section className="shell pb-8 pt-10 md:pb-10 md:pt-14">
      <div className="meta mb-6 flex justify-between text-muted-foreground md:mb-10">
        <span>{label}</span>
        {aside && <span>{aside}</span>}
      </div>
      <h1 className="text-mega animate-fade-up">{title}</h1>
      {intro && (
        <div className="mt-8 grid animate-fade-up [animation-delay:120ms] md:mt-10 md:grid-cols-[1fr_minmax(0,26rem)]">
          <span />
          <div className="text-lead">{intro}</div>
        </div>
      )}
    </section>
  );
}
