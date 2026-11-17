'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight, ArrowLeft, ArrowRight, Check, MoveRight, MoveLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { localizedPath } from '@/i18n/config';
import { hiveContent, type HiveLocale } from '@/features/hives/hiveCopy';
import styles from './CorporateEditorialExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

const language = {
  en: {
    overline: 'HIVE CORPORATE / BUSINESS OPERATIONS',
    heroA: 'A stronger business',
    heroB: 'runs behind the scenes.',
    heroIntro: 'The work behind your business matters. We build, employ and manage dedicated teams for the operations you depend on.',
    heroCta: 'Explore what we do',
    back: 'All services',
    visualHead: 'THE WORK BEHIND THE WORK',
    visualBottom: 'Different functions. One coordinated team.',
    lines: ['FINANCE', 'ADMINISTRATION', 'CUSTOMER SUPPORT', 'LOGISTICS', 'PROCESS IMPROVEMENT'],
    capabilitiesLabel: 'THE CAPABILITIES',
    capabilitiesTitle: 'Everyday operations.\nExpertly handled.',
    capabilitiesIntro: 'Select a discipline to see where a dedicated Corporate team can support your business.',
    detailLabel: 'BUSINESS FUNCTION',
    scopeLabel: 'YOUR CORPORATE HIVE',
    detailCta: 'Discuss this function',
    relationshipLabel: 'THE WORKING RELATIONSHIP',
    relationshipA: 'You lead',
    relationshipB: 'the business.',
    relationshipC: 'We manage',
    relationshipD: 'the team.',
    youDo: ['Interview & approve your team', 'Set priorities & direct the work', 'Stay focused on results'],
    weDo: ['Recruit & employ specialists', 'Manage HR, payroll & compliance', 'Support continuity & replacement'],
    promiseLabel: 'THE SAPIHIVE APPROACH',
    proofIntro: 'One monthly invoice. Bilingual people. A replacement guarantee. The right structure behind your operations.',
    ctaLabel: 'BUILT AROUND YOUR BUSINESS',
    ctaA: 'Let your business', ctaB: 'move forward.',
    ctaBody: 'Tell us which business function needs support. We will discuss the dedicated team that fits.',
    ctaButton: 'Request a corporate team',
  },
  ar: {
    overline: 'هايف كوربوريت / تشغيل الأعمال',
    heroA: 'أعمالك أقوى',
    heroB: 'بفريق يدير التفاصيل.',
    heroIntro: 'العمليات التي لا يراها الجميع هي التي تحافظ على سير العمل. نبني فرقًا متخصصة ونوظفها ونديرها لدعم الوظائف التي تعتمد عليها شركتك.',
    heroCta: 'استكشف التخصصات',
    back: 'كل الخدمات',
    visualHead: 'القوة التي تقف وراء العمل',
    visualBottom: 'وظائف مختلفة. فريق واحد منظم.',
    lines: ['الشؤون المالية', 'الإدارة', 'خدمة العملاء', 'الخدمات اللوجستية', 'تحسين الإجراءات'],
    capabilitiesLabel: 'مجالات العمل',
    capabilitiesTitle: 'تفاصيل التشغيل.\nفي أيدٍ متخصصة.',
    capabilitiesIntro: 'اختر تخصصًا لتعرف كيف يمكن لفريق Corporate المخصص أن يدعم أعمال شركتك.',
    detailLabel: 'تخصص تشغيلي',
    scopeLabel: 'فريق كوربوريت الخاص بك',
    detailCta: 'ناقش هذا التخصص',
    relationshipLabel: 'كيف نعمل معًا',
    relationshipA: 'أنت تقود',
    relationshipB: 'أعمالك.',
    relationshipC: 'ونحن ندير',
    relationshipD: 'الفريق.',
    youDo: ['تجري المقابلات وتعتمد أعضاء الفريق', 'تحدد الأولويات وتوجّه العمل', 'تركز على نتائج شركتك'],
    weDo: ['نبحث عن المتخصصين ونوظفهم', 'ندير الموارد البشرية والرواتب والامتثال', 'ندعم استمرارية الفريق والاستبدال'],
    promiseLabel: 'أسلوب SapiHive',
    proofIntro: 'فاتورة شهرية واحدة. كوادر تعمل بالعربية والإنجليزية. وضمان استبدال. هيكل منظم يدعم أعمالك.',
    ctaLabel: 'فريق مناسب لاحتياجاتك',
    ctaA: 'خلّي أعمالك', ctaB: 'تتحرك للأمام.',
    ctaBody: 'شاركنا الوظيفة التي تحتاج إلى دعم، ونتحدث معك عن الفريق المتخصص المناسب.',
    ctaButton: 'اطلب فريق Corporate',
  },
} as const;

const labels = ['finance', 'admin', 'customer', 'logistics', 'consulting'] as const;
const markers = ['F', 'A', 'C', 'L', 'P'];

