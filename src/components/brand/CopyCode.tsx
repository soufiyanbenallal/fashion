import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Promo code chip that copies itself. Inherits colour from its surface. */
export default function CopyCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard can be blocked; the code is still visible to type by hand
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy code ${code}`}
      className={cn("meta inline-flex h-10 items-center gap-3 border border-dashed border-current px-3 transition-opacity hover:opacity-80", className)}
    >
      <span className="text-sm tracking-[0.12em]">{code}</span>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
}
