"use client";

import { motion } from 'framer-motion';
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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Grid decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

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
            <Logo size="xxl" className="mb-6 hidden md:block" />
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
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
            className="text-xl md:text-2xl text-muted-foreground mb-12 mx-auto leading-relaxed max-w-5xl text-center"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href={`/${locale}/contacto`}>
              <Button size="lg" className="gradient-ia-bg text-white border-0 text-lg px-8 py-6 group">
                {t('cta.primary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${locale}/servicios`}>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
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
        className="relative z-10 pb-8 cursor-pointer hidden md:block"
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
