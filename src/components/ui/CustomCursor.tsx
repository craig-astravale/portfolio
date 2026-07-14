"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsCoarsePointer, useReducedMotion } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (isCoarse) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovered(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      transition={reducedMotion ? { duration: 0 } : undefined}
    >
      <motion.div
        className="rounded-full bg-ink"
        animate={{
          width: hovered ? 56 : 10,
          height: hovered ? 56 : 10,
          opacity: hovered ? 0.9 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
      />
    </motion.div>
  );
}
