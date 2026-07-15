"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { work } from "@/lib/content";

const maskStyle = (src: string): React.CSSProperties => ({
  maskImage: `url(${src})`,
  WebkitMaskImage: `url(${src})`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskPosition: "left center",
  WebkitMaskPosition: "left center",
});

function CardLogo({
  src,
  aspect,
  title,
}: {
  src: string;
  aspect: number;
  title: string;
}) {
  const height = 26;
  return (
    <div
      role="img"
      aria-label={`${title} logo`}
      className="relative shrink-0"
      style={{ height, width: Math.round(height * aspect) }}
    >
      <div
        className="absolute inset-0 bg-ink/80 transition-opacity duration-500 group-hover:opacity-0"
        style={maskStyle(src)}
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          ...maskStyle(src),
          background:
            "linear-gradient(110deg, #f5f3fa 10%, var(--violet) 55%, var(--cyan) 100%)",
        }}
      />
    </div>
  );
}

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
          {work.map((item) => {
            const Card = item.href ? motion.a : motion.div;
            return (
            <Card
              key={item.title}
              {...(item.href
                ? {
                    href: item.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "data-cursor-hover": true,
                  }
                : {})}
              variants={revealItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass group relative flex flex-col overflow-hidden rounded-2xl p-7"
            >
              {item.logo && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-5 -right-3 h-24 rotate-[-10deg] bg-ink opacity-[0.04] transition-[opacity,transform] duration-500 group-hover:rotate-[-6deg] group-hover:opacity-[0.09]"
                  style={{
                    ...maskStyle(item.logo.src),
                    width: Math.round(96 * item.logo.aspect),
                  }}
                />
              )}

              <div className="mb-6 flex items-start justify-between gap-4">
                {item.logo ? (
                  <CardLogo
                    src={item.logo.src}
                    aspect={item.logo.aspect}
                    title={item.title}
                  />
                ) : (
                  <span />
                )}
                <div className="flex shrink-0 items-center gap-2.5">
                  <span
                    className={
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wide " +
                      (item.status === "Live"
                        ? "bg-cyan/15 text-cyan"
                        : "bg-white/8 text-muted")
                    }
                  >
                    <span
                      className={
                        "h-1.5 w-1.5 rounded-full " +
                        (item.status === "Live"
                          ? "bg-cyan animate-pulse"
                          : "bg-muted")
                      }
                    />
                    {item.status}
                  </span>
                  {item.href && (
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-colors duration-300 group-hover:text-violet"
                    />
                  )}
                </div>
              </div>

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
            </Card>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
