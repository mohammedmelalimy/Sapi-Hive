import type { Locale } from "@/i18n/config";

type ContactPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroLineOne: string;
  heroLineTwo: string;
  heroDescription: string;
  heroButton: string;
  heroAsideEyebrow: string;
  heroAsideTitle: string;
  heroAsideSubtitle: string;
  services: readonly string[];
  formEyebrow: string;
  formTitle: string;
  formIntro: string;
  fullName: string;
  fullNamePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  reason: string;
  reasonPlaceholder: string;
  reasons: readonly { value: string; label: string }[];
  message: string;
  messagePlaceholder: string;
  requiredNote: string;
  sendEmail: string;
  emailNotice: string;
  sidebarEyebrow: string;
  sidebarTitle: string;
  sidebarBody: string;
  emailLabel: string;
  whatsappLabel: string;
  locationLabel: string;
  location: string;
  whatsappButton: string;
  finalEyebrow: string;
  finalTitle: string;
  finalBody: string;
  serviceLink: string;
  emailSubject: string;
  fields: { name: string; company: string; email: string; phone: string; reason: string; message: string };
};

export const contactPageCopy: Record<Locale, ContactPageCopy> = {
  en: {
    metaTitle: "Contact SapiHive | Business Inquiries",
    metaDescription: "Get in touch with SapiHive about dedicated teams, workforce solutions and business partnerships.",
    eyebrow: "CONTACT US · FOR BUSINESSES",
    heroLineOne: "Let's talk",
    heroLineTwo: "business",
    heroDescription: "Tell us what your company needs. We'll help you find the right people and the right way forward.",
    heroButton: "Start a conversation",
    heroAsideEyebrow: "ONE HIVE. EVERY FUNCTION.",
    heroAsideTitle: "Good teams start with a great conversation.",
    heroAsideSubtitle: "Explore our five Hives",
    services: ["Hive Corporate", "Hive Tech", "Hive People", "Hive Talent", "Hive Creative"],
    formEyebrow: "BUSINESS INQUIRY",
    formTitle: "Tell us about your business.",
    formIntro: "Just a few details to get the conversation started.",
    fullName: "Your name",
    fullNamePlaceholder: "Full name",
    company: "Company name",
    companyPlaceholder: "Your company",
    email: "Work email",
    emailPlaceholder: "name@company.com",
    phone: "Phone number",
    phonePlaceholder: "+20 ...",
    reason: "How can we help?",
    reasonPlaceholder: "Select an inquiry type",
    reasons: [
      { value: "general", label: "General business inquiry" },
      { value: "corporate", label: "Hive Corporate" },
      { value: "tech", label: "Hive Tech" },
      { value: "people", label: "Hive People" },
      { value: "talent", label: "Hive Talent" },
      { value: "creative", label: "Hive Creative" },
      { value: "partnership", label: "Business partnership" },
      { value: "other", label: "Something else" },
    ],
    message: "Tell us what you need",
    messagePlaceholder: "A short overview of your business, project, or workforce requirement...",
    requiredNote: "* Required fields",
    sendEmail: "Open email to send",
    emailNotice: "This opens your email application with your inquiry prefilled. Review and send it there to complete your request.",
    sidebarEyebrow: "DIRECT CONTACT",
    sidebarTitle: "Prefer to reach us directly?",
    sidebarBody: "Our team is based in New Cairo, Egypt, working with businesses locally and internationally.",
    emailLabel: "Business email",
    whatsappLabel: "WhatsApp",
    locationLabel: "Based in",
    location: "New Cairo, Egypt",
    whatsappButton: "Chat on WhatsApp",
    finalEyebrow: "WORKFORCE-AS-A-SERVICE",
    finalTitle: "Five Hives. One partner.",
    finalBody: "From business operations to technology, people, talent and creative work — find the right Hive for your needs.",
    serviceLink: "Explore our services",
    emailSubject: "Business inquiry — SapiHive",
    fields: { name: "Name", company: "Company", email: "Email", phone: "Phone", reason: "Inquiry type", message: "Requirements" },
  },
  ar: {
    metaTitle: "تواصل مع SapiHive | استفسارات الشركات",
    metaDescription: "تواصل مع SapiHive بخصوص فرق العمل المتخصصة وحلول القوى العاملة والشراكات التجارية.",
    eyebrow: "تواصل معنا · للشركات",
    heroLineOne: "خلّينا نتكلم",
    heroLineTwo: "عن شغلك",
    heroDescription: "احكيلنا شركتك محتاجة إيه، وهنساعدك توصل للفريق والحل المناسب.",
    heroButton: "تواصل معانا",
    heroAsideEyebrow: "خمس خدمات. شريك واحد.",
    heroAsideTitle: "الفريق المناسب بيبدأ بحوار واضح.",
    heroAsideSubtitle: "خدمات SapiHive الخمسة",
    services: ["Hive Corporate", "Hive Tech", "Hive People", "Hive Talent", "Hive Creative"],
    formEyebrow: "استفسار الشركات",
    formTitle: "احكيلنا عن شركتك.",
    formIntro: "شوية تفاصيل بسيطة كفاية عشان نبدأ.",
    fullName: "اسمك",
    fullNamePlaceholder: "الاسم بالكامل",
    company: "اسم الشركة",
    companyPlaceholder: "اسم شركتك",
    email: "إيميل الشغل",
    emailPlaceholder: "name@company.com",
    phone: "رقم التليفون",
    phonePlaceholder: "+20 ...",
    reason: "محتاج مساعدتنا في إيه؟",
    reasonPlaceholder: "اختار نوع الاستفسار",
    reasons: [
      { value: "general", label: "استفسار خاص بالشركات" },
      { value: "corporate", label: "Hive Corporate" },
      { value: "tech", label: "Hive Tech" },
      { value: "people", label: "Hive People" },
      { value: "talent", label: "Hive Talent" },
      { value: "creative", label: "Hive Creative" },
      { value: "partnership", label: "شراكة تجارية" },
      { value: "other", label: "موضوع تاني" },
    ],
    message: "قولنا تفاصيل احتياجك",
    messagePlaceholder: "نبذة عن شركتك أو المشروع أو نوع الفريق اللي محتاجه...",
    requiredNote: "* حقول مطلوبة",
    sendEmail: "افتح الإيميل للإرسال",
    emailNotice: "هيتفتح برنامج الإيميل عندك وفيه تفاصيل استفسارك جاهزة. راجع الرسالة وابعتها لإتمام الطلب.",
    sidebarEyebrow: "تواصل مباشر",
    sidebarTitle: "حابب تتواصل معانا مباشرة؟",
    sidebarBody: "فريقنا موجود في القاهرة الجديدة، وبنتعاون مع شركات داخل مصر وخارجها.",
    emailLabel: "إيميل الشركة",
    whatsappLabel: "واتساب",
    locationLabel: "مقرنا",
    location: "القاهرة الجديدة، مصر",
    whatsappButton: "كلّمنا على واتساب",
    finalEyebrow: "القوى العاملة كخدمة",
    finalTitle: "خمس Hives. شريك واحد.",
    finalBody: "من إدارة الأعمال والتكنولوجيا للموارد البشرية والفعاليات والتصميم — اكتشف الخدمة المناسبة لشركتك.",
    serviceLink: "اكتشف خدماتنا",
    emailSubject: "استفسار شركة — SapiHive",
    fields: { name: "الاسم", company: "الشركة", email: "الإيميل", phone: "التليفون", reason: "نوع الاستفسار", message: "التفاصيل" },
  },
};
