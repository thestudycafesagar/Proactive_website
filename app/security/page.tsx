import { SiteShell } from "@/components/site/SiteShell";
import { ShieldCheck, Lock, Server, KeyRound } from "lucide-react";

export const metadata = {
  title: "Security | Proactive",
  description: "Security features and protocols at Proactive.",
};

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Aligned",
    description: "Our infrastructure and processes are designed in alignment with SOC 2 Type II standards, ensuring the highest level of security, availability, and confidentiality.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive financial data is always protected.",
  },
  {
    icon: Server,
    title: "Isolated Infrastructure",
    description: "We use single-tenant data isolation techniques to ensure your firm's data never mixes with others. Hosted on AWS with multi-region failover.",
  },
  {
    icon: KeyRound,
    title: "Advanced Authentication",
    description: "Support for mandatory Two-Factor Authentication (2FA), hardware keys, and Single Sign-On (SSO) integrations with Google and Microsoft.",
  },
];

export default function SecurityPage() {
  return (
    <SiteShell>
      <div className="container-page py-16 lg:py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Security First</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground sm:text-5xl text-balance">Bank-Grade Security</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
            We understand that as a CA, you handle highly sensitive financial data. Our platform is built from the ground up to protect your firm and your clients.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="rounded-[2rem] border border-border bg-surface p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-border bg-surface-strong p-8 lg:p-12">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-balance">Responsible Disclosure</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Security is a continuous effort. If you believe you have found a security vulnerability in Proactive, we encourage you to let us know right away. We will investigate all legitimate reports and do our best to quickly fix the problem.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Please email your findings to <a href="mailto:security@proactive.com" className="text-primary hover:underline">security@proactive.com</a>.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
