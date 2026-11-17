import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';

import { localizedPath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

const primaryLinks = [
  { path: '/about', key: 'about' },
  // { path: '/industries', key: 'industries' },
  { path: '/process', key: 'process' },
  { path: '/join-us', key: 'join' },
  { path: '/contact', key: 'contact' }
] as const;

// Brand and service names remain in English, regardless of the locale.
const serviceLinks = [
  { slug: 'hive-corporate', name: 'Hive Corporate' },
  { slug: 'hive-tech', name: 'Hive Tech' },
  { slug: 'hive-people', name: 'Hive People' },
  { slug: 'hive-talent', name: 'Hive Talent' },
  { slug: 'hive-creative', name: 'Hive Creative' }
] as const;

const footerLinkClass =
  'group inline-flex w-fit items-center gap-2 text-[14px] leading-7 text-[#F5F3EE]/75 transition-colors duration-200 hover:text-[#F2A900] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]';

function CompanyLinks({ locale }: { locale: Locale }) {
  const nav = getDictionary(locale).nav;

  return (
    <ul className="space-y-2">
      {primaryLinks.map(({ key, path }) => (
        <li key={key}>
          <Link href={localizedPath(locale, path)} className={footerLinkClass}>
            {key === 'about' && locale === 'en' ? 'About Us' : nav[key]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ServiceLinks({ locale }: { locale: Locale }) {
  return (
    <ul className="space-y-2">
      {serviceLinks.map(({ slug, name }) => (
        <li key={slug}>
          <Link
            href={localizedPath(locale, `/services/${slug}`)}
            className={footerLinkClass}
            dir="ltr"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ContactContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <p className="max-w-[280px] text-[14px] leading-7 text-[#F5F3EE]/80">
        {dict.footer.connectDescription}
      </p>
      <Link
        href={localizedPath(locale, '/contact')}
        className="mt-4 inline-flex items-center gap-2 border-b border-[#F2A900]/60 pb-1 text-[14px] font-semibold text-[#F2A900] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
      >
        {dict.nav.contact}
        {locale === 'ar' ? (
          <ArrowUpLeft size={16} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
        )}
      </Link>
    </>
  );
}

/**
 * Native HTML accordion: works without client JS, keyboard accessible,
 * and all panels start collapsed on mobile/tablet.
 */
function FooterAccordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-white/15 first:border-t first:border-white/15 last:border-b-0">
      <summary className="flex min-h-[62px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[14px] font-semibold text-[#F5F3EE] transition-colors hover:text-[#F2A900] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2A900] [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] transition-[transform,border-color,background] duration-300 group-open:rotate-180 group-open:border-[#F2A900]/55 group-open:bg-[#F2A900]/10"
        >
          <ChevronDown size={17} className="text-[#F2A900]" strokeWidth={1.8} />
        </span>
      </summary>
      <div className="pb-6 pt-1">{children}</div>
    </details>
  );
}

type FooterProps = { locale: Locale };

export function Footer({ locale }: FooterProps) {
  const isArabic = locale === 'ar';
  const dict = getDictionary(locale);
  const copy = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      className="relative isolate w-full overflow-hidden border-t border-white/10 bg-[#0F1B2D] text-[#F5F3EE]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-7 pt-12 sm:px-8 md:px-12 lg:px-16 lg:pt-16">
        {/* Closing CTA. More compact on mobile; same desktop design. */}
        <div className="grid items-end gap-7 border-b border-white/20 pb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:pb-14">
          <div className="max-w-[900px]">
            <div
              className={`mb-5 flex items-center gap-3 font-semibold text-[#F2A900] lg:mb-6 ${
                isArabic ? 'text-[13px] tracking-normal' : 'text-[11px] uppercase tracking-[0.22em]'
              }`}
            >
              <span className="h-[1px] w-9 bg-[#F2A900]" aria-hidden="true" />
              {copy.eyebrow}
            </div>
            <h2
              className={`max-w-[920px] text-[clamp(1.9rem,3.7vw,3.75rem)] font-semibold ${
                isArabic
                  ? 'leading-[1.4] tracking-normal lg:leading-[1.3]'
                  : 'leading-[1.1] tracking-[-0.055em] lg:leading-[1.06]'
              }`}
            >
              <span className="block">{copy.ctaTitle}</span>
              <span className="block text-[#F2A900]">{copy.ctaHighlight}</span>
            </h2>
            <p className="mt-5 max-w-[580px] text-[14px] leading-7 text-[#F5F3EE]/80 md:text-base md:leading-8 lg:mt-6">
              {copy.ctaDescription}
            </p>
          </div>

          <Link
            href={localizedPath(locale, '/contact')}
            className="group inline-flex min-h-[54px] w-fit items-center justify-between gap-7 rounded-full bg-[#F2A900] px-6 py-3 text-[14px] font-semibold text-[#0F1B2D] shadow-[0_10px_32px_rgba(0,0,0,0.13)] transition-[background,transform,box-shadow] duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_16px_34px_rgba(0,0,0,0.20)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900] lg:min-h-[56px] lg:gap-8"
          >
            {copy.ctaButton}
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1B2D]/10 transition-transform duration-300 group-hover:rotate-45"
              aria-hidden="true"
            >
              {isArabic ? (
                <ArrowUpLeft size={18} strokeWidth={1.8} />
              ) : (
                <ArrowUpRight size={18} strokeWidth={1.8} />
              )}
            </span>
          </Link>
        </div>

        {/* Brand + sitemap. Accordion only below lg breakpoint. */}
        <div className="grid grid-cols-1 gap-y-0 py-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,.8fr)_minmax(0,1fr)_minmax(0,.8fr)] lg:gap-x-12 lg:gap-y-12 lg:py-20">
          <div className="max-w-[340px] pb-8 lg:pb-0">
            <Link
              href={localizedPath(locale)}
              aria-label={isArabic ? 'الصفحة الرئيسية لموقع SapiHive' : 'SapiHive home'}
              className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
            >
              <Image
                src="/images/brand/sapihive-logo-light.png"
                alt="SapiHive"
                width={190}
                height={55}
                className="h-auto w-[183px] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-[1.9] text-[#F5F3EE]/80 lg:mt-6">
              {copy.brandDescription}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#F5F3EE]/75 lg:mt-7">
              <MapPin
                size={16}
                strokeWidth={1.6}
                className="shrink-0 text-[#F2A900]"
                aria-hidden="true"
              />
              <span>{copy.location}</span>
            </div>
          </div>

          {/* MOBILE + TABLET: three compact expanding groups */}
          <div className="lg:hidden">
            <FooterAccordion title={copy.companyHeading}>
              <nav aria-label={copy.companyHeading}>
                <CompanyLinks locale={locale} />
              </nav>
            </FooterAccordion>
            <FooterAccordion title={copy.servicesHeading}>
              <nav aria-label={copy.servicesHeading}>
                <ServiceLinks locale={locale} />
              </nav>
            </FooterAccordion>
            <FooterAccordion title={copy.connectHeading}>
              <div aria-label={copy.connectHeading}>
                <ContactContent locale={locale} />
              </div>
            </FooterAccordion>
          </div>

          {/* DESKTOP: original 3 open columns, unchanged. */}
          <nav aria-label={copy.companyHeading} className="hidden lg:block">
            <h3
              className={`mb-5 text-[13px] font-semibold text-[#F5F3EE] ${isArabic ? 'tracking-normal' : 'tracking-[0.08em]'}`}
            >
              {copy.companyHeading}
            </h3>
            <CompanyLinks locale={locale} />
          </nav>

          <nav aria-label={copy.servicesHeading} className="hidden lg:block">
            <h3
              className={`mb-5 text-[13px] font-semibold text-[#F5F3EE] ${isArabic ? 'tracking-normal' : 'tracking-[0.08em]'}`}
            >
              {copy.servicesHeading}
            </h3>
            <ServiceLinks locale={locale} />
          </nav>

          <div className="hidden lg:block">
            <h3
              className={`mb-5 text-[13px] font-semibold text-[#F5F3EE] ${isArabic ? 'tracking-normal' : 'tracking-[0.08em]'}`}
            >
              {copy.connectHeading}
            </h3>
            <ContactContent locale={locale} />
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-[12px] text-[#F5F3EE]/65 sm:flex-row sm:items-center sm:justify-between lg:gap-4">
          <p>
            <span dir="ltr" className="inline-block">
              © {year} SapiHive.
            </span>{' '}
            {copy.rights}
          </p>
          <p className={isArabic ? 'tracking-normal' : 'tracking-[0.04em]'}>{copy.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
