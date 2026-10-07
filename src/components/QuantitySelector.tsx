import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  onChange: (q: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: Props) {
  const btn = "flex h-full w-9 items-center justify-center hover:text-accent disabled:opacity-30";
  return (
    <div className="inline-flex h-10 items-stretch border border-foreground/25">
      <button type="button" onClick={() => onChange(Math.max(min - 1, quantity - 1))} className={btn} aria-label="Decrease quantity">
        <Minus className="h-3 w-3" />
      </button>
      <span className="meta flex w-8 items-center justify-center tabular-nums" aria-live="polite">{quantity}</span>
      <button type="button" onClick={() => onChange(Math.min(max, quantity + 1))} disabled={quantity >= max} className={btn} aria-label="Increase quantity">
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
