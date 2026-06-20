import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "Terms of Service | Proactive",
  description: "Terms of Service for Proactive.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <div className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-4xl text-balance">Terms of Service</h1>
        <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-12 space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">1. Acceptance of Terms</h2>
            <p>By accessing or using Proactive, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">2. Description of Service</h2>
            <p>Proactive provides practice management software for modern CA firms and accountants. We reserve the right to modify or discontinue the service with or without notice.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree not to use the service for any illegal or unauthorized purpose.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">4. Intellectual Property</h2>
            <p>All content, features, and functionality of the Proactive platform are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">5. Limitation of Liability</h2>
            <p>Proactive shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
