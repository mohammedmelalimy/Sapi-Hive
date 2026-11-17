'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText, Heart, Search, UsersRound, Wallet } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { localizedPath } from '@/i18n/config';
import styles from './PeopleExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

type Locale = 'en' | 'ar';

const content = {
  en: {
    back: 'All services',
    eyebrow: 'HIVE PEOPLE  /  HUMAN RESOURCES',
    titleA: 'Great teams', titleB: 'start with people.',
    heroBody: 'From finding the right talent to handling everyday HR and payroll, we bring the people and structure your business needs.',
    discover: 'Explore our people services', talk: 'Talk to our team',
    collageTitle: 'PEOPLE, SUPPORTED',
    collageMain: 'A more human way to run HR.',
    collageNote: 'Recruitment · HR operations · Payroll',
    portraitOne: 'FIND', portraitTwo: 'SUPPORT', portraitThree: 'PAY',
    trust: 'Workforce-as-a-Service',
    sectionLabel: 'WHAT WE DO',
    sectionTitleA: 'Every stage matters.', sectionTitleB: 'Every person counts.',
    sectionDescription: 'Three focused areas to make the people side of your business easier to run.',
    featureOverline: ['FIND THE RIGHT PEOPLE', 'SUPPORT YOUR TEAM', 'HANDLE PAYROLL'],
    featureTitle: ['Recruitment & mass hiring', 'HR operations', 'Payroll processing'],
    featureBody: [
      'Recruit the people your business needs, whether you are adding a specialist or hiring at scale.',
      'Dedicated HR professionals to support the day-to-day operations behind your workforce.',
      'Organized payroll processing that helps keep an essential people function in order.',
    ],
    visualLabels: ['CANDIDATE FLOW', 'PEOPLE OPERATIONS', 'PAYROLL MANAGEMENT'],
    candidateLabels: ['Candidate profiles', 'Hiring needs', 'Team fit'],
    hrLabels: ['People records', 'HR support', 'Day-to-day operations'],
    payrollLabels: ['Payroll details', 'Processing', 'Organized'],
    partnerLabel: 'HOW WE WORK WITH YOU',
    partnerTitleA: 'Your team comes first.', partnerTitleB: 'We handle the structure.',
    partnerDescription: 'You stay involved in choosing and directing the people. SapiHive looks after the workforce and its administration.',
    proof: [
      ['You stay in control', 'Interview, approve and direct the team members who work with you.'],
      ['One monthly invoice', 'Salaries, insurance, HR and compliance are organized together.'],
      ['Bilingual by default', 'Team members work in Arabic and English.'],
      ['Replacement guarantee', 'If a member is not the right fit, we replace them at no cost.'],
    ],
    finalLabel: 'LET’S BUILD YOUR PEOPLE HIVE',
    finalA: 'People at the heart.', finalB: 'Support at every step.',
    finalBody: 'Tell us what kind of HR, hiring or payroll support your business needs.',
    finalButton: 'Discuss your people needs',
  },
  ar: {
    back: 'كل الخدمات',
    eyebrow: 'هايف بيبول  /  الموارد البشرية',
    titleA: 'فريق أقوى يبدأ', titleB: 'من الاهتمام بالأفراد.',
    heroBody: 'من استقطاب الكفاءات إلى إدارة الموارد البشرية والرواتب، نوفر لشركتك المتخصصين والنظام الذي تحتاجه.',
    discover: 'استكشف خدمات الأفراد', talk: 'تواصل مع فريقنا',
    collageTitle: 'الأفراد أولويتنا',
    collageMain: 'إدارة موارد بشرية تهتم بالناس.',
    collageNote: 'التوظيف · الموارد البشرية · الرواتب',
    portraitOne: 'استقطاب', portraitTwo: 'دعم', portraitThree: 'رواتب',
    trust: 'القوى العاملة كخدمة',
    sectionLabel: 'خدماتنا',
    sectionTitleA: 'كل مرحلة مهمة.', sectionTitleB: 'وكل فرد له قيمة.',
    sectionDescription: 'ثلاثة مجالات متخصصة لتسهيل إدارة الأفراد داخل شركتك.',
    featureOverline: ['اختيار الكفاءات', 'دعم فريق العمل', 'إدارة الرواتب'],
    featureTitle: ['التوظيف والتوظيف واسع النطاق', 'عمليات الموارد البشرية', 'معالجة الرواتب'],
    featureBody: [
      'نساعدك في استقطاب الكوادر التي تحتاجها شركتك، سواء لوظيفة متخصصة أو للتوظيف بأعداد كبيرة.',
      'متخصصون في الموارد البشرية لدعم العمليات اليومية المرتبطة بإدارة فريقك.',
      'معالجة منظمة للرواتب لدعم جانب أساسي من إدارة القوى العاملة.',
    ],
    visualLabels: ['رحلة المرشحين', 'شؤون الأفراد', 'إدارة الرواتب'],
    candidateLabels: ['ملفات المرشحين', 'احتياجات التوظيف', 'التوافق مع الفريق'],
    hrLabels: ['ملفات الأفراد', 'الدعم الإداري', 'العمليات اليومية'],
    payrollLabels: ['بيانات الرواتب', 'المعالجة', 'التنظيم'],
    partnerLabel: 'أسلوب التعاون',
    partnerTitleA: 'فريقك هو الأساس.', partnerTitleB: 'ونحن ندير التفاصيل.',
    partnerDescription: 'تشارك في اختيار أفراد الفريق وتوجيههم، بينما تتولى SapiHive التوظيف والإدارة والجانب الإداري المرتبط بالقوى العاملة.',
    proof: [
      ['القرار في إيدك', 'تجري المقابلات وتعتمد أعضاء الفريق وتوجه عملهم.'],
      ['فاتورة شهرية واحدة', 'الرواتب والتأمينات والموارد البشرية والامتثال في إطار واحد.'],
      ['العربية والإنجليزية', 'أعضاء الفريق يعملون باللغتين.'],
      ['ضمان الاستبدال', 'إذا لم يكن أحد الأعضاء مناسبًا، نستبدله دون تكلفة إضافية.'],
    ],
    finalLabel: 'ابنِ فريق الموارد البشرية المناسب',
    finalA: 'الأفراد في قلب العمل.', finalB: 'والدعم في كل خطوة.',
    finalBody: 'شاركنا احتياجات شركتك في التوظيف أو الموارد البشرية أو إدارة الرواتب.',
    finalButton: 'ناقش احتياجات فريقك',
  },
} as const;

