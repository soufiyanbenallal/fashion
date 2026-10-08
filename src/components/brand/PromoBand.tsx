import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ATELIER_WEEK, isLive, type Promo } from "@/lib/promos";
import CopyCode from "./CopyCode";
import Countdown from "./Countdown";

/** Compact full-width promotion: offer, live countdown, copyable code. */
export default function PromoBand({ promo = ATELIER_WEEK, to = "/shop" }: { promo?: Promo; to?: string }) {
  if (!isLive(promo)) return null;

  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="stitch-dark absolute inset-0" />
      <div className="shell relative grid items-center gap-6 py-6 md:py-7 lg:grid-cols-[auto_1fr_auto_auto] lg:gap-12">
        <p className="meta text-madder-light">({promo.title})</p>
        <Link to={to} className="group flex items-baseline gap-3 font-serif text-3xl leading-tight md:text-4xl">
          <span>{promo.summary} <em className="text-madder-light">— this week.</em></span>
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
        {promo.endsAt && <Countdown endsAt={promo.endsAt} />}
        <CopyCode code={promo.code} />
      </div>
    </section>
  );
}
