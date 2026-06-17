import {
  ArrowUpRight, Clock, Magnet, Coins, Bolt, Zap, TrendingUp,
  Cloud, Lock, ShieldCheck, KeyRound, Quote, Calendar, FileText,
  MessageCircle, FolderKanban, Globe, BarChart3, Sparkles,
} from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { IconBadge } from "@/components/site/IconBadge";
import { FinalCTA } from "@/components/site/FinalCTA";
import { CountUp } from "@/components/site/CountUp";
import { Reveal } from "@/components/site/Reveal";

import heroImg from "@/assets/hero-devices.jpg";
import tasksImg from "@/assets/feature-tasks.jpg";
import billingImg from "@/assets/feature-billing.jpg";
import commsImg from "@/assets/feature-comms.jpg";
import docsImg from "@/assets/feature-docs.jpg";
import webappImg from "@/assets/feature-webapp.jpg";
import reportsImg from "@/assets/feature-reports.jpg";

export const metadata = {
  title: "TaskTracker24 — The Office OS for Modern CAs & Accountants",
  description: "Automate your firm with TaskTracker24: smart task management, billing, communication, documents and reporting built for CAs.",
  openGraph: {
    title: "TaskTracker24 — The Office OS for Modern CAs & Accountants",
    description: "Automate your firm with TaskTracker24: smart task management, billing, communication and reporting.",
    type: "website",
  },
};

const heroBullets = [
  { icon: Zap, text: "Minimize Manual Work" },
  { icon: Bolt, text: "Automate Your Firm" },
  { icon: TrendingUp, text: "Maximize Revenue" },
];

const scaleCards = [
  { icon: Sparkles, title: "Boost Efficiency", body: "Templates, automations, and approvals replace the back-and-forth of running every task by hand." },
  { icon: Clock, title: "Accomplish More in Less Time", body: "Recurring compliance, GST, TDS and ROC tasks generate themselves on the right cadence." },
  { icon: Magnet, title: "Reduce Client Churn", body: "Proactive reminders and a polished client portal turn one-time engagements into long retainers." },
  { icon: Coins, title: "Recover Payments Faster", body: "Smart billing pairs each invoice with auto follow-ups, so receivables shrink without awkward calls." },
];

const features = [
  {
    eyebrow: "Tasks", title: "Manage Daily Tasks, Smarter.",
    body: "A practice-aware calendar that knows your filings, your team, and your clients. Recurring work creates itself; missed work surfaces before deadlines bite.",
    points: ["Color-coded recurring filings", "Workload by partner & associate", "Drag to reschedule with auto-notify"], img: tasksImg, reverse: false,
  },
  {
    eyebrow: "Billing", title: "The Most Advanced Smart Billing Experience.",
    body: "From scope to invoice to receipt — one workflow. Track WIP, surface unbilled hours, and convert a closed engagement to a paid invoice in two clicks.",
    points: ["Automated invoice-to-receipt", "Retainer & milestone billing", "Client-friendly payment links"], img: billingImg, reverse: true,
  },
  {
    eyebrow: "Communication", title: "Smarter Communication, Where Clients Already Are.",
    body: "Native WhatsApp integration plus a Bulk Send modal for compliance announcements. Every message is logged to the client record — no shadow inboxes.",
    points: ["WhatsApp & email in one thread", "Bulk send with personalised tokens", "Read receipts & escalations"], img: commsImg, reverse: false,
  },
  {
    eyebrow: "Documents", title: "Document Management Made Simple.",
    body: "A clean folder tree per client, drag-and-drop uploads, and a secure-share overlay that expires links automatically. PII stays where it belongs.",
    points: ["Drag-and-drop with version history", "Encrypted client share links", "Smart OCR & search"], img: docsImg, reverse: true,
  },
  {
    eyebrow: "Web & App", title: "A Professional Website and App, Out of the Box.",
    body: "Your firm gets a branded marketing site and a client mobile app that mirrors the practice — no developer required.",
    points: ["Branded mobile app for clients", "Responsive marketing website", "Single sign-on across both"], img: webappImg, reverse: false,
  },
  {
    eyebrow: "Reports", title: "Time Tracking, Reports & Performance Insights.",
    body: "Interactive dashboards across efficiency, profitability and utilisation. Spot the engagements that pay — and the ones that don't.",
    points: ["Realised vs. billed analytics", "Partner & team utilisation", "Client profitability heatmaps"], img: reportsImg, reverse: true,
  },
];

const security = [
  { icon: Cloud, title: "AWS Infrastructure", body: "ISO-certified hosting with multi-region failover." },
  { icon: Lock, title: "End-to-End Encryption", body: "AES-256 at rest, TLS 1.3 in transit, always-on." },
  { icon: ShieldCheck, title: "Strict Data Privacy", body: "Single-tenant data isolation. We never train on your data." },
  { icon: KeyRound, title: "2FA & SSO", body: "TOTP, hardware keys, and SSO via Google & Microsoft." },
];

