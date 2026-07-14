"use client";

import { motion } from "motion/react";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { work } from "@/lib/content";

export function Work() {
  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Selected work
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight">
            Craft, not just credits.
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
          {work.map((item) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass group relative flex flex-col rounded-2xl p-7"
            >
              <span
                className={
                  "mb-5 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide " +
                  (item.status === "Live"
                    ? "bg-cyan/15 text-cyan"
                    : "bg-white/8 text-muted")
                }
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full " +
                    (item.status === "Live" ? "bg-cyan animate-pulse" : "bg-muted")
                  }
                />
                {item.status}
              </span>

              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                {item.blurb}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-violet/40 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
