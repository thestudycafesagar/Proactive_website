import { SiteShell } from "@/components/site/SiteShell";
import { Smile, MessageCircle, Phone, MapPin } from "lucide-react";
import { FinalCTA } from "@/components/site/FinalCTA";

export const metadata = {
  title: "Contact Us — StudyCafe",
  description: "Reach out to us for sales, support, or general questions.",
};

const contactMethods = [
  {
    icon: Smile,
    title: "Sales Enquiries",
    desc: "Speak to our friendly team",
    detail: "sales@studycafe.in",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: MessageCircle,
    title: "Customer Support",
    desc: "We're here to help",
    detail: "help@studycafe.in",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Phone,
    title: "Call us",
    desc: "10 AM to 6 PM (Mon to Sat)",
    detail: "+91 90245 70899",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: MessageCircle, // Represents WhatsApp
    title: "WhatsApp",
    desc: "10 AM to 6 PM (Mon to Sat)",
    detail: "+91 90245 70899",
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="container-page py-12 lg:py-20">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-4xl lg:text-5xl text-balance">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Reach out to us for sales, support, or general questions.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* LEFT SIDE - CONTACT METHODS & ADDRESS */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {contactMethods.map((method) => (
                <div key={method.title} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                  <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full ${method.iconBg} ${method.iconColor}`}>
                    <method.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{method.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{method.desc}</p>
                  <p className="mt-3 font-medium text-foreground">{method.detail}</p>
                </div>
              ))}
            </div>
            
            {/* ADDRESS CARD */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Address</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                #1, One Way Road, Manpura Colony, Jalore - 343001, Rajasthan
              </p>
              <p className="mt-4 text-xs text-muted-foreground/80">
                Reg. Office Address: Opp. Jalore Nagrik Bank, Shastri Nagar, Jalore - 343001, Rajasthan
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div>
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-elegant">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Enter your full name" 
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="Enter email address" 
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="mb-2 block text-sm font-medium text-foreground">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      id="mobile"
                      placeholder="Enter 10 digit mobile number" 
                      className="w-full rounded-md border border-border bg-background px-4 py-2.5 pr-12 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      {/* Using a simple flag emoji for India since it's in the design */}
                      🇮🇳
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    rows={4}
                    placeholder="Enter your message..." 
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <p className="mt-1 text-right text-xs text-muted-foreground">0 / 180</p>
                </div>

                <button 
                  type="submit" 
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-deep transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </SiteShell>
  );
}
