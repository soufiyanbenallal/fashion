const steps = [
  ["Spin", "Raw fleece is washed, carded, and spun into yarn by hand on traditional drop spindles and spinning wheels."],
  ["Knit", "Each garment is hand-knitted stitch by stitch, following patterns developed in-house for fit, drape, and durability."],
  ["Finish", "Completed pieces are gently blocked, seamed, and inspected — every detail checked before it leaves the atelier."],
];

/** Ink section listing the three stages of making. Shared by Core and About. */
export default function ProcessList({ index }: { index: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="stitch-dark absolute inset-0" />
      <div className="shell section-y relative">
        <div className="mb-12 grid gap-4 border-t border-bone pt-4 md:grid-cols-[12rem_1fr]">
          <p className="meta text-bone/60">({index})</p>
          <h2 className="text-headline">From fleece <em className="text-madder-light">to finish.</em></h2>
        </div>
        <ol>
          {steps.map(([title, text], i) => (
            <li key={title} className="group grid gap-4 border-t border-bone/20 py-8 md:grid-cols-[12rem_1fr_minmax(0,24rem)] md:items-baseline md:py-10">
              <span className="meta text-madder-light">Step 0{i + 1}</span>
              <h3 className="font-serif text-6xl transition-transform duration-700 ease-editorial group-hover:translate-x-3 md:text-8xl">{title}</h3>
              <p className="text-sm leading-7 text-bone/70">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
