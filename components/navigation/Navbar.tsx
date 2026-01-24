"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/branding/Logo';
import { Button } from '@/components/ui/button';
import { LocaleSwitch } from '@/components/navigation/LocaleSwitch';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/design-system';
import type { Locale } from '@/i18n/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as Locale;

  const navLinks = [
    { label: t('services'), href: `/${locale}/servicios` },
    { label: t('cases'), href: `/${locale}/casos-de-exito` },
    { label: t('about'), href: `/${locale}/nosotros` },
    { label: t('pricing'), href: `/${locale}/precios` },
    { label: t('faq'), href: `/${locale}/faq` },
    { label: t('contact'), href: `/${locale}/contacto` },
  ];

  // Efectos de scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(16px)']);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={`/${locale}`}>
              <Logo size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-ia-bg group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <LocaleSwitch />
              <Button size="sm" className="gradient-ia-bg text-white border-0">
                {t('getStarted')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <LocaleSwitch />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        transition={{ duration: animations.durations.fast }}
        className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl"
        style={{ paddingTop: '5rem' }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: animations.durations.fast,
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                x: isOpen ? 0 : -20,
              }}
              transition={{
                delay: navLinks.length * 0.1,
                duration: animations.durations.fast,
              }}
            >
              <Button size="lg" className="w-full gradient-ia-bg text-white border-0">
                {t('getStarted')}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
