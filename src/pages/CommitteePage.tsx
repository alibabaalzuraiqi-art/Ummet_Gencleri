import {
  Crown, UserCog, Megaphone, GraduationCap, ShieldCheck, CalendarDays, Wallet,
  ChevronLeft, ChevronRight, Mail, CheckCircle2, Users, Lock, ShieldAlert, Briefcase,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { committeeOrder, committeeMeta, type CommitteeId } from '../data/mockData';

const iconMap: Record<string, typeof Crown> = {
  Crown, UserCog, Megaphone, GraduationCap, ShieldCheck, CalendarDays, Wallet,
};

export default function CommitteePage({ committeeId }: { committeeId: CommitteeId }) {
  const { committees, canAccessCommittee, currentUser, setView } = useApp();
  const committee = committees.find((c) => c.id === committeeId);
  const allowed = canAccessCommittee(committeeId);
  const Icon = committee ? (iconMap[committee.icon] || Crown) : Crown;

  if (!committee) return null;

  const idx = committeeOrder.indexOf(committeeId);
  const prev = idx > 0 ? committeeOrder[idx - 1] : null;
  const next = idx < committeeOrder.length - 1 ? committeeOrder[idx + 1] : null;

  const isRestricted =
    currentUser?.role === 'committee-head' && currentUser.committee !== committeeId;

  return (
    <div className="animate-fade-in pt-16 lg:pt-20">
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${committee.color} py-14 lg:py-16`}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="container-app relative">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                  {committeeId === 'presidency' || committeeId === 'vice-presidency' ? 'مكتب تنفيذي' : 'لجنة'}
                </span>
                {isRestricted && (
                  <span className="flex items-center gap-1 rounded-full bg-red-500/30 px-3 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                    <Lock className="h-3 w-3" />
                    وصول محدود
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold text-white lg:text-4xl">{committee.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">{committee.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-app py-12">
        {isRestricted ? (
          <AccessDenied committeeId={committeeId} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Head profile */}
            <div className="lg:col-span-1">
              <div className="card overflow-hidden">
                <div className={`h-24 bg-gradient-to-br ${committee.color}`} />
                <div className="-mt-12 px-6 pb-6 text-center">
                  <img
                    src={committee.head.photo}
                    alt={committee.head.name}
                    className="mx-auto h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg"
                  />
                  <h3 className="mt-3 text-lg font-extrabold text-navy-900">{committee.head.name}</h3>
                  <p className="text-sm font-semibold text-navy-600">{committee.head.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-500">{committee.head.bio}</p>
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-500">
                    <Mail className="h-3.5 w-3.5" />
                    <span dir="ltr">{committee.head.email}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {committee.stats.map((s) => (
                  <div key={s.label} className="card p-3 text-center">
                    <div className="text-lg font-extrabold text-navy-900">{s.value}</div>
                    <div className="text-[10px] text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsibilities + members */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
                  <Briefcase className="h-5 w-5 text-navy-600" />
                  المهام والمسؤوليات
                </h3>
                <ul className="mt-4 space-y-3">
                  {committee.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 card p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
                  <Users className="h-5 w-5 text-navy-600" />
                  أعضاء {committee.shortName}
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {committee.members.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50">
                      <img src={m.photo} alt={m.name} className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <div className="text-sm font-bold text-navy-900">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nav between committees */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-6">
          {prev ? (
            <button
              onClick={() => { setView({ kind: 'committee', committeeId: prev }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              <ChevronRight className="h-4 w-4" />
              {committeeMeta[prev].name}
            </button>
          ) : (
            <button
              onClick={() => setView({ kind: 'board' })}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              <ChevronRight className="h-4 w-4" />
              الهيئة التنفيذية
            </button>
          )}
          {next ? (
            <button
              onClick={() => { setView({ kind: 'committee', committeeId: next }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              {committeeMeta[next].name}
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setView({ kind: 'board' })}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
            >
              الهيئة التنفيذية
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AccessDenied({ committeeId }: { committeeId: CommitteeId }) {
  const { currentUser, setView } = useApp();
  const myCommittee = currentUser?.committee
    ? committeeMeta[currentUser.committee].name
    : '';

  return (
    <div className="mx-auto max-w-lg py-10">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-rose-600 to-rose-800 px-6 py-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-white">غير مصرح بالوصول</h2>
          <p className="mt-2 text-sm text-white/80">
            لا تملك صلاحية الوصول إلى هذه الصفحة
          </p>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm leading-relaxed text-gray-600">
            أنت مسجّل الدخول كـ <span className="font-bold text-navy-900">مسؤول {myCommittee}</span>،
            ويمكنك فقط الوصول إلى صفحة لجنتك الخاصة. صفحة{' '}
            <span className="font-bold text-navy-900">{committeeMeta[committeeId].name}</span> متاحة
            لرئيس الاتحاد أو مسؤول اللجنة المختص فقط.
          </p>
          <div className="mt-5 rounded-xl bg-navy-50 p-4 text-right text-sm">
            <div className="font-bold text-navy-900">دورك الحالي:</div>
            <div className="mt-1 text-navy-700">
              {currentUser?.role === 'president' ? 'رئيس الاتحاد' : `مسؤول ${myCommittee}`}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {currentUser?.committee && (
              <button
                onClick={() => setView({ kind: 'committee', committeeId: currentUser.committee! })}
                className="btn-primary"
              >
                الذهاب إلى لجنتي ({committeeMeta[currentUser.committee].shortName})
              </button>
            )}
            <button
              onClick={() => setView({ kind: 'board' })}
              className="btn-ghost"
            >
              العودة للهيئة التنفيذية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
