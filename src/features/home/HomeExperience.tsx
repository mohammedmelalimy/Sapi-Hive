import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { HeroSection } from "@/features/hero/HeroSection";
import { IntroLoader } from "@/features/intro-loader/IntroLoader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhoWeAreSection } from "./sections/WhoWeAreSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FAQSection } from "./sections/FAQSection";
import { WhySapiHiveSection } from "./sections/WhySapiHiveSection";
import { ProcessSection } from "./sections/ProcessSection";

type Props = {
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
};

/** The home page uses native vertical scrolling. Only the Hero's own
 * storytelling remains pinned; all following sections are in document flow. */
export function HomeExperience({ locale, dict }: Props) {
  return (
    <>
      <IntroLoader locale={locale} />
      <Header locale={locale} />
      <main className="relative w-full max-w-full overflow-x-clip">
        <HeroSection dict={dict} />
        <WhoWeAreSection dict={dict} />
        <ServicesSection locale={locale} dict={dict} />
        <WhySapiHiveSection locale={locale} />
        <ProcessSection locale={locale} />
        <FAQSection locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
