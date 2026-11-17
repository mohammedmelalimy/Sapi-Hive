import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JoinExperience } from "@/features/join/JoinExperience";
import { joinPageCopy } from "@/i18n/joinPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = joinPageCopy[locale];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <><Header locale={locale}/><JoinExperience locale={locale}/><Footer locale={locale}/></>;
}
