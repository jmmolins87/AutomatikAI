"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Heart } from 'lucide-react';
import { animations } from '@/lib/design-system';
import dynamic from 'next/dynamic';

const FloatingBrain = dynamic(
  () => import('@/components/3d/FloatingBrain').then(mod => ({ default: mod.FloatingBrain })),
  { ssr: false }
);

const values = [
  {
    icon: Target,
    title: 'Enfocados en Resultados',
    description: 'Medimos el éxito con métricas claras y alcanzables.',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Trabajamos codo a codo contigo en cada paso del proceso.',
  },
  {
    icon: Zap,
    title: 'Innovación Constante',
    description: 'Utilizamos las últimas tecnologías de IA para mantenerte a la vanguardia.',
  },
  {
    icon: Heart,
    title: 'Pasión por lo que Hacemos',
    description: 'Cada proyecto es único y lo tratamos con dedicación total.',
  },
];

export default function NosotrosPage() {
  const t = useTranslations('about');

  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* 3D Brain as Background */}
      <FloatingBrain />

      {/* Content with backdrop blur */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.durations.normal }}
            className="text-center mb-20 backdrop-blur-md bg-background/30 rounded-2xl p-8 border border-border/30"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}<span className="gradient-ia-animated">{t('titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('mission.description')}
            </p>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: animations.durations.normal }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: animations.durations.normal,
                  }}
                  className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: animations.durations.normal }}
            className="mt-20 text-center backdrop-blur-md bg-background/30 rounded-2xl p-8 border border-border/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('why.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('why.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
