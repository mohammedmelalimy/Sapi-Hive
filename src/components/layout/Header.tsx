'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type MouseEvent } from 'react';
import { ChevronDown, Globe2, Menu, X } from 'lucide-react';

import { localizedPath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

type HeaderProps = {
  locale: Locale;
};

const navigation = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'process', path: '/process' },
  { key: 'join', path: '/join-us' },
  { key: 'contact', path: '/contact' }
] as const;

const serviceLinks = [
  { key: 'corporate', slug: 'hive-corporate' },
  { key: 'tech', slug: 'hive-tech' },
  { key: 'people', slug: 'hive-people' },
  { key: 'talent', slug: 'hive-talent' },
  { key: 'creative', slug: 'hive-creative' }
] as const;

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const isArabic = locale === 'ar';
  const direction = isArabic ? 'rtl' : 'ltr';

  const otherLocale: Locale = isArabic ? 'en' : 'ar';

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const homeHref = localizedPath(locale, '/');

  // Native links are intentionally used for Home and the logo so the complete
  // homepage reloads, including its intro and GSAP timelines, every time.
  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Keep browser behaviour for Ctrl/Cmd-click and opening a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    setMenuOpen(false);

    // Prevent browser scroll restoration from landing in the middle of a pinned
    // ScrollTrigger section after a full navigation to the home route.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Do not preventDefault: the native <a href> triggers a FULL page reload.
  };

  const languageHref =
    pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (path: string) => {
    const href = localizedPath(locale, path);

    if (path === '/') {
      return pathname === href || pathname === `${href}/`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Detect when the hero is out of view
  useEffect(() => {
    const updateHeader = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero]');

      const isPastHero = hero ? hero.getBoundingClientRect().bottom <= 90 : true;

      setScrolled(isPastHero);
    };

    updateHeader();

    window.addEventListener('scroll', updateHeader, {
      passive: true
    });

    window.addEventListener('resize', updateHeader);

    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, [pathname]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scrolling while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [menuOpen]);

  const navLinkClass = (path: string) =>
    [
      'relative whitespace-nowrap py-3',
      'text-[15px] font-medium leading-relaxed',
      'transition-colors duration-200',
      isActive(path) ? 'text-white' : 'text-[#F5F3EE]/75 hover:text-white'
    ].join(' ');

  return (
    <header
      id="site-header"
      dir={direction}
      className={[
        'fixed inset-x-0 top-0 z-50 w-full',
        'transition-transform duration-500 ease-out',
        scrolled || menuOpen ? 'translate-y-3' : 'translate-y-0'
      ].join(' ')}
    >
      {/* Header Container */}
      <nav
        aria-label={isArabic ? 'القائمة الرئيسية' : 'Main navigation'}
        className={[
          'relative mx-auto flex h-[76px] w-[calc(100%-28px)] max-w-[1440px] items-center gap-6 px-3',
          'md:h-[92px] md:w-[calc(100%-48px)] md:px-6',
          'border transition-[border-color,background,box-shadow,backdrop-filter,border-radius] duration-500 ease-out',
          scrolled || menuOpen
            ? [
                'rounded-[25px] border-white/20',
                // Layered semitransparent highlights: background remains visible THROUGH the glass.
                'bg-[linear-gradient(115deg,rgba(55,76,99,0.92)_0%,rgba(15,27,45,0.94)_52%,rgba(55,76,99,0.90)_100%)]',
                'backdrop-blur-[28px] backdrop-saturate-[135%]',
                'shadow-[0_14px_40px_rgba(5,14,29,0.22),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.05)]'
              ].join(' ')
            : 'rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none'
        ].join(' ')}
      >
        {/* Logo */}
        <a
          href={homeHref}
          aria-label={isArabic ? "الصفحة الرئيسية لـ SapiHive" : "SapiHive Home"}
          onClick={handleHomeClick}
          className="relative z-10 flex shrink-0 items-center"
        >
          <Image
            src="/images/brand/sapihive-logo-light.png"
            alt="SapiHive"
            width={190}
            height={55}
            priority
            className="
              h-auto w-[145px] object-contain
              md:w-[170px] xl:w-[185px]
            "
          />
        </a>

        {/* Desktop Navigation */}
        <div
          className="
            ms-auto hidden items-center
            gap-4 lg:flex xl:gap-6
          "
        >
          {navigation.map((item) => {
            if (item.key === 'services') {
              return (
                <div key={item.key} className="group relative">
                  {/* Services Link */}
                  <Link
                    href={localizedPath(locale, item.path)}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    className={`
                      ${navLinkClass(item.path)}
                      flex items-center gap-1.5
                    `}
                  >
                    {dict.nav.services}

                    <ChevronDown
                      size={15}
                      strokeWidth={1.7}
                      className="
                        transition-transform duration-200
                        group-hover:rotate-180
                        group-focus-within:rotate-180
                      "
                    />
                  </Link>

                  {/* Translucent frosted-glass desktop Services dropdown */}
                  <div
                    className="
                      invisible absolute start-0 top-full
                      z-50 w-[268px] translate-y-2 p-2.5 opacity-0
                      rounded-[18px] border border-white/25
                      bg-[linear-gradient(145deg,rgba(82,107,129,0.64)_0%,rgba(24,42,61,0.74)_100%)]
                      backdrop-blur-[30px] backdrop-saturate-[170%]
                      shadow-[0_22px_55px_rgba(6,16,30,0.26),inset_0_1px_0_rgba(255,255,255,0.19)]
                      transition-[opacity,transform,visibility] duration-200 ease-out

                      group-hover:visible
                      group-hover:translate-y-0
                      group-hover:opacity-100

                      group-focus-within:visible
                      group-focus-within:translate-y-0
                      group-focus-within:opacity-100
                    "
                  >
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.slug}
                        href={localizedPath(locale, `/services/${service.slug}`)}
                        className="
                          block rounded-[10px] px-3.5 py-2.5
                          text-start text-[14px] font-medium leading-relaxed
                          text-white/80 transition-[background-color,color] duration-200
                          hover:bg-white/[0.12] hover:text-[#F2C87D]
                          focus-visible:bg-white/[0.12]
                          focus-visible:text-[#F2C87D]
                          focus-visible:outline focus-visible:outline-2
                          focus-visible:outline-[#D6AD68]
                        "
                      >
                        {dict.services[service.key]}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.key === 'home') {
              return (
                <a
                  key={item.key}
                  href={homeHref}
                  onClick={handleHomeClick}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={navLinkClass(item.path)}
                >
                  {dict.nav[item.key]}
                </a>
              );
            }

            return (
              <Link
                key={item.key}
                href={localizedPath(locale, item.path)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={navLinkClass(item.path)}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div
          className="
            relative z-10 ms-auto flex
            shrink-0 items-center gap-4 lg:ms-0
          "
        >
          {/* Language Switcher */}
          <Link
            href={languageHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={isArabic ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
            className="
              flex items-center gap-2
              border-s border-white/15 ps-4
              text-[13px] font-semibold
              text-white/85 transition-colors
              hover:text-[#C69A53]
            "
          >
            <Globe2 size={18} strokeWidth={1.6} />
            <span dir="ltr">{otherLocale.toUpperCase()}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex h-10 w-10 items-center
              justify-center text-white
              lg:hidden
            "
          >
            {menuOpen ? <X size={24} strokeWidth={1.6} /> : <Menu size={24} strokeWidth={1.6} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-navigation"
        dir={direction}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={[
          'absolute inset-x-[14px] top-[calc(100%+8px)] lg:hidden',
          'h-[calc(100dvh-105px)] overflow-y-auto',
          'rounded-[22px] border border-white/25',
          'bg-[#223951]/85 backdrop-blur-[32px] backdrop-saturate-[150%]',
          'shadow-[0_18px_45px_rgba(4,12,25,0.30)]',
          'transition-all duration-300',
          menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        ].join(' ')}
      >
        <div
          className="
            mx-auto flex w-[calc(100%-44px)]
            max-w-[560px] flex-col py-6
          "
        >
          {navigation.map((item) => {
            if (item.key === 'services') {
              return (
                <details key={item.key} className="group border-b border-white/10">
                  <summary
                    className="
                      flex cursor-pointer list-none
                      items-center justify-between
                      py-4 text-[17px] font-medium
                      text-white
                      [&::-webkit-details-marker]:hidden
                    "
                  >
                    {dict.nav.services}

                    <ChevronDown
                      size={17}
                      className="
                        transition-transform
                        group-open:rotate-180
                      "
                    />
                  </summary>

                  <div className="flex flex-col gap-1 pb-4 ps-4">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.slug}
                        href={localizedPath(locale, `/services/${service.slug}`)}
                        onClick={() => setMenuOpen(false)}
                        className="
                          py-2 text-[15px] text-white/70
                          transition-colors hover:text-white
                        "
                      >
                        {dict.services[service.key]}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            }

            if (item.key === 'home') {
              return (
                <a
                  key={item.key}
                  href={homeHref}
                  onClick={handleHomeClick}
                  className={[
                    'border-b border-white/10',
                    'py-4 text-start text-[17px] font-medium',
                    'transition-colors',
                    isActive(item.path) ? 'text-[#C69A53]' : 'text-white hover:text-[#F5F3EE]/75'
                  ].join(' ')}
                >
                  {dict.nav[item.key]}
                </a>
              );
            }

            return (
              <Link
                key={item.key}
                href={localizedPath(locale, item.path)}
                onClick={() => setMenuOpen(false)}
                className={[
                  'border-b border-white/10',
                  'py-4 text-start text-[17px] font-medium',
                  'transition-colors',
                  isActive(item.path) ? 'text-[#C69A53]' : 'text-white hover:text-[#F5F3EE]/75'
                ].join(' ')}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
