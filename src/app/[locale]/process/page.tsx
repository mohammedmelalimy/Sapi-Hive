import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProcessExperience } from "@/features/process/ProcessExperience";
import { processPageCopy } from "@/i18n/processPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = processPageCopy[locale];
  return { title: copy.metaTitle, description: copy.metaDescription };
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      <ProcessExperience locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
