import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const metadata = {
  title: "Sign up — StudyCafe",
  description: "Start your 14-day free trial of StudyCafe.",
};

const benefits = [
  "Manage unlimited clients & tasks",
  "Automated compliance tracking",
  "Smart billing and invoicing",
  "Secure client document portal",
];

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side: Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
          
          <div className="mt-10">
            <Logo className="mb-8" />
            <h1 className="font-display text-3xl font-bold text-foreground">Create an account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-foreground">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      placeholder="Ananya"
                      required
                      className="block w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-foreground">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Rao"
                      required
                      className="block w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="firm-name" className="block text-sm font-medium text-foreground">
                  Firm Name
                </label>
                <div className="mt-2">
                  <input
                    id="firm-name"
                    name="firm-name"
                    type="text"
                    placeholder="Rao & Associates"
                    required
                    className="block w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Work Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="partner@firm.com"
                    required
                    className="block w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    required
                    className="block w-full rounded-md border border-border bg-surface px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Create account
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="http://localhost:8080/login" className="font-semibold text-primary hover:text-primary-deep">
                Sign in
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground/80">
              By signing up, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Branding/Benefits */}
      <div className="hidden lg:relative lg:block lg:w-1/2 lg:bg-surface-strong lg:p-12">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent-blue/5" aria-hidden />
        <div className="absolute inset-0 grid-architectural opacity-30" aria-hidden />
        <div className="relative flex h-full flex-col justify-center max-w-lg mx-auto">
          <h2 className="font-display text-4xl font-bold text-foreground">
            Everything you need to automate your practice.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of modern CAs and accountants who trust StudyCafe.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
