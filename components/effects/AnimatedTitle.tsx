"use client";

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  children: string;
  className?: string;
  delay?: number;
}

export function AnimatedTitle({ children, className, delay = 0 }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const textWrapper = titleRef.current;
    textWrapper.innerHTML = '';

    // Dividir en palabras y luego en letras
    const words = children.split(' ');
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';
      wordSpan.style.marginRight = '0.3em';

      word.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px) scale(0.8)';
        wordSpan.appendChild(span);
      });

      textWrapper.appendChild(wordSpan);
    });

    // Animar todas las letras
    animate(textWrapper.querySelectorAll('span span'), {
      translateY: [50, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [10, 0],
      duration: 1200,
      delay: (el, i) => delay + i * 30,
      ease: 'spring(1, 80, 10, 0)',
    });
  }, [children, delay]);

  return (
    <h2
      ref={titleRef}
      className={cn('font-bold', className)}
    />
  );
}