/** Visual language: people-centered editorial paper, not an orbit, tech console or analytics dashboard. */
function PeopleMosaic({ locale }: { locale: Locale }) {
  const t = content[locale];
  return <div className={styles.mosaic} aria-label={t.collageMain}>
    <div className={styles.mosaicTop} data-p-visual><span className={styles.mosaicDot}/><span>{t.collageTitle}</span><Heart size={15} strokeWidth={1.6}/></div>
    <div className={styles.portraitStage} aria-hidden="true">
      <div className={`${styles.personCard} ${styles.personCardOne}`} data-p-person>
        <div className={`${styles.personArt} ${styles.personArtOne}`}><span className={styles.personHead}/><span className={styles.personBody}/><i/></div>
        <span className={styles.personTag}>{t.portraitOne}</span>
      </div>
      <div className={`${styles.personCard} ${styles.personCardTwo}`} data-p-person>
        <div className={`${styles.personArt} ${styles.personArtTwo}`}><span className={styles.personHead}/><span className={styles.personBody}/><i/></div>
        <span className={styles.personTag}>{t.portraitTwo}</span>
      </div>
      <div className={`${styles.personCard} ${styles.personCardThree}`} data-p-person>
        <div className={`${styles.personArt} ${styles.personArtThree}`}><span className={styles.personHead}/><span className={styles.personBody}/><i/></div>
        <span className={styles.personTag}>{t.portraitThree}</span>
      </div>
    </div>
    <div className={styles.mosaicBottom} data-p-visual><strong>{t.collageMain}</strong><small>{t.collageNote}</small></div>
  </div>;
}

