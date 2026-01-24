
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { ParticleBackground } from '@/components/effects/ParticleBackground';

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
      <ParticleBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
