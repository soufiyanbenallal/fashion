import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-warm-bg aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 ${product.badge === "sale" ? "bg-accent text-accent-foreground" : "bg-foreground text-background"}`}>
            {product.badge === "sale" ? "Sale" : "Sold out"}
          </span>
        )}
        <span className="absolute bottom-0 inset-x-0 bg-background/95 text-foreground text-[11px] uppercase tracking-[0.18em] text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          View product
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm text-foreground">{product.name}</h3>
          {product.availability && <p className="text-xs text-accent mt-1">{product.availability}</p>}
        </div>
        <div className="text-sm text-right whitespace-nowrap">
          <span className={product.originalPrice ? "text-accent" : "text-foreground"}>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="block text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
