"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import * as THREE from 'three';
import { colors } from '@/lib/design-system';
import { useEffect, useState } from 'react';

type GeometryType = 'sphere' | 'torus' | 'box';

interface FloatingMeshProps {
  geometry: GeometryType;
  color: number;
  position?: [number, number, number];
}

function FloatingMesh({ geometry, color, position = [0, 0, 0], opacity = 0.22, metalness = 0.7, roughness = 0.25 }: FloatingMeshProps & { opacity?: number, metalness?: number, roughness?: number }) {
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
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const scrollFactor = scrollY.current * 0.0005; // restaurar velocidad original

    // Rotación automática con influencia del scroll
    meshRef.current.rotation.x = time * 0.3 + scrollFactor;
    meshRef.current.rotation.y = time * 0.2 + scrollFactor * 0.5;

    // Movimiento flotante influenciado por el scroll
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + scrollFactor) * 0.3;
    meshRef.current.position.x = position[0] + Math.cos(time * 0.4 + scrollFactor) * 0.2;
  });

  const geometryComponent = {
    sphere: (
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.12}
          speed={1.2}
          roughness={roughness}
          metalness={metalness}
          transparent
          opacity={opacity}
        />
      </Sphere>
    ),
    torus: (
      <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.09}
          speed={1.2}
          roughness={roughness}
          metalness={metalness}
          transparent
          opacity={opacity}
        />
      </Torus>
    ),
    box: (
      <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.15}
          speed={1.2}
          roughness={roughness}
          metalness={metalness}
          transparent
          opacity={opacity}
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
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkTheme = () => {
        setIsLight(!document.documentElement.classList.contains('dark'));
      };
      checkTheme();
      window.addEventListener('themechange', checkTheme);
      return () => window.removeEventListener('themechange', checkTheme);
    }
  }, []);

  // Parámetros más sutiles para light y para agentes autónomos (torus cyan)
  let opacity = 0.22;
  let metalness = 0.7;
  let roughness = 0.25;
  if (isLight) {
    opacity = colorVariant === 'cyan' && geometry === 'torus' ? 0.10 : 0.14;
    metalness = 0.5;
    roughness = 0.35;
  } else if (colorVariant === 'cyan' && geometry === 'torus') {
    opacity = 0.16;
    metalness = 0.6;
    roughness = 0.3;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={colors.hex.cyan} />
        <FloatingMesh geometry={geometry} color={color} opacity={opacity} metalness={metalness} roughness={roughness} />
      </Canvas>
    </div>
  );
}
