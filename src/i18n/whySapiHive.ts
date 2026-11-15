import type { Locale } from "./config";

type Advantage = { title: string; description: string };
type Copy = {
  eyebrow: string;
  headingTop: string;
  headingBottom: string;
  intro: string;
  instruction: string;
  previous: string;
  next: string;
  cardLabel: string;
  benefits: readonly Advantage[];
};

/** Dedicated bilingual content: keeps the existing en.json/ar.json untouched. */
export const whySapiHiveCopy: Record<Locale, Copy> = {
  en: {
    eyebrow: "WHY SAPIHIVE",
    headingTop: "The Hive Works.",
    headingBottom: "You Grow.",
    intro: "Everything you need from a team, without the complexity of building one.",
    instruction: "Drag or swipe to explore the benefits",
    previous: "Previous benefit",
    next: "Next benefit",
    cardLabel: "Benefit",
    benefits: [
      { title: "Zero Hiring Burden", description: "We handle recruitment, onboarding, payroll and HR administration, so you can focus on your business." },
      { title: "One Monthly Invoice", description: "Salaries, insurance, HR and compliance, streamlined through one monthly invoice." },
      { title: "You Stay in Control", description: "Interview, approve and direct your dedicated team while we handle the employment side." },
      { title: "Scale on Demand", description: "Add, reduce or adapt your team as your business needs evolve." },
      { title: "Bilingual by Default", description: "Arabic- and English-speaking teams built for local and international collaboration." },
      { title: "Replacement Guarantee", description: "Not the right fit? We replace that team member at no additional cost." },
    ],
  },
  ar: {
    eyebrow: "لماذا SapiHive",
    headingTop: "فريقك علينا.",
    headingBottom: "وتركيزك على النمو.",
    intro: "كل ما تحتاجه من فريق عمل، من غير تعقيدات التوظيف وبناء الفريق من الصفر.",
    instruction: "اسحب يمينًا أو يسارًا لاستكشاف المميزات",
    previous: "الميزة السابقة",
    next: "الميزة التالية",
    cardLabel: "الميزة",
    benefits: [
      { title: "بدون أعباء التوظيف", description: "نتولى استقطاب الموظفين وتجهيزهم والرواتب والإدارة البشرية، لتتفرغ لأعمالك." },
      { title: "فاتورة شهرية واحدة", description: "الرواتب والتأمينات والموارد البشرية والامتثال الإداري ضمن فاتورة شهرية واحدة." },
      { title: "الإدارة تحت سيطرتك", description: "أنت من يقابل أعضاء الفريق ويعتمدهم ويوجه عملهم، ونحن ندير الجانب الوظيفي." },
      { title: "مرونة في التوسع", description: "زوّد فريقك أو قلّصه أو عدّل تشكيله مع تغيّر احتياجات أعمالك." },
      { title: "العمل بالعربية والإنجليزية", description: "فرق عمل تجيد العربية والإنجليزية لتخدم الشركات محليًا ودوليًا." },
      { title: "ضمان الاستبدال", description: "إذا لم يكن أحد أعضاء الفريق مناسبًا، نستبدله دون تكلفة إضافية." },
    ],
  },
};