export function CorporateEditorialExperience({ locale }: { locale: HiveLocale }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const t = language[locale];
  const copy = hiveContent['hive-corporate'][locale];
  const isArabic = locale === 'ar';
  const selected = copy.items[active];

  // Choreographed entrance and scroll motion: no pinning or fake scrolling.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Avoid horizontal GSAP transforms on narrow screens: they can move
      // full-width rows outside the mobile viewport during ScrollTrigger reveals.
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('[data-co-topline]', { y: -16, autoAlpha: 0, duration: .65, clearProps: 'all' })
        .from('[data-co-hero-line]', { yPercent: 38, autoAlpha: 0, duration: .95, stagger: .16, clearProps: 'all' }, '-=.25')
        .from('[data-co-intro]', { y: 26, autoAlpha: 0, duration: .7, stagger: .10, clearProps: 'all' }, '-=.45')
        .from('[data-co-visual]', { y: 24, autoAlpha: 0, duration: .65, stagger: .085, clearProps: 'all' }, '-=.65');

      // Capabilities: reveal the section title one line at a time.
      gsap.from('[data-co-cap-line]', {
        y: 35, autoAlpha: 0, stagger: .13, duration: .78, ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-capabilities-heading]', start: 'top 84%', once: true },
      });
      gsap.from('[data-co-cap-intro]', {
        y: 20, autoAlpha: 0, duration: .7, clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-cap-intro]', start: 'top 89%', once: true },
      });
      gsap.from('[data-co-directory-item]', {
        x: isMobile ? 0 : (isArabic ? 28 : -28), y: isMobile ? 16 : 0,
        autoAlpha: 0, duration: .68, stagger: .10, ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-directory]', start: 'top 81%', once: true },
      });
      gsap.from('[data-co-detail-panel]', {
        y: 28, autoAlpha: 0, duration: .85, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-detail-panel]', start: 'top 87%', once: true },
      });
      gsap.to('[data-co-progress]', {
        scaleY: 1, transformOrigin: 'top center', ease: 'none',
        scrollTrigger: { trigger: '[data-co-capabilities]', start: 'top 65%', end: 'bottom 70%', scrub: .55 },
      });

      // Partnership: the two responsibility panels reveal independently.
      gsap.from('[data-co-relationship-title]', {
        y: 36, autoAlpha: 0, duration: .85, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-relationship-title]', start: 'top 86%', once: true },
      });
      gsap.from('[data-co-relationship-summary]', {
        y: 20, autoAlpha: 0, duration: .75, clearProps: 'all',
        scrollTrigger: { trigger: '[data-co-relationship-summary]', start: 'top 90%', once: true },
      });
      gsap.utils.toArray<HTMLElement>('[data-co-column]').forEach((panel) => {
        gsap.from(panel, {
          y: 36, autoAlpha: 0, duration: .83, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: panel, start: 'top 90%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-co-responsibility]').forEach((row) => {
        gsap.from(row, {
          x: isMobile ? 0 : (isArabic ? 16 : -16), y: isMobile ? 10 : 0,
          autoAlpha: 0, duration: .52, ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: row, start: 'top 92%', once: true },
        });
      });

      // CTA: a drawn rule, then the headline, supporting copy and button.
      const closing = gsap.timeline({
        scrollTrigger: { trigger: '[data-co-cta]', start: 'top 79%', once: true },
        defaults: { ease: 'power3.out' },
      });
      closing
        .from('[data-co-cta-rule]', {
          scaleX: 0, transformOrigin: isArabic ? 'right center' : 'left center',
          duration: .95, clearProps: 'all',
        })
        .from('[data-co-cta-line]', {
          y: 32, autoAlpha: 0, duration: .78, stagger: .15, clearProps: 'all',
        }, '-=.5')
        .from('[data-co-cta-copy]', { y: 18, autoAlpha: 0, duration: .55, clearProps: 'all' }, '-=.33')
        .from('[data-co-cta-button]', { y: 17, autoAlpha: 0, duration: .58, clearProps: 'all' }, '-=.38');
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  // The selected business function transitions as users choose an operational line.
  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from('[data-co-detail-body] > *', {
      y: 17, autoAlpha: 0, duration: .44, stagger: .065,
      ease: 'power2.out', clearProps: 'all',
    });
  }, { scope: root, dependencies: [active, locale], revertOnUpdate: true });

  return (
    <main ref={root} dir={isArabic ? 'rtl' : 'ltr'} lang={locale} className={styles.page}>
      {/* HERO — architectural typography and horizontal operational bands, not a dashboard. */}
      <section className={styles.hero} aria-labelledby="corporate-title">
        <div className={styles.container}>
          <div className={styles.topline} data-co-topline>
            <Link href={localizedPath(locale, '/services')} className={styles.backLink}>
              {isArabic ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>} {t.back}
            </Link>
            <span className={styles.heroIndex}>SAPIHIVE / CORPORATE</span>
          </div>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow} data-co-intro><i/>{t.overline}</span>
              <h1 id="corporate-title"><span className={styles.heroFirstLine} data-co-hero-line>{t.heroA}</span><span data-co-hero-line>{t.heroB}</span></h1>
              <p data-co-intro>{t.heroIntro}</p>
              <a href="#corporate-capabilities" className={styles.action} data-co-intro>
                {t.heroCta} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.operationVisual} aria-label={t.visualHead}>
              <div className={styles.visualTop} data-co-visual><span>{t.visualHead}</span><span>SAPIHIVE CORPORATE</span></div>
              <div className={styles.visualTitle} aria-hidden="true">OPERATIONS<span>IN MOTION</span></div>
              <div className={styles.visualRows}>
                {t.lines.map((line, i) => <div key={labels[i]} className={styles.visualRow} data-co-visual>
                  <span className={styles.visualNumber}>●</span>
                  <strong>{line}</strong>
                  <span className={styles.visualDash}/>
                </div>)}
              </div>
              <div className={styles.visualFooter} data-co-visual>{t.visualBottom}<span className={styles.visualArrow}>↗</span></div>
            </div>
          </div>
          <div className={styles.heroBottom} data-co-intro><span>WORKFORCE-AS-A-SERVICE</span><span>SAPIHIVE © 2026</span></div>
        </div>
      </section>

      {/* CAPABILITIES — interactive editorial directory, not cards. */}
      <section className={styles.capabilities} id="corporate-capabilities" data-co-capabilities>
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <span className={styles.eyebrow}><i/>{t.capabilitiesLabel}</span>
            <h2 data-co-capabilities-heading>{t.capabilitiesTitle.split('\n').map((part, i) => <span key={part} data-co-cap-line className={i ? styles.softText : undefined}>{part}</span>)}</h2>
            <p data-co-cap-intro>{t.capabilitiesIntro}</p>
          </div>
          <div className={styles.directory} data-co-directory>
            <div className={styles.directoryList}>
              <div className={styles.progressTrack} aria-hidden="true"><span data-co-progress /></div>
              {copy.items.map((item, i) => (
                <button
                  type="button" key={labels[i]}
                  className={`${styles.directoryItem} ${active === i ? styles.directoryActive : ''}`}
                  data-co-directory-item
                  onClick={() => setActive(i)}
                  aria-pressed={active === i} aria-controls="corporate-active-detail"
                >
                  <span className={styles.itemNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.itemName}>{item.title}</span>
                  <span className={styles.itemArrow}><ArrowUpRight size={20} aria-hidden="true" /></span>
                </button>
              ))}
            </div>
            <aside className={styles.directoryDetail} data-co-detail-panel id="corporate-active-detail" aria-live="polite" aria-atomic="true">
              <span className={styles.detailLabel}>{t.detailLabel} / {String(active+1).padStart(2, '0')}</span>
              <span className={styles.detailHuge} aria-hidden="true">{markers[active]}</span>
              <div className={styles.detailBody} data-co-detail-body key={`${locale}-${active}`}>
                <span>{t.scopeLabel}</span>
                <h3>{selected.title}</h3>
                <p>{selected.detail}</p>
                <Link href={localizedPath(locale, '/contact')} className={styles.detailLink}>{t.detailCta} <ArrowUpRight size={17}/></Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* THE PARTNERSHIP — a clear B2B division of responsibility. */}
      <section className={styles.relationship}>
        <div className={styles.container}>
          <div className={styles.relationshipHeader}>
            <span className={styles.eyebrow}><i/>{t.relationshipLabel}</span>
            <h2 data-co-relationship-title>{t.relationshipA}<br/><span>{t.relationshipB}</span></h2>
            <p data-co-relationship-summary>{t.proofIntro}</p>
          </div>
          <div className={styles.partnershipColumns}>
            <div className={styles.clientCol} data-co-column>
              <div className={styles.colLabel}><span>{isArabic ? 'دور شركتك' : 'YOUR SIDE'}</span><span>01</span></div>
              <h3>{t.relationshipA} <em>{t.relationshipB}</em></h3>
              {t.youDo.map(item => <div className={styles.responsibility} key={item} data-co-responsibility><Check size={17}/><span>{item}</span></div>)}
            </div>
            <div className={styles.teamCol} data-co-column>
              <div className={styles.colLabel}><span>{isArabic ? 'دور SapiHive' : 'OUR SIDE'}</span><span>02</span></div>
              <h3>{t.relationshipC} <em>{t.relationshipD}</em></h3>
              {t.weDo.map(item => <div className={styles.responsibility} key={item} data-co-responsibility><Check size={17}/><span>{item}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — simple, intentional, not a duplicate of the services overview. */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner} data-co-cta>
            <span className={styles.ctaRule} data-co-cta-rule aria-hidden="true" />
            <div><span className={styles.eyebrow}><i/>{t.ctaLabel}</span><h2><span data-co-cta-line>{t.ctaA}</span><span data-co-cta-line>{t.ctaB}</span></h2><p data-co-cta-copy>{t.ctaBody}</p></div>
            <Link className={styles.ctaButton} data-co-cta-button href={localizedPath(locale, '/contact')}>
              {t.ctaButton} {isArabic ? <MoveLeft size={21}/> : <MoveRight size={21}/>} 
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
