"use client";

import { useEffect, useState, useRef, RefObject } from 'react';
import { useInView } from 'framer-motion';

export function useAutoHover<T extends HTMLElement = HTMLDivElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const element = ref.current;
    if (!element || !isTouchDevice) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  const shouldAutoHover = isTouchDevice && isInView && !isHovered;

  return [ref, shouldAutoHover];
}
