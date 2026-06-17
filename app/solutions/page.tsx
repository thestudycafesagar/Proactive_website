import {
  Building2, Workflow, Cog, Users, ListChecks, Wrench, BellRing,
  CheckCircle2, BarChart3, Calendar, FileText, MessageCircle, ShieldCheck, Briefcase, Clock,
} from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { IconBadge } from "@/components/site/IconBadge";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Reveal } from "@/components/site/Reveal";
import teamImg from "@/assets/solutions-team.jpg";
import tasksImg from "@/assets/feature-tasks.jpg";
import billingImg from "@/assets/feature-billing.jpg";
import commsImg from "@/assets/feature-comms.jpg";
import docsImg from "@/assets/feature-docs.jpg";
import webappImg from "@/assets/feature-webapp.jpg";
import reportsImg from "@/assets/feature-reports.jpg";

export const metadata = {
  title: "Solutions — StudyCafe for CA & Accounting Firms",
  description: "Purpose-built solutions for multi-entity CA firms, small teams, and growing practices. Automate billing, workflow, and client follow-up.",
  openGraph: {
    title: "Solutions — StudyCafe",
    description: "Solutions purpose-built for modern CA & accounting firms of every size.",
  },
};

const benefits = [
  "Run multiple billing entities under one roof",
  "Onboard new clients in under an hour",
  "Automate every recurring compliance task",
  "Get paid on time without awkward follow-ups",
];

const blocks = [
  {
    eyebrow: "Multi Billing Entity",
    title: "One platform. Every entity you bill from.",
    body: "Manage as many firms, sub-brands, and proprietorships as your practice needs — each with its own GSTIN, invoice template, and bank account. Switch context in one click.",
    img: billingImg,
    bullets: ["Entity-scoped permissions", "Per-entity invoice numbering", "Consolidated P&L across entities"],
  },
  {
    eyebrow: "Hassle-free Onboarding",
    title: "From signed engagement to ready-to-work in 30 minutes.",
    body: "Pre-built onboarding flows collect KYC, scope, and access in a single guided checklist. Your team doesn't chase documents — clients submit them on their phone.",
    img: docsImg,
    bullets: ["Branded client onboarding link", "Auto-reminders for missing items", "Built-in KYC vault"],
  },
  {
    eyebrow: "Automated Compliance",
    title: "Compliance that schedules itself.",
    body: "Pick the filings each client needs once. StudyCafe spins up the right task on the right cadence — GST, TDS, ROC, Income Tax — and assigns it to the right associate.",
    img: tasksImg,
    bullets: ["47+ pre-built filing templates", "Auto-assignment by skill & load", "Government calendar synced"],
  },
  {
    eyebrow: "Small Team Efficiency",
    title: "Punch above your weight, even at five people.",
    body: "Templates, bulk actions, and shared inboxes mean a five-person firm runs like a fifteen-person one — without the burnout.",
    img: reportsImg,
    bullets: ["Bulk task creation & edits", "Shared client inbox", "Capacity planner per associate"],
  },
  {
    eyebrow: "Organized Workflow",
    title: "Every task has a status. Nothing is 'somewhere on email'.",
    body: "A kanban view for partners, a list view for associates, and a client portal that shows exactly what's pending — all wired to the same source of truth.",
    img: tasksImg,
    bullets: ["Kanban, list & calendar views", "Internal vs. client-visible statuses", "SLA timers with escalations"],
  },
  {
    eyebrow: "Useful Tools, Built In",
    title: "The little utilities your team Googles every day.",
    body: "GST calculators, TDS rate finders, mileage logs, and a built-in IT-return checklist — all inside StudyCafe, all linked to the right client record.",
    img: webappImg,
    bullets: ["GST, TDS & advance tax calculators", "Client-linked time & mileage logs", "Pre-flight return checklists"],
  },
  {
    eyebrow: "Payment Reminders",
    title: "Receivables that collect themselves.",
    body: "Configure the cadence once — a soft nudge on day three, a firm reminder on day fifteen, a partner alert on day thirty. StudyCafe sends them in your brand voice.",
    img: commsImg,
    bullets: ["Tone-tunable reminder templates", "WhatsApp + email delivery", "One-click payment links"],
  },
];

const advanced = [
  { icon: Calendar, title: "Compliance Calendar", body: "Government and firm calendars merged in one view." },
  { icon: FileText, title: "E-sign & Engagement", body: "Send engagement letters and collect signatures in-app." },
  { icon: MessageCircle, title: "Client Portal", body: "A polished, branded space for documents and updates." },
  { icon: BarChart3, title: "Profitability Reports", body: "See which clients and engagements actually pay." },
  { icon: ShieldCheck, title: "Audit Trail", body: "Every change, who made it, when — forever." },
  { icon: Briefcase, title: "Partner Dashboard", body: "Realised, billed, and pipeline metrics by partner." },
  { icon: Clock, title: "Time Tracking", body: "Timers that snap to tasks and clients automatically." },
  { icon: Workflow, title: "Custom Workflows", body: "Design approval chains that match how your firm works." },
];

export default function SolutionsPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight" aria-hidden />
        <div className="container-page relative grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solutions</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-5xl text-balance">
              The best solution for the way modern firms work.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Whether you bill from one entity or seven, run a five-person team or fifty, StudyCafe fits the shape of your practice — not the other way around.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#trial" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-deep">Start Free Trial</a>
              <a href="/features" className="rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">Explore Features</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl gradient-blue opacity-15 blur-2xl" aria-hidden />
            <Image src={teamImg} alt="Multi-generational accounting team collaborating" width={1280} height={896} className="relative rounded-3xl object-cover shadow-float" />
          </div>
        </div>
      </section>

      {/* Interleaved blocks */}
      <div className="space-y-4">
        {blocks.map((b, i) => {
          const reverse = i % 2 === 1;
          return (
            <section key={b.title} className="container-page py-12">
              <div className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <Reveal>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{b.eyebrow}</span>
                  <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-3xl text-balance">{b.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{b.body}</p>
                  <ul className="mt-6 space-y-2">
                    {b.bullets.map((bp) => (
                      <li key={bp} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        {bp}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={120} className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      backgroundImage:
                        "radial-gradient(color-mix(in oklab, var(--primary) 8%, transparent) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      transform: "translate(16px, 16px)",
                    }}
                  />
                  <Image src={b.img} alt={b.title} width={1280} height={896} className="relative rounded-3xl object-cover shadow-elegant" />
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Advanced grid */}
      <section className="container-page py-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Advanced features</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-4xl text-balance">
            Everything else a serious firm expects.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advanced.map((a, i) => (
            <Reveal key={a.title} delay={i * 60} className="rounded-2xl border border-border bg-surface p-5 transition hover:border-primary/40">
              <IconBadge icon={a.icon} />
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA eyebrow="See it on your firm" title="Bring TaskTracker24 to your practice this week." body="A 14-day trial, full access, no credit card." />
    </SiteShell>
  );
}
