"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { LogoCore } from "./LogoCore";
import { useIsCoarsePointer, useReducedMotion } from "@/hooks/useMediaQuery";

export function Scene() {
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="h-full w-full">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 35 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <LogoCore interactive={!isCoarse} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
