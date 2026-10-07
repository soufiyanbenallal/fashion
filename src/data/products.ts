import goldenMistPair from "@/assets/products/golden-mist-pair.jpg";
import milkDipCup from "@/assets/products/milk-dip-cup.jpg";
import harvestMoonCup from "@/assets/products/harvest-moon-cup.jpg";
import springBlade from "@/assets/products/spring-blade.jpg";
import classicSet from "@/assets/products/classic-set.jpg";
import countryFeastSet from "@/assets/products/country-feast-set.jpg";
import earthSkyPlanter from "@/assets/products/earth-sky-planter.jpg";
import goldenBlushCup from "@/assets/products/golden-blush-cup.jpg";
import saltSpout from "@/assets/products/salt-spout.jpg";

export type Category = "Knitwear" | "Accessories";

export interface Product {
  slug: string;
  /** Catalogue number, shown as N° 01 */
  number: number;
  name: string;
  category: Category;
  material: string;
  colour: { name: string; hex: string };
  sizes: string[];
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  badge?: "sale" | "sold-out";
  availability?: string;
}

const KNIT_SIZES = ["XS", "S", "M", "L", "XL"];
const ONE_SIZE = ["One size"];

export const products: Product[] = [
  {
    slug: "spring-blade",
    number: 1,
    category: "Knitwear",
    material: "100% British wool",
    colour: { name: "Moss", hex: "#6B6A4A" },
    sizes: KNIT_SIZES,
    name: "Moss Stitch Cardigan",
    price: 50,
    image: springBlade,
    description: "Hand-knitted from locally sourced wool using a textured moss stitch pattern. The relaxed silhouette drapes naturally, with hand-carved wooden buttons and ribbed cuffs for a refined finish.",
  },
  {
    slug: "classic-set",
    number: 2,
    category: "Knitwear",
    material: "Undyed heritage wool",
    colour: { name: "Ecru", hex: "#E3D8C3" },
    sizes: KNIT_SIZES,
    name: "Cable Knit Sweater",
    price: 50,
    image: classicSet,
    description: "A timeless cable knit pullover crafted from undyed heritage wool. Each twist and braid is worked by hand, creating a rich surface texture that softens beautifully with wear.",
  },
  {
    slug: "country-feast-set",
    number: 3,
    category: "Accessories",
    material: "Extra-fine merino",
    colour: { name: "Clay & Oat", hex: "#B07A5A" },
    sizes: ONE_SIZE,
    name: "Merino Wool Scarf Set",
    price: 50,
    image: countryFeastSet,
    description: "A coordinated set of two generously sized scarves in complementary earth tones. Knitted from extra-fine merino for a soft hand feel, with hand-twisted fringe detailing.",
  },
  {
    slug: "earth-sky-planter",
    number: 4,
    category: "Accessories",
    material: "70% baby alpaca, 30% wool",
    colour: { name: "Heather", hex: "#7D7478" },
    sizes: ONE_SIZE,
    name: "Alpaca Blend Beanie",
    price: 40,
    originalPrice: 50,
    image: earthSkyPlanter,
    badge: "sale",
    description: "A cozy ribbed beanie knitted from a baby alpaca and wool blend. Lightweight yet warm, with a gently slouched crown and folded brim that fits all head sizes.",
  },
  {
    slug: "golden-blush-cup",
    number: 5,
    category: "Knitwear",
    material: "Lambswool",
    colour: { name: "Oat", hex: "#CDBFA6" },
    sizes: KNIT_SIZES,
    name: "Ribbed Wool Vest",
    price: 50,
    image: goldenBlushCup,
    description: "A versatile layering piece in a deep rib knit, crafted from medium-weight lambswool. The V-neck and clean armholes make it perfect over a shirt or worn alone in warmer months.",
  },
  {
    slug: "harvest-moon-cup",
    number: 6,
    category: "Knitwear",
    material: "Hand-dyed wool",
    colour: { name: "Madder", hex: "#A63A1E" },
    sizes: KNIT_SIZES,
    name: "Chunky Knit Pullover",
    price: 50,
    image: harvestMoonCup,
    availability: "Only 4 available",
    description: "Our most substantial knit — a chunky-gauge pullover worked in a bold herringbone pattern. Made from hand-dyed wool in our signature rust colorway, with dropped shoulders and a relaxed fit.",
  },
  {
    slug: "milk-dip-cup",
    number: 7,
    category: "Accessories",
    material: "100% Mongolian cashmere",
    colour: { name: "Bone", hex: "#EEE7DA" },
    sizes: ONE_SIZE,
    name: "Cashmere Wrap",
    price: 50,
    image: milkDipCup,
    description: "An oversized wrap knitted from pure Mongolian cashmere in a delicate stockinette stitch. Finished with a subtle fringe edge, this piece is as soft as it is elegant.",
  },
  {
    slug: "salt-spout",
    number: 8,
    category: "Accessories",
    material: "Shetland wool",
    colour: { name: "Undyed natural", hex: "#BFB3A0" },
    sizes: ["S/M", "M/L"],
    name: "Heritage Mittens",
    price: 50,
    image: saltSpout,
    badge: "sold-out",
    description: "Traditional stranded colourwork mittens inspired by Nordic knitting heritage. Knitted from sturdy Shetland wool in natural undyed shades for a piece that tells a story.",
  },
  {
    slug: "golden-mist-pair",
    number: 9,
    category: "Accessories",
    material: "Brushed lambswool",
    colour: { name: "Charcoal", hex: "#4A4744" },
    sizes: ["36–38", "39–41", "42–44"],
    name: "Lambswool Socks Pair",
    price: 50,
    image: goldenMistPair,
    description: "A pair of mid-calf socks knitted from brushed lambswool with reinforced heels and toes. The ribbed leg ensures a snug fit, while the soft fiber keeps feet warm all day.",
  },
];

export const featuredProducts = [
  products.find(p => p.slug === "golden-mist-pair")!,
  products.find(p => p.slug === "milk-dip-cup")!,
  products.find(p => p.slug === "harvest-moon-cup")!,
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export const formatNumber = (product: Product) => `N° ${String(product.number).padStart(2, "0")}`;

export function getRelatedProducts(slug: string, count = 3): Product[] {
  return products.filter(p => p.slug !== slug && p.badge !== "sold-out").slice(0, count);
}
