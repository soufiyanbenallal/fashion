import { getProductBySlug, type Product } from "@/data/products";
import type { CartItem } from "@/context/CartContext";

export interface Promo {
  code: string;
  title: string;
  summary: string;
  percent: number;
  /** ISO date; omit for evergreen codes */
  endsAt?: string;
  appliesTo: (product: Product) => boolean;
}

export const ATELIER_WEEK: Promo = {
  code: "ATELIER15",
  title: "Atelier Week",
  summary: "15% off all knitwear",
  percent: 15,
  endsAt: "2026-10-31T23:59:59",
  appliesTo: p => p.category === "Knitwear",
};

export const WELCOME: Promo = {
  code: "WELCOME10",
  title: "Welcome",
  summary: "10% off your first order",
  percent: 10,
  appliesTo: () => true,
};

/** Automatic: two or more accessories in the bag take 10% off each of them. */
export const SET_OFFER = { title: "Build a set", percent: 10, minItems: 2 };

const promos = [ATELIER_WEEK, WELCOME];

export const isLive = (promo: Promo) => !promo.endsAt || new Date(promo.endsAt).getTime() > Date.now();

export function findPromo(code: string): Promo | undefined {
  const promo = promos.find(p => p.code === code.trim().toUpperCase());
  return promo && isLive(promo) ? promo : undefined;
}

/**
 * Prices the bag. Each line takes the single best discount available to it —
 * offers never stack on the same piece.
 */
export function priceCart(items: CartItem[], promo?: Promo) {
  const isAccessory = (item: CartItem) => getProductBySlug(item.slug)?.category === "Accessories";
  const accessoryCount = items.filter(isAccessory).reduce((n, i) => n + i.quantity, 0);
  const setOfferOn = accessoryCount >= SET_OFFER.minItems;

  let subtotal = 0;
  let setDiscount = 0;
  let codeDiscount = 0;

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    const line = item.price * item.quantity;
    subtotal += line;
    if (!product) continue;

    const setPercent = setOfferOn && product.category === "Accessories" ? SET_OFFER.percent : 0;
    const codePercent = promo && promo.appliesTo(product) ? promo.percent : 0;

    if (codePercent > setPercent) codeDiscount += (line * codePercent) / 100;
    else setDiscount += (line * setPercent) / 100;
  }

  return { subtotal, setDiscount, codeDiscount, setOfferOn, total: subtotal - setDiscount - codeDiscount };
}
