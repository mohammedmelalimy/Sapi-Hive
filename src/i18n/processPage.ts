import type { Locale } from "@/i18n/config";

/**
 * Standalone Process page copy.
 * Business statements are drawn from SapiHive Company Profile, pages 8–9 and 18–19.
 * The five step descriptions themselves are reused from i18n/process.ts.
 */
export const processPageCopy = {
  en: {
    metaTitle: "Our Process | How Workforce-as-a-Service Works | SapiHive",
    metaDescription: "From Discover to Scale: see how SapiHive builds, manages and delivers a dedicated team for your business in five clear steps.",
    eyebrow: "THE SAPIHIVE PROCESS",
    heroFirst: "One brief.",
    heroSecond: "Five clear stages.",
    heroScroll: "Explore the process",
    heroNote: "YOUR WORKFORCE-AS-A-SERVICE",
    journeyEyebrow: "01 / THE JOURNEY",
    journeyTitle: "How the Hive",
    journeyAccent: "comes together.",
    journeyDescription: "We find the people, run the team, and deliver the work. You focus on your business.",
    journeyLabel: "THE FIVE-STAGE JOURNEY",
    journeyProgress: "CURRENT STAGE",
    stageText: "STAGE",
    overviewEyebrow: "02 / A SIMPLER WAY TO WORK",
    overviewTitle: "Less to manage.",
    overviewAccent: "More to achieve.",
    stopTitle: "What you stop doing",
    stopItems: [
      "Recruiting",
      "Onboarding",
      "Payroll contracts",
      "HR administration",
      "Architecting systems",
      "Developing technical solutions",
      "Marketing",
      "Casting talent",
    ],
    keepTitle: "What you keep",
    keepBody: "Full focus on your business and the results you want.",
    keepFooter: "Your business. Your direction.",
    whyEyebrow: "03 / WHY SAPIHIVE",
    whyTitle: "Built to keep",
    whyAccent: "you moving.",
    assurances: [
      { title: "One monthly invoice", text: "Salaries, insurance, HR and compliance, all covered." },
      { title: "You stay in control", text: "You interview, approve and direct every member." },
      { title: "Bilingual by default", text: "Every member works in Arabic and English." },
      { title: "Replacement guarantee", text: "Not the right fit? We replace them at no cost." },
    ],
    ctaEyebrow: "READY TO GET STARTED?",
    ctaTitle: "Whatever your business needs,",
    ctaAccent: "the Hive delivers.",
    ctaMain: "Request a consultation",
    ctaOther: "Explore our services",
    stepsTotal: "STAGES",
  },
  ar: {
    metaTitle: "طريقة العمل | خطوات القوى العاملة كخدمة | SapiHive",
    metaDescription: "من تحديد الاحتياج إلى التوسع: تعرّف على المراحل الخمس التي تعتمدها SapiHive لتجهيز فريق عمل متكامل وإدارته.",
    eyebrow: "طريقة العمل في SapiHive",
    heroFirst: "طلب واحد.",
    heroSecond: "خمس مراحل واضحة.",
    heroScroll: "اكتشف مراحل العمل",
    heroNote: "القوى العاملة كخدمة",
    journeyEyebrow: "01 / رحلة العمل",
    journeyTitle: "كيف نجهّز",
    journeyAccent: "فريقك خطوة بخطوة؟",
    journeyDescription: "نختار الكفاءات، وندير الفريق، ونسلّم العمل؛ حتى تركز أنت على أعمالك.",
    journeyLabel: "رحلة العمل في خمس مراحل",
    journeyProgress: "المرحلة الحالية",
    stageText: "المرحلة",
    overviewEyebrow: "02 / طريقة عمل أبسط",
    overviewTitle: "مهام أقل لإدارتها.",
    overviewAccent: "تركيز أكبر على أهدافك.",
    stopTitle: "المهام التي نتولاها عنك",
    stopItems: [
      "التوظيف",
      "تهيئة الموظفين للعمل",
      "عقود الرواتب",
      "إدارة الموارد البشرية",
      "تصميم الأنظمة",
      "تطوير الحلول التقنية",
      "التسويق",
      "توفير المواهب",
    ],
    keepTitle: "ما الذي تحتفظ به؟",
    keepBody: "تركيز كامل على أعمالك والنتائج التي تسعى لتحقيقها.",
    keepFooter: "أعمالك. وتوجيهك.",
    whyEyebrow: "03 / لماذا SapiHive؟",
    whyTitle: "كل ما تحتاجه",
    whyAccent: "للاستمرار بثقة.",
    assurances: [
      { title: "فاتورة شهرية واحدة", text: "تشمل الرواتب والتأمينات والموارد البشرية والامتثال." },
      { title: "أنت صاحب القرار", text: "تجري مقابلات مع كل عضو وتوافق عليه وتوجّهه." },
      { title: "فريق يتحدث لغتين", text: "كل عضو يعمل بالعربية والإنجليزية." },
      { title: "ضمان الاستبدال", text: "إذا لم يكن الشخص مناسبًا، نستبدله دون تكلفة إضافية." },
    ],
    ctaEyebrow: "جاهز تبدأ؟",
    ctaTitle: "أيًّا كانت احتياجات أعمالك،",
    ctaAccent: "الـ Hive ينجزها.",
    ctaMain: "اطلب استشارة",
    ctaOther: "استكشف خدماتنا",
    stepsTotal: "مراحل",
  },
} as const satisfies Record<Locale, {
  metaTitle: string; metaDescription: string; eyebrow: string; heroFirst: string;
  heroSecond: string; heroScroll: string; heroNote: string;
  journeyEyebrow: string; journeyTitle: string; journeyAccent: string;
  journeyDescription: string; journeyLabel: string; journeyProgress: string;
  stageText: string; overviewEyebrow: string; overviewTitle: string;
  overviewAccent: string; stopTitle: string; stopItems: readonly string[];
  keepTitle: string; keepBody: string; keepFooter: string;
  whyEyebrow: string; whyTitle: string; whyAccent: string;
  assurances: readonly { title: string; text: string }[];
  ctaEyebrow: string; ctaTitle: string; ctaAccent: string;
  ctaMain: string; ctaOther: string; stepsTotal: string;
}>;
