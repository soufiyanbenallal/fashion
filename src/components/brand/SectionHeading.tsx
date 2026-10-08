import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  title: ReactNode;
  action?: { to: string; label: string };
  compact?: boolean;
};

/** Numbered section heading on a hairline. Inherits colour, so it works on any tone. */
export default function SectionHeading({ index, title, action, compact }: SectionHeadingProps) {
  return (
    <div className={cn("border-t border-current pt-4", compact ? "mb-6 md:mb-8" : "mb-10 md:mb-14")}>
      <div className="grid gap-4 md:grid-cols-[12rem_1fr_auto] md:items-baseline">
        <p className="meta opacity-60">({index})</p>
        <h2 className={compact ? "text-title" : "text-headline"}>{title}</h2>
        {action && (
          <Link to={action.to} className="meta link inline-flex w-fit items-center gap-2">
            {action.label} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
