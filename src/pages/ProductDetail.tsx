import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { formatNumber, getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/brand/SectionHeading";
import Price from "@/components/brand/Price";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const { toast } = useToast();
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    setSize(product && product.sizes.length === 1 ? product.sizes[0] : null);
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const related = getRelatedProducts(product.slug, 4);
  const isSoldOut = product.badge === "sold-out";
  const isKnit = product.category === "Knitwear";

  const handleAdd = () => {
    if (isSoldOut || !size) return;
    addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image, size });
    toast({ title: "Added to bag", description: `${product.name} — ${size}` });
  };

  const details = [
    ["Composition & care", `${product.material}. ${isKnit ? "Hand wash cold and dry flat. Store folded, never hung." : "Hand wash cold, reshape while damp and dry flat."}`],
    ["Fit", isKnit ? "Relaxed through the body with dropped shoulders. Take your usual size; size down for a closer fit." : "Generously proportioned. Designed to fit most."],
    ["Shipping & returns", "Complimentary shipping over $100. Returns accepted within 30 days, unworn and with tags."],
    ["Made by hand", "Knitted by one of our twelve artisans. Every piece carries its maker's initials on the care label, and our five-year repair promise."],
  ];

  return (
    <>
      <section className="border-b border-foreground">
        <div className="grid lg:grid-cols-[7fr_5fr]">
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-px bg-foreground/10">
            <figure className="media-frame col-span-2 aspect-[4/5]">
              <img src={product.image} alt={product.name} className={cn("h-full w-full object-cover", isSoldOut && "grayscale")} />
              <figcaption className="meta absolute bottom-3 left-3 bg-bone/90 px-1.5 py-0.5 text-ink">fig. 01 — Front</figcaption>
            </figure>
            {[["fig. 02 — Texture", "50% 45%"], ["fig. 03 — Finish", "50% 85%"]].map(([caption, pos]) => (
              <figure key={caption} className="media-frame aspect-square">
                <img src={product.image} alt="" className="h-full w-full scale-[2.2] object-cover" style={{ objectPosition: pos, transformOrigin: pos }} loading="lazy" />
                <figcaption className="meta absolute bottom-3 left-3 bg-bone/90 px-1.5 py-0.5 text-ink">{caption}</figcaption>
              </figure>
            ))}
          </div>

          {/* Buy box */}
          <div className="lg:border-l lg:border-foreground">
            <div className="flex flex-col p-4 py-8 md:p-10 lg:sticky lg:top-header">
              <nav aria-label="Breadcrumb" className="meta flex gap-2 text-muted-foreground">
                <Link to="/shop" className="link hover:text-foreground">Shop</Link>
                <span>/</span>
                <span>{product.category}</span>
                <span>/</span>
                <span className="text-foreground">{formatNumber(product)}</span>
              </nav>

              <h1 className="text-display mt-8">{product.name}</h1>

              <div className="mt-6 flex items-center justify-between border-b border-foreground pb-6">
                <Price price={product.price} originalPrice={product.originalPrice} className="text-base" />
                {product.availability && <span className="meta text-accent">{product.availability}</span>}
                {isSoldOut && <span className="tag bg-ink text-bone">Sold out</span>}
              </div>

              <p className="mt-6 text-[15px] leading-7 text-muted-foreground">{product.description}</p>

              <dl className="meta mt-8 grid grid-cols-[6rem_1fr] gap-y-3">
                <dt className="text-muted-foreground">Colour</dt>
                <dd className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full ring-1 ring-foreground/20" style={{ backgroundColor: product.colour.hex }} />
                  {product.colour.name}
                </dd>
                <dt className="text-muted-foreground">Fibre</dt>
                <dd>{product.material}</dd>
              </dl>

              <fieldset className="mt-8" disabled={isSoldOut}>
                <div className="mb-3 flex justify-between">
                  <legend className="meta text-muted-foreground">Size</legend>
                  {isKnit && <Link to="/contact" className="meta link">Size guide</Link>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map(s => (
                    <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} className="chip">
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button onClick={handleAdd} disabled={isSoldOut || !size} className="btn btn-primary mt-8 w-full">
                <span>{isSoldOut ? "Sold out" : size ? "Add to bag" : "Select a size"}</span>
                <span className="flex items-center gap-3">{formatPrice(product.price)} <ArrowRight /></span>
              </button>

              <div className="mt-10 border-t border-foreground">
                {details.map(([title, body]) => (
                  <details key={title} className="group border-b border-foreground/20">
                    <summary className="meta flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
                      {title}
                      <Plus className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="pb-5 text-sm leading-7 text-muted-foreground">{body}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="shell section-y">
          <SectionHeading index="—" title={<>Wear it <em>with.</em></>} action={{ to: "/shop", label: "All pieces" }} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5 lg:grid-cols-4">
            {related.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}
