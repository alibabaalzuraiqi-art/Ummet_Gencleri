import { useState } from 'react';
import {
  BookOpen, FileText, Home, Bus, Library, GraduationCap,
  MapPin, Phone, Clock, ExternalLink, ChevronLeft, Info,
} from 'lucide-react';

type GuideSection = 'registration' | 'housing' | 'transport' | 'libraries';

const sections: { key: GuideSection; label: string; icon: typeof BookOpen; color: string; bg: string }[] = [
  { key: 'registration', label: 'التسجيل الجامعي', icon: GraduationCap, color: 'text-navy-700', bg: 'bg-navy-100' },
  { key: 'housing', label: 'السكن الطلابي', icon: Home, color: 'text-emerald-700', bg: 'bg-emerald-100' },
  { key: 'transport', label: 'المواصلات', icon: Bus, color: 'text-sky-700', bg: 'bg-sky-100' },
  { key: 'libraries', label: 'المكتبات والخدمات الأكاديمية', icon: Library, color: 'text-gold-700', bg: 'bg-gold-100' },
];

const guideContent: Record<GuideSection, { title: string; intro: string; items: { heading: string; body: string; tips?: string[] }[]; contacts?: { label: string; value: string; icon: typeof Phone }[] }> = {
  registration: {
    title: 'دليل التسجيل الجامعي',
    intro: 'كل ما تحتاج معرفته للتسجيل في جامعة أتاتورك بأرضروم، من المستندات المطلوبة إلى خطوات التسجيل الإلكتروني.',
    items: [
      {
        heading: 'المستندات المطلوبة',
        body: 'تأكد من إعداد جميع المستندات التالية قبل بدء عملية التسجيل:',
        tips: [
          'جواز السفر الأصلي + صورة مصدقة عنه',
          'شهادة الثانوية العامة مصدقة ومترجمة إلى التركية أو الإنجليزية',
          'صورة شخصية حديثة (6 صور)',
          'كشف درجات التوفق (إن وُجد)',
          'خطاب قبول من الجامعة (إن وُجد)',
        ],
      },
      {
        heading: 'خطوات التسجيل الإلكتروني',
        body: 'يمكنك التسجيل عبر البوابة الإلكترونية للجامعة باتباع الخطوات التالية:',
        tips: [
          'الدخول إلى موقع جامعة أتاتورك: eru.edu.tr',
          'إنشاء حساب طالب جديد في نظام التسجيل',
          'تعبئة البيانات الشخصية والأكاديمية بدقة',
          'رفع المستندات المطلوبة بصيغة PDF',
          'مراجعة الطلب وإرساله',
        ],
      },
      {
        heading: 'رسوم التسجيل',
        body: 'تختلف الرسوم حسب التخصص ونوع القبول. الطلاب الدوليون قد يستفيدون من منحة تقليل الرسوم. راجع صفحة الرسوم على موقع الجامعة لمعرفة التفاصيل.',
      },
    ],
    contacts: [
      { label: 'قسم شؤون الطلاب الدوليين', value: '+90 442 231 0000', icon: Phone },
      { label: 'موقع التسجيل', value: 'eru.edu.tr/ogrenci', icon: ExternalLink },
    ],
  },
  housing: {
    title: 'دليل السكن الطلبي',
    intro: 'خيارات السكن المتاحة للطلاب في مدينة أرضروم، من سكن الجامعة إلى الشقق الخاصة.',
    items: [
      {
        heading: 'سكن الطلاب الحكومي (KYK)',
        body: 'يوفر مركز KYK سكنًا طلابيًا بأسعار مدعومة. التسجيل يكون عبر الموقع الإلكتروني في موعد محدد سنويًا.',
        tips: [
          'الموقع: حي ينيشهير، أرضروم',
          'الرسوم الشهرية: تقريبًا 500-800 ليرة تركية',
          'تشمل: وجبات، إنترنت، غسيل',
          'التسجيل عبر: kyk.gov.tr',
        ],
      },
      {
        heading: 'الشقق الخاصة',
        body: 'تتوفر شقق مفروشة وغير مفروشة في محيط الجامعة. يفضل البحث المبكر قبل بداية العام الدراسي.',
        tips: [
          'السعر الشهري لشقة 1+1: 4000-7000 ليرة',
          'السعر الشهري لشقة 2+1: 6000-10000 ليرة',
          'يفضل السكن في أحياء: ينيشهير، كازيم كارابيكير، مركز المدينة',
        ],
      },
      {
        heading: 'السكن العائلي (Aile Yanı)',
        body: 'خيار اقتصادي للإقامة مع عائلة تركية، يشمل غرفة ووجبات. مناسب للطلاب الذين يفضلون بيئة هادئة.',
        tips: [
          'السعر الشهري: 3000-5000 ليرة (شامل الوجبات)',
          'يمكن البحث عنه عبر مجموعات فيسبوك للطلاب العرب في أرضروم',
        ],
      },
    ],
    contacts: [
      { label: 'مركز KYK للسكن الطلابي', value: '+90 442 213 0000', icon: Phone },
      { label: 'موقع KYK', value: 'kyk.gov.tr', icon: ExternalLink },
    ],
  },
  transport: {
    title: 'دليل المواصلات',
    intro: 'كيفية التنقل في مدينة أرضروم بين الجامعة والسكن والمناطق الحيوية.',
    items: [
      {
        heading: 'الحافلات البلدية',
        body: 'تغطي حافلات البلدية معظم أنحاء المدينة بتذكرة موحدة رخيصة.',
        tips: [
          'سعر التذكرة: 15 ليرة تركية',
          'يمكن استخدام بطاقة ErzurumKart للدفع',
          'الخطوط 1 و 3 تصل إلى الحرم الجامعي',
          'المواعيد: 6:00 صباحًا - 11:30 مساءً',
        ],
      },
      {
        heading: 'المترو (صغير)',
        body: 'يوجد خط مترو صغير يربط بين وسط المدينة ومحطة الحافلات، مرورًا ببعض المناطق الطلابية.',
        tips: [
          'المحطات الرئيسية: أزiziye، كازيم كارابيكير، الحرم الجامعي',
          'سعر التذكرة: 15 ليرة',
          'المواعيد: 6:00 - 24:00',
        ],
      },
      {
        heading: 'سيارات الأجرة',
        body: 'تتوفر سيارات الأجرة في جميع أنحاء المدينة. يفضل استخدام تطبيقات مثل BiTaksi للحصول على أسعار أفضل.',
        tips: [
          'السعر الأدنى: 30 ليرة',
          'تطبيق BiTaksi متاح في أرضروم',
        ],
      },
    ],
    contacts: [
      { label: 'شركة البلدية للمواصلات', value: '+90 442 215 0000', icon: Phone },
      { label: 'تطبيق BiTaksi', value: 'bitaksi.com', icon: ExternalLink },
    ],
  },
  libraries: {
    title: 'المكتبات والخدمات الأكاديمية',
    intro: 'المكتبات ومراكز الدراسة والخدمات الأكاديمية المتاحة للطلاب في جامعة أتاتورك.',
    items: [
      {
        heading: 'مكتبة جامعة أتاتورك المركزية',
        body: 'مكتبة كبيرة تضم آلاف الكتب والمراجع باللغات التركية والإنجليزية والعربية. توفر أماكن للدراسة الفردية والجماعية.',
        tips: [
          'الموقع: داخل الحرم الجامعي الرئيسي',
          'مواعيد العمل: 8:00 صباحًا - 12:00 منتصف الليل',
          'خدمة استعارة الكتب مجانية للطلاب المسجلين',
          'توفر إنترنت مجاني وغرف دراسة',
        ],
      },
      {
        heading: 'قواعد البيانات الإلكترونية',
        body: 'تتيح الجامعة لطلابها الوصول إلى قواعد بيانات أكاديمية عالمية مجانًا عبر حساب الطالب.',
        tips: [
          'EBSCO, Scopus, Web of Science',
          'JSTOR, ScienceDirect',
          'الوصول عبر: library.eru.edu.tr',
        ],
      },
      {
        heading: 'مركز الدعم الأكاديمي',
        body: 'يقدم المركز خدمات الدعم الدراسي للطلاب الذين يواجهون صعوبات في المواد، بالإضافة إلى دورات تقوية.',
        tips: [
          'دروس تقوية مجانية في الرياضيات والفيزياء واللغة الإنجليزية',
          'استشارات أكاديمية فردية',
          'الموقع: مبنى الدعم الطلابي',
        ],
      },
    ],
    contacts: [
      { label: 'المكتبة المركزية', value: '+90 442 231 0000', icon: Phone },
      { label: 'المكتبة الإلكترونية', value: 'library.eru.edu.tr', icon: ExternalLink },
    ],
  },
};