function FeatureArtwork({ index, locale }: { index: number; locale: Locale }) {
  const t = content[locale];
  if (index === 0) return <div className={styles.artSurface} aria-hidden="true">
    <div className={styles.artLabel}><Search size={14}/>{t.visualLabels[0]}</div>
    <div className={styles.candidateStack}>
      {t.candidateLabels.map((name, i) => <div key={name} className={`${styles.candidateSheet} ${styles[`candidateSheet${i}`]}`}>
        <span className={styles.candidateAvatar}><UsersRound size={19}/></span><div><strong>{name}</strong><span/><span/></div><Check size={16} className={styles.candidateCheck}/>
      </div>)}
    </div>
  </div>;
  if (index === 1) return <div className={styles.artSurface} aria-hidden="true">
    <div className={styles.artLabel}><Heart size={14}/>{t.visualLabels[1]}</div>
    <div className={styles.hrBoard}>
      <div className={styles.hrBoardHead}><UsersRound size={21}/><span>{t.hrLabels[0]}</span><i/></div>
      {t.hrLabels.slice(1).map((line, idx) => <div key={line} className={styles.hrBoardLine}><span className={styles.hrRowIcon}>{idx === 0 ? <Heart size={15}/> : <FileText size={15}/>}</span><strong>{line}</strong><Check size={17}/></div>)}
    </div>
  </div>;
  return <div className={styles.artSurface} aria-hidden="true">
    <div className={styles.artLabel}><Wallet size={14}/>{t.visualLabels[2]}</div>
    <div className={styles.payrollPaper}>
      <div className={styles.payrollHead}><Wallet size={20}/><span>{t.payrollLabels[0]}</span><Check size={18}/></div>
      <div className={styles.payrollBars}><i/><i/><i/><i/></div>
      <div className={styles.payrollFooter}><span>{t.payrollLabels[1]}</span><strong>{t.payrollLabels[2]}</strong></div>
    </div>
  </div>;
}

const capabilityIcons = [Search, UsersRound, Wallet];

