
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import Image from "next/image";
import googlePlay from "../../assets/Google_Play_Store.webp"

const cols = [
  {
    title: "Company",
    links: [{name: "About Us",link: "/about"}, {name: "Solutions",link: "/solutions"}, {name: "Features",link: "/features"}, {name: "Contact",link: "/contact"}, {name: "Blog",link: "/blog"}],
  },
  {
    title: "Useful Links",
    links: [{ name: "Login", link: "/login" }, { name: "Signup", link: "/signup" }, { name: "Demo", link: "/demo" }, { name: "Help Center", link: "/help" }, { name: "Pricing", link: "/pricing" }],
  },
  {
    title: "Policies",
    links: [{ name: "Privacy Policy", link: "/privacy" }, { name: "Terms of Service", link: "/terms" }, { name: "Refund Policy", link: "/refund" }, { name: "Cookies", link: "/cookies" }, { name: "Security", link: "/security" }],
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

          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a href={l.link} className="text-sm text-muted-foreground transition hover:text-primary">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}


        </div>
        <div className="flex justify-between py-8">

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary" /> contact@proactive.com</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> +1 (415) 555-0240</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> 24 Ledger Street, Suite 400, San Francisco</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#" className="">
              <Image src={googlePlay} alt="Google Play" width={150} height={150} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Proactive Inc. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">Proactive Cloud</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
