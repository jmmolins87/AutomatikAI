"use client";

import { motion } from 'framer-motion';
import {
  Users,
  Video,
  Presentation,
  Rocket,
  Crown,
  ShoppingCart,
  Gift,
  Zap
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n/config';

const funnelTypes = [
  {
    icon: Users,
    name: 'Captación',
    description: 'Lead magnet + Email sequence para construir tu base de datos',
    price: 'Desde $997',
    ideal: 'Coaches, consultores, infoproductores',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Video,
    name: 'VSL Low Ticket',
    description: 'Video de ventas + checkout para productos de $7-$97',
    price: 'Desde $1,497',
    ideal: 'Cursos, ebooks, templates',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Presentation,
    name: 'Webinar',
    description: 'Webinar automatizado que vende tu high-ticket',
    price: 'Desde $2,497',
    ideal: 'Programas de $297+, mentorías',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    name: 'Lanzamiento',
    description: 'Secuencia de pre-lanzamiento + carrito abierto/cerrado',
    price: 'Desde $3,997',
    ideal: 'Programas premium, masterminds',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Crown,
    name: 'VSL High Ticket',
    description: 'VSL + application + llamada de cierre para ventas premium',
    price: 'Desde $2,997',
    ideal: 'Servicios de $2,000+, coaching 1-1',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: ShoppingCart,
    name: 'E-commerce',
    description: 'Sistema de productos físicos con upsells y cross-sells',
    price: 'Desde $1,997',
    ideal: 'Productos físicos, dropshipping',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Gift,
    name: 'Tripwire',
    description: 'Oferta irresistible de bajo precio que convierte en cliente',
    price: 'Desde $1,297',
    ideal: 'Cualquier negocio digital',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Zap,
    name: 'Crashing',
    description: 'Secuencia agresiva de remarketing para recuperar carritos',
    price: 'Desde $997',
    ideal: 'Complemento a otros sistemas',
    color: 'from-violet-500 to-purple-500',
  },
];

export function FunnelTypes() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('home.funnelTypes');

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
          {funnelTypes.map((funnel, index) => (
            <motion.div
              key={funnel.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="h-full p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                {/* Icon with gradient */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${funnel.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <funnel.icon className="w-7 h-7 text-white" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold mb-2">{funnel.name}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[60px]">
                  {funnel.description}
                </p>

                {/* Price */}
                <div className="text-lg font-bold gradient-ia mb-3">
                  {funnel.price}
                </div>

                {/* Ideal for */}
                <div className="text-xs text-muted-foreground pt-3">
                  <span className="font-semibold text-foreground">Ideal para: </span>
                  {funnel.ideal}
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${funnel.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity pointer-events-none`} />
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
            ¿No estás seguro cuál sistema necesitas?
          </p>
          <Link href={`/${locale}/contacto`}>
            <Button size="lg" className="gradient-ia-bg text-white border-0">
              Agenda una Consultoría Gratis
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
