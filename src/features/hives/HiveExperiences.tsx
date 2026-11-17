'use client';

import { useRef, useState, type ReactNode, type RefObject } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  Check, ChevronRight, Code2, Headphones, Layers3, MoveUpRight,
  Palette, Sparkles, UsersRound,
} from 'lucide-react';
import { localizedPath } from '@/i18n/config';
import { hiveContent, type HiveCopy, type HiveSlug, type HiveLocale } from './hiveCopy';
import styles from './HiveExperiences.module.css';

gsap.registerPlugin(ScrollTrigger);

const slugs: HiveSlug[] = ['hive-corporate', 'hive-tech', 'hive-people', 'hive-talent', 'hive-creative'];

function useHiveMotion(root: RefObject<HTMLElement | null>, slug: HiveSlug, locale: HiveLocale) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.utils.toArray<HTMLElement>('[data-hive-intro]');
      if (intro.length) {
        gsap.from(intro, { autoAlpha: 0, y: 26, duration: .9, stagger: .12, ease: 'power3.out', clearProps: 'all' });
      }
      gsap.utils.toArray<HTMLElement>('[data-hive-reveal]').forEach(el => {
        gsap.from(el, {
          autoAlpha: 0, y: 42, duration: .95, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger: el, start: 'top 91%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-hive-row]').forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0, x: locale === 'ar' ? 32 : -32, duration: .7, delay: (i % 5) * .055,
          ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        });
      });
      // Each Hive's signature motion supports its own visual metaphor.
      if (slug === 'hive-corporate') {
        gsap.from('[data-hive-board-line]', { autoAlpha: 0, x: locale === 'ar' ? -18 : 18, duration: .48, stagger: .095, delay: .45, ease: 'power2.out', clearProps: 'all' });
      }
      if (slug === 'hive-talent') {
        gsap.from('[data-hive-talent-pass]', { autoAlpha: 0, rotation: -19, y: 25, duration: 1.25, ease: 'back.out(1.35)', clearProps: 'all' });
      }
      if (slug === 'hive-creative') {
        gsap.from('[data-hive-studio-poster]', { autoAlpha: 0, rotation: -18, y: 25, duration: 1.1, ease: 'power3.out', clearProps: 'all' });
      }
    });
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-hive-parallax]').forEach(el => {
        gsap.fromTo(el, { yPercent: -5 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: .8 } });
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [slug, locale], revertOnUpdate: true });
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ''}`}><span aria-hidden="true" />{children}</div>;
}

function HiveNav({ locale, copy, light = false }: { locale: HiveLocale; copy: HiveCopy; light?: boolean }) {
  return <Link className={`${styles.backLink} ${light ? styles.backLight : ''}`} href={localizedPath(locale, '/services')}>
    {locale === 'ar' ? <ArrowRight size={16} aria-hidden="true" /> : <ArrowLeft size={16} aria-hidden="true" />}
    {copy.back}
  </Link>;
}

function HiveButtons({ locale, copy, destination }: { locale: HiveLocale; copy: HiveCopy; destination: string }) {
  return <div className={styles.heroActions} data-hive-intro>
    <Link href={localizedPath(locale, '/contact')} className={styles.buttonDark}>{copy.contact}<ArrowUpRight size={17} aria-hidden="true" /></Link>
    <a href={destination} className={styles.buttonText}>{copy.explore}<ArrowDownRight size={16} aria-hidden="true" /></a>
  </div>;
}

function FinalCTA({ locale, copy, theme = 'paper' }: { locale: HiveLocale; copy: HiveCopy; theme?: 'paper' | 'navy' | 'white' | 'accent'; slug?: HiveSlug }) {
  return <section className={styles.ctaOuter}>
    <div data-hive-reveal className={`${styles.cta} ${styles['cta_' + theme]}`}>
      <span className={styles.ctaCorner} aria-hidden="true" />
      <div className={styles.ctaCopy}>
        <Eyebrow light={theme === 'navy'}>{copy.finalLabel}</Eyebrow>
        <h2>{copy.finalTitle[0]}<br /><span>{copy.finalTitle[1]}</span></h2>
        <p>{copy.finalBody}</p>
        <Link className={theme === 'navy' ? styles.buttonPaper : styles.buttonDark} href={localizedPath(locale, '/contact')}>
          {copy.finalButton}<ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <span className={styles.ctaWatermark} aria-hidden="true">H.</span>
    </div>
  </section>;
}

function Corporate({ locale, t }: { locale: HiveLocale; t: HiveCopy }) {
  return <>
    <section className={`${styles.hero} ${styles.corporateHero}`} aria-labelledby="corp-heading">
      <div className={styles.container}>
        <HiveNav locale={locale} copy={t} />
        <div className={styles.corpHeroGrid}>
          <div className={styles.heroText}>
            <div data-hive-intro><Eyebrow>{t.kicker}</Eyebrow></div>
            <h1 id="corp-heading" data-hive-intro>{t.headline[0]}<br /><em>{t.headline[1]}</em></h1>
            <p data-hive-intro>{t.intro}</p>
            <HiveButtons locale={locale} copy={t} destination="#corporate-services" />
          </div>
          <div className={styles.corporateBoard} data-hive-intro aria-label={t.visualLabel}>
            <div className={styles.boardHeader}><span><span className={styles.liveDot} />{t.visualLabel}</span><span>SAPIHIVE / CORPORATE</span></div>
            <div className={styles.boardColumns}><span>{locale === 'ar' ? 'الوظيفة' : 'BUSINESS FUNCTION'}</span><span>{locale === 'ar' ? 'الحالة' : 'SUPPORT'}</span></div>
            {t.extra.map((item, i) => <div data-hive-board-line className={styles.boardLine} key={item}>
              <span className={styles.boardSymbol}>{['▦','⌁','◈','≋','✳'][i]}</span><strong>{item}</strong><span className={styles.boardStatus}><Check size={14} aria-hidden="true" /></span>
            </div>)}
            <div className={styles.boardFooter}><span>{locale === 'ar' ? 'مجموعة تخصصات · شريك واحد' : 'MULTIPLE FUNCTIONS · ONE PARTNER'}</span><span className={styles.boardPulse} /></div>
          </div>
        </div>
      </div>
    </section>
    <section id="corporate-services" className={`${styles.section} ${styles.paper}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.sectionLabel}</Eyebrow><h2>{t.sectionTitle[0]}<br /><span>{t.sectionTitle[1]}</span></h2><p>{t.sectionIntro}</p></div>
        <div className={styles.corporateServices}>{t.items.map((item, i) => <article key={item.title} className={styles.corporateService} data-hive-row>
          <span className={styles.corpServiceGlyph}>{['▤','▦','◉','≋','✳'][i]}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><ChevronRight size={20} className={styles.corpChevron} aria-hidden="true" />
        </article>)}</div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.white}`}>
      <div className={`${styles.container} ${styles.corpWhy}`}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.whyLabel}</Eyebrow><h2>{t.whyTitle[0]}<br /><span>{t.whyTitle[1]}</span></h2><p>{t.whyDescription}</p></div>
        <div className={styles.corpProofs}>{t.proof.map(item => <div key={item.title} className={styles.corpProof} data-hive-reveal><span className={styles.proofTick}><Check size={17}/></span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
      </div>
    </section>
    <FinalCTA locale={locale} copy={t} slug="hive-corporate" theme="navy" />
  </>;
}

function Tech({ locale, t }: { locale: HiveLocale; t: HiveCopy }) {
  return <>
    <section className={`${styles.hero} ${styles.techHero}`} aria-labelledby="tech-heading">
      <div className={styles.techLight} aria-hidden="true" />
      <div className={styles.container}>
        <HiveNav locale={locale} copy={t} light />
        <div className={styles.techHeroGrid}>
          <div className={`${styles.heroText} ${styles.heroTextLight}`}>
            <div data-hive-intro><Eyebrow light>{t.kicker}</Eyebrow></div>
            <h1 id="tech-heading" data-hive-intro>{t.headline[0]}<br /><em>{t.headline[1]}</em></h1>
            <p data-hive-intro>{t.intro}</p>
            <div className={styles.heroActions} data-hive-intro><Link className={styles.buttonPaper} href={localizedPath(locale, '/contact')}>{t.contact}<ArrowUpRight size={17}/></Link><a className={styles.buttonTextLight} href="#tech-services">{t.explore}<ArrowDownRight size={16}/></a></div>
          </div>
          <div data-hive-intro className={styles.techConsole} aria-label={t.visualLabel}>
            <div className={styles.terminalTop}><div className={styles.terminalDots}><i/><i/><i/></div><span>SAPIHIVE / TECH</span><Code2 size={17}/></div>
            <div className={styles.consoleBody}>
              <div className={styles.consoleComment}>// {t.visualLabel}</div>
              <div className={styles.consolePrompt}><span className={styles.consoleSign}>›</span> {locale === 'ar' ? 'فرق تقنية' : 'technical teams'}</div>
              {t.extra.map((term, i) => <div className={styles.consoleRow} key={term} style={{ ['--delay' as string]: `${.15 + i * .18}s` }}><span className={styles.consoleCheck}>✓</span><span>{term}</span><span className={styles.consoleBars}><b/><b/><b/></span></div>)}
              <div className={styles.consoleCursor}><span>_</span></div>
            </div>
            <div className={styles.terminalBottom}>WORKFORCE-AS-A-SERVICE <span>●</span></div>
          </div>
        </div>
      </div>
    </section>
    <section id="tech-services" className={`${styles.section} ${styles.paper}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.sectionLabel}</Eyebrow><h2>{t.sectionTitle[0]}<br /><span>{t.sectionTitle[1]}</span></h2><p>{t.sectionIntro}</p></div>
        <div className={styles.techCaps}>{t.items.map((item, i) => <article className={styles.techCapability} data-hive-reveal key={item.title}>
          <div className={styles.techIcon}>{i === 0 ? <Layers3/> : i === 1 ? <Code2/> : <Headphones/>}</div>
          <div className={styles.techCapRule}/><h3>{item.title}</h3><p>{item.detail}</p><span className={styles.techFoot}>TECH / {t.extra[i]}</span>
        </article>)}</div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.white}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.whyLabel}</Eyebrow><h2>{t.whyTitle[0]}<br /><span>{t.whyTitle[1]}</span></h2><p>{t.whyDescription}</p></div>
        <div className={styles.techProof}>{t.proof.map(item => <div data-hive-row key={item.title}><span className={styles.techLittleMark}>›</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
      </div>
    </section>
    <FinalCTA locale={locale} copy={t} slug="hive-tech" theme="paper" />
  </>;
}

function People({ locale, t }: { locale: HiveLocale; t: HiveCopy }) {
  return <>
    <section className={`${styles.hero} ${styles.peopleHero}`} aria-labelledby="people-heading">
      <div className={styles.container}>
        <HiveNav locale={locale} copy={t} />
        <div className={styles.peopleHeroGrid}>
          <div className={styles.heroText}>
            <div data-hive-intro><Eyebrow>{t.kicker}</Eyebrow></div><h1 id="people-heading" data-hive-intro>{t.headline[0]}<br /><em>{t.headline[1]}</em></h1>
            <p data-hive-intro>{t.intro}</p><HiveButtons locale={locale} copy={t} destination="#people-services" />
          </div>
          <div className={styles.peopleVisual} data-hive-intro aria-label={t.visualLabel}>
            <div className={styles.peopleVisualTop}><UsersRound size={18}/><span>{t.visualLabel}</span></div>
            <div className={styles.peopleStack}>{t.extra.map((step, i) => <div key={step} className={styles.peopleStep} style={{ ['--index' as string]: i }}>
              <span className={styles.peopleAvatar}><span className={styles.avatarHead}/><span className={styles.avatarBody}/></span>
              <span className={styles.peopleStepLabel}>{step}</span><span className={styles.peopleDone}><Check size={16}/></span>
            </div>)}</div>
            <div className={styles.peopleVisualFoot}>{locale === 'ar' ? 'خبرات بشرية · عمليات منظمة' : 'HUMAN EXPERTISE · STRUCTURED OPERATIONS'}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="people-services" className={`${styles.section} ${styles.white}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.sectionLabel}</Eyebrow><h2>{t.sectionTitle[0]}<br /><span>{t.sectionTitle[1]}</span></h2><p>{t.sectionIntro}</p></div>
        <div className={styles.peopleCaps}>{t.items.map((item, i) => <article data-hive-row className={styles.peopleCap} key={item.title}><div className={styles.peopleCapIndex}><span>{['●','◐','○'][i]}</span></div><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.paper}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.whyLabel}</Eyebrow><h2>{t.whyTitle[0]}<br /><span>{t.whyTitle[1]}</span></h2><p>{t.whyDescription}</p></div>
        <div className={styles.peopleProof}>{t.proof.map(item => <article data-hive-reveal key={item.title}><span className={styles.peopleProofDiamond}>✳</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      </div>
    </section>
    <FinalCTA locale={locale} copy={t} slug="hive-people" theme="white" />
  </>;
}

function Talent({ locale, t }: { locale: HiveLocale; t: HiveCopy }) {
  return <>
    <section className={`${styles.hero} ${styles.talentHero}`} aria-labelledby="talent-heading">
      <div className={styles.container}>
        <HiveNav locale={locale} copy={t} />
        <div className={styles.talentHeroGrid}>
          <div className={styles.heroText}>
            <div data-hive-intro><Eyebrow>{t.kicker}</Eyebrow></div><h1 id="talent-heading" data-hive-intro>{t.headline[0]}<br /><em>{t.headline[1]}</em></h1>
            <p data-hive-intro>{t.intro}</p><HiveButtons locale={locale} copy={t} destination="#talent-services" />
          </div>
          <div className={styles.talentStage} data-hive-intro aria-label={t.visualLabel}>
            <div className={styles.talentLights} aria-hidden="true"/><div className={styles.talentLabel}>{t.visualLabel}</div>
            <div className={styles.talentTicket} data-hive-parallax data-hive-talent-pass>
              <span>SAPIHIVE</span><strong>TALENT</strong><div className={styles.ticketRule}/>
              <span>EVENTS • CAMPAIGNS • LAUNCHES</span>
              <div className={styles.talentBarcode} aria-hidden="true"/>
            </div>
            <div className={styles.talentBottom}>{locale === 'ar' ? 'كوادر · حضور · تجربة' : 'PEOPLE · PRESENCE · EXPERIENCE'}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="talent-services" className={`${styles.section} ${styles.white}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.sectionLabel}</Eyebrow><h2>{t.sectionTitle[0]}<br /><span>{t.sectionTitle[1]}</span></h2><p>{t.sectionIntro}</p></div>
        <div className={styles.talentCaps}>{t.items.map((item, i) => <article className={styles.talentCap} key={item.title} data-hive-row>
          <div className={styles.talentCapStamp}>{['◆','✴','▲','●'][i]}</div><div><span className={styles.talentCapTiny}>{t.extra[i]}</span><h3>{item.title}</h3><p>{item.detail}</p></div><MoveUpRight className={styles.talentArrow} size={23} aria-hidden="true" />
        </article>)}</div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.paper}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.whyLabel}</Eyebrow><h2>{t.whyTitle[0]}<br /><span>{t.whyTitle[1]}</span></h2><p>{t.whyDescription}</p></div>
        <div className={styles.talentSequence}>{t.proof.map((item, i) => <div key={item.title} data-hive-reveal><span className={styles.talentSequenceSymbol}>{['✳','✷','✦'][i]}</span><h3>{item.title}</h3><p>{item.detail}</p></div>)}</div>
      </div>
    </section>
    <FinalCTA locale={locale} copy={t} slug="hive-talent" theme="paper" />
  </>;
}