export function PeopleExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = content[locale];
  const rtl = locale === 'ar';

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Mobile: no rotation or horizontal travel for the overlapping hero cards.
      // This prevents animated transforms from increasing the visual scroll area.
      const compactMotion = window.matchMedia('(max-width: 767px)').matches;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('[data-p-intro]', { opacity: 0, y: 24, duration: .75, stagger: .12, clearProps: 'all' })
        .from('[data-p-person]', compactMotion
          ? { opacity: 0, y: 16, duration: .62, stagger: .10, ease: 'power2.out', clearProps: 'all' }
          : { opacity: 0, y: 38, rotation: (i: number) => [-7, 7, -4][i], duration: .9, stagger: .13, ease: 'back.out(1.25)', clearProps: 'all' }, '-=.58')
        .from('[data-p-visual]', { opacity: 0, y: 13, duration: .65, stagger: .16, clearProps: 'all' }, '-=.45');
      gsap.from('[data-p-hero-rule]', { scaleX: 0, transformOrigin: rtl ? 'right' : 'left', duration: .85, clearProps: 'all' });
      gsap.utils.toArray<HTMLElement>('[data-p-reveal]').forEach(el => {
        gsap.from(el, { opacity: 0, y: 32, duration: .8, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-p-feature]').forEach(el => {
        const art = el.querySelector('[data-p-art]');
        const text = el.querySelector('[data-p-feature-copy]');
        if (art) gsap.from(art, { opacity: 0, y: compactMotion ? 14 : 40, ...(compactMotion ? {} : { clipPath: 'inset(16% 0 0 0 round 20px)' }), duration: compactMotion ? .65 : 1, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
        if (text) gsap.from(text, { opacity: 0, y: compactMotion ? 14 : 24, duration: .75, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 81%', once: true } });
      });
      gsap.from('[data-p-proof]', { opacity: 0, y: 18, stagger: .13, duration: .7, clearProps: 'all', scrollTrigger: { trigger: '[data-p-proof-grid]', start: 'top 80%', once: true } });
      gsap.from('[data-p-cta-underline]', { scaleX: 0, transformOrigin: rtl ? 'right' : 'left', ease: 'power2.out', duration: 1, scrollTrigger: { trigger: '[data-p-final]', start: 'top 80%', once: true }, clearProps: 'all' });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  return <main ref={root} lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={styles.page}>
    <section className={styles.hero} aria-labelledby="people-hero-title">
      <div className={styles.shell}>
        <Link className={styles.backLink} href={localizedPath(locale, '/services')} data-p-intro>{rtl ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>} {t.back}</Link>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-p-intro><span/>{t.eyebrow}</p>
            <h1 id="people-hero-title"><span data-p-intro>{t.titleA}</span><span className={styles.mutedTitle} data-p-intro>{t.titleB}</span></h1>
            <p className={styles.bodyText} data-p-intro>{t.heroBody}</p>
            <div className={styles.heroActions} data-p-intro>
              <a href="#people-services" className={styles.primaryButton}>{t.discover}<ArrowDownRight size={17}/></a>
              <Link href={localizedPath(locale, '/contact')} className={styles.textButton}>{t.talk}<ArrowUpRight size={16}/></Link>
            </div>
          </div>
          <PeopleMosaic locale={locale}/>
        </div>
        <div className={styles.heroRule} data-p-hero-rule><span>{t.trust}</span><span>HIVE PEOPLE</span></div>
      </div>
    </section>

    <section className={styles.services} id="people-services" aria-labelledby="people-services-title">
      <div className={styles.shell}>
        <header className={styles.sectionHead} data-p-reveal>
          <p className={styles.eyebrow}><span/>{t.sectionLabel}</p>
          <h2 id="people-services-title">{t.sectionTitleA}<span>{t.sectionTitleB}</span></h2>
          <p className={styles.sectionSubtitle}>{t.sectionDescription}</p>
        </header>
        <div className={styles.featureList}>
          {t.featureTitle.map((heading, index) => {
            const Icon = capabilityIcons[index];
            return <article key={heading} data-p-feature className={styles.featureRow}>
              <div className={styles.featureCopy} data-p-feature-copy>
                <div className={styles.featureIcon}><Icon size={23} strokeWidth={1.65}/></div>
                <p className={styles.miniLabel}>{t.featureOverline[index]}</p>
                <h3>{heading}</h3>
                <p className={styles.featureBody}>{t.featureBody[index]}</p>
                <Link href={localizedPath(locale, '/contact')} aria-label={`${heading} — ${t.talk}`} className={styles.inlineLink}>{t.talk}<ArrowUpRight size={16}/></Link>
              </div>
              <div className={styles.featureArt} data-p-art><FeatureArtwork index={index} locale={locale}/></div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className={styles.partner} aria-labelledby="people-partner-title">
      <div className={styles.shell}>
        <header className={styles.sectionHead} data-p-reveal>
          <p className={styles.eyebrow}><span/>{t.partnerLabel}</p>
          <h2 id="people-partner-title">{t.partnerTitleA}<span>{t.partnerTitleB}</span></h2>
          <p className={styles.sectionSubtitle}>{t.partnerDescription}</p>
        </header>
        <div className={styles.proofGrid} data-p-proof-grid>
          {t.proof.map(([name, detail]) => <article key={name} className={styles.proofRow} data-p-proof>
            <span className={styles.proofBullet}><Check size={18} strokeWidth={1.7}/></span>
            <div><h3>{name}</h3><p>{detail}</p></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.final} data-p-final aria-labelledby="people-final-title">
      <div className={styles.shell}>
        <div className={styles.finalPanel} data-p-reveal>
          <div>
            <p className={styles.eyebrow}><span/>{t.finalLabel}</p>
            <h2 id="people-final-title">{t.finalA}<span>{t.finalB}</span></h2>
            <p className={styles.sectionSubtitle}>{t.finalBody}</p>
          </div>
          <Link href={localizedPath(locale, '/contact')} className={styles.finalButton}>{t.finalButton}<ArrowUpRight size={19}/></Link>
          <span className={styles.ctaUnderline} data-p-cta-underline aria-hidden="true"/>
        </div>
      </div>
    </section>
  </main>;
}
