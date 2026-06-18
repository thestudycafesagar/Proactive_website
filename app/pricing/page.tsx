"use client";

import { useState } from "react";
import { Check, Minus, ChevronDown, Quote } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Reveal } from "@/components/site/Reveal";

const tiers = [
  {
    name: "Starter", price: 19, blurb: "For solo practitioners getting organised.",
    perks: ["Up to 3 team members", "Unlimited clients", "Task & calendar management", "Basic billing & invoices", "WhatsApp & email channel"],
    cta: "Start Free Trial", featured: false,
  },
  {
    name: "Growth", price: 39, blurb: "For growing firms that need automation.",
    perks: ["Up to 25 team members", "Everything in Starter", "Recurring compliance automations", "Bulk send & client portal", "Profitability & utilisation reports", "Branded client mobile app"],
    cta: "Start Free Trial", featured: true,
  },
  {
    name: "Scale", price: 69, blurb: "For multi-entity firms with serious scale.",
    perks: ["Unlimited team members", "Everything in Growth", "Multi-entity billing", "SSO, audit logs & SLA controls", "Dedicated success manager", "Custom workflow designer"],
    cta: "Talk to Sales", featured: false,
  },
];

const matrix: { feature: string; values: (true | false | string)[] }[] = [
  { feature: "Team members", values: ["3", "25", "Unlimited"] },
  { feature: "Clients", values: ["Unlimited", "Unlimited", "Unlimited"] },
  { feature: "Task & calendar", values: [true, true, true] },
  { feature: "Recurring compliance automations", values: [false, true, true] },
  { feature: "Smart billing & receipts", values: [true, true, true] },
  { feature: "Multi-entity billing", values: [false, false, true] },
  { feature: "WhatsApp + email channel", values: [true, true, true] },
  { feature: "Bulk send & client portal", values: [false, true, true] },
  { feature: "Profitability & utilisation reports", values: [false, true, true] },
  { feature: "Branded mobile app", values: [false, true, true] },
  { feature: "SSO, audit logs & SLAs", values: [false, false, true] },
  { feature: "Custom workflow designer", values: [false, false, true] },
  { feature: "Dedicated success manager", values: [false, false, true] },
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes — 14 days, full access, no credit card required. You can invite your whole team during the trial." },
  { q: "Can I switch plans later?", a: "Anytime, in both directions. Upgrades are prorated; downgrades take effect at the next billing cycle." },
  { q: "How are users counted?", a: "A user is any team member with login access. Clients and external collaborators are free and unlimited on every plan." },
  { q: "Do you support multi-entity billing?", a: "Yes — multi-entity billing is included on the Scale plan and lets you bill from any number of GST-registered entities." },
  { q: "What about data security?", a: "StudyCafe runs on AWS with end-to-end encryption, single-tenant data isolation, and SOC2-aligned controls. We never train on your data." },
  { q: "Do you offer a partner programme?", a: "Yes. Implementation partners get co-marketing, certification, and revenue share. Contact our partnerships team for details." },
];

export default function PricingPage() {
  const [users, setUsers] = useState(10);
  const monthly = users * 39;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight" aria-hidden />
        <div className="container-page relative py-12 text-center lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</span>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-4xl lg:text-4xl text-balance">
            Simple pricing. Real value. Pay per user.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Pick a plan that matches your firm today. Change it the moment you outgrow it. No hidden setup fees, ever.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="container-page pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, idx) => (
            <Reveal
              key={t.name}
              delay={idx * 100}
              className={`relative flex flex-col rounded-[2rem] p-8 ${t.featured
                ? "bg-primary-deep text-primary-foreground shadow-float"
                : "border border-border bg-surface text-foreground"
                }`}
              style={t.featured ? { boxShadow: "var(--shadow-float), 0 0 0 2px var(--accent-blue)" } : undefined}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-3 py-1 text-xs font-semibold text-primary-deep">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{t.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">${t.price}</span>
                <span className={`text-sm ${t.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>/ user / month</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-accent-blue" : "text-primary"}`} />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#trial"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${t.featured
                  ? "bg-accent-blue text-primary-deep hover:brightness-95"
                  : "bg-primary text-primary-foreground hover:bg-primary-deep"
                  }`}
              >
                {t.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="container-page py-16">
        <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-surface-strong p-8 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Estimate your bill</span>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
                How big is your team?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Drag the slider. We'll show your monthly cost on the Growth plan in real time.
              </p>
              <div className="mt-8">
                <input
                  type="range" min={5} max={100} value={users}
                  onChange={(e) => setUsers(Number(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>5</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-end gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Team size</div>
                  <div className="font-display text-4xl font-bold text-foreground">{users}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly</div>
                  <div className="font-display text-4xl font-bold text-primary">${monthly.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Annual</div>
                  <div className="font-display text-2xl font-semibold text-foreground">${(monthly * 12).toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-surface p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Your team</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {Array.from({ length: Math.min(users, 100) }).map((_, i) => (
                  <span
                    key={i}
                    className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: `color-mix(in oklab, var(--primary) ${20 + (i / 100) * 60}%, var(--surface))`,
                      color: i < 30 ? "var(--primary-deep)" : "white",
                    }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Every additional teammate unlocks the same full set of features — no tier upsell.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Feature matrix */}
      <section className="container-page py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">Compare every plan.</h2>
        </Reveal>
        <Reveal delay={120} className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-surface-strong">
              <tr>
                <th className="p-4 font-display text-sm font-semibold text-foreground">Feature</th>
                {tiers.map((t) => (
                  <th key={t.name} className="p-4 font-display text-sm font-semibold text-foreground">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-surface" : "bg-surface-strong"}>
                  <td className="p-4 text-foreground">{row.feature}</td>
                  {row.values.map((v, j) => (
                    <td key={j} className="p-4">
                      {typeof v === "string" ? (
                        <span className="font-medium text-foreground">{v}</span>
                      ) : v ? (
                        <Check className="h-5 w-5 text-accent-blue" />
                      ) : (
                        <Minus className="h-5 w-5 text-muted-foreground/50" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* Testimonial */}
      <section className="container-page pb-16">
        <Reveal className="relative overflow-hidden rounded-[2rem] gradient-blue p-10 text-primary-foreground lg:p-16">
          <Quote className="absolute right-10 top-10 h-24 w-24 text-accent-blue/30" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <div className="grid h-24 w-24 place-items-center rounded-3xl bg-accent-blue/20 text-3xl font-bold text-accent-blue">VK</div>
              <p className="mt-4 font-display text-lg font-semibold">CA Vikram Kapoor</p>
              <p className="text-sm text-primary-foreground/75">Partner, Kapoor & Mehta LLP</p>
            </div>
            <blockquote className="font-display text-2xl font-medium leading-snug sm:text-3xl text-balance">
              {`"The Growth plan paid for itself in the first billing cycle. We collected 18 days faster, and our associates stopped asking 'what's next?' on Monday mornings."`}
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="container-page pb-24">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">Frequently asked questions.</h2>
        </Reveal>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-surface-strong"
                >
                  <span className="font-display text-base font-semibold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
              </Reveal>
            );
          })}
        </div>
      </section>

      <FinalCTA eyebrow="Try TaskTracker24 free" title="Pick a plan. Or just kick the tyres." body="Full access for 14 days, no credit card. We'll never auto-charge you." />
    </SiteShell>
  );
}
