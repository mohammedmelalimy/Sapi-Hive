"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowLeft, Mail, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { contactPageCopy } from "@/i18n/contactPage";

// SapiHive official palette:
// Navy #0F1B2D · Honey Amber #F2A900 · Slate #5B6B7F · Paper #F5F3EE · White #FFFFFF

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

const initialForm: FormValues = {
  name: "", company: "", email: "", phone: "", reason: "", message: "",
};

const inputClass = [
  "mt-2 block w-full min-w-0 rounded-[12px] border border-[#5B6B7F]/20",
  "bg-white px-4 py-[13px] text-[14px] font-normal text-[#0F1B2D]",
  "placeholder:font-normal placeholder:text-[#5B6B7F]/65",
  "outline-none transition-colors focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20",
].join(" ");

const labelClass = "block min-w-0 text-[12px] font-semibold text-[#0F1B2D]";

/** Brand-accurate WhatsApp symbol rather than a generic chat bubble. */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.371c-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.22h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.447 4.434-9.88 9.884-9.88a9.82 9.82 0 0 1 6.99 2.895 9.83 9.83 0 0 1 2.893 6.993c-.003 5.448-4.435 9.88-9.879 9.88m8.406-18.29A11.79 11.79 0 0 0 12.001 0C5.392 0 .013 5.377.01 11.99a11.93 11.93 0 0 0 1.6 5.978L0 24l6.175-1.62a11.96 11.96 0 0 0 5.821 1.483h.005c6.608 0 11.987-5.377 11.99-11.99a11.85 11.85 0 0 0-3.516-8.41Z" />
    </svg>
  );
}

