import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import IndexHeader from "@/components/brand/IndexHeader";
import { products, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All", test: () => true },
  { id: "knitwear", label: "Knitwear", test: (p: Product) => p.category === "Knitwear" },
  { id: "accessories", label: "Accessories", test: (p: Product) => p.category === "Accessories" },
  { id: "sale", label: "Sale", test: (p: Product) => p.badge === "sale" },
] as const;

const sorts = {
  featured: { label: "Featured", fn: (a: Product, b: Product) => a.number - b.number },
  "price-asc": { label: "Price, low → high", fn: (a: Product, b: Product) => a.price - b.price },
  "price-desc": { label: "Price, high → low", fn: (a: Product, b: Product) => b.price - a.price },
};

type FilterId = (typeof filters)[number]["id"];
type SortId = keyof typeof sorts;

export default function Shop() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [dense, setDense] = useState(false);

  const visible = useMemo(() => {
    const f = filters.find(x => x.id === filter)!;
    return products.filter(f.test).sort(sorts[sort].fn);
  }, [filter, sort]);

  return (
    <>
      <IndexHeader
        label="(Shop) All pieces"
        aside="AW26"
        title={<>The <em>wardrobe.</em></>}
        intro="Every piece we make, in one place — hand-knitted in small batches from natural, traceable fibres."
      />

      <div className="sticky top-header z-30 border-y border-foreground bg-background/95 backdrop-blur-md">
        <div className="shell flex h-12 items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-5" role="group" aria-label="Filter by category">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn("meta link whitespace-nowrap", filter === f.id ? "text-foreground [background-size:100%_1px]" : "text-muted-foreground hover:text-foreground")}
              >
                {f.label}
                <sup className="ml-0.5 text-[9px]">{products.filter(f.test).length}</sup>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <label className="meta flex items-center gap-2 text-muted-foreground">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortId)}
                className="meta cursor-pointer bg-transparent text-foreground focus:outline-none"
              >
                {Object.entries(sorts).map(([id, s]) => <option key={id} value={id}>{s.label}</option>)}
              </select>
            </label>
            <div className="meta hidden items-center gap-2 lg:flex" role="group" aria-label="Grid density">
              <span className="text-muted-foreground">View</span>
              {[false, true].map(d => (
                <button key={String(d)} onClick={() => setDense(d)} aria-pressed={dense === d} className={dense === d ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
                  {d ? "4" : "3"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="shell pb-28 pt-8 md:pt-10">
        {visible.length === 0 ? (
          <p className="text-statement py-20 text-muted-foreground">Nothing here <em>this season.</em></p>
        ) : (
          <div className={cn("grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5", dense ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
            {visible.map(product => <ProductCard key={product.slug} product={product} />)}
          </div>
        )}
      </section>
    </>
  );
}
