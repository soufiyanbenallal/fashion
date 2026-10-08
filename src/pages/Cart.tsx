import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import IndexHeader from "@/components/brand/IndexHeader";
import Section from "@/components/brand/Section";
import ProductRail from "@/components/brand/ProductRail";
import ServiceStrip from "@/components/brand/ServiceStrip";
import { products } from "@/data/products";
import { findPromo, priceCart, SET_OFFER, type Promo } from "@/lib/promos";
import { formatPrice } from "@/lib/format";

const FREE_SHIPPING = 100;

export default function Cart() {
  const { items, totalItems, updateQuantity, removeItem } = useCart();
  const [code, setCode] = useState("");
  const [promo, setPromo] = useState<Promo>();
  const [codeError, setCodeError] = useState("");

  const inBag = new Set(items.map(i => i.slug));
  const suggestions = products.filter(p => !inBag.has(p.slug) && p.badge !== "sold-out");

  if (items.length === 0) {
    return (
      <>
        <IndexHeader label="(Bag) 0 pieces" title={<>Your bag is <em>empty.</em></>} />
        <div className="shell pb-16">
          <Link to="/shop" className="btn btn-primary w-full sm:w-auto">Explore the collection <ArrowRight /></Link>
        </div>
        <Section tone="paper" density="compact" index="—" title={<>Start <em>here.</em></>}>
          <ProductRail products={suggestions} label="Suggested pieces" />
        </Section>
      </>
    );
  }

  const { subtotal, setDiscount, codeDiscount, setOfferOn, total } = priceCart(items, promo);
  const remaining = Math.max(0, FREE_SHIPPING - total);

  const applyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findPromo(code);
    if (found) {
      setPromo(found);
      setCode("");
      setCodeError("");
    } else {
      setCodeError("That code isn't valid or has ended.");
    }
  };

  return (
    <>
      <IndexHeader label={`(Bag) ${totalItems} ${totalItems === 1 ? "piece" : "pieces"}`} title={<>Your <em>bag.</em></>} />

      <section className="shell grid gap-12 pb-24 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          {!setOfferOn && (
            <p className="meta mb-4 bg-oat px-4 py-3">
              {SET_OFFER.title}: add {SET_OFFER.minItems} accessories and take {SET_OFFER.percent}% off each, automatically.
            </p>
          )}
          <ul className="border-t border-foreground">
            {items.map(item => (
              <li key={item.id} className="grid grid-cols-[6rem_1fr] gap-5 border-b border-foreground/20 py-6 md:grid-cols-[8rem_1fr]">
                <Link to={`/product/${item.slug}`} className="media-frame aspect-[4/5]">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.slug}`} className="font-serif text-2xl leading-tight hover:text-accent">{item.name}</Link>
                      <p className="meta mt-2 text-muted-foreground">Size — {item.size}</p>
                    </div>
                    <p className="font-mono text-sm tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <QuantitySelector quantity={item.quantity} onChange={q => updateQuantity(item.id, q)} />
                    <button onClick={() => removeItem(item.id)} className="meta link text-muted-foreground hover:text-accent">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit border border-foreground bg-paper lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <h2 className="meta border-b border-foreground px-6 py-4">Summary</h2>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              {remaining > 0 ? <><span className="font-mono text-foreground">{formatPrice(remaining)}</span> away from complimentary shipping.</> : "Complimentary shipping unlocked."}
            </p>
            <div className="mt-3 h-1 w-full bg-foreground/10">
              <div className="h-1 bg-accent transition-all duration-700 ease-editorial" style={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }} />
            </div>

            {promo ? (
              <div className="mt-8 flex items-center justify-between border border-dashed border-foreground px-3 py-2">
                <span className="meta">{promo.code} — {promo.summary}</span>
                <button onClick={() => setPromo(undefined)} aria-label="Remove code" className="hover:text-accent"><X className="h-3.5 w-3.5" /></button>
              </div>
            ) : (
              <form onSubmit={applyCode} className="mt-8">
                <label htmlFor="promo-code" className="field-label">Promo code</label>
                <div className="flex items-end gap-3">
                  <input id="promo-code" value={code} onChange={e => setCode(e.target.value)} placeholder="ATELIER15" className="field-input uppercase" />
                  <button type="submit" className="meta link shrink-0 pb-3">Apply</button>
                </div>
                {codeError && <p className="meta mt-2 text-accent" role="alert">{codeError}</p>}
              </form>
            )}

            <dl className="meta mt-8 space-y-3">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              {setDiscount > 0 && (
                <div className="flex justify-between text-accent"><dt>{SET_OFFER.title} −{SET_OFFER.percent}%</dt><dd className="tabular-nums">−{formatPrice(setDiscount)}</dd></div>
              )}
              {codeDiscount > 0 && promo && (
                <div className="flex justify-between text-accent"><dt>{promo.code}</dt><dd className="tabular-nums">−{formatPrice(codeDiscount)}</dd></div>
              )}
              {promo && codeDiscount === 0 && (
                <p className="text-muted-foreground">{promo.code} doesn't apply to these pieces.</p>
              )}
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{remaining > 0 ? "At checkout" : "Free"}</dd></div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-foreground pt-5">
              <span className="text-title">Total</span>
              <span className="font-mono text-lg tabular-nums">{formatPrice(total)}</span>
            </div>
            <button className="btn btn-primary mt-6 w-full">Checkout <ArrowRight /></button>
            <p className="meta mt-4 text-center text-muted-foreground">30-day returns · Five-year repairs</p>
          </div>
        </aside>
      </section>

      {suggestions.length > 0 && (
        <Section tone="paper" density="compact" index="—" title={<>Complete <em>the set.</em></>}>
          <ProductRail products={suggestions} label="Complete the set" />
        </Section>
      )}

      <ServiceStrip />
    </>
  );
}
