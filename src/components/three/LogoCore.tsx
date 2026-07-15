"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { LOGO_CIRCLES, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logoPath";

const LOGO_HEIGHT = 668;
const WORLD_HEIGHT = 2.15;
const SCALE = WORLD_HEIGHT / LOGO_HEIGHT;

function useGlowTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(168,130,255,0.95)");
    gradient.addColorStop(0.4, "rgba(100,70,200,0.4)");
    gradient.addColorStop(0.75, "rgba(53,230,214,0.08)");
    gradient.addColorStop(1, "rgba(20,10,40,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);
}

function useLogoGeometry() {
  return useMemo(() => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">` +
      LOGO_PATHS.map((d) => `<path d="${d}"/>`).join("") +
      LOGO_CIRCLES.map(
        (c) => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}"/>`
      ).join("") +
      `</svg>`;

    const { paths } = new SVGLoader().parse(svg);
    const shapes = paths.flatMap((path) => SVGLoader.createShapes(path));

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 72,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 7,
      bevelSize: 6,
      bevelSegments: 2,
    });
    geometry.center();
    // SVG space is y-down; a half-turn around X stands the mark upright
    // without mirroring it or flipping face winding.
    geometry.rotateX(Math.PI);
    geometry.scale(SCALE, SCALE, SCALE);
    return geometry;
  }, []);
}

function OrbitRings({ reducedMotion }: { reducedMotion: boolean }) {
  const rings = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !rings.current) return;
    // Clamp so resuming from a paused frameloop doesn't jump the rings.
    rings.current.rotation.y += Math.min(delta, 0.1) * 0.12;
  });

  return (
    <group ref={rings}>
      <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
        <torusGeometry args={[1.7, 0.008, 8, 128]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, 0.4, -0.5]}>
        <torusGeometry args={[1.95, 0.006, 8, 128]} />
        <meshBasicMaterial
          color="#35e6d6"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function LogoCore({
  interactive = true,
  reducedMotion = false,
}: {
  interactive?: boolean;
  reducedMotion?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const logo = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const geometry = useLogoGeometry();
  const glowTexture = useGlowTexture();

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    if (logo.current) {
      logo.current.rotation.y = Math.sin(t * 0.28) * 0.5;
      logo.current.rotation.x = Math.sin(t * 0.2) * 0.06;
    }
    if (shell.current) {
      shell.current.rotation.y -= Math.min(delta, 0.1) * 0.08;
    }

    if (group.current) {
      const targetX = interactive ? state.pointer.y * 0.2 : 0;
      const targetY = interactive ? state.pointer.x * 0.3 : 0;
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
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.15}
        floatIntensity={reducedMotion ? 0 : 0.5}
      >
        <group ref={logo} rotation={reducedMotion ? [0, 0.25, 0] : undefined}>
          <mesh geometry={geometry}>
            {/* Glossy iridescent physical material: reads like glass under the
                lightformer env without transmission's per-frame buffer render. */}
            <meshPhysicalMaterial
              color="#6f52e8"
              metalness={0.4}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.3}
              iridescence={0.85}
              iridescenceIOR={1.4}
              emissive="#1b1040"
              emissiveIntensity={0.5}
              envMapIntensity={1.6}
            />
          </mesh>
        </group>
      </Float>

      <OrbitRings reducedMotion={reducedMotion} />

      <mesh position={[0.25, 0.1, -2.8]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={shell} scale={1.55}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <pointLight position={[3, 2, 4]} intensity={30} color="#8b5cf6" />
      <pointLight position={[-3, -2, 3]} intensity={22} color="#35e6d6" />

      <Sparkles
        count={reducedMotion ? 20 : 40}
        scale={[5.5, 5.5, 5.5]}
        size={2}
        speed={reducedMotion ? 0.05 : 0.25}
        opacity={0.5}
        color="#c9bfff"
      />

      <Environment resolution={256} frames={1}>
        <Lightformer
          intensity={3}
          color="#8b5cf6"
          position={[4, 2, 5]}
          scale={[5, 5, 1]}
        />
        <Lightformer
          intensity={2.5}
          color="#35e6d6"
          position={[-5, -1, 4]}
          scale={[4, 6, 1]}
        />
        <Lightformer
          form="circle"
          intensity={2}
          color="#ff4fa3"
          position={[0, 5, -4]}
          scale={4}
        />
        <Lightformer
          intensity={1.2}
          color="#ffffff"
          position={[0, -4, 2]}
          scale={[8, 2, 1]}
        />
      </Environment>
    </group>
  );
}
