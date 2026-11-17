import "../globals.css";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteBackground } from "@/components/background/SiteBackground";
import type { Metadata } from "next";
import { Poppins, Noto_Sans_Arabic } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Both languages must be rendered during build for a static host.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const seo = getDictionary(locale).seo;
  return { title: { absolute: seo.title }, description: seo.description };
}

// This is a ROOT layout for /en and /ar. Its HTML language is correct at build time.
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${poppins.variable} ${notoSansArabic.variable}`}
    >
      <body>
        <SiteBackground />
        <div className="relative z-10 min-h-screen w-full" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
          {children}
        </div>
      </body>
    </html>
  );
}
