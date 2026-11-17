'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Laptop2,
  LifeBuoy,
  MousePointer2,
  ServerCog,
  Workflow,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { localizedPath } from '@/i18n/config';
import { hiveContent, type HiveLocale } from '@/features/hives/hiveCopy';
import styles from './TechExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

const copy = {
  en: {
    overline: 'HIVE TECH / ENGINEERING & TECHNOLOGY',
    heroA: 'Technology that works.',
    heroB: 'People who build it.',
    heroBody: 'Dedicated engineers to design, develop, test and support the systems behind your business.',
    discover: 'Explore our expertise',
    discuss: 'Discuss your project',
    back: 'All services',
    canvasTop: 'THE TECH ECOSYSTEM',
    canvasStatus: 'CONNECTED BY EXPERTISE',
    canvasHub: 'Your business',
    canvasBottom: 'One dedicated technical team, built around your needs.',
    capabilityLabel: 'WHAT WE DO',
    capabilityHeadingA: 'Three disciplines.',
    capabilityHeadingB: 'One technical partner.',
    capabilityDescription: 'Explore the engineering and technology functions available through Hive Tech.',
    detailsLabel: 'CAPABILITY OVERVIEW',
    detailsFooter: 'Dedicated expertise. Managed workforce.',
    exploreProject: 'Talk to us about this',
    approachLabel: 'BUILT TO WORK WITH YOU',
    approachHeadingA: 'From technical brief',
    approachHeadingB: 'to a team at work.',
    approachBody: 'Your priorities guide the work. SapiHive assembles and manages the people behind it.',
    approach: [
      { title: 'Define', text: 'Tell us which systems, web projects or IT functions need support.' },
      { title: 'Build & test', text: 'Technical specialists work toward your project and operational goals.' },
      { title: 'Support', text: 'The team continues to support the technical functions you rely on.' },
    ],
    approachFoot: 'You stay in control of priorities and the team you work with.',
    ctaLabel: 'YOUR NEXT TECH TEAM',
    ctaA: 'Have something',
    ctaB: 'to build?',
    ctaText: 'Tell us what your business needs. We’ll discuss the technical team that fits.',
    ctaButton: 'Start a conversation',
    diagramTabs: ['SYSTEM', 'INTERFACE', 'SUPPORT'],
    statuses: ['BUILD', 'TEST', 'SUPPORT'],
    architecture: ['Software & Systems', 'Web Development', 'IT Solutions'],
    supporting: 'SAPIHIVE / WORKFORCE-AS-A-SERVICE',
    systemWords: ['Business needs', 'Systems', 'Engineering'],
    websiteWords: ['Web experience', 'Design', 'Develop'],
    supportWords: ['Technology', 'IT support', 'Solutions'],
  },
  ar: {
    overline: 'هايف تك / الهندسة والتكنولوجيا',
    heroA: 'تقنيات تخدم أعمالك.',
    heroB: 'ومهندسون ينفذونها.',
    heroBody: 'فرق هندسية متخصصة لتصميم الأنظمة وتطويرها واختبارها ودعم التقنيات التي تعتمد عليها شركتك.',
    discover: 'استكشف تخصصاتنا',
    discuss: 'ناقش مشروعك',
    back: 'كل الخدمات',
    canvasTop: 'منظومة التقنية',
    canvasStatus: 'خبرات تعمل معًا',
    canvasHub: 'شركتك',
    canvasBottom: 'فريق تقني متخصص مصمم حول احتياجات عملك.',
    capabilityLabel: 'ماذا نقدم',
    capabilityHeadingA: 'ثلاثة تخصصات.',
    capabilityHeadingB: 'وشريك تقني واحد.',
    capabilityDescription: 'تعرّف على المجالات الهندسية والتقنية التي يقدمها Hive Tech لشركتك.',
    detailsLabel: 'نبذة عن التخصص',
    detailsFooter: 'خبرة متخصصة. فريق مُدار.',
    exploreProject: 'تحدث معنا عن هذا التخصص',
    approachLabel: 'نشتغل وفق احتياجاتك',
    approachHeadingA: 'من احتياجك التقني',
    approachHeadingB: 'إلى فريق يبدأ العمل.',
    approachBody: 'أنت تحدد الأولويات، وSapiHive توفر الكوادر وتدير الفريق المسؤول عن التنفيذ.',
    approach: [
      { title: 'تحديد الاحتياج', text: 'شاركنا الأنظمة أو مشاريع الويب أو الوظائف التقنية التي تحتاج إلى دعم.' },
      { title: 'البناء والاختبار', text: 'متخصصون يعملون على تنفيذ أهداف مشروعك وأعمالك.' },
      { title: 'الدعم', text: 'فريق يساعد في دعم الوظائف التقنية التي تعتمد عليها.' },
    ],
    approachFoot: 'أنت تظل صاحب القرار في أولويات العمل والفريق الذي تتعامل معه.',
    ctaLabel: 'فريقك التقني القادم',
    ctaA: 'عندك مشروع',
    ctaB: 'عاوز تنفذه؟',
    ctaText: 'احكِ لنا عن احتياجات شركتك التقنية ونتحدث معك عن الفريق المناسب.',
    ctaButton: 'ابدأ التواصل',
    diagramTabs: ['الأنظمة', 'الواجهات', 'الدعم'],
    statuses: ['بناء', 'اختبار', 'دعم'],
    architecture: ['الأنظمة والبرمجيات', 'تطوير المواقع', 'الحلول التقنية'],
    supporting: 'SAPIHIVE / WORKFORCE-AS-A-SERVICE',
    systemWords: ['احتياجات العمل', 'الأنظمة', 'الهندسة'],
    websiteWords: ['تجربة الويب', 'التصميم', 'التطوير'],
    supportWords: ['التكنولوجيا', 'الدعم الفني', 'الحلول'],
  },
} as const;

