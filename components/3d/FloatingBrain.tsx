"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { colors as siteColors } from '@/lib/colors';

function AnimatedBrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const scrollFactor = scrollY.current * 0.0005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + scrollFactor) * 0.2;
      meshRef.current.rotation.y += 0.005 + scrollFactor * 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + scrollFactor) * 0.3;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2 + scrollFactor) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color={siteColors.purpleAlt}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 0.22 : 0.10}
      />
    </Sphere>
  );
}

export function FloatingBrain() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={siteColors.purple} />
        <AnimatedBrain />
      </Canvas>
    </div>
  );
}