export function ContactExperience({ locale }: { locale: Locale }) {
  const t = contactPageCopy[locale];
  const isArabic = locale === "ar";
  const rootRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormValues>(initialForm);
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;

  function update(key: keyof FormValues, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  // One quiet entrance only. No pinned scroll sections or hidden-on-scroll content.
  useGSAP(() => {
    const scope = rootRef.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      scope.querySelectorAll("[data-contact-entrance]"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power2.out", clearProps: "all" },
    );
  }, { scope: rootRef, dependencies: [locale], revertOnUpdate: true });

  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inquiry = t.reasons.find((item) => item.value === form.reason)?.label ?? form.reason;
    const body = [
      `${t.fields.name}: ${form.name.trim()}`,
      `${t.fields.company}: ${form.company.trim()}`,
      `${t.fields.email}: ${form.email.trim()}`,
      `${t.fields.phone}: ${form.phone.trim() || "—"}`,
      `${t.fields.reason}: ${inquiry}`,
      "",
      `${t.fields.message}:`,
      form.message.trim(),
    ].join("\n");

    // This is a mailto handoff, NOT a saved or sent application.
    // Connect a proper API/CRM endpoint when you are ready to accept submissions on-site.
    const subject = `${t.emailSubject} — ${form.company.trim()}`;
    window.location.href = `mailto:info@sapihive.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main
      ref={rootRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-x-clip bg-[#F5F3EE] text-[#0F1B2D]"
    >
      <section aria-labelledby="contact-main-title" className="relative mx-auto max-w-[1370px] px-5 pb-14 pt-10 sm:px-9 sm:pb-20 sm:pt-14 lg:px-14 lg:pb-24 lg:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,.90fr)_minmax(0,1.10fr)] lg:gap-14 xl:gap-24">
          {/* Editorial introduction */}
          <div data-contact-entrance className="max-w-[530px] lg:pt-10">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.15em] text-[#5B6B7F]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#F2A900]" aria-hidden="true" />
              {t.eyebrow}
            </div>

            <h1
              id="contact-main-title"
              className={`mt-7 text-[clamp(3.15rem,5.3vw,5.3rem)] font-bold leading-[1.06] ${isArabic ? "tracking-normal" : "tracking-[-.055em]"}`}
            >
              <span className="block">{t.heroLineOne}</span>
              <span className="block">{t.heroLineTwo}<span className="text-[#F2A900]">.</span></span>
            </h1>

            <p className="mt-6 max-w-[470px] text-[15px] leading-[1.85] text-[#5B6B7F] sm:text-[16px]">
              {t.heroDescription}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#F2A900]" aria-hidden="true" />
              <p className="text-[13px] font-medium leading-relaxed text-[#5B6B7F]">{t.heroAsideTitle}</p>
            </div>

            <Link
              href={localizedPath(locale, "/services")}
              className="mt-9 inline-flex items-center gap-2.5 text-[13px] font-semibold text-[#0F1B2D] underline decoration-[#F2A900] decoration-2 underline-offset-[7px] transition-opacity hover:opacity-65"
            >
              {t.serviceLink}
              <DirectionArrow size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* The only form section. A quiet white surface rather than several nested cards. */}
          <div
            id="business-inquiry"
            data-contact-entrance
            className="min-w-0 scroll-mt-32 rounded-[22px] border border-[#5B6B7F]/10 bg-white p-5 shadow-[0_15px_55px_rgba(15,27,45,.035)] sm:p-8 lg:p-9"
          >
            <p className={`text-[10px] font-semibold text-[#5B6B7F] ${isArabic ? "" : "uppercase tracking-[.19em]"}`}>
              {t.formEyebrow}
            </p>
            <h2 className={`mt-2 text-[clamp(1.55rem,2.5vw,2.15rem)] font-bold leading-[1.22] ${isArabic ? "" : "tracking-[-.035em]"}`}>
              {t.formTitle}
            </h2>
            <p className="mb-6 mt-2 text-[13px] leading-[1.75] text-[#5B6B7F]">{t.formIntro}</p>

            <form onSubmit={sendInquiry} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  {t.fullName} <span className="text-[#F2A900]">*</span>
                  <input
                    className={inputClass}
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder={t.fullNamePlaceholder}
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  {t.company} <span className="text-[#F2A900]">*</span>
                  <input
                    className={inputClass}
                    type="text"
                    name="company"
                    autoComplete="organization"
                    required
                    maxLength={150}
                    placeholder={t.companyPlaceholder}
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  {t.email} <span className="text-[#F2A900]">*</span>
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    dir="ltr"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder={t.emailPlaceholder}
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  {t.phone}
                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    dir="ltr"
                    autoComplete="tel"
                    maxLength={35}
                    placeholder={t.phonePlaceholder}
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                  />
                </label>
              </div>

              <label className={labelClass}>
                {t.reason} <span className="text-[#F2A900]">*</span>
                <select
                  className={`${inputClass} ${form.reason ? "text-[#0F1B2D]" : "text-[#5B6B7F]"}`}
                  name="reason"
                  required
                  value={form.reason}
                  onChange={(event) => update("reason", event.target.value)}
                >
                  <option value="" disabled>{t.reasonPlaceholder}</option>
                  {t.reasons.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </label>

              <label className={labelClass}>
                {t.message} <span className="text-[#F2A900]">*</span>
                <textarea
                  className={`${inputClass} min-h-[106px] resize-y`}
                  name="message"
                  rows={3}
                  required
                  maxLength={2000}
                  placeholder={t.messagePlaceholder}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </label>

              <button
                type="submit"
                className="flex min-h-[49px] w-full items-center justify-center gap-3 rounded-full bg-[#F2A900] px-6 py-3 text-[14px] font-semibold text-[#0F1B2D] transition-[transform,opacity] hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#F2A900]"
              >
                {t.sendEmail}
                <DirectionArrow size={18} aria-hidden="true" />
              </button>
              <p className="text-center text-[11px] leading-[1.6] text-[#5B6B7F]" role="note">
                {t.emailNotice}
              </p>
            </form>
          </div>
        </div>

        {/* Contact strip replaces the old second and third large CTA sections. */}
        <div data-contact-entrance className="mt-12 grid gap-6 border-t border-[#5B6B7F]/20 pt-7 sm:mt-16 sm:grid-cols-3 sm:gap-7 sm:pt-8">
          <a href="mailto:info@sapihive.com" className="group flex min-w-0 items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0F1B2D] transition-colors group-hover:bg-[#F2A900]">
              <Mail size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] text-[#5B6B7F]">{t.emailLabel}</span>
              <span className="mt-0.5 block break-all text-[13px] font-semibold group-hover:underline">info@sapihive.com</span>
            </span>
          </a>

          <a href="https://wa.me/201023010728" target="_blank" rel="noopener noreferrer" className="group flex min-w-0 items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0F1B2D] transition-colors group-hover:bg-[#F2A900]">
              <WhatsAppIcon className="h-[20px] w-[20px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] text-[#5B6B7F]">{t.whatsappLabel}</span>
              <span className="mt-0.5 block text-[13px] font-semibold group-hover:underline" dir="ltr">+20 102 301 0728</span>
            </span>
            <ArrowUpRight size={14} className="text-[#5B6B7F]" aria-hidden="true" />
          </a>

          <div className="flex min-w-0 items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0F1B2D]">
              <MapPin size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] text-[#5B6B7F]">{t.locationLabel}</span>
              <span className="mt-0.5 block text-[13px] font-semibold">{t.location}</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
