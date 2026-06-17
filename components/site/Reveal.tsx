"use client";

import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Reveal({ as = "div", delay = 0, className, style, children }: Props) {
  const { ref, revealed } = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      style: { transitionDelay: revealed ? `${delay}ms` : "0ms", ...style },
      className: cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ),
    },
    children,
  );
}
