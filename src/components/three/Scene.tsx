"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GlassCore } from "./GlassCore";
import { useIsCoarsePointer, useReducedMotion } from "@/hooks/useMediaQuery";

export function Scene() {
  const isCoarse = useIsCoarsePointer();
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, isCoarse ? 1.5 : 2]}
      camera={{ position: [0, 0, 5.5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <GlassCore interactive={!isCoarse} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
