// src/i18n/strings.js
export const LANGS = ['en', 'ar'];
export const DEFAULT_LANG = 'en';

export const strings = {
  /* ---------- Meta ---------- */
  'meta.title': {
    en: 'Smart Gym — The Future of Fitness',
    ar: 'سمارت جيم — مستقبل اللياقة',
  },

  /* ---------- Header nav (shared across all pages) ---------- */
  'nav.home':       { en: 'Home',       ar: 'الرئيسية' },
  'nav.facilities': { en: 'Facilities', ar: 'المرافق' },
  'nav.services':   { en: 'Services',   ar: 'الخدمات' },
  'nav.membership': { en: 'Membership', ar: 'العضوية' },
  'nav.insights':   { en: 'Insights',   ar: 'الأخبار' },
  'nav.contact':    { en: 'Contact',    ar: 'اتصل بنا' },
  'nav.joinNow':    { en: 'JOIN NOW',   ar: 'انضم الآن' },

  /* ---------- Preloader ---------- */
  'boot.label': {
    en: 'CALIBRATING TELEMETRY GRID',
    ar: 'معايرة شبكة القياس',
  },

  /* ---------- Services page — hero ---------- */
  'svc.kicker': {
    en: 'DIAGNOSTIC & CONDITIONING DIVISION // LIVE',
    ar: 'قسم التشخيص والتكييف // مباشر',
  },
  'svc.hero.line1': { en: 'PRECISION',           ar: 'الدقة' },
  'svc.hero.line2': { en: 'PERFORMANCE',         ar: 'الأداء' },
  'svc.hero.line3': { en: 'PROTOCOLS',           ar: 'البروتوكولات' },
  'svc.hero.line4': { en: '& SERVICES',          ar: 'والخدمات' },
  'svc.hero.lede': {
    en: 'Engineered for elite powerlifters, hybrid athletes, and uncompromising competitors. Deploy advanced metabolic telemetry, periodized force protocols, and cellular-grade recovery modules.',
    ar: 'مصمم لرفعي الأثقال النخبة، الرياضيين الهجين، والمنافسين الذين لا يساومون. انشر قياسات أيضية متقدمة، بروتوكولات قوة دورية، ووحدات تعافي بمعايير خلوية.',
  },
  'svc.scroll': { en: 'SCROLL', ar: 'اسحب' },

  /* ---------- Services page — filter chips ---------- */
  'svc.filter.all':         { en: 'ALL SERVICES',          ar: 'جميع الخدمات' },
  'svc.filter.diagnostics': { en: 'BIOMETRIC DIAGNOSTICS', ar: 'التشخيص الحيوي' },
  'svc.filter.coaching':    { en: 'PERSONAL COACHING',     ar: 'التدريب الشخصي' },
  'svc.filter.nutrition':   { en: 'NUTRITION ARCHITECTURE',ar: 'هندسة التغذية' },
  'svc.filter.combat':      { en: 'COMBAT CONDITIONING',   ar: 'تجهيز القتال' },
  'svc.filter.recovery':    { en: 'RECOVERY THERAPY',      ar: 'علاج التعافي' },
  'svc.search.placeholder': {
    en: 'Query biometric protocols…',
    ar: 'ابحث في البروتوكولات الحيوية…',
  },

  /* ---------- Services page — metrics ribbon ---------- */
  'svc.metric.accuracy':     { en: 'TELEMETRY ACCURACY',  ar: 'دقة القياس' },
  'svc.metric.sync':         { en: 'COACH SYNC WINDOW',   ar: 'نافذة مزامنة المدرب' },
  'svc.metric.cryo':         { en: 'CRYO POD FLOOR',      ar: 'أرضية كبسولة التبريد' },
  'svc.metric.feedback':     { en: 'BIOMETRIC FEEDBACK',  ar: 'التغذية الحيوية الراجعة' },

  /* ---------- Services page — belt marquee ---------- */
  'svc.belt.biometrics':     { en: 'BIOMETRICS',          ar: 'القياسات الحيوية' },
  'svc.belt.coaching':       { en: 'COACHING',            ar: 'التدريب' },
  'svc.belt.nutrition':      { en: 'NUTRITION',           ar: 'التغذية' },
  'svc.belt.combat':         { en: 'COMBAT',              ar: 'القتال' },
  'svc.belt.recovery':       { en: 'RECOVERY',            ar: 'التعافي' },
  'svc.belt.diagnostics':    { en: 'DIAGNOSTICS',         ar: 'التشخيص' },
  'svc.belt.open':           { en: 'OPEN 24/7',           ar: 'مفتوح 24/7' },

  /* ---------- Services page — catalog header ---------- */
  'svc.count.online': {
    en: '/ {{total}} PROTOCOLS ONLINE',
    ar: '/ {{total}} بروتوكول متاح',
  },

  /* ---------- Services page — service cards (5 services × 8 fields) ---------- */
  'svc.card1.lab':       { en: 'LAB PROTOCOL 01',           ar: 'بروتوكول مختبر 01' },
  'svc.card1.meta':      { en: 'TELEMETRY',                 ar: 'القياس' },
  'svc.card1.tag':       { en: 'BIOMETRIC DIAGNOSTICS',     ar: 'التشخيص الحيوي' },
  'svc.card1.title':     { en: 'VO2 Max & Metabolic Testing', ar: 'اختبار VO2 الأقصى والأيض' },
  'svc.card1.per':       { en: '/ SESSION',                 ar: '/ جلسة' },
  'svc.card1.duration':  { en: '60 MIN LAB PROFILE',        ar: '60 دقيقة ملف مختبري' },
  'svc.card1.cta':       { en: 'BOOK DIAGNOSTIC',           ar: 'احجز التشخيص' },
  'svc.card1.desc': {
    en: 'Determine exact respiratory exchange ratios, lactate turnaround zones, and maximum aerobic output with hospital-grade gas analysis. Includes targeted wattage calibrations and pulse-wave speed profiling.',
    ar: 'حدّد نسب تبادل الجهاز التنفسي الدقيقة، ومناطق تحول اللاكتات، والحد الأقصى للأداء الهوائي عبر تحليل غازات بمعايير المستشفيات. يشمل معايرات واط المستهدفة وتوصيف سرعة الموجة النبضية.',
  },
  'svc.card1.tag1':      { en: 'Biometrics',                ar: 'القياسات الحيوية' },
  'svc.card1.tag2':      { en: 'Anaerobic Threshold',       ar: 'العتبة اللاهوائية' },
  'svc.card1.tag3':      { en: 'Heart Rate Zones',          ar: 'مناطق معدل ضربات القلب' },

  'svc.card2.lab':       { en: 'STRENGTH UNIT 02',          ar: 'وحدة القوة 02' },
  'svc.card2.meta':      { en: 'FRAMEWORK',                 ar: 'الإطار' },
  'svc.card2.tag':       { en: 'PERSONAL COACHING',         ar: 'التدريب الشخصي' },
  'svc.card2.title':     { en: '1-on-1 Elite Strength Coaching', ar: 'تدريب القوة النخبوي فردي' },
  'svc.card2.per':       { en: '/ SESSION',                 ar: '/ جلسة' },
  'svc.card2.duration':  { en: 'CSCS CERTIFIED STAFF',      ar: 'طاقم معتمد CSCS' },
  'svc.card2.cta':       { en: 'MATCH WITH COACH',          ar: 'طابق مع مدرب' },
  'svc.card2.desc': {
    en: 'Direct barbell mastery engineered around your anthropometry. Velocity-based training (VBT) with transducer telemetry, neural recovery checks, and periodized microcycles designed for maximal neuromuscular adaptation.',
    ar: 'إتقان مباشر للبار مُصمم حول قياسات جسمك. تدريب قائم على السرعة (VBT) مع قياسات محوّل، وفحوصات التعافي العصبي، ودورات دقيقة مصممة لأقصى تكيّف عصبي عضلي.',
  },
  'svc.card2.tag1':      { en: 'Biomechanics',              ar: 'الميكانيكا الحيوية' },
  'svc.card2.tag2':      { en: 'Hypertrophy',               ar: 'التضخم العضلي' },
  'svc.card2.tag3':      { en: 'Periodization',             ar: 'الدورية' },

  'svc.card3.lab':       { en: 'NUTRITION SYNC 03',         ar: 'مزامنة التغذية 03' },
  'svc.card3.meta':      { en: 'ASSESSMENT',                ar: 'التقييم' },
  'svc.card3.tag':       { en: 'NUTRITION ARCHITECTURE',    ar: 'هندسة التغذية' },
  'svc.card3.title':     { en: 'Precision Nutrition & Macro Tracking', ar: 'التغذية الدقيقة وتتبع الماكروز' },
  'svc.card3.per':       { en: '/ BI-WEEKLY',               ar: '/ كل أسبوعين' },
  'svc.card3.duration':  { en: 'APP INTEGRATED',            ar: 'مدمج بالتطبيق' },
  'svc.card3.cta':       { en: 'START NUTRITION PLAN',      ar: 'ابدأ خطة التغذية' },
  'svc.card3.desc': {
    en: 'Hyper-calibrated nutrition planning synchronized with your training loads and DEXA lean mass benchmarks. Dynamic carb-cycling protocols, glycogen optimization, and continuous biofeedback audits.',
    ar: 'تخطيط غذائي معاير بدقة ومتزامن مع أحمالك التدريبية ومراجع الكتلة النحيفة DEXA. بروتوكولات ديناميكية لتدوير الكارب، وتحسين الجليكوجين، ومراجعات حيوية مستمرة.',
  },
  'svc.card3.tag1':      { en: 'Macro Architecture',        ar: 'هندسة الماكروز' },
  'svc.card3.tag2':      { en: 'DEXA Sync',                 ar: 'مزامنة DEXA' },
  'svc.card3.tag3':      { en: 'Weekly Plan',               ar: 'خطة أسبوعية' },

  'svc.card4.lab':       { en: 'COMBAT DOJO 04',            ar: 'دوجو القتال 04' },
  'svc.card4.meta':      { en: 'IMPACT RATE',               ar: 'معدل التأثير' },
  'svc.card4.tag':       { en: 'COMBAT CONDITIONING',       ar: 'تجهيز القتال' },
  'svc.card4.title':     { en: 'High-Performance Combat & Striking', ar: 'القتال والضرب عالي الأداء' },
  'svc.card4.per':       { en: '/ SESSION',                 ar: '/ جلسة' },
  'svc.card4.duration':  { en: 'ELEVATED OCTAGON ACCESS',   ar: 'دخول الأوكتاغون المتقدم' },
  'svc.card4.cta':       { en: 'RESERVE RING SESSION',      ar: 'احجز جلسة الحلبة' },
  'svc.card4.desc': {
    en: 'Authentic tactical standup striking, Muay Thai clinch control, and explosive anaerobic burst conditioning. Taught by professional titleholders with custom heart-rate threshold management inside full ring settings.',
    ar: 'ضرب وقوف تكتيكي أصيل، والتحكم بالكلينش في المواي تاي، وتكييف انفجاري لاهوائي. يُدرّب بواسطة أبطال محترفين مع إدارة مخصصة لعتبة معدل ضربات القلب داخل حلبة كاملة.',
  },
  'svc.card4.tag1':      { en: 'Muay Thai',                 ar: 'المواي تاي' },
  'svc.card4.tag2':      { en: 'Boxing',                    ar: 'الملاكمة' },
  'svc.card4.tag3':      { en: 'Pro Sparring',              ar: 'سبرنغ احترافي' },

  'svc.card5.lab':       { en: 'THERMAL CELL 05',           ar: 'خلية حرارية 05' },
  'svc.card5.meta':      { en: 'REGEN SPEED',               ar: 'سرعة التجديد' },
  'svc.card5.tag':       { en: 'RECOVERY THERAPY',          ar: 'علاج التعافي' },
  'svc.card5.title':     { en: 'Contrast Hydrotherapy & Cryo', ar: 'العلاج المائي بالتباين والتبريد' },
  'svc.card5.per':       { en: '/ SESSION',                 ar: '/ جلسة' },
  'svc.card5.duration':  { en: 'INCLUDES HYDRATION LOUNGE', ar: 'يشمل صالة الترطيب' },
  'svc.card5.cta':       { en: 'BOOK RECOVERY',             ar: 'احجز التعافي' },
  'svc.card5.desc': {
    en: 'Accelerate central nervous system recovery through rapid vasodilation and vasoconstriction. Sub-zero whole-body liquid nitrogen chambers combined with full-spectrum infrared saunas and localized pneumatic compression sleeves.',
    ar: 'سرّع تعافي الجهاز العصبي المركزي عبر توسيع وتضييق الأوعية السريع. غرف نيتروجين سائل تحت الصفر للجسم بأكمله مع ساونا أشعة تحت الحمراء كاملة الطيف وأكمام ضغط هوائية موضعية.',
  },
  'svc.card5.tag1':      { en: 'Cryotherapy',               ar: 'العلاج بالتبريد' },
  'svc.card5.tag2':      { en: 'Infrared Sauna',            ar: 'ساونا الأشعة' },
  'svc.card5.tag3':      { en: 'Lymphatic Drainage',        ar: 'تصريف الليمف' },

  /* ---------- Services page — empty state ---------- */
  'svc.empty.title':     { en: 'NO PROTOCOLS FOUND',        ar: 'لا توجد بروتوكولات' },
  'svc.empty.desc': {
    en: 'No diagnostics or training services match your search criteria. Try filtering by Biometrics or Coaching.',
    ar: 'لا توجد خدمات تشخيص أو تدريب تطابق معايير البحث. جرّب التصفية حسب القياسات الحيوية أو التدريب.',
  },
  'svc.empty.reset':     { en: 'RESET ALL FILTERS',         ar: 'إعادة تعيين الفلاتر' },

  /* ---------- Services page — right rail ---------- */
  'svc.rail.certified':  { en: 'FACILITY CERTIFIED',        ar: 'منشأة معتمدة' },
  'svc.rail.industrial': { en: 'SMART INDUSTRIAL',          ar: 'سمارت إندستريال' },
  'svc.rail.desc': {
    en: 'All services operate under strictly supervised medical and sports science safety standards. Biometrics sync instantly to your Smart Gym Mobile ID key.',
    ar: 'جميع الخدمات تعمل وفق معايير سلامة طبية ورياضية صارمة. تتزامن القياسات الحيوية فوراً مع مفتاح الهوية عبر تطبيق سمارت جيم.',
  },
  'svc.rail.queueLabel': { en: 'ACTIVE INTAKE QUEUE',       ar: 'طابور الاستقبال النشط' },
  'svc.rail.queueVal':   { en: '4 SLOTS OPEN TODAY',        ar: '4 فتحات متاحة اليوم' },
  'svc.rail.capacity':   { en: 'STATION CAPACITY: 85%',     ar: 'سعة المحطة: 85%' },
  'svc.rail.campus':     { en: 'DISTRICT 01 CAMPUS',        ar: 'حرم المنطقة 01' },

  /* ---------- Services page — live telemetry rail ---------- */
  'svc.tel.title':       { en: 'LIVE SYSTEM TELEMETRY',     ar: 'قياس النظام المباشر' },
  'svc.tel.output':      { en: 'METABOLIC OUTPUT',          ar: 'الناتج الأيضي' },
  'svc.tel.peak':        { en: '184 BPM PEAK',              ar: '184 نبضة/د ذروة' },
  'svc.tel.live':        { en: 'LIVE',                      ar: 'مباشر' },
  'svc.tel.lactate':     { en: 'Lactate Clearance Baseline', ar: 'خط أساس تصفية اللاكتات' },
  'svc.tel.maxO2':       { en: 'Max Oxygen Uptake',         ar: 'أقصى استهلاك للأوكسجين' },
  'svc.tel.chamber':     { en: 'Hydrotherapy Chamber',      ar: 'غرفة العلاج المائي' },
  'svc.tel.ready':       { en: 'READY NOW',                 ar: 'جاهز الآن' },

  /* ---------- Services page — concierge form ---------- */
  'svc.conc.title':      { en: 'NEED CUSTOM ARCHITECTURE?', ar: 'تحتاج هندسة مخصصة؟' },
  'svc.conc.desc': {
    en: 'Our Head of Human Performance will build an integrated multi-service protocol tailored to your competition schedule.',
    ar: 'سيقوم رئيس أداء الإنسان لدينا ببناء بروتوكول متعدد الخدمات مخصص لجدول منافساتك.',
  },
  'svc.conc.goal':       { en: 'SELECT PRIMARY GOAL',       ar: 'اختر الهدف الأساسي' },
  'svc.conc.goal1':      { en: 'Maximal Force & Hypertrophy', ar: 'أقصى قوة وتضخم' },
  'svc.conc.goal2':      { en: 'Cardiovascular Engine & VO2', ar: 'محرك القلب والأوعية و VO2' },
  'svc.conc.goal3':      { en: 'Combat Striking Velocity',  ar: 'سرعة الضرب القتالي' },
  'svc.conc.goal4':      { en: 'Injury Rehabilitation & Cryo', ar: 'تأهيل الإصابات والتبريد' },
  'svc.conc.email':      { en: 'ATHLETE IDENTIFIER / EMAIL',ar: 'معرف الرياضي / البريد' },
  'svc.conc.emailPh':    { en: 'athlete@domain.com',        ar: 'athlete@domain.com' },
  'svc.conc.submit':     { en: 'REQUEST PERFORMANCE AUDIT', ar: 'اطلب تقييم الأداء' },
  'svc.conc.sent':       { en: 'REQUEST TRANSMITTED',       ar: 'تم إرسال الطلب' },
  'svc.conc.sentLog': {
    en: 'REQUEST LOGGED — COACH SYNC WINDOW < 24H',
    ar: 'تم تسجيل الطلب — نافذة مزامنة المدرب أقل من 24 ساعة',
  },

  /* ---------- Services page — method section ---------- */
  'svc.method.kicker':   { en: 'THE SMARTGYM METHOD',       ar: 'منهجية سمارت جيم' },
  'svc.method.readout':  { en: 'LOOP COMPLETION',           ar: 'إنجاز الحلقة' },
  'svc.method.step1.t':  { en: 'TEST',                      ar: 'الاختبار' },
  'svc.method.step1.s':  { en: 'BIOMETRIC BASELINE',        ar: 'خط الأساس الحيوي' },
  'svc.method.step1.d': {
    en: 'VO2, DEXA, lactate and force-velocity profiling. We map your engine before we touch a single plate.',
    ar: 'تحليل VO2 و DEXA واللاكتات والقوة-السرعة. نرسم خريطة محركك قبل أن نلمس أي وزن.',
  },
  'svc.method.step1.stat': { en: '12 METRICS CAPTURED',     ar: '12 قياس تم التقاطه' },

  'svc.method.step2.t':  { en: 'TRAIN',                     ar: 'التدريب' },
  'svc.method.step2.s':  { en: 'PERIODIZED EXECUTION',      ar: 'تنفيذ دوري' },
  'svc.method.step2.d': {
    en: 'Velocity-based coaching inside microcycles engineered from your baseline. Every rep measured, every session logged.',
    ar: 'تدريب قائم على السرعة داخل دورات دقيقة مصممة من خط أساسك. كل تكرار يُقاس، وكل جلسة تُسجّل.',
  },
  'svc.method.step2.stat': { en: 'VBT + LIVE COACHING',     ar: 'VBT + تدريب مباشر' },

  'svc.method.step3.t':  { en: 'ANALYZE',                   ar: 'التحليل' },
  'svc.method.step3.s':  { en: 'TELEMETRY AUDIT',           ar: 'تدقيق القياسات' },
  'svc.method.step3.d': {
    en: 'Your biometric feed is audited weekly. Load, recovery and nutrition shift against the data — never guesswork.',
    ar: 'يُراجع قياسك الحيوي أسبوعياً. الحمل والتعافي والتغذية يتحركون وفق البيانات — لا تخمين.',
  },
  'svc.method.step3.stat': { en: '< 24 HR COACH SYNC',      ar: '< 24 س مزامنة المدرب' },

  'svc.method.step4.t':  { en: 'RECOVER',                   ar: 'التعافي' },
  'svc.method.step4.s':  { en: 'REGEN PROTOCOL',            ar: 'بروتوكول التجديد' },
  'svc.method.step4.d': {
    en: 'Cryo, contrast hydrotherapy and compression stack to compress CNS recovery so the next block hits harder.',
    ar: 'التبريد والعلاج المائي بالتباين والضغط يتكدسون لتسريع تعافي الجهاز العصبي ليضرب البلوك التالي أقوى.',
  },
  'svc.method.step4.stat': { en: '−110°C CHAMBER FLOOR',    ar: '−110°م أرضية الغرفة' },

  'svc.method.step5.t':  { en: 'REPEAT',                    ar: 'التكرار' },
  'svc.method.step5.s':  { en: 'SUPERCOMPENSATION',         ar: 'التعويض الفائق' },
  'svc.method.step5.d': {
    en: 'Retest, compare, escalate. The loop compounds — every cycle raises your ceiling higher than the last.',
    ar: 'أعد الاختبار، قارن، صعّد. الحلقة تتراكم — كل دورة ترفع سقفك أعلى من السابقة.',
  },
  'svc.method.step5.stat': { en: 'CEILING ↑ EVERY CYCLE',   ar: 'السقف ↑ كل دورة' },

  /* ---------- Services page — CTA ---------- */
  'svc.cta.eyebrow': {
    en: 'READY TO DEPLOY YOUR PROTOCOL?',
    ar: 'مستعد لنشر بروتوكولك؟',
  },
  'svc.cta.h2a':         { en: 'START WITH A',              ar: 'ابدأ بخط' },
  'svc.cta.h2b':         { en: 'BIOMETRIC BASELINE.',       ar: 'أساس حيوي.' },
  'svc.cta.desc': {
    en: "Free 30-minute consultation and metabolic snapshot. If our protocols aren't right for you, you walk away owing nothing.",
    ar: 'استشارة مجانية 30 دقيقة ولقطة أيضية. إذا لم تكن بروتوكولاتنا مناسبة لك، تغادر دون أي التزام.',
  },
  'svc.cta.btn':         { en: 'BOOK FREE CONSULT',         ar: 'احجز الاستشارة المجانية' },

  /* ---------- Footer (shared) ---------- */
  'foot.desc': {
    en: 'Strength & conditioning club with biometric telemetry and elite training infrastructure. Built for people who train.',
    ar: 'نادٍ للقوة والتكييف مع قياسات حيوية وبنية تحتية نخبوية. مصنوع لمن يتدربون.',
  },
  'foot.live':           { en: 'TELEMETRY GRID LIVE',       ar: 'شبكة القياس نشطة' },
  'foot.architecture':   { en: 'ARCHITECTURE',              ar: 'البنية' },
  'foot.platform':       { en: 'PLATFORM',                  ar: 'المنصة' },
  'foot.operations':     { en: 'OPERATIONS',                ar: 'العمليات' },
  'foot.iron':           { en: 'Heavy Iron Arena',          ar: 'ساحة الحديد الثقيل' },
  'foot.sprint':         { en: 'Sprint Velocity Track',     ar: 'مسار سرعة السبرنت' },
  'foot.cryo':           { en: 'Cryo & Recovery Pods',      ar: 'كبسولات التبريد والتعافي' },
  'foot.metabolic':      { en: 'Metabolic Testing Lab',     ar: 'مختبر الاختبار الأيضي' },
  'foot.coaching':       { en: 'Coaching Protocol',         ar: 'بروتوكول التدريب' },
  'foot.bioapp':         { en: 'Biometric App Sync',        ar: 'مزامنة التطبيق الحيوي' },
  'foot.corporate':      { en: 'Corporate High Performance',ar: 'أداء الشركات العالي' },
  'foot.portal':         { en: 'Member Portal',             ar: 'بوابة الأعضاء' },
  'foot.hours':          { en: '04:00 – 24:00 Daily Operations', ar: '04:00 – 24:00 عمليات يومية' },
  'foot.access':         { en: 'Access via biometric passcode key.', ar: 'الدخول بمفتاح حيوي.' },
  'foot.hq':             { en: 'HQ TERMINAL',               ar: 'المحطة الرئيسية' },
  'foot.address':        { en: 'District 01, Performance Plaza', ar: 'المنطقة 01، ساحة الأداء' },
  'foot.rights':         { en: '© 2025 SMART GYM INDUSTRIAL ATHLETICS. ALL RIGHTS RESERVED.', ar: '© 2025 سمارت جيم إندستريال أثلتكس. جميع الحقوق محفوظة.' },
  'foot.privacy':        { en: 'Privacy Architecture',      ar: 'بنية الخصوصية' },
  'foot.terms':          { en: 'Terms of Conditioning',     ar: 'شروط التدريب' },
  'foot.security':       { en: 'Security Protocols',        ar: 'بروتوكولات الأمان' },
    /* ---------- Services page — section dots (right rail) ---------- */
  'svc.dot.hero':     { en: 'APEX',      ar: 'القمة' },
  'svc.dot.filters':  { en: 'FILTER',    ar: 'التصفية' },
  'svc.dot.catalog':  { en: 'PROTOCOLS', ar: 'البروتوكولات' },
  'svc.dot.method':   { en: 'METHOD',    ar: 'المنهجية' },
  'svc.dot.cta':      { en: 'DEPLOY',    ar: 'التنفيذ' },

  /* ---------- Mobile nav footer ---------- */
  'nav.foot': {
    en: 'OPEN 24/7 // DISTRICT 01',
    ar: 'مفتوح 24/7 // المنطقة 01',
  },

  /* ---------- Ghost word behind catalog ---------- */
  'svc.ghost':        { en: 'PROTOCOLS', ar: 'البروتوكولات' },
    /* ============================================================
     HOME PAGE
  ============================================================ */

  /* ---------- Preloader ---------- */
  'home.boot': {
    en: 'CALIBRATING TELEMETRY GRID',
    ar: 'معايرة شبكة القياس',
  },

  /* ---------- Hero ---------- */
  'home.kicker': {
    en: 'BIOMETRIC TELEMETRY // LIVE OPERATIONS GRID',
    ar: 'القياس الحيوي // شبكة العمليات المباشرة',
  },
  'home.hero.l1': { en: 'THE FUTURE',    ar: 'مستقبل' },
  'home.hero.l2': { en: 'OF',            ar: 'اللياقة' },
  'home.hero.l3': { en: 'FITNESS',       ar: 'الرقمية' },
  'home.hero.l4': { en: 'IS',            ar: 'هو' },
  'home.hero.l5': { en: 'SMART.',        ar: 'الذكاء.' },
  'home.hero.lede': {
    en: 'High-precision biometrics. AI-guided training. Data-driven conditioning in a purpose-built arena. No gimmicks. No guesswork. Just the work — measured.',
    ar: 'قياسات حيوية عالية الدقة. تدريب موجّه بالذكاء الاصطناعي. تكييف قائم على البيانات في ساحة مبنية لهذا الغرض. بلا حيل. بلا تخمين. العمل فقط — مقيسًا.',
  },
  'home.hero.cta1': { en: 'JOIN THE MOVEMENT', ar: 'انضم إلى الحركة' },
  'home.hero.cta2': { en: 'BOOK A TOUR',       ar: 'احجز جولة' },
  'home.hero.rail': {
    en: 'EST. 2016 — PERFORMANCE CLUB',
    ar: 'تأسس 2016 — نادي الأداء',
  },
  'home.hero.cue':    { en: 'SCROLL', ar: 'اسحب' },

  /* Hero cluster cards */
  'home.cl.hr':       { en: 'HEART RATE',    ar: 'معدل النبض' },
  'home.cl.hrUnit':   { en: 'BPM',           ar: 'نبضة/د' },
  'home.cl.live':     { en: 'LIVE',          ar: 'مباشر' },
  'home.cl.pwr':      { en: 'POWER OUTPUT',  ar: 'القدرة الناتجة' },
  'home.cl.pwrZone':  { en: 'ZONE 5',        ar: 'المنطقة 5' },
  'home.cl.pwrUnit':  { en: 'WATTS',         ar: 'واط' },
  'home.cl.cap':      { en: 'CAPACITY LOAD', ar: 'حمل السعة' },
  'home.cl.capSub':   { en: 'PRIME HOUR',    ar: 'ساعة الذروة' },

  /* Hero stats */
  'home.stat1.v': { en: '24/7',   ar: '24/7' },
  'home.stat1.l': { en: 'ACCESS', ar: 'دخول' },
  'home.stat2.v': { en: '418',    ar: '418' },
  'home.stat2.l': { en: 'IN-CLUB NOW', ar: 'في النادي الآن' },
  'home.stat3.v': { en: '840W',   ar: '840و' },
  'home.stat3.l': { en: 'MEAN PEAK', ar: 'متوسط الذروة' },
  'home.stat4.v': { en: '94.2%',  ar: '94.2%' },
  'home.stat4.l': { en: 'RECOVERY OPTIMAL', ar: 'تعافي مثالي' },

  /* Belt */
  'home.belt.strength':  { en: 'STRENGTH',       ar: 'القوة' },
  'home.belt.cond':      { en: 'CONDITIONING',   ar: 'التكييف' },
  'home.belt.oly':       { en: 'OLYMPIC LIFTING',ar: 'رفع أولمبي' },
  'home.belt.combat':    { en: 'COMBAT',         ar: 'القتال' },
  'home.belt.mobility':  { en: 'MOBILITY',       ar: 'الحركة' },
  'home.belt.recovery':  { en: 'RECOVERY',       ar: 'التعافي' },
  'home.belt.nutrition': { en: 'NUTRITION',      ar: 'التغذية' },
  'home.belt.open':      { en: 'OPEN 24/7',      ar: 'مفتوح 24/7' },

  /* Capabilities */
  'home.caps.1.k': { en: '24/7',  ar: '24/7' },
  'home.caps.1.t': { en: 'SMART ACCESS', ar: 'دخول ذكي' },
  'home.caps.1.d': {
    en: 'Biometric entry, zero staff queue. Your clock, your floor.',
    ar: 'دخول حيوي، بلا طوابير. وقتك، صالتك.',
  },
  'home.caps.2.k': { en: '100%',  ar: '100%' },
  'home.caps.2.t': { en: 'BIOMETRIC TELEMETRY', ar: 'القياس الحيوي' },
  'home.caps.2.d': {
    en: 'Every rack, lane and pod streams live to your profile.',
    ar: 'كل رف ومسار وكبسولة يُبَث مباشرة إلى ملفك.',
  },
  'home.caps.3.k': { en: 'CSCS',  ar: 'CSCS' },
  'home.caps.3.t': { en: 'ELITE COACHING', ar: 'تدريب نخبوي' },
  'home.caps.3.d': {
    en: 'Certified coaches walk the floor — not a call center.',
    ar: 'مدربون معتمدون على الأرض — لا مركز اتصال.',
  },
  'home.caps.4.k': { en: '1:01',  ar: '1:01' },
  'home.caps.4.t': { en: 'MACHINE GUIDANCE', ar: 'إرشاد الآلات' },
  'home.caps.4.d': {
    en: 'Rep-by-rep form feedback from sensor-equipped iron.',
    ar: 'ملاحظات على الشكل تكرارًا بتكرار من حديد مزوّد بالحساسات.',
  },

  /* Live floor section */
  'home.floor.stag': { en: '01 — LIVE FROM THE FLOOR', ar: '01 — مباشر من الأرض' },
  'home.floor.title': { en: 'THE CLUB, RIGHT NOW', ar: 'النادي، الآن' },
  'home.floor.sub': {
    en: 'Pulled straight from gate check-ins and platform sensors. No vanity metrics — this is what training here looks like on a Tuesday.',
    ar: 'مسحوب مباشرة من تسجيلات الدخول ومستشعرات المنصات. لا قياسات مظهرية — هكذا يبدو التدريب هنا يوم الثلاثاء.',
  },
  'home.floor.word': { en: 'CAPACITY', ar: 'السعة' },

  'home.floor.tile1.lab':   { en: 'ATHLETES ON FLOOR', ar: 'رياضيون على الأرض' },
  'home.floor.tile1.unit':  { en: 'NOW',  ar: 'الآن' },
  'home.floor.tile1.badge': { en: 'LIVE', ar: 'مباشر' },
  'home.floor.tile1.note': {
    en: 'Peak window 5–8 PM · all 12 platforms running',
    ar: 'نافذة الذروة 5–8 م · جميع المنصات الـ12 تعمل',
  },
  'home.floor.tile2.lab':   { en: 'VOLUME MOVED TODAY', ar: 'الحجم المنقول اليوم' },
  'home.floor.tile2.unit':  { en: 'KG',   ar: 'كغ' },
  'home.floor.tile2.badge': { en: 'TODAY', ar: 'اليوم' },
  'home.floor.tile2.note': {
    en: 'Squat · bench · dead · carries · sleds',
    ar: 'سكوات · بنش · ديدليفت · حَمْل · زحافات',
  },
  'home.floor.tile3.lab':   { en: 'SESSIONS COACHED', ar: 'جلسات مُدرّبة' },
  'home.floor.tile3.unit':  { en: 'THIS WEEK', ar: 'هذا الأسبوع' },
  'home.floor.tile3.badge': { en: 'BOOKED', ar: 'محجوز' },
  'home.floor.tile3.note': {
    en: 'Form-first programming · all sectors',
    ar: 'برمجة تبدأ بالشكل · جميع القطاعات',
  },
  'home.floor.tile4.lab':   { en: 'RACK WAIT TIME', ar: 'وقت انتظار الرف' },
  'home.floor.tile4.unit':  { en: 'MIN',  ar: 'دقيقة' },
  'home.floor.tile4.badge': { en: 'ALWAYS', ar: 'دائمًا' },
  'home.floor.tile4.note': {
    en: '34 stations · zero-queue guarantee',
    ar: '34 محطة · ضمان عدم الطوابير',
  },

  /* Floor ticker */
  'home.feed.p1':    { en: 'PLATFORM 01',     ar: 'منصة 01' },
  'home.feed.use':   { en: 'IN USE',          ar: 'مستخدمة' },
  'home.feed.r4':    { en: 'RACK 04',         ar: 'رف 04' },
  'home.feed.open':  { en: 'OPEN',            ar: 'متاح' },
  'home.feed.oly':   { en: 'OLY PLATFORM 02', ar: 'منصة أولمبية 02' },
  'home.feed.plunge':{ en: 'COLD PLUNGE',     ar: 'حوض بارد' },
  'home.feed.turf':  { en: 'TURF LANE 03',    ar: 'مسار العشب 03' },
  'home.feed.sauna': { en: 'SAUNA',           ar: 'ساونا' },
  'home.feed.pit':   { en: 'COMBAT PIT',      ar: 'حفرة القتال' },
  'home.feed.spar':  { en: 'SPARRING 19:15',  ar: 'سبرنغ 19:15' },
  'home.feed.court': { en: 'COURT',           ar: 'الملعب' },
  'home.feed.league':{ en: 'LEAGUE 20:00',    ar: 'دوري 20:00' },

  /* Why section */
  'home.why.stag': { en: '02 — WHY PEOPLE STAY', ar: '02 — لماذا يبقى الأعضاء' },
  'home.why.t1':   { en: 'BUILT LIKE A',     ar: 'مبنيّ كـ' },
  'home.why.t2':   { en: 'SPORTS LAB.',      ar: 'مختبر رياضي.' },
  'home.why.t3':   { en: 'PRICED LIKE A GYM.', ar: 'بأسعار النادي.' },
  'home.why.lede': {
    en: 'Four reasons members renew without thinking about it. Scroll — each one lights up as it matters.',
    ar: 'أربعة أسباب تجعل الأعضاء يجددون دون تفكير. اسحب — كل سبب يُضيء عند لحظته.',
  },
  'home.why.c1.v': { en: '94%',    ar: '94%' },
  'home.why.c1.l': { en: 'renew after year one', ar: 'يجددون بعد السنة الأولى' },
  'home.why.c2.v': { en: '4.9/5',  ar: '4.9/5' },
  'home.why.c2.l': { en: 'member score', ar: 'تقييم الأعضاء' },
  'home.why.c3.v': { en: '1,900+', ar: '1,900+' },
  'home.why.c3.l': { en: 'active members', ar: 'عضو نشط' },
  'home.why.note': {
    en: 'ALL FOUR INCLUDED WITH EVERY MEMBERSHIP — NO UPSELLS, NO ASTERISKS.',
    ar: 'الأربعة جميعًا مضمنة مع كل عضوية — بلا إضافات، بلا شروط خفية.',
  },

  'home.why.r1.t': { en: '24/7 BIOMETRIC ACCESS', ar: 'دخول حيوي 24/7' },
  'home.why.r1.tag': { en: 'THE KEYS', ar: 'المفاتيح' },
  'home.why.r1.m': { en: 'Included — Basic tier and up', ar: 'مضمّن — من الفئة الأساسية فما فوق' },
  'home.why.r1.d': {
    en: 'Your phone is your key. Train at 3AM or 3PM — the floor never closes and neither does your window.',
    ar: 'هاتفك هو مفتاحك. تدرّب في الـ3 صباحًا أو بعد الظهر — الصالة لا تُغلق ونافذتك أيضًا لا.',
  },

  'home.why.r2.t': { en: 'VELOCITY-TRACKED IRON', ar: 'حديد مُتتبَّع بالسرعة' },
  'home.why.r2.tag': { en: 'THE DATA', ar: 'البيانات' },
  'home.why.r2.m': { en: 'Every platform · every rep', ar: 'كل منصة · كل تكرار' },
  'home.why.r2.d': {
    en: 'Calibrated plates and bar-speed sensors on every platform. Every rep is measured, logged, progressed.',
    ar: 'أوزان معايرة وحساسات لسرعة البار على كل منصة. كل تكرار يُقاس، يُسجّل، يُطوَّر.',
  },

  'home.why.r3.t': { en: 'COACHES ON THE FLOOR', ar: 'مدربون على الأرض' },
  'home.why.r3.tag': { en: 'THE PEOPLE', ar: 'الفريق' },
  'home.why.r3.m': { en: '386 sessions coached this week', ar: '386 جلسة هذا الأسبوع' },
  'home.why.r3.d': {
    en: 'CSCS-certified coaches walk the floor — real-time form fixes, not PDFs. Included, never upsold.',
    ar: 'مدربون معتمدون يسيرون على الأرض — تصحيح فوري للشكل، لا ملفات PDF. مضمّن، لا يُباع إضافيًا.',
  },

  'home.why.r4.t': { en: 'RECOVERY, BUILT-IN', ar: 'تعافٍ مدمج' },
  'home.why.r4.tag': { en: 'THE RESET', ar: 'إعادة الضبط' },
  'home.why.r4.m': { en: 'Plunge · sauna · compression', ar: 'حوض · ساونا · ضغط' },
  'home.why.r4.d': {
    en: 'Cold plunge, sauna and compression bays in the base plan — adaptation happens between sessions.',
    ar: 'حوض بارد وساونا وأجنحة ضغط في الخطة الأساسية — التكيّف يحدث بين الجلسات.',
  },

  /* Facilities pinned section */
  'home.fc.stag': { en: '03 — THE FLOOR PLAN', ar: '03 — مخطط الأرض' },
  'home.fc.title': { en: 'ELITE ENVIRONMENTS', ar: 'بيئات نخبوية' },
  'home.fc.kicker': { en: 'FOUR SECTORS. ONE SYSTEM.', ar: 'أربعة قطاعات. نظام واحد.' },
  'home.fc.lede': {
    en: 'Every square meter is tuned on purpose — flooring, acoustics, air handling and sensor coverage built for a specific adaptation.',
    ar: 'كل متر مربع مُهندس لغرض — الأرضيات والصوتيات ومعالجة الهواء وتغطية الحساسات مبنية لتكيّف محدد.',
  },
  'home.fc.hint': { en: 'KEEP SCROLLING', ar: 'واصل السحب' },





  /* Telemetry */
  'home.tel.eyebrow': { en: 'PROPRIETARY BIOMETRICS', ar: 'قياسات حيوية خاصة' },
  'home.tel.title':   { en: 'REAL-TIME FORCE & VELOCITY TRACKING', ar: 'تتبع القوة والسرعة في الوقت الحقيقي' },
  'home.tel.desc': {
    en: 'Every barbell, cable stack and treadmill transmits millisecond-level telemetry to your profile. Track bar-speed decline, power drops and recruitment asymmetries — rep by rep.',
    ar: 'كل بار وبكرة ومشاية ترسل قياسات بمستوى الميلي ثانية إلى ملفك. تتبّع هبوط سرعة البار وانخفاض القدرة وعدم تماثل التجنيد — تكرارًا بتكرار.',
  },
  'home.tel.m1.lab': { en: 'CONCENTRIC BAR ACCELERATION', ar: 'تسارع البار المركزي' },
  'home.tel.m1.val': { en: '1.24 m/s', ar: '1.24 م/ث' },
  'home.tel.m1.s':   { en: '✓ TARGET MET', ar: '✓ تم تحقيق الهدف' },
  'home.tel.m2.lab': { en: 'NEUROMUSCULAR EFFICIENCY', ar: 'الكفاءة العصبية العضلية' },
  'home.tel.m2.val': { en: '96.8%', ar: '96.8%' },
  'home.tel.m2.s':   { en: '✓ OPTIMAL', ar: '✓ مثالي' },
  'home.tel.live':   { en: 'LIVE FORCE CURVE // SQUAT RACK 04', ar: 'منحنى القوة المباشر // رف السكوات 04' },
  'home.tel.load':   { en: '185 KG BAR LOAD', ar: 'حمل البار 185 كغ' },
  'home.tel.peak':   { en: 'PEAK FORCE', ar: 'قوة الذروة' },
  'home.tel.peakV':  { en: '2,840 N', ar: '2,840 نيوتن' },
  'home.tel.tpeak':  { en: 'TIME TO PEAK', ar: 'زمن الوصول للذروة' },
  'home.tel.tpeakV': { en: '0.38 SEC', ar: '0.38 ثانية' },
  'home.tel.rep':    { en: 'REP #', ar: 'التكرار #' },
  'home.tel.repV':   { en: '5 OF 5', ar: '5 من 5' },

  /* Services section (home) */
  'home.svc.stag': { en: '04 — PROTOCOLS & COACHING', ar: '04 — البروتوكولات والتدريب' },
  'home.svc.title': { en: 'TRAIN WITH INTENT.', ar: 'تدرّب بوعي.' },
  'home.svc.sub': {
    en: 'Diagnostics, coaching and recovery protocols you can bolt onto any membership. Book by the session or by the month.',
    ar: 'تشخيص وتدريب وبروتوكولات تعافٍ يمكنك إضافتها لأي عضوية. احجز بالجلسة أو بالشهر.',
  },
  'home.svc.all':   { en: 'ALL PROTOCOLS', ar: 'جميع البروتوكولات' },
  'home.svc.bio':   { en: 'biometrics', ar: 'قياسات حيوية' },
  'home.svc.coach': { en: 'coaching',   ar: 'تدريب' },
  'home.svc.nut':   { en: 'nutrition',  ar: 'تغذية' },
  'home.svc.cmb':   { en: 'combat',     ar: 'قتال' },
  'home.svc.rec':   { en: 'recovery',   ar: 'تعافٍ' },
  'home.svc.searchPh': { en: 'Search protocols…', ar: 'ابحث في البروتوكولات…' },
  'home.svc.book':     { en: 'BOOK', ar: 'احجز' },
  'home.svc.empty1':   { en: 'NO PROTOCOLS MATCH', ar: 'لا توجد بروتوكولات مطابقة' },
  'home.svc.reset':    { en: 'RESET FILTERS', ar: 'إعادة الفلاتر' },

  /* Pricing */
  'home.pr.stag': { en: '05 — MEMBERSHIP', ar: '05 — العضوية' },
  'home.pr.title': { en: 'SELECT YOUR FREQUENCY', ar: 'اختر وتيرتك' },
  'home.pr.sub': {
    en: 'Every tier includes round-the-clock biometric entry and telemetry sync. No joining fee. Cancel anytime.',
    ar: 'كل فئة تشمل دخولًا حيويًا على مدار الساعة ومزامنة القياسات. بلا رسوم انضمام. ألغِ في أي وقت.',
  },
  'home.pr.monthly': { en: 'MONTHLY', ar: 'شهري' },
  'home.pr.annual':  { en: 'ANNUAL',  ar: 'سنوي' },
  'home.pr.save':    { en: '–20%', ar: '–20%' },
  'home.pr.billedM': { en: 'billed monthly', ar: 'فاتورة شهرية' },
  'home.pr.billedA': { en: 'billed annually', ar: 'فاتورة سنوية' },
  'home.pr.and':     { en: 'AND', ar: 'و' },
  'home.pr.popular': { en: 'MOST POPULAR', ar: 'الأكثر شعبية' },
  'home.pr.claim':   { en: 'CLAIM PRO MEMBERSHIP', ar: 'اطلب عضوية برو' },
  'home.pr.select':  { en: 'SELECT', ar: 'اختر' },

  'home.pr.inc1': { en: '24/7 biometric entry', ar: 'دخول حيوي 24/7' },
  'home.pr.inc2': { en: 'App telemetry sync',   ar: 'مزامنة التطبيق' },
  'home.pr.inc3': { en: 'Recovery lounge',      ar: 'صالة التعافي' },
  'home.pr.inc4': { en: 'No joining fee',       ar: 'بلا رسوم انضمام' },

  'home.pr.t1.label': { en: 'ESSENTIAL ACCESS',      ar: 'وصول أساسي' },
  'home.pr.t1.name':  { en: 'Basic Tier',            ar: 'الفئة الأساسية' },
  'home.pr.t1.short': { en: 'Basic',                 ar: 'أساسي' },
  'home.pr.t1.desc': {
    en: 'Full iron arena and cardio floor access during staffed hours.',
    ar: 'دخول كامل لساحة الحديد وأرضية الكارديو خلال ساعات الطاقم.',
  },
  'home.pr.t1.f1': { en: 'Arena & cardio floor access', ar: 'دخول ساحة الحديد والكارديو' },
  'home.pr.t1.f2': { en: 'Biometric keyless entry',     ar: 'دخول حيوي بلا مفاتيح' },
  'home.pr.t1.f3': { en: 'Mobile telemetry app',        ar: 'تطبيق القياسات' },
  'home.pr.t1.f4': { en: 'Cryo & infrared recovery pods', ar: 'كبسولات التبريد والأشعة' },
  'home.pr.t1.f5': { en: '1-on-1 performance coaching', ar: 'تدريب أداء فردي' },

  'home.pr.t2.label': { en: 'FULL CONDITIONING',      ar: 'تكييف كامل' },
  'home.pr.t2.name':  { en: 'Smart Pro',              ar: 'سمارت برو' },
  'home.pr.t2.short': { en: 'Pro',                    ar: 'برو' },
  'home.pr.t2.desc': {
    en: 'Unrestricted 24/7 access to every sector, plus machine telemetry.',
    ar: 'دخول غير مقيّد 24/7 لكل قطاع، مع قياسات الآلات.',
  },
  'home.pr.t2.f1': { en: '24/7 unlimited floor & track', ar: 'أرضية ومسار غير محدود 24/7' },
  'home.pr.t2.f2': { en: 'Velocity pool & combat pit',   ar: 'مسبح السرعة وحفرة القتال' },
  'home.pr.t2.f3': { en: 'Sauna & steam suite',          ar: 'ساونا وجناح بخار' },
  'home.pr.t2.f4': { en: 'Sensor barbells & force data', ar: 'بارات بحساسات وبيانات قوة' },
  'home.pr.t2.f5': { en: 'Dedicated sports scientist',   ar: 'عالم رياضي مخصص' },

  'home.pr.t3.label': { en: 'PEAK HUMAN PROTOCOL',           ar: 'بروتوكول الذروة البشرية' },
  'home.pr.t3.name':  { en: 'Black Tier',                    ar: 'الفئة السوداء' },
  'home.pr.t3.short': { en: 'Elite',                         ar: 'نخبة' },
  'home.pr.t3.desc': {
    en: 'The full protocol — private coaching, screening and every amenity.',
    ar: 'البروتوكول الكامل — تدريب خاص وفحوصات وكل وسائل الراحة.',
  },
  'home.pr.t3.f1': { en: 'Everything in Pro Tier',           ar: 'كل ما في فئة برو' },
  'home.pr.t3.f2': { en: 'Dedicated performance coach',      ar: 'مدرب أداء مخصص' },
  'home.pr.t3.f3': { en: 'Unlimited cryotherapy (−110°C)',   ar: 'تبريد غير محدود (−110°م)' },
  'home.pr.t3.f4': { en: 'Quarterly DEXA + VO₂ max tests',   ar: 'فحوصات DEXA و VO₂ ربع سنوية' },
  'home.pr.t3.f5': { en: 'Private locker & laundry care',    ar: 'خزانة خاصة وخدمة غسيل' },

  /* Proof */
  'home.pf.stag': { en: '06 — PROOF', ar: '06 — الإثبات' },
  'home.pf.title': { en: 'RESULTS ON RECORD', ar: 'نتائج موثّقة' },
  'home.pf.quote': {
    en: 'Smart Gym removed all guesswork from my pre-season. The bar-velocity feedback alone boosted my clean & jerk by *17.5 kg*.',
    ar: 'أزال سمارت جيم كل التخمين من مرحلة ما قبل الموسم. تغذية سرعة البار وحدها رفعت الكلين والنطر بـ *17.5 كغ*.',
  },
  'home.pf.author':     { en: 'ELENA ROSTOVA', ar: 'إيلينا روستوفا' },
  'home.pf.authorMeta': { en: 'National Weightlifting Champion · Pro Tier', ar: 'بطلة رفع أثقال وطنية · فئة برو' },
  'home.pf.s1.t': { en: 'TARGET RETENTION',    ar: 'الاحتفاظ المستهدف' },
  'home.pf.s1.d': {
    en: 'Members hit baseline conditioning targets within 90 days.',
    ar: 'الأعضاء يحققون أهداف التكييف الأساسية خلال 90 يومًا.',
  },
  'home.pf.s2.t': { en: 'DATA POINTS / MONTH', ar: 'نقاط بيانات شهريًا' },
  'home.pf.s2.d': {
    en: 'Logged across smart barbells and sprint treadmills.',
    ar: 'مسجّلة من البارات الذكية ومشايات السبرنت.',
  },
  'home.pf.s3.t': { en: 'UNINTERRUPTED ACCESS', ar: 'دخول دون انقطاع' },
  'home.pf.s3.d': {
    en: 'Zero booking queues for racks or plunge bays.',
    ar: 'بلا طوابير حجز للرفوف أو أحواض الغمر.',
  },
  'home.pf.s4.t': { en: 'GATE SYNC', ar: 'مزامنة البوابة' },
  'home.pf.s4.d': {
    en: 'Touchless entry via facial verification.',
    ar: 'دخول بدون لمس عبر التحقق من الوجه.',
  },

  /* CTA (final) */
  'home.cta.eyebrow': { en: 'READY TO ENTER THE ARENA?', ar: 'مستعد لدخول الساحة؟' },
  'home.cta.h2a':     { en: 'CLAIM YOUR 7-DAY',          ar: 'احصل على' },
  'home.cta.h2b':     { en: 'PERFORMANCE PASS.',         ar: 'تصريح الأداء 7 أيام.' },
  'home.cta.desc': {
    en: "Free biometric baseline, full floor access and one coached session. If we're not your gym, you walk away owing nothing.",
    ar: 'خط أساس حيوي مجاني، دخول كامل للأرضية، وجلسة تدريب واحدة. إذا لم نكن ناديك، تغادر دون أي التزام.',
  },
  'home.cta.btn': { en: 'START FREE WEEK', ar: 'ابدأ أسبوعًا مجانيًا' },

  /* Bottom tabbar (mobile) */
  'tab.home':      { en: 'HOME',      ar: 'الرئيسية' },
  'tab.facilities':{ en: 'FACILITIES',ar: 'المرافق' },
  'tab.services':  { en: 'SERVICES',  ar: 'الخدمات' },
  'tab.join':      { en: 'JOIN NOW',  ar: 'انضم الآن' },
    /* ============================================================
     MEMBERSHIP SIGNUP / ENROLLMENT
  ============================================================ */

  /* ---------- Preloader ---------- */
  'en.boot': { en: 'OPENING BIOMETRIC ENCLAVE', ar: 'فتح القبو الحيوي' },

  /* ---------- Hero ---------- */
  'en.kicker': {
    en: 'BIOMETRIC ENCLAVE REGISTRATION — DISTRICT 01 GATEWAY',
    ar: 'تسجيل القبو الحيوي — بوابة المنطقة 01',
  },
  'en.title': { en: 'ATHLETE', ar: 'بروتوكول' },
  'en.title.em': { en: 'ENROLLMENT', ar: 'تسجيل' },
  'en.title.tail': { en: 'PROTOCOL', ar: 'الرياضي' },
  'en.lede': {
    en: 'Secure digital provisioning for uninterrupted 24/7 terminal access, biometric barbell telemetry, and recovery infrastructure.',
    ar: 'تزويد رقمي آمن للوصول المستمر إلى المحطات على مدار الساعة، وقياس حيوي للبار، وبنية تعافٍ متكاملة.',
  },
  'en.sec1.label': { en: 'SESSION SECURITY', ar: 'أمان الجلسة' },
  'en.sec1.value': { en: 'TLS 1.3 / EAL6+', ar: 'TLS 1.3 / EAL6+' },
  'en.sec2.label': { en: 'ALLOCATION', ar: 'التخصيص' },
  'en.ghost': { en: 'ENROLL', ar: 'تسجيل' },

  /* ---------- Step rail ---------- */
  'en.step1.b': { en: 'STEP 01 — ATHLETE PROFILE & PROTOCOL', ar: 'الخطوة 01 — ملف الرياضي والبروتوكول' },
  'en.step1.s': { en: 'Identity, home terminal location, and training vector', ar: 'الهوية، موقع المحطة الرئيسية، والمتجه التدريبي' },
  'en.step2.b': { en: 'STEP 02 — BIOMETRICS & INSTANT CHECKOUT', ar: 'الخطوة 02 — الحيوية والدفع الفوري' },
  'en.step2.s.ready': { en: 'Express mobile wallet, biometric encryption token', ar: 'محفظة الجوال السريعة، رمز التشفير الحيوي' },
  'en.step2.s.locked': { en: 'Open to review — complete step 01 fields to pay', ar: 'افتح للمراجعة — أكمل حقول الخطوة 01 للدفع' },

  /* ---------- HUD ---------- */
  'en.hud.pct': { en: 'ENROLLED', ar: 'مسجّل' },

  /* ---------- Panel 1 — credentials ---------- */
  'en.p1.title': { en: 'ATHLETE CREDENTIALS & VECTOR', ar: 'بيانات الرياضي والمتجه' },
  'en.p1.proto': { en: 'FIELD PROTOCOL · 01/02', ar: 'بروتوكول ميداني · 01/02' },
  'en.p1.name': { en: 'FULL LEGAL NAME', ar: 'الاسم القانوني الكامل' },
  'en.p1.namePh': { en: 'e.g. MARCUS VANCE', ar: 'مثال: ماركوس فانس' },
  'en.p1.email': { en: 'ENCRYPTED EMAIL ADDRESS', ar: 'البريد الإلكتروني المشفر' },
  'en.p1.emailPh': { en: 'vance.athletics@domain.io', ar: 'athlete@domain.io' },
  'en.p1.phone': { en: 'MOBILE SECURITY LINE', ar: 'خط الهاتف الآمن' },
  'en.p1.phonePh': { en: '+1 (555) 890-4412', ar: '+966 55 890 4412' },
  'en.p1.vecHead': { en: 'PRIMARY ATHLETIC VECTOR (TELEMETRY CALIBRATION)', ar: 'المتجه الرياضي الأساسي (معايرة القياسات)' },
  'en.p1.vecMulti': { en: 'SELECT MULTIPLE', ar: 'اختر عدة' },
  'en.p1.cta': { en: 'PROCEED TO CHECKOUT', ar: 'المتابعة إلى الدفع' },

  /* Vector chips */
  'en.vec.hyp.t': { en: 'HYPERTROPHY', ar: 'التضخم' },
  'en.vec.hyp.s': { en: 'Heavy Iron Vol.', ar: 'حجم حديد ثقيل' },
  'en.vec.shred.t': { en: 'FAT SHRED', ar: 'تنشيف الدهون' },
  'en.vec.shred.s': { en: 'Metabolic Cut', ar: 'قطع أيضي' },
  'en.vec.endu.t': { en: 'ENDURANCE', ar: 'التحمل' },
  'en.vec.endu.s': { en: 'Engine Building', ar: 'بناء المحرك' },
  'en.vec.combat.t': { en: 'COMBAT / MMA', ar: 'قتال / MMA' },
  'en.vec.combat.s': { en: 'Striking & Power', ar: 'ضرب وقوة' },
  'en.vec.biomech.t': { en: 'BIOMECHANICS', ar: 'الميكانيكا الحيوية' },
  'en.vec.biomech.s': { en: 'VBT Velocity', ar: 'سرعة VBT' },
  'en.vec.recovery.t': { en: 'RECOVERY', ar: 'التعافي' },
  'en.vec.recovery.s': { en: 'Cryo & Sauna', ar: 'تبريد وساونا' },

  /* Nodes */
  'en.node.1': { en: 'Tokyo Monolith HQ — District 01', ar: 'المقر الرئيسي طوكيو — المنطقة 01' },
  'en.node.2': { en: 'Neo-Kyoto Velocity Annex — District 02', ar: 'ملحق السرعة نيو كيوتو — المنطقة 02' },
  'en.node.3': { en: 'Osaka Iron Yard — District 04', ar: 'ساحة الحديد أوساكا — المنطقة 04' },
  'en.node.4': { en: 'Shibuya Cryo Lab — District 07', ar: 'مختبر التبريد شيبويا — المنطقة 07' },

  /* ---------- Panel 2 — payment ---------- */
  'en.p2.title': { en: 'PAYMENT & BIOMETRIC ENCRYPTION', ar: 'الدفع والتشفير الحيوي' },
  'en.p2.proto': { en: 'FIELD PROTOCOL · 02/02', ar: 'بروتوكول ميداني · 02/02' },
  'en.p2.agreeB': { en: 'Conditioning Protocol Agreement & Biometric Enclave Waiver', ar: 'اتفاقية بروتوكول التدريب وتنازل القبو الحيوي' },
  'en.p2.agreeI': {
    en: 'I agree to the Terms of Conditioning, biometric data sync, encrypted bar speed sensor calibration, and privacy-first on-device encrypted telemetry sync.',
    ar: 'أوافق على شروط التدريب، ومزامنة البيانات الحيوية، ومعايرة مستشعر سرعة البار المشفرة، ومزامنة القياسات المشفرة على الجهاز أولاً.',
  },
  'en.p2.processing': { en: 'PROVISIONING PASS', ar: 'جارٍ تجهيز التصريح' },

  /* Card preview */

  /* Errors / validation */
  'en.err.name': { en: 'MIN 2 CHARACTERS', ar: 'حرفان على الأقل' },
  'en.err.email': { en: 'INVALID EMAIL', ar: 'بريد غير صالح' },
  'en.err.phone': { en: 'ENTER VALID NUMBER', ar: 'أدخل رقمًا صحيحًا' },
  'en.err.agree': { en: 'REQUIRED TO ACTIVATE PASS', ar: 'مطلوب لتفعيل التصريح' },

  /* ---------- Success ---------- */

  /* ---------- Order summary ---------- */
  'en.sum.order': { en: 'ORDER SUMMARY', ar: 'ملخص الطلب' },
  'en.sum.eyebrow': { en: 'RECOMMENDED PERFORMANCE STANDARD', ar: 'معيار الأداء الموصى به' },
  'en.sum.perMonth': { en: '/ MONTH', ar: '/ شهريًا' },
  'en.sum.switch': { en: 'SWITCH PLAN', ar: 'تبديل الخطة' },
  'en.sum.terms1': { en: 'MONTH-TO-MONTH', ar: 'شهر بشهر' },
  'en.sum.terms2': { en: 'NO LOCK-IN DURATION', ar: 'بلا التزام بمدة' },
  'en.sum.terms3': { en: 'CANCEL ANYTIME', ar: 'إلغاء متى شئت' },
  'en.sum.mediaCap': { en: 'DIRECT HIGH-VELOCITY FACILITY ACCESS', ar: 'وصول مباشر لمرافق السرعة العالية' },
  'en.sum.perksHead': { en: 'INCLUDED PERFORMANCE EQUIPMENT & INFRASTRUCTURE', ar: 'معدات وبنية أداء مشمولة' },
  'en.sum.total': { en: 'TOTAL DUE TODAY', ar: 'الإجمالي المستحق اليوم' },
  'en.sum.totalSub': { en: 'IMMEDIATE PASS PROVISIONING', ar: 'تجهيز فوري للتصريح' },
  'en.sum.usd': { en: 'SAR', ar: 'ر.س' },
  'en.sum.trust1t': { en: '256-BIT BIOMETRIC ENCLAVE', ar: 'قبو حيوي 256 بت' },
  'en.sum.trust1d': { en: 'Hardware security level data storage', ar: 'تخزين بيانات بمستوى أمان العتاد' },
  'en.sum.trust2t': { en: '14-DAY PEAK GUARANTEE', ar: 'ضمان الذروة 14 يومًا' },
  'en.sum.trust2d': { en: "100% full refund if training expectations aren't exceeded", ar: 'استرداد كامل 100% إذا لم تتجاوز توقعات التدريب' },
  'en.sum.trust3t': { en: 'INSTANT WALLET PASS', ar: 'تصريح فوري للمحفظة' },
  'en.sum.trust3d': { en: 'One-tap pass save to Apple Wallet or Google Wallet', ar: 'حفظ التصريح بلمسة إلى Apple أو Google Wallet' },
  'en.sum.corpB': { en: 'Team or Corporate Account?', ar: 'حساب فريق أو شركة؟' },
  'en.sum.corpI': { en: 'Group billing & exclusive telemetry slots', ar: 'فوترة جماعية وفتحات قياس حصرية' },
  'en.sum.corpLink': { en: 'INQUIRE', ar: 'استفسر' },

  /* Plan content */



  /* ---------- Trust strip ---------- */
  'en.trust.1.t': { en: 'ZERO KEY CARDS', ar: 'بلا بطاقات مفاتيح' },
  'en.trust.1.d': { en: 'Enter seamlessly with encrypted facial scan or phone NFC turnstile access.', ar: 'دخول سلس بمسح الوجه المشفر أو NFC عبر جوالك.' },
  'en.trust.2.t': { en: 'CLOUD METRIC BACKUP', ar: 'نسخ احتياطي سحابي للقياسات' },
  'en.trust.2.d': { en: 'All barbell load, power output, and velocity data stored automatically.', ar: 'يتم تخزين كل بيانات حمل البار والقدرة والسرعة تلقائيًا.' },
  'en.trust.3.t': { en: 'FLEXIBLE CANCELLATION', ar: 'إلغاء مرن' },
  'en.trust.3.d': { en: 'No 12-month commitments. Pause or terminate your contract directly in-app.', ar: 'بلا التزام 12 شهرًا. أوقف أو أنهِ عقدك داخل التطبيق.' },
  'en.trust.4.t': { en: 'ELITE COACHING ON CALL', ar: 'تدريب نخبوي عند الطلب' },
  'en.trust.4.d': { en: 'Complimentary monthly 45-minute biomechanical movement screen included.', ar: 'فحص حركة حيوي شهري مجاني لمدة 45 دقيقة.' },

  /* ---------- Mobile paybar ---------- */
  'en.paybar.step1': { en: 'PROCEED TO CHECKOUT', ar: 'المتابعة إلى الدفع' },
  'en.paybar.step2': { en: 'COMPLETE ENROLLMENT', ar: 'أكمل التسجيل' },
  'en.paybar.sec': { en: '256-BIT SSL MILITARY GRADE ENCRYPTION', ar: 'تشفير SSL 256 بت بمعايير عسكرية' },

  /* ---------- Mobile tabbar ---------- */
  'en.tab.home': { en: 'HOME', ar: 'الرئيسية' },
  'en.tab.facilities': { en: 'FACILITIES', ar: 'المرافق' },
  'en.tab.services': { en: 'SERVICES', ar: 'الخدمات' },
  'en.tab.join': { en: 'JOIN NOW', ar: 'انضم الآن' },
    /* ============================================================
     INSIGHTS / BLOG
  ============================================================ */

  /* ---------- Preloader ---------- */
  'ins.boot': { en: 'CALIBRATING TELEMETRY GRID', ar: 'معايرة شبكة القياس' },

  /* ---------- Hero ---------- */
  'ins.kicker': {
    en: 'SMART GYM // KINETIC INSIGHTS',
    ar: 'سمارت جيم // رؤى حركية',
  },
  'ins.hero.l1': { en: 'KINETIC', ar: 'رؤى' },
  'ins.hero.l2': { en: 'INSIGHTS', ar: 'حركية' },
  'ins.issue.left': { en: 'PEER-REVIEWED ATHLETIC DATA', ar: 'بيانات رياضية محكّمة' },
  'ins.issue.right': { en: 'ISSUE NO. 142', ar: 'العدد 142' },
  'ins.hero.lede': {
    en: 'Biomechanical research, precision fueling protocols, and high-voltage athletic telemetry published weekly by Smart Gym sport scientists and elite conditioning directors.',
    ar: 'أبحاث الميكانيكا الحيوية وبروتوكولات التغذية الدقيقة وقياسات الأداء الرياضي المنشورة أسبوعيًا من علماء سمارت جيم ومديري التكييف النخبة.',
  },

  /* Belt */
  'ins.belt.training': { en: 'TRAINING', ar: 'التدريب' },
  'ins.belt.nutrition': { en: 'NUTRITION', ar: 'التغذية' },
  'ins.belt.recovery': { en: 'RECOVERY', ar: 'التعافي' },
  'ins.belt.biometrics': { en: 'BIOMETRICS', ar: 'القياسات' },
  'ins.belt.cases': { en: 'CASE STUDIES', ar: 'دراسات حالة' },
  'ins.belt.protocols': { en: 'PROTOCOLS', ar: 'البروتوكولات' },

  /* ---------- Filter chips ---------- */
  'ins.f.all': { en: 'ALL ARTICLES', ar: 'جميع المقالات' },
  'ins.f.training': { en: 'TRAINING SCIENCE', ar: 'علم التدريب' },
  'ins.f.nutrition': { en: 'NUTRITION & MACROS', ar: 'التغذية والماكروز' },
  'ins.f.recovery': { en: 'RECOVERY & CRYO', ar: 'التعافي والتبريد' },
  'ins.f.biometrics': { en: 'BIOMETRIC TELEMETRY', ar: 'القياسات الحيوية' },
  'ins.f.cases': { en: 'ATHLETE CASE STUDIES', ar: 'دراسات حالة رياضية' },
  'ins.search.ph': { en: 'Query biometric protocols…', ar: 'ابحث في البروتوكولات الحيوية…' },

  /* ---------- Featured ---------- */
  'ins.feat.badge': { en: 'LAB DISPATCH // VBT-09', ar: 'إرسال مختبري // VBT-09' },
  'ins.feat.certified': { en: 'LAB CERTIFIED', ar: 'معتمد مختبريًا' },
  'ins.feat.cta': { en: 'READ FULL PROTOCOL', ar: 'اقرأ البروتوكول الكامل' },

  /* ---------- Trending metrics ---------- */
  'ins.m1.l': { en: 'ACTIVE RESEARCH COHORT', ar: 'فوج البحث النشط' },
  'ins.m1.s': { en: '+12% THIS WK', ar: '+12% هذا الأسبوع' },
  'ins.m2.l': { en: 'CNS RECOVERY BASELINE', ar: 'خط أساس تعافي الجهاز العصبي' },
  'ins.m2.s': { en: 'HRV AVG', ar: 'متوسط HRV' },
  'ins.m3.l': { en: 'WEEKLY INTAKE VOLUME', ar: 'حجم الاستهلاك الأسبوعي' },
  'ins.m3.s': { en: 'ELECTROLYTE OPT.', ar: 'تحسين الإلكتروليت' },
  'ins.m4.l': { en: 'FORCE OUTPUT DELTA', ar: 'فارق ناتج القوة' },
  'ins.m4.s': { en: 'POST-CRYO', ar: 'بعد التبريد' },

  /* ---------- Articles ---------- */





  /* ---------- Archive header ---------- */
  'ins.arch.eyebrow': { en: 'SYSTEM DISPATCH ARCHIVE', ar: 'أرشيف إرسال النظام' },
  'ins.arch.title': { en: 'EXPLORE CLINICAL PROTOCOLS', ar: 'استكشف البروتوكولات السريرية' },
  'ins.arch.toolGrid': { en: 'Grid view', ar: 'عرض شبكي' },
  'ins.arch.toolList': { en: 'List view', ar: 'عرض قائمة' },

  /* ---------- Card foot ---------- */
  'ins.card.read': { en: 'READ ENTRY', ar: 'اقرأ المدخل' },

  /* ---------- Newsletter ---------- */
  'ins.news.label': { en: 'DIRECT LAB ACCESS', ar: 'وصول مختبري مباشر' },
  'ins.news.title': { en: 'TELEMETRY DISPATCH', ar: 'إرسال القياسات' },
  'ins.news.desc': {
    en: 'Receive clinical strength diagnostics, meal periodization sheets, and unreleased case studies directly to your terminal every Sunday at 06:00 EST.',
    ar: 'استقبل تشخيصات القوة السريرية وجداول دورية الوجبات ودراسات الحالة غير المنشورة مباشرة على جهازك كل يوم أحد الساعة 06:00 بتوقيت شرق أمريكا.',
  },
  'ins.news.ph': { en: 'ATHLETE@DOMAIN.COM', ar: 'athlete@domain.com' },
  'ins.news.checkbox': { en: 'INCLUDE RAW DATA SETS (CSV)', ar: 'تضمين مجموعات البيانات الخام (CSV)' },
  'ins.news.cta': { en: 'SUBSCRIBE TO DISPATCH', ar: 'اشترك في الإرسال' },
  'ins.news.success': {
    en: 'FREQUENCY LOCKED. FIRST DOSSIER ARRIVING FRIDAY.',
    ar: 'تم تثبيت التردد. أول ملف يصل الجمعة.',
  },
  'ins.news.footLeft': { en: 'NO SPAM. ZERO NONSENSE.', ar: 'لا رسائل مزعجة. بلا حماقات.' },
  'ins.news.footRight': { en: '28,400+ ATHLETES', ar: '28,400+ رياضي' },

  /* ---------- Empty state ---------- */
  'ins.empty.title': { en: 'NO PROTOCOLS FOUND', ar: 'لا توجد بروتوكولات' },
  'ins.empty.desc': {
    en: 'No articles match your search criteria. Try filtering by Training or Biometrics.',
    ar: 'لا توجد مقالات تطابق معايير البحث. جرّب التصفية حسب التدريب أو القياسات الحيوية.',
  },
  'ins.empty.reset': { en: 'RESET ALL FILTERS', ar: 'إعادة تعيين الفلاتر' },

  /* ---------- Pagination ---------- */
  'ins.pag.showing': { en: 'SHOWING', ar: 'عرض' },
  'ins.pag.of': { en: 'OF', ar: 'من' },
  'ins.pag.total': { en: 'RESEARCH PROTOCOLS', ar: 'بروتوكول بحثي' },
  'ins.pag.prev': { en: 'PREV ENTRIES', ar: 'المدخلات السابقة' },
  'ins.pag.next': { en: 'NEXT ENTRIES', ar: 'المدخلات التالية' },

  /* ---------- Taxonomy ---------- */
  'ins.tax.label': { en: 'LAB INDEX SEARCH TAGS', ar: 'وسوم البحث المختبري' },
  'ins.tax.title': { en: 'INDEXED TELEMETRY VECTORS', ar: 'متجهات القياس المفهرسة' },
  'ins.tax.t1': { en: '#ELECTROMYOGRAPHY', ar: '#تخطيط_عضلي' },
  'ins.tax.t2': { en: '#RATE-OF-FORCE-DEVELOPMENT', ar: '#معدل_تطور_القوة' },
  'ins.tax.t3': { en: '#HYPERTROPHY-SIGNALING', ar: '#إشارات_التضخم' },
  'ins.tax.t4': { en: '#GLYCOGEN-SUPERCOMPENSATION', ar: '#تعويض_الجليكوجين' },
  'ins.tax.t5': { en: '#CRYO-NEUROMUSCULAR', ar: '#تبريد_عصبي_عضلي' },
  'ins.tax.t6': { en: '#VBT-CUTOFFS', ar: '#حدود_VBT' },

  /* ---------- CTA ---------- */
  'ins.cta.eyebrow': { en: 'READY TO DEPLOY YOUR OWN PROTOCOL?', ar: 'مستعد لنشر بروتوكولك الخاص؟' },
  'ins.cta.h2a': { en: 'START WITH A', ar: 'ابدأ بخط' },
  'ins.cta.h2b': { en: 'BIOMETRIC BASELINE.', ar: 'أساس حيوي.' },
  'ins.cta.desc': {
    en: "Free 30-minute consultation and metabolic snapshot. If our protocols aren't right for you, you walk away owing nothing.",
    ar: 'استشارة مجانية 30 دقيقة ولقطة أيضية. إذا لم تكن بروتوكولاتنا مناسبة لك، تغادر دون أي التزام.',
  },
  'ins.cta.btn': { en: 'BOOK FREE CONSULT', ar: 'احجز استشارة مجانية' },

  /* ---------- Mobile tabbar ---------- */
  'ins.tab.home': { en: 'HOME', ar: 'الرئيسية' },
  'ins.tab.facilities': { en: 'FACILITIES', ar: 'المرافق' },
  'ins.tab.services': { en: 'SERVICES', ar: 'الخدمات' },
  'ins.tab.join': { en: 'JOIN NOW', ar: 'انضم الآن' },
    /* ============================================================
     FACILITIES SHOWCASE
  ============================================================ */

  /* ---------- Preloader ---------- */
  'fac.boot': { en: 'CALIBRATING TELEMETRY GRID', ar: 'معايرة شبكة القياس' },

  /* ---------- Hero ---------- */
  'fac.kicker': {
    en: 'BIOMETRIC TELEMETRY // LIVE OPERATIONS GRID',
    ar: 'القياس الحيوي // شبكة العمليات المباشرة',
  },
  'fac.hero.l1': { en: 'ELITE',        ar: 'بيئات' },
  'fac.hero.l2': { en: 'ENVIRONMENTS', ar: 'نخبوية' },
  'fac.hero.lede': {
    en: 'Engineered spaces fine-tuned for kinetic output, metabolic conditioning, and elite recovery. Track real-time occupancy load, environmental telemetry, and active training slots across all sectors.',
    ar: 'مساحات مُهندسة ومضبوطة لمخرجات الحركة والتكييف الأيضي والتعافي النخبوي. تتبع حمل الإشغال الفوري والقياسات البيئية وفتحات التدريب النشطة عبر جميع القطاعات.',
  },
  'fac.hero.cta1': { en: 'EXPLORE FLOOR PLAN', ar: 'استكشف مخطط الأرضية' },
  'fac.hero.cta2': { en: 'VIEW TELEMETRY',     ar: 'عرض القياسات' },

  /* Capacity card */

  /* Belt */
  'fac.belt.aquatics':  { en: 'AQUATICS',   ar: 'السباحة' },
  'fac.belt.combat':    { en: 'COMBAT',     ar: 'القتال' },
  'fac.belt.courts':    { en: 'COURTS',     ar: 'الملاعب' },
  'fac.belt.recovery':  { en: 'RECOVERY',   ar: 'التعافي' },
  'fac.belt.strength':  { en: 'STRENGTH',   ar: 'القوة' },
  'fac.belt.volley':    { en: 'VOLLEYBALL', ar: 'الكرة الطائرة' },
  'fac.belt.open':      { en: 'OPEN 24/7',  ar: 'مفتوح 24/7' },

  /* ---------- Filter + Grid ---------- */
  'fac.stag':  { en: 'LIVE AVAILABILITY',  ar: 'التوفر المباشر' },
  'fac.title': { en: 'CHOOSE YOUR ARENA',  ar: 'اختر ساحتك' },
  'fac.sub': {
    en: 'Every sector reports live occupancy, environment readings and next open slots. Pick one — booking syncs straight to your biometric profile.',
    ar: 'كل قطاع يعرض الإشغال الفوري وقراءات البيئة والفتحات المتاحة التالية. اختر واحدًا — الحجز يتزامن مباشرة مع ملفك الحيوي.',
  },

  /* Filter chips */
  'fac.f.all':       { en: 'ALL ARENAS', ar: 'جميع الساحات' },
  'fac.f.aquatics':  { en: 'AQUATICS',   ar: 'السباحة' },
  'fac.f.combat':    { en: 'COMBAT',     ar: 'القتال' },
  'fac.f.courts':    { en: 'COURTS',     ar: 'الملاعب' },
  'fac.f.recovery':  { en: 'RECOVERY',   ar: 'التعافي' },
  'fac.f.strength':  { en: 'STRENGTH',   ar: 'القوة' },

  /* ---------- Facility card 1 — Olympic Pool ---------- */

  /* Card 2 — Basketball Court */

  /* Card 3 — Combat Pit */

  /* Card 4 — Recovery */

  /* Card 5 — Volleyball */

  /* Card 6 — Heavy Iron */

  /* Card dynamic */

  /* ---------- Telemetry deep-dive ---------- */
  'fac.tel.label': { en: 'SMART GYM SENSOR GRID v4.2', ar: 'شبكة مستشعرات سمارت جيم v4.2' },
  'fac.tel.title': { en: 'Automated Access & Environmental Telemetry', ar: 'الدخول الآلي والقياسات البيئية' },
  'fac.tel.desc': {
    en: 'All sectors sync with your biometric member passcode key. Locker allocation, air filtration rates, and target training logs sync in real time.',
    ar: 'جميع القطاعات تتزامن مع مفتاح العضوية الحيوي الخاص بك. تخصيص الخزائن ومعدلات ترشيح الهواء وسجلات التدريب تتزامن فوريًا.',
  },
  'fac.tel.stat1': { en: 'SYNC LATENCY', ar: 'زمن المزامنة' },
  'fac.tel.stat2': { en: 'AIR QUALITY',  ar: 'جودة الهواء' },
  'fac.tel.stat1v': { en: '0.04s',   ar: '0.04 ث' },
  'fac.tel.stat2v': { en: 'HEPA 14', ar: 'HEPA 14' },
  'fac.card.status': { en: 'STATUS:', ar: 'الحالة:' },
  'fac.card.cta':    { en: 'JOIN TO ACCESS', ar: 'انضم للدخول' },
  'fac.loading': { en: 'Loading facilities…', ar: 'جارٍ تحميل المرافق…' },
  'fac.empty':   { en: 'No facilities to show yet.', ar: 'لا توجد مرافق لعرضها بعد.' },
  'fac.error':   { en: 'Facilities could not be loaded. Please refresh the page.', ar: 'تعذّر تحميل المرافق. يرجى تحديث الصفحة.' },
  'fac.tel.cta':   { en: 'GET BIOMETRIC ACCESS', ar: 'احصل على الدخول الحيوي' },

  /* ---------- Booking drawer ---------- */

  /* ---------- Mobile tabbar ---------- */
  'fac.tab.home':       { en: 'HOME',       ar: 'الرئيسية' },
  'fac.tab.facilities': { en: 'FACILITIES', ar: 'المرافق' },
  'fac.tab.services':   { en: 'SERVICES',   ar: 'الخدمات' },
  'fac.tab.join':       { en: 'JOIN NOW',   ar: 'انضم الآن' },
    /* ============================================================
     CONTACT & SUPPORT
  ============================================================ */

  /* ---------- Preloader ---------- */
  'ct.boot': { en: 'CALIBRATING TELEMETRY GRID', ar: 'معايرة شبكة القياس' },

  /* ---------- Section dots ---------- */
  'ct.dot.hero':  { en: 'UPLINK',   ar: 'الاتصال' },
  'ct.dot.grid':  { en: 'DISPATCH', ar: 'الإرسال' },
  'ct.dot.quick': { en: 'ACTIONS',  ar: 'الإجراءات' },
  'ct.dot.hubs':  { en: 'HUBS',     ar: 'المراكز' },
  'ct.dot.faq':   { en: 'FAQ',      ar: 'الأسئلة' },
  'ct.dot.cta':   { en: 'PASS',     ar: 'التصريح' },

  /* ---------- Hero ---------- */
  'ct.kicker': {
    en: 'TERMINAL 06 // COMM UPLINK',
    ar: 'المحطة 06 // وصلة الاتصال',
  },
  'ct.hero.l1': { en: 'COMMAND',         ar: 'منشأة' },
  'ct.hero.l2': { en: 'FACILITY &',      ar: 'القيادة و' },
  'ct.hero.l3': { en: 'ATHLETE SUPPORT', ar: 'دعم الرياضيين' },
  'ct.hero.lede': {
    en: 'Have questions about biometric passes, corporate allocations, or Olympic arena schedules? Connect directly with our operations team.',
    ar: 'هل لديك أسئلة حول التصاريح الحيوية أو التخصيصات المؤسسية أو جداول الساحة الأولمبية؟ تواصل مباشرة مع فريق العمليات.',
  },
  'ct.hero.pill1.lab': { en: 'SYSTEM STATUS',   ar: 'حالة النظام' },
  'ct.hero.pill1.val': { en: 'TELEMETRY ACTIVE', ar: 'القياس نشط' },
  'ct.hero.pill2.lab': { en: 'MEDIAN REPLY',    ar: 'متوسط الرد' },
  'ct.hero.pill2.v1':  { en: '14 MINUTES',      ar: '14 دقيقة' },
  'ct.hero.pill2.v2':  { en: 'FAST TRACK',      ar: 'مسار سريع' },
  'ct.hero.scroll':    { en: 'SCROLL',          ar: 'اسحب' },

  /* Belt */
  'ct.belt.1': { en: 'HQ OPEN 24/7',      ar: 'المقر مفتوح 24/7' },
  'ct.belt.2': { en: 'DIRECT DISPATCH',   ar: 'إرسال مباشر' },
  'ct.belt.3': { en: '14 MIN RESPONSE',   ar: 'رد في 14 دقيقة' },
  'ct.belt.4': { en: 'DISTRICT 01',       ar: 'المنطقة 01' },
  'ct.belt.5': { en: 'BIOMETRIC DESK',    ar: 'مكتب الحيوية' },
  'ct.belt.6': { en: 'SUPPORT',           ar: 'الدعم' },

  /* ---------- Form ---------- */
  'ct.form.eyebrow': { en: 'TRANSMIT REQUEST',            ar: 'إرسال الطلب' },
  'ct.form.title':   { en: 'DIRECT OPERATIONS INQUIRY',   ar: 'استفسار مباشر للعمليات' },
  'ct.form.tag':     { en: 'PROTOCOL SEC-256',            ar: 'بروتوكول SEC-256' },

  'ct.f.domain':     { en: 'INQUIRY DOMAIN / DEPARTMENT', ar: 'مجال الاستفسار / القسم' },
  'ct.f.subtopic':   { en: 'SUB-TOPIC',                   ar: 'الموضوع الفرعي' },
  'ct.f.name':       { en: 'ATHLETE NAME',                ar: 'اسم الرياضي' },
  'ct.f.namePh':     { en: 'e.g. Marcus Vance',           ar: 'مثال: ماركوس فانس' },
  'ct.f.phone':      { en: 'ATHLETE PHONE',               ar: 'هاتف الرياضي' },
  'ct.f.optional':   { en: '(Optional)',                  ar: '(اختياري)' },
  'ct.f.phonePh':    { en: '+1 (555) 019-2831',           ar: '+966 55 019 2831' },
  'ct.f.email':      { en: 'BIOMETRIC / SYNC EMAIL',      ar: 'البريد الحيوي / المزامن' },
  'ct.f.emailPh':    { en: 'athlete.access@smartgym.internal', ar: 'athlete.access@smartgym.internal' },
  'ct.f.msg':        { en: 'TELEMETRY LOG / DETAILED INQUIRY', ar: 'سجل القياس / استفسار مفصل' },
  'ct.f.msgPh': {
    en: 'Detail hardware serials, desired arena slots, or corporate biometric requirements...',
    ar: 'اذكر الأرقام التسلسلية للأجهزة، أو فتحات الساحة المرغوبة، أو متطلبات الحيوية المؤسسية...',
  },
  'ct.f.slaDefault':  { en: 'GUARANTEED RESPONSE: < 2 HOURS', ar: 'رد مضمون: أقل من ساعتين' },
  'ct.f.slaUrgent':   { en: 'EXPRESS RESPONSE: < 30 MIN', ar: 'رد سريع: أقل من 30 دقيقة' },
  'ct.f.priority':    { en: 'PRIORITY DISPATCH', ar: 'إرسال بأولوية' },
  'ct.f.submit':      { en: 'DISPATCH INQUIRY',  ar: 'أرسل الاستفسار' },
  'ct.f.sent':        { en: 'DISPATCHED',        ar: 'تم الإرسال' },
  'ct.f.sentLog': {
    en: 'INQUIRY DISPATCHED • HQ TICKET #8942 OPENED',
    ar: 'تم إرسال الاستفسار • فُتحت تذكرة المقر #8942',
  },

  /* Categories */
  'ct.cat.membership': { en: 'MEMBERSHIP',     ar: 'العضوية' },
  'ct.cat.biometrics': { en: 'BIOMETRICS',     ar: 'القياسات الحيوية' },
  'ct.cat.coach':      { en: 'PRIVATE COACH',  ar: 'مدرب خاص' },
  'ct.cat.billing':    { en: 'BILLING & OPS',  ar: 'الفواتير والعمليات' },

  /* Sub-topics — membership */
  'ct.sub.m1': { en: 'Tiers & Upgrades',           ar: 'الفئات والترقيات' },
  'ct.sub.m2': { en: 'Freezes & Travel Holds',     ar: 'التجميد والإيقاف للسفر' },
  'ct.sub.m3': { en: 'Guest Passes',               ar: 'تصاريح الضيوف' },
  'ct.sub.m4': { en: 'Corporate Fleet Licensing',  ar: 'ترخيص الشركات' },
  /* biometrics */
  'ct.sub.b1': { en: 'Sensor Pairing',             ar: 'إقران المستشعر' },
  'ct.sub.b2': { en: 'Pass / Iris Issues',         ar: 'مشاكل التصريح / القزحية' },
  'ct.sub.b3': { en: 'Telemetry Data Export',      ar: 'تصدير بيانات القياس' },
  'ct.sub.b4': { en: 'Hardware Serials',           ar: 'الأرقام التسلسلية' },
  /* coach */
  'ct.sub.c1': { en: 'Private Coaching Match',     ar: 'مطابقة التدريب الخاص' },
  'ct.sub.c2': { en: 'Program Audit',              ar: 'تدقيق البرنامج' },
  'ct.sub.c3': { en: 'Small Group Sessions',       ar: 'جلسات المجموعات الصغيرة' },
  /* billing */
  'ct.sub.o1': { en: 'Invoice Query',              ar: 'استفسار الفاتورة' },
  'ct.sub.o2': { en: 'Payment Methods',            ar: 'طرق الدفع' },
  'ct.sub.o3': { en: 'Refund Status',              ar: 'حالة الاسترداد' },
  'ct.sub.o4': { en: 'Arena Slot Billing',         ar: 'فواتير فتحات الساحة' },

  /* ---------- Right rail ---------- */
  'ct.rail.node':     { en: 'FACILITY NODE // 01',           ar: 'عقدة المرافق // 01' },
  'ct.rail.open':     { en: 'OPEN NOW (04:00 - 24:00)',      ar: 'مفتوح الآن (04:00 - 24:00)' },
  'ct.rail.title':    { en: 'GLOBAL ATHLETICS COMMAND',      ar: 'قيادة الرياضيين العالمية' },
  'ct.rail.addr': {
    en: 'Smart Gym HQ // Monolith District 01, Precision Boulevard, Olympic Corridor, Sector Alpha',
    ar: 'المقر الرئيسي سمارت جيم // مونوليث المنطقة 01، شارع الدقة، ممر الأولمبياد، قطاع ألفا',
  },
  'ct.rail.desk':     { en: 'ATHLETE DESK',   ar: 'مكتب الرياضيين' },
  'ct.rail.wa':       { en: 'WHATSAPP',       ar: 'واتساب' },
  'ct.rail.gps':      { en: 'GET GPS',        ar: 'الملاحة' },

  /* Map */
  'ct.map.label':     { en: 'TACTICAL CAMPUS GRID',        ar: 'شبكة الحرم التكتيكية' },
  'ct.map.tag1':      { en: 'GATE 01 BIOMETRIC TURNSTILES', ar: 'بوابة 01 البوابات الحيوية' },
  'ct.map.tag2':      { en: 'SUBWAY TERMINAL EXT 4',       ar: 'محطة المترو 4' },
  'ct.map.portal':    { en: 'ARENA HQ PORTAL',             ar: 'بوابة الساحة الرئيسية' },
  'ct.map.foot':      { en: 'BIOMETRIC PARKING DECK ACTIVE // LEVEL P1 - P4', ar: 'موقف الحيوية نشط // طوابق P1 - P4' },
  'ct.map.expand':    { en: 'EXPAND VIEW',                 ar: 'توسيع العرض' },

  /* ---------- Quick actions strip ---------- */
  'ct.qa.call':      { en: 'DIRECT CALL',      ar: 'اتصال مباشر' },
  'ct.qa.callSub':   { en: 'Desk Available',   ar: 'المكتب متاح' },
  'ct.qa.callMeta':  { en: 'PRIORITY',         ar: 'أولوية' },
  'ct.qa.wa':        { en: 'WHATSAPP',         ar: 'واتساب' },
  'ct.qa.waSub':     { en: 'Instant Response', ar: 'رد فوري' },
  'ct.qa.waMeta':    { en: 'LIVE',             ar: 'مباشر' },
  'ct.qa.gps':       { en: 'GPS ROUTE',        ar: 'طريق GPS' },
  'ct.qa.gpsSub':    { en: 'Monolith HQ',      ar: 'مقر مونوليث' },
  'ct.qa.gpsMeta':   { en: 'DISTRICT 01',      ar: 'المنطقة 01' },
  'ct.qa.mail':      { en: 'HQ INQUIRY',       ar: 'استفسار المقر' },
  'ct.qa.mailSub':   { en: 'Digital Dispatch', ar: 'إرسال رقمي' },
  'ct.qa.mailMeta':  { en: '< 1 HR',           ar: '< 1 ساعة' },

  /* ---------- Hubs ---------- */
  'ct.hubs.eyebrow': { en: 'PHYSICAL MONOLITHS', ar: 'الهياكل المادية' },
  'ct.hubs.title':   { en: 'CAMPUS OPERATIONS & ARENA SUPPORT HUBS', ar: 'عمليات الحرم ومراكز دعم الساحة' },
  'ct.hubs.desc': {
    en: 'Explore direct physical intake centers engineered for rapid access, telemetry calibration, and dedicated athlete concierge services.',
    ar: 'استكشف مراكز الاستقبال المادية المصممة للوصول السريع ومعايرة القياسات وخدمات الكونسيرج المخصصة للرياضيين.',
  },
  'ct.hub.1.n': { en: 'DESK 01', ar: 'مكتب 01' },
  'ct.hub.1.t': { en: 'Biometric Intake Desk', ar: 'مكتب الاستقبال الحيوي' },
  'ct.hub.1.d': {
    en: 'Instant NFC band sync, vascular vein mapping registration, and digital key provisioning.',
    ar: 'مزامنة فورية لشريط NFC، تسجيل خرائط الأوردة الدموية، وتسليم مفتاح رقمي.',
  },
  'ct.hub.2.n': { en: 'LAB 02', ar: 'مختبر 02' },
  'ct.hub.2.t': { en: 'Diagnostic Calibration Lab', ar: 'مختبر المعايرة التشخيصية' },
  'ct.hub.2.d': {
    en: 'Direct VO2 max analysis, force-plate assessments, and barbell velocity sensor calibration.',
    ar: 'تحليل مباشر لـ VO2 الأقصى، تقييمات لوح القوة، ومعايرة مستشعر سرعة البار.',
  },
  'ct.hub.3.n': { en: 'ZONE 03', ar: 'منطقة 03' },
  'ct.hub.3.t': { en: 'Concierge Recovery Quarter', ar: 'حي التعافي بالكونسيرج' },
  'ct.hub.3.d': {
    en: 'Rapid check-in for hyperbaric hyper-oxygenation chambers, cold plunge tubs, and private physiotherapists.',
    ar: 'تسجيل سريع في غرف الأكسجة الفائقة وأحواض الغمر الباردة وأخصائيي العلاج الطبيعي الخاص.',
  },

  /* ---------- FAQ ---------- */
  'ct.faq.eyebrow': { en: 'SYSTEM INTELLIGENCE BASE', ar: 'قاعدة ذكاء النظام' },
  'ct.faq.title':   { en: 'FREQUENTLY DISPATCHED PROTOCOLS', ar: 'البروتوكولات المُرسَلة بشكل متكرر' },
  'ct.faq.desc': {
    en: 'Essential guidelines covering biometric identification keys, Olympic equipment telemetry, and trial access rules.',
    ar: 'إرشادات أساسية تغطي مفاتيح الهوية الحيوية وقياسات المعدات الأولمبية وقواعد الوصول التجريبي.',
  },
  'ct.faq.1.q': { en: 'WHAT ARE THE 24/7 BIOMETRIC ENTRY HOURS?', ar: 'ما هي ساعات الدخول الحيوي 24/7؟' },
  'ct.faq.1.a': {
    en: 'Black Tier members possess 24/7 keyless biometric iris and app-based entry into the Monolith Campus. Standard members have floor privileges between 04:00 and 24:00 daily including holidays.',
    ar: 'أعضاء الفئة السوداء لديهم دخول حيوي بلا مفاتيح عبر قزحية العين وتطبيق الجوال لحرم مونوليث على مدار الساعة. الأعضاء العاديون لديهم صلاحيات الأرضية بين 04:00 و24:00 يوميًا بما في ذلك العطلات.',
  },
  'ct.faq.2.q': { en: 'HOW DO I BOOK A PRIVATE RECOVERY LAB SUITE?', ar: 'كيف أحجز جناح التعافي الخاص؟' },
  'ct.faq.2.a': {
    en: "Cryo-chambers, infrared recovery pods, and cold plunge baths can be scheduled with 15-minute lead times via the app's Services section or directly with the Front Desk Concierge upon entry.",
    ar: 'يمكن حجز غرف التبريد وكبسولات التعافي بالأشعة تحت الحمراء وأحواض الغمر الباردة بفترة تحضير 15 دقيقة عبر قسم الخدمات في التطبيق أو مباشرة مع كونسيرج الاستقبال عند الدخول.',
  },
  'ct.faq.3.q': { en: 'CAN GUESTS ACCESS THE STRENGTH SANCTUARY?', ar: 'هل يمكن للضيوف الوصول إلى معبد الحديد؟' },
  'ct.faq.3.a': {
    en: 'Each active athlete receives 2 VIP Guest Day-Passes per month. All guests must complete telemetry and digital waiver processing at the concierge kiosk before equipment access is authorized.',
    ar: 'كل رياضي نشط يحصل على تصريحين يوميين لضيوف VIP شهريًا. يجب على جميع الضيوف إكمال معالجة القياسات والتوقيع الرقمي في كشك الكونسيرج قبل تصريح الوصول إلى المعدات.',
  },
  'ct.faq.4.q': { en: 'HOW DO BILLING PAUSES & TRAVEL FREEZES WORK?', ar: 'كيف تعمل إيقافات الفواتير وتجميدات السفر؟' },
  'ct.faq.4.a': {
    en: "Members can pause their active billing cycles for up to 60 calendar days per year through the Athlete Portal or by submitting a ticket under the 'Billing & Ops' category above.",
    ar: 'يمكن للأعضاء إيقاف دورات الفواتير النشطة لمدة تصل إلى 60 يومًا تقويميًا سنويًا من خلال بوابة الرياضي أو عن طريق تقديم تذكرة تحت فئة "الفواتير والعمليات" أعلاه.',
  },

  /* ---------- Safety ---------- */
  'ct.safety.title': { en: 'STAFF SAFETY DESK', ar: 'مكتب سلامة الطاقم' },
  'ct.safety.sub':   { en: 'Dedicated on-site first responders', ar: 'مسعفون مخصصون في الموقع' },
  'ct.safety.cta':   { en: 'URGENT', ar: 'عاجل' },

  /* ---------- CTA ---------- */
  'ct.cta.eyebrow': { en: 'READY TO ENTER THE ARENA?', ar: 'مستعد لدخول الساحة؟' },
  'ct.cta.h2a':     { en: 'BOOK YOUR',                ar: 'احصل على' },
  'ct.cta.h2b':     { en: '7-DAY ACCESS PASS.',       ar: 'تصريح وصول 7 أيام.' },
  'ct.cta.desc': {
    en: "Free biometric baseline, full floor access and one coached session. If we're not your gym, you walk away owing nothing.",
    ar: 'خط أساس حيوي مجاني، دخول كامل للأرضية، وجلسة تدريب واحدة. إذا لم نكن ناديك، تغادر دون أي التزام.',
  },
  'ct.cta.btn': { en: 'START FREE WEEK', ar: 'ابدأ أسبوعًا مجانيًا' },
  'ct.cta.ghost': { en: 'CONTACT', ar: 'تواصل' },

  /* ---------- Mobile tabbar ---------- */
  'ct.tab.home':       { en: 'HOME',       ar: 'الرئيسية' },
  'ct.tab.facilities': { en: 'FACILITIES', ar: 'المرافق' },
  'ct.tab.services':   { en: 'SERVICES',   ar: 'الخدمات' },
  'ct.tab.join':       { en: 'JOIN NOW',   ar: 'انضم الآن' },

    /* ============================================================
     NEW KEYS — Batch B (photo upload, real registration)
  ============================================================ */

  'en.field.iqama':       { en: 'IQAMA NUMBER',                              ar: 'رقم الإقامة' },
  'en.field.age':         { en: 'AGE',                                       ar: 'العمر' },
  'en.field.gender':      { en: 'GENDER',                                    ar: 'الجنس' },
  'en.field.address':     { en: 'ADDRESS',                                   ar: 'العنوان' },
  'en.field.password':    { en: 'PASSWORD',                                  ar: 'كلمة المرور' },
  'en.field.password2':   { en: 'CONFIRM PASSWORD',                          ar: 'تأكيد كلمة المرور' },
  'en.field.duration':    { en: 'DURATION (months)',                         ar: 'المدة (بالأشهر)' },
  'en.field.months':      { en: 'MO',                                        ar: 'شهر' },

  'en.err.iqama':         { en: 'ENTER IQAMA #',                             ar: 'أدخل رقم الإقامة' },
  'en.err.age':           { en: 'VALID AGE (12–100)',                        ar: 'عمر صالح (12–100)' },
  'en.err.password':      { en: 'MIN 8 CHARACTERS',                          ar: '8 أحرف على الأقل' },
  'en.err.password2':     { en: 'PASSWORDS DO NOT MATCH',                    ar: 'كلمتا المرور غير متطابقتين' },


  'en.ok.backHome':       { en: 'BACK TO HOME',                              ar: 'العودة للرئيسية' },
  'en.ok.reference':      { en: 'Reference',                                 ar: 'المرجع' },

  'en.plan.loading':      { en: 'Loading plans…',                            ar: 'جارٍ تحميل الخطط…' },
  'en.plan.loadError':    { en: 'Could not load plans from server.',         ar: 'تعذّر تحميل الخطط من الخادم.' },
  'en.plan.noFeatures':   { en: 'No features listed.',                       ar: 'لا مزايا مدرجة.' },
  /* ---------- Phase 3: admin-editable values ---------- */
  'meta.description': { en: "Smart Gym — premium training facilities, coaching and recovery with biometric access.", ar: "سمارت جيم — مرافق تدريب متميزة وتدريب شخصي وتعافٍ مع دخول بالقياسات الحيوية." },
  'home.cl.hrVal': { en: "142", ar: "142" },
  'home.cl.pwrVal': { en: "940", ar: "940" },
  'home.cl.capVal': { en: "82%", ar: "82%" },
  'home.floor.tile1.v': { en: "418", ar: "418" },
  'home.floor.tile2.v': { en: "41,320", ar: "41,320" },
  'home.floor.tile3.v': { en: "386", ar: "386" },
  'home.floor.tile4.v': { en: "0", ar: "0" },
  'home.pf.s1.v': { en: "99.4%", ar: "99.4%" },
  'home.pf.s2.v': { en: "1.4M+", ar: "1.4M+" },
  'home.pf.s3.v': { en: "24/7", ar: "24/7" },
  'home.pf.s4.v': { en: "0.02s", ar: "0.02s" },
  'home.fc.cta': { en: "EXPLORE", ar: "استكشف" },
  'svc.card1.price': { en: "$120", ar: "$120" },
  'svc.card2.price': { en: "$160", ar: "$160" },
  'svc.card3.price': { en: "$95", ar: "$95" },
  'svc.card4.price': { en: "$140", ar: "$140" },
  'svc.card5.price': { en: "$85", ar: "$85" },
  'svc.card1.labName': { en: "KORTEX-V5", ar: "KORTEX-V5" },
  'svc.card2.labName': { en: "RPE-9 MATRIX", ar: "RPE-9 MATRIX" },
  'svc.card3.labName': { en: "DEXA 360", ar: "DEXA 360" },
  'svc.card4.labName': { en: "650 PSI PEAK", ar: "650 PSI PEAK" },
  'svc.card5.labName': { en: "4X WASHOUT", ar: "4X WASHOUT" },
  'svc.tel.lactateV': { en: "3.8 mmol/L", ar: "3.8 مليمول/لتر" },
  'svc.tel.maxO2V': { en: "58.4 ml/kg", ar: "58.4 مل/كغ" },
  'ins.m1.v': { en: "1,420", ar: "1,420" },
  'ins.m2.v': { en: "94.2", ar: "94.2" },
  'ins.m3.v': { en: "3.8L", ar: "3.8 لتر" },
  'ins.m4.v': { en: "+18.4%", ar: "+18.4%" },
  'ins.card.readMin': { en: "{{n}} MIN READ", ar: "{{n}} دقائق قراءة" },
  'ins.loading': { en: "Loading articles…", ar: "جارٍ تحميل المقالات…" },
  'ins.error': { en: "Articles could not be loaded. Please refresh the page.", ar: "تعذّر تحميل المقالات. يرجى تحديث الصفحة." },
  'ins.news.sending': { en: "SUBSCRIBING…", ar: "جارٍ الاشتراك…" },
  'ins.news.error': { en: "Subscription failed. Please try again.", ar: "فشل الاشتراك. يرجى المحاولة مرة أخرى." },
  'ct.phone': { en: "+1 800 555 9090", ar: "+1 800 555 9090" },
  'ct.whatsapp': { en: "+1 800 555 9090", ar: "+1 800 555 9090" },
  'ct.map.coords': { en: "35.6762° N, 139.6503° E", ar: "35.6762° شمالًا، 139.6503° شرقًا" },
  'ct.map.url': { en: "https://maps.google.com/?q=35.6762,139.6503", ar: "https://maps.google.com/?q=35.6762,139.6503" },
  'ct.f.sending': { en: "SENDING…", ar: "جارٍ الإرسال…" },
  'ct.f.error': { en: "Your message could not be sent. Please try again.", ar: "تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى." },
  'art.back': { en: "All insights", ar: "كل المقالات" },
  'art.loading': { en: "Loading article…", ar: "جارٍ تحميل المقال…" },
  'art.missing.title': { en: "Article not found", ar: "المقال غير موجود" },
  'art.missing.desc': { en: "This article may have been moved or unpublished.", ar: "ربما نُقل هذا المقال أو أُلغي نشره." },
  'art.more': { en: "MORE INSIGHTS", ar: "المزيد من المقالات" },
  'nf.title': { en: "Page not found", ar: "الصفحة غير موجودة" },
  'nf.desc': { en: "The page you are looking for does not exist or has moved.", ar: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." },
  'nf.home': { en: "BACK TO HOME", ar: "العودة إلى الرئيسية" },
  /* ---------- Phase 3: admin-editable values ---------- */
  'en.pass.pending': { en: "PASS #PENDING", ar: "التصريح #قيد الانتظار" },
  'en.gender.male': { en: "Male", ar: "ذكر" },
  'en.gender.female': { en: "Female", ar: "أنثى" },
  'en.gender.other': { en: "Other", ar: "آخر" },
  'en.field.addressPh': { en: "City, Street, Building", ar: "المدينة، الشارع، المبنى" },
  'en.photo.live': { en: "LIVE PHOTO — used to verify your face at the gym entrance", ar: "صورة مباشرة — تُستخدم للتحقق من وجهك عند مدخل النادي" },
  'en.photo.take': { en: "TAKE A PHOTO", ar: "التقط صورة" },
  'en.p2.continuePay': { en: "CONTINUE TO SECURE PAYMENT", ar: "متابعة إلى الدفع الآمن" },
  'en.p2.payAmount': { en: "PAY SAR {{amount}}", ar: "ادفع {{amount}} ر.س" },
  'en.p2.ref': { en: "REF #", ar: "المرجع #" },
  'en.p2.secureNote': { en: "Card and STC Pay details are entered on Moyasar's secure form and never reach our servers.", ar: "تُدخل بيانات البطاقة و STC Pay في نموذج ميسر الآمن ولا تصل إلى خوادمنا أبدًا." },
  'en.sum.tax': { en: "Tax (0%)", ar: "الضريبة (0%)" },
  'pay.title': { en: "Payment", ar: "الدفع" },
  'pay.verifying.title': { en: "CONFIRMING PAYMENT", ar: "جارٍ تأكيد الدفع" },
  'pay.verifying.sub': { en: "Verifying your payment with Moyasar. Please don't close this page.", ar: "نتحقق من دفعتك مع ميسر. يرجى عدم إغلاق هذه الصفحة." },
  'pay.paid.title': { en: "PAYMENT CONFIRMED", ar: "تم تأكيد الدفع" },
  'pay.paid.sub': { en: "Your registration is now pending admin approval. You'll receive an email once your membership is activated.", ar: "تسجيلك الآن بانتظار موافقة الإدارة. ستصلك رسالة بريد إلكتروني عند تفعيل عضويتك." },
  'pay.pass.iqama': { en: "IQAMA #", ar: "رقم الإقامة" },
  'pay.pass.duration': { en: "DURATION", ar: "المدة" },
  'pay.pass.status': { en: "STATUS", ar: "الحالة" },
  'pay.pass.pending': { en: "PENDING APPROVAL", ar: "بانتظار الموافقة" },
  'pay.note.pre': { en: "Confirmation goes to", ar: "يُرسل التأكيد إلى" },
  'pay.note.iqama': { en: "Keep your Iqama number —", ar: "احتفظ برقم إقامتك —" },
  'pay.note.post': { en: "— you'll use it at gym entry.", ar: "— ستستخدمه عند دخول النادي." },
  'pay.pending.title': { en: "PAYMENT PROCESSING", ar: "الدفع قيد المعالجة" },
  'pay.failed.title': { en: "PAYMENT NOT COMPLETED", ar: "لم يكتمل الدفع" },
  'pay.failed.note': { en: "You haven't been charged for this attempt. Your details are saved — go back, retake your photo and try again.", ar: "لم يتم خصم أي مبلغ في هذه المحاولة. بياناتك محفوظة — عد والتقط صورتك مجددًا ثم حاول مرة أخرى." },
  'pay.error.title': { en: "SOMETHING WENT WRONG", ar: "حدث خطأ ما" },
  'pay.retry': { en: "TRY AGAIN", ar: "حاول مرة أخرى" },
  'pay.msg.noRef': { en: "No payment reference was returned.", ar: "لم يتم إرجاع مرجع للدفع." },
  'pay.msg.declined': { en: "The payment was declined.", ar: "تم رفض الدفع." },
  'pay.msg.review': { en: "Your payment needs a manual check by our team. We will contact you by email.", ar: "تحتاج دفعتك إلى مراجعة يدوية من فريقنا. سنتواصل معك عبر البريد الإلكتروني." },
  'pay.msg.stillConfirming': { en: "We are still confirming your payment. You will receive an email once it is confirmed — no need to pay again.", ar: "ما زلنا نؤكد دفعتك. ستصلك رسالة بريد إلكتروني عند التأكيد — لا حاجة للدفع مرة أخرى." },
  'cam.alt': { en: "Captured face photo", ar: "صورة الوجه الملتقطة" },
  'cam.hint.captured': { en: "Photo captured. Make sure your whole face is clear and well lit.", ar: "تم التقاط الصورة. تأكد أن وجهك بالكامل واضح ومضاء جيدًا." },
  'cam.hint.live': { en: "Face the camera in good light, remove sunglasses or caps, and keep your face inside the oval.", ar: "واجه الكاميرا في إضاءة جيدة، وانزع النظارات الشمسية أو القبعات، وأبقِ وجهك داخل الإطار البيضاوي." },
  'cam.open': { en: "OPEN CAMERA", ar: "افتح الكاميرا" },
  'cam.retry': { en: "TRY AGAIN", ar: "حاول مرة أخرى" },
  'cam.waiting': { en: "WAITING FOR CAMERA…", ar: "بانتظار الكاميرا…" },
  'cam.capture': { en: "CAPTURE PHOTO", ar: "التقط الصورة" },
  'cam.retake': { en: "RETAKE", ar: "إعادة الالتقاط" },
  'cam.err.insecure': { en: "Camera needs a secure connection — open the site over https.", ar: "تحتاج الكاميرا إلى اتصال آمن — افتح الموقع عبر https." },
  'cam.err.unsupported': { en: "This browser does not support camera access. Try the latest Chrome, Edge, Safari or Firefox.", ar: "هذا المتصفح لا يدعم الوصول إلى الكاميرا. جرّب أحدث إصدار من Chrome أو Edge أو Safari أو Firefox." },
  'cam.err.denied': { en: "Camera permission was denied. Click the camera icon in the address bar, allow access, then try again.", ar: "تم رفض إذن الكاميرا. انقر على أيقونة الكاميرا في شريط العنوان واسمح بالوصول ثم حاول مرة أخرى." },
  'cam.err.notFound': { en: "No camera was found on this device.", ar: "لم يتم العثور على كاميرا في هذا الجهاز." },
  'cam.err.busy': { en: "The camera is in use by another app (e.g. Zoom/Teams). Close it and try again.", ar: "الكاميرا مستخدمة من تطبيق آخر (مثل Zoom أو Teams). أغلقه ثم حاول مرة أخرى." },
  'cam.err.generic': { en: "Could not start the camera.", ar: "تعذّر تشغيل الكاميرا." },
  'cam.err.starting': { en: "Camera is still starting — wait a moment and try again.", ar: "الكاميرا ما زالت تبدأ — انتظر لحظة ثم حاول مرة أخرى." },
  'cam.err.capture': { en: "Could not capture the photo. Try again.", ar: "تعذّر التقاط الصورة. حاول مرة أخرى." },
};

