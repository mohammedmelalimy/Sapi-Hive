import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import type { Metadata } from 'next';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const seo = getDictionary(locale).seo;
  return { title: { absolute: seo.title }, description: seo.description };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div lang={locale} dir={direction} className="min-h-screen w-full">
      {children}
    </div>
  );
}
