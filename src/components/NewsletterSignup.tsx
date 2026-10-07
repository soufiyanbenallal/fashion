import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StitchMark } from "@/components/brand/Logo";

export default function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast({ title: "You're on the list", description: "Welcome to the atelier — 10% off is on its way." });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden bg-accent text-accent-foreground">
      <StitchMark className="pointer-events-none absolute -right-16 -top-10 h-[28rem] w-[28rem] text-bone/10 md:h-[40rem] md:w-[40rem]" />
      <div className="shell section-y relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-20">
        <div>
          <p className="meta mb-8 text-bone/70">(—) Letters from the atelier</p>
          <h2 className="text-display">
            First to know. <em>Never noise.</em>
          </h2>
        </div>
        <div>
          <p className="mb-8 max-w-sm text-sm leading-7 text-bone/80">
            Small-batch releases before anyone else, notes from the knitting table, and 10% off your first order.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center border-b border-bone/50 transition-colors focus-within:border-bone">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent py-4 text-lg text-bone placeholder:text-bone/50 focus:outline-none"
            />
            <button type="submit" disabled={isSubmitting} className="meta inline-flex items-center gap-2 pl-4 hover:text-ink disabled:opacity-50">
              {isSubmitting ? "Joining…" : "Join"} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
