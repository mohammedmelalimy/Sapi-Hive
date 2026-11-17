import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutExperience } from "@/features/about/AboutExperience";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: locale === "ar" ? "عن SapiHive | رؤيتنا وقيمنا" : "About Us | SapiHive — Our Story, Vision & Values",
    description: locale === "ar"
      ? "تعرّف على قصة SapiHive ورؤيتها ورسالتها وقيمها في تقديم حلول القوى العاملة كخدمة."
      : "Meet SapiHive: our story, vision, mission and values behind Workforce-as-a-Service.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Header locale={locale} />
      <AboutExperience locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
