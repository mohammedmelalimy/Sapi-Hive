'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Ticket, UsersRound, Megaphone, ScanLine, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { localizedPath, type Locale } from '@/i18n/config';
import styles from './TalentExperience.module.css';

gsap.registerPlugin(ScrollTrigger);

const copy = {
  en: {
    back: 'All services', label: 'HIVE TALENT / LIVE BRAND EXPERIENCES',
    heroA: 'The right people.', heroB: 'At the right moment.',
    intro: 'The people representing your brand where it matters most — events, activations, campaigns and launches.',
    explore: 'Meet your talent team', cta: 'Plan your next activation',
    stageKicker: 'LIVE / ON BRAND', stageCaption: 'PEOPLE WHO MAKE THE MOMENT',
    stageLines: ['SHOW UP', 'STAND OUT'],
    rolesLabel: 'THE PEOPLE BEHIND THE EXPERIENCE', rolesA: 'Every role matters.', rolesB: 'Every impression counts.',
    rolesIntro: 'Explore the on-ground talent available to represent and support your brand.',
    roles: [
      {title:'Models & promoters', short:'Make the brand visible.', description:'On-ground promotional and modeling talent to support how your brand shows up in person.'},
      {title:'Brand ambassadors', short:'Make the connection personal.', description:'People who represent your brand and engage with audiences face to face.'},
      {title:'Ushers & event staff', short:'Keep the experience moving.', description:'Event teams who support guest flow, hosting and on-site assistance.'},
      {title:'Event & campaign staffing', short:'Bring the whole team together.', description:'Staffing support for activations, events, launches and campaign activity.'},
    ],
    rolePanel: 'ON-GROUND EXPERIENCE', roleAction: 'Talk about this role',
    planLabel: 'FROM BRIEF TO LIVE', planA: 'A clear brief.', planB: 'A team ready to show up.',
    planBody: 'A simple way to talk about your next event or campaign and the roles it needs.',
    steps: [
      {name:'Tell us the occasion', text:'Share the type of event or campaign, audience, location and the roles you have in mind.'},
      {name:'Shape the team', text:'Discuss the number of people and the talent profiles that fit your needs.'},
      {name:'Bring it to life', text:'Align the people and on-site responsibilities around your experience.'},
    ],
    finalLabel: 'YOUR NEXT LIVE EXPERIENCE', finalA: 'Make the moment count.', finalB: 'Start with the right team.',
    finalBody:'Whether it is a launch, an activation or an event, tell us what you are planning.', finalButton:'Let’s talk talent',
  },
  ar: {
    back: 'كل الخدمات', label: 'هايف تالنت / تجارب العلامات على أرض الواقع',
    heroA: 'الأشخاص المناسبون.', heroB: 'في اللحظة المناسبة.',
    intro: 'كوادر تمثل علامتك في الفعاليات والتنشيطات والحملات والإطلاقات، حيث يكون التواصل المباشر مع الجمهور.',
    explore: 'تعرّف على فرق الفعاليات', cta: 'خطط لفعاليتك القادمة',
    stageKicker: 'مباشر / حضور يليق بعلامتك', stageCaption: 'الأشخاص يصنعون اللحظة',
    stageLines: ['حضور', 'يُحدث فرقًا'],
    rolesLabel: 'الفريق وراء التجربة', rolesA: 'لكل دور قيمته.', rolesB: 'ولكل انطباع أثره.',
    rolesIntro: 'تعرّف على الكوادر الميدانية التي يمكنها تمثيل علامتك ودعم فعالياتك.',
    roles: [
      {title:'العارضون والمروجون', short:'حضور واضح للعلامة.', description:'كوادر للعرض والترويج تساعد علامتك على الظهور بشكل مميز في التفاعل المباشر.'},
      {title:'سفراء العلامة التجارية', short:'تواصل بشري مباشر.', description:'أشخاص يمثلون علامتك ويتواصلون مع الجمهور وجهًا لوجه.'},
      {title:'المنظمون وطاقم الفعاليات', short:'تجربة أكثر تنظيمًا.', description:'فرق تدعم استقبال الضيوف وتنظيم حركتهم والمساعدة في موقع الفعالية.'},
      {title:'فرق الفعاليات والحملات', short:'كل الأدوار في فريق واحد.', description:'دعم في توفير الكوادر المطلوبة للفعاليات والتنشيطات والإطلاقات والحملات.'},
    ],
    rolePanel: 'الخبرات الميدانية', roleAction: 'ناقش احتياجك لهذا الدور',
    planLabel: 'من الطلب إلى أرض الواقع', planA: 'احتياج واضح.', planB: 'وفريق جاهز للتجربة.',
    planBody: 'طريقة بسيطة لمناقشة فعاليتك القادمة والأدوار التي تحتاج إليها.',
    steps: [
      {name:'شاركنا تفاصيل الفعالية', text:'وضّح نوع الفعالية أو الحملة، والجمهور، والمكان، والأدوار التي تحتاجها.'},
      {name:'حدد تكوين الفريق', text:'ناقش عدد الأفراد والملفات المهنية المناسبة لاحتياجك.'},
      {name:'حوّل الخطة إلى تجربة', text:'نسّق الكوادر والمسؤوليات الميدانية وفق طبيعة فعاليتك.'},
    ],
    finalLabel: 'تجربتك المباشرة القادمة', finalA: 'خلّي للحظة أثر.', finalB: 'بالفريق المناسب.',
    finalBody:'من إطلاق منتج إلى فعالية أو حملة، شاركنا ما تخطط له.', finalButton:'تواصل بشأن فريق Talent',
  },
} as const;

