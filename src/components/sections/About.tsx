import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            About
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.6vw,2.75rem)] font-medium leading-[1.3] text-ink">
            For sixteen years I&apos;ve been turning interface ideas into
            things that <span className="text-gradient">move</span> — React
            apps engineered with{" "}
            <span className="text-violet">GSAP</span>,{" "}
            <span className="text-cyan">Three.js</span> and{" "}
            <span className="text-magenta">Motion</span>, built as reusable
            systems so a whole team can ship consistent, high-craft animation
            — not just one hero project.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass mt-12 flex flex-col gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm text-ink">
                Currently leading front-end + motion strategy for{" "}
                <strong className="font-medium">{profile.currently}</strong>
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wide text-muted">
              {profile.location} · {profile.remote}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
