"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const ParticleSphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // transparent background
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 7000; // a bit lighter than 8000
    const positions = new Float32Array(particlesCount * 3);

    const radius = 2.2;

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // You can change this to ANY color you want
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: new THREE.Color("#d6d6d6"),
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(geometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth rotation
      particlesMesh.rotation.y = elapsed * 0.1;
      particlesMesh.rotation.x = elapsed * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!mount) return;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-70"
      aria-hidden="true"
    />
  );
};

export default ParticleSphere;
