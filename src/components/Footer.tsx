import { Link } from "react-router-dom";
import { Wordmark } from "@/components/brand/Logo";

const columns = [
  { title: "Shop", links: [["All pieces", "/shop"], ["Core collection", "/collections/core"], ["Sets & Pairs", "/collections/sets-and-pairs"]] },
  { title: "Atelier", links: [["Our story", "/about"], ["Contact", "/contact"], ["Brand system", "/brand"]] },
  { title: "Care", links: [["Shipping", "/contact"], ["Returns", "/contact"], ["Repairs", "/contact"]] },
];

const social = [["Instagram", "https://instagram.com"], ["Pinterest", "https://pinterest.com"]];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="stitch-dark absolute inset-0" />
      <div className="shell relative pt-20 md:pt-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <p className="col-span-2 max-w-sm font-serif text-4xl leading-[1.05] md:col-span-1">
            Made by hand, <em className="text-madder-light">in small batches.</em>
          </p>
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="meta mb-5 text-bone/50">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="link text-sm">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="meta mb-5 text-bone/50">Follow</h4>
            <ul className="space-y-2.5">
              {social.map(([label, href]) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" className="link text-sm">{label} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="meta mt-20 flex flex-col justify-between gap-2 border-t border-bone/20 pt-5 text-bone/50 sm:flex-row">
          <span>© {new Date().getFullYear()} emasole — Knit atelier</span>
          <span>Natural fibres · Hand-knitted · Made to last</span>
          <span>Privacy · Terms</span>
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-10 h-[19vw] select-none overflow-hidden text-center">
        <Wordmark className="block text-[25vw] !leading-[0.8] text-bone" />
      </div>
    </footer>
  );
}
