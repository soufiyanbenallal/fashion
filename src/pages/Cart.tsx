import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import IndexHeader from "@/components/brand/IndexHeader";
import { formatPrice } from "@/lib/format";

const FREE_SHIPPING = 100;

export default function Cart() {
  const { items, totalItems, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <IndexHeader label="(Bag) 0 pieces" title={<>Your bag is <em>empty.</em></>} />
        <div className="shell pb-32">
          <Link to="/shop" className="btn btn-primary w-full sm:w-auto">Explore the collection <ArrowRight /></Link>
        </div>
      </>
    );
  }

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <>
      <IndexHeader label={`(Bag) ${totalItems} ${totalItems === 1 ? "piece" : "pieces"}`} title={<>Your <em>bag.</em></>} />

      <section className="shell grid gap-12 pb-28 lg:grid-cols-[1fr_400px] lg:gap-16">
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

        <aside className="h-fit border border-foreground bg-paper lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <h2 className="meta border-b border-foreground px-6 py-4">Summary</h2>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">
              {remaining > 0 ? <><span className="font-mono text-foreground">{formatPrice(remaining)}</span> away from complimentary shipping.</> : "Complimentary shipping unlocked."}
            </p>
            <div className="mt-3 h-1 w-full bg-foreground/10">
              <div className="h-1 bg-accent transition-all duration-700 ease-editorial" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
            </div>
            <dl className="meta mt-8 space-y-3">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{remaining > 0 ? "At checkout" : "Free"}</dd></div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-foreground pt-5">
              <span className="text-title">Total</span>
              <span className="font-mono text-lg tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <button className="btn btn-primary mt-6 w-full">Checkout <ArrowRight /></button>
            <p className="meta mt-4 text-center text-muted-foreground">30-day returns · Five-year repairs</p>
          </div>
        </aside>
      </section>
    </>
  );
}
