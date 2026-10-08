import { products } from "@/data/products";
import setsImg from "@/assets/collections/sets-and-pairs.jpg";
import CollectionPage from "@/components/brand/CollectionPage";
import { StitchMark } from "@/components/brand/Logo";
import SetPromo from "@/components/brand/SetPromo";
import Section from "@/components/brand/Section";

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
      hotspots={[
        { slug: "country-feast-set", x: 42, y: 62 },
        { slug: "salt-spout", x: 64, y: 64 },
        { slug: "golden-mist-pair", x: 72, y: 42 },
      ]}
      statement={<>Better <em className="text-accent">together.</em> Composed in one dye lot, so every tone belongs.</>}
      story={[
        "Our curated sets and pairs are designed to work in harmony — matched yarns, complementary textures, and coordinated tones that bring cohesion to your wardrobe. Whether you're layering for yourself or gifting to someone special, these groupings take the guesswork out of styling.",
        "Each set is thoughtfully composed to balance warmth and form. Mix within a set or combine across collections — the earthy palette ensures everything works beautifully together.",
      ]}
      products={setsProducts}
      coda={
        <>
          <SetPromo index="03" />
          <Section density="compact" index="04" title={<>The perfect <em>gift.</em></>}>
            <ol className="grid gap-px bg-foreground/15 md:grid-cols-3">
              {giftNotes.map(([title, text]) => (
                <li key={title} className="flex gap-5 bg-background py-5 md:px-6 md:first:pl-0">
                  <StitchMark className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-serif text-2xl leading-tight">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </>
      }
    />
  );
}
