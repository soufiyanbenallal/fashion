import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { SET_OFFER } from "@/lib/promos";
import { formatPrice } from "@/lib/format";
import Section from "./Section";

const pieces = products.filter(p => p.category === "Accessories" && !p.badge).slice(0, 3);
const together = pieces.reduce((sum, p) => sum + p.price, 0);

/** Loose oat section selling the automatic accessories bundle. */
export default function SetPromo({ index = "—" }: { index?: string }) {
  return (
    <Section tone="oat" index={index} title={<>Build your <em>set.</em></>}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="font-serif text-7xl text-accent md:text-8xl">−{SET_OFFER.percent}%</p>
            <p className="mt-4 text-[15px] leading-7 text-ink/70">
              Choose any {SET_OFFER.minItems} accessories and take {SET_OFFER.percent}% off each. No code needed — it's applied automatically in your bag.
            </p>
          </div>
          <div className="space-y-3">
            <div className="meta flex justify-between border-t border-ink pt-4">
              <span>These {pieces.length} together</span>
              <span>
                <s className="mr-2 opacity-50">{formatPrice(together)}</s>
                {formatPrice(together * (1 - SET_OFFER.percent / 100))}
              </span>
            </div>
            <Link to="/collections/sets-and-pairs" className="btn btn-primary w-full">Shop sets &amp; pairs <ArrowRight /></Link>
          </div>
        </div>
        <div className="grid grid-cols-3 items-start gap-2 md:gap-4">
          {pieces.map((p, i) => (
            <div key={p.slug} className="relative">
              <ProductCard product={p} variant="compact" />
              {i < pieces.length - 1 && (
                <span className="absolute -right-2 top-[37%] z-10 flex h-6 w-6 translate-x-1/2 items-center justify-center rounded-full bg-ink text-bone md:-right-3 md:h-8 md:w-8">
                  <Plus className="h-3 w-3" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
