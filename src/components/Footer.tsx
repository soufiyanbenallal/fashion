import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const columns = [
  { title: "Shop", links: [["Shop All", "/shop"], ["Core Collection", "/collections/core"], ["Sets & Pairs", "/collections/sets-and-pairs"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"]] },
  { title: "Help", links: [["Shipping", "/contact"], ["Returns", "/contact"], ["Size Guide", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl font-light lowercase tracking-tight">
              emasole<span className="text-peach">.</span>
            </p>
            <p className="text-sm text-primary-foreground/70 mt-4 max-w-xs leading-relaxed">
              Considered knitwear, made slowly from natural fibres — designed to be worn for years.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-peach transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-peach transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
            </div>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-sm hover:text-peach transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} emasole. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
