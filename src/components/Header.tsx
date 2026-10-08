import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Logo from "@/components/brand/Logo";
import Marquee from "@/components/brand/Marquee";
import { ATELIER_WEEK, isLive } from "@/lib/promos";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/collections/core", label: "Core" },
  { to: "/collections/sets-and-pairs", label: "Sets & Pairs" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Contact" },
];

const announcements = [
  ...(isLive(ATELIER_WEEK) ? [`${ATELIER_WEEK.title} — ${ATELIER_WEEK.summary} with ${ATELIER_WEEK.code}`] : []),
  "Complimentary shipping over $100",
  "AW26 — Chapter 01 is live",
  "Any two accessories — 10% off",
  "Five-year repair promise",
];

export default function Header() {
  const { totalItems } = useCart();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-9 bg-ink text-bone/90">
        <Marquee items={announcements} size="sm" />
      </div>

      <div className="border-b border-foreground/15 bg-background/90 backdrop-blur-md">
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center">
            <button
              className="meta -ml-1 p-1 lg:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {navLinks.slice(0, 3).map(link => (
                <NavItem key={link.to} {...link} active={pathname === link.to} />
              ))}
            </nav>
          </div>

          <Link to="/" aria-label="emasole home" className="text-[30px] text-foreground">
            <Logo />
          </Link>

          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Secondary">
              {navLinks.slice(3).map(link => (
                <NavItem key={link.to} {...link} active={pathname === link.to} />
              ))}
            </nav>
            <Link to="/cart" className="meta flex items-center gap-2 hover:text-accent" aria-label={`Bag, ${totalItems} items`}>
              <ShoppingBag className="h-4 w-4 sm:hidden" strokeWidth={1.5} />
              <span className="hidden sm:inline">Bag</span>
              <span className={cn("tabular-nums", totalItems > 0 && "text-accent")}>({totalItems})</span>
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-header overflow-y-auto bg-ink text-bone lg:hidden"
          aria-label="Mobile"
        >
          <div className="stitch-dark absolute inset-0" />
          <ol className="shell relative py-10">
            {navLinks.map((link, i) => (
              <li key={link.to} className="animate-fade-up border-b border-bone/15" style={{ animationDelay: `${i * 60}ms` }}>
                <Link to={link.to} className="flex items-baseline gap-5 py-5">
                  <span className="meta text-madder-light">0{i + 1}</span>
                  <span className={cn("font-serif text-5xl", pathname === link.to && "italic text-madder-light")}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </header>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link to={to} aria-current={active ? "page" : undefined} className={cn("meta link", active && "text-accent")}>
      {label}
    </Link>
  );
}
