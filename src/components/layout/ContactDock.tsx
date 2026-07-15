"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, X } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/lib/content";
import { useIsCoarsePointer } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

// Width glides open first, then the label condenses in through a soft blur;
// on close the label clears out quickly before the width settles shut.
const linkAnimate = {
  width: "auto",
  opacity: 1,
  filter: "blur(0px)",
  transition: {
    width: { duration: 0.45, ease: EASE },
    opacity: { duration: 0.3, ease: "easeOut" as const, delay: 0.12 },
    filter: { duration: 0.3, ease: "easeOut" as const, delay: 0.12 },
  },
};

// No filter animation on the way out: re-rasterizing a blurred layer while
// the width collapses is what made closing stutter. Fade fast, glide shut.
const linkExit = {
  width: 0,
  opacity: 0,
  transition: {
    width: { duration: 0.4, ease: EASE },
    opacity: { duration: 0.15, ease: "easeIn" as const },
  },
};

const linkInitial = { width: 0, opacity: 0, filter: "blur(4px)" };

export function ContactDock() {
  const [open, setOpen] = useState(false);
  const isCoarse = useIsCoarsePointer();

  // Pointer events instead of mouse events: React's mouseleave misfires when
  // children mount/unmount under the pointer (the expanding links do exactly
  // that). Leave is also handled on the outer strip as a reliable backstop.
  const enterProps = isCoarse
    ? {}
    : { onPointerEnter: () => setOpen(true) };
  const leaveProps = isCoarse
    ? {}
    : { onPointerLeave: () => setOpen(false) };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-8"
      {...leaveProps}
    >
      <div
        className="liquid-glass flex items-center rounded-full p-1.5"
        {...enterProps}
      >
        <AnimatePresence initial={false}>
          {open && (
            <motion.a
              key="email"
              href={`mailto:${profile.email}`}
              data-cursor-hover
              initial={linkInitial}
              animate={linkAnimate}
              exit={linkExit}
              className="overflow-hidden"
            >
              {/* Padding and spacing live inside the clipped wrapper so the
                  animated width can reach a true 0 — no removal jump. */}
              <span className="block pr-1">
                <span className="flex w-max items-center gap-2 rounded-full bg-white/8 py-2.5 pl-4 pr-3 text-sm text-ink transition-colors hover:bg-white/15">
                  <Mail size={16} className="text-cyan" />
                  Email
                </span>
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        <button
          data-cursor-hover
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close contact options" : "Open contact options"}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-600 text-white shadow-inner"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-violet/50 [animation-duration:2.5s]" />
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative"
          >
            {open ? (
              <X size={18} />
            ) : (
              <span className="logo-mask block h-6.5 w-6.5 bg-white" />
            )}
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.a
              key="linkedin"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              initial={linkInitial}
              animate={linkAnimate}
              exit={linkExit}
              className="overflow-hidden"
            >
              <span className="block pl-1">
                <span className="flex w-max items-center gap-2 rounded-full bg-white/8 py-2.5 pl-3 pr-4 text-sm text-ink transition-colors hover:bg-white/15">
                  <LinkedInIcon size={16} className="text-magenta" />
                  LinkedIn
                </span>
              </span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
