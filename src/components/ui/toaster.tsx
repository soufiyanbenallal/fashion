import { useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  // Auto-dismiss after a short read
  useEffect(() => {
    const timers = toasts.filter(t => t.open).map(t => setTimeout(() => dismiss(t.id), 4000));
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map(({ id, title, description, open }) => (
        <div key={id} role="status" hidden={!open} className="animate-fade-up bg-ink p-5 text-bone shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && <p className="meta text-madder-light">{title}</p>}
              {description && <p className="mt-2 font-serif text-xl leading-tight">{description}</p>}
            </div>
            <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(id)} className="text-bone/60 hover:text-bone">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
