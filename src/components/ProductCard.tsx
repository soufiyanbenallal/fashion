import { Link } from "react-router-dom";
import { formatNumber, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import Price from "@/components/brand/Price";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const soldOut = product.badge === "sold-out";
  const href = `/product/${product.slug}`;

  const quickAdd = (size: string) => {
    addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image, size });
    toast({ title: "Added to bag", description: `${product.name} — ${size}` });
  };

  return (
    <article className={cn("group", className)}>
      <div className="media-frame aspect-[4/5]">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.05]",
              soldOut && "opacity-60 grayscale"
            )}
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <span className="tag bg-bone/90 text-ink">{formatNumber(product)}</span>
          {product.badge && (
            <span className={cn("tag", soldOut ? "bg-ink text-bone" : "bg-accent text-accent-foreground")}>
              {soldOut ? "Sold out" : "Sale"}
            </span>
          )}
        </div>

        {!soldOut && (
          <div className="absolute inset-x-2.5 bottom-2.5 flex translate-y-[calc(100%+0.75rem)] items-center justify-between gap-2 bg-bone/95 p-1.5 pl-3 text-ink backdrop-blur transition-transform duration-500 ease-editorial group-hover:translate-y-0 group-focus-within:translate-y-0">
            <span className="meta hidden xl:inline">Quick add</span>
            <div className="flex flex-1 justify-end gap-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => quickAdd(size)}
                  aria-label={`Add ${product.name}, size ${size}, to bag`}
                  className="meta h-8 min-w-8 px-2 hover:bg-ink hover:text-bone"
                >
                  {size === "One size" ? "+ Add" : size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link to={href} className="mt-3 block">
        <div className="meta flex items-center justify-between text-muted-foreground">
          <span>{product.category}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full ring-1 ring-foreground/20" style={{ backgroundColor: product.colour.hex }} />
            {product.colour.name}
          </span>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl leading-tight decoration-1 underline-offset-4 group-hover:underline">{product.name}</h3>
          <Price price={product.price} originalPrice={product.originalPrice} className="shrink-0 text-xs" />
        </div>
      </Link>
    </article>
  );
}
