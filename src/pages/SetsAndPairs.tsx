import { products } from "@/data/products";
import setsImg from "@/assets/collections/sets-and-pairs.jpg";
import CollectionPage from "@/components/brand/CollectionPage";
import { StitchMark } from "@/components/brand/Logo";

const setsProducts = products.filter(p =>
  ["golden-mist-pair", "classic-set", "country-feast-set", "salt-spout"].includes(p.slug)
);

const giftNotes = [
  ["Wrapped by hand", "Tissue-wrapped and nestled in a recycled kraft box."],
  ["A written note", "Add a message at checkout — we write it out by hand."],
  ["Shipped free", "Complimentary shipping on every set, always."],
];

export default function SetsAndPairs() {
  return (
    <CollectionPage
      chapter="Chapter 02 — Sets & Pairs"
      title={<>Sets <em>&amp; Pairs.</em></>}
      intro="Matched yarns and coordinated tones, composed to be worn — or given — together."
      image={setsImg}
      imageAlt="Coordinated knit sets in natural tones"
      statement={<>Better <em className="text-accent">together.</em> Composed in one dye lot, so every tone belongs.</>}
      story={[
        "Our curated sets and pairs are designed to work in harmony — matched yarns, complementary textures, and coordinated tones that bring cohesion to your wardrobe. Whether you're layering for yourself or gifting to someone special, these groupings take the guesswork out of styling.",
        "Each set is thoughtfully composed to balance warmth and form. Mix within a set or combine across collections — the earthy palette ensures everything works beautifully together.",
      ]}
      products={setsProducts}
      coda={
        <section className="relative overflow-hidden bg-oat">
          <div className="stitch-light absolute inset-0" />
          <div className="shell section-y relative">
            <div className="mb-12 grid gap-4 border-t border-foreground pt-4 md:grid-cols-[12rem_1fr]">
              <p className="meta text-muted-foreground">(03) Gifting</p>
              <h2 className="text-display">The perfect <em>gift.</em></h2>
            </div>
            <ol className="grid gap-px bg-foreground/15 md:grid-cols-3">
              {giftNotes.map(([title, text]) => (
                <li key={title} className="bg-oat p-6 md:p-8">
                  <StitchMark className="mb-10 h-6 w-6 text-accent" />
                  <h3 className="text-title">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      }
    />
  );
}
