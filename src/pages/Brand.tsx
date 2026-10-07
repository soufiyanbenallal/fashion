import { ArrowRight } from "lucide-react";
import IndexHeader from "@/components/brand/IndexHeader";
import SectionHeading from "@/components/brand/SectionHeading";
import Logo, { StitchMark, Wordmark } from "@/components/brand/Logo";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const colours = [
  { name: "Bone", token: "bone", role: "Canvas — page background", className: "bg-bone text-ink" },
  { name: "Paper", token: "paper", role: "Raised surfaces, summaries", className: "bg-paper text-ink" },
  { name: "Oat", token: "oat", role: "Secondary surfaces", className: "bg-oat text-ink" },
  { name: "Ink", token: "ink", role: "Type, rules, primary actions", className: "bg-ink text-bone" },
  { name: "Madder", token: "madder", role: "Signature accent — use sparingly", className: "bg-madder text-bone" },
  { name: "Moor", token: "moor", role: "Imagery support, rarely UI", className: "bg-moor text-bone" },
];

const type = [
  { name: "Mega", cls: "text-mega", spec: "Instrument Serif · clamp 64–224px", sample: <>Quiet <em>season.</em></> },
  { name: "Display", cls: "text-display", spec: "Instrument Serif · clamp 48–120px", sample: <>Fewer, better <em>pieces.</em></> },
  { name: "Headline", cls: "text-headline", spec: "Instrument Serif · clamp 36–64px", sample: <>New <em>in.</em></> },
  { name: "Title", cls: "text-title", spec: "Instrument Serif · clamp 24–36px", sample: "Cable Knit Sweater" },
  { name: "Body", cls: "text-[15px] leading-7", spec: "Inter Tight · 15/28", sample: "Hand-knitted from natural fibres, made to be worn for years." },
  { name: "Meta", cls: "meta", spec: "IBM Plex Mono · 11/16 · uppercase", sample: "N° 06 — Knitwear — AW26" },
];

const rules = [
  ["Italic carries the voice", "Set the last word of a display line in italic. One emphasis per headline."],
  ["Madder is a signal", "Accent for state, emphasis and the newsletter block only — never decoration."],
  ["Mono is metadata", "Catalogue numbers, labels, prices and navigation. Never paragraphs."],
  ["Hairlines, not boxes", "Separate with 1px ink rules. Square corners everywhere."],
  ["Number everything", "Sections are (01), pieces are N° 01, images are fig. 01."],
];

export default function Brand() {
  return (
    <>
      <IndexHeader
        label="(System) emasole brand"
        aside="v1.0"
        title={<>Brand <em>system.</em></>}
        intro="The tokens, type and components behind the emasole store. Everything on the site is built from what's on this page."
      />

      <section className="shell pb-24">
        <SectionHeading index="01" title={<>The <em>mark.</em></>} />
        <div className="grid gap-px bg-foreground/15 md:grid-cols-3">
          {[["bg-bone text-ink", "On bone"], ["bg-ink text-bone", "On ink"], ["bg-madder text-bone [&_svg]:text-bone [&_span_span]:text-bone", "On madder"]].map(([cls, label]) => (
            <div key={label} className={`flex aspect-[4/3] flex-col justify-between p-5 ${cls}`}>
              <span className="meta opacity-60">{label}</span>
              <span className="self-center text-6xl"><Logo /></span>
              <span />
            </div>
          ))}
        </div>
        <div className="mt-px grid gap-px bg-foreground/15 md:grid-cols-[1fr_2fr]">
          <div className="flex items-center gap-6 bg-background p-5">
            <StitchMark className="h-16 w-16 text-accent" />
            <p className="text-sm leading-6 text-muted-foreground">The stitch mark — a single knit stitch, seen up close. Used as a logomark, bullet and separator.</p>
          </div>
          <div className="stitch-light flex min-h-[8rem] items-end bg-background p-5">
            <p className="meta text-muted-foreground">Stitch pattern — .stitch-light / .stitch-dark</p>
          </div>
        </div>
      </section>

      <section className="shell pb-24">
        <SectionHeading index="02" title={<>Colour.</>} />
        <div className="grid grid-cols-2 gap-px bg-foreground/15 md:grid-cols-3 lg:grid-cols-6">
          {colours.map(c => (
            <div key={c.token} className={`flex aspect-[3/4] flex-col justify-between p-4 ${c.className}`}>
              <span className="meta opacity-70">--{c.token}</span>
              <div>
                <p className="font-serif text-4xl">{c.name}</p>
                <p className="mt-2 text-xs leading-5 opacity-70">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <SectionHeading index="03" title={<>Type.</>} />
        <div className="border-t border-foreground">
          {type.map(t => (
            <div key={t.name} className="grid gap-3 border-b border-foreground/20 py-6 md:grid-cols-[12rem_1fr] md:items-baseline">
              <div>
                <p className="meta">{t.name}</p>
                <p className="meta mt-1 text-muted-foreground">{t.spec}</p>
              </div>
              <p className={`${t.cls} truncate`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <SectionHeading index="04" title={<>Components.</>} />
        <div className="grid gap-px bg-foreground/15 lg:grid-cols-2">
          <div className="space-y-4 bg-background p-6">
            <p className="meta text-muted-foreground">Buttons</p>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Primary <ArrowRight /></button>
              <button className="btn btn-outline">Outline <ArrowRight /></button>
            </div>
            <div className="flex flex-wrap gap-3 bg-ink p-4">
              <button className="btn btn-light">Light <ArrowRight /></button>
              <button className="btn btn-outline-light">Outline light <ArrowRight /></button>
            </div>
          </div>
          <div className="space-y-6 bg-background p-6">
            <p className="meta text-muted-foreground">Chips, tags, links</p>
            <div className="flex flex-wrap gap-1.5">
              {["XS", "S", "M", "L"].map(s => <button key={s} className="chip" aria-pressed={s === "M"}>{s}</button>)}
              <button className="chip" disabled>XL</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="tag bg-ink text-bone">N° 01</span>
              <span className="tag bg-accent text-accent-foreground">Sale</span>
              <span className="tag border border-foreground">Sold out</span>
            </div>
            <a href="#" className="meta link">Underline link</a>
          </div>
          <div className="bg-background p-6">
            <p className="meta mb-4 text-muted-foreground">Field</p>
            <label htmlFor="demo" className="field-label">Email</label>
            <input id="demo" className="field-input" placeholder="name@email.com" />
          </div>
          <div className="bg-background p-6">
            <p className="meta mb-4 text-muted-foreground">Product card</p>
            <div className="max-w-[16rem]"><ProductCard product={products[5]} /></div>
          </div>
        </div>
      </section>

      <section className="shell pb-32">
        <SectionHeading index="05" title={<>Rules of <em>the house.</em></>} />
        <ol className="border-t border-foreground">
          {rules.map(([title, text], i) => (
            <li key={title} className="grid gap-2 border-b border-foreground/20 py-6 md:grid-cols-[12rem_1fr_1fr] md:items-baseline">
              <span className="meta text-accent">Rule 0{i + 1}</span>
              <h3 className="text-title">{title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-16 text-center text-[18vw] leading-none md:text-[12vw]"><Wordmark /></p>
      </section>
    </>
  );
}
