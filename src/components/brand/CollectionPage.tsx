import type { ReactNode } from "react";
import ProductCard from "@/components/ProductCard";
import HeroHeader from "@/components/brand/HeroHeader";
import SectionHeading from "@/components/brand/SectionHeading";
import type { Product } from "@/data/products";

type CollectionPageProps = {
  chapter: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  statement: ReactNode;
  story: string[];
  products: Product[];
  coda: ReactNode;
};

/** Shared template for every collection ("chapter") page. */
export default function CollectionPage({ chapter, title, intro, image, imageAlt, statement, story, products, coda }: CollectionPageProps) {
  return (
    <>
      <HeroHeader image={image} imageAlt={imageAlt} label={chapter} caption={`${products.length} pieces`} title={title} intro={intro} />

      <section className="shell section-y">
        <div className="grid gap-6 md:grid-cols-[12rem_1fr]">
          <p className="meta text-muted-foreground">(01) The idea</p>
          <div>
            <p className="text-statement">{statement}</p>
            <div className="mt-12 grid gap-6 text-[15px] leading-7 text-muted-foreground md:grid-cols-2 md:gap-10">
              {story.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-24 md:pb-32">
        <SectionHeading index="02" title={<>The <em>pieces.</em></>} action={{ to: "/shop", label: "All pieces" }} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-5 lg:grid-cols-4">
          {products.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {coda}
    </>
  );
}
