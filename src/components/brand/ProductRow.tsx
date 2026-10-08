import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatNumber, type Product } from "@/data/products";
import Price from "./Price";

/** Dense list item: thumbnail, catalogue line, name, price. */
export default function ProductRow({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-paper">
      <div className="media-frame h-20 w-16 shrink-0">
        <img src={product.image} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-110" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="meta text-muted-foreground">{formatNumber(product)} · {product.category}</p>
        <p className="mt-1 truncate font-serif text-xl leading-tight">{product.name}</p>
        <Price price={product.price} originalPrice={product.originalPrice} className="mt-1 block text-xs" />
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </Link>
  );
}
