"use client";

import dynamic from 'next/dynamic';

const P5Particles = dynamic(
  () => import('@/components/effects/P5Particles').then(mod => ({ default: mod.P5Particles })),
  { ssr: false }
);

export function ClientEffects() {
  return <P5Particles />;
}
