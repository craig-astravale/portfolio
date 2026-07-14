"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function GlassCore({
  interactive = true,
  reducedMotion = false,
}: {
  interactive?: boolean;
  reducedMotion?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (core.current) {
      core.current.rotation.y += delta * 0.15;
      core.current.rotation.x += delta * 0.05;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08;
    }

    if (group.current) {
      const targetX = interactive ? state.pointer.y * 0.25 : 0;
      const targetY = interactive ? state.pointer.x * 0.35 : 0;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetX,
        0.04
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetY,
        0.04
      );
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.3, 12]} />
        <MeshDistortMaterial
          color="#c9bfff"
          distort={reducedMotion ? 0.15 : 0.35}
          speed={reducedMotion ? 0.4 : 1.6}
          roughness={0.08}
          metalness={0.1}
          transmission={0.85}
          thickness={1.4}
          ior={1.3}
          clearcoat={1}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      <pointLight position={[3, 2, 4]} intensity={40} color="#8b5cf6" />
      <pointLight position={[-3, -2, 3]} intensity={30} color="#35e6d6" />
      <pointLight position={[0, 3, -3]} intensity={18} color="#ff4fa3" />

      <Sparkles
        count={reducedMotion ? 20 : 60}
        scale={[5, 5, 5]}
        size={2}
        speed={reducedMotion ? 0.05 : 0.25}
        opacity={0.5}
        color="#c9bfff"
      />
    </group>
  );
}
