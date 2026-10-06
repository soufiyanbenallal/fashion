import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map(({ id, title, description, open }) => (
        <div
          key={id}
          role="status"
          hidden={!open}
          className="rounded border border-border bg-background p-4 text-foreground shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && <p className="font-medium">{title}</p>}
              {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
            </div>
            <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(id)}>
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
