"use client";

import { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useInView } from 'framer-motion';
import { colors as siteColors } from '@/lib/colors';

interface ScrollAnimatedSVGProps {
  paths: string[];
  className?: string;
  strokeColor?: string;
}

export function ScrollAnimatedSVG({
  paths,
  className = '',
  strokeColor = siteColors.purple
}: ScrollAnimatedSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!svgRef.current) return;

    const pathElements = svgRef.current.querySelectorAll('path');

    if (isInView) {
      // Animar paths cuando entran en vista
      anime({
        targets: pathElements,
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 2000,
        delay: (el: any, i: number) => i * 200,
        easing: 'easeOutExpo',
      });

      // Animar fill después del stroke
      anime({
        targets: pathElements,
        fillOpacity: [0, 0.2],
        duration: 1000,
        delay: 2000,
        easing: 'easeOutQuad',
      });
    } else {
      // Reset cuando sale de vista
      anime({
        targets: pathElements,
        strokeDashoffset: anime.setDashoffset,
        opacity: 0,
        fillOpacity: 0,
        duration: 500,
        easing: 'easeInQuad',
      });
    }
  }, [isInView]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke={strokeColor}
          strokeWidth="2"
          fill={strokeColor}
          fillOpacity="0"
          opacity="0"
        />
      ))}
    </svg>
  );
}
