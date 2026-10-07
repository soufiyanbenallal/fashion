import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  index: string;
  title: ReactNode;
  action?: { to: string; label: string };
};

/** Numbered section heading: (02) on a hairline, title, optional link. */
export default function SectionHeading({ index, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-10 border-t border-foreground pt-4 md:mb-14">
      <div className="grid gap-4 md:grid-cols-[12rem_1fr_auto] md:items-baseline">
        <p className="meta text-muted-foreground">({index})</p>
        <h2 className="text-headline">{title}</h2>
        {action && (
          <Link to={action.to} className="meta link inline-flex w-fit items-center gap-2">
            {action.label} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
