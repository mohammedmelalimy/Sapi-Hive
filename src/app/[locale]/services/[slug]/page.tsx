import {notFound} from "next/navigation";
import Link from "next/link";
import {services} from "@/data/services";
import {isLocale,localizedPath,locales} from "@/i18n/config";
import {getServices} from "@/i18n/services";
import {getDictionary} from "@/i18n/dictionaries";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
export function generateStaticParams(){return locales.flatMap(locale=>services.map(s=>({locale,slug:s.slug})));}
export default async function ServicePage({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;if(!isLocale(locale))notFound();const service=getServices(locale).find(s=>s.slug===slug);if(!service)notFound();const d=getDictionary(locale);
 return <><Header locale={locale}/><main className="min-h-screen bg-[#f5f3ee] pt-28 text-[#0f1b2d]"><div className="section-shell"><p className="section-label">{d.pages.services.title}</p><h1 className="text-5xl font-bold" dir={locale === "ar" ? "rtl" : "ltr"}>{service.title}</h1><p className="mt-6 max-w-xl">{service.description}</p><h2 className="mt-12 text-2xl font-bold">{d.common.what}</h2><ul className="mt-4 grid gap-3">{service.offerings.map(o=><li key={o}>— {o}</li>)}</ul><Link href={localizedPath(locale,"/contact")} className="mt-10 inline-block border-b border-current pb-1">{d.common.contact} ↗</Link></div></main><Footer locale={locale}/></>;
}
