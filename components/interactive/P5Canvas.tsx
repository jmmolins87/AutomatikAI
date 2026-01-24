"use client";

import { useEffect, useRef } from 'react';
import { p5Config } from '@/lib/design-system';

interface P5CanvasProps {
  variant?: 'trail' | 'generative';
  className?: string;
}

export function P5Canvas({ variant = 'trail', className = '' }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Dynamic import de p5 solo en el cliente
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        const trail: Array<{ x: number; y: number; alpha: number }> = [];

        p.setup = () => {
          const canvas = p.createCanvas(
            containerRef.current?.clientWidth || window.innerWidth,
            containerRef.current?.clientHeight || window.innerHeight
          );
          if (containerRef.current) {
            canvas.parent(containerRef.current);
          }
          p.background(0, 0);
        };

        p.draw = () => {
          if (variant === 'trail') {
            // Efecto de trail del mouse
            p.clear();
            p.background(0, 0);

            // Agregar posición actual del mouse
            if (p.mouseX > 0 && p.mouseY > 0) {
              trail.push({
                x: p.mouseX,
                y: p.mouseY,
                alpha: 255,
              });
            }

            // Limitar longitud del trail
            if (trail.length > p5Config.trail.length) {
              trail.shift();
            }

            // Dibujar trail con gradiente
            for (let i = 0; i < trail.length; i++) {
              const point = trail[i];
              const progress = i / trail.length;

              // Fade alpha
              point.alpha -= p5Config.trail.fadeSpeed;

              // Color interpolado entre morado y cyan
              const r = p.lerp(
                p5Config.colors.purple[0],
                p5Config.colors.cyan[0],
                progress
              );
              const g = p.lerp(
                p5Config.colors.purple[1],
                p5Config.colors.cyan[1],
                progress
              );
              const b = p.lerp(
                p5Config.colors.purple[2],
                p5Config.colors.cyan[2],
                progress
              );

              p.stroke(r, g, b, point.alpha);
              p.strokeWeight(p5Config.trail.strokeWeight * (progress + 0.5));
              p.noFill();

              if (i > 0) {
                p.line(trail[i - 1].x, trail[i - 1].y, point.x, point.y);
              }
            }
          } else if (variant === 'generative') {
            // Arte generativo de fondo
            p.background(0, 5);

            const time = p.frameCount * 0.01;
            const cols = 20;
            const rows = 20;
            const spacing = p.width / cols;

            for (let i = 0; i < cols; i++) {
              for (let j = 0; j < rows; j++) {
                const x = i * spacing;
                const y = j * spacing;

                const noise = p.noise(i * 0.1, j * 0.1, time);
                const angle = noise * p.TWO_PI * 2;

                const progress = noise;
                const r = p.lerp(
                  p5Config.colors.purple[0],
                  p5Config.colors.cyan[0],
                  progress
                );
                const g = p.lerp(
                  p5Config.colors.purple[1],
                  p5Config.colors.cyan[1],
                  progress
                );
                const b = p.lerp(
                  p5Config.colors.purple[2],
                  p5Config.colors.cyan[2],
                  progress
                );

                p.stroke(r, g, b, 50);
                p.strokeWeight(1);
                p.push();
                p.translate(x, y);
                p.rotate(angle);
                p.line(0, 0, spacing * 0.5, 0);
                p.pop();
              }
            }
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(
            containerRef.current?.clientWidth || window.innerWidth,
            containerRef.current?.clientHeight || window.innerHeight
          );
        };
      };

      p5Instance.current = new p5(sketch);
    });

    return () => {
      p5Instance.current?.remove();
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
}
