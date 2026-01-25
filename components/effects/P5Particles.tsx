"use client";

import { useRef } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: number[];
}

let particles: Particle[] = [];

export function P5Particles() {
  const canvasParentRef = useRef<HTMLDivElement>(null);

  const setup = (p5: any, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    // Crear partículas
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        vx: p5.random(-0.5, 0.5),
        vy: p5.random(-0.5, 0.5),
        size: p5.random(2, 8),
        color: [
          p5.lerp(209, 105, p5.random()),
          p5.lerp(132, 234, p5.random()),
          255
        ]
      });
    }
  };

  const draw = (p5: any) => {
    p5.clear();

    // Dibujar y actualizar partículas
    particles.forEach((p, i) => {
      // Movimiento
      p.x += p.vx;
      p.y += p.vy;

      // Rebotar en bordes
      if (p.x < 0 || p.x > p5.width) p.vx *= -1;
      if (p.y < 0 || p.y > p5.height) p.vy *= -1;

      // Dibujar partícula
      p5.noStroke();
      p5.fill(p.color[0], p.color[1], p.color[2], 150);
      p5.circle(p.x, p.y, p.size);

      // Conectar partículas cercanas
      particles.forEach((p2, j) => {
        if (i !== j) {
          const d = p5.dist(p.x, p.y, p2.x, p2.y);
          if (d < 100) {
            p5.stroke(p.color[0], p.color[1], p.color[2], p5.map(d, 0, 100, 100, 0));
            p5.strokeWeight(1);
            p5.line(p.x, p.y, p2.x, p2.y);
          }
        }
      });
    });
  };

  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <div ref={canvasParentRef} className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
      {typeof window !== 'undefined' && (
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      )}
    </div>
  );
}
