import type { Locale } from "@/i18n/config";

export type JoinCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroFootnote: string;
  applicationLabel: string;
  applicationTitle: string;
  applicationIntro: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  interest: string;
  interestPlaceholder: string;
  interests: readonly string[];
  portfolio: string;
  cv: string;
  cvHint: string;
  cvChoose: string;
  cvInvalid: string;
  cvTooLarge: string;
  submit: string;
  demoNotice: string;
};

export const joinPageCopy: Record<Locale, JoinCopy> = {
  en: {
    metaTitle: "Join Us | SapiHive Careers",
    metaDescription: "Join the SapiHive team. Choose your area and share your CV to introduce yourself.",
    eyebrow: "JOIN US",
    heroTitle: "Join the SapiHive team.",
    heroDescription: "Every skill has a place in the Hive. Tell us a little about yourself and share your CV.",
    heroFootnote: "Five Hives. One connected team.",
    applicationLabel: "JOIN THE HIVE",
    applicationTitle: "Apply to join us.",
    applicationIntro: "A few details and your CV. That's all we need to get started.",
    name: "Full name",
    namePlaceholder: "Your full name",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    phone: "Phone number",
    phonePlaceholder: "+20 ...",
    interest: "Area of interest",
    interestPlaceholder: "Choose a Hive",
    interests: ["Hive Corporate", "Hive Tech", "Hive People", "Hive Talent", "Hive Creative", "Other / General application"],
    portfolio: "LinkedIn or portfolio (optional)",
    cv: "Upload your CV",
    cvHint: "PDF, DOC or DOCX · max 5 MB",
    cvChoose: "Choose file",
    cvInvalid: "Please choose a PDF or Word document.",
    cvTooLarge: "File must be 5 MB or smaller.",
    submit: "Submit application",
    demoNotice: "Submissions are not live yet. Secure CV upload will be enabled when the backend is connected.",
  },
  ar: {
    metaTitle: "انضم إلينا | فرص الانضمام إلى SapiHive",
    metaDescription: "انضم إلى فريق SapiHive. اختار المجال المناسب وارفع سيرتك الذاتية للتعريف بنفسك.",
    eyebrow: "انضم إلينا",
    heroTitle: "انضم لفريق SapiHive.",
    heroDescription: "كل مهارة ليها مكان في الـ Hive. عرّفنا بنفسك وشارك سيرتك الذاتية معانا.",
    heroFootnote: "خمس Hives. فريق واحد مترابط.",
    applicationLabel: "طلب الانضمام",
    applicationTitle: "قدّم للانضمام إلينا.",
    applicationIntro: "بيانات بسيطة وسيرتك الذاتية، وده كل اللي محتاجينه كبداية.",
    name: "الاسم بالكامل",
    namePlaceholder: "اكتب اسمك بالكامل",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    phone: "رقم الموبايل",
    phonePlaceholder: "+20 ...",
    interest: "المجال اللي مهتم بيه",
    interestPlaceholder: "اختار الـ Hive",
    interests: ["Hive Corporate", "Hive Tech", "Hive People", "Hive Talent", "Hive Creative", "مجال آخر / تقديم عام"],
    portfolio: "LinkedIn أو Portfolio (اختياري)",
    cv: "ارفع الـ CV",
    cvHint: "PDF أو Word · بحد أقصى 5 ميجابايت",
    cvChoose: "اختار ملف",
    cvInvalid: "من فضلك اختار ملف PDF أو Word.",
    cvTooLarge: "حجم الملف لازم يكون 5 ميجابايت أو أقل.",
    submit: "إرسال طلب الانضمام",
    demoNotice: "الإرسال لسه مش مفعّل. رفع الـ CV هيشتغل بعد ربطه بشكل آمن بالـ Backend.",
  },
};
