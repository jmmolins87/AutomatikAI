"use client";

import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, BarChart3, Zap, Users } from 'lucide-react';
import { GlowCard } from '@/components/effects/GlowCard';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { animations, spacing } from '@/lib/design-system';
import dynamic from 'next/dynamic';

const GeometricShapes = dynamic(
  () => import('@/components/3d/GeometricShapes').then(mod => ({ default: mod.GeometricShapes })),
  { ssr: false }
);

const services = [
  {
    icon: Brain,
    title: 'Automatización IA',
    description:
      'Implementamos soluciones de inteligencia artificial que automatizan procesos, optimizan campañas y predicen tendencias.',
    color: 'purple' as const,
  },
  {
    icon: TrendingUp,
    title: 'Marketing Digital',
    description:
      'Estrategias multicanal que impulsan tu marca. SEO, SEM, Social Media y contenido que convierte.',
    color: 'cyan' as const,
  },
  {
    icon: Target,
    title: 'Estrategia de Contenido',
    description:
      'Creamos narrativas que conectan. Contenido optimizado por IA para máximo engagement y conversión.',
    color: 'gradient' as const,
  },
  {
    icon: BarChart3,
    title: 'Analytics & Datos',
    description:
      'Tomamos decisiones basadas en datos. Dashboard personalizados, reportes en tiempo real y insights accionables.',
    color: 'purple' as const,
  },
  {
    icon: Zap,
    title: 'Growth Hacking',
    description:
      'Crecimiento acelerado con técnicas innovadoras. Experimentación constante y optimización de funnel.',
    color: 'cyan' as const,
  },
  {
    icon: Users,
    title: 'Consultoría Digital',
    description:
      'Asesoramiento estratégico personalizado. Transformación digital y optimización de procesos de marketing.',
    color: 'gradient' as const,
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      {/* 3D Geometric Shapes as Background */}
      <GeometricShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: animations.durations.normal }}
          className="text-center mb-16 backdrop-blur-md bg-background/30 rounded-2xl p-8 border border-border/30"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AnimatedText variant="wave" delay={200}>
              Nuestros Servicios
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales de marketing digital potenciadas por IA para impulsar
            tu negocio al siguiente nivel
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                delay: index * animations.stagger.fast,
                duration: animations.durations.normal,
                ease: animations.easings.smooth,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <GlowCard glowColor={service.color} className="h-full p-6 md:p-8 backdrop-blur-md bg-card/60 border-2">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    service.color === 'purple'
                      ? 'bg-primary/10'
                      : service.color === 'cyan'
                      ? 'bg-chart-2/10'
                      : 'gradient-ia-bg'
                  }`}
                >
                  <service.icon
                    className={`size-7 ${
                      service.color === 'purple'
                        ? 'text-primary'
                        : service.color === 'cyan'
                        ? 'text-chart-2'
                        : 'text-white'
                    }`}
                  />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
