import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ endsAt, size = "md", className }: { endsAt: string; size?: "sm" | "md"; className?: string }) {
  const t = useCountdown(endsAt);
  if (t.done) return null;

  if (size === "sm") {
    return <span className={cn("meta tabular-nums", className)}>Ends in {t.days}d {pad(t.hours)}h {pad(t.minutes)}m</span>;
  }

  const units = [["Days", t.days], ["Hrs", t.hours], ["Min", t.minutes], ["Sec", t.seconds]] as const;
  return (
    <dl className={cn("flex gap-4", className)} aria-label="Time remaining">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col-reverse items-center">
          <dt className="meta opacity-60">{label}</dt>
          <dd className="font-mono text-2xl tabular-nums">{pad(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
