"use client";

import { ValueProposition } from '@/components/sections/ValueProposition';
import { PainPoints } from '@/components/sections/PainPoints';
import { Solutions } from '@/components/sections/Solutions';
import { AboutAgency } from '@/components/sections/AboutAgency';
import { FunnelTypes } from '@/components/sections/FunnelTypes';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  useKeyboardShortcuts();

  return (
    <>
      {/* 1. Propuesta Única de Valor */}
      <ValueProposition />

      {/* 2. Dolores del Avatar */}
      <PainPoints />

      {/* 3. Soluciones que Ofreces */}
      <Solutions />

      {/* 4. Tipos de Funnels */}
      <FunnelTypes />

      {/* 5. Presentación de la Agencia */}
      <AboutAgency />

      {/* 6. Llamado a la Acción Final */}
      <FinalCTA />
    </>
  );
}
