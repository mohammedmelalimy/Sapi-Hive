'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, PenTool, Shapes, Clapperboard } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { localizedPath, type Locale } from '@/i18n/config';
import styles from './CreativeExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

const copy = {
  en: {
    back: 'All services', eyebrow: 'HIVE CREATIVE / BRAND & CONTENT',
    heroA: 'Make your brand', heroB: 'impossible to overlook.',
    intro: 'The design and content talent behind a brand that looks, feels and sounds like itself.',
    discover: 'Explore creative services', talk: 'Discuss your brand',
    previewLabel: 'A CREATIVE SYSTEM', previewWords: ['FORM', 'VOICE', 'FEEL'],
    servicesLabel: 'INSIDE THE STUDIO', servicesA: 'Every detail.', servicesB: 'One clear identity.',
    servicesBody: 'Choose a creative discipline to see where our teams can support your brand.',
    serviceNames: ['Graphic design', 'Branding & visual identity', 'Content creation'],
    serviceEyebrows: ['VISUAL COMMUNICATION', 'A RECOGNIZABLE BRAND', 'A CONSISTENT VOICE'],
    serviceBodies: [
      'Design talent to shape clear, compelling brand visuals across the materials your business needs.',
      'Creative professionals focused on building a cohesive visual identity and a recognizable brand presence.',
      'Content teams that help express your brand through consistent messages and creative assets.',
    ],
    serviceArt: [['DESIGN', 'The visual language'], ['IDENTITY', 'One brand. One look.'], ['CONTENT', 'A voice worth hearing']],
    studioNote: 'CREATIVE TEAMS / MANAGED BY SAPIHIVE',
    systemLabel: 'BUILT TO STAY CONSISTENT', systemA: 'Different formats.', systemB: 'The same brand.',
    systemBody: 'From individual graphics to a cohesive identity and ongoing content, our creative talent works toward a shared direction.',
    touchpoints: ['Graphic design', 'Visual identity', 'Content creation'],
    outcome: 'One creative direction across the work your audience sees.',
    ctaLabel: 'YOUR CREATIVE HIVE', ctaA: 'Have a brand to build?', ctaB: 'Let’s shape what comes next.',
    ctaBody: 'Tell us where your brand needs creative expertise. We will discuss the team and support that fit.',
    ctaButton: 'Start a creative conversation',
  },
  ar: {
    back: 'كل الخدمات', eyebrow: 'هايف كرييتف / التصميم والمحتوى',
    heroA: 'خلّي علامتك', heroB: 'تسيب انطباع واضح.',
    intro: 'كوادر متخصصة في التصميم والمحتوى تساعد علامتك في الحفاظ على شكل وصوت مميزين ومتسقين.',
    discover: 'استكشف الخدمات الإبداعية', talk: 'ناقش علامتك معنا',
    previewLabel: 'منظومة إبداعية', previewWords: ['شكل', 'صوت', 'هوية'],
    servicesLabel: 'داخل الاستوديو', servicesA: 'كل تفصيلة مهمة.', servicesB: 'وهوية واحدة واضحة.',
    servicesBody: 'اختر التخصص الإبداعي لتعرف كيف يمكن لفريقنا دعم علامتك.',
    serviceNames: ['التصميم الجرافيكي', 'العلامة التجارية والهوية البصرية', 'إنشاء المحتوى'],
    serviceEyebrows: ['التواصل البصري', 'هوية يمكن تمييزها', 'صوت متسق'],
    serviceBodies: [
      'متخصصون في التصميم لإنتاج مواد بصرية واضحة ومعبرة تخدم احتياجات شركتك.',
      'كوادر إبداعية تهتم بتطوير هوية بصرية متماسكة وحضور واضح لعلامتك.',
      'فرق محتوى تساعد علامتك في تقديم رسائل ومواد إبداعية متسقة.',
    ],
    serviceArt: [['تصميم', 'لغة بصرية واضحة'], ['هوية', 'شكل واحد مميز'], ['محتوى', 'رسالة تُسمع']],
    studioNote: 'فرق إبداعية / تديرها SapiHive',
    systemLabel: 'اتساق عبر كل التفاصيل', systemA: 'أشكال متعددة.', systemB: 'وهوية واحدة.',
    systemBody: 'من التصميمات اليومية إلى الهوية البصرية والمحتوى المستمر، تعمل كوادرنا الإبداعية وفق اتجاه مشترك.',
    touchpoints: ['التصميم الجرافيكي', 'الهوية البصرية', 'إنشاء المحتوى'],
    outcome: 'اتجاه إبداعي متسق في كل ما يراه جمهورك.',
    ctaLabel: 'فريقك الإبداعي', ctaA: 'عندك علامة عاوز تطورها؟', ctaB: 'خلّينا نحدد الخطوة الجاية.',
    ctaBody: 'شاركنا المجال الذي تحتاج فيه علامتك إلى خبرة إبداعية، وسنناقش معك الفريق المناسب.',
    ctaButton: 'تواصل مع فريقنا الإبداعي',
  },
} as const;

