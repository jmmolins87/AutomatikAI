"use client";

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { type Locale } from '@/i18n/config';

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = (params.locale as Locale) || 'es';
  const isEnglish = currentLocale === 'en';

  const toggleLocale = (checked: boolean) => {
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
  };

  return (
    <div className="flex items-center gap-3">
      <Globe className="size-4 text-muted-foreground" />
      <div className="flex items-center gap-2">
        <Label htmlFor="locale-switch" className="text-sm font-medium cursor-pointer">
          ES
        </Label>
        <Switch
          id="locale-switch"
          checked={isEnglish}
          onCheckedChange={toggleLocale}
          disabled={isPending}
          aria-label="Switch language"
        />
        <Label htmlFor="locale-switch" className="text-sm font-medium cursor-pointer">
          EN
        </Label>
      </div>
    </div>
  );
}
