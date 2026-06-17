import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl gradient-emerald shadow-elegant">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-gold)" }}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        TaskTracker<span className="text-primary">24</span>
      </span>
    </Link>
  );
}
