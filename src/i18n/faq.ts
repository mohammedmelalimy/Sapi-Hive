/**
 * FAQ copy stays separate from UI code and is fully localized.
 * This file intentionally does not overwrite the existing en.json/ar.json dictionaries.
 * Names of SapiHive services remain in English in both languages.
 */
export const faqContent = {
  en: {
    eyebrow: '07 / FAQ',
    title: 'Good questions.',
    highlight: 'Clear answers.',
    intro: 'A few things worth knowing about working with SapiHive.',
    more: 'Still have a question?',
    contact: 'Let’s talk',
    questions: [
      {
        question: 'What is Workforce-as-a-Service?',
        answer:
          'Workforce-as-a-Service is a flexible way to access specialized teams and operational support without building every capability in-house. SapiHive brings the people and expertise together around your business needs.',
      },
      {
        question: 'What services does SapiHive offer?',
        answer:
          'Our services are Hive Corporate, Hive Tech, Hive People, Hive Talent, and Hive Creative. Each focuses on a different business need while working within one connected ecosystem.',
      },
      {
        question: 'How do you decide which team is right for us?',
        answer:
          'We start by understanding your goals, workflows, and requirements. From there, we discuss the skills and type of support that fit your business.',
      },
      {
        question: 'Can SapiHive support businesses as their needs change?',
        answer:
          'Our workforce solutions are designed with flexibility in mind. Let us know how your needs are evolving, and we can discuss an appropriate team structure.',
      },
      {
        question: 'Does SapiHive work with companies outside Egypt?',
        answer:
          'Yes. SapiHive is based in Cairo, Egypt and provides dedicated workforce solutions for businesses in different markets.',
      },
      {
        question: 'How can we start working with SapiHive?',
        answer:
          'Start by contacting our team and sharing your business requirements. We can then discuss your goals and the services that could be a good fit.',
      },
    ],
  },
  ar: {
    eyebrow: '07 / الأسئلة الشائعة',
    title: 'أسئلة مهمة.',
    highlight: 'إجابات واضحة.',
    intro: 'إجابات على أهم الأسئلة عن التعاون مع SapiHive.',
    more: 'عندك سؤال تاني؟',
    contact: 'تواصل معنا',
    questions: [
      {
        question: 'ما المقصود بحلول القوى العاملة كخدمة؟',
        answer:
          'هي طريقة مرنة للحصول على فرق عمل متخصصة ودعم تشغيلي من غير الحاجة لبناء كل التخصصات داخل شركتك. تجمع SapiHive الكفاءات والخبرات المناسبة بحسب احتياجات أعمالك.',
      },
      {
        question: 'ما الخدمات التي تقدمها SapiHive؟',
        answer:
          'نقدم خمس خدمات مترابطة: Hive Corporate وHive Tech وHive People وHive Talent وHive Creative. تركز كل خدمة على جانب مختلف من احتياجات الأعمال ضمن منظومة واحدة.',
      },
      {
        question: 'كيف نحدد فريق العمل المناسب لشركتنا؟',
        answer:
          'نبدأ بفهم أهداف شركتك وطبيعة العمل والمتطلبات الأساسية، ثم نناقش معك المهارات ونوع الدعم الأنسب لاحتياجاتك.',
      },
      {
        question: 'هل يمكن أن تتغير حلول العمل مع تطور احتياجات الشركة؟',
        answer:
          'نعتمد على حلول مرنة للقوى العاملة. شاركنا احتياجات شركتك الجديدة، ونناقش معك هيكل الفريق المناسب للمرحلة المقبلة.',
      },
      {
        question: 'هل تتعامل SapiHive مع شركات خارج مصر؟',
        answer:
          'نعم. يقع مقر SapiHive في القاهرة بمصر، وتقدم حلول فرق العمل المتخصصة لشركات في أسواق مختلفة.',
      },
      {
        question: 'كيف نبدأ التعاون مع SapiHive؟',
        answer:
          'تواصل مع فريقنا وشاركنا متطلبات شركتك، وبعدها نناقش أهدافك والخدمات التي يمكن أن تناسب احتياجاتك.',
      },
    ],
  },
} as const;