const metrics = [
  { value: "47+", label: "Compliance task templates" },
  { value: "0.1s", label: "Average action response" },
  { value: "35,983", label: "Hours saved last quarter" },
];

export default function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight" aria-hidden />
        <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> New: AI-assisted compliance calendar
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl text-balance">
              The Office OS for <span className="text-primary">Modern CAs</span> & Accountants.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              TaskTracker24 is the practice management platform that replaces ten tools, twenty spreadsheets, and a hundred follow-up calls.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {heroBullets.map((b) => (
                <li key={b.text} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                    <b.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#trial" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-deep">
                Start Free Trial <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
                Watch 2-min demo
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] gradient-emerald opacity-15 blur-3xl" aria-hidden />
            <Image
              src={heroImg}
              alt="TaskTracker24 dashboard on laptop, tablet and phone"
              width={1280}
              height={1024}
              className="relative animate-float rounded-3xl object-cover shadow-float"
              priority
            />
          </div>
        </div>

        {/* Trusted by */}
        <div className="container-page relative pb-20">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Join <span className="font-semibold text-foreground">2,000+ CA Firms</span> that trust TaskTracker24.
          </p>
          <div className="mt-6 mask-fade-x overflow-hidden">
            <div className="flex w-max animate-marquee gap-12 py-2">
              {[0, 1].map((dup) => (
                <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center gap-12 pr-12">
                  {["Mehra & Co", "Iyer Advisors", "NorthBridge", "Khanna LLP", "Tally Partners", "Greenleaf CA"].map((n) => (
                    <li
                      key={n}
                      className="whitespace-nowrap font-display text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCALE CARDS */}
      <section className="container-page py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The smarter way to scale</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl text-balance">
            Four shifts that make a firm feel modern overnight.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scaleCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="group rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:shadow-elegant">
              <IconBadge icon={c.icon} />
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* IMMERSIVE FEATURE BLOCKS */}
      {features.map((f, i) => {
        const tint = i % 2 === 0 ? "bg-primary-deep text-primary-foreground" : "bg-surface-strong text-foreground";
        const subText = i % 2 === 0 ? "text-primary-foreground/75" : "text-muted-foreground";
        return (
          <section key={f.title} className={`relative overflow-hidden ${tint}`}>
            {i % 2 === 0 && <div className="absolute inset-0 gradient-emerald opacity-90" aria-hidden />}
            {i % 2 === 0 && <div className="absolute inset-0 grid-architectural opacity-20" aria-hidden />}
            <div className={`container-page relative grid items-center gap-12 py-20 lg:grid-cols-2 ${f.reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <Reveal>
                <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${i % 2 === 0 ? "text-accent-gold" : "text-primary"}`}>
                  {f.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl text-balance">{f.title}</h2>
                <p className={`mt-4 max-w-xl text-lg ${subText}`}>{f.body}</p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className={`mt-1 grid h-5 w-5 place-items-center rounded-full ${i % 2 === 0 ? "bg-accent-gold/20 text-accent-gold" : "bg-primary/10 text-primary"}`}>
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="text-base">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120} className="relative">
                <div className={`absolute -inset-4 rounded-3xl ${i % 2 === 0 ? "bg-accent-gold/20" : "bg-primary/10"} blur-2xl`} aria-hidden />
                <Image
                  src={f.img}
                  alt={f.title}
                  width={1280}
                  height={896}
                  className="relative rounded-3xl object-cover shadow-float"
                />
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* SECURITY */}
      <section className="container-page py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Top-notch secured technology</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl text-balance">
            Bank-grade security, built in from day one.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {security.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="rounded-3xl border border-border bg-surface p-6">
              <IconBadge icon={s.icon} size="lg" />
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container-page pb-20">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-10 shadow-elegant lg:p-16">
          <Quote className="absolute right-10 top-10 h-24 w-24 text-primary/8" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col items-start gap-4">
              <div className="grid h-24 w-24 place-items-center rounded-3xl gradient-emerald text-3xl font-bold text-accent-gold">
                AR
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-foreground">CA Ananya Rao</p>
                <p className="text-sm text-muted-foreground">Managing Partner, Rao & Associates</p>
              </div>
            </div>
            <blockquote className="font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl text-balance">
              {`"We replaced four tools with TaskTracker24 in the first month. By month three our team was billing 22% more hours with the same headcount — because nothing slipped between the cracks anymore."`}
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* METRICS */}
      <section className="container-page pb-24">
        <Reveal className="rounded-[2rem] gradient-emerald p-1">
          <div className="grid gap-8 rounded-[calc(2rem-4px)] bg-background p-10 sm:grid-cols-3">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 100} className="text-center">
                <CountUp value={m.value} className="font-display text-5xl font-bold text-primary sm:text-6xl" />
                <div className="sr-only">{m.value}</div>
                <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Numbers that speak for themselves — averaged across firms on the Growth plan.
        </p>
      </section>

      <FinalCTA />
    </SiteShell>
  );
}
