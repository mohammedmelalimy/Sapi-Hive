"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  BookOpenCheck, BriefcaseBusiness, Headphones, Layers3,
  Network, PackageCheck, ShieldCheck, UsersRound, Languages,
  RefreshCw,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { localizedPath, type Locale } from "@/i18n/config";
import styles from "./HiveCorporateExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

const content = {
  en: {
    eyebrow: "HIVE CORPORATE  /  BUSINESS OPERATIONS",
    back: "All services",
    titleA: "The people behind",
    titleB: "your operations.",
    intro: "From finance and back-office to customer support and logistics — a dedicated team to keep your everyday business running.",
    explore: "Explore capabilities",
    talk: "Discuss your requirements",
    visualHeading: "One managed operation",
    visualTag: "BUILT AROUND YOUR BUSINESS",
    centerTop: "ONE",
    centerBottom: "HIVE",
    visualNames: ["Finance", "Admin", "Support", "Logistics", "Consulting"],
    capabilitiesLabel: "WHAT WE HANDLE",
    capabilitiesTitleA: "The essential work.",
    capabilitiesTitleB: "Handled with care.",
    capabilitiesIntro: "Five areas of everyday business support. One partner bringing the right people and structure together.",
    capabilityItems: [
      { title: "Finance support & bookkeeping", body: "Support for the financial records and routine bookkeeping work that keeps operations organized.", category: "FINANCE" },
      { title: "Admin & back-office operations", body: "Dedicated administrative and back-office support for day-to-day business needs.", category: "ADMINISTRATION" },
      { title: "Customer & technical support", body: "Teams to assist your customers and support the technical needs of your operations.", category: "CUSTOMER EXPERIENCE" },
      { title: "Logistics", body: "People and operational support for the logistics functions behind your business.", category: "LOGISTICS" },
      { title: "Business consultation & process improvement", body: "An outside perspective to help you assess and improve the way work gets done.", category: "IMPROVEMENT" },
    ],
    methodLabel: "THE SAPIHIVE WAY",
    methodTitleA: "We manage the team.",
    methodTitleB: "You lead the work.",
    methodDescription: "We build, employ and manage dedicated teams for your company, while you remain in control of the people and the results.",
    assurances: [
      { title: "You stay in control", body: "Interview, approve and direct the people working with your business." },
      { title: "One monthly invoice", body: "Salaries, insurance, HR and compliance handled together." },
      { title: "Bilingual by default", body: "Teams able to work in both Arabic and English." },
      { title: "Replacement guarantee", body: "If someone isn't the right fit, SapiHive replaces them at no cost." },
    ],
    methodLink: "See our process",
    ctaLabel: "LET'S BUILD YOUR CORPORATE HIVE",
    ctaTitleA: "Your next team",
    ctaTitleB: "starts with a conversation.",
    ctaBody: "Tell us where your operations need support. We'll discuss the right team for your business.",
    ctaAction: "Talk to SapiHive",
    ctaBack: "Explore other Hives",
  },
  ar: {
    eyebrow: "هايف كوربوريت  /  تشغيل وإدارة الأعمال",
    back: "جميع الخدمات",
    titleA: "الفريق الذي يدعم",
    titleB: "عمليات شركتك.",
    intro: "من المحاسبة والأعمال الإدارية إلى دعم العملاء والخدمات اللوجستية، نوفر فريقًا متخصصًا لمساندة أعمالك اليومية.",
    explore: "اكتشف مجالات الخدمة",
    talk: "ناقش احتياجات شركتك",
    visualHeading: "فريق واحد لإدارة العمليات",
    visualTag: "مصمم وفق احتياجات شركتك",
    centerTop: "فريق",
    centerBottom: "واحد",
    visualNames: ["المالية", "الإدارة", "الدعم", "اللوجستيات", "الاستشارات"],
    capabilitiesLabel: "مجالات الخدمة",
    capabilitiesTitleA: "تفاصيل العمل اليومية.",
    capabilitiesTitleB: "بفريق يعتمد عليه.",
    capabilitiesIntro: "خمس مجالات أساسية لدعم تشغيل الأعمال، يجمعها شريك واحد وفريق منظم يعمل وفق احتياجات شركتك.",
    capabilityItems: [
      { title: "الدعم المالي ومسك الدفاتر", body: "مساندة أعمال السجلات المالية ومسك الدفاتر والمهام المحاسبية اليومية.", category: "الشؤون المالية" },
      { title: "الإدارة والعمليات المكتبية", body: "فرق للدعم الإداري وتنفيذ المهام المكتبية والتشغيلية اليومية.", category: "الإدارة" },
      { title: "خدمة العملاء والدعم الفني", body: "كوادر لمساعدة العملاء ودعم الاحتياجات الفنية المتعلقة بالعمليات.", category: "خدمة العملاء" },
      { title: "الخدمات اللوجستية", body: "كوادر تشغيلية لمساندة وظائف الخدمات اللوجستية داخل شركتك.", category: "اللوجستيات" },
      { title: "استشارات الأعمال وتحسين العمليات", body: "مساندة في مراجعة إجراءات العمل وتحديد فرص تطوير العمليات وتحسينها.", category: "تطوير الأعمال" },
    ],
    methodLabel: "أسلوب عمل سابي هايف",
    methodTitleA: "نحن ندير الفريق.",
    methodTitleB: "وأنت تقود العمل.",
    methodDescription: "نبني فرقًا مخصصة لشركتك ونتولى توظيفها وإدارتها، بينما تحتفظ أنت بالتحكم في فريقك والنتائج المطلوبة.",
    assurances: [
      { title: "التحكم في يدك", body: "يمكنك مقابلة أعضاء الفريق والموافقة عليهم وتوجيه أعمالهم." },
      { title: "فاتورة شهرية واحدة", body: "الرواتب والتأمينات والموارد البشرية والامتثال ضمن إدارة موحدة." },
      { title: "العمل بالعربية والإنجليزية", body: "كوادر قادرة على العمل والتواصل باللغتين العربية والإنجليزية." },
      { title: "ضمان الاستبدال", body: "إذا لم يكن أحد أعضاء الفريق مناسبًا، نوفر بديلًا دون تكلفة إضافية." },
    ],
    methodLink: "اكتشف آلية عملنا",
    ctaLabel: "لنبدأ فريقك المتخصص",
    ctaTitleA: "فريقك القادم",
    ctaTitleB: "يبدأ بمحادثة.",
    ctaBody: "أخبرنا أين تحتاج شركتك إلى الدعم، وسنناقش معك الفريق الأنسب لطبيعة أعمالك.",
    ctaAction: "تواصل مع سابي هايف",
    ctaBack: "استكشف الخدمات الأخرى",
  },
} as const;

