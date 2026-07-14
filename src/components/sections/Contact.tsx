import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Aurora } from "@/components/ui/Aurora";
import { profile } from "@/lib/content";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 pt-28 pb-40 sm:px-10 sm:pt-40 sm:pb-48"
    >
      <Aurora className="opacity-70" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            Contact
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,4rem)] font-medium leading-[1.05]">
            Let&apos;s build something
            <br />
            that <span className="text-gradient">moves</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-balance text-muted">
            Open to conversations about motion-first front-end work,
            interactive 3D, or teams that want their design system to feel
            alive.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet to-violet-600 px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)]"
              >
                <Mail size={16} />
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-ink hover:bg-white/10"
              >
                <LinkedInIcon size={16} />
                {profile.linkedinHandle}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-24 font-mono text-xs uppercase tracking-wide text-muted">
            {profile.name} · {profile.location} · Built with Next.js, GSAP
            &amp; React Three Fiber
          </p>
        </Reveal>
      </div>
    </section>
  );
}
