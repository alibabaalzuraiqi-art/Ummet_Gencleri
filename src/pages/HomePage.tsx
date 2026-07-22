import { ArrowLeft, Users, CalendarDays, GraduationCap, HeartHandshake, Sparkles, Target, TrendingUp, Award, BookOpen, ChevronLeft, Crown, UserCog, Megaphone, ShieldCheck, Wallet, Network } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCounter from '../components/StatCounter';
import EventCard from '../components/EventCard';
import { stats, committeeOrder, committeeMeta, type CommitteeId } from '../data/mockData';

const committeeIcons: Record<CommitteeId, typeof Crown> = {
  presidency: Crown,
  'vice-presidency': UserCog,
  media: Megaphone,
  academic: GraduationCap,
  supervisory: ShieldCheck,
  activities: CalendarDays,
  finance: Wallet,
};

export default function HomePage() {
  const { news, events, setView } = useApp();
  const upcoming = events.filter((e) => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-16 lg:pt-20">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-navy-700/40 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-navy-600/30 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container-app relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              نُمكّن الشباب، نبني المستقبل
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white lg:text-6xl">
              اتحاد شباب الأمة
              <span className="mt-2 block bg-gradient-to-l from-gold-300 to-gold-500 bg-clip-text text-2xl font-bold text-transparent lg:text-3xl">
                نحو جيلٍ واعٍ ومسؤول
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-300 lg:mx-0 lg:text-lg">
              اتحاد شبابي يجمع طلاب الجامعات تحت مظلة واحدة، لتعزيز الهوية، وتنمية
              المهارات، وبناء قادة الغد عبر برامج تثقيفية وتدريبية وتطوعية متكاملة.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                onClick={() => setView({ kind: 'programs' })}
                className="btn-gold"
              >
                تصفح البرامج
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView({ kind: 'about' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                تعرّف على الاتحاد
              </button>
              <button
                onClick={() => setView({ kind: 'board' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-400/30 bg-gold-500/10 px-6 py-3 text-sm font-semibold text-gold-200 backdrop-blur-sm transition-all hover:bg-gold-500/20"
              >
                الهيئة التنفيذية
              </button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="شباب الأمة"
                className="rounded-3xl border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-navy-900">+38%</div>
                    <div className="text-xs text-gray-500">نمو سنوي</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-navy-900">12</div>
                    <div className="text-xs text-gray-500">جائزة تكريم</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative">
          <svg className="block h-12 w-full text-gray-50 lg:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="container-app -mt-2 py-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCounter value={stats.members} label="عضو مسجل" icon={<Users className="h-6 w-6" />} />
          <StatCounter value={stats.events} label="فعالية منظمة" icon={<CalendarDays className="h-6 w-6" />} />
          <StatCounter value={stats.universities} label="جامعة شريكة" icon={<GraduationCap className="h-6 w-6" />} />
          <StatCounter value={stats.volunteers} label="متطوع نشط" icon={<HeartHandshake className="h-6 w-6" />} />
        </div>
      </section>

      {/* About preview */}
      <section className="container-app py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">
              من نحن
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 lg:text-4xl">
              رسالتنا: بناء جيلٍ يحمل همّ أمته
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              نؤمن أن الشباب هم عماد المستقبل وصناع التغيير. لذلك نعمل على تأهيل
              الطلاب أكاديميًا ومهاريًا، وتعزيز انتمائهم لأمتهم، عبر بيئة شبابية
              محفّزة وبرامج متنوعة تجمع بين العلم والعمل والقيم.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Target, title: 'رؤية واضحة', desc: 'إعداد قادة شباب مؤثرين.' },
                { icon: BookOpen, title: 'تعليم مستمر', desc: 'برامج تدريبية وتثقيفية.' },
                { icon: HeartHandshake, title: 'عمل تطوعي', desc: 'خدمة المجتمع والأمة.' },
                { icon: Sparkles, title: 'إبداع وابتكار', desc: 'مساحات للمبادرات الشبابية.' },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-navy-900">{f.title}</div>
                      <div className="text-xs text-gray-500">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setView({ kind: 'about' })}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-navy-900"
            >
              اقرأ المزيد عن الاتحاد
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="أنشطة الاتحاد"
              className="rounded-3xl shadow-xl"
            />
            <div className="absolute -bottom-5 right-5 left-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:left-auto sm:w-64">
              <div className="text-3xl font-extrabold text-navy-900">+1200</div>
              <div className="text-sm text-gray-500">طالب استفاد من برامجنا هذا العام</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-gold-600">
                الفعاليات
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-navy-900 lg:text-4xl">
                أحدث البرامج القادمة
              </h2>
            </div>
            <button
              onClick={() => setView({ kind: 'programs' })}
              className="hidden items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-navy-900 sm:inline-flex"
            >
              عرض الكل
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="container-app py-16">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-600">
            المركز الإخباري
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 lg:text-4xl">
            آخر أخبار الاتحاد
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article
              key={n.id}
              className="card group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy-800 backdrop-blur-sm">
                  {n.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs text-gray-400">{n.date}</div>
                <h3 className="mt-2 text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                  {n.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                  {n.excerpt}
                </p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-navy-900">
                  اقرأ الخبر
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Board preview */}
      <section className="bg-gray-50 py-16">
        <div className="container-app">
          <div className="mb-8 text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">الهيكل التنظيمي</span>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-900 lg:text-4xl">الهيئة التنفيذية</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
              فريق قيادي متكامل يضم الرئاسة ونائب الرئيس وخمس لجان متخصصة.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {committeeOrder.slice(0, 4).map((id) => {
              const meta = committeeMeta[id];
              const Icon = committeeIcons[id];
              return (
                <button
                  key={id}
                  onClick={() => setView({ kind: 'committee', committeeId: id })}
                  className="card group flex items-center gap-4 p-5 text-right transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy-900">{meta.name}</div>
                    <div className="text-xs text-gray-400">{meta.shortName}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setView({ kind: 'board' })}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:text-navy-900"
            >
              عرض الهيكل التنفيذي بالكامل
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-navy-800 to-navy-950 px-6 py-12 text-center lg:px-16 lg:py-16">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-navy-500/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white lg:text-4xl">
              انضم إلى عائلة اتحاد شباب الأمة
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
              كن جزءًا من مجتمع شبابي فاعل، وشارك في برامج متنوعة تصقل شخصيتك وتوسّع
              آفاقك. التسجيل مفتوح لجميع طلاب الجامعات.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setView({ kind: 'register' })}
                className="btn-gold"
              >
                أنشئ حسابًا الآن
              </button>
              <button
                onClick={() => setView({ kind: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                تواصل معنا
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
