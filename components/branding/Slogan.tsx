"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/design-system';

interface SloganProps {
  className?: string;
  typingEffect?: boolean;
}

export function Slogan({ className, typingEffect = true }: SloganProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsVisible(true);

    if (typingEffect && textRef.current) {
      // Reset text
      textRef.current.innerHTML = '';
      const text = 'Artificial intelligence.';

      // Create spans for each character
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        textRef.current?.appendChild(span);
      });

      // Animate typing effect
      animate(textRef.current.children, {
        opacity: [0, 1],
        duration: 50,
        delay: stagger(50, { start: 800 }),
        ease: 'outExpo',
      });
    }
  }, [typingEffect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: animations.durations.normal, ease: animations.easings.smooth }}
      className={cn('text-center', className)}
    >
      <p className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground">
        <span className="text-foreground font-semibold">Human strategy.</span>{' '}
        <span
          ref={textRef}
          className="text-primary font-semibold"
        >
          {!typingEffect && 'Artificial intelligence.'}
        </span>
      </p>
    </motion.div>
  );
}
