import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { services } from '@/data/services';
import { isLocale, locales } from '@/i18n/config';
import { getServices } from '@/i18n/services';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HiveExperience } from '@/features/hives/HiveExperiences';
import type { HiveSlug } from '@/features/hives/hiveCopy';
import { CorporateEditorialExperience } from '@/features/corporate/CorporateEditorialExperience';
import { TechExperience } from '@/features/tech/TechExperience';
import { PeopleExperience } from '@/features/people/PeopleExperience';
import { CreativeExperience } from '@/features/creative/CreativeExperience';
import { TalentExperience } from '@/features/talent/TalentExperience';

export function generateStaticParams() {
  return locales.flatMap(locale => services.map(service => ({ locale, slug: service.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServices(locale).find(item => item.slug === slug);
  if (!service) notFound();
  return { title: `${service.title} | SapiHive`, description: service.description };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getServices(locale).find(item => item.slug === slug);
  if (!service) notFound();
  // On small screens, Hive Tech previously clipped its own visual content,
  // but the Header and Footer remained outside that boundary.
  // Keep the complete route in one inline-sized, non-scrollable clipping boundary
  // so transforms cannot enlarge the document's horizontal scroll area.
  // `overflow: clip` does not create a scroll container (unlike `hidden`),
  // preserving sticky header behavior. No other Hive route is wrapped.
  if (slug === 'hive-tech') {
    return (
      <div
        data-tech-viewport-boundary
        className="relative isolate w-full min-w-0 max-w-full overflow-x-clip"
        style={{ inlineSize: '100%', maxInlineSize: '100%', minInlineSize: 0, overflowX: 'clip' }}
      >
        <Header locale={locale} />
        <TechExperience locale={locale} />
        <Footer locale={locale} />
      </div>
    );
  }

  return <>
    <Header locale={locale} />
    {slug === 'hive-corporate'
      ? <CorporateEditorialExperience locale={locale} />
      : slug === 'hive-people'
        ? <PeopleExperience locale={locale} />
        : slug === 'hive-creative'
          ? <CreativeExperience locale={locale} />
          : slug === 'hive-talent'
            ? <TalentExperience locale={locale} />
            : <HiveExperience locale={locale} slug={slug as HiveSlug} />}
    <Footer locale={locale} />
  </>;
}
