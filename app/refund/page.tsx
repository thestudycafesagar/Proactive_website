import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "Refund Policy | Proactive",
  description: "Refund Policy for Proactive.",
};

export default function RefundPage() {
  return (
    <SiteShell>
      <div className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-4xl text-balance">Refund Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-12 space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">1. Overview</h2>
            <p>At Proactive, we strive to ensure you are completely satisfied with our platform. This policy outlines the conditions under which refunds are provided.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">2. 14-Day Free Trial</h2>
            <p>We offer a 14-day free trial for all new accounts. During this period, you can explore all features without any financial commitment. No credit card is required to start your trial.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">3. Monthly Subscriptions</h2>
            <p>Monthly subscriptions are billed in advance on a month-to-month basis and are non-refundable. You can cancel your subscription at any time, and you will retain access to the service until the end of your current billing cycle.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">4. Annual Subscriptions</h2>
            <p>For annual subscriptions, if you are not satisfied within the first 30 days of your purchase, you may request a full refund. After 30 days, annual subscriptions are non-refundable.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">5. How to Request a Refund</h2>
            <p>To request a refund for an eligible annual subscription, please contact our support team at billing@proactive.com with your account details.</p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
