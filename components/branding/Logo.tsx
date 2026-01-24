"use client";

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';
import { colors, typography } from '@/lib/design-system';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: typography.sizes.logo.sm,
  md: typography.sizes.logo.md,
  lg: typography.sizes.logo.lg,
  xl: typography.sizes.logo.xl,
};

export function Logo({ size = 'md', animated = true, className }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    // Animación de entrada
    animate(logoRef.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
      ease: 'outExpo',
    });

    // Animación de glow pulsante en hover
    const handleMouseEnter = () => {
      const target = logoRef.current?.querySelector('.logo-ia');
      if (!target) return;

      animate(target, {
        textShadow: [
          '0 0 10px rgba(209, 132, 255, 0.5)',
          '0 0 30px rgba(209, 132, 255, 0.8), 0 0 40px rgba(105, 234, 255, 0.6)',
        ],
        duration: 600,
        ease: 'inOutQuad',
      });
    };

    const handleMouseLeave = () => {
      const target = logoRef.current?.querySelector('.logo-ia');
      if (!target) return;

      animate(target, {
        textShadow: '0 0 10px rgba(209, 132, 255, 0.5)',
        duration: 600,
        ease: 'inOutQuad',
      });
    };

    const logoElement = logoRef.current;
    logoElement.addEventListener('mouseenter', handleMouseEnter);
    logoElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      logoElement.removeEventListener('mouseenter', handleMouseEnter);
      logoElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animated]);

  return (
    <div
      ref={logoRef}
      className={cn(
        'inline-flex items-center font-bold tracking-tight cursor-pointer transition-transform hover:scale-105',
        className
      )}
      style={{ fontSize: sizeStyles[size] }}
    >
      <span className="text-foreground">j.mar</span>
      <span
        className="logo-ia gradient-ia font-black"
        style={{
          background: colors.gradient.ia,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 10px rgba(209, 132, 255, 0.5)',
        }}
      >
        IA
      </span>
    </div>
  );
}
