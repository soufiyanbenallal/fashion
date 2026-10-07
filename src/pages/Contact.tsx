import { useState } from "react";
import { ArrowRight } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";
import IndexHeader from "@/components/brand/IndexHeader";
import { useToast } from "@/hooks/use-toast";

const emptyForm = { firstName: "", lastName: "", email: "", subject: "", message: "" };

const contacts = [
  ["Write", <a href="mailto:email@example.com" className="link">email@example.com</a>],
  ["Call", <a href="tel:+15555555555" className="link">(555) 555-5555</a>],
  ["Hours", "Mon – Fri, 9 – 5"],
] as const;

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Message sent", description: "Thank you — we'll reply within one business day." });
    setForm(emptyForm);
    setIsSubmitting(false);
  };

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const field = (id: keyof typeof emptyForm, label: string, type = "text") => (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <input id={id} type={type} required value={form[id]} onChange={update(id)} className="field-input" />
    </div>
  );

  return (
    <>
      <IndexHeader
        label="(Contact) The atelier"
        title={<>Say <em>hello.</em></>}
        intro="Questions about a piece, help with an order, or a custom commission — our small team replies within one business day."
      />

      <section className="shell grid grid-cols-1 items-start gap-16 border-t border-foreground pb-28 pt-12 md:grid-cols-[5fr_7fr] md:gap-24">
        <dl className="space-y-8">
          {contacts.map(([term, value]) => (
            <div key={term}>
              <dt className="meta mb-2 text-muted-foreground">{term}</dt>
              <dd className="font-serif text-3xl md:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {field("firstName", "First name")}
            {field("lastName", "Last name")}
          </div>
          {field("email", "Email", "email")}
          {field("subject", "Subject")}
          <div>
            <label htmlFor="message" className="field-label">Message</label>
            <textarea id="message" required value={form.message} onChange={update("message")} className="field-input h-32 resize-y" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="meta text-muted-foreground">All fields required</p>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Sending…" : "Send message"} <ArrowRight />
            </button>
          </div>
        </form>
      </section>

      <NewsletterSignup />
    </>
  );
}
