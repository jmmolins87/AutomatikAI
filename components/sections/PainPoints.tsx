"use client";


import dynamic from 'next/dynamic';
const NetworkGrid = dynamic(() => import('@/components/3d/NetworkGrid').then(mod => ({ default: mod.NetworkGrid })), { ssr: false });

import { motion } from 'framer-motion';
import { TrendingDown, Clock, DollarSign, Users, AlertCircle, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { fadeInUp, viewportConfig, staggerContainer } from '@/lib/animations';
import { useAutoHover } from '@/hooks/useAutoHover';
import { useRef, useEffect, useState } from 'react';

function PainPointCard({ pain, t, index }: { pain: any; t: any; index: number }) {
  const [hoverRef, shouldAutoHover] = useAutoHover();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCenter, setIsCenter] = useState(false);

  // Determinar si usar animaciones basado en el tamaño de pantalla
  const [useMotion, setUseMotion] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setUseMotion(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const CardComponent = useMotion ? motion.div : 'div';
  const cardProps = useMotion ? {
    variants: fadeInUp,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: false, margin: "-50px", amount: 0.3 }
  } : {};

  return (
    <CardComponent
      ref={cardRef}
      key={pain.titleKey}
      {...cardProps}
      className={`relative group transition-all duration-300 min-h-[200px] md:min-h-[180px] z-10
        ${shouldAutoHover || isCenter ? 'scale-105 shadow-2xl z-20' : ''}
        ${isCenter ? 'border-primary/60' : ''}
      `}
      style={{
        boxShadow: isCenter ? '0 8px 32px 0 rgba(0,0,0,0.25)' : undefined,
      }}
    >
      <div
        ref={hoverRef}
        className={`h-full p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 md:bg-card/40 backdrop-blur-md border-2 border-destructive/40 transition-all ${
          shouldAutoHover || isCenter ? 'border-destructive/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg' : 'hover:border-destructive/60 hover:bg-white/60 dark:hover:bg-gray-900/60'
        }`}
      >
        <div className={`w-14 h-14 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 transition-transform ${
          shouldAutoHover || isCenter ? 'scale-110' : 'group-hover:scale-110'
        }`}>
          <pain.icon className="w-7 h-7 text-destructive" />
        </div>
        <h3 className="text-sm md:text-base font-bold mb-3 text-gray-900 dark:text-gray-100 leading-tight">
          {t(`items.${pain.titleKey}`)}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {t(`items.${pain.descriptionKey}`)}
        </p>
        <div className={`absolute top-0 right-0 w-20 h-20 bg-destructive/5 rounded-bl-full transition-opacity ${
          shouldAutoHover || isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} />
      </div>
    </CardComponent>
  );
}

export function PainPoints() {
  const t = useTranslations('home.painPoints');
  const [useMotion, setUseMotion] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setUseMotion(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const renderHeader = () => {
    if (useMotion) {
      return (
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
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
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
      );
    } else {
      return (
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
            <span className="block mt-2 font-semibold text-foreground">
              {t('subtitleHighlight')}
            </span>
          </p>
        </div>
      );
    }
  };

  const renderGrid = () => {
    if (useMotion) {
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px", amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {painPoints.map((pain, idx) => (
            <PainPointCard key={pain.titleKey} pain={pain} t={t} index={idx} />
          ))}
        </motion.div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {painPoints.map((pain, idx) => (
            <PainPointCard key={pain.titleKey} pain={pain} t={t} index={idx} />
          ))}
        </div>
      );
    }
  };

  const renderCTA = () => {
    if (useMotion) {
      return (
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
      );
    } else {
      return (
        <div className="text-center mt-16">
          <p className="text-2xl md:text-3xl font-bold">
            {t('conclusion')}{' '}
            <span className="gradient-ia">{t('conclusionHighlight')}</span>
          </p>
        </div>
      );
    }
  };

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
    <section id="pain-points" className="py-16 md:py-24 relative overflow-hidden bg-linear-to-br from-red-950/10 md:from-red-950/30 via-background to-red-900/5 md:to-red-900/20">
      {/* Fondos decorativos, z-0, opacidad reducida en mobile, sin pointer-events-none */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="hidden md:block opacity-50 w-full h-full">
          <NetworkGrid />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-purple-10),transparent_70%)] opacity-10 md:opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {renderHeader()}

        {/* Pain Points Grid */}
        {renderGrid()}

        {/* Bottom CTA */}
        {renderCTA()}
      </div>
    </section>
  );
}
