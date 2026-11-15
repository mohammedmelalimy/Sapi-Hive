import type {Locale} from "./config";
import {services} from "@/data/services";
import {getDictionary} from "@/i18n/dictionaries";
const arabic: Record<string,{short:string,description:string,offerings:string[]}> = {
 "hive-corporate": {short:"العمليات والدعم الإداري",description:"فرق متخصصة لإدارة العمليات اليومية للشركات.",offerings:["الدعم المالي ومسك الدفاتر","الإدارة والأعمال المكتبية","خدمة العملاء والدعم الفني","الخدمات اللوجستية","الاستشارات وتحسين العمليات"]},
 "hive-tech":{short:"البرمجيات وتكنولوجيا المعلومات",description:"حلول برمجية وتقنية مصممة لاحتياجات أعمالك.",offerings:["تطوير البرمجيات والأنظمة","تصميم وتطوير المواقع","الدعم الفني والحلول التقنية"]},
 "hive-people":{short:"التوظيف والموارد البشرية والرواتب",description:"متخصصون في التوظيف وعمليات الموارد البشرية وإدارة الرواتب.",offerings:["عمليات الموارد البشرية","التوظيف والتوظيف واسع النطاق","إدارة الرواتب"]},
 "hive-talent":{short:"فرق الفعاليات والحملات",description:"كوادر تمثل علامتك التجارية في الفعاليات والحملات.",offerings:["العارضون والمروجون","سفراء العلامات التجارية","منظمو الفعاليات وفرق الاستقبال","كوادر الفعاليات والحملات"]},
 "hive-creative":{short:"الهوية البصرية والمحتوى",description:"فرق إبداعية تقدم لعلامتك التجارية هوية وصوتًا متسقين.",offerings:["التصميم الجرافيكي","العلامات التجارية والهوية البصرية","إنشاء المحتوى"]}
};
const serviceKeys = {"hive-corporate":"corporate", "hive-tech":"tech", "hive-people":"people", "hive-talent":"talent", "hive-creative":"creative"} as const;
export function getServices(locale:Locale) {
  if (locale === "en") return services.map(s => ({...s, short: String(s.short), description: String(s.description), offerings: [...s.offerings], title: String(s.title)}));
  const names = getDictionary("ar").services;
  return services.map(s => ({...s, ...arabic[s.slug], title: names[serviceKeys[s.slug]]}));
}
