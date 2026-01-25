"use client";
import dynamic from 'next/dynamic';
const FloatingObject = dynamic(() => import('@/components/3d/FloatingObject').then(mod => ({ default: mod.FloatingObject })), { ssr: false });

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export function FinalCTA() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('home.finalCta');

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-linear-to-br from-orange-950/30 via-background to-amber-900/20">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <FloatingObject geometry="box" colorVariant="purple" />
      </div>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--color-purple-10),transparent_50%),radial-gradient(circle_at_70%_50%,var(--color-purple-10),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-purple-05),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-card/50 backdrop-blur-xl border border-primary/30 shadow-2xl shadow-primary/20"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{t('badge')}</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                >
                  {t('title')} <span className="gradient-ia">{t('titleHighlight')}</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                  {t('description')}
                </motion.p>
              </div>

              {/* CTA Button */}

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href={`/${locale}/contacto`} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gradient-ia-bg text-white border-0 text-lg px-8 py-6 group shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                  >
                    {t('cta')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-center mt-8 text-sm text-muted-foreground"
              >
                <p>{t('guarantee')}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              {t('preferEmail')}{' '}
              <Link
                href={`/${locale}/contacto`}
                className="gradient-ia font-semibold hover:underline"
              >
                {t('sendMessage')}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
