import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function Price({ price, originalPrice, className }: { price: number; originalPrice?: number; className?: string }) {
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      <span className={originalPrice ? "text-accent" : undefined}>{formatPrice(price)}</span>
      {originalPrice && <s className="ml-2 text-muted-foreground">{formatPrice(originalPrice)}</s>}
    </span>
  );
}
