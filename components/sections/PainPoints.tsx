"use client";

import { motion } from 'framer-motion';
import { TrendingDown, Clock, DollarSign, Users, AlertCircle, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { fadeInUp, viewportConfig, staggerContainer } from '@/lib/animations';
import { useAutoHover } from '@/hooks/useAutoHover';

function PainPointCard({ pain, t }: { pain: any; t: any }) {
  const [ref, shouldAutoHover] = useAutoHover();

  return (
    <motion.div
      ref={ref}
      key={pain.titleKey}
      variants={fadeInUp}
      className={`relative group ${shouldAutoHover ? 'scale-105 border-destructive/40' : ''} transition-all`}
    >
      <div className="h-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-destructive/20 hover:border-destructive/40 transition-all">
        <div className="w-14 h-14 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <pain.icon className="w-7 h-7 text-destructive" />
        </div>
        <h3 className="text-sm md:text-base font-bold mb-3 text-foreground leading-tight whitespace-nowrap">
          {t(`items.${pain.titleKey}`)}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {t(`items.${pain.descriptionKey}`)}
        </p>
        <div className="absolute top-0 right-0 w-20 h-20 bg-destructive/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export function PainPoints() {
  const t = useTranslations('home.painPoints');

  const painPoints = [
    {
      icon: DollarSign,
      titleKey: 'ads.title',
      descriptionKey: 'ads.description',
    },
    {
      icon: Clock,
      titleKey: 'time.title',
      descriptionKey: 'time.description',
    },
    {
      icon: Users,
      titleKey: 'dependency.title',
      descriptionKey: 'dependency.description',
    },
    {
      icon: TrendingDown,
      titleKey: 'traffic.title',
      descriptionKey: 'traffic.description',
    },
    {
      icon: AlertCircle,
      titleKey: 'analytics.title',
      descriptionKey: 'analytics.description',
    },
    {
      icon: Target,
      titleKey: 'strategy.title',
      descriptionKey: 'strategy.description',
    },
  ];
  return (
    <section id="pain-points" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-red-950/20 via-background to-red-900/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('subtitle')}
            <span className="block mt-2 font-semibold text-foreground">
              {t('subtitleHighlight')}
            </span>
          </motion.p>
        </motion.div>

        {/* Pain Points Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {painPoints.map((pain) => (
            <PainPointCard key={pain.titleKey} pain={pain} t={t} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-bold">
            {t('conclusion')}{' '}
            <span className="gradient-ia">{t('conclusionHighlight')}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
