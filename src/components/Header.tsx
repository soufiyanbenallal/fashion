import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/shop", label: "Shop All" },
  { to: "/collections/core", label: "Core Collection" },
  { to: "/collections/sets-and-pairs", label: "Sets & Pairs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { totalItems } = useCart();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="bg-primary text-primary-foreground text-center text-[11px] uppercase tracking-[0.2em] py-2.5 px-4">
        Free shipping on orders over $100 · Free returns within 30 days
      </div>

      <div className="border-b border-border">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.slice(0, 3).map(link => (
                <NavItem key={link.to} {...link} active={pathname === link.to} />
              ))}
            </nav>
          </div>

          <Link to="/" className="text-[28px] font-light tracking-tight text-foreground lowercase">
            emasole<span className="text-accent">.</span>
          </Link>

          <div className="flex items-center justify-end gap-5">
            <nav className="hidden lg:flex items-center gap-7 mr-3">
              {navLinks.slice(3).map(link => (
                <NavItem key={link.to} {...link} active={pathname === link.to} />
              ))}
            </nav>
            <button aria-label="Search" className="hidden sm:block text-foreground hover:text-accent transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button aria-label="Account" className="hidden sm:block text-foreground hover:text-accent transition-colors">
              <User className="w-[18px] h-[18px]" />
            </button>
            <Link to="/cart" className="relative text-foreground hover:text-accent transition-colors" aria-label="Shopping bag">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] w-[17px] h-[17px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-b border-border bg-background px-6 py-6 space-y-5">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn("block text-xs uppercase tracking-[0.18em] text-muted-foreground", pathname === link.to && "text-foreground")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-accent",
        active ? "text-accent" : "text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
