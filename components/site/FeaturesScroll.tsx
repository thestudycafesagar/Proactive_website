"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  img: StaticImageData | string;
}

export function FeaturesScroll({ features }: { features: Feature[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-background text-foreground border-y border-border">
      <div className="container-page relative grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Sticky Media Container - Desktop only */}
        <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center py-20">
          <div className="relative w-full aspect-square xl:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-float bg-surface border border-border/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={features[activeIndex].img}
                  alt={features[activeIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scrollable Text Blocks */}
        <div className="flex flex-col w-full">
          {features.map((f, i) => (
            <FeatureBlock 
              key={f.title} 
              feature={f} 
              index={i} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
          {/* Bottom spacer so the last item can scroll past center */}
          <div className="hidden lg:block h-[30vh]" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ feature: f, index, setActiveIndex }: { feature: Feature, index: number, setActiveIndex: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      {
        // Trigger when the element crosses the middle 50% of the viewport
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [index, setActiveIndex]);

  return (
    <div ref={ref} className="min-h-[60vh] lg:min-h-screen flex flex-col justify-center py-16">
      {/* Mobile Image (hidden on Desktop) */}
      <div className="lg:hidden w-full aspect-square relative rounded-3xl overflow-hidden mb-10 shadow-float border border-border/50">
         <Image src={f.img} alt={f.title} fill className="object-cover" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {f.eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-4xl text-balance">
        {f.title}
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        {f.body}
      </p>
      <ul className="mt-8 space-y-4">
        {f.points.map((p) => (
          <li key={p} className="flex items-start gap-4">
            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-base font-medium">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
