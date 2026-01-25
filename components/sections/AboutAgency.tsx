"use client";

import { motion } from 'framer-motion';
import { Brain, Code, LineChart, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAutoHover } from '@/hooks/useAutoHover';

function PillarCard({ pillar, index, t }: { pillar: any; index: number; t: any }) {
  const [ref, shouldAutoHover] = useAutoHover();

  return (
    <motion.div
      ref={ref}
      key={pillar.key}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      className={`group ${shouldAutoHover ? 'scale-105 border-primary/50' : ''} transition-all`}
    >
      <div className="h-full p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <pillar.icon className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-lg font-bold mb-3">{t(`pillars.${pillar.key}.title`)}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(`pillars.${pillar.key}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export function AboutAgency() {
  const t = useTranslations('home.about');

  const pillars = [
    {
      icon: Brain,
      key: 'ai',
    },
    {
      icon: Code,
      key: 'proven',
    },
    {
      icon: LineChart,
      key: 'automation',
    },
    {
      icon: Lightbulb,
      key: 'support',
    },
  ];
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-linear-to-br from-emerald-950/30 via-background to-teal-900/20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan-10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('title').replace('AI', '')}<span className="gradient-ia">AI</span>
            </h2>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <PillarCard key={pillar.key} pillar={pillar} index={index} t={t} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
