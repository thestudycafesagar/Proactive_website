import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "Privacy Policy | Proactive",
  description: "Privacy Policy for Proactive.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <div className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-4xl text-balance">Privacy Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-12 space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you create an account, subscribe to our newsletter, or contact our support team. This may include your name, email address, phone number, and company details.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">2. How We Use Your Information</h2>
            <p>We use the information we collect to operate, maintain, and improve our services, to process your transactions, and to communicate with you about updates, security alerts, and support messages.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">3. Data Security</h2>
            <p>We implement strict security measures to protect your personal information. All data is encrypted in transit and at rest using industry-standard protocols.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">4. Sharing of Information</h2>
            <p>We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our platform, provided they agree to keep this information confidential.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@proactive.com.</p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
