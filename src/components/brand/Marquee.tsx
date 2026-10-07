import { StitchMark } from "./Logo";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  size?: "sm" | "lg";
  className?: string;
};

/** Brand ribbon. Content is duplicated so the loop is seamless. */
export default function Marquee({ items, size = "lg", className }: MarqueeProps) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={cn("overflow-hidden", size === "lg" ? "border-y border-foreground py-6" : "py-2.5", className)} aria-hidden="true">
      <div className={cn("flex w-max animate-marquee whitespace-nowrap", size === "lg" ? "gap-10" : "gap-8")}>
        {row.map((item, i) => (
          <span key={i} className={cn("flex items-center", size === "lg" ? "gap-10 font-serif text-4xl italic md:text-6xl" : "meta gap-8")}>
            {item}
            <StitchMark className={cn("text-accent", size === "lg" ? "h-6 w-6" : "h-3 w-3")} />
          </span>
        ))}
      </div>
    </div>
  );
}
