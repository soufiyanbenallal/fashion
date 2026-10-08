import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

/** Horizontally scrolling row of compact cards. Bleeds to the shell edges. */
export default function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:-mx-8 md:gap-4 md:px-8">
        {products.map(p => (
          <div key={p.slug} className="w-[44vw] shrink-0 snap-start sm:w-[30vw] lg:w-[16.5rem]">
            <ProductCard product={p} variant="compact" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="meta opacity-60">{products.length} pieces</span>
        <div className="flex gap-1">
          {([-1, 1] as const).map(dir => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir < 0 ? "Scroll back" : "Scroll forward"}
              className="flex h-10 w-10 items-center justify-center border border-current transition-colors hover:bg-foreground hover:text-background"
            >
              {dir < 0 ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
