'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { getDictionary } from '@/i18n/dictionaries';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  dict: ReturnType<typeof getDictionary>;
};

const HONEY_AMBER = '#F2A900';

function HumanIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-[#F2A900]">
      <path
        d="M16 5c-3-3-9-1-9 4-4 1-5 6-2 9-2 4 1 9 6 9 3 0 5-2 5-5V5Zm0 0c3-3 9-1 9 4 4 1 5 6 2 9-2 4 1 9-6 9-3 0-5-2-5-5V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 13h4m8 0h-4M10 20l4-3m8 3-4-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="h-7 w-7 text-[#F2A900]">
      <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.5 27v-4c0-4 3.2-7 7.5-7s7.5 3 7.5 7v4h-15Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="5.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="26.5" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M5 20c-2.5.7-3 3-3 6m25-6c2.5.7 3 3 3 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhoWeAreSection({ dict }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const arabic = dict.nav.home !== 'Home';
  const t = dict.whoDetailed;

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const q = gsap.utils.selector(section);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        },
        defaults: {
          ease: 'power3.out'
        }
      });

      timeline
        .from(q('[data-who-label]'), {
          opacity: 0,
          y: 18,
          duration: 0.45
        })
        .from(
          q('[data-who-title]'),
          {
            opacity: 0,
            y: 34,
            duration: 0.75,
            stagger: 0.13
          },
          '-=0.15'
        )
        .from(
          q('[data-who-intro]'),
          {
            opacity: 0,
            y: 20,
            duration: 0.6
          },
          '-=0.3'
        )
        .from(
          q('[data-who-brand-icon]'),
          {
            opacity: 0,
            scale: 0.72,
            duration: 0.7,
            ease: 'back.out(1.4)'
          },
          '-=0.1'
        )
        .from(
          q('[data-who-card]'),
          {
            opacity: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.16
          },
          '-=0.4'
        )
        .from(
          q('[data-who-connector-line]'),
          {
            scaleX: 0,
            duration: 0.5,
            stagger: 0.12,
            transformOrigin: 'center center'
          },
          '-=0.4'
        )
        .from(
          q('[data-who-cta]'),
          {
            opacity: 0,
            y: 18,
            duration: 0.5
          },
          '-=0.25'
        );
    },
    {
      scope: sectionRef,
      dependencies: [arabic],
      revertOnUpdate: true
    }
  );

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      dir={arabic ? 'rtl' : 'ltr'}
      className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-transparent py-20 text-[#F5F3EE] sm:py-24"
      aria-labelledby="who-we-are-heading"
    >
      <div className="relative mx-auto flex w-full max-w-[1350px] flex-col items-center px-5 text-center sm:px-8 lg:px-12">
        {/* Section Label */}
        <div
          data-who-label
          className={`flex items-center gap-4 text-xs font-semibold text-[#F2A900] ${
            arabic ? 'tracking-normal' : 'tracking-[.22em]'
          }`}
        >
          <span className="h-px w-10 bg-[#F2A900]" aria-hidden="true" />

          <span>{t.label}</span>

          <span className="h-px w-10 bg-[#F2A900]" aria-hidden="true" />
        </div>

        {/* Main Heading */}
        <h2
          id="who-we-are-heading"
          className={`mt-6 max-w-[990px] text-[clamp(2.2rem,4.5vw,4.3rem)] font-semibold ${
            arabic ? 'leading-[1.4] tracking-normal' : 'leading-[1.12] tracking-[-.045em]'
          }`}
        >
          <span data-who-title className="block">
            {t.title}
          </span>

          <span data-who-title className="block text-[#F2A900]">
            {t.highlight}
          </span>
        </h2>

        {/* Intro */}
        <p
          data-who-intro
          className="mt-6 max-w-[790px] text-[15px] leading-[1.85] text-[#D2DEE8] sm:text-base"
        >
          {t.intro}
        </p>

        {/* SAPI / HIVE Cards */}
        <div className="mt-12 grid w-full max-w-[1130px] grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_144px_minmax(0,1fr)] md:gap-2 lg:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)] lg:gap-4">
          {/* SAPI Card */}
          <article
            data-who-card
            className="relative order-2 flex min-h-[215px] flex-col items-start rounded-[24px] border border-[#A9BECE]/45 bg-[linear-gradient(145deg,rgba(128,157,183,.19),rgba(35,59,83,.60))] px-6 py-6 text-start shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_15px_36px_rgba(10,22,36,.15)] backdrop-blur-md md:order-1 md:min-h-[230px] lg:px-8"
          >
            <HumanIcon />

            <h3 className="mt-3 text-[clamp(2rem,2.5vw,2.8rem)] font-semibold tracking-[-.04em]">
              SAPI
            </h3>

            <p className="mt-1 font-semibold text-white">{t.sapiTitle}</p>

            <p className="mt-3 text-sm leading-[1.75] text-[#C8D7E2]">{t.sapiDescription}</p>

            {/* Connector */}
            <span
              data-who-connector-line
              aria-hidden="true"
              className="absolute top-1/2 hidden h-px w-12 bg-[#F2A900] shadow-[0_0_12px_rgba(242,169,0,.5)] md:block"
              style={{ insetInlineEnd: '-3rem' }}
            />
          </article>

          {/* SapiHive Brand Icon */}
          <div
            data-who-brand-icon
            className="relative order-1 mx-auto flex h-[104px] w-[104px] items-center justify-center md:order-2 md:h-[126px] md:w-[126px] lg:h-[154px] lg:w-[154px]"
          >
            <Image
              src="/images/brand/sapihive-icon-original.png"
              alt=""
              width={600}
              height={600}
              className="h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,.15)]"
              unoptimized
            />
          </div>

          {/* HIVE Card */}
          <article
            data-who-card
            className="relative order-3 flex min-h-[215px] flex-col items-start rounded-[24px] border border-[#A9BECE]/45 bg-[linear-gradient(145deg,rgba(128,157,183,.19),rgba(35,59,83,.60))] px-6 py-6 text-start shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_15px_36px_rgba(10,22,36,.15)] backdrop-blur-md md:min-h-[230px] lg:px-8"
          >
            <PeopleIcon />

            <h3 className="mt-3 text-[clamp(2rem,2.5vw,2.8rem)] font-semibold tracking-[-.04em]">
              HIVE
            </h3>

            <p className="mt-1 font-semibold text-white">{t.hiveTitle}</p>

            <p className="mt-3 text-sm leading-[1.75] text-[#C8D7E2]">{t.hiveDescription}</p>

            {/* Connector */}
            <span
              data-who-connector-line
              aria-hidden="true"
              className="absolute top-1/2 hidden h-px w-12 bg-[#F2A900] shadow-[0_0_12px_rgba(242,169,0,.5)] md:block"
              style={{ insetInlineStart: '-3rem' }}
            />
          </article>
        </div>

        {/* CTA */}
        <Link
          data-who-cta
          href={`/${arabic ? 'ar' : 'en'}/about`}
          className="mt-10 inline-flex items-center gap-4 rounded-full border border-[#F2A900] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#F2A900] hover:text-[#0F1B2D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]"
        >
          {t.button}

          <span aria-hidden="true">{arabic ? '↖' : '↗'}</span>
        </Link>
      </div>
    </section>
  );
}
