'use client';

import { useId, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import gsap from 'gsap';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { faqContent } from '@/i18n/faq';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
};

export function FAQSection({ locale }: Props) {
  const content = faqContent[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const id = useId();
  const isArabic = locale === 'ar';

  // Soft editorial entrance, intentionally different from the Hero and
  // the per-section reveals. The accordion's own click animation is untouched.
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const q = gsap.utils.selector(section);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power2.out' },
    });
    tl.from(q('[data-faq-heading-block]'), { autoAlpha: 0, y: 20, duration: 0.68 })
      .from(q('[data-faq-row]'), { autoAlpha: 0, y: 12, stagger: 0.075, duration: 0.45 }, '-=0.38');
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, { scope: sectionRef, dependencies: [locale], revertOnUpdate: true });

  const handleToggle = (index: number) => {
    const nextIndex = openIndex === index ? null : index;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    panelsRef.current.forEach((panel, panelIndex) => {
      if (!panel) return;
      const willOpen = panelIndex === nextIndex;
      gsap.killTweensOf(panel);

      if (reducedMotion) {
        gsap.set(panel, {
          height: willOpen ? 'auto' : 0,
          autoAlpha: willOpen ? 1 : 0,
        });
      } else {
        gsap.to(panel, {
          height: willOpen ? 'auto' : 0,
          autoAlpha: willOpen ? 1 : 0,
          duration: willOpen ? 0.48 : 0.35,
          ease: 'power3.inOut',
          overwrite: true,
        });
      }
    });

    setOpenIndex(nextIndex);
  };

  return (
    <section
      id="faq-preview"
      ref={sectionRef}
      lang={locale}
      dir={isArabic ? 'rtl' : 'ltr'}
      aria-labelledby="sapihive-faq-heading"
      className="relative isolate w-full overflow-hidden bg-white text-[#14283E]"
    >
      {/* Deliberately clean: no particles, cards, or separate moving background. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#E1E7EC]" />

      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 lg:px-16 lg:py-20 xl:gap-16">
        <div data-faq-heading-block className="lg:pt-2">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-[#F2A900]" />
            <p className={`text-[11px] font-semibold text-[#F2A900] ${isArabic ? '' : 'tracking-[0.2em]'}`}>
              {content.eyebrow}
            </p>
          </div>

          <h2
            id="sapihive-faq-heading"
            className={`max-w-[540px] text-[clamp(2.05rem,3.2vw,3.55rem)] font-semibold leading-[1.17] ${isArabic ? "tracking-normal" : "tracking-[-0.035em]"}`}
          >
            <span className="block">{content.title}</span>
            <span className="block text-[#F2A900]">{content.highlight}</span>
          </h2>

          <p className="mt-4 max-w-sm text-[14px] leading-7 text-[#52657A] md:text-[15px]">
            {content.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm text-[#65778A]">{content.more}</span>
            <Link
              href={localizedPath(locale, '/contact')}
              className="group inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#F2A900] underline decoration-[#F2A900]/50 underline-offset-[7px] transition-colors hover:text-[#14283E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
            >
              {content.contact}
              <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-y-0.5">↗</span>
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-[#DCE3E9]" aria-label={isArabic ? 'قائمة الأسئلة الشائعة' : 'Frequently asked questions'}>
          {content.questions.map((item, index) => {
            const expanded = openIndex === index;
            const questionId = `${id}-question-${index}`;
            const panelId = `${id}-panel-${index}`;

            return (
              <div data-faq-row key={index} className="group relative border-b border-[#DCE3E9]">
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => handleToggle(index)}
                  className="flex min-h-[66px] w-full items-center gap-3 py-3.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F2A900] sm:gap-4"
                >
                  <span dir="ltr" className={`w-7 shrink-0 text-sm tabular-nums transition-colors duration-300 ${expanded ? 'text-[#F2A900]' : 'text-[#8192A4]'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`min-w-0 flex-1 text-[14px] font-semibold leading-6 transition-colors duration-300 sm:text-[15px] ${expanded ? 'text-[#14283E]' : 'text-[#30485D] group-hover:text-[#F2A900]'}`}>
                    {item.question}
                  </span>
                  <span aria-hidden="true" className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${expanded ? 'rotate-45 border-[#F2A900] bg-[#F2A900] text-[#0F1B2D]' : 'border-[#B9C7D3] text-[#52657A] group-hover:border-[#F2A900] group-hover:text-[#F2A900]'}`}>
                    <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  ref={node => { panelsRef.current[index] = node; }}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!expanded}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0, visibility: 'hidden' }}
                >
                  <p className="max-w-[575px] pb-5 ps-10 pe-8 text-[13px] leading-[1.85] text-[#52657A] sm:ps-12 sm:text-[14px]">
                    {item.answer}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#F2A900] transition-transform duration-500 ${isArabic ? 'origin-right' : 'origin-left'} ${expanded ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
