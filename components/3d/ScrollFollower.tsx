"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Box, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { colors } from "@/lib/design-system";

const shapes = ["sphere", "torus", "box"] as const;
type Shape = typeof shapes[number];

function FollowerMesh({ shape, color }: { shape: Shape; color: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Movimiento horizontal y vertical según scroll
    meshRef.current.position.x = Math.sin(t * 0.5) * 2 + (scroll % 200) / 100 - 1;
    meshRef.current.position.y = Math.cos(t * 0.3) * 1.5 + (scroll % 300) / 150 - 1;
    meshRef.current.rotation.x = t * 0.3 + scroll * 0.0002;
    meshRef.current.rotation.y = t * 0.2 + scroll * 0.0001;
  });

  const meshProps = {
    ref: meshRef,
    scale: 1.5,
  };

  switch (shape) {
    case "sphere":
      return (
        <Sphere {...meshProps} args={[1, 64, 64]}>
          <MeshDistortMaterial color={color} distort={0.3} speed={2} opacity={0.18} transparent />
        </Sphere>
      );
    case "torus":
      return (
        <Torus {...meshProps} args={[1, 0.4, 32, 64]}>
          <MeshDistortMaterial color={color} distort={0.2} speed={2} opacity={0.14} transparent />
        </Torus>
      );
    case "box":
      return (
        <Box {...meshProps} args={[1.5, 1.5, 1.5]}>
          <MeshDistortMaterial color={color} distort={0.4} speed={2} opacity={0.12} transparent />
        </Box>
      );
    default:
      return null;
  }
}

export function ScrollFollower() {
  // Mantener la misma forma (esfera) y color principal
  const shape: Shape = "sphere";
  const color: number = colors.hex.purple;

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <FollowerMesh shape={shape} color={color} />
      </Canvas>
    </div>
  );
}
