"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const categoryColor = {
  core: "bg-violet",
  motion: "bg-cyan",
  craft: "bg-magenta",
  process: "bg-ink/60",
} as const;

function OrbitRing({
  items,
  radiusVar,
  duration,
  reverse,
  paused,
  reducedMotion,
}: {
  items: typeof skills;
  radiusVar: string;
  duration: number;
  reverse?: boolean;
  paused: boolean;
  reducedMotion: boolean;
}) {
  const ringRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const angles = items.map((_, i) => (360 / items.length) * i);

  useEffect(() => {
    if (reducedMotion) {
      ringRef.current!.style.transform = "rotate(0deg)";
      angles.forEach((angle, i) => {
        const el = counterRefs.current[i];
        if (el) el.style.transform = `rotate(${-angle}deg)`;
      });
      return;
    }

    let raf = 0;
    let elapsed = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) elapsed += dt;

      const progress = (elapsed / duration) % 1;
      const ringAngle = (reverse ? -1 : 1) * 360 * progress;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${ringAngle}deg)`;
      }
      angles.forEach((angle, i) => {
        const el = counterRefs.current[i];
        if (el) el.style.transform = `rotate(${-ringAngle - angle}deg)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, duration, reverse, items.length]);

  return (
    <div ref={ringRef} className="absolute inset-0">
      {items.map((skill, i) => {
        const angle = angles[i];
        return (
          <div
            key={skill.name}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              transform: `rotate(${angle}deg) translateY(calc(var(${radiusVar}) * -1))`,
            }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div ref={(el) => { counterRefs.current[i] = el; }}>
                <div
                  data-cursor-hover
                  className="glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-ink shadow-[0_4px_20px_-6px_rgba(139,92,246,0.4)] transition-transform hover:scale-110"
                >
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", categoryColor[skill.category])}
                  />
                  {skill.name}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Skills() {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const inner = skills.slice(0, 6);
  const outer = skills.slice(6);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Toolkit
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-center font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-tight">
            Twelve tools. One language.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={cn(
              "relative mx-auto mt-20 aspect-square w-[clamp(280px,80vw,34rem)]",
              "[--r1:6rem] [--r2:10.5rem] sm:[--r1:7.5rem] sm:[--r2:13rem] lg:[--r1:8.5rem] lg:[--r2:15rem]"
            )}
          >
            <div className="absolute inset-[16%] rounded-full border border-line" />
            <div className="absolute inset-0 rounded-full border border-line/60" />

            <OrbitRing
              items={inner}
              radiusVar="--r1"
              duration={38}
              paused={paused}
              reducedMotion={reducedMotion}
            />
            <OrbitRing
              items={outer}
              radiusVar="--r2"
              duration={54}
              reverse
              paused={paused}
              reducedMotion={reducedMotion}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-strong flex h-[30%] w-[30%] flex-col items-center justify-center rounded-full text-center">
                <span className="font-[family-name:var(--font-display)] text-lg font-medium text-ink sm:text-xl">
                  CDT
                </span>
                <span className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-muted sm:text-[10px]">
                  Craft
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
