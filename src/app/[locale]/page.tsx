import {HomeExperience} from "@/features/home/HomeExperience";
import {getDictionary} from "@/i18n/dictionaries";
import {isLocale} from "@/i18n/config";
import {notFound} from "next/navigation";
export default async function HomePage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <HomeExperience locale={locale} dict={getDictionary(locale)}/>;}
