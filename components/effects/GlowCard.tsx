"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/design-system';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'gradient';
  animated?: boolean;
  active?: boolean; // Nuevo: fuerza el efecto visual de hover
}

const glowStyles = {
  purple: 'glow-on-hover-purple',
  cyan: 'glow-on-hover-cyan',
  gradient: 'glow-on-hover-gradient',
};

const borderGlow = {
  purple: 'hover:border-primary/50',
  cyan: 'hover:border-chart-2/50',
  gradient: 'hover:border-primary/50',
};
export function GlowCard({
  children,
  className,
  glowColor = 'gradient',
  animated = true,
  active = false,
}: GlowCardProps) {
  const CardWrapper = animated ? motion.div : 'div';

  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: {
          duration: animations.durations.normal,
          ease: animations.easings.smooth,
        },
        whileHover: {
          scale: 1.02,
          transition: { duration: animations.durations.fast },
        },
      }
    : {};

  return (
    <CardWrapper {...motionProps}>
      <Card
        className={cn(
          'relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50',
          'transition-all duration-300',
          glowStyles[glowColor],
          borderGlow[glowColor],
          className
        )}
      >
        {/* Gradiente de fondo sutil */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500 pointer-events-none",
            active ? "opacity-100" : "opacity-0 hover:opacity-100"
          )}
          style={{
            background:
                  glowColor === 'purple'
                    ? 'radial-gradient(circle at 50% 0%, var(--color-purple-05) 0%, transparent 70%)'
                    : glowColor === 'cyan'
                    ? 'radial-gradient(circle at 50% 0%, var(--color-cyan-05) 0%, transparent 70%)'
                    : 'radial-gradient(circle at 50% 0%, var(--color-purple-05) 0%, var(--color-cyan-03) 50%, transparent 70%)',
          }}
        />
        <div className="relative z-10">{children}</div>
      </Card>
    </CardWrapper>
  );
}
