"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, LayoutDashboard, ListChecks, Receipt, MessageSquare, FolderKanban, BarChart3 } from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site/SiteShell";
import { IconBadge } from "@/components/site/IconBadge";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Reveal } from "@/components/site/Reveal";

import tasksImg from "@/assets/feature-tasks.jpg";
import billingImg from "@/assets/feature-billing.jpg";
import commsImg from "@/assets/feature-comms.jpg";
import docsImg from "@/assets/feature-docs.jpg";
import reportsImg from "@/assets/feature-reports.jpg";
import heroImg from "@/assets/hero-devices.jpg";

type Panel = {
  icon: typeof LayoutDashboard;
  title: string;
  summary: string;
  img: any;
  groups: { heading: string; items: string[] }[];
};

const panels: Panel[] = [
  {
    icon: LayoutDashboard, title: "Dashboard", img: heroImg,
    summary: "A single screen that tells every partner where the firm stands today.",
    groups: [
      { heading: "Task highlights", items: ["Due today, overdue, and upcoming", "By partner, by client, by entity", "One-click drill-down to the source task"] },
      { heading: "Compliance calendar", items: ["Government + firm calendars merged", "Custom highlights for high-risk filings", "iCal export to personal calendars"] },
      { heading: "Pulse metrics", items: ["Live WIP, realisation, and collection", "Capacity vs. load by associate", "Pipeline value by service line"] },
    ],
  },
  {
    icon: ListChecks, title: "StudyCafenagement", img: tasksImg,
    summary: "Create, assign, automate. The lifecycle every task in your firm should follow.",
    groups: [
      { heading: "Create", items: ["47+ filing templates ready to use", "Custom checklists per service line", "Recurring schedules in one click"] },
      { heading: "Assign", items: ["Auto-assign by skill & current load", "Round-robin for repeat work", "Delegate with approval chains"] },
      { heading: "Automate", items: ["Status changes trigger reminders", "Document checklists auto-attach", "Escalation when SLAs drift"] },
    ],
  },
  {
    icon: Receipt, title: "Billing & Invoicing", img: billingImg,
    summary: "WIP to receipt without ever copy-pasting between tools.",
    groups: [
      { heading: "Quote & engage", items: ["Reusable scope library", "E-signable engagement letters", "Retainer & milestone billing"] },
      { heading: "Invoice", items: ["Per-entity invoice templates", "Bulk invoicing across clients", "Auto-rounding & GST handling"] },
      { heading: "Collect", items: ["Branded payment links", "Multi-currency support", "Auto-reconciliation with bank feeds"] },
    ],
  },
  {
    icon: MessageSquare, title: "Communication", img: commsImg,
    summary: "Every message — WhatsApp, email, SMS — logged to the right client, in the right thread.",
    groups: [
      { heading: "Channels", items: ["Native WhatsApp Business integration", "Two-way email sync", "Transactional SMS"] },
      { heading: "Bulk send", items: ["Personalised tokens & merge fields", "Schedule by client segment", "Read receipts & bounce tracking"] },
      { heading: "Internal", items: ["Comments scoped to a task or client", "@mentions with email & push", "Audit trail on every message"] },
    ],
  },
  {
    icon: FolderKanban, title: "Documents", img: docsImg,
    summary: "A clean home for every PDF, return, and form — searchable from anywhere.",
    groups: [
      { heading: "Storage", items: ["Per-client folder tree", "Drag-and-drop uploads", "Version history with diffs"] },
      { heading: "Share", items: ["Encrypted client-share links", "Expiring access by default", "Watermarks on sensitive exports"] },
      { heading: "Search", items: ["OCR on scanned PDFs", "Full-text across clients", "Tagged document types"] },
    ],
  },
  {
    icon: BarChart3, title: "Reports & Insights", img: reportsImg,
    summary: "The numbers a managing partner needs — without exporting to a spreadsheet.",
    groups: [
      { heading: "Productivity", items: ["Utilisation by team & associate", "Cycle time by service line", "Bottleneck analysis"] },
      { heading: "Profitability", items: ["Realised vs. billed", "Effective rate per engagement", "Client profitability heatmap"] },
      { heading: "Growth", items: ["Pipeline by stage & value", "Churn signals", "Cross-sell opportunities"] },
    ],
  },
];

export default function FeaturesPage() {
  const [open, setOpen] = useState(0);

  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight" aria-hidden />
        <div className="container-page relative py-12 text-center lg:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Features</span>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-4xl lg:text-4xl text-balance">
            Every tool your firm needs, designed to feel like one.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Six interlocking modules cover the full lifecycle of a modern accounting practice — without the integration tax of stitching ten tools together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#trial" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant">Start Free Trial</a>
            <a href="/pricing" className="rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground">View Pricing</a>
          </div>
        </div>
      </section>

      {/* Task lifecycle strip */}
      <section className="container-page py-12">
        <Reveal className="rounded-[2rem] border border-border bg-surface p-8 lg:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">The task lifecycle</p>
          <div className="mt-6 grid items-center gap-4 sm:grid-cols-3">
            {[
              { step: "01", label: "Create", body: "Pick a template or duplicate a past task. Checklists auto-attach." },
              { step: "02", label: "Assign", body: "Auto-routed to the right associate by load and skill." },
              { step: "03", label: "Automate", body: "Status updates trigger reminders, escalations, and billing." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 120} className="relative rounded-2xl bg-surface-strong p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold text-accent-blue">{s.step}</span>
                  <span className="font-display text-lg font-semibold text-foreground">{s.label}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                {i < 2 && (
                  <span className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-primary/30 sm:block" aria-hidden />
                )}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Expandable panels */}
      <section className="container-page pb-16">
        <div className="space-y-4">
          {panels.map((p, i) => {
            const isOpen = i === open;
            return (
              <Reveal key={p.title} as="article" delay={i * 60} className="overflow-hidden rounded-3xl border border-border bg-surface">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left transition hover:bg-surface-strong lg:p-8"
                >
                  <div className="flex items-center gap-5">
                    <IconBadge icon={p.icon} size="lg" />
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="grid gap-8 border-t border-border bg-surface-strong p-6 lg:grid-cols-[1.2fr_1fr] lg:p-10">
                    <div className="grid gap-6 sm:grid-cols-3">
                      {p.groups.map((g) => (
                        <div key={g.heading}>
                          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">{g.heading}</h4>
                          <ul className="mt-3 space-y-2">
                            {g.items.map((it) => (
                              <li key={it} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-blue" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-3xl gradient-blue opacity-15 blur-2xl" aria-hidden />
                      <Image src={p.img} alt={`${p.title} preview`} width={1280} height={896} className="relative rounded-2xl object-cover shadow-elegant" />
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </SiteShell>
  );
}
