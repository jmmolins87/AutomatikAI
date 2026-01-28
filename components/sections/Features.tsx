"use client";

import { motion } from 'framer-motion';
import { Tabs } from '@/components/ui/tabs';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { FloatingObject } from '@/components/3d/FloatingObject';
import { animations, spacing } from '@/lib/design-system';

const features = [
  {
    id: 'ai-powered',
    label: 'IA Avanzada',
    title: 'Impulsado por Inteligencia Artificial',
    description:
      'Utilizamos modelos de IA de última generación para automatizar procesos, predecir tendencias y optimizar cada aspecto de tu estrategia de marketing.',
    points: [
      'Automatización inteligente de campañas',
      'Análisis predictivo de comportamiento',
      'Optimización continua basada en datos',
      'Personalización a escala',
    ],
  },
  {
    id: 'data-driven',
    label: 'Basado en Datos',
    title: 'Decisiones Informadas por Datos',
    description:
      'Cada estrategia está respaldada por análisis profundo de datos. Medimos, analizamos y optimizamos constantemente para garantizar resultados.',
    points: [
      'Dashboard en tiempo real',
      'Reportes personalizados',
      'KPIs y métricas accionables',
      'Integración con todas las plataformas',
    ],
  },
  {
    id: 'creative',
    label: 'Creatividad',
    title: 'Creatividad sin Límites',
    description:
      'La tecnología potencia la creatividad. Creamos contenido único y campañas memorables que conectan emocionalmente con tu audiencia.',
    points: [
      'Contenido original y atractivo',
      'Diseño visual impactante',
      'Narrativas que conectan',
      'Branding consistente',
    ],
  },
];

export function Features() {
  return (
    <section
      id="nosotros"
      className="relative py-20 md:py-32"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: animations.durations.normal }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <AnimatedText variant="wave" delay={200}>
              Por Qué Elegirnos
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Combinamos lo mejor de la estrategia humana con el poder de la inteligencia
            artificial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div>
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  delay: index * animations.stagger.normal,
                  duration: animations.durations.normal,
                }}
                className="mb-12 last:mb-0"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {feature.label}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: animations.durations.slow }}
            className="hidden lg:block h-[600px]"
          >
            <FloatingObject geometry="torus" colorVariant="purple" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
