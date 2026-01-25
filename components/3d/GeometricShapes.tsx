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
    const scrollFactor = scrollY.current * 0.001;

    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01 + scrollFactor * 0.1;
      boxRef.current.rotation.y += 0.01 + scrollFactor * 0.05;
      boxRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5 + scrollFactor) * 2;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3 + scrollFactor) * 1;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.02 + scrollFactor * 0.08;
      torusRef.current.rotation.z += 0.01 + scrollFactor * 0.03;
      torusRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5 + scrollFactor) * 1.5;
      torusRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.4 + scrollFactor) * 1;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += 0.015 + scrollFactor * 0.06;
      octaRef.current.rotation.z += 0.01 + scrollFactor * 0.04;
      octaRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5 + scrollFactor) * 2;
      octaRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.6 + scrollFactor) * 1;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} position={[-2, 1, 0]}>
        <meshStandardMaterial color={siteColors.indigo} metalness={0.6} roughness={0.2} />
      </Box>
      <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color={siteColors.purple} metalness={0.7} roughness={0.3} />
      </Torus>
      <Octahedron ref={octaRef} args={[1, 0]} position={[2, 0.5, 0]}>
        <meshStandardMaterial color={siteColors.purpleAlt} metalness={0.5} roughness={0.4} />
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
