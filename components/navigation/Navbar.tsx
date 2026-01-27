"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/branding/Logo';
import { Button } from '@/components/ui/button';
import { LocaleSwitch } from '@/components/navigation/LocaleSwitch';
import { ThemeDropdown } from '@/components/ui/theme-dropdown';
import { animations } from '@/lib/design-system';
import type { Locale } from '@/i18n/config';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as Locale;
  const pathname = usePathname();

  const navLinks = [
    { label: t('services'), href: `/${locale}/servicios` },
    { label: t('about'), href: `/${locale}/about` },
    { label: t('contact'), href: `/${locale}/contacto` },
  ];

  // Animated underline for active link
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const idx = navLinks.findIndex(link => pathname.startsWith(link.href));
    if (idx !== -1 && navRefs.current[idx]) {
      const el = navRefs.current[idx];
      const rect = el!.getBoundingClientRect();
      const parentRect = el!.parentElement!.getBoundingClientRect();
      const newLeft = rect.left - parentRect.left;
      const newWidth = rect.width;
      if (newLeft !== underline.left || newWidth !== underline.width) {
        setUnderline({ left: newLeft, width: newWidth });
      }
    }
  }, [pathname, mounted, navLinks, underline]);

  useEffect(() => {
    const handleResize = () => {
      const idx = navLinks.findIndex(link => pathname.startsWith(link.href));
      if (idx !== -1 && navRefs.current[idx]) {
        const el = navRefs.current[idx];
        const rect = el!.getBoundingClientRect();
        const parentRect = el!.parentElement!.getBoundingClientRect();
        const newLeft = rect.left - parentRect.left;
        const newWidth = rect.width;
        if (newLeft !== underline.left || newWidth !== underline.width) {
          setUnderline({ left: newLeft, width: newWidth });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname, navLinks, underline]);

  // Check if we're on home page
  useEffect(() => {
    const checkIsHome = () => {
      const path = window.location.pathname;
      const home = path === `/${locale}` || path === `/${locale}/`;
      setIsHomePage(home);
    };

    checkIsHome();

    // Also check on route changes
    window.addEventListener('popstate', checkIsHome);

    return () => {
      window.removeEventListener('popstate', checkIsHome);
    };
  }, [locale]);

  // Efectos de scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      'rgba(var(--background-rgb), 0)',
      'rgba(var(--background-rgb), 0.85)'
    ]
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

          <div className="flex items-center h-16 md:h-20 w-full">
            {/* Logo - siempre a la izquierda */}
            <div
              onClick={() => {
                window.location.href = `/${locale}`;
              }}
              className="cursor-pointer shrink-0"
            >
              <Logo size="sm" />
            </div>

            {/* Espaciador para separar logo del resto */}
            <div className="flex-1" />

            {/* Desktop Navigation alineado a la derecha */}
            <div className="hidden lg:flex items-center gap-8 relative">
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 z-10"
                animate={{
                  left: underline.left,
                  width: underline.width,
                  opacity: underline.width > 0 ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  height: '4px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #d184ff 0%, #69eaff 100%)',
                  boxShadow: '0 2px 12px 0 rgba(209,132,255,0.25)',
                  pointerEvents: 'none',
                }}
              />
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={el => { navRefs.current[i] = el; }}
                  className={`text-sm font-medium transition-colors relative px-1
                    ${pathname.startsWith(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeDropdown />
              <LocaleSwitch />
              <Link href={`/${locale}/contacto`}>
                <Button size="sm" className="gradient-ia-bg text-white border-0">
                  {t('getStarted')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button alineado a la derecha */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeDropdown />
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

      {/* Mobile Menu Cortina */}
      <>
        {/* Capa de blur y oscurecimiento solo si el menú está abierto */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl flex flex-col min-h-screen w-screen lg:hidden">
            {/* Botón X grande arriba a la derecha */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-foreground p-3 rounded-full hover:bg-muted/40 transition"
              aria-label="Cerrar menú"
            >
              <X className="size-10" />
            </button>
            <div className="flex-1 flex flex-col justify-center items-center gap-10 w-full">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    y: isOpen ? 0 : -20,
                  }}
                  transition={{
                    delay: 0.15 + index * 0.1,
                    duration: 0.35,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold text-foreground hover:text-primary transition-colors block text-center"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  y: isOpen ? 0 : -20,
                }}
                transition={{
                  delay: 0.15 + navLinks.length * 0.1,
                  duration: 0.35,
                }}
              >
                <Link href={`/${locale}/contacto`} onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full text-2xl py-6 gradient-ia-bg text-white border-0">
                    {t('getStarted')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
