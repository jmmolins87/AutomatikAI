"use client";

import { motion } from 'framer-motion';
import {
  Search,
  Share2,
  Megaphone,
  Monitor,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export function FunnelTypes() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('home.funnelTypes');
  const tServices = useTranslations('home.services.items');

  const services = [
    {
      icon: Search,
      name: tServices('posicionamiento.title'),
      description: tServices('posicionamiento.description'),
      ideal: tServices('posicionamiento.ideal'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Share2,
      name: tServices('redesSociales.title'),
      description: tServices('redesSociales.description'),
      ideal: tServices('redesSociales.ideal'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Megaphone,
      name: tServices('publicidad.title'),
      description: tServices('publicidad.description'),
      ideal: tServices('publicidad.ideal'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Monitor,
      name: tServices('disenoWeb.title'),
      description: tServices('disenoWeb.description'),
      ideal: tServices('disenoWeb.ideal'),
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-950/20 via-background to-cyan-900/10">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('title')} <span className="gradient-ia">{t('titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Funnel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                {/* Icon with gradient */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-2 gradient-ia">{service.name}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[60px]">
                  {service.description}
                </p>

                {/* Ideal for */}
                <div className="text-xs text-muted-foreground pt-3">
                  <span className="font-semibold text-foreground">{t('idealFor')} </span>
                  {service.ideal}
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            {t('notSure')}
          </p>
          <Link href={`/${locale}/contacto`}>
            <Button size="lg" className="gradient-ia-bg text-white border-0">
              {t('scheduleConsultation')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