const symbols = [Code2, Laptop2, ServerCog] as const;

function DetailArtwork({ type, locale }: { type: number; locale: HiveLocale }) {
  const t = copy[locale];
  if (type === 0) {
    return <div className={styles.diagramSystem} aria-hidden="true">
      <div className={styles.schemaNode}>{t.systemWords[0]}<span/></div>
      <div className={styles.schemaConnector}><i/><i/><i/></div>
      <div className={`${styles.schemaNode} ${styles.schemaMain}`}>{t.systemWords[1]}<Code2 size={23}/></div>
      <div className={styles.schemaConnector}><i/><i/><i/></div>
      <div className={styles.schemaNode}>{t.systemWords[2]}<span/></div>
    </div>;
  }
  if (type === 1) {
    return <div className={styles.browserMock} aria-hidden="true">
      <div className={styles.browserTop}><span/><span/><span/><i>web / experience</i></div>
      <div className={styles.browserNav}><b/><i/><i/><i/></div>
      <div className={styles.browserBody}><div><strong>{t.websiteWords[0]}</strong><span/><span/><small>{t.websiteWords[1]} + {t.websiteWords[2]}</small></div><div className={styles.browserComposition}><b/><b/><b/></div></div>
    </div>;
  }
  return <div className={styles.supportMock} aria-hidden="true">
    <div className={styles.supportHead}><LifeBuoy size={19}/>{t.supportWords[0]}<span>●</span></div>
    <div className={styles.supportRow}><span className={styles.supportIndex}>A</span><strong>{t.supportWords[1]}</strong><Check size={17}/></div>
    <div className={styles.supportRow}><span className={styles.supportIndex}>B</span><strong>{t.supportWords[2]}</strong><Check size={17}/></div>
    <div className={styles.supportRow}><span className={styles.supportIndex}>C</span><strong>Hive Tech</strong><Check size={17}/></div>
  </div>;
}

