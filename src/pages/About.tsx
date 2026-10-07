import aboutBg from "@/assets/about-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import HeroHeader from "@/components/brand/HeroHeader";
import ProcessList from "@/components/brand/ProcessList";
import SectionHeading from "@/components/brand/SectionHeading";

const palette = [
  ["Sand", "#D8C3A0", "text-ink"],
  ["Oatmeal", "#CDBFA6", "text-ink"],
  ["Rust", "#A63A1E", "text-bone"],
  ["Charcoal", "#4A4744", "text-bone"],
  ["Moss", "#6B6A4A", "text-bone"],
];

const values = [
  ["Natural only", "Undyed and plant-dyed merino, alpaca, cashmere and heritage-breed wool from small farms."],
  ["Made slowly", "Every piece is worked stitch by stitch by one of our twelve artisan knitters."],
  ["Made to last", "A five-year repair promise — because the most sustainable garment is the one you keep."],
];

export default function About() {
  return (
    <>
      <HeroHeader
        image={aboutBg}
        imageAlt="Hands knitting undyed wool on wooden needles"
        label="(Atelier) Our story"
        caption="fig. 01 — On the needles"
        title={<>Fibre <em>&amp; form.</em></>}
        intro="emasole began with a simple conviction: that the clothes we wear should carry the warmth of the hands that made them."
      />

      <section className="shell section-y">
        <div className="grid gap-6 md:grid-cols-[12rem_1fr]">
          <p className="meta text-muted-foreground">(01) Belief</p>
          <div>
            <p className="text-statement">“We believe in making less, <em className="text-accent">and making it well.</em>”</p>
            <div className="mt-12 grid gap-6 text-[15px] leading-7 text-muted-foreground md:grid-cols-2 md:gap-10">
              <p>
                Every piece in our collection is hand-knitted from natural fibres — merino, alpaca, cashmere, and heritage breed wools — sourced from small farms and independent spinners who share our commitment to ethical, sustainable practice.
              </p>
              <p>
                Our process is slow by design. Each garment begins as a skein of yarn, carefully wound and paired with a pattern developed in-house. The result is knitwear with a depth of texture no machine can replicate — pieces that age gracefully and soften with every wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProcessList index="02" />

      <section className="shell section-y">
        <SectionHeading index="03" title={<>The <em>palette.</em></>} />
        <div className="grid grid-cols-2 gap-px bg-foreground/15 sm:grid-cols-3 lg:grid-cols-5">
          {palette.map(([name, hex, text], i) => (
            <div key={name} className={`flex aspect-[3/4] flex-col justify-between p-4 md:p-5 ${text}`} style={{ backgroundColor: hex }}>
              <span className="meta opacity-70">0{i + 1}</span>
              <div>
                <p className="font-serif text-4xl">{name}</p>
                <p className="meta mt-1 opacity-70">{hex}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-lead mt-8">
          Natural, undyed and plant-dyed yarns — the tonal variation comes from the fleece itself. Our palette reflects the landscapes that inspire us: windswept coastlines, autumn moorlands, the countryside in every season.
        </p>
      </section>

      <section className="grid border-y border-foreground md:grid-cols-[7fr_5fr]">
        <div className="media-frame aspect-[4/3] md:aspect-auto md:min-h-[70vh]">
          <img src={heroBg} alt="Model in a charcoal rib turtleneck on the moor" className="h-full w-full object-cover object-[35%_center]" loading="lazy" />
        </div>
        <ol className="flex flex-col md:border-l md:border-foreground">
          {values.map(([title, text], i) => (
            <li key={title} className="flex-1 border-b border-foreground/20 p-6 last:border-b-0 md:p-10">
              <p className="meta text-accent">Value 0{i + 1}</p>
              <h3 className="text-headline mt-4">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
