import type { Locale } from "@/i18n/config";

type ValueItem = { title: string; description: string };
export type AboutCopy = {
  heroLabel: string;
  heroTitleA: string;
  heroTitleB: string;
  heroDescription: string;
  explore: string;
  heroFootnote: string;
  storyLabel: string;
  storyTitle: string;
  storyBody: string;
  sapiWord: string;
  sapiDescription: string;
  hiveWord: string;
  hiveDescription: string;
  storyClosing: string;
  experienceLabel: string;
  experienceDetail: string;
  purposeLabel: string;
  purposeTitle: string;
  visionTag: string;
  visionTitle: string;
  vision: string;
  missionTag: string;
  missionTitle: string;
  mission: string;
  valuesLabel: string;
  valuesTitleA: string;
  valuesTitleB: string;
  valuesLead: string;
  values: ValueItem[];
  closingLabel: string;
  closingLineA: string;
  closingLineB: string;
  closingLineC: string;
  closingNote: string;
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    heroLabel: "ABOUT SAPIHIVE · WORKFORCE-AS-A-SERVICE",
    heroTitleA: "Human Intelligence.",
    heroTitleB: "Organized like a Hive.",
    heroDescription: "We build, employ and manage dedicated teams for companies anywhere in the world — bringing skilled people together with structure, purpose and a shared goal.",
    explore: "Explore our story",
    heroFootnote: "NEW CAIRO, EGYPT · SERVING BUSINESSES WORLDWIDE",
    storyLabel: "01 / THE STORY BEHIND OUR NAME",
    storyTitle: "Two ideas. One connected Hive.",
    storyBody: "Our name brings together the human intelligence behind everything we deliver and the structure that makes it powerful.",
    sapiWord: "Human Intelligence",
    sapiDescription: "Sapi comes from Sapiens — the human intelligence behind everything we deliver.",
    hiveWord: "Collective Strength",
    hiveDescription: "Hive is the structure that makes it powerful: specialists organized into one synchronized team, each with a clear role, all working toward the same goal.",
    storyClosing: "Skilled people working in sync, with structure and purpose, toward your goals.",
    experienceLabel: "YEARS OF TEAM EXPERIENCE",
    experienceDetail: "Our team brings 15+ years of experience across the fields we work in, to every Hive.",
    purposeLabel: "02 / WHY WE EXIST",
    purposeTitle: "A clearer way to access human expertise.",
    visionTag: "WHERE WE ARE GOING",
    visionTitle: "Our Vision",
    vision: "A world where any business can access the human intelligence it needs, on demand, like a Hive.",
    missionTag: "WHAT WE DO EVERY DAY",
    missionTitle: "Our Mission",
    mission: "To deliver Workforce-as-a-Service that makes expert teams accessible to every business, removing the cost, time and complexity of hiring.",
    valuesLabel: "03 / WHAT GUIDES US",
    valuesTitleA: "Our",
    valuesTitleB: "Values.",
    valuesLead: "Five principles shape the way we work with businesses and the people inside our Hive.",
    values: [
      { title: "Synchronized and Structured", description: "We work as one team, aligned with each client's goals, with clear roles, processes and accountability in everything we deliver." },
      { title: "Dedicated", description: "Our people work for the client's business as if it were their own." },
      { title: "Adaptive", description: "Like a hive, we scale up or down to match what the client needs." },
      { title: "Integrity", description: "Transparency, confidentiality and honest commitments." },
      { title: "Excellence and People First", description: "Skilled, trained people and high standards in every task. We invest in the people in our hive, because their growth is our quality." },
    ],
    closingLabel: "THE SAPIHIVE PROMISE",
    closingLineA: "ONE HIVE.",
    closingLineB: "EVERY FUNCTION.",
    closingLineC: "ZERO HIRING.",
    closingNote: "Complete, dedicated teams for any business function, from Cairo to Egypt and the world.",
  },
  ar: {
    heroLabel: "عن SapiHive · حلول القوى العاملة كخدمة",
    heroTitleA: "الذكاء البشري.",
    heroTitleB: "منظّم كخلية واحدة.",
    heroDescription: "نبني فرق عمل متخصصة، ونوظّفها ونديرها لصالح شركات حول العالم، من خلال جمع الخبرات البشرية في منظومة واضحة الأدوار ومتحدة الأهداف.",
    explore: "اكتشف قصتنا",
    heroFootnote: "القاهرة الجديدة، مصر · نخدم الشركات حول العالم",
    storyLabel: "01 / قصة الاسم",
    storyTitle: "فكرتان. منظومة واحدة مترابطة.",
    storyBody: "يجمع اسمنا بين الذكاء البشري الذي يقف وراء ما نقدمه، والتنظيم الذي يحوّل هذه الخبرات إلى قوة متكاملة.",
    sapiWord: "الذكاء البشري",
    sapiDescription: "كلمة SAPI مشتقة من Sapiens، وتعبر عن الذكاء البشري الذي نعتمد عليه في كل ما نقدمه.",
    hiveWord: "قوة العمل الجماعي",
    hiveDescription: "تشير HIVE إلى المنظومة التي تجمع المتخصصين في فريق متزامن، لكل فرد فيه دور واضح، ويعمل الجميع نحو هدف مشترك.",
    storyClosing: "كفاءات تعمل بتناغم، وبتنظيم وهدف واضح، لتحقيق أهداف أعمالك.",
    experienceLabel: "سنوات من خبرة الفريق",
    experienceDetail: "يتمتع فريقنا بخبرة تزيد على 15 عامًا في المجالات التي نعمل بها، وننقل هذه الخبرات إلى كل Hive.",
    purposeLabel: "02 / لماذا نعمل",
    purposeTitle: "طريقة أبسط للوصول إلى الخبرات البشرية.",
    visionTag: "ما نتطلع إليه",
    visionTitle: "رؤيتنا",
    vision: "عالم تستطيع فيه أي شركة الوصول إلى الذكاء البشري الذي تحتاجه، عند الطلب، كما في الخلية.",
    missionTag: "ما نعمل عليه كل يوم",
    missionTitle: "رسالتنا",
    mission: "تقديم حلول القوى العاملة كخدمة، لإتاحة الفرق المتخصصة لكل شركة، مع إزالة تكلفة التوظيف ووقته وتعقيداته.",
    valuesLabel: "03 / المبادئ التي تقودنا",
    valuesTitleA: "قيمنا",
    valuesTitleB: "الأساسية.",
    valuesLead: "خمس قيم أساسية تحدد طريقة تعاوننا مع الشركات ومع الأشخاص داخل منظومتنا.",
    values: [
      { title: "التناغم والتنظيم", description: "نعمل كفريق واحد، بما يتوافق مع أهداف كل عميل، من خلال أدوار وعمليات ومسؤوليات واضحة في كل ما نقدمه." },
      { title: "التفاني", description: "يعمل أفراد فريقنا لصالح أعمال العميل كما لو كانت أعمالهم الخاصة." },
      { title: "المرونة", description: "مثل الخلية، نتوسع أو نقلّص حجم الفريق وفقًا لاحتياجات العميل." },
      { title: "النزاهة", description: "الشفافية والسرية والالتزامات الصادقة." },
      { title: "التميّز والاهتمام بالأفراد أولًا", description: "كوادر مؤهلة ومدرّبة ومعايير عالية في كل مهمة. نستثمر في الأشخاص داخل منظومتنا، لأن نموّهم ينعكس على جودة عملنا." },
    ],
    closingLabel: "وعد SapiHive",
    closingLineA: "منظومة واحدة.",
    closingLineB: "لكل وظيفة.",
    closingLineC: "من دون أعباء التوظيف.",
    closingNote: "فرق عمل متخصصة ومتكاملة لمختلف وظائف الشركات، من القاهرة إلى مصر والعالم.",
  },
};
