export type HiveSlug = 'hive-corporate' | 'hive-tech' | 'hive-people' | 'hive-talent' | 'hive-creative';
export type HiveLocale = 'en' | 'ar';
export type Item = { title: string; detail: string };
export type HiveCopy = {
  kicker: string; headline: [string, string]; intro: string; visualLabel: string;
  explore: string; contact: string; back: string;
  sectionLabel: string; sectionTitle: [string, string]; sectionIntro: string;
  items: Item[];
  whyLabel: string; whyTitle: [string, string]; whyDescription: string;
  proof: Item[];
  finalLabel: string; finalTitle: [string, string]; finalBody: string; finalButton: string;
  extra: string[];
};

export const hiveContent: Record<HiveSlug, Record<HiveLocale, HiveCopy>> = {
  'hive-corporate': {
    en: {
      kicker: 'HIVE CORPORATE  ·  BUSINESS OPERATIONS', headline: ['Operations run better', 'with the right people.'],
      intro: 'From finance and back-office to customer support and logistics. Dedicated teams for the everyday work that keeps your business moving.',
      visualLabel: 'YOUR OPERATIONS, IN SYNC', explore: 'Explore capabilities', contact: 'Request a corporate team', back: 'All services',
      sectionLabel: 'WHAT WE TAKE CARE OF', sectionTitle: ['Everything that keeps', 'business moving.'],
      sectionIntro: 'Five operational disciplines. One team structure that works around your business.',
      items: [
        { title: 'Finance support & bookkeeping', detail: 'Dedicated people supporting routine financial records and bookkeeping.' },
        { title: 'Admin & back-office operations', detail: 'The administrative support your day-to-day operations rely on.' },
        { title: 'Customer & technical support', detail: 'People dedicated to customer requests and technical support.' },
        { title: 'Logistics', detail: 'Operational people supporting your logistics activities.' },
        { title: 'Business consultation & process improvement', detail: 'Support for reviewing business processes and improving the way work gets done.' },
      ],
      whyLabel: 'THE WORKING RELATIONSHIP', whyTitle: ['Your priorities.', 'Our people and structure.'],
      whyDescription: 'SapiHive builds, employs and manages a dedicated team while you remain involved in choosing and directing the people working with your business.',
      proof: [
        { title: 'You stay in control', detail: 'Interview, approve and direct each team member.' },
        { title: 'One monthly invoice', detail: 'Salaries, insurance, HR and compliance organized together.' },
        { title: 'Bilingual by default', detail: 'Team members work in Arabic and English.' },
        { title: 'Replacement guarantee', detail: 'Not the right fit? We replace the member at no cost.' },
      ],
      finalLabel: 'LET’S BUILD YOUR CORPORATE HIVE', finalTitle: ['Let the business grow.', 'We’ll handle the team.'],
      finalBody: 'Tell us which part of your operations needs support and we’ll discuss the right team.', finalButton: 'Talk to our team',
      extra: ['Finance', 'Administration', 'Customer support', 'Logistics', 'Consulting'],
    },
    ar: {
      kicker: 'هايف كوربوريت · تشغيل الأعمال', headline: ['شغّل أعمالك بكفاءة', 'مع الفريق المناسب.'],
      intro: 'من الشؤون المالية والإدارة إلى دعم العملاء والخدمات اللوجستية، نوفر فرقًا متخصصة للمهام اليومية التي تحافظ على سير أعمالك.',
      visualLabel: 'عملياتك تعمل بتناغم', explore: 'استكشف التخصصات', contact: 'اطلب فريقًا لإدارة أعمالك', back: 'كل الخدمات',
      sectionLabel: 'مجالات الدعم', sectionTitle: ['تفاصيل التشغيل', 'في أيدٍ متخصصة.'],
      sectionIntro: 'خمسة تخصصات تشغيلية من خلال فرق منظمة ومصممة لاحتياجات شركتك.',
      items: [
        { title: 'الدعم المالي ومسك الدفاتر', detail: 'كوادر متخصصة لدعم السجلات المالية والأعمال المحاسبية الروتينية.' },
        { title: 'الإدارة والأعمال المكتبية الخلفية', detail: 'دعم إداري للأعمال والمهام اليومية للشركة.' },
        { title: 'خدمة العملاء والدعم الفني', detail: 'فرق للرد على العملاء وتلبية احتياجات الدعم الفني.' },
        { title: 'الخدمات اللوجستية', detail: 'كوادر تشغيلية لدعم الأنشطة اللوجستية.' },
        { title: 'الاستشارات وتحسين إجراءات العمل', detail: 'المساعدة في مراجعة الإجراءات وتطوير طريقة سير العمليات.' },
      ],
      whyLabel: 'أسلوب التعاون', whyTitle: ['أولويات شركتك.', 'وفريقنا المنظم.'],
      whyDescription: 'تبني SapiHive فريقًا مخصصًا وتوظفه وتديره، مع استمرار دورك في اختيار أفراده وتوجيههم.',
      proof: [
        { title: 'أنت المتحكم', detail: 'تجري المقابلات وتعتمد أعضاء الفريق وتوجه عملهم.' },
        { title: 'فاتورة شهرية واحدة', detail: 'الرواتب والتأمينات والموارد البشرية والامتثال في إطار واحد.' },
        { title: 'العربية والإنجليزية', detail: 'أعضاء الفريق يعملون باللغتين.' },
        { title: 'ضمان الاستبدال', detail: 'إذا لم يكن أحد الأعضاء مناسبًا، نستبدله دون تكلفة إضافية.' },
      ],
      finalLabel: 'ابنِ فريق الأعمال المناسب', finalTitle: ['ركّز على نمو أعمالك.', 'واترك لنا إدارة الفريق.'],
      finalBody: 'شاركنا الجزء الذي يحتاج إلى دعم في عمليات شركتك لنتحدث عن الفريق المناسب.', finalButton: 'تواصل مع فريقنا',
      extra: ['الشؤون المالية', 'الإدارة', 'دعم العملاء', 'اللوجستيات', 'الاستشارات'],
    },
  },
  'hive-tech': {
    en: {
      kicker: 'HIVE TECH  ·  ENGINEERING & TECHNOLOGY', headline: ['Ideas need engineers.', 'You need momentum.'],
      intro: 'Technical solutions delivered by engineers who build, test and support the systems behind your business.',
      visualLabel: 'SYSTEM STATUS  /  CONNECTED', explore: 'See tech capabilities', contact: 'Discuss a tech team', back: 'All services',
      sectionLabel: 'TECHNICAL CAPABILITIES', sectionTitle: ['From first build', 'to everyday support.'],
      sectionIntro: 'A focused set of engineering and technology capabilities for your business.',
      items: [
        { title: 'Software & systems development', detail: 'Building and developing the software and systems your business needs.' },
        { title: 'Web design & development', detail: 'Designing and developing web experiences around your objectives.' },
        { title: 'IT support & tech solutions', detail: 'Technical people to support your systems and technology needs.' },
      ],
      whyLabel: 'A PRACTICAL TECH PARTNER', whyTitle: ['Build what matters.', 'Support what runs.'],
      whyDescription: 'A managed technical team works toward your goals, while SapiHive looks after the people and the operational structure behind it.',
      proof: [
        { title: 'Your direction', detail: 'Define your priorities and review the people on your team.' },
        { title: 'Dedicated specialists', detail: 'Engineers working on the specific technical functions you need.' },
        { title: 'A managed workforce', detail: 'SapiHive handles employment and day-to-day team management.' },
      ],
      finalLabel: 'ENGINEERING STARTS WITH A CONVERSATION', finalTitle: ['Bring the challenge.', 'We’ll bring the team.'],
      finalBody: 'Tell us what you want to build, improve or support.', finalButton: 'Discuss your project',
      extra: ['SYSTEMS', 'WEB', 'SUPPORT'],
    },
    ar: {
      kicker: 'هايف تك · الهندسة والتكنولوجيا', headline: ['أفكارك تحتاج مهندسين.', 'وأعمالك تحتاج تنفيذًا.'],
      intro: 'حلول تقنية ينفذها مهندسون يعملون على بناء الأنظمة واختبارها ودعمها لتخدم أعمالك.',
      visualLabel: 'حالة الأنظمة / متصل', explore: 'اكتشف الخدمات التقنية', contact: 'تواصل بشأن فريق تقني', back: 'كل الخدمات',
      sectionLabel: 'التخصصات التقنية', sectionTitle: ['من التطوير الأول', 'إلى الدعم المستمر.'],
      sectionIntro: 'تخصصات هندسية وتقنية موجهة لاحتياجات شركتك.',
      items: [
        { title: 'تطوير البرمجيات والأنظمة', detail: 'بناء البرمجيات والأنظمة وتطويرها وفق احتياجات العمل.' },
        { title: 'تصميم وتطوير المواقع', detail: 'تصميم وتطوير تجارب ومواقع إلكترونية تخدم أهداف شركتك.' },
        { title: 'الدعم الفني والحلول التقنية', detail: 'متخصصون لدعم الأنظمة والاحتياجات التقنية.' },
      ],
      whyLabel: 'شريك تقني عملي', whyTitle: ['نبني ما تحتاجه.', 'وندعم ما تعتمد عليه.'],
      whyDescription: 'يعمل فريق تقني مُدار وفق أهدافك، بينما تتولى SapiHive إدارة الفريق والجانب التشغيلي المرتبط به.',
      proof: [
        { title: 'أولوياتك أولًا', detail: 'تحدد احتياجاتك وتشارك في اختيار أعضاء الفريق.' },
        { title: 'تخصصات مناسبة', detail: 'مهندسون يعملون على الوظائف التقنية المطلوبة.' },
        { title: 'فريق مُدار', detail: 'تتولى SapiHive التوظيف وإدارة الفريق.' },
      ],
      finalLabel: 'لنبدأ بمناقشة احتياجك التقني', finalTitle: ['شاركنا التحدي.', 'ونوفر الفريق المناسب.'],
      finalBody: 'احكِ لنا ما تريد بناءه أو تطويره أو دعمه.', finalButton: 'ناقش مشروعك',
      extra: ['الأنظمة', 'المواقع', 'الدعم'],
    },
  },
  'hive-people': {
    en: {
      kicker: 'HIVE PEOPLE  ·  HUMAN RESOURCES', headline: ['Better people processes.', 'Stronger teams.'],
      intro: 'HR professionals who find, onboard, pay and look after your people — with structure behind every step.',
      visualLabel: 'THE PEOPLE PIPELINE', explore: 'Explore people services', contact: 'Talk about HR support', back: 'All services',
      sectionLabel: 'PEOPLE SERVICES', sectionTitle: ['Built around people.', 'Backed by process.'],
      sectionIntro: 'Three essential services for the employee lifecycle.',
      items: [
        { title: 'HR operations', detail: 'People-focused administrative and HR functions that support your workforce.' },
        { title: 'Recruitment & mass hiring', detail: 'Identifying and recruiting the people your business needs, including high-volume hiring.' },
        { title: 'Payroll processing', detail: 'Managing payroll processing as part of organized workforce operations.' },
      ],
      whyLabel: 'THE PEOPLE BEHIND THE PROCESS', whyTitle: ['More time for your team.', 'Less HR complexity.'],
      whyDescription: 'SapiHive brings the specialists and structure behind recruitment, HR operations and payroll, so you can focus on your people and business goals.',
      proof: [
        { title: 'Find', detail: 'Recruitment & mass hiring.' },
        { title: 'Support', detail: 'Day-to-day HR operations.' },
        { title: 'Pay', detail: 'Payroll processing.' },
      ],
      finalLabel: 'BUILD A BETTER PEOPLE FUNCTION', finalTitle: ['Your people matter.', 'Let’s support them well.'],
      finalBody: 'Tell us which HR functions need a dedicated team.', finalButton: 'Let’s talk people',
      extra: ['FIND', 'ONBOARD', 'SUPPORT', 'PAY'],
    },
    ar: {
      kicker: 'هايف بيبول · الموارد البشرية', headline: ['إدارة أفضل للأفراد.', 'وفِرق أقوى.'],
      intro: 'متخصصون في الموارد البشرية للبحث عن الكفاءات وتعيينها وإدارة الرواتب والاهتمام بشؤون الأفراد بطريقة منظمة.',
      visualLabel: 'رحلة إدارة الأفراد', explore: 'استكشف خدمات الموارد البشرية', contact: 'ناقش احتياجات الموارد البشرية', back: 'كل الخدمات',
      sectionLabel: 'خدمات الأفراد', sectionTitle: ['الأفراد في قلب العمل.', 'والنظام في كل خطوة.'],
      sectionIntro: 'ثلاث خدمات أساسية خلال رحلة الموظف داخل الشركة.',
      items: [
        { title: 'عمليات الموارد البشرية', detail: 'عمليات إدارية ومتخصصة تدعم إدارة الأفراد في شركتك.' },
        { title: 'التوظيف والتوظيف واسع النطاق', detail: 'البحث عن الكوادر وتعيينها، بما يشمل احتياجات التوظيف بأعداد كبيرة.' },
        { title: 'إدارة الرواتب', detail: 'معالجة الرواتب ضمن عمليات منظمة لإدارة القوى العاملة.' },
      ],
      whyLabel: 'الأفراد والنظام', whyTitle: ['وقت أكثر لفريقك.', 'وتعقيد إداري أقل.'],
      whyDescription: 'توفر SapiHive متخصصين ونظامًا لإدارة التوظيف والموارد البشرية والرواتب لتتفرغ لأهداف شركتك.',
      proof: [
        { title: 'استقطاب', detail: 'التوظيف والتوظيف واسع النطاق.' },
        { title: 'دعم', detail: 'عمليات الموارد البشرية اليومية.' },
        { title: 'رواتب', detail: 'معالجة وإدارة الرواتب.' },
      ],
      finalLabel: 'طوّر إدارة الموارد البشرية', finalTitle: ['أفرادك مهمون.', 'فلنهتم بهم معًا.'],
      finalBody: 'شاركنا الوظائف التي تحتاج إلى دعم فريق موارد بشرية متخصص.', finalButton: 'لنتحدث عن الأفراد',
      extra: ['استقطاب', 'تعيين', 'دعم', 'رواتب'],
    },
  },
  'hive-talent': {
    en: {
      kicker: 'HIVE TALENT  ·  EVENTS & CAMPAIGNS', headline: ['Your brand,', 'represented brilliantly.'],
      intro: 'Models, promoters, ushers and brand ambassadors who represent your brand at events, activations and launches.',
      visualLabel: 'THE FACES OF YOUR BRAND', explore: 'Meet our capabilities', contact: 'Book event staff', back: 'All services',
      sectionLabel: 'ON THE GROUND', sectionTitle: ['The right presence.', 'For every occasion.'],
      sectionIntro: 'Specialist event and campaign staffing to put the right people in front of your audience.',
      items: [
        { title: 'Models & promoters', detail: 'People representing your brand and supporting on-ground promotion.' },
        { title: 'Brand ambassadors', detail: 'Brand-facing talent for campaigns and activations.' },
        { title: 'Ushers & event staff', detail: 'Professional event and guest-facing staff.' },
        { title: 'Event & campaign staffing', detail: 'Teams assembled for event and campaign workforce needs.' },
      ],
      whyLabel: 'WHERE BRANDS MEET PEOPLE', whyTitle: ['A strong presence.', 'A coordinated team.'],
      whyDescription: 'From the first conversation to a dedicated event team, SapiHive helps put people with clear roles behind your activation.',
      proof: [
        { title: 'Your brief', detail: 'Tell us about the brand, occasion and staffing needs.' },
        { title: 'The right talent', detail: 'Select suitable event and campaign team members.' },
        { title: 'A coordinated team', detail: 'Dedicated people working toward your event objectives.' },
      ],
      finalLabel: 'MAKE YOUR NEXT EVENT COUNT', finalTitle: ['A memorable brand moment', 'starts with people.'],
      finalBody: 'Tell us about your event, launch or activation.', finalButton: 'Plan your event team',
      extra: ['MODELS', 'PROMOTERS', 'USHERS', 'AMBASSADORS'],
    },
    ar: {
      kicker: 'هايف تالنت · الفعاليات والحملات', headline: ['علامتك التجارية،', 'يمثلها الفريق المناسب.'],
      intro: 'عارضون ومروّجون ومنظمو استقبال وسفراء علامات تجارية يمثلون شركتك في الفعاليات والتفعيلات والإطلاقات.',
      visualLabel: 'الوجوه التي تمثل علامتك', explore: 'اكتشف التخصصات', contact: 'اطلب فريق فعالية', back: 'كل الخدمات',
      sectionLabel: 'على أرض الواقع', sectionTitle: ['حضور مناسب.', 'لكل مناسبة.'],
      sectionIntro: 'كوادر متخصصة للفعاليات والحملات تضع الأشخاص المناسبين أمام جمهورك.',
      items: [
        { title: 'العارضون والمروّجون', detail: 'كوادر لتمثيل العلامة التجارية ودعم الأنشطة الترويجية.' },
        { title: 'سفراء العلامات التجارية', detail: 'وجوه تمثل علامتك في الحملات والتفعيلات.' },
        { title: 'منظمو الاستقبال وفرق الفعاليات', detail: 'فرق استقبال وتنظيم لخدمة ضيوف الفعاليات.' },
        { title: 'كوادر الفعاليات والحملات', detail: 'تكوين فرق تلائم احتياجات الفعاليات والحملات.' },
      ],
      whyLabel: 'حيث تلتقي العلامات بالجمهور', whyTitle: ['حضور مؤثر.', 'وفريق منسق.'],
      whyDescription: 'من تحديد احتياجك حتى تكوين فريق الفعالية، تساعد SapiHive في توفير أفراد بأدوار واضحة.',
      proof: [
        { title: 'متطلباتك', detail: 'شاركنا تفاصيل المناسبة واحتياجات الفريق.' },
        { title: 'الكوادر المناسبة', detail: 'اختيار أفراد مناسبين للفعاليات والحملات.' },
        { title: 'فريق منظم', detail: 'كوادر مخصصة تعمل وفق أهداف الفعالية.' },
      ],
      finalLabel: 'استعد لفعاليتك القادمة', finalTitle: ['تجربة العلامة تبدأ', 'بالأشخاص المناسبين.'],
      finalBody: 'شاركنا تفاصيل فعاليتك أو إطلاقك أو حملتك.', finalButton: 'خطط لفريق فعاليتك',
      extra: ['عارضون', 'مروجون', 'استقبال', 'سفراء'],
    },
  },
  'hive-creative': {
    en: {
      kicker: 'HIVE CREATIVE  ·  DESIGN & CONTENT', headline: ['Make your brand', 'feel unmistakable.'],
      intro: 'Marketing and design talent that gives your brand a consistent voice and look — across graphics, identity and content.',
      visualLabel: 'THE CREATIVE STUDIO', explore: 'Explore creative services', contact: 'Build a creative team', back: 'All services',
      sectionLabel: 'INSIDE THE STUDIO', sectionTitle: ['Different disciplines.', 'One brand language.'],
      sectionIntro: 'Three creative capabilities that work together to make the brand feel connected.',
      items: [
        { title: 'Graphic design', detail: 'Visual design work across the communication needs of your brand.' },
        { title: 'Branding & visual identity', detail: 'Creating and developing the visual identity that distinguishes your brand.' },
        { title: 'Content creation', detail: 'Content that supports your brand voice across communications.' },
      ],
      whyLabel: 'A CONSISTENT CREATIVE DIRECTION', whyTitle: ['One visual language.', 'Across every touchpoint.'],
      whyDescription: 'Dedicated creative talent working toward the same goals helps your brand stay visually and verbally consistent.',
      proof: [
        { title: 'Design', detail: 'Make the everyday visuals feel connected.' },
        { title: 'Identity', detail: 'Establish a coherent and recognizable look.' },
        { title: 'Content', detail: 'Keep the brand voice consistent.' },
      ],
      finalLabel: 'LET’S CREATE SOMETHING CONNECTED', finalTitle: ['Good ideas need', 'the right creative team.'],
      finalBody: 'Tell us what your brand needs next.', finalButton: 'Talk creative',
      extra: ['DESIGN', 'IDENTITY', 'CONTENT'],
    },
    ar: {
      kicker: 'هايف كرييتف · التصميم والمحتوى', headline: ['خلّي لعلامتك', 'بصمة واضحة.'],
      intro: 'كوادر متخصصة في التسويق والتصميم تمنح علامتك صوتًا وشكلًا متسقين من خلال التصميم والهوية البصرية والمحتوى.',
      visualLabel: 'الاستوديو الإبداعي', explore: 'اكتشف الخدمات الإبداعية', contact: 'اطلب فريقًا إبداعيًا', back: 'كل الخدمات',
      sectionLabel: 'داخل الاستوديو', sectionTitle: ['تخصصات مختلفة.', 'وهوية واحدة.'],
      sectionIntro: 'ثلاث خدمات إبداعية تتكامل لتوحيد الصورة التي تقدم بها علامتك التجارية.',
      items: [
        { title: 'التصميم الجرافيكي', detail: 'تصميمات بصرية لمختلف احتياجات التواصل الخاصة بعلامتك.' },
        { title: 'بناء العلامة والهوية البصرية', detail: 'تطوير هوية بصرية تميز علامتك وتعرّف الجمهور بها.' },
        { title: 'إنشاء المحتوى', detail: 'محتوى يدعم صوت علامتك ورسائلها.' },
      ],
      whyLabel: 'اتجاه إبداعي متسق', whyTitle: ['لغة بصرية واحدة.', 'في كل نقطة تواصل.'],
      whyDescription: 'يعمل الفريق الإبداعي المخصص وفق أهداف مشتركة ليدعم اتساق الشكل والصوت الخاصين بعلامتك.',
      proof: [
        { title: 'التصميم', detail: 'توحيد الطابع البصري للتصميمات اليومية.' },
        { title: 'الهوية', detail: 'بناء مظهر متماسك وواضح.' },
        { title: 'المحتوى', detail: 'الحفاظ على نبرة ورسائل العلامة.' },
      ],
      finalLabel: 'لنصنع تجربة علامة متكاملة', finalTitle: ['الأفكار الجيدة تحتاج', 'فريقًا إبداعيًا مناسبًا.'],
      finalBody: 'شاركنا ما تحتاجه علامتك في المرحلة القادمة.', finalButton: 'تواصل مع الفريق الإبداعي',
      extra: ['تصميم', 'هوية', 'محتوى'],
    },
  },
};
