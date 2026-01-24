"use client";

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { Slogan } from '@/components/branding/Slogan';
import { Button } from '@/components/ui/button';
import { animations, spacing } from '@/lib/design-system';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('common');

  const scrollToServices = () => {
    document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: spacing.section.md, paddingBottom: spacing.section.md }}
    >
      {/* Logo Principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: animations.durations.slow,
          ease: animations.easings.smooth,
        }}
        className="relative mb-12"
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 blur-3xl opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(209, 132, 255, 0.6) 0%, rgba(105, 234, 255, 0.4) 50%, transparent 70%)',
          }}
        />
        <Logo size="xl" animated />
      </motion.div>

      {/* Slogan */}
      <Slogan className="mb-12" typingEffect />

      {/* Descripción */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: animations.durations.normal,
          ease: animations.easings.smooth,
        }}
        className="text-lg md:text-xl text-muted-foreground text-center max-w-4xl mb-12 px-4"
      >
        Transformamos tu presencia digital con estrategias impulsadas por inteligencia
        artificial. Resultados medibles, creatividad sin límites.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: animations.durations.normal,
          ease: animations.easings.smooth,
        }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <Button
          size="lg"
          className="gradient-ia-bg text-white border-0 text-base px-8 h-12 animate-glow-pulse"
          onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Sparkles className="mr-2 size-5" />
          {t('getStarted')}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-base px-8 h-12"
          onClick={scrollToServices}
        >
          {t('learnMore')}
        </Button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: animations.durations.normal }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToServices}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium">{t('readMore')}</span>
          <ArrowDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
