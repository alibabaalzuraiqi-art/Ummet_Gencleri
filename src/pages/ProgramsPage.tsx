import { useState } from 'react';
import { CalendarDays, CheckCircle2, History, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import { categoryLabels, type EventCategory } from '../data/mockData';

type Tab = 'upcoming' | 'past';

export default function ProgramsPage() {
  const { events } = useApp();
  const [tab, setTab] = useState<Tab>('upcoming');
  const [cat, setCat] = useState<EventCategory | 'all'>('all');

  const filtered = events.filter((e) => {
    if (tab === 'upcoming' && e.status !== 'upcoming') return false;
    if (tab === 'past' && e.status !== 'past') return false;
    if (cat !== 'all' && e.category !== cat) return false;
    return true;
  });

  const upcomingCount = events.filter((e) => e.status === 'upcoming').length;
  const pastCount = events.filter((e) => e.status === 'past').length;

  return (
    <div className="animate-fade-in pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 py-16 text-center lg:py-20">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="container-app relative">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-300">أنشطتنا</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white lg:text-5xl">البرامج والأنشطة</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
            تصفح برامجنا القادمة وسجّل في ما يناسبك، أو استعرض إنجازاتنا في الفعاليات
            السابقة.
          </p>
        </div>
      </section>

      <section className="container-app py-12">
        {/* Tabs */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
            <button
              onClick={() => setTab('upcoming')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                tab === 'upcoming' ? 'bg-navy-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              البرامج القادمة
              <span className={`rounded-full px-2 py-0.5 text-xs ${tab === 'upcoming' ? 'bg-white/20' : 'bg-gray-100'}`}>{upcomingCount}</span>
            </button>
            <button
              onClick={() => setTab('past')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                tab === 'past' ? 'bg-navy-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <History className="h-4 w-4" />
              البرامج السابقة
              <span className={`rounded-full px-2 py-0.5 text-xs ${tab === 'past' ? 'bg-white/20' : 'bg-gray-100'}`}>{pastCount}</span>
            </button>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                cat === 'all' ? 'bg-navy-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              الكل
            </button>
            {(Object.keys(categoryLabels) as EventCategory[]).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c ? 'bg-navy-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {categoryLabels[c]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center justify-center py-20 text-center">
            <CalendarDays className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-gray-500">لا توجد فعاليات في هذا التصنيف حاليًا.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}

        {/* Achievements banner for past tab */}
        {tab === 'past' && (
          <div className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900">إنجازات نفخر بها</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  نظّمنا حتى الآن أكثر من 86 فعالية شملت ورش عمل ومحاضرات وبرامج
                  تدريبية وحملات تطوعية، استفاد منها أكثر من 1200 طالب من 24 جامعة
                  مختلفة. ونواصل العمل على توسيع أثرنا عامًا بعد عام.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
