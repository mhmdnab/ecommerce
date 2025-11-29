"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const PARTICLE_COUNT = 500;
const SPREAD = 10;

// Generate positions ONCE
const POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
    arr[i] = (Math.random() - 0.5) * SPREAD;
  }
  return arr;
})();

function Particles({
  mouse,
}: {
  mouse: React.MutableRefObject<[number, number]>;
}) {
  const ref = useRef<THREE.Points>(null);
  let frame = 0;

  useFrame(() => {
    if (!ref.current) return;

    frame++;
    if (frame % 2 !== 0) return; // throttle for performance

    const geo = ref.current.geometry;
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const x = positions[i3];
      const y = positions[i3 + 1];

      const dx = mouse.current[0] - x;
      const dy = mouse.current[1] - y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only move particles that are CLOSE to mouse (no runaway)
      if (dist < 1.2) {
        // → swirl perpendicular to the direction
        const swirlX = -dy * 0.05;
        const swirlY = dx * 0.05;

        positions[i3] += swirlX;
        positions[i3 + 1] += swirlY;
      }

      // Add stable micro-floating (keeps shape alive)
      positions[i3] += Math.sin(i + frame * 0.005) * 0.002;
      positions[i3 + 1] += Math.cos(i + frame * 0.005) * 0.002;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ffffff"
        opacity={0.9}
        transparent
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticlesScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        onPointerMove={(e) => {
          // Convert to -1 → +1 normalized coords
          mouse.current = [
            (e.clientX / window.innerWidth - 0.5) * 5,
            -(e.clientY / window.innerHeight - 0.5) * 5,
          ];
        }}
      >
        <ambientLight intensity={0.2} />
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}
