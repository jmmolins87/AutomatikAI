"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/branding/Logo';
import { Slogan } from '@/components/branding/Slogan';
import dynamic from 'next/dynamic';
import type { Locale } from '@/i18n/config';

const ParticleWaves = dynamic(
  () => import('@/components/3d/ParticleWaves').then(mod => ({ default: mod.ParticleWaves })),
  { ssr: false }
);

function AnimatedHeroLogo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;
      setIsScrolled(scrolled);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="hidden lg:block"
      animate={{
        position: isScrolled ? 'fixed' : 'relative',
        top: isScrolled ? '20px' : 'auto',
        left: isScrolled ? '32px' : 'auto',
        scale: isScrolled ? 0.25 : 1,
      }}
      initial={false}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        transformOrigin: 'top left',
        cursor: isScrolled ? 'pointer' : 'default',
        zIndex: isScrolled ? 100 : 1,
      }}
      onClick={isScrolled ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
    >
      <Logo size="xxl" animated={false} />
    </motion.div>
  );
}

export function ValueProposition() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('home.hero');

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#pain-points');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-x-hidden pt-20 pb-8">
      {/* Three.js Particle Waves Background */}
      <ParticleWaves />

      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-accent/15" />

      {/* Grid decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex items-center">
        <div className="mx-auto text-center w-full">
          {/* Logo y Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-8"
          >
            {/* Logo Hero sin animación */}
            <div className="mb-6">
              <Logo size="xxl" animated={false} />
            </div>
            <Slogan className="text-center" typingEffect={false} />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">{t('slogan')}</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl xxl:text-7xl font-bold mb-6 leading-tight"
          >
            {t('title')}
            <br />
            <span className="gradient-ia">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Subtítulo - PUV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground mx-auto leading-relaxed max-w-5xl text-center"
          >
            <p>{t('description')}</p>
            <p className="mt-2">{t('descriptionHighlight')}</p>
          </motion.div>


          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 xxl:mt-12"
          >
            <Link href={`/${locale}/contacto`}>
              <Button size="lg" className="gradient-ia-bg text-white border-0 text-lg px-8 py-4 xxl:py-6 group">
                {t('cta.primary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${locale}/servicios`}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 xxl:py-6">
                {t('cta.secondary')}
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator - Only visible on non-touch devices */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mt-6 cursor-pointer hidden md:block"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">{t('scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 hover:border-primary/60 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
