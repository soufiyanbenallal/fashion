import { Link } from "react-router-dom";
import { Gift, Scissors, RotateCcw, Truck, type LucideIcon } from "lucide-react";

const services: [LucideIcon, string, string, string][] = [
  [Scissors, "Five-year repairs", "Snags, holes, worn cuffs — send it back and we'll mend it.", "/contact"],
  [Gift, "Wrapped by hand", "Tissue, kraft box and a handwritten note on request.", "/collections/sets-and-pairs"],
  [Truck, "Free over $100", "Carbon-neutral shipping, tracked from our door to yours.", "/contact"],
  [RotateCcw, "30-day returns", "Unworn with tags? Return it, no questions asked.", "/contact"],
];

/** Compact four-up row of brand services. Hairline-divided, no boxes. */
export default function ServiceStrip() {
  return (
    <section className="border-y border-foreground">
      <ul className="shell grid grid-cols-2 lg:grid-cols-4">
        {services.map(([Icon, title, text, to], i) => (
          <li key={title} className={i > 0 ? "border-foreground/15 lg:border-l" : ""}>
            <Link to={to} className="group block h-full py-7 pr-4 transition-colors lg:px-6 lg:first:pl-0">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.25} />
              <p className="mt-5 font-serif text-2xl leading-tight group-hover:text-accent">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
