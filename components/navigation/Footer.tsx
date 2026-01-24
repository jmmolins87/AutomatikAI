"use client";

import { Logo } from '@/components/branding/Logo';
import { Separator } from '@/components/ui/separator';
import { Mail, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

const footerLinks = {
  servicios: [
    { label: 'Automatización IA', href: '#servicios' },
    { label: 'Marketing Digital', href: '#servicios' },
    { label: 'Estrategia de Contenido', href: '#servicios' },
    { label: 'Analytics & Datos', href: '#servicios' },
  ],
  empresa: [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Casos de Éxito', href: '#casos' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#contacto' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hola@jmaria.agency', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="md" className="mb-6" />
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Transformamos tu presencia digital con estrategias impulsadas por
              inteligencia artificial. Resultados medibles, creatividad sin límites.
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
            <h3 className="text-foreground font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 j.marIA Agency. Todos los derechos reservados.</p>
          <p>
            Hecho con <span className="gradient-ia">IA</span> y{' '}
            <span className="text-primary">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
