"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

// Parses a string like "47+", "0.1s", "35,983" into a numeric target plus prefix/suffix.
function parse(value: string) {
  const match = value.match(/^([^\d.-]*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", num: null as number | null, suffix: value, decimals: 0, hasComma: false };
  const [, prefix, raw, suffix] = match;
  const hasComma = raw.includes(",");
  const clean = raw.replace(/,/g, "");
  const num = parseFloat(clean);
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { prefix, num: isNaN(num) ? null : num, suffix, decimals, hasComma };
}

function format(n: number, decimals: number, hasComma: boolean) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: hasComma,
  });
}

export function CountUp({ value, duration = 1800, className }: Props) {
  const parsed = parse(value);
  const [display, setDisplay] = useState(parsed.num === null ? value : `${parsed.prefix}${format(0, parsed.decimals, parsed.hasComma)}${parsed.suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (parsed.num === null) return;
    const el = ref.current;
    if (!el) return;
    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const target = parsed.num!;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = target * eased;
        setDisplay(`${parsed.prefix}${format(cur, parsed.decimals, parsed.hasComma)}${parsed.suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && start());
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, parsed.num, parsed.prefix, parsed.suffix, parsed.decimals, parsed.hasComma]);

  return <span ref={ref} className={className}>{display}</span>;
}
