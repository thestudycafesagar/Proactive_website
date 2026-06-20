import { SiteShell } from "@/components/site/SiteShell";

export const metadata = {
  title: "Cookie Policy | Proactive",
  description: "Cookie Policy for Proactive.",
};

export default function CookiesPage() {
  return (
    <SiteShell>
      <div className="container-page py-16 lg:py-24">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-4xl text-balance">Cookie Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-12 space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">1. What are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide valuable information to the website owners.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">2. How We Use Cookies</h2>
            <p>Proactive uses cookies to recognize your device, remember your preferences, and understand how you interact with our platform. This helps us improve your user experience and secure your account.</p>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the basic operation of our platform, such as logging in and securing your session.</li>
              <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
              <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website and personalize our content for you.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">4. Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impair your overall user experience.</p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
