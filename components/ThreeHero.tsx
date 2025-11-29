"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function ThreeHero() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
          <mesh>
            <torusGeometry args={[1.5, 0.3, 32, 100]} />
            <meshStandardMaterial
              color="#6c5ce7"
              emissive="#6c5ce7"
              emissiveIntensity={0.7}
            />
          </mesh>
        </Float>

        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.5} />
      </Canvas>
    </div>
  );
}
