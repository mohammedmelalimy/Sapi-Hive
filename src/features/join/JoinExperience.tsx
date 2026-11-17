"use client";

import { useId, useState, type ChangeEvent } from "react";
import { ArrowUpRight, Check, FileUp } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { joinPageCopy, type JoinCopy } from "@/i18n/joinPage";

// Official SapiHive colours:
// Navy #0F1B2D | Amber #F2A900 | Slate #5B6B7F | Paper #F5F3EE | White #FFFFFF
const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const inputClass = [
  "mt-1.5 block w-full min-w-0 rounded-xl border border-[#5B6B7F]/25 bg-[#FFFFFF]",
  "px-4 py-3 text-[14px] font-normal text-[#0F1B2D]",
  "placeholder:font-normal placeholder:text-[#5B6B7F]/70",
  "outline-none transition-colors focus:border-[#F2A900] focus:ring-2 focus:ring-[#F2A900]/20",
].join(" ");

const labelClass = "block text-[12px] font-semibold text-[#0F1B2D]";

function ApplicationForm({ t }: { t: JoinCopy }) {
  const uploadId = useId();
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setFileName("");
    setFileError("");
    if (!file) return;

    const validExtension = /\.(pdf|doc|docx)$/i.test(file.name);
    const validMime = !file.type || ACCEPTED_MIME_TYPES.has(file.type);
    if (!validExtension || !validMime) {
      setFileError(t.cvInvalid);
      event.currentTarget.value = "";
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setFileError(t.cvTooLarge);
      event.currentTarget.value = "";
      return;
    }
    setFileName(file.name);
  }

  return (
    <section
      id="join-application"
      aria-labelledby="join-form-title"
      className="min-w-0 rounded-[24px] border border-[#5B6B7F]/20 bg-[#FFFFFF] p-5 shadow-[0_12px_42px_rgba(15,27,45,0.045)] sm:p-7 lg:p-8"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6B7F]">
        {t.applicationLabel}
      </p>
      <h2
        id="join-form-title"
        className="mt-2 text-[clamp(1.55rem,2.8vw,2.15rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#0F1B2D]"
      >
        {t.applicationTitle}
      </h2>
      <p className="mt-2 text-[13px] leading-6 text-[#5B6B7F]">{t.applicationIntro}</p>

      {/* Presentation-only: wire an authenticated upload endpoint before enabling submissions. */}
      <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            {t.name} *
            <input name="name" className={inputClass} type="text" autoComplete="name" placeholder={t.namePlaceholder} required maxLength={100} />
          </label>
          <label className={labelClass}>
            {t.email} *
            <input name="email" className={inputClass} type="email" dir="ltr" autoComplete="email" placeholder={t.emailPlaceholder} required maxLength={254} />
          </label>
          <label className={labelClass}>
            {t.phone} *
            <input name="phone" className={inputClass} type="tel" dir="ltr" autoComplete="tel" placeholder={t.phonePlaceholder} required maxLength={35} />
          </label>
          <label className={labelClass}>
            {t.interest} *
            <select name="interest" className={inputClass} defaultValue="" required>
              <option value="" disabled>{t.interestPlaceholder}</option>
              {t.interests.map((interest) => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
          </label>
        </div>

        <label className={labelClass}>
          {t.portfolio}
          <input name="portfolio" className={inputClass} type="url" dir="ltr" placeholder="https://" maxLength={500} />
        </label>

        <div className="rounded-2xl border border-dashed border-[#5B6B7F]/30 bg-[#F5F3EE] px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2A900]/20 text-[#0F1B2D]">
              <FileUp size={19} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#0F1B2D]">{t.cv} *</p>
              <p className="mt-0.5 text-[11px] text-[#5B6B7F]">{t.cvHint}</p>
            </div>
            <label
              htmlFor={uploadId}
              className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[#5B6B7F]/25 bg-[#FFFFFF] px-4 text-[12px] font-semibold text-[#0F1B2D] transition-colors hover:border-[#F2A900] hover:bg-[#F2A900]/10"
            >
              {t.cvChoose}
            </label>
            <input
              id={uploadId}
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleFile}
              aria-label={t.cvChoose}
              aria-describedby={fileError ? `${uploadId}-error` : undefined}
            />
          </div>
          {fileName && (
            <p className="mt-3 flex items-center gap-2 break-all text-[12px] text-[#0F1B2D]">
              <Check size={15} className="shrink-0 text-[#F2A900]" aria-hidden="true" />
              {fileName}
            </p>
          )}
          {fileError && (
            <p id={`${uploadId}-error`} role="alert" className="mt-2 text-[12px] font-medium text-[#0F1B2D]">
              {fileError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled
          aria-describedby={`${uploadId}-notice`}
          className="flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#F2A900] px-6 py-3 text-[14px] font-semibold text-[#0F1B2D] opacity-65"
        >
          {t.submit}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
        <p id={`${uploadId}-notice`} className="text-center text-[11px] leading-[1.65] text-[#5B6B7F]">
          {t.demoNotice}
        </p>
      </form>
    </section>
  );
}

export function JoinExperience({ locale }: { locale: Locale }) {
  const t = joinPageCopy[locale];

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-[#F5F3EE] pb-10 text-[#0F1B2D]"
    >
      <section aria-labelledby="join-page-title" className="relative bg-[#F5F3EE]">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-7 px-5 py-8 sm:px-9 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-12 lg:py-16">
          <div className="lg:pb-10">
            <p className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0F1B2D]">
              <span aria-hidden="true" className="h-[3px] w-7 bg-[#F2A900]" />
              {t.eyebrow}
            </p>
            <h1
              id="join-page-title"
              className="mt-5 max-w-[500px] text-[clamp(2.8rem,4.7vw,4.4rem)] font-bold leading-[1.1] tracking-[-0.045em] text-[#0F1B2D]"
            >
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-[430px] text-[15px] leading-7 text-[#5B6B7F] sm:text-[16px]">
              {t.heroDescription}
            </p>
            <div className="mt-7 flex items-center gap-3 border-t border-[#5B6B7F]/20 pt-5">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#F2A900]" />
              <p className="text-[13px] font-medium text-[#5B6B7F]">{t.heroFootnote}</p>
            </div>
          </div>
          <ApplicationForm t={t} />
        </div>
      </section>
    </main>
  );
}
