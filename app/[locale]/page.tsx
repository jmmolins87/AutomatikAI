"use client";

import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/navigation/Footer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  // Activar atajos de teclado
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-x-hidden">
      {/* Fondo de partículas 3D */}
      <ParticleBackground />

      {/* Navegación */}
      <Navbar />

      {/* Contenido principal */}
      <main>
        <Hero />
        <Services />
        <Stats />
        <Features />
        <CaseStudies />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
