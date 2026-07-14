"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !fillRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Experience
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight">
            Sixteen years, three rooms.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-12">
          <div className="absolute inset-y-0 left-0 w-px bg-line" />
          <div
            ref={fillRef}
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-violet via-cyan to-magenta"
            style={{ height: "0%" }}
          />

          <div className="space-y-16">
            {experience.map((entry, i) => (
              <div key={entry.company} className="relative">
                <span
                  className={cn(
                    "absolute -left-8 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full sm:-left-12",
                    entry.current ? "bg-cyan" : "bg-violet"
                  )}
                >
                  {entry.current && (
                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan opacity-60" />
                  )}
                </span>

                <Reveal delay={i * 0.05}>
                  <div className="glass rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink sm:text-2xl">
                        {entry.role}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wide text-muted">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-violet">
                      {entry.company}
                      {entry.current && (
                        <span className="ml-2 rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-cyan">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                      {entry.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
