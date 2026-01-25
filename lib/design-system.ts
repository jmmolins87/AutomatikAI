/**
 * Sistema de Diseño Centralizado - j.marIA Agency
 * Colores, gradientes, animaciones y constantes de diseño
 */

import { colors as baseColors, gradients as baseGradients, hexToRgba } from '@/lib/colors';

export const colors = {
  // Colores principales (centralizados)
  purple: baseColors.purple,
  cyan: baseColors.cyan,

  // Gradientes precompuestos
  gradient: {
    ia: baseGradients.ia,
    iaReverse: baseGradients.iaReverse,
    background: baseGradients.background,
    backgroundCyan: baseGradients.backgroundCyan,
    subtle: baseGradients.subtle,
  },

  // Colores RGB para efectos (Three.js, Canvas, etc.)
  rgb: {
    purple: { r: 209, g: 132, b: 255 },
    cyan: { r: 105, g: 234, b: 255 },
  },

  // Colores Hex para efectos (números para Three.js)
  hex: {
    purple: Number('0x' + baseColors.purple.replace('#', '')) as number,
    cyan: Number('0x' + baseColors.cyan.replace('#', '')) as number,
  },
} as const;

export const animations = {
  // Duraciones (en segundos)
  durations: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2.0,
  },

  // Easings para Framer Motion
  easings: {
    smooth: [0.43, 0.13, 0.23, 0.96],
    bounce: [0.68, -0.55, 0.265, 1.55],
    easeOut: [0.16, 1, 0.3, 1],
    easeIn: [0.7, 0, 0.84, 0],
  },

  // Stagger para animaciones secuenciales
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
} as const;

export const spacing = {
  section: {
    xs: 'var(--spacing-2xl)',
    sm: 'var(--spacing-3xl)',
    md: 'var(--spacing-4xl)',
    lg: '10rem',
    xl: '12rem',
  },
  container: {
    maxWidth: '1440px',
    padding: {
      mobile: 'var(--spacing-md)',
      tablet: 'var(--spacing-lg)',
      desktop: 'var(--spacing-xl)',
    },
  },
} as const;

export const typography = {
  sizes: {
    logo: {
      sm: '1.5rem',   // 24px
      md: '2.5rem',   // 40px
      lg: '4rem',     // 64px
      xl: '6rem',     // 96px
    },
    heading: {
      h1: '3.5rem',   // 56px
      h2: '2.5rem',   // 40px
      h3: '2rem',     // 32px
      h4: '1.5rem',   // 24px
    },
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
} as const;

export const effects = {
  glow: {
    purple: `0 0 20px ${hexToRgba(baseColors.purple, 0.3)}, 0 0 40px ${hexToRgba(baseColors.purple, 0.1)}`,
    cyan: `0 0 20px ${hexToRgba(baseColors.cyan, 0.3)}, 0 0 40px ${hexToRgba(baseColors.cyan, 0.1)}`,
    gradient: `0 0 30px ${hexToRgba(baseColors.purple, 0.4)}, 0 0 60px ${hexToRgba(baseColors.cyan, 0.2)}`,
  },
  blur: {
    subtle: 'blur(8px)',
    medium: 'blur(16px)',
    heavy: 'blur(32px)',
  },
} as const;

export const breakpoints = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;

// Configuración para Three.js
export const threeConfig = {
  particles: {
    count: 1000,
    size: 2,
    speed: 0.001,
    colors: [colors.hex.purple, colors.hex.cyan],
  },
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 5 },
  },
} as const;

// Configuración para P5.js
export const p5Config = {
  trail: {
    length: 50,
    fadeSpeed: 5,
    strokeWeight: 2,
  },
  colors: {
    purple: [209, 132, 255],
    cyan: [105, 234, 255],
  },
} as const;

// Configuración de animaciones con anime.js
export const animeConfig = {
  typing: {
    duration: 1500,
    easing: 'easeOutExpo',
    delay: (el: any, i: number) => 50 * i,
  },
  counter: {
    duration: 2000,
    easing: 'easeOutExpo',
    round: 1,
  },
  glow: {
    duration: 2000,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate',
  },
} as const;
