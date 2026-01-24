"use client";

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AnimatedText } from '@/components/effects/AnimatedText';
import { animations, spacing } from '@/lib/design-system';
import type { Locale } from '@/i18n/config';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  const params = useParams();
  const locale = params.locale as Locale;

  return (
    <section
      className="relative pt-32 pb-16 md:pt-40 md:pb-20"
      style={{ paddingTop: spacing.section.md }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.durations.fast }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="size-4" />
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animations.durations.normal, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="gradient-ia">{title}</span>
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.durations.normal, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
