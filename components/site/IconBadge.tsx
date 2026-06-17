import type { LucideIcon } from "lucide-react";

export function IconBadge({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const iconDim = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <span
      className={`inline-grid ${dim} place-items-center rounded-full bg-primary/8 text-primary`}
      style={{ boxShadow: "inset 0 0 0 1.5px color-mix(in oklab, var(--accent-gold) 70%, transparent)" }}
    >
      <Icon className={iconDim} strokeWidth={1.8} />
    </span>
  );
}
