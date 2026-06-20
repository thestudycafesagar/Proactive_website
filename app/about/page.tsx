import Image from "next/image";
import { ShieldCheck, Heart, Zap, Globe2, Target, Users } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Reveal } from "@/components/site/Reveal";
import { IconBadge } from "@/components/site/IconBadge";
import teamImg from "@/assets/solutions-team.jpg";

export const metadata = {
  title: "About Us — Proactive",
  description: "Learn about Proactive's mission to build the modern OS for Chartered Accountants.",
};

const values = [
  { icon: Target, title: "Mission-Driven", body: "We're obsessed with eliminating busywork so you can focus on advisory." },
  { icon: Heart, title: "Client-Centric", body: "Every feature is designed to make your clients love working with your firm." },
  { icon: ShieldCheck, title: "Security First", body: "Bank-grade encryption and SOC-2 compliance because your data is sacred." },
  { icon: Globe2, title: "Built for Scale", body: "Whether you're a team of 5 or 500, our platform scales effortlessly." },
  { icon: Zap, title: "Automation", body: "If a recurring task can be automated, we will build the automation for it." },
  { icon: Users, title: "Community", body: "We actively listen to our network of 2,000+ CAs to shape our roadmap." },
];

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-spotlight" aria-hidden />
        <div className="container-page relative grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Story</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-4xl lg:text-4xl text-balance">
              Building the modern OS for accountants.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Proactive was founded with a single, clear mission: to free chartered accountants and accounting firms from administrative busywork. 
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We realized that the average CA firm uses 10 different tools to manage tasks, billing, and clients. We're here to replace the chaos with a single, elegant platform.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl gradient-blue opacity-15 blur-2xl" aria-hidden />
            <Image 
              src={teamImg} 
              alt="Proactive team collaborating" 
              width={1280} 
              height={896} 
              className="relative rounded-3xl object-cover shadow-float" 
            />
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="container-page py-16 lg:py-24">
        <Reveal className="max-w-3xl text-center mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Core Values</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
            The principles that guide our work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're building more than just software. We're building a new standard for how modern accounting firms operate.
          </p>
        </Reveal>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60} className="rounded-[2rem] border border-border bg-surface p-8 transition hover:border-primary/40 shadow-sm">
              <IconBadge icon={v.icon} />
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{v.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA 
        eyebrow="Join our journey" 
        title="Experience the Proactive difference." 
        body="Try our platform completely free for 14 days and see how much time your team can save." 
      />
    </SiteShell>
  );
}
