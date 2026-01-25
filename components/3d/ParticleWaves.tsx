"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { colors as siteColors } from '@/lib/colors';

function WaveParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 50 * 50;
    const positions = new Float32Array(count * 3);

    let i = 0;
    for (let xi = 0; xi < 50; xi++) {
      for (let zi = 0; zi < 50; zi++) {
        positions[i * 3] = xi * 0.2 - 5;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = zi * 0.2 - 5;
        i++;
      }
    }

    return { positions, count };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      let i = 0;
      for (let xi = 0; xi < 50; xi++) {
        for (let zi = 0; zi < 50; zi++) {
          positions[i * 3 + 1] = Math.sin(xi * 0.3 + state.clock.elapsedTime) *
                                 Math.cos(zi * 0.3 + state.clock.elapsedTime) * 0.5;
          i++;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={siteColors.purpleAlt}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleWaves() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <WaveParticles />
      </Canvas>
    </div>
  );
}
