"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Aurora } from "@/components/ui/Aurora";
import { Magnetic } from "@/components/ui/Magnetic";
import { profile, stats } from "@/lib/content";
import { revealItem } from "@/components/ui/Reveal";
import { motion } from "motion/react";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((m) => m.Scene),
  { ssr: false }
);

export function Hero() {
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollCueRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(scrollCueRef.current, {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20 sm:px-10"
    >
      <Aurora />

      {/* On desktop the logo lives right of the copy; shrinking the canvas to
          that region cuts the rendered pixel area by ~25%. */}
      <div className="absolute inset-y-0 left-0 right-0 lg:left-1/4">
        <Scene />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.p
            variants={revealItem}
            className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-cyan"
          >
            {profile.role} — {profile.tagline}
          </motion.p>

          <motion.h1
            variants={revealItem}
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-tight"
          >
            Interfaces shouldn&apos;t
            <br />
            just work.{" "}
            <span className="text-gradient">
              They should move like they mean it.
            </span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted"
          >
            I&apos;m {profile.name} — {profile.yearsExperience} years shipping
            React, GSAP, Three.js and Motion. Motion-first design systems that
            move engagement 25–40%, not just pixels.
          </motion.p>

          <motion.div variants={revealItem} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet to-violet-600 px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] transition-transform"
              >
                See the work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-cursor-hover
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white/10"
              >
                Say hello
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-16 grid max-w-lg grid-cols-3 gap-3 sm:gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4">
                <div className="font-[family-name:var(--font-display)] text-2xl text-ink sm:text-3xl">
                  {s.value}
                  <span className="text-violet">{s.suffix}</span>
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
