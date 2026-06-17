import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
        <path d="M4.69704 15.6971C3.76811 14.7681 3.76811 13.2619 4.69704 12.333L12.333 4.69707C13.2619 3.76813 14.7681 3.76813 15.6971 4.69706L15.6971 22.3331C15.6971 24.5422 13.9062 26.3331 11.6971 26.3331L8.00003 26.3331C5.79089 26.3331 4.00003 24.5422 4.00003 22.3331L4.00003 16.3941L4.69704 15.6971Z" fill="#253D8E" />
        <path d="M14.285 4H20.5707C24.1206 4 27 6.87937 27 10.4293V19.8571C27 23.407 24.1206 26.2864 20.5707 26.2864H16.285C15.1804 26.2864 14.285 25.391 14.285 24.2864V4Z" fill="#3FB3E7" />
      </svg>
      <span className="font-display text-2xl font-bold tracking-tight text-foreground">
        StudyCafe
      </span>
    </Link>
  );
}
