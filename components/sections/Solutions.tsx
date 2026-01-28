
"use client";

import { motion } from 'framer-motion';
import { Zap, BarChart3, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { FloatingObject } from '@/components/3d/FloatingObject';
import { useRef, useEffect, useState } from 'react';

const P5WaveBackground = dynamic(
  () => import('@/components/effects/P5WaveBackground').then(mod => ({ default: mod.P5WaveBackground })),
  { ssr: false }
);

function SolutionCard({ solution, index, t }: { solution: { icon: React.ComponentType<any>; key: string }; index: number; t: ReturnType<typeof useTranslations> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCenter, setIsCenter] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !cardRef.current) return;
    if (window.innerWidth >= 768) return; // Solo mobile
    const handleScroll = () => {
      const rect = cardRef.current!.getBoundingClientRect();
      const vh = window.innerHeight;
      // Consideramos "centrado" si el centro de la caja está cerca del centro de la pantalla
      const cardCenter = rect.top + rect.height / 2;
      setIsCenter(cardCenter > vh * 0.35 && cardCenter < vh * 0.65);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      key={solution.key}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${isCenter ? 'scale-105' : ''} transition-all`}
    >
      <div className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all">
        <div className="grid md:grid-cols-[auto,1fr] gap-8 items-start">
          {/* Icon & Problem */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center ${isCenter ? 'scale-110' : ''} group-hover:scale-110 transition-transform`}>
              <solution.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="text-sm text-destructive/70 font-medium max-w-125 text-center md:text-left">
              ❌ {t(`items.${solution.key}.problem`)}
            </div>
          </div>

          {/* Solution Content */}
          <div>
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
              <span className="text-primary">✓</span>
              {t(`items.${solution.key}.solution`)}
            </h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {t(`items.${solution.key}.description`)}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2">
              {['optimization', 'efficiency', 'results'].map((benefit) => solution.key === 'optimization' && (
                <div
                  key={benefit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t(`items.optimization.benefits.${benefit}`)}</span>
                </div>
              ))}
              {['smart', 'learning', 'adaptation'].map((benefit) => solution.key === 'automation' && (
                <div
                  key={benefit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t(`items.automation.benefits.${benefit}`)}</span>
                </div>
              ))}
              {['persuasive', 'validated', 'testing'].map((benefit) => solution.key === 'copy' && (
                <div
                  key={benefit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t(`items.copy.benefits.${benefit}`)}</span>
                </div>
              ))}
              {['realtime', 'insights', 'data'].map((benefit) => solution.key === 'tracking' && (
                <div
                  key={benefit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t(`items.tracking.benefits.${benefit}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className={`absolute inset-0 bg-linear-to-r from-primary/5 to-transparent rounded-2xl opacity-0 ${isCenter ? 'opacity-100' : ''} group-hover:opacity-100 transition-opacity pointer-events-none`} />
      </div>
    </motion.div>
  );
}

export function Solutions() {
  const t = useTranslations('home.solutions');

  const solutions = [
    {
      icon: Zap,
      key: 'optimization',
    },
    {
      icon: Sparkles,
      key: 'automation',
    },
    {
      icon: TrendingUp,
      key: 'copy',
    },
    {
      icon: BarChart3,
      key: 'tracking',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-linear-to-br from-purple-950/30 via-background to-purple-900/20">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <FloatingObject geometry="torus" colorVariant="cyan" />
      </div>
      {/* P5 Wave Background */}
      <P5WaveBackground />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-purple-10),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-ia-animated">{t('title')}</span>
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            {t('subtitle')}
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Solutions */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.key} solution={solution} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