export function TechExperience({ locale }: { locale: HiveLocale }) {
  const root = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const t = copy[locale];
  const data = hiveContent['hive-tech'][locale];
  const isArabic = locale === 'ar';
  const Icon = symbols[selected];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('[data-t-intro]', { y: 26, opacity: 0, duration: .85, stagger: .10, clearProps: 'all' })
        .from('[data-t-blueprint]', { y: 28, opacity: 0, scale: .96, duration: .95, clearProps: 'all' }, '-=.6')
        .from('[data-t-rail]', { scaleX: 0, transformOrigin: 'center', duration: .8, ease: 'power2.out', stagger: .12, clearProps: 'all' }, '-=.6')
        .from('[data-t-module]', { opacity: 0, y: 12, duration: .45, stagger: .13, clearProps: 'all' }, '-=.6');

      gsap.utils.toArray<HTMLElement>('[data-t-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0, y: 28, duration: .8, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
      gsap.from('[data-t-tab]', {
        autoAlpha: 0, y: 16, stagger: .10, duration: .6, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: '[data-t-tablist]', start: 'top 88%', once: true },
      });
      gsap.from('[data-t-stage]', {
        autoAlpha: 0, y: 35, stagger: .15, duration: .7, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: '[data-t-approach]', start: 'top 75%', once: true },
      });
      gsap.fromTo('[data-t-progress]', { scaleX: 0 }, {
        scaleX: 1, transformOrigin: isArabic ? 'right center' : 'left center', ease: 'none',
        scrollTrigger: { trigger: '[data-t-approach]', start: 'top 60%', end: 'bottom 85%', scrub: .75 },
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (detailRef.current) {
      gsap.fromTo(detailRef.current.children,
        { opacity: 0, y: 13 },
        { opacity: 1, y: 0, duration: .5, stagger: .09, ease: 'power2.out', clearProps: 'all' });
    }
  }, { dependencies: [selected, locale], revertOnUpdate: true });

  return <main ref={root} dir={isArabic ? 'rtl' : 'ltr'} lang={locale} className={styles.page}>
    <section className={styles.hero} aria-labelledby="tech-hero-title">
      <div className={styles.shell}>
        <Link href={localizedPath(locale, '/services')} className={styles.backLink} data-t-intro>
          {isArabic ? <ArrowRight size={17}/> : <ArrowLeft size={17}/>} {t.back}
        </Link>
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-t-intro><span/>{t.overline}</p>
            <h1 id="tech-hero-title" data-t-intro>{t.heroA}<span>{t.heroB}</span></h1>
            <p className={styles.heroBody} data-t-intro>{t.heroBody}</p>
            <div className={styles.heroActions} data-t-intro>
              <a href="#tech-expertise" className={styles.buttonDark}>{t.discover}<ArrowDownRight size={18}/></a>
              <Link href={localizedPath(locale, '/contact')} className={styles.textLink}>{t.discuss}<ArrowUpRight size={17}/></Link>
            </div>
          </div>
          <div className={styles.blueprint} data-t-blueprint aria-label={t.canvasTop}>
            <div className={styles.blueprintGrid} aria-hidden="true"/>
            <div className={styles.canvasTop}><span><span className={styles.signalDot}/>{t.canvasTop}</span><span>HIVE TECH / 003</span></div>
            <div className={styles.canvasCore}>
              <div className={styles.coreHub} data-t-module><Workflow size={28} strokeWidth={1.6}/><strong>{t.canvasHub}</strong></div>
              <div className={styles.rail} data-t-rail aria-hidden="true"><span/><span/><span/></div>
              <div className={styles.architecture}>
                {t.architecture.map((label, index) => {
                  const Symbol = symbols[index];
                  return <div key={label} className={styles.archNode} data-t-module><span className={styles.archIcon}><Symbol size={18} strokeWidth={1.7}/></span><span>{label}</span><Check size={14} className={styles.archCheck}/></div>;
                })}
              </div>
            </div>
            <div className={styles.canvasFooter}><span className={styles.pulseLine}><i/></span><span>{t.canvasBottom}</span></div>
          </div>
        </div>
        <div className={styles.heroBottom}><span>{t.supporting}</span><span className={styles.heroBottomArrow}><ArrowDownRight size={18}/></span></div>
      </div>
    </section>

    <section className={styles.capabilities} id="tech-expertise" aria-labelledby="tech-cap-title">
      <div className={styles.shell}>
        <div className={styles.sectionIntro} data-t-reveal>
          <p className={styles.eyebrow}><span/>{t.capabilityLabel}</p>
          <h2 id="tech-cap-title">{t.capabilityHeadingA}<span>{t.capabilityHeadingB}</span></h2>
          <p className={styles.sectionSubtitle}>{t.capabilityDescription}</p>
        </div>
        <div className={styles.capLayout}>
          <div className={styles.tabList} data-t-tablist>
            {data.items.map((item, index) => {
              const Symbol = symbols[index];
              return <button key={item.title} data-t-tab type="button" aria-pressed={selected === index} className={`${styles.tab} ${selected === index ? styles.tabActive : ''}`} onClick={() => setSelected(index)}>
                <span className={styles.tabIcon}><Symbol size={22} strokeWidth={1.65}/></span>
                <span className={styles.tabText}><strong>{item.title}</strong><small>{t.diagramTabs[index]}</small></span>
                {isArabic ? <ArrowUpRight size={19} className={styles.tabArrow}/> : <ArrowUpRight size={19} className={styles.tabArrow}/>}
              </button>;
            })}
          </div>
          <div className={styles.capPanel} aria-live="polite">
            <div className={styles.capText} ref={detailRef} key={`${locale}-${selected}`}>
              <div className={styles.capPanelTop}><span>{t.detailsLabel}</span><Icon size={22}/></div>
              <h3>{data.items[selected].title}</h3>
              <p>{data.items[selected].detail}</p>
              <Link href={localizedPath(locale, '/contact')} className={styles.capAction}>{t.exploreProject}<ArrowUpRight size={17}/></Link>
            </div>
            <div className={styles.capVisual}><div className={styles.visualLabel}>{t.diagramTabs[selected]} / HIVE TECH</div><DetailArtwork type={selected} locale={locale}/></div>
            <div className={styles.capPanelBottom}>{t.detailsFooter}<span>● ● ●</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.approach} data-t-approach aria-labelledby="tech-approach-title">
      <div className={styles.shell}>
        <div className={styles.sectionIntro} data-t-reveal>
          <p className={styles.eyebrow}><span/>{t.approachLabel}</p>
          <h2 id="tech-approach-title">{t.approachHeadingA}<span>{t.approachHeadingB}</span></h2>
          <p className={styles.sectionSubtitle}>{t.approachBody}</p>
        </div>
        <div className={styles.approachTrack}><div data-t-progress className={styles.approachProgress} aria-hidden="true"/></div>
        <div className={styles.approachGrid}>
          {t.approach.map((step, index) => <article key={step.title} className={styles.stage} data-t-stage>
            <div className={styles.stageTop}><span className={styles.stageDot}/><span className={styles.stageIndex}>0{index+1}</span></div>
            <h3>{step.title}</h3><p>{step.text}</p>
          </article>)}
        </div>
        <p className={styles.approachFoot} data-t-reveal><Check size={18}/>{t.approachFoot}</p>
      </div>
    </section>

    <section className={styles.final} aria-labelledby="tech-final-title">
      <div className={`${styles.shell} ${styles.finalInner}`} data-t-reveal>
        <div className={styles.finalCopy}>
          <p className={styles.eyebrow}><span/>{t.ctaLabel}</p>
          <h2 id="tech-final-title">{t.ctaA}<span>{t.ctaB}</span></h2>
          <p className={styles.sectionSubtitle}>{t.ctaText}</p>
        </div>
        <Link href={localizedPath(locale, '/contact')} className={styles.finalButton}>{t.ctaButton}<ArrowUpRight size={20}/></Link>
        <div className={styles.finalGlyph} aria-hidden="true"><MousePointer2 size={130} strokeWidth={.75}/></div>
      </div>
    </section>
  </main>;
}