const icons = [PenTool, Shapes, Clapperboard] as const;

export function CreativeExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const artwork = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const t = copy[locale];
  const rtl = locale === 'ar';

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-c-intro]', { autoAlpha: 0, y: 22, duration: .85, ease: 'power3.out', stagger: .1, clearProps: 'all' });
      gsap.from('[data-c-sheet]', { autoAlpha: 0, y: 38, rotation: -6, duration: 1, stagger: .13, ease: 'power3.out', clearProps: 'all' });
      gsap.utils.toArray<HTMLElement>('[data-c-reveal]').forEach(el => {
        gsap.from(el, { autoAlpha: 0, y: 27, duration: .8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.fromTo('[data-c-rule]', { scaleX: 0 }, { scaleX: 1, transformOrigin: rtl ? 'right center' : 'left center', ease: 'none', scrollTrigger: { trigger: '[data-c-system]', start: 'top 70%', end: 'bottom 85%', scrub: .7 } });
    });
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to('[data-c-float]', { y: -16, rotation: 2, ease: 'none', scrollTrigger: { trigger: '[data-c-hero]', start: 'top top', end: 'bottom top', scrub: .8 } });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  useGSAP(() => {
    if (!artwork.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(artwork.current.children, { autoAlpha: 0, y: 16, scale: .98 }, { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: 'power2.out', stagger: .09, clearProps: 'all' });
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  const SelectedIcon = icons[active];

  return <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={locale} ref={root}>
    <section className={styles.hero} data-c-hero aria-labelledby="creative-title">
      <div className={styles.shell}>
        <Link className={styles.back} href={localizedPath(locale, '/services')}>{rtl ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>} {t.back}</Link>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow} data-c-intro><span/>{t.eyebrow}</p>
            <h1 id="creative-title" data-c-intro>{t.heroA}<span>{t.heroB}</span></h1>
            <p className={styles.lead} data-c-intro>{t.intro}</p>
            <div className={styles.actions} data-c-intro>
              <a className={styles.darkButton} href="#creative-studio">{t.discover}<ArrowDownRight size={17}/></a>
              <Link className={styles.textButton} href={localizedPath(locale, '/contact')}>{t.talk}<ArrowUpRight size={17}/></Link>
            </div>
          </div>
          <div className={styles.heroArtwork} aria-label={t.previewLabel} role="img">
            <div className={styles.artCorner} data-c-sheet>SAPIHIVE / CREATIVE</div>
            <div className={styles.heroPoster} data-c-sheet data-c-float>
              <span>CREATIVE</span><strong>{rtl ? 'فكر بشكل مختلف' : 'THINK / MAKE / MATTER.'}</strong>
              <div className={styles.posterOrb}><i/><i/><i/></div>
              <small>BRAND EXPRESSION</small>
            </div>
            <div className={styles.heroLabel} data-c-sheet>{t.previewWords.map((word, i) => <span key={i}>{word}</span>)}</div>
            <div className={styles.heroSwatch} data-c-sheet><i/><i/><i/></div>
          </div>
        </div>
      </div>
    </section>

    <section id="creative-studio" className={styles.studio} aria-labelledby="studio-title">
      <div className={styles.shell}>
        <div className={styles.sectionHeading} data-c-reveal>
          <p className={styles.eyebrow}><span/>{t.servicesLabel}</p>
          <h2 id="studio-title">{t.servicesA}<span>{t.servicesB}</span></h2>
          <p>{t.servicesBody}</p>
        </div>
        <div className={styles.studioGrid}>
          <div className={styles.studioControls} role="tablist" aria-label={t.servicesLabel} data-c-reveal>
            {t.serviceNames.map((label, index) => {
              const Icon = icons[index];
              return <button type="button" role="tab" id={`creative-tab-${index}`} key={label} aria-controls="creative-panel" aria-selected={active === index} className={`${styles.tab} ${active === index ? styles.tabActive : ''}`} onClick={() => setActive(index)}>
                <span className={styles.tabIcon}><Icon size={20}/></span><strong>{label}</strong><ArrowUpRight size={17} className={styles.tabArrow}/>
              </button>;
            })}
          </div>
          <div className={styles.studioStage} role="tabpanel" id="creative-panel" aria-labelledby={`creative-tab-${active}`} data-c-reveal>
            <div className={styles.stageTop}><span>SAPIHIVE STUDIO</span><span>{t.serviceEyebrows[active]}</span></div>
            <div ref={artwork} className={`${styles.stageArt} ${styles[`stageVariant${active}`]}`}>
              <div className={styles.stageRibbon}>{t.serviceArt[active][0]}</div>
              <div className={styles.stageCenter}><SelectedIcon size={32} strokeWidth={1.4}/><strong>{t.serviceArt[active][0]}</strong><small>{t.serviceArt[active][1]}</small></div>
              <div className={styles.stageObject}><i/><i/><i/></div>
            </div>
            <div className={styles.stageFoot}><div><strong>{t.serviceNames[active]}</strong><p>{t.serviceBodies[active]}</p></div><Link href={localizedPath(locale, '/contact')} aria-label={t.talk}><ArrowUpRight size={22}/></Link></div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.system} data-c-system aria-labelledby="creative-system">
      <div className={styles.shell}>
        <div className={styles.sectionHeading} data-c-reveal><p className={styles.eyebrow}><span/>{t.systemLabel}</p><h2 id="creative-system">{t.systemA}<span>{t.systemB}</span></h2><p>{t.systemBody}</p></div>
        <div className={styles.touchpoints}>
          <div className={styles.progressTrack}><span data-c-rule/></div>
          {t.touchpoints.map((text, i) => <div className={styles.touchpoint} key={text} data-c-reveal><span className={styles.touchpointMark}>{i === 0 ? '◐' : i === 1 ? '◉' : '✳'}</span><strong>{text}</strong><span className={styles.touchpointRule}/></div>)}
        </div>
        <p className={styles.outcome} data-c-reveal>{t.outcome}</p>
      </div>
    </section>

    <section className={styles.final} aria-labelledby="creative-cta">
      <div className={styles.shell}><div className={styles.finalInner} data-c-reveal>
        <div><p className={styles.eyebrow}><span/>{t.ctaLabel}</p><h2 id="creative-cta">{t.ctaA}<span>{t.ctaB}</span></h2><p>{t.ctaBody}</p></div>
        <Link className={styles.darkButton} href={localizedPath(locale, '/contact')}>{t.ctaButton}<ArrowUpRight size={18}/></Link>
      </div></div>
    </section>
  </main>;
}
