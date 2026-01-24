"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

function RotatingShapes() {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
      boxRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.02;
      torusRef.current.rotation.z += 0.01;
      torusRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 1.5;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y += 0.015;
      octaRef.current.rotation.z += 0.01;
      octaRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <>
      <Box ref={boxRef} args={[1, 1, 1]} position={[-2, 1, 0]}>
        <meshStandardMaterial color="#8b5cf6" metalness={0.6} roughness={0.2} />
      </Box>
      <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#d184ff" metalness={0.7} roughness={0.3} />
      </Torus>
      <Octahedron ref={octaRef} args={[1, 0]} position={[2, 0.5, 0]}>
        <meshStandardMaterial color="#a855f7" metalness={0.5} roughness={0.4} />
      </Octahedron>
    </>
  );
}

export function GeometricShapes() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, 0, -5]} intensity={0.5} color="#d184ff" />
        <RotatingShapes />
      </Canvas>
    </div>
  );
}
