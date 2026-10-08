import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import yarn from "@/assets/newsletter-bg.jpg";
import { WELCOME } from "@/lib/promos";
import { StitchMark } from "./Logo";
import CopyCode from "./CopyCode";

const STORAGE_KEY = "emasole:welcome-seen";
const DELAY_MS = 12000;
const SCROLL_TRIGGER = 0.4;

function hasSeen() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Private mode: the modal may show again next visit, which is acceptable
  }
}

/**
 * First-visit offer. Opens once per browser, after a delay or 40% scroll,
 * and never on the bag where it would interrupt checkout.
 */
export default function WelcomeModal() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (hasSeen() || pathname.startsWith("/cart")) return;

    function show() {
      cleanup();
      markSeen();
      setOpen(true);
    }
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) show();
    }
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }

    const timer = setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return cleanup;
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] grid max-h-[92svh] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-background shadow-2xl duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 md:grid-cols-[5fr_6fr]">
          <div className="relative hidden overflow-hidden bg-ink md:block">
            <img src={yarn} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-bone">
              <StitchMark className="h-10 w-10 text-bone" />
              <span className="meta text-bone/80">fig. — Undyed merino</span>
            </div>
          </div>

          <div className="relative flex flex-col p-6 md:p-10">
            <Dialog.Close className="absolute right-4 top-4 p-1 text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="h-4 w-4" />
            </Dialog.Close>
            <p className="meta text-accent">(Welcome to the atelier)</p>

            {!joined ? (
              <>
                <Dialog.Title className="text-display mt-8">
                  10% off your <em>first piece.</em>
                </Dialog.Title>
                <Dialog.Description className="mt-5 text-[15px] leading-7 text-muted-foreground">
                  Join our letters for first access to small-batch releases and notes from the knitting table.
                </Dialog.Description>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <label htmlFor="welcome-email" className="field-label">Email</label>
                  <input
                    id="welcome-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="field-input"
                  />
                  <button type="submit" className="btn btn-primary w-full">Unlock 10% off <ArrowRight /></button>
                </form>
                <Dialog.Close className="meta link mx-auto mt-6 text-muted-foreground">No thanks, I'll pay full price</Dialog.Close>
              </>
            ) : (
              <>
                <Dialog.Title className="text-display mt-8">
                  You're <em>in.</em>
                </Dialog.Title>
                <Dialog.Description className="mt-5 text-[15px] leading-7 text-muted-foreground">
                  Here's your code — {WELCOME.summary.toLowerCase()}. Add it in your bag.
                </Dialog.Description>
                <CopyCode code={WELCOME.code} className="mt-8 h-14 w-full justify-between px-5" />
                <Dialog.Close className="btn btn-primary mt-3 w-full">Start shopping <ArrowRight /></Dialog.Close>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
