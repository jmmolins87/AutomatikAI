"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, Animation } from 'animejs';
import { animations, spacing } from '@/lib/design-system';

const stats = [
  { value: 500, suffix: '+', label: 'Proyectos Exitosos' },
  { value: 98, suffix: '%', label: 'Satisfacción del Cliente' },
  { value: 250, suffix: '%', label: 'ROI Promedio' },
  { value: 50, suffix: '+', label: 'Clientes Activos' },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);

          // Animar contadores
          stats.forEach((stat, index) => {
            const element = document.querySelector(`#stat-${index}`) as HTMLElement;
            if (element) {
              let current = 0;
              const target = stat.value;
              const duration = 2000;
              const start = Date.now();

              const animate = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.round(target * progress);
                element.innerHTML = current.toString();

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  element.innerHTML = target.toString();
                }
              };

              animate();
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={statsRef}
      className="relative py-20 md:py-32 border-y border-border/50"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                delay: index * animations.stagger.fast,
                duration: animations.durations.normal,
              }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
                <span id={`stat-${index}`} className="gradient-ia">
                  0
                </span>
                <span className="gradient-ia">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