function Creative({ locale, t }: { locale: HiveLocale; t: HiveCopy }) {
  const [selected, setSelected] = useState(0);
  return <>
    <section className={`${styles.hero} ${styles.creativeHero}`} aria-labelledby="creative-heading">
      <div className={styles.container}>
        <HiveNav locale={locale} copy={t} />
        <div className={styles.creativeHeroGrid}>
          <div className={styles.heroText}>
            <div data-hive-intro><Eyebrow>{t.kicker}</Eyebrow></div><h1 id="creative-heading" data-hive-intro>{t.headline[0]}<br /><em>{t.headline[1]}</em></h1>
            <p data-hive-intro>{t.intro}</p><HiveButtons locale={locale} copy={t} destination="#creative-services" />
          </div>
          <div className={styles.studioBoard} data-hive-intro aria-label={t.visualLabel}>
            <div className={styles.studioLabel}><Palette size={16}/>{t.visualLabel}</div>
            <div className={styles.studioPoster} data-hive-parallax data-hive-studio-poster><div>CREATIVE<span>THINKING.</span></div><span className={styles.studioPosterBrand}>SAPIHIVE STUDIO</span></div>
            <div className={styles.studioSlip}><Sparkles size={18}/><strong>MAKE IT<br/>CONNECTED.</strong></div>
            <div className={styles.studioColorStrip}><span/><span/><span/><span/></div>
          </div>
        </div>
      </div>
    </section>
    <section id="creative-services" className={`${styles.section} ${styles.paper}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.sectionLabel}</Eyebrow><h2>{t.sectionTitle[0]}<br /><span>{t.sectionTitle[1]}</span></h2><p>{t.sectionIntro}</p></div>
        <div className={styles.creativeStudio} data-hive-reveal>
          <div role="tablist" aria-label={t.sectionLabel} className={styles.creativeTabs}>
            {t.items.map((item, i) => <button key={item.title} id={`creative-tab-${i}`} type="button" role="tab" aria-controls="creative-tab-panel" aria-selected={selected === i} className={`${styles.creativeTab} ${selected === i ? styles.creativeTabActive : ''}`} onClick={() => setSelected(i)}>{item.title}<ArrowUpRight size={16}/></button>)}
          </div>
          <div id="creative-tab-panel" role="tabpanel" aria-labelledby={`creative-tab-${selected}`} className={styles.creativePanel}>
            <div className={`${styles.creativeSample} ${styles['creativeSample' + selected]}`} aria-hidden="true"><span className={styles.sampleOverline}>SAPIHIVE / {t.extra[selected]}</span><strong>{t.extra[selected]}</strong><span className={styles.sampleForm}>✳</span></div>
            <div className={styles.creativePanelCopy}><span>{t.visualLabel}</span><h3>{t.items[selected].title}</h3><p>{t.items[selected].detail}</p></div>
          </div>
        </div>
      </div>
    </section>
    <section className={`${styles.section} ${styles.white}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead} data-hive-reveal><Eyebrow>{t.whyLabel}</Eyebrow><h2>{t.whyTitle[0]}<br /><span>{t.whyTitle[1]}</span></h2><p>{t.whyDescription}</p></div>
        <div className={styles.creativeProof}>{t.proof.map((item, i) => <article key={item.title} data-hive-reveal><span className={styles.creativeProofGraphic}>{['Aa','✳','“”'][i]}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      </div>
    </section>
    <FinalCTA locale={locale} copy={t} slug="hive-creative" theme="accent" />
  </>;
}

export function HiveExperience({ locale, slug }: { locale: HiveLocale; slug: HiveSlug }) {
  const root = useRef<HTMLElement>(null);
  useHiveMotion(root, slug, locale);
  const t = hiveContent[slug][locale];
  return <main ref={root} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={styles.page}>
    {slug === 'hive-corporate' ? <Corporate locale={locale} t={t}/> :
      slug === 'hive-tech' ? <Tech locale={locale} t={t}/> :
      slug === 'hive-people' ? <People locale={locale} t={t}/> :
      slug === 'hive-talent' ? <Talent locale={locale} t={t}/> : <Creative locale={locale} t={t}/>}
  </main>;
}

export { slugs as hiveSlugs };
