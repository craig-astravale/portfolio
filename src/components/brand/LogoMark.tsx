"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ASPECT = 583 / 668;

export function LogoMark({
  size = 40,
  className,
  animated = true,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <motion.div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size / ASPECT }}
      initial={animated ? { opacity: 0, scale: 0.85 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      data-cursor-hover
    >
      <div className="logo-mask absolute inset-0 bg-ink/90" />
      <div
        className="logo-mask logo-shine absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.95) 47%, var(--violet) 51%, var(--cyan) 55%, transparent 68%)",
        }}
      />
    </motion.div>
  );
}
