"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, ArrowLeft, Mail, MapPin, MessageCircle, MoveUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { contactPageCopy } from "@/i18n/contactPage";

gsap.registerPlugin(ScrollTrigger);

type FormValues = { name: string; company: string; email: string; phone: string; reason: string; message: string };
const emptyForm: FormValues = { name: "", company: "", email: "", phone: "", reason: "", message: "" };
const inputClass = "w-full min-w-0 rounded-[14px] border border-[#D8DEE4] bg-white px-4 py-[14px] text-[15px] text-[#0F1B2D] outline-none transition-[border-color,box-shadow] placeholder:text-[#8391A0] focus:border-[#F2A900] focus:shadow-[0_0_0_3px_rgba(242,169,0,0.15)]";

export function ContactExperience({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const t = contactPageCopy[locale];
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const update = (key: keyof FormValues, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const RightArrow = isArabic ? ArrowLeft : ArrowRight;

  useGSAP(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(scope.querySelectorAll("[data-contact-intro]"), {
        y: 24, autoAlpha: 0, duration: .8, stagger: .11, ease: "power3.out", delay: .1,
      });
      gsap.from(scope.querySelectorAll("[data-contact-hive]"), {
        x: isArabic ? -18 : 18, autoAlpha: 0, duration: .6, stagger: .08,
        ease: "power2.out", delay: .35,
      });
      scope.querySelectorAll("[data-contact-reveal]").forEach(el => {
        gsap.from(el, {
          y: 28, autoAlpha: 0, duration: .76, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        });
      });
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [locale], revertOnUpdate: true });

  function sendInquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const reason = t.reasons.find(item => item.value === form.reason)?.label ?? form.reason;
    const body = [
      `${t.fields.name}: ${form.name.trim()}`,
      `${t.fields.company}: ${form.company.trim()}`,
      `${t.fields.email}: ${form.email.trim()}`,
      `${t.fields.phone}: ${form.phone.trim() || "—"}`,
      `${t.fields.reason}: ${reason}`,
      "",
      `${t.fields.message}:`,
      form.message.trim(),
    ].join("\n");
    // No server or CRM is configured: open the visitor's email client with a prefilled inquiry.
    // The visitor must explicitly send the email in that application.
    window.location.href = `mailto:info@sapihive.com?subject=${encodeURIComponent(`${t.emailSubject} — ${form.company}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main ref={root} dir={isArabic ? "rtl" : "ltr"} className="relative overflow-x-clip bg-white text-[#0F1B2D]" style={{ fontFamily: "Inter, Arial, Helvetica, sans-serif" }}>
      {/* Hero: B2B-first, no careers messaging or CV upload. */}
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-[#0F1B2D] pb-14 pt-[140px] text-white sm:pb-20 sm:pt-[155px] lg:pb-24 lg:pt-[178px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_55%,rgba(61,82,108,0.45),transparent_57%),linear-gradient(130deg,#0F1B2D_12%,#16263B_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[.055] [background-image:linear-gradient(#FFFFFF_1px,transparent_1px),linear-gradient(90deg,#FFFFFF_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-20 lg:px-16">
          <div className="max-w-[780px]">
            <div data-contact-intro className={`mb-7 flex items-center gap-3 text-[11px] font-bold text-[#F2A900] ${isArabic ? "" : "uppercase tracking-[.2em]"}`}>
              <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#F2A900]" />{t.eyebrow}
            </div>
            <h1 id="contact-title" data-contact-intro className="max-w-[800px] text-[clamp(2.8rem,6vw,5.9rem)] font-[750] leading-[1.06] tracking-[-.055em]">
              <span className="block">{t.heroLineOne}</span>
              <span className="block text-[#F2A900]">{t.heroLineTwo}</span>
            </h1>
            <p data-contact-intro className="mt-6 max-w-[585px] text-[15px] leading-[1.85] text-[#D0D7E2] sm:text-[17px]">{t.heroDescription}</p>
            <div data-contact-intro className="mt-8">
              <a href="#business-inquiry" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F2A900] px-6 py-3.5 text-[14px] font-bold text-[#0F1B2D] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2A900]">
                {t.heroButton}<ArrowDown size={17} />
              </a>
            </div>
          </div>

          <div aria-label={t.heroAsideTitle} className="relative mx-auto w-full max-w-[525px] rounded-[26px] border border-white/15 bg-white/[.055] p-5 shadow-[0_20px_90px_rgba(0,0,0,.12)] backdrop-blur-sm sm:p-8 lg:ms-auto" dir="ltr">
            <div className="mb-7 flex items-center gap-2.5 text-[10px] font-semibold tracking-[.22em] text-[#F2A900]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#F2A900]" />{t.heroAsideEyebrow}
            </div>
            <p className="max-w-[390px] text-[24px] font-semibold leading-[1.26] tracking-[-.03em] text-white sm:text-[28px]" dir={isArabic ? "rtl" : "ltr"}>{t.heroAsideTitle}</p>
            <div className="relative mt-8 space-y-2.5">
              <span aria-hidden="true" className="absolute bottom-5 left-[15px] top-5 w-px bg-gradient-to-b from-[#F2A900] via-white/30 to-transparent" />
              {t.services.map((name, index) => (
                <div data-contact-hive key={name} className="relative flex items-center gap-4 rounded-xl border border-white/[.08] bg-[#15263A]/70 px-3.5 py-3.5">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F2A900]/65 bg-[#0F1B2D] text-[10px] font-bold text-[#F2A900]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[14px] font-medium text-[#ECF0F5]">{name}</span>
                  <ArrowUpRight size={15} className="ms-auto text-[#F2A900]" aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-white/50" dir={isArabic ? "rtl" : "ltr"}>{t.heroAsideSubtitle}</p>
          </div>
        </div>
      </section>

      <section id="business-inquiry" aria-labelledby="inquiry-form-title" className="scroll-mt-24 bg-[#F5F3EE] py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] items-start gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-16 lg:px-16">
          <aside data-contact-reveal className="lg:sticky lg:top-[130px]">
            <p className={`flex items-center gap-3 text-[11px] font-bold text-[#A87800] ${isArabic ? "" : "uppercase tracking-[.19em]"}`}><span aria-hidden="true" className="h-[2px] w-7 bg-[#F2A900]" />{t.sidebarEyebrow}</p>
            <h2 className="mt-5 max-w-[380px] text-[clamp(2rem,3vw,3.2rem)] font-bold leading-[1.16] tracking-[-.04em]">{t.sidebarTitle}</h2>
            <p className="mt-5 max-w-[380px] text-[15px] leading-[1.8] text-[#5B6B7F]">{t.sidebarBody}</p>
            <div className="mt-9 grid gap-6">
              <a href="mailto:info@sapihive.com" className="group flex min-w-0 items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[#DADEE4] bg-white"><Mail size={19} /></span>
                <span className="min-w-0"><span className="block text-[12px] text-[#5B6B7F]">{t.emailLabel}</span><span className="mt-0.5 block break-all text-[15px] font-semibold group-hover:underline">info@sapihive.com</span></span>
              </a>
              <a href="https://wa.me/201023010728" target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[#DADEE4] bg-white"><MessageCircle size={19} /></span>
                <span className="min-w-0"><span className="block text-[12px] text-[#5B6B7F]">{t.whatsappLabel}</span><span className="mt-0.5 block text-[15px] font-semibold group-hover:underline" dir="ltr">+20 102 301 0728</span></span>
              </a>
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[#DADEE4] bg-white"><MapPin size={19} /></span>
                <span><span className="block text-[12px] text-[#5B6B7F]">{t.locationLabel}</span><span className="mt-0.5 block text-[15px] font-semibold">{t.location}</span></span>
              </div>
            </div>
            <a href="https://wa.me/201023010728" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#0F1B2D]/20 px-5 py-3 text-[13px] font-semibold transition-colors hover:border-[#0F1B2D] hover:bg-white">
              {t.whatsappButton}<ArrowUpRight size={16} />
            </a>
          </aside>

          <div data-contact-reveal className="min-w-0 rounded-[26px] border border-[#E1E4E8] bg-white p-5 shadow-[0_20px_70px_rgba(15,27,45,.05)] sm:p-9 lg:p-11">
            <p className={`text-[11px] font-bold text-[#A87800] ${isArabic ? "" : "uppercase tracking-[.19em]"}`}>{t.formEyebrow}</p>
            <h2 id="inquiry-form-title" className="mt-3 text-[clamp(2rem,3.2vw,3rem)] font-bold tracking-[-.04em]">{t.formTitle}</h2>
            <p className="mb-7 mt-2.5 max-w-[540px] text-[14px] leading-[1.75] text-[#5B6B7F]">{t.formIntro}</p>
            <form onSubmit={sendInquiry} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-[13px] font-semibold">{t.fullName} <span className="text-[#BB8200]">*</span>
                  <input className={`${inputClass} mt-2`} autoComplete="name" required maxLength={100} placeholder={t.fullNamePlaceholder} value={form.name} onChange={e => update("name", e.target.value)} />
                </label>
                <label className="block text-[13px] font-semibold">{t.company} <span className="text-[#BB8200]">*</span>
                  <input className={`${inputClass} mt-2`} autoComplete="organization" required maxLength={150} placeholder={t.companyPlaceholder} value={form.company} onChange={e => update("company", e.target.value)} />
                </label>
                <label className="block text-[13px] font-semibold">{t.email} <span className="text-[#BB8200]">*</span>
                  <input className={`${inputClass} mt-2`} type="email" dir="ltr" autoComplete="email" required maxLength={254} placeholder={t.emailPlaceholder} value={form.email} onChange={e => update("email", e.target.value)} />
                </label>
                <label className="block text-[13px] font-semibold">{t.phone}
                  <input className={`${inputClass} mt-2`} type="tel" dir="ltr" autoComplete="tel" maxLength={35} placeholder={t.phonePlaceholder} value={form.phone} onChange={e => update("phone", e.target.value)} />
                </label>
              </div>
              <label className="block text-[13px] font-semibold">{t.reason} <span className="text-[#BB8200]">*</span>
                <select className={`${inputClass} mt-2`} required value={form.reason} onChange={e => update("reason", e.target.value)}>
                  <option value="" disabled>{t.reasonPlaceholder}</option>
                  {t.reasons.map(item => <option value={item.value} key={item.value}>{item.label}</option>)}
                </select>
              </label>
              <label className="block text-[13px] font-semibold">{t.message} <span className="text-[#BB8200]">*</span>
                <textarea className={`${inputClass} mt-2 min-h-[126px] resize-y`} required maxLength={2000} rows={4} placeholder={t.messagePlaceholder} value={form.message} onChange={e => update("message", e.target.value)} />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-[12px] text-[#5B6B7F]">{t.requiredNote}</span>
                <button type="submit" className="inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#0F1B2D] px-6 py-3 text-[14px] font-semibold text-white transition-[background,transform] hover:-translate-y-0.5 hover:bg-[#213951] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F2A900]">
                  {t.sendEmail}<RightArrow size={17} />
                </button>
              </div>
              <p role="note" className="text-[12px] leading-[1.6] text-[#64748B]">{t.emailNotice}</p>
            </form>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-final-title" className="bg-white py-14 sm:py-20">
        <div data-contact-reveal className="mx-auto flex w-[calc(100%-48px)] max-w-[1280px] flex-col gap-6 rounded-[26px] bg-[#0F1B2D] px-6 py-9 text-white sm:w-[calc(100%-80px)] sm:px-11 sm:py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[650px]">
            <span className={`text-[11px] font-semibold text-[#F2A900] ${isArabic ? "" : "uppercase tracking-[.18em]"}`}>{t.finalEyebrow}</span>
            <h2 id="contact-final-title" className="mt-3 text-[clamp(1.9rem,3.4vw,3.25rem)] font-bold tracking-[-.04em]">{t.finalTitle}</h2>
            <p className="mt-3 text-[14px] leading-[1.8] text-white/70">{t.finalBody}</p>
          </div>
          <Link href={localizedPath(locale, "/services")} className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#F2A900] px-6 py-3 text-[13px] font-bold text-[#0F1B2D] transition-transform hover:-translate-y-0.5 lg:self-auto">
            {t.serviceLink}<MoveUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
