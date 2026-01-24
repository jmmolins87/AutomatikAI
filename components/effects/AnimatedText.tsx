"use client";

import { useEffect, useRef, ReactNode } from 'react';
import { animate, stagger } from 'animejs';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: string | ReactNode;
  variant?: 'fade' | 'wave' | 'letter';
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function AnimatedText({
  children,
  variant = 'fade',
  delay = 0,
  className,
  as: Component = 'p',
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current || typeof children !== 'string') return;

    const text = children;
    textRef.current.innerHTML = '';

    // Crear spans para cada letra
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      textRef.current?.appendChild(span);
    });

    // Animaciones según variante
    switch (variant) {
      case 'letter':
        animate(textRef.current.children, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          delay: stagger(30, { start: delay }),
          ease: 'outExpo',
        });
        break;

      case 'wave':
        animate(textRef.current.children, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1000,
          delay: stagger(50, {
            start: delay,
            from: 'center',
          }),
          ease: 'outElastic(1, .8)',
        });
        break;

      case 'fade':
      default:
        animate(textRef.current.children, {
          opacity: [0, 1],
          duration: 600,
          delay: stagger(20, { start: delay }),
          ease: 'outQuad',
        });
        break;
    }
  }, [children, variant, delay]);

  if (typeof children !== 'string') {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={textRef as any}
      className={cn('inline-block', className)}
    />
  );
}