const icons = [Sparkles, Megaphone, UsersRound, Ticket] as const;

export function TalentExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const activePanel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const t = copy[locale];
  const rtl = locale === 'ar';
  const RoleIcon = icons[active];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-l-hero]', { autoAlpha: 0, y: 25, duration: .82, stagger: .11, ease: 'power3.out', clearProps: 'all' });
      gsap.from('[data-l-ticket]', { autoAlpha: 0, y: 44, rotation: rtl ? -9 : 9, scale: .92, duration: 1.2, ease: 'back.out(1.25)', clearProps: 'all' });
      gsap.from('[data-l-light]', { opacity: 0, scale: .7, duration: 1.5, stagger: .2, ease: 'power2.out', clearProps: 'all' });
      gsap.utils.toArray<HTMLElement>('[data-l-reveal]').forEach(el => {
        gsap.from(el, { autoAlpha: 0, y: 26, duration: .78, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
      gsap.from('[data-l-role]', { autoAlpha: 0, y: 20, stagger: .085, duration: .7, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: '[data-l-roles]', start: 'top 82%', once: true } });
      gsap.fromTo('[data-l-progress]', { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top center', ease: 'none', scrollTrigger: { trigger: '[data-l-timeline]', start: 'top 70%', end: 'bottom 80%', scrub: .7 } });
    });
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to('[data-l-ticket]', { y: -18, rotation: rtl ? 3 : -3, ease: 'none', scrollTrigger: { trigger: '[data-l-stage]', start: 'top top', end: 'bottom top', scrub: 1 } });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  useGSAP(() => {
    if (!activePanel.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(activePanel.current.children, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .42, stagger: .08, ease: 'power2.out', clearProps: 'all' });
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  return <main className={styles.page} ref={root} dir={rtl ? 'rtl' : 'ltr'} lang={locale}>
    <section className={styles.hero} aria-labelledby="talent-title" data-l-stage>
      <div className={styles.shell}>
        <Link className={styles.back} href={localizedPath(locale, '/services')}>{rtl ? <ArrowRight size={16}/> : <ArrowLeft size={16}/>} {t.back}</Link>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow} data-l-hero><span/>{t.label}</p>
            <h1 id="talent-title" data-l-hero>{t.heroA}<span>{t.heroB}</span></h1>
            <p className={styles.lead} data-l-hero>{t.intro}</p>
            <div className={styles.heroButtons} data-l-hero>
              <a className={styles.lightButton} href="#talent-roles">{t.explore}<ArrowDownRight size={17}/></a>
              <Link className={styles.heroLink} href={localizedPath(locale, '/contact')}>{t.cta}<ArrowUpRight size={17}/></Link>
            </div>
          </div>
          <div className={styles.stage} aria-label={t.stageKicker} role="img">
            <div className={styles.spotlightOne} data-l-light/>
            <div className={styles.spotlightTwo} data-l-light/>
            <div className={styles.stageMark}>SAPIHIVE / TALENT</div>
            <div className={styles.credential} data-l-ticket>
              <div className={styles.credentialTop}><span>THE HIVE</span><ScanLine size={23}/></div>
              <span className={styles.liveTag}>LIVE EXPERIENCES</span>
              <strong>{t.stageLines[0]}<span>{t.stageLines[1]}</span></strong>
              <div className={styles.credentialBottom}><span>BRAND PRESENCE</span><span className={styles.scanBars} aria-hidden="true"/></div>
            </div>
            <div className={styles.stageBottom}>{t.stageCaption}<span>✳</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.rolesSection} id="talent-roles" aria-labelledby="roles-title">
      <div className={styles.shell}>
        <div className={styles.sectionHeading} data-l-reveal>
          <p className={styles.eyebrow}><span/>{t.rolesLabel}</p><h2 id="roles-title">{t.rolesA}<span>{t.rolesB}</span></h2><p>{t.rolesIntro}</p>
        </div>
        <div className={styles.rolesGrid} data-l-roles>
          <div className={styles.roleList} role="tablist" aria-label={t.rolesLabel}>
            {t.roles.map((role, i) => <button type="button" className={`${styles.roleButton} ${active === i ? styles.activeRole : ''}`} key={role.title} role="tab" aria-selected={active === i} aria-controls="talent-panel" id={`talent-tab-${i}`} onClick={() => setActive(i)} data-l-role>
              <span className={styles.roleIcon}>{i === 0 ? <Sparkles size={20}/> : i === 1 ? <Megaphone size={20}/> : i === 2 ? <UsersRound size={20}/> : <Ticket size={20}/>}</span>
              <span className={styles.roleText}><strong>{role.title}</strong><small>{role.short}</small></span>
              <ArrowUpRight className={styles.roleArrow} size={18}/>
            </button>)}
          </div>
          <div className={styles.rolePanel} role="tabpanel" id="talent-panel" aria-labelledby={`talent-tab-${active}`} data-l-reveal>
            <div className={styles.panelTop}><span>{t.rolePanel}</span><span className={styles.panelSpark}>✳</span></div>
            <div ref={activePanel} className={styles.panelContent}>
              <div className={styles.panelIcon}><RoleIcon size={38} strokeWidth={1.5}/></div>
              <h3>{t.roles[active].title}</h3>
              <p>{t.roles[active].description}</p>
            </div>
            <Link href={localizedPath(locale, '/contact')} className={styles.panelAction}>{t.roleAction}<ArrowUpRight size={18}/></Link>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.planSection} aria-labelledby="talent-plan-title" data-l-timeline>
      <div className={styles.shell}>
        <div className={styles.sectionHeading} data-l-reveal>
          <p className={styles.eyebrow}><span/>{t.planLabel}</p><h2 id="talent-plan-title">{t.planA}<span>{t.planB}</span></h2><p>{t.planBody}</p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.timelineTrack} aria-hidden="true"><span data-l-progress/></div>
          {t.steps.map((step, i) => <div key={step.name} className={styles.timelineRow} data-l-reveal>
            <div className={styles.timelineDot}><Check size={16}/></div>
            <div className={styles.timelineNum}>{String(i + 1).padStart(2,'0')}</div>
            <h3>{step.name}</h3>
            <p>{step.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className={styles.final} aria-labelledby="talent-cta-title">
      <div className={styles.shell}>
        <div className={styles.finalPanel} data-l-reveal>
          <div><p className={styles.eyebrow}><span/>{t.finalLabel}</p><h2 id="talent-cta-title">{t.finalA}<span>{t.finalB}</span></h2><p>{t.finalBody}</p></div>
          <Link className={styles.lightButton} href={localizedPath(locale, '/contact')}>{t.finalButton}<ArrowUpRight size={18}/></Link>
        </div>
      </div>
    </section>
  </main>;
}
