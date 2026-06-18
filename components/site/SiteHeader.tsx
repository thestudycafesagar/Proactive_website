"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { label: "Solutions", to: "/solutions" as const },
  { label: "Features", to: "/features" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "Help Center", to: "/help" as const },
  { label: "Contact Us", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.label}
              href={n.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === n.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a className="rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/5" href="http://localhost:8080/login" target="_blank">
            Client Login
          </a>
          <a className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-deep" href="/signup">
            Start Free Trial
          </a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-3 py-4">
            {navItems.map((n) => (
              <Link key={n.label} href={n.to} onClick={() => setOpen(false)} className={`py-1 text-sm font-medium ${pathname === n.to ? "text-primary" : ""}`}>
                {n.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <a className="flex-1 rounded-full border border-primary/30 px-4 py-2 text-center text-sm font-medium text-primary" href="http://localhost:8080/login" target="_blank">Client Login</a>
              <a className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground" href="/signup">Start Free Trial</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
