import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import coreCollection from "@/assets/collections/core-collection.jpg";
import setsAndPairs from "@/assets/collections/sets-and-pairs.jpg";
import aboutBg from "@/assets/about-bg.jpg";
import chunky from "@/assets/products/harvest-moon-cup.jpg";
import NewsletterSignup from "@/components/NewsletterSignup";
import ProductCard from "@/components/ProductCard";
import LookHero from "@/components/brand/LookHero";
import Section from "@/components/brand/Section";
import PromoBand from "@/components/brand/PromoBand";
import ProductRail from "@/components/brand/ProductRail";
import SetPromo from "@/components/brand/SetPromo";
import ServiceStrip from "@/components/brand/ServiceStrip";
import Marquee from "@/components/brand/Marquee";
import { getProductBySlug, products, type Product } from "@/data/products";

const bySlug = (slugs: string[]) => slugs.map(s => getProductBySlug(s)).filter((p): p is Product => !!p);

const look = bySlug(["harvest-moon-cup", "milk-dip-cup", "golden-mist-pair"]);
const newIn = products.filter(p => p.category === "Knitwear" && p.badge !== "sold-out").slice(0, 4);
const accessories = products.filter(p => p.category === "Accessories");

const chapters = [
  { to: "/collections/core", img: coreCollection, chapter: "Chapter 01", title: "The Core", italic: "Collection", note: "Everyday knitwear for quiet ritual" },
  { to: "/collections/sets-and-pairs", img: setsAndPairs, chapter: "Chapter 02", title: "Sets &", italic: "Pairs", note: "Matched yarns, made to be given" },
];

const stats = [["100%", "Natural fibres"], ["12", "Artisan knitters"], ["5 yr", "Repair promise"]];

/** Small rounded photo set inline with display type */
function InlineImage({ src }: { src: string }) {
  return (
    <span className="mx-[0.12em] inline-block h-[0.78em] w-[1.5em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline">
      <img src={src} alt="" className="h-full w-full object-cover" />
    </span>
  );
}

export default function Index() {
  return (
    <>
      <LookHero
        image={heroBg}
        imageAlt="Model in an emasole chunky rib turtleneck on a misty moor"
        imagePosition="30% center"
        label="AW26 — Chapter 01"
        caption="fig. 01 — The moor, first light"
        title={<>The quiet <em>season.</em></>}
        look={look}
        hotspots={[{ slug: "harvest-moon-cup", x: 40, y: 40 }]}
        intro="Heritage wool, cashmere and alpaca — hand-knitted in small batches, made to be worn for years."
        actions={
          <>
            <Link to="/shop" className="btn btn-primary w-full">Shop the collection <ArrowRight /></Link>
            <Link to="/about" className="btn btn-outline w-full">Inside the atelier <ArrowRight /></Link>
          </>
        }
      />

      <PromoBand />

      {/* Loose: manifesto */}
      <Section>
        <div className="grid gap-6 md:grid-cols-[12rem_1fr]">
          <p className="meta text-muted-foreground">(01) Manifesto</p>
          <p className="text-statement max-w-[22ch] md:max-w-none">
            Knitted slowly <InlineImage src={aboutBg} /> by twelve pairs of hands, from fibre you can trace
            <InlineImage src={chunky} /> — and made to be worn, mended, and <em className="text-accent">worn again.</em>
          </p>
        </div>
      </Section>

      {/* Loose: new in */}
      <Section index="02" title={<>New <em>knitwear.</em></>} action={{ to: "/shop", label: `All pieces (${products.length})` }} flushTop>
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5 lg:grid-cols-4">
          {newIn.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </Section>

      {/* Full bleed: chapters */}
      <section className="grid border-y border-foreground md:grid-cols-2">
        {chapters.map((c, i) => (
          <Link key={c.to} to={c.to} className={`group relative block aspect-[4/5] overflow-hidden bg-ink text-bone md:aspect-auto md:h-[80vh] ${i === 0 ? "md:border-r md:border-foreground" : ""}`}>
            <img src={c.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-1000 ease-editorial group-hover:scale-105 group-hover:opacity-100" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/50" />
            <div className="relative flex h-full flex-col justify-between p-5 md:p-8">
              <div className="meta flex justify-between text-bone/80">
                <span>{c.chapter}</span>
                <span className="hidden sm:inline">{c.note}</span>
              </div>
              <div>
                <h3 className="text-display">{c.title} <em>{c.italic}</em></h3>
                <span className="meta mt-6 inline-flex items-center gap-2 border-b border-bone/60 pb-1 transition-colors group-hover:border-madder-light group-hover:text-madder-light">
                  Discover the chapter <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Compact: accessories rail */}
      <Section tone="paper" density="compact" index="03" title={<>Small things, <em>well made.</em></>} action={{ to: "/shop", label: "All accessories" }}>
        <ProductRail products={accessories} label="Accessories" />
      </Section>

      <SetPromo index="04" />

      <Marquee items={["Merino", "Alpaca", "Cashmere", "Shetland", "Lambswool", "Heritage breed"]} className="border-t-0" />

      {/* Loose: atelier story */}
      <Section tone="ink">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:items-end md:gap-20">
          <figure>
            <div className="media-frame aspect-[4/5] bg-bone/5">
              <img src={aboutBg} alt="Hands knitting undyed wool on wooden needles" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <figcaption className="meta mt-3 text-bone/50">fig. 02 — On the needles</figcaption>
          </figure>
          <div>
            <p className="meta mb-8 text-madder-light">(05) The atelier</p>
            <h2 className="text-display">Fewer, better <em>pieces.</em></h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-bone/70">
              Every garment begins with responsibly sourced fibre and ends in the hands of a skilled knitter. No seasons of waste — just clothes made to last, and mended when they don't.
            </p>
            <dl className="mt-14 grid grid-cols-3 gap-4 md:gap-8">
              {stats.map(([n, l]) => (
                <div key={l} className="flex flex-col-reverse border-t border-bone/25 pt-4">
                  <dt className="meta mt-2 text-bone/50">{l}</dt>
                  <dd className="font-serif text-5xl md:text-7xl">{n}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="btn btn-light mt-14 w-full sm:w-auto">Read our story <ArrowRight /></Link>
          </div>
        </div>
      </Section>

      {/* Compact: services */}
      <ServiceStrip />

      <NewsletterSignup />
    </>
  );
}
