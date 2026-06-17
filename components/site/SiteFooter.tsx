
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Partners", "Press", "Blog"],
  },
  {
    title: "Useful Links",
    links: ["Solutions", "Features", "Pricing", "Help Center", "API Docs"],
  },
  {
    title: "Policies",
    links: ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookies", "Security"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-strong">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The Office OS for modern Chartered Accountants and Accounting firms. Automate workflows, win back hours, and grow with confidence.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-3 rounded-xl bg-foreground px-4 py-2 text-background">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M3 20.5V3.5c0-.83.34-1.58.88-2.12L13.94 12 3.88 22.62A2.99 2.99 0 0 1 3 20.5zm10.71-7.96l2.42-2.42 4.45 2.57c1.06.61 1.06 2.15 0 2.77l-4.45 2.56-2.42-2.41zM5.3 1.66l11.86 6.84-2.66 2.66L5.3 1.66z" /></svg>
                <span className="text-left text-xs">
                  <span className="block opacity-70">GET IT ON</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-xs">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary font-bold">M</span>
                <span>
                  <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Meta</span>
                  <span className="block font-semibold">Business Partner</span>
                </span>
              </div>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition hover:text-primary">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> hello@tasktracker24.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +1 (415) 555-0240</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 24 Ledger Street, Suite 400, San Francisco</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} TaskTracker24 Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">TaskTracker24 Cloud</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
