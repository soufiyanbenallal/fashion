import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { formatNumber, getProductBySlug, type Product } from "@/data/products";
import ProductRow from "./ProductRow";
import Price from "./Price";
import { cn } from "@/lib/utils";

export type Hotspot = { slug: string; x: number; y: number };

type LookHeroProps = {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  label: string;
  caption?: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  look: Product[];
  lookLabel?: string;
  hotspots?: Hotspot[];
};

/**
 * Campaign hero with commerce built in: shoppable hotspots on the image
 * and a compact "shop the look" panel beside it.
 */
export default function LookHero({ image, imageAlt, imagePosition = "center", label, caption, title, intro, actions, look, lookLabel = "Shop the look", hotspots = [] }: LookHeroProps) {
  return (
    <section className="grid border-b border-foreground lg:h-[calc(100svh-var(--header-h))] lg:min-h-[640px] lg:grid-cols-[1fr_24rem] xl:grid-cols-[1fr_27rem]">
      <div className="relative min-h-[76svh] overflow-hidden bg-ink text-bone lg:min-h-0">
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full animate-hero-zoom object-cover" style={{ objectPosition: imagePosition }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-ink/40" />

        <div className="relative flex h-full flex-col justify-between p-4 md:p-8">
          <div className="meta flex justify-between text-bone/80">
            <span>{label}</span>
            {caption && <span className="hidden md:block">{caption}</span>}
          </div>
          <h1 className="text-mega max-w-[10ch] animate-fade-up [animation-delay:200ms]">{title}</h1>
        </div>

        {hotspots.map(h => <HotspotPin key={h.slug} {...h} />)}
      </div>

      <aside className="flex flex-col bg-background lg:border-l lg:border-foreground">
        <div className="meta flex justify-between border-b border-foreground px-5 py-4">
          <span>({lookLabel})</span>
          <span className="text-muted-foreground">{look.length} pieces</span>
        </div>
        <ol className="divide-y divide-foreground/15 border-b border-foreground/15">
          {look.map((p, i) => (
            <li key={p.slug} className="animate-fade-up" style={{ animationDelay: `${300 + i * 90}ms` }}>
              <ProductRow product={p} />
            </li>
          ))}
        </ol>
        {(intro || actions) && (
          <div className="mt-auto space-y-3 p-5">
            {intro && <div className="mb-5 text-sm leading-6 text-muted-foreground">{intro}</div>}
            {actions}
          </div>
        )}
      </aside>
    </section>
  );
}

function HotspotPin({ slug, x, y }: Hotspot) {
  const product = getProductBySlug(slug);
  if (!product) return null;
  const flip = x > 60;

  return (
    <div className="group/pin absolute z-10" style={{ left: `${x}%`, top: `${y}%` }}>
      <Link
        to={`/product/${slug}`}
        aria-label={`${product.name} — view piece`}
        className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-bone/40 [animation-duration:2.4s]" />
        <span className="relative h-3 w-3 rounded-full bg-bone ring-4 ring-bone/30 transition-colors group-hover/pin:bg-madder-light" />
      </Link>
      <div
        className={cn(
          "pointer-events-none absolute top-0 w-52 -translate-y-1/2 bg-bone p-3 text-ink opacity-0 shadow-2xl transition-all duration-300 ease-editorial group-focus-within/pin:opacity-100 group-hover/pin:opacity-100",
          flip ? "right-6 translate-x-2 group-hover/pin:translate-x-0" : "left-6 -translate-x-2 group-hover/pin:translate-x-0"
        )}
      >
        <p className="meta text-muted-foreground">{formatNumber(product)}</p>
        <p className="mt-1 font-serif text-xl leading-tight">{product.name}</p>
        <Price price={product.price} originalPrice={product.originalPrice} className="mt-1 block text-xs" />
      </div>
    </div>
  );
}
