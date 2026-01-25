"use client";

import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, BarChart3, Zap, Users } from 'lucide-react';
import { GlowCard } from '@/components/effects/GlowCard';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { animations, spacing } from '@/lib/design-system';
import { useTranslations } from 'next-intl';
import { useAutoHover } from '@/hooks/useAutoHover';
import dynamic from 'next/dynamic';

const GeometricShapes = dynamic(
  () => import('@/components/3d/GeometricShapes').then(mod => ({ default: mod.GeometricShapes })),
  { ssr: false }
);

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [ref, shouldAutoHover] = useAutoHover();

  return (
    <motion.div
      ref={ref}
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
      animate={shouldAutoHover ? { scale: 1.05, y: -5 } : {}}
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
  );
}

export function Services() {
  const t = useTranslations('services');
  const tItems = useTranslations('services.items');

  const services = [
    {
      icon: Brain,
      title: tItems('aiAutomation.title'),
      description: tItems('aiAutomation.description'),
      color: 'purple' as const,
    },
    {
      icon: TrendingUp,
      title: tItems('digitalMarketing.title'),
      description: tItems('digitalMarketing.description'),
      color: 'cyan' as const,
    },
    {
      icon: Target,
      title: tItems('contentStrategy.title'),
      description: tItems('contentStrategy.description'),
      color: 'gradient' as const,
    },
    {
      icon: BarChart3,
      title: tItems('analytics.title'),
      description: tItems('analytics.description'),
      color: 'purple' as const,
    },
    {
      icon: Zap,
      title: tItems('growthHacking.title'),
      description: tItems('growthHacking.description'),
      color: 'cyan' as const,
    },
    {
      icon: Users,
      title: tItems('consulting.title'),
      description: tItems('consulting.description'),
      color: 'gradient' as const,
    },
  ];
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
              {t('title')}
            </AnimatedText>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
