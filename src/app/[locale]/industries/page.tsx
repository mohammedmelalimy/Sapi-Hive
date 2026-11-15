import {notFound} from "next/navigation";
import {isLocale} from "@/i18n/config";
import {getDictionary} from "@/i18n/dictionaries";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <><Header locale={locale}/><main className="min-h-dvh bg-[#f5f3ee] pt-24 text-[#0f1b2d]"><div className="section-shell"><h1 className="text-5xl font-semibold">{d.pages.industries.title}</h1><p className="mt-6 max-w-2xl">{d.pages.industries.body}</p></div></main><Footer locale={locale}/></>;}