const Icons = [BookOpenCheck, BriefcaseBusiness, Headphones, PackageCheck, Network];
const AssuranceIcons = [UsersRound, Layers3, Languages, RefreshCw];

export function HiveCorporateExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const isArabic = locale === "ar";
  const t = content[locale];
  const url = (path: string) => localizedPath(locale, path);
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;

  useGSAP(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-corp-line]", {
        yPercent: 110, duration: 1.05, stagger: .16, ease: "power3.out",
      });
      gsap.from("[data-corp-hero-copy]", {
        opacity: 0, y: 22, duration: .85, stagger: .14, delay: .42, ease: "power2.out",
      });
      gsap.from("[data-corp-visual]", {
        opacity: 0, scale: .88, rotate: isArabic ? 8 : -8,
        duration: 1.5, delay: .2, ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>("[data-corp-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: .85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-corp-cap]").forEach((el, index) => {
        gsap.from(el, {
          y: 58, opacity: 0, scale: .97, duration: .9,
          delay: (index % 3) * .07, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-corp-proof]").forEach((el, index) => {
        gsap.from(el, {
          x: isArabic ? 32 : -32, opacity: 0, duration: .75,
          delay: (index % 2) * .08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  return (
    <main ref={root} dir={isArabic ? "rtl" : "ltr"} lang={locale} className={`${styles.page} w-full min-w-0 text-[#0F1B2D]`} data-corporate-page>
      {/* Hero */}
      <section className={`${styles.hero} relative isolate overflow-hidden text-[#FFFFFF]`} aria-labelledby="corporate-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-[1440px] min-w-0 items-center gap-8 px-5 pb-14 pt-10 sm:px-9 sm:pb-20 sm:pt-14 lg:min-h-[640px] lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-16 lg:px-12 lg:py-20 xl:px-16">
          <div className="min-w-0">
            <Link href={url("/services")} data-corp-hero-copy className="mb-9 inline-flex items-center gap-2 text-[12px] font-medium text-white/60 transition-colors hover:text-white sm:mb-11">
              <BackArrow size={15} aria-hidden="true" /> {t.back}
            </Link>
            <div data-corp-hero-copy className="mb-5 flex items-center gap-3 text-[10px] font-semibold tracking-[.14em] text-white/65 sm:text-[11px]">
              <span className="h-px w-7 shrink-0 bg-[#F2A900]" /> {t.eyebrow}
            </div>
            <h1 id="corporate-title" className={`${styles.heroHeading} font-semibold ${isArabic ? "leading-[1.2]" : "leading-[1.04] tracking-[-.07em]"}`}>
              <span className="block overflow-hidden pb-[.11em]"><span data-corp-line className="block">{t.titleA}</span></span>
              <span className="block overflow-hidden pb-[.11em]"><span data-corp-line className="block text-[#F5F3EE]">{t.titleB}</span></span>
            </h1>
            <p data-corp-hero-copy className="mt-5 max-w-[570px] text-[15px] leading-[1.8] text-white/75 sm:mt-7 sm:text-[17px]">{t.intro}</p>
            <div data-corp-hero-copy className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Link href={url("/contact")} className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-[#F5F3EE] px-5 py-3 text-[13px] font-semibold text-[#0F1B2D] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]">
                {t.talk} <ArrowUpRight size={17} aria-hidden="true" className={`transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isArabic ? "-scale-x-100" : ""}`} />
              </Link>
              <a href="#corporate-capabilities" className="inline-flex min-h-[46px] items-center gap-2 px-2 py-3 text-[13px] font-medium text-white/75 transition-colors hover:text-white">
                {t.explore} <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div data-corp-visual className={`${styles.visual} relative mx-auto hidden w-full max-w-[560px] lg:block`} aria-hidden="true">
            <div className={styles.visualRing} />
            <div className={styles.visualRingInner} />
            <div className={styles.visualAxis} />
            <div className={styles.visualCenter}>
              <span>{t.centerTop}</span>
              <strong>{t.centerBottom}</strong>
              <span className={styles.visualCoreDot} />
            </div>
            {t.visualNames.map((name, index) => (
              <div key={index} className={`${styles.orbitItem} ${styles[`orbit${index + 1}`]}`}>
                <span className={styles.orbitDot} />
                <span>{name}</span>
              </div>
            ))}
            <div className={styles.visualCaption}>
              <span>{t.visualHeading}</span>
              <span>{t.visualTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Five exact capabilities from the Company Profile */}
      <section id="corporate-capabilities" className="scroll-mt-20 bg-[#F5F3EE] py-16 sm:py-24 lg:py-28" aria-labelledby="corporate-capabilities-title">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-9 lg:px-12 xl:px-16">
          <div data-corp-reveal className="mb-9 max-w-[780px] sm:mb-14">
            <div className={styles.eyebrow}><span />{t.capabilitiesLabel}</div>
            <h2 id="corporate-capabilities-title" className={`${styles.sectionHeading} mt-5`}>
              {t.capabilitiesTitleA}<br /><span className="text-[#5B6B7F]">{t.capabilitiesTitleB}</span>
            </h2>
            <p className="mt-5 max-w-[690px] text-[15px] leading-[1.8] text-[#5B6B7F] sm:text-[17px]">{t.capabilitiesIntro}</p>
          </div>
          <div className={styles.capabilityGrid}>
            {t.capabilityItems.map((item, index) => {
              const Icon = Icons[index];
              return (
                <article data-corp-cap key={item.title} className={`${styles.capabilityCard} ${index < 2 ? styles.capabilityWide : ""}`}>
                  <div className={styles.capabilityTop}>
                    <span className={styles.capabilityIcon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className="text-[10px] font-semibold tracking-[.13em] text-[#5B6B7F]">{item.category}</span>
                  </div>
                  <div>
                    <h3 className={`${styles.capabilityTitle} font-semibold`}>{item.title}</h3>
                    <p className="mt-3 max-w-[450px] text-[13px] leading-[1.7] text-[#5B6B7F] sm:text-[14px]">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proof / operating model */}
      <section className="overflow-hidden bg-white py-16 sm:py-24 lg:py-28" aria-labelledby="corporate-method-title">
        <div className="mx-auto grid w-full max-w-[1440px] items-start gap-10 px-5 sm:px-9 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-12 xl:px-16">
          <div data-corp-reveal className="lg:sticky lg:top-32">
            <div className={styles.eyebrow}><span />{t.methodLabel}</div>
            <h2 id="corporate-method-title" className={`${styles.sectionHeading} mt-5`}>
              {t.methodTitleA}<br /><span className="text-[#5B6B7F]">{t.methodTitleB}</span>
            </h2>
            <p className="mt-5 max-w-[510px] text-[15px] leading-[1.8] text-[#5B6B7F]">{t.methodDescription}</p>
            <Link href={url("/process")} className="mt-7 inline-flex items-center gap-2 border-b border-[#0F1B2D]/25 pb-2 text-[13px] font-semibold text-[#0F1B2D] transition-colors hover:border-[#F2A900]">
              {t.methodLink} <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.assuranceGrid}>
            {t.assurances.map((item, index) => {
              const Icon = AssuranceIcons[index];
              return (
                <div key={item.title} data-corp-proof className={styles.assurance}>
                  <div className={styles.assuranceIcon}><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></div>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold tracking-tight text-[#0F1B2D] sm:text-[19px]">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[#5B6B7F] sm:text-[14px]">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#F5F3EE] px-5 py-16 sm:px-9 sm:py-24 lg:px-12 xl:px-16" aria-labelledby="corporate-cta-title">
        <div data-corp-reveal className={styles.ctaPanel}>
          <div className={styles.ctaTexture} aria-hidden="true" />
          <div className="relative z-10 max-w-[760px]">
            <div className={styles.eyebrow}><span />{t.ctaLabel}</div>
            <h2 id="corporate-cta-title" className={`${styles.ctaHeading} mt-6 font-semibold text-[#0F1B2D]`}>
              {t.ctaTitleA}<br /><span className="text-[#5B6B7F]">{t.ctaTitleB}</span>
            </h2>
            <p className="mt-5 max-w-[570px] text-[15px] leading-[1.75] text-[#5B6B7F] sm:text-[16px]">{t.ctaBody}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <Link href={url("/contact")} className="group inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[#0F1B2D] px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#5B6B7F]">
                {t.ctaAction} <ArrowUpRight aria-hidden="true" size={18} className="transition-transform group-hover:-translate-y-1" />
              </Link>
              <Link href={url("/services")} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0F1B2D] hover:underline underline-offset-4">
                {t.ctaBack} <ArrowRight aria-hidden="true" size={16} className={isArabic ? "rotate-180" : ""} />
              </Link>
            </div>
          </div>
          <ShieldCheck className={styles.ctaWatermark} strokeWidth={.6} aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