export default function StudentGuide() {
  const [activeSection, setActiveSection] = useState<GuideSection>('registration');
  const content = guideContent[activeSection];
  const activeConfig = sections.find((s) => s.key === activeSection)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-gray-50 pt-20 lg:pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-l from-navy-900 to-navy-950 py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-app relative">
          <div className="flex items-center gap-3 text-gold-400">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm font-bold tracking-wide">دليل الطالب</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">دليلك الشامل للحياة في أرضروم</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
            كل ما يحتاجه الطالب الجديد في مدينة أرضروم وجامعة أتاتورك، من التسجيل الجامعي إلى السكن والمواصلات والخدمات الأكاديمية.
          </p>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden p-2">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                        activeSection === section.key
                          ? 'bg-navy-800 text-white shadow'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeSection === section.key ? 'bg-white/20' : section.bg}`}>
                        <Icon className={`h-4 w-4 ${activeSection === section.key ? 'text-white' : section.color}`} />
                      </div>
                      {section.label}
                      {activeSection === section.key && <ChevronLeft className="mr-auto h-4 w-4" />}
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* Quick info card */}
            <div className="mt-4 card bg-gradient-to-br from-navy-50 to-gold-50 p-5">
              <div className="flex items-center gap-2 text-navy-900">
                <Info className="h-5 w-5" />
                <span className="text-sm font-bold">معلومة سريعة</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                أرضروم مدينة جامعية آمنة بمناخ قاري بارد شتاءً. يفضل إعداد ملابس شتوية دافئة قبل القدوم.
              </p>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            {/* Section header */}
            <div className="card overflow-hidden">
              <div className={`flex items-center gap-4 ${activeConfig.bg} p-6`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow ${activeConfig.color}`}>
                  {(() => {
                    const Icon = activeConfig.icon;
                    return <Icon className="h-7 w-7" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-navy-900">{content.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{content.intro}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            {content.items.map((item, idx) => (
              <div key={idx} className="card p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-navy-900">{item.heading}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.body}</p>
                    {item.tips && (
                      <ul className="mt-3 space-y-2">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Contacts */}
            {content.contacts && (
              <div className="card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy-900">
                  <Phone className="h-5 w-5 text-navy-600" />
                  جهات الاتصال المهمة
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {content.contacts.map((contact, i) => {
                    const Icon = contact.icon;
                    return (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">{contact.label}</div>
                          <div className="text-sm font-bold text-navy-900" dir="ltr">{contact.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
