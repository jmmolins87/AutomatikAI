"use client";

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { threeConfig, colors } from '@/lib/design-system';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generar posiciones aleatorias de partículas
  const particles = useMemo(() => {
    const positions = new Float32Array(threeConfig.particles.count * 3);

    for (let i = 0; i < threeConfig.particles.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  // Colores alternados entre morado y cyan
  const colors_array = useMemo(() => {
    const colorArray = new Float32Array(threeConfig.particles.count * 3);

    for (let i = 0; i < threeConfig.particles.count; i++) {
      const color = i % 2 === 0
        ? new THREE.Color(colors.hex.purple)
        : new THREE.Color(colors.hex.cyan);

      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    return colorArray;
  }, []);

  // Seguimiento del mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animación de partículas
  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();

    // Rotación suave
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.075;

    // Seguimiento suave del mouse
    ref.current.rotation.x += mousePosition.current.y * 0.05;
    ref.current.rotation.y += mousePosition.current.x * 0.05;

    // Animación de posiciones
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] = Math.sin(time + positions[i]) * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={threeConfig.particles.size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        count={colors_array.length / 3}
        array={colors_array}
        itemSize={3}
      />
    </Points>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{
          position: [
            threeConfig.camera.position.x,
            threeConfig.camera.position.y,
            threeConfig.camera.position.z,
          ],
          fov: threeConfig.camera.fov,
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
