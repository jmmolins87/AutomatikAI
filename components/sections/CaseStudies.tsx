"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlowCard } from '@/components/effects/GlowCard';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { animations, spacing } from '@/lib/design-system';

const caseStudies = [
  {
    title: 'E-commerce Revolution',
    client: 'TechStore',
    description:
      'Transformamos la estrategia digital de TechStore, incrementando sus ventas online en un 300% mediante automatización con IA y optimización de campañas.',
    results: [
      '+300% en ventas online',
      '+150% en tráfico orgánico',
      '-40% en costo de adquisición',
    ],
    category: 'E-commerce',
    image: '/placeholder-case-1.jpg',
  },
  {
    title: 'Brand Awareness Campaign',
    client: 'FitLife',
    description:
      'Campaña integral de marketing digital para posicionar FitLife como líder en el sector wellness, alcanzando 2M de impresiones en 3 meses.',
    results: [
      '2M de impresiones',
      '+500% engagement en RRSS',
      '+80% reconocimiento de marca',
    ],
    category: 'Branding',
    image: '/placeholder-case-2.jpg',
  },
  {
    title: 'Lead Generation System',
    client: 'PropTech Solutions',
    description:
      'Implementación de sistema de generación de leads con IA predictiva, aumentando la calidad de leads en un 200% y reduciendo el ciclo de ventas.',
    results: [
      '+200% calidad de leads',
      '-50% ciclo de ventas',
      '+400 leads mensuales',
    ],
    category: 'B2B',
    image: '/placeholder-case-3.jpg',
  },
];

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentCase = caseStudies[currentIndex];

  return (
    <section
      id="casos"
      className="relative py-20 md:py-32"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: animations.durations.normal }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <AnimatedText variant="wave" delay={200}>
              Casos de Éxito
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Resultados reales que hablan por sí mismos. Descubre cómo ayudamos a nuestros
            clientes a alcanzar sus objetivos.
          </p>
        </motion.div>

        {/* Case Study Carousel */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: animations.durations.fast }}
            >
              <GlowCard glowColor="gradient">
                <div className="p-8 md:p-12">
                  {/* Category Badge */}
                  <Badge className="mb-6 gradient-ia-bg text-white border-0">
                    {currentCase.category}
                  </Badge>

                  {/* Title & Client */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                    {currentCase.title}
                  </h3>
                  <p className="text-primary text-lg font-medium mb-6">
                    {currentCase.client}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {currentCase.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {currentCase.results.map((result, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <p className="text-lg font-semibold gradient-ia">{result}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button variant="outline" className="w-full md:w-auto">
                    Ver caso completo
                    <ExternalLink className="ml-2 size-4" />
                  </Button>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevCase}
              className="size-12"
            >
              <ChevronLeft className="size-5" />
            </Button>

            <div className="flex gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to case study ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextCase}
              className="size-12"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
