"use client";

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type p5Types from 'p5';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

export function P5WaveBackground() {
  const canvasParentRef = useRef<HTMLDivElement>(null);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, 300).parent(canvasParentRef);
    p5.noFill();
  };

  const draw = (p5: p5Types) => {
    p5.clear();

    const time = p5.frameCount * 0.01;
    const waves = 3;

    for (let w = 0; w < waves; w++) {
      p5.beginShape();

      // Color gradient del morado al cyan
      const r = p5.lerp(209, 105, w / waves);
      const g = p5.lerp(132, 234, w / waves);
      const b = p5.lerp(255, 255, w / waves);

      p5.stroke(r, g, b, 60);
      p5.strokeWeight(2);

      for (let x = 0; x < p5.width; x += 5) {
        const y = p5.sin((x * 0.01) + time + (w * 2)) * 30 +
                  p5.sin((x * 0.02) + time * 1.5 + (w * 1.5)) * 20 +
                  150 + (w * 30);
        p5.vertex(x, y);
      }

      p5.endShape();
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, 300);
  };

  return (
    <div ref={canvasParentRef} className="absolute inset-x-0 top-0 pointer-events-none opacity-30">
      {typeof window !== 'undefined' && (
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      )}
    </div>
  );
}
