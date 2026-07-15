"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LogoMark } from "@/components/brand/LogoMark";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
    >
      <nav className="liquid-glass flex items-center gap-1 rounded-full px-2 py-2 sm:gap-2 sm:px-3">
        <a
          href="#hero"
          data-cursor-hover
          aria-label="Back to top"
          className="flex items-center pl-1.5 pr-2.5 drop-shadow-[0_0_14px_rgba(139,92,246,0.45)]"
        >
          <LogoMark size={30} animated={false} />
        </a>
        <div className="hidden h-6 w-px bg-line sm:block" />
        <div className="flex items-center gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor-hover
              className={cn(
                "rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-ink/75 transition-colors duration-300 hover:text-ink",
                active === item.href && "bg-white/15 text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
