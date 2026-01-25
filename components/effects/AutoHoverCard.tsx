"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AutoHoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverClassName?: string;
}

export function AutoHoverCard({ children, className = '', hoverClassName = '' }: AutoHoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo táctil
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    setIsTouchDevice(checkTouchDevice());
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isTouchDevice && isInView ? hoverClassName : ''}`}
    >
      {children}
    </div>
  );
}
