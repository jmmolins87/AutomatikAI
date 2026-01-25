"use client";

import { useEffect, useState, useRef, RefObject } from 'react';
import { useInView } from 'framer-motion';

export function useAutoHover<T extends HTMLElement = HTMLDivElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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

  const shouldAutoHover = isTouchDevice && isInView;

  return [ref, shouldAutoHover];
}
