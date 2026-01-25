"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { colors as siteColors } from '@/lib/colors';

function AnimatedPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const scrollFactor = scrollY.current * 0.0002;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05 + scrollFactor;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075 + scrollFactor * 0.5;
      pointsRef.current.rotation.z = scrollFactor * 0.3;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={siteColors.purpleAlt}
        size={0.11}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 0.38 : 0.22}
      />
    </Points>
  );
}

export function NetworkGrid() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <AnimatedPoints />
      </Canvas>
    </div>
  );
}
