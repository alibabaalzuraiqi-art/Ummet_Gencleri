import { Target, Eye, Heart, Users, GraduationCap, Award, Sparkles, BookOpen, Handshake, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AboutPage() {
  const { setView } = useApp();

  return (
    <div className="animate-fade-in pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 py-16 text-center lg:py-20">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="container-app relative">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-300">من نحن</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">عن اتحاد شباب الأمة</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
            اتحاد شبابي تأسس ليجمع طلاب الجامعات تحت مظلة واحدة، يعزز الهوية ويبني
            المهارات ويصنع القادة.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-app py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">قصتنا</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 lg:text-4xl">من البداية حتى اليوم</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
              <p>
                بدأنا كمجموعة صغيرة من الطلاب المتطوعين يحلمون بمساحة شبابية تجمع
                بين الهمّ والعمل. اليوم، أصبحنا اتحادًا يضم أكثر من 1200 عضو من 24
                جامعة مختلفة.
              </p>
              <p>
                نظّمنا 86 فعالية متنوعة بين ورش عمل ومحاضرات وبرامج تدريبية وحملات
                تطوعية، وخرّجنا قادة شبابًا يقودون اليوم مبادراتهم الخاصة في
                مجتمعاتهم.
              </p>
              <p>
                نؤمن أن بناء الأمة يبدأ من بناء الشاب، وأن كل طالب يحمل في داخله
                طاقة قادرة على التغيير إذا وُجدت البيئة المناسبة.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="h-48 w-full rounded-2xl object-cover lg:h-64" />
            <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="mt-8 h-48 w-full rounded-2xl object-cover lg:h-64" />
            <img src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="h-48 w-full rounded-2xl object-cover lg:h-64" />
            <img src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="mt-8 h-48 w-full rounded-2xl object-cover lg:h-64" />
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: 'رسالتنا', text: 'إعداد جيل شبابي واعٍ ومسؤول، يمتلك المهارات والقيم التي تؤهله لقيادة مستقبل أمته.' },
              { icon: Eye, title: 'رؤيتنا', text: 'أن نكون الاتحاد الشبابي الرائد في تأهيل القادة وتنمية المجتمعات على مستوى المنطقة.' },
              { icon: Heart, title: 'قيمنا', text: 'الانتماء، الإخلاص، التعاون، التميّز، والمسؤولية. مبادئ نلتزم بها في كل ما نقوم به.' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="card p-7 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-white shadow-lg shadow-navy-900/30">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="container-app py-16">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-600">أهدافنا</span>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 lg:text-4xl">ما نسعى لتحقيقه</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: 'تنمية المهارات', desc: 'تطوير القدرات القيادية والإدارية والإعلامية لدى الطلاب.' },
            { icon: GraduationCap, title: 'الإرشاد الأكاديمي', desc: 'دعم الطلاب علميًا وتوجيههم نحو التميز في مساراتهم.' },
            { icon: BookOpen, title: 'التثقيف المستمر', desc: 'محاضرات وندوات تعزز الوعي الثقافي والفكري.' },
            { icon: Handshake, title: 'العمل التطوعي', desc: 'تنظيم حملات ومبادرات تخدم المجتمع وتعزز المسؤولية.' },
            { icon: Sparkles, title: 'دعم الابتكار', desc: 'احتضان المبادرات الشبابية الإبداعية وتطويرها.' },
            { icon: ShieldCheck, title: 'تعزيز الهوية', desc: 'تثبيت قيم الانتماء للأمة لدى جيل الشباب.' },
          ].map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="card flex items-start gap-4 p-5 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{g.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{g.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-app pb-16">
        <div className="rounded-3xl bg-gradient-to-l from-navy-800 to-navy-950 px-6 py-12 text-center lg:py-14">
          <Award className="mx-auto h-12 w-12 text-gold-400" />
          <h2 className="mt-4 text-2xl font-extrabold text-white lg:text-3xl">كن جزءًا من رحلتنا</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">انضم إلى آلاف الطلاب الذين اختاروا أن يكونوا فاعلين في مجتمعاتهم.</p>
          <button onClick={() => setView({ kind: 'register' })} className="btn-gold mt-6">سجّل الآن</button>
        </div>
      </section>
    </div>
  );
}
