import { ATELIER_WEEK, isLive, type Promo } from "@/lib/promos";
import { StitchMark } from "./Logo";
import CopyCode from "./CopyCode";
import Countdown from "./Countdown";

/** Editorial tile that sits inside a product grid, the same footprint as a card image. */
export default function PromoTile({ promo = ATELIER_WEEK }: { promo?: Promo }) {
  if (!isLive(promo)) return null;
  const [lead, rest] = promo.summary.split(/ (?=all )/);

  return (
    <aside className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-accent p-4 text-accent-foreground md:p-6">
      <StitchMark className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-bone/10" />
      <div className="meta relative flex justify-between">
        <span>({promo.title})</span>
        {promo.endsAt && <Countdown endsAt={promo.endsAt} size="sm" className="hidden opacity-80 sm:inline" />}
      </div>
      <div className="relative">
        <p className="text-headline">{lead} <em>{rest}</em></p>
        <p className="mt-3 text-sm text-bone/80">Use the code at checkout.</p>
        <CopyCode code={promo.code} className="mt-5" />
      </div>
    </aside>
  );
}
