"use client";

import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as Locale;

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      // Replace the locale in the current pathname
      const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPathname);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="size-4 text-muted-foreground" />
      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50">
        {locales.map((locale) => (
          <motion.button
            key={locale}
            onClick={() => switchLocale(locale)}
            disabled={isPending}
            className={`
              relative px-3 py-1 text-sm font-medium rounded-md transition-colors
              ${
                locale === currentLocale
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }
              ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={{ scale: locale === currentLocale ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {locale === currentLocale && (
              <motion.div
                layoutId="activeLocale"
                className="absolute inset-0 bg-primary rounded-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{locale.toUpperCase()}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
