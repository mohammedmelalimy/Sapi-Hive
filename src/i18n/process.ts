import type { Locale } from "@/i18n/config";

/** Copy adapted from SapiHive Company Profile (3), page 8: HOW IT WORKS. */
export const processCopy = {
  en: {
    eyebrow: "OUR PROCESS / HOW IT WORKS",
    title: "Your workforce.",
    titleAccent: "Our process.",
    description:
      "Workforce-as-a-Service (WaaS) means you get a complete, managed team for any function, without hiring a single person. We find the people, run the team, and deliver the work; you focus on your business.",
    stepsLabel: "Five steps, one seamless way to work.",
    steps: [
      { title: "Discover", text: "Tell us what you need: a function, a project or a campaign." },
      { title: "Assemble", text: "We build your team from skilled people in the Hive, dedicated to your business." },
      { title: "Operate", text: "Your team gets to work, aligned to your goals." },
      { title: "Deliver", text: "The work is delivered to the standard you agreed on." },
      { title: "Scale", text: "Add, reduce or change your team as your needs change." },
    ],
  },
  ar: {
    eyebrow: "آلية العمل / OUR PROCESS",
    title: "فريقك جاهز.",
    titleAccent: "بخطوات واضحة.",
    description:
      "مع نموذج القوى العاملة كخدمة (WaaS)، تحصل على فريق متكامل يُدار لصالح أعمالك دون الحاجة إلى تعيين موظفين بنفسك. نختار الكفاءات ونُدير الفريق وننفذ العمل، لتتفرغ أنت لأعمالك.",
    stepsLabel: "خمس مراحل، وطريقة عمل واحدة متكاملة.",
    steps: [
      { title: "تحديد الاحتياج", text: "أخبرنا بما تحتاج إليه: وظيفة تشغيلية، أو مشروع، أو حملة." },
      { title: "تجهيز الفريق", text: "نكوّن فريقك من الكفاءات المتخصصة داخل Hive، والمكرّسة لخدمة أعمالك." },
      { title: "بدء العمل", text: "يبدأ فريقك العمل بما يتوافق مع أهدافك." },
      { title: "تسليم العمل", text: "يُنجَز العمل وفق المستوى والمعايير التي اتفقنا عليها." },
      { title: "التوسع", text: "زد حجم فريقك أو قلّصه أو غيّر تشكيله حسب احتياجاتك." },
    ],
  },
} as const satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  stepsLabel: string;
  steps: readonly { title: string; text: string }[];
}>;
