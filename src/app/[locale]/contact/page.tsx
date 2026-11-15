import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactExperience } from "@/features/contact/ContactExperience";
import { contactPageCopy } from "@/i18n/contactPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = contactPageCopy[locale];
  return { title: copy.metaTitle, description: copy.metaDescription };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Header locale={locale} />
      <ContactExperience locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
