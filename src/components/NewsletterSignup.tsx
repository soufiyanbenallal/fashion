import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    toast({ title: "You're on the list", description: "Welcome to emasole — 10% off is on its way." });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="bg-accent text-accent-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-light">Join the emasole circle</h2>
          <p className="text-sm mt-3 text-accent-foreground/80">10% off your first order, early access to new drops and stories from the atelier.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex border-b border-accent-foreground/60">
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-transparent py-4 text-sm placeholder:text-accent-foreground/60 focus:outline-none"
          />
          <button type="submit" disabled={isSubmitting} className="text-[11px] uppercase tracking-[0.2em] px-2 disabled:opacity-50">
            {isSubmitting ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
