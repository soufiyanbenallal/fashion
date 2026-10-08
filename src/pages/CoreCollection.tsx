import { products } from "@/data/products";
import coreCollectionImg from "@/assets/collections/core-collection.jpg";
import CollectionPage from "@/components/brand/CollectionPage";
import ProcessList from "@/components/brand/ProcessList";

const coreProducts = products.filter(p =>
  ["spring-blade", "classic-set", "harvest-moon-cup", "golden-blush-cup"].includes(p.slug)
);

export default function CoreCollection() {
  return (
    <CollectionPage
      chapter="Chapter 01 — The Core Collection"
      title={<>The <em>Core.</em></>}
      intro="Everyday knitwear for quiet ritual — the foundation of emasole."
      image={coreCollectionImg}
      imageAlt="Folded knitwear in earth tones on oak shelves"
      hotspots={[
        { slug: "spring-blade", x: 33, y: 52 },
        { slug: "classic-set", x: 70, y: 56 },
        { slug: "harvest-moon-cup", x: 77, y: 31 },
      ]}
      statement={<>Rooted in craft, <em className="text-accent">built to last</em> — the pieces everything else is layered around.</>}
      story={[
        "The Core Collection represents the foundation of emasole — everyday knitwear designed for quiet ritual. Each piece is hand-knitted from responsibly sourced natural yarns, finished in our signature earth-toned palette that layers effortlessly across seasons.",
        "Inspired by the textures of the natural world, these designs celebrate the beauty of imperfection. No two garments are identical — the subtle variations in tension, stitch, and dye are what make each piece unmistakably handmade.",
      ]}
      products={coreProducts}
      coda={<ProcessList index="03" />}
    />
  );
}
