import { useState } from 'react';
import { HelpCircle, ChevronLeft, Plus, Minus, Users, ClipboardList, Shield } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: typeof HelpCircle;
  color: string;
  bg: string;
  items: FAQItem[];
}

const categories: FAQCategory[] = [
  {
    id: 'join',
    title: 'كيفية الانضمام للاتحاد',
    icon: Users,
    color: 'text-navy-700',
    bg: 'bg-navy-100',
    items: [
      {
        question: 'كيف أصبح عضوًا في اتحاد شباب الأمة؟',
        answer: 'يمكنك التقديم لعضوية الاتحاد عبر إنشاء حساب جديد على موقعنا وتعبئة نموذج طلب الانضمام. سيتم مراجعة طلبك من قبل إدارة الاتحاد، وفي حال الموافقة المبدئية سيتم دعوتك لمقابلة شخصية قبل القبول النهائي.',
      },
      {
        question: 'ما هي شروط الانضمام؟',
        answer: 'يشترط أن يكون المتقدم طالبًا جامعيًا في إحدى الجامعات التركية، وملتزمًا بقيم ومبادئ الاتحاد. يفضل أن يكون لديه اهتمام بالعمل التطوعي والأنشطة الشبابية. لا يُشترط عربيًا، فالاتحاد مفتوح لكل الطلاب المتفقين مع رؤيته.',
      },
      {
        question: 'كم تستغرق عملية القبول؟',
        answer: 'بعد تقديم الطلب، تستغرق المراجعة المبدئية عادة 3-5 أيام عمل. في حال الموافقة المبدئية، يتم جدولة مقابلة شخصية خلال أسبوع. القرار النهائي يُتخذ خلال 2-3 أيام بعد المقابلة.',
      },
      {
        question: 'هل هناك رسوم لعضوية الاتحاد؟',
        answer: 'لا، عضوية اتحاد شباب الأمة مجانية تمامًا. لا توجد أي رسوم تسجيل أو اشتراك شهري. الاتحاد يعتمد على المتطوعين والتبرعات في تمويل أنشطته.',
      },
    ],
  },
  {
    id: 'services',
    title: 'الاستفادة من الخدمات',
    icon: Shield,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    items: [
      {
        question: 'ما الخدمات التي يقدمها الاتحاد للأعضاء؟',
        answer: 'يقدم الاتحاد مجموعة متنوعة من الخدمات تشمل: الأنشطة الرياضية (كرة القدم، التزلج)، الأنشطة الأكاديمية (مؤتمرات، ورش عمل)، الرحلات الترفيهية، الإرشاد الطلابي، دليل الطالب للمدينة، والأنشطة الثقافية والاجتماعية.',
      },
      {
        question: 'كيف أسجل في الفعاليات والأنشطة؟',
        answer: 'بعد تسجيل الدخول إلى حسابك، يمكنك تصفح الفعاليات المتاحة في صفحة "البرامج والأنشطة" والضغط على زر "سجل الآن" في أي فعالية تهمك. ستجد جميع تسجيلاتك في لوحة تحكم الطالب.',
      },
      {
        question: 'هل الفعاليات مفتوحة لغير الأعضاء؟',
        answer: 'بعض الفعاليات العامة مفتوحة للجميع، بينما بعض الأنشطة الخاصة مقتصرة على الأعضاء المسجلين فقط. يمكنك التحقق من حالة الفعالية في صفحة البرامج والأنشطة.',
      },
      {
        question: 'كيف أحصل على دليل الطالب لمدينة أرضروم؟',
        answer: 'يمكنك الوصول إلى دليل الطالب الشامل من القائمة العلوية للموقع. الدليل يحتوي على معلومات مفصلة عن التسجيل الجامعي، السكن الطلابي، المواصلات، والمكتبات والخدمات الأكاديمية.',
      },
    ],
  },
  {
    id: 'committees',
    title: 'المشاركة في اللجان',
    icon: ClipboardList,
    color: 'text-gold-700',
    bg: 'bg-gold-100',
    items: [
      {
        question: 'ما اللجان المتاحة للانضمام إليها؟',
        answer: 'يضم الاتحاد عدة لجان متخصصة: لجنة الإعلام والنشر، اللجنة الرياضية، اللجنة الثقافية، اللجنة الأكاديمية، لجنة التطوع، واللجنة المالية. كل لجنة لها مهام وأهداف محددة.',
      },
      {
        question: 'كيف أنضم إلى لجنة معينة؟',
        answer: 'بعد أن تصبح عضوًا مقبولًا في الاتحاد، يمكنك التواصل مع رئيس اللجنة التي تهمك عبر صفحة "اللجان" في الموقع. سيقوم رئيس اللجنة بتقييم طلبك وإبلاغك بقرار الانضمام.',
      },
      {
        question: 'هل يمكنني الانضمام لأكثر من لجنة؟',
        answer: 'نعم، يمكنك الانضمام إلى لجنتين كحد أقصى في وقت واحد لضمان التزامك الفعلي بكل لجنة. يفضل التركيز على لجنة واحدة في البداية للتأقلم قبل التوسع.',
      },
      {
        question: 'ما هي مسؤوليات عضو اللجنة؟',
        answer: 'تشمل المسؤوليات: حضور اجتماعات اللجنة الدورية، المساهمة في تنظيم الفعاليات، تنفيذ المهام الموكلة إليك، والمشاركة الفعالة في اتخاذ قرارات اللجنة. تختلف التفاصيل حسب نوع اللجنة.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-gray-50 pt-20 lg:pt-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-l from-navy-900 to-navy-950 py-16">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-app relative">
          <div className="flex items-center gap-3 text-gold-400">
            <HelpCircle className="h-6 w-6" />
            <span className="text-sm font-bold tracking-wide">الأسئلة الشائعة</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">إجابات لأكثر أسئلتكم تكرارًا</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
            تجد هنا إجابات شاملة للأسئلة المتعلقة بالانضمام للاتحاد، الاستفادة من الخدمات، والمشاركة في اللجان.
          </p>
        </div>
      </div>

      <div className="container-app py-10">
        <div className="mx-auto max-w-4xl space-y-10">
          {categories.map((category) => {
            const CatIcon = category.icon;
            return (
              <div key={category.id}>
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.bg} ${category.color}`}>
                    <CatIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-navy-900">{category.title}</h2>
                    <p className="text-xs text-gray-500">{category.items.length} أسئلة</p>
                  </div>
                </div>

                {/* Accordion items */}
                <div className="space-y-3">
                  {category.items.map((item, idx) => {
                    const key = `${category.id}-${idx}`;
                    const isOpen = openItems.has(key);
                    return (
                      <div
                        key={key}
                        className={`card overflow-hidden transition-all ${isOpen ? 'ring-2 ring-navy-200' : ''}`}
                      >
                        <button
                          onClick={() => toggleItem(category.id, idx)}
                          className="flex w-full items-center justify-between gap-4 p-5 text-right"
                        >
                          <span className="flex items-center gap-3">
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${isOpen ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
                              {idx + 1}
                            </span>
                            <span className="text-sm font-bold text-navy-900 sm:text-base">{item.question}</span>
                          </span>
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${isOpen ? 'rotate-180 bg-navy-100 text-navy-700' : 'bg-gray-100 text-gray-400'}`}>
                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </div>
                        </button>
                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                              <p className="pr-10 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Contact CTA */}
          <div className="card overflow-hidden bg-gradient-to-l from-navy-800 to-navy-950 p-8 text-center">
            <HelpCircle className="mx-auto h-10 w-10 text-gold-400" />
            <h3 className="mt-4 text-xl font-bold text-white">لم تجد إجابة لسؤالك؟</h3>
            <p className="mt-2 text-sm text-gray-300">تواصل معنا وسنرد على استفسارك في أقرب وقت ممكن.</p>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="btn-gold mt-5 inline-flex">
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
