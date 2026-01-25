"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/branding/Logo';
import { Separator } from '@/components/ui/separator';
import { Mail, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import type { Locale } from '@/i18n/config';

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hola@jmaria.agency', label: 'Email' },
];

export function Footer() {
  const params = useParams();
  const locale = params.locale as Locale;
  const t = useTranslations('footer');
  const tServices = useTranslations('services.items');
  const tNav = useTranslations('nav');

  const footerLinks = {
    servicios: [
      { label: tServices('aiAutomation.title'), href: '/servicios' },
      { label: tServices('digitalMarketing.title'), href: '/servicios' },
      { label: tServices('contentStrategy.title'), href: '/servicios' },
      { label: tServices('analytics.title'), href: '/servicios' },
    ],
    empresa: [
      { label: tNav('about'), href: '/nosotros' },
      { label: tNav('contact'), href: '/contacto' },
    ],
    legal: [
      { label: t('links.privacy'), href: '/legal/privacidad' },
      { label: t('links.terms'), href: '/legal/terminos' },
      { label: t('links.cookies'), href: '/legal/cookies' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div onClick={scrollToTop} className="cursor-pointer inline-block mb-6">
              <Link href={`/${locale}`}>
                <div className="inline-block">
                  <Logo size="md" />
                </div>
              </Link>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('copyright')}</p>
          <p>
            {t('madeWith')} <span className="text-primary">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
