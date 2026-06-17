import Image from "next/image";
import ctaImg from "@/assets/final-cta-dashboard.jpg";

export function FinalCTA({
  eyebrow = "Ready to grow?",
  title = "Run a sharper firm. Starting this week.",
  body = "Join 2,000+ Chartered Accountants who replaced spreadsheets, sticky notes, and chase-up calls with StudyCafe.",
}: { eyebrow?: string; title?: string; body?: string }) {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 grid-architectural opacity-60" aria-hidden />
      <div className="absolute inset-0 gradient-spotlight" aria-hidden />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-accent-blue/50 bg-accent-blue/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-deep">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl text-balance">{title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trial" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-deep">
              Start Free Trial
            </a>
            <a href="/pricing" className="rounded-full border border-foreground/15 bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
              View Pricing
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl gradient-blue opacity-20 blur-2xl" aria-hidden />
          <Image
            src={ctaImg}
            alt="Chartered accountant reviewing analytics dashboard"
            width={1280}
            height={960}
            className="relative rounded-3xl object-cover shadow-float"
          />
        </div>
      </div>
    </section>
  );
}
