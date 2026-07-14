"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, X } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { profile } from "@/lib/content";
import { useIsCoarsePointer } from "@/hooks/useMediaQuery";

export function ContactDock() {
  const [open, setOpen] = useState(false);
  const isCoarse = useIsCoarsePointer();

  const hoverProps = isCoarse
    ? {}
    : {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:bottom-8"
      {...hoverProps}
    >
      <motion.div
        layout
        className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-[0_12px_50px_-14px_rgba(139,92,246,0.5)]"
      >
        <AnimatePresence initial={false}>
          {open && (
            <motion.a
              key="email"
              href={`mailto:${profile.email}`}
              data-cursor-hover
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white/5 py-2.5 pl-4 pr-3 text-sm text-ink hover:bg-white/10"
            >
              <Mail size={16} className="text-cyan" />
              Email
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
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {open ? <X size={18} /> : <Mail size={18} />}
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
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-white/5 py-2.5 pl-3 pr-4 text-sm text-ink hover:bg-white/10"
            >
              <LinkedInIcon size={16} className="text-magenta" />
              LinkedIn
            </motion.a>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
