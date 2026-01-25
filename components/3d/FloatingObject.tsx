"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import { colors } from '@/lib/design-system';

type GeometryType = 'sphere' | 'torus' | 'box';

interface FloatingMeshProps {
  geometry: GeometryType;
  color: number;
  position?: [number, number, number];
}

function FloatingMesh({ geometry, color, position = [0, 0, 0] }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotación automática
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;

    // Movimiento flotante
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
  });

  const geometryComponent = {
    sphere: (
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    ),
    torus: (
      <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Torus>
    ),
    box: (
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Box>
    ),
  };

  return geometryComponent[geometry];
}

interface FloatingObjectProps {
  geometry?: GeometryType;
  colorVariant?: 'purple' | 'cyan';
  className?: string;
}

export function FloatingObject({
  geometry = 'sphere',
  colorVariant = 'purple',
  className = '',
}: FloatingObjectProps) {
  const color = colorVariant === 'purple' ? colors.hex.purple : colors.hex.cyan;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={colors.hex.cyan} />
        <FloatingMesh geometry={geometry} color={color} />
      </Canvas>
    </div>
  );
}
