import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesExperience } from "@/features/services/ServicesExperience";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale === "ar"
    ? { title: "خدمات SapiHive | القوى العاملة كخدمة", description: "اكتشف الخدمات الخمس: Hive Corporate وHive Tech وHive People وHive Talent وHive Creative." }
    : { title: "Our Services | SapiHive", description: "Discover five specialist Hives providing Workforce-as-a-Service for businesses." };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      <ServicesExperience locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
