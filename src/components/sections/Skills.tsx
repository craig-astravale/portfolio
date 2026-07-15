"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/lib/content";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const categoryStyle = {
  core: {
    label: "Core",
    dot: "bg-violet",
    chip: "hover:border-violet/60 hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.7)]",
  },
  motion: {
    label: "Motion",
    dot: "bg-cyan",
    chip: "hover:border-cyan/60 hover:shadow-[0_0_28px_-6px_rgba(53,230,214,0.6)]",
  },
  craft: {
    label: "Craft",
    dot: "bg-magenta",
    chip: "hover:border-magenta/60 hover:shadow-[0_0_28px_-6px_rgba(255,79,163,0.6)]",
  },
  process: {
    label: "Process",
    dot: "bg-ink/70",
    chip: "hover:border-ink/40 hover:shadow-[0_0_28px_-6px_rgba(245,243,250,0.35)]",
  },
} as const;

function RingTrack({
  radiusVar,
  dashed,
  spinDuration,
  reverse,
  paused,
}: {
  radiusVar: string;
  dashed?: boolean;
  spinDuration: number;
  reverse?: boolean;
  paused: boolean;
}) {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: `calc(var(${radiusVar}) * 2)`,
        height: `calc(var(${radiusVar}) * 2)`,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full border",
          dashed ? "border-dashed border-line" : "border-line"
        )}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.9) 40deg, rgba(53,230,214,0.7) 80deg, transparent 130deg)",
          WebkitMaskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
          maskImage:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
          animation: `orbit-spin ${spinDuration}s linear infinite${reverse ? " reverse" : ""}`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

function Comet({
  radiusVar,
  duration,
  reverse,
  paused,
  className,
}: {
  radiusVar: string;
  duration: number;
  reverse?: boolean;
  paused: boolean;
  className: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        animation: `orbit-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ transform: `translateY(calc(var(${radiusVar}) * -1))` }}
      >
        <div
          className={cn(
            "h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
            className
          )}
        />
      </div>
    </div>
  );
}

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

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

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

      // While paused/off-screen the angles don't change, so skip the style
      // writes entirely and let the loop idle.
      if (!pausedRef.current) {
        elapsed += dt;

        const progress = (elapsed / duration) % 1;
        const ringAngle = (reverse ? -1 : 1) * 360 * progress;

        if (ringRef.current) {
          ringRef.current.style.transform = `rotate(${ringAngle}deg)`;
        }
        angles.forEach((angle, i) => {
          const el = counterRefs.current[i];
          if (el) el.style.transform = `rotate(${-ringAngle - angle}deg)`;
        });
      }

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
                  className={cn(
                    "glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs text-ink w-max",
                    "shadow-[0_4px_20px_-6px_rgba(139,92,246,0.4)] transition-[transform,border-color,box-shadow] duration-300 hover:scale-110",
                    categoryStyle[skill.category].chip
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      categoryStyle[skill.category].dot
                    )}
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
  const [inView, setInView] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inner = skills.slice(0, 6);
  const outer = skills.slice(6);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Hover only pauses the chip rings (so they can be read and clicked); the
  // decorative shimmer/comets keep moving. Off-screen halts everything.
  const offScreen = !inView;
  const chipsHalted = paused || offScreen;

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-[42%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.09),rgba(53,230,214,0.04)_45%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-5xl">
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
            ref={orbitRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={cn(
              "relative mx-auto mt-20 aspect-square w-[clamp(280px,80vw,34rem)]",
              "[--r1:6rem] [--r2:10.5rem] sm:[--r1:7.5rem] sm:[--r2:13rem] lg:[--r1:8.5rem] lg:[--r2:15rem]"
            )}
          >
            <RingTrack radiusVar="--r1" spinDuration={14} paused={offScreen} />
            <RingTrack
              radiusVar="--r2"
              dashed
              spinDuration={20}
              reverse
              paused={offScreen}
            />

            <Comet
              radiusVar="--r1"
              duration={14}
              paused={offScreen}
              className="bg-cyan shadow-[0_0_14px_3px_rgba(53,230,214,0.7)]"
            />
            <Comet
              radiusVar="--r2"
              duration={20}
              reverse
              paused={offScreen}
              className="bg-violet shadow-[0_0_14px_3px_rgba(139,92,246,0.8)]"
            />

            <OrbitRing
              items={inner}
              radiusVar="--r1"
              duration={38}
              paused={chipsHalted}
              reducedMotion={reducedMotion}
            />
            <OrbitRing
              items={outer}
              radiusVar="--r2"
              duration={54}
              reverse
              paused={chipsHalted}
              reducedMotion={reducedMotion}
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_70%)] blur-xl"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-violet/50"
                  style={{
                    animation:
                      "hub-pulse 3.4s cubic-bezier(0.16,1,0.3,1) infinite",
                    animationPlayState: inView ? "running" : "paused",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-cyan/40"
                  style={{
                    animation:
                      "hub-pulse 3.4s cubic-bezier(0.16,1,0.3,1) 1.7s infinite",
                    animationPlayState: inView ? "running" : "paused",
                  }}
                />
                <div
                  className="relative rounded-full p-px"
                >
                  <div className="flex h-24 w-24 -ml-2 flex-col items-center justify-center gap-1.5 rounded-full sm:h-28 sm:w-28">
                    <LogoMark size={80} animated={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {(Object.keys(categoryStyle) as (keyof typeof categoryStyle)[]).map(
              (key) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      categoryStyle[key].dot
                    )}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {categoryStyle[key].label}
                  </span>
                </div>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
