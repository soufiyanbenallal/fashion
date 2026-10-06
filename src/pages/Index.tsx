import { Link } from "react-router-dom";
import { Truck, RotateCcw, Leaf, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import coreCollection from "@/assets/collections/core-collection.jpg";
import setsAndPairs from "@/assets/collections/sets-and-pairs.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import NewsletterSignup from "@/components/NewsletterSignup";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const bestSellers = products.filter(p => p.badge !== "sold-out").slice(0, 4);

export default function Index() {
  return (
    <>
      {/* Hero — asymmetric split */}
      <section className="grid lg:grid-cols-[5fr_7fr] lg:h-[min(80vh,760px)]">
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 bg-warm-bg order-2 lg:order-1">
          <p className="text-[11px] uppercase tracking-[0.25em] text-accent mb-6">Autumn / Winter 2026</p>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-light text-foreground leading-[1.02] tracking-tight">
            Knitted slowly.<br />Worn for years.
          </h1>
          <p className="text-base text-muted-foreground mt-6 max-w-md leading-relaxed">
            The new collection — heritage wool, cashmere and alpaca, shaped into pieces you'll reach for every season.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link to="/shop" className="bg-primary text-primary-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-accent transition-colors">
              Shop the collection
            </Link>
            <Link to="/about" className="border border-foreground text-foreground px-8 py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
              Our story
            </Link>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 min-h-[50vh]">
          <img src={heroBg} alt="Model wearing an emasole chunky knit sweater" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* Service strip */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            [Truck, "Free shipping", "On all orders over $100"],
            [RotateCcw, "30-day returns", "Easy, no-questions returns"],
            [Leaf, "Natural fibres", "Ethically sourced wool"],
          ].map(([Icon, title, text]: any) => (
            <div key={title} className="flex items-center gap-4 py-6 sm:justify-center">
              <Icon className="w-5 h-5 text-sage" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent mb-3">Best sellers</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">Most loved this season</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {bestSellers.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Collections — asymmetric 7/5 */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-5">
          <CollectionTile to="/collections/core" img={coreCollection} eyebrow="Essentials" title="The Core Collection" tall />
          <div className="grid gap-5">
            <CollectionTile to="/collections/sets-and-pairs" img={setsAndPairs} eyebrow="Gift-ready" title="Sets & Pairs" />
            <Link to="/shop" className="bg-sage-soft p-10 flex flex-col justify-between min-h-[220px] group">
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary">Limited</p>
              <div>
                <h3 className="text-2xl font-light text-foreground">Up to 20% off selected knits</h3>
                <span className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors">
                  Shop the sale <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story — asymmetric */}
      <section className="bg-warm-bg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[5fr_7fr] items-center">
          <img src={aboutBg} alt="emasole atelier" className="w-full h-full min-h-[420px] object-cover" loading="lazy" />
          <div className="px-6 md:px-16 py-20">
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent mb-5">The emasole way</p>
            <h2 className="text-3xl md:text-5xl font-light text-foreground leading-tight max-w-xl">
              Fewer, better pieces — made by hand, in small batches.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-lg leading-relaxed">
              Every garment begins with responsibly sourced fibre and ends in the hands of a skilled knitter. No seasons of waste, just clothes made to last.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
              {[["100%", "Natural fibres"], ["12", "Artisan knitters"], ["5 yr", "Repair promise"]].map(([n, l]) => (
                <div key={l} className="border-t border-foreground/20 pt-4">
                  <p className="text-2xl font-light text-primary">{n}</p>
                  <p className="text-xs text-muted-foreground mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  );
}

function CollectionTile({ to, img, eyebrow, title, tall }: { to: string; img: string; eyebrow: string; title: string; tall?: boolean }) {
  return (
    <Link to={to} className={`relative overflow-hidden group block ${tall ? "min-h-[520px] md:min-h-[640px]" : "min-h-[400px]"}`}>
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 text-background">
        <p className="text-[11px] uppercase tracking-[0.25em] opacity-80 mb-2">{eyebrow}</p>
        <h3 className="text-3xl font-light">{title}</h3>
        <span className="inline-flex items-center gap-2 mt-4 text-[11px] uppercase tracking-[0.2em] border-b border-background/70 pb-1">
          Discover <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
