"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { type Locale } from '@/i18n/config';

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as Locale) || 'es';
  const isEnglish = currentLocale === 'en';

  const [checked, setChecked] = React.useState(isEnglish);

  React.useEffect(() => {
    setChecked(isEnglish);
  }, [isEnglish]);

  const toggleLocale = React.useCallback((checked: boolean) => {
    setChecked(checked);
    const newLocale: Locale = checked ? 'en' : 'es';

    if (newLocale === currentLocale) return;

    startTransition(() => {
      // Construir nueva ruta con el locale correcto
      const segments = pathname.split('/').filter(Boolean);

      // Si el primer segmento es un locale, reemplazarlo
      if (segments[0] === 'es' || segments[0] === 'en') {
        segments[0] = newLocale;
      } else {
        // Si no hay locale en la ruta, agregarlo
        segments.unshift(newLocale);
      }

      const newPathname = '/' + segments.join('/');
      router.push(newPathname);
    });
  }, [currentLocale, pathname, router, startTransition]);

  return (
    <div className="flex items-center gap-3">
      <Globe className="size-4 text-muted-foreground" />
      <div className="flex items-center gap-2">
        <Label htmlFor="locale-switch" className="text-sm font-medium cursor-pointer">
          ES
        </Label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id="locale-switch"
            type="checkbox"
            checked={checked}
            onChange={(e) => toggleLocale(e.target.checked)}
            disabled={isPending}
            className="sr-only peer"
            aria-label="Switch language"
          />
          <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
        <Label htmlFor="locale-switch" className="text-sm font-medium cursor-pointer">
          EN
        </Label>
      </div>
    </div>
  );
}
