"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { colors as siteColors } from '@/lib/colors';

function RotatingShapes() {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const scrollFactor = scrollY.current * 0.0003; // mucho más lento

    if (boxRef.current) {
      boxRef.current.rotation.x += 0.0025 + scrollFactor * 0.02;
      boxRef.current.rotation.y += 0.0025 + scrollFactor * 0.01;
      boxRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.12 + scrollFactor) * 0.5;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.08 + scrollFactor) * 0.25;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.004 + scrollFactor * 0.015;
      torusRef.current.rotation.z += 0.002 + scrollFactor * 0.008;
      torusRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.13 + scrollFactor) * 0.35;
      torusRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.09 + scrollFactor) * 0.18;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += 0.003 + scrollFactor * 0.012;
      octaRef.current.rotation.z += 0.002 + scrollFactor * 0.008;
      octaRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.11 + scrollFactor) * 0.5;
      octaRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.14 + scrollFactor) * 0.22;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} position={[-2, 1, 0]}>
        <meshStandardMaterial color={siteColors.indigo} metalness={0.6} roughness={0.2} transparent opacity={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 0.25 : 0.12} />
      </Box>
      <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color={siteColors.purple} metalness={0.7} roughness={0.3} transparent opacity={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 0.22 : 0.10} />
      </Torus>
      <Octahedron ref={octaRef} args={[1, 0]} position={[2, 0.5, 0]}>
        <meshStandardMaterial color={siteColors.purpleAlt} metalness={0.5} roughness={0.4} transparent opacity={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 0.18 : 0.08} />
      </Octahedron>
    </>
  );
}

export function GeometricShapes() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 0, -5]} intensity={0.5} color={siteColors.purple} />
        <RotatingShapes />
      </Canvas>
    </div>
  );
}
