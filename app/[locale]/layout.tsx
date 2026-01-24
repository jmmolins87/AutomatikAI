
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ClientEffects } from '@/components/effects/ClientEffects';
import { CookieBanner } from '@/components/ui/cookie-banner';
import { CustomCursor } from '@/components/effects/CustomCursor';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CustomCursor />
      <ClientEffects />
      <CookieBanner />
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
