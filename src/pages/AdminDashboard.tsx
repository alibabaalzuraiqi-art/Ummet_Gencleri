import { useState } from 'react';
import {
  LayoutDashboard, CalendarDays, Users, ClipboardList, BarChart3, PieChart, TrendingUp,
  Plus, Search, Trash2, Edit3, Mail, GraduationCap, X, CheckCircle2, Clock, FileText, Target, ChevronLeft,
  Video, UserCheck, UserX, CalendarClock, Link2, Inbox,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import BarChart, { DonutChart, LineChart } from '../components/Charts';
import { categoryLabels, categoryColors, applicationStatusLabels, applicationStatusColors, type EventCategory, type UEvent, type StudentApplication, type InterviewInfo } from '../data/mockData';

type AdminTab = 'stats' | 'events' | 'members' | 'plans' | 'applications';

export default function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>('stats');
  const { events, students, suggestions, plans, setEvents, setPlans, reports, contactMessages, applications, scheduleInterview, decideApplication } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="container-app py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
              <LayoutDashboard className="h-4 w-4" />
              لوحة الإدارة
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-navy-900 lg:text-3xl">لوحة تحكم الإدارة</h1>
            <p className="mt-1 text-sm text-gray-500">إدارة الفعاليات والأعضاء والخطط والتقارير.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">إ</div>
            <div>
              <div className="font-bold text-navy-900">مدير الاتحاد</div>
              <div className="text-xs text-gray-400">admin@ummet.org</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
          {([
            { id: 'stats', label: 'الإحصائيات', icon: BarChart3 },
            { id: 'events', label: 'إدارة الفعاليات', icon: CalendarDays },
            { id: 'members', label: 'إدارة الأعضاء', icon: Users },
            { id: 'applications', label: 'طلبات الانضمام', icon: Inbox },
            { id: 'plans', label: 'الخطط والتقارير', icon: ClipboardList },
          ] as { id: AdminTab; label: string; icon: typeof BarChart3 }[]).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                  tab === t.id ? 'bg-navy-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === 'stats' && <StatsTab events={events} students={students} suggestions={suggestions} contactMessages={contactMessages} applications={applications} />}
        {tab === 'events' && <EventsTab events={events} setEvents={setEvents} />}
        {tab === 'members' && <MembersTab students={students} events={events} suggestions={suggestions} />}
        {tab === 'applications' && <ApplicationsTab applications={applications} scheduleInterview={scheduleInterview} decideApplication={decideApplication} />}
        {tab === 'plans' && <PlansTab plans={plans} setPlans={setPlans} reports={reports} />}
      </div>
    </div>
  );
}

/* ---------------- Stats Tab ---------------- */
function StatsTab({ events, students, suggestions, contactMessages, applications }: { events: UEvent[]; students: ReturnType<typeof useApp>['students']; suggestions: ReturnType<typeof useApp>['suggestions']; contactMessages: ReturnType<typeof useApp>['contactMessages']; applications: StudentApplication[] }) {
  const activeStudents = students.filter((s) => s.status === 'active').length;
  const upcoming = events.filter((e) => e.status === 'upcoming').length;
  const past = events.filter((e) => e.status === 'past').length;
  const totalRegistered = events.reduce((s, e) => s + e.registered, 0);
  const pendingApps = applications.filter((a) => a.status === 'pending').length;
  const interviewApps = applications.filter((a) => a.status === 'interview').length;

  const catData = (Object.keys(categoryLabels) as EventCategory[]).map((c) => ({
    label: categoryLabels[c],
    value: events.filter((e) => e.category === c).length,
    color: ['#1e3454', '#d49a24', '#10b981', '#0ea5e9', '#f43f5e'][['workshop', 'lecture', 'volunteer', 'training', 'trip'].indexOf(c)],
  }));

  const monthlyData = [
    { label: 'ينا', value: 45 },
    { label: 'فبر', value: 62 },
    { label: 'مار', value: 80 },
    { label: 'أبر', value: 54 },
    { label: 'ماي', value: 90 },
    { label: 'يون', value: 110 },
    { label: 'يول', value: 132 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: 'إجمالي الطلاب', value: students.length, color: 'bg-navy-800' },
          { icon: CheckCircle2, label: 'طلاب نشطون', value: activeStudents, color: 'bg-emerald-600' },
          { icon: CalendarDays, label: 'فعاليات قادمة', value: upcoming, color: 'bg-gold-500' },
          { icon: Inbox, label: 'طلبات قيد المراجعة', value: pendingApps + interviewApps, color: 'bg-sky-600' },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card p-5">
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${k.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <ChevronLeft className="h-5 w-5 text-gray-300" />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-navy-900">{k.value.toLocaleString('ar-EG')}</div>
              <div className="text-sm text-gray-500">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-navy-900">
              <BarChart3 className="h-5 w-5 text-navy-600" />
              نمو التسجيلات الشهرية
            </h3>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">+24%</span>
          </div>
          <LineChart data={monthlyData} height={220} />
        </div>
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy-900">
            <PieChart className="h-5 w-5 text-navy-600" />
            توزيع الفعاليات
          </h3>
          <DonutChart data={catData} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy-900">
            <BarChart3 className="h-5 w-5 text-navy-600" />
            المشاركة حسب نوع الفعالية
          </h3>
          <BarChart
            data={(Object.keys(categoryLabels) as EventCategory[]).map((c, i) => ({
              label: categoryLabels[c],
              value: events.filter((e) => e.category === c).reduce((s, e) => s + e.registered, 0),
              color: ['#1e3454', '#d49a24', '#10b981', '#0ea5e9', '#f43f5e'][i],
            }))}
            height={200}
          />
        </div>
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy-900">
            <Clock className="h-5 w-5 text-navy-600" />
            آخر الاقتراحات والرسائل
          </h3>
          <div className="space-y-3">
            {suggestions.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-xs font-bold text-navy-700">{s.studentName.charAt(0)}</div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-navy-900">{s.title}</div>
                  <div className="truncate text-xs text-gray-500">{s.body}</div>
                </div>
              </div>
            ))}
            {contactMessages.length === 0 ? (
              <p className="text-sm text-gray-400">لا رسائل جديدة.</p>
            ) : (
              contactMessages.slice(0, 2).map((m) => (
                <div key={m.id} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                  <Mail className="h-4 w-4 shrink-0 text-navy-500 mt-0.5" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-navy-900">{m.subject}</div>
                    <div className="truncate text-xs text-gray-500">{m.name} - {m.body}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Events Tab ---------------- */
function EventsTab({ events, setEvents }: { events: UEvent[]; setEvents: React.Dispatch<React.SetStateAction<UEvent[]>> }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    title: '', category: 'workshop' as EventCategory, date: '', time: '16:00', location: '', description: '', capacity: 50, status: 'upcoming' as 'upcoming' | 'past',
  });

  const openAdd = () => {
    setEditId(null);
    setForm({ title: '', category: 'workshop', date: '', time: '16:00', location: '', description: '', capacity: 50, status: 'upcoming' });
    setModalOpen(true);
  };

  const openEdit = (e: UEvent) => {
    setEditId(e.id);
    const d = new Date(e.date);
    setForm({
      title: e.title,
      category: e.category,
      date: e.date.slice(0, 10),
      time: d.toTimeString().slice(0, 5),
      location: e.location,
      description: e.description,
      capacity: e.capacity,
      status: e.status,
    });
    setModalOpen(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    const iso = new Date(`${form.date}T${form.time}`).toISOString();
    const image = `https://images.pexels.com/photos/${['3184360','256417','6646917','3184339','1549326'][Math.floor(Math.random() * 5)]}/pexels-photo-${['3184360','256417','6646917','3184339','1549326'][Math.floor(Math.random() * 5)]}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
    if (editId) {
      setEvents((prev) => prev.map((ev) => ev.id === editId ? { ...ev, title: form.title, category: form.category, date: iso, location: form.location, description: form.description, capacity: form.capacity, status: form.status } : ev));
    } else {
      const newEvent: UEvent = {
        id: 'e' + Date.now(),
        title: form.title,
        category: form.category,
        date: iso,
        location: form.location,
        description: form.description,
        status: form.status,
        capacity: Number(form.capacity),
        registered: 0,
        image,
      };
      setEvents((prev) => [newEvent, ...prev]);
    }
    setModalOpen(false);
  };

  const remove = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const filtered = events.filter((e) => e.title.includes(search) || e.location.includes(search));

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pr-10"
            placeholder="ابحث عن فعالية..."
          />
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus className="h-4 w-4" />
          إضافة فعالية جديدة
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-bold">الفعالية</th>
                <th className="px-4 py-3 font-bold">التصنيف</th>
                <th className="px-4 py-3 font-bold">التاريخ</th>
                <th className="px-4 py-3 font-bold">التسجيل</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((e) => (
                <tr key={e.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={e.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div className="font-bold text-navy-900">{e.title}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${categoryColors[e.category]}`}>{categoryLabels[e.category]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{new Date(e.date).toLocaleDateString('ar-EG')}</td>
                  <td className="px-4 py-3 text-gray-600">{e.registered}/{e.capacity}</td>
                  <td className="px-4 py-3">
                    {e.status === 'upcoming' ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">قادمة</span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">منتهية</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(e)} className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-50" title="تعديل">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => remove(e.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-600 transition-colors hover:bg-rose-50" title="حذف">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'} maxWidth="max-w-xl">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="label-field">عنوان الفعالية *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="عنوان الفعالية" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">التصنيف</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as EventCategory })} className="input-field">
                {(Object.keys(categoryLabels) as EventCategory[]).map((c) => (
                  <option key={c} value={c}>{categoryLabels[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-field">السعة</label>
              <input type="number" min={1} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} className="input-field" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">التاريخ *</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">الوقت</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label-field">الموقع</label>
            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="مكان الفعالية" />
          </div>
          <div>
            <label className="label-field">الوصف</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" placeholder="وصف الفعالية" />
          </div>
          <div>
            <label className="label-field">الحالة</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'upcoming' | 'past' })} className="input-field">
              <option value="upcoming">قادمة</option>
              <option value="past">منتهية</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost">إلغاء</button>
            <button type="submit" className="btn-primary">
              <CheckCircle2 className="h-4 w-4" />
              {editId ? 'حفظ التعديلات' : 'إضافة'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ---------------- Members Tab ---------------- */
function MembersTab({ students, events, suggestions }: { students: ReturnType<typeof useApp>['students']; events: UEvent[]; suggestions: ReturnType<typeof useApp>['suggestions'] }) {
  const [search, setSearch] = useState('');
  const filtered = students.filter((s) => s.name.includes(search) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pr-10" placeholder="ابحث عن عضو..." />
        </div>
        <span className="text-sm text-gray-500">{students.length} عضو</span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-bold">العضو</th>
                <th className="px-4 py-3 font-bold">الجامعة</th>
                <th className="px-4 py-3 font-bold">التخصص</th>
                <th className="px-4 py-3 font-bold">السنة</th>
                <th className="px-4 py-3 font-bold">فعاليات</th>
                <th className="px-4 py-3 font-bold">اقتراحات</th>
                <th className="px-4 py-3 font-bold">انضم في</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((s) => {
                const sgCount = suggestions.filter((sg) => sg.studentId === s.id).length;
                return (
                  <tr key={s.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">{s.name.charAt(0)}</div>
                        <div>
                          <div className="font-bold text-navy-900">{s.name}</div>
                          <div className="text-xs text-gray-400" dir="ltr">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{s.university}</td>
                    <td className="px-4 py-3 text-gray-600">{s.major}</td>
                    <td className="px-4 py-3 text-gray-600">{s.year}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-700">{s.registeredEvents.length}</span></td>
                    <td className="px-4 py-3"><span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-bold text-gold-700">{sgCount}</span></td>
                    <td className="px-4 py-3 text-gray-500">{s.joinedAt}</td>
                    <td className="px-4 py-3">
                      {s.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> نشط</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-gray-400"><X className="h-3.5 w-3.5" /> غير نشط</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Applications Tab ---------------- */
function ApplicationsTab({
  applications,
  scheduleInterview,
  decideApplication,
}: {
  applications: StudentApplication[];
  scheduleInterview: (id: string, interview: InterviewInfo) => void;
  decideApplication: (id: string, status: 'accepted' | 'rejected', rejectionReason?: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [interviewModal, setInterviewModal] = useState<StudentApplication | null>(null);
  const [decisionModal, setDecisionModal] = useState<StudentApplication | null>(null);
  const [interviewForm, setInterviewForm] = useState({ date: '', time: '16:00', meetingUrl: '' });
  const [decisionForm, setDecisionForm] = useState({ status: 'accepted' as 'accepted' | 'rejected', reason: '' });

  const filtered = applications.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (search && !a.name.includes(search) && !a.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    interview: applications.filter((a) => a.status === 'interview').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const openInterview = (app: StudentApplication) => {
    setInterviewModal(app);
    setInterviewForm({ date: '', time: '16:00', meetingUrl: '' });
  };

  const submitInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewModal || !interviewForm.date) return;
    scheduleInterview(interviewModal.id, { date: interviewForm.date, time: interviewForm.time, meetingUrl: interviewForm.meetingUrl || 'https://meet.google.com/xxx-xxxx-xxx' });
    setInterviewModal(null);
  };

  const openDecision = (app: StudentApplication, status: 'accepted' | 'rejected') => {
    setDecisionModal(app);
    setDecisionForm({ status, reason: '' });
  };

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionModal) return;
    decideApplication(decisionModal.id, decisionForm.status, decisionForm.status === 'rejected' ? decisionForm.reason : undefined);
    setDecisionModal(null);
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {([
          { key: 'all', label: 'الإجمالي', color: 'bg-navy-800' },
          { key: 'pending', label: 'قيد المراجعة', color: 'bg-gold-500' },
          { key: 'interview', label: 'مقابلة مجدولة', color: 'bg-sky-500' },
          { key: 'accepted', label: 'مقبول', color: 'bg-emerald-500' },
          { key: 'rejected', label: 'مرفوض', color: 'bg-rose-500' },
        ] as { key: keyof typeof counts; label: string; color: string }[]).map((c) => (
          <button
            key={c.key}
            onClick={() => setStatusFilter(c.key)}
            className={`card flex items-center gap-3 p-4 text-right transition-all hover:shadow-md ${statusFilter === c.key ? 'ring-2 ring-navy-400' : ''}`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.color} text-white`}>
              <Inbox className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-navy-900">{counts[c.key]}</div>
              <div className="text-xs text-gray-500">{c.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pr-10"
            placeholder="ابحث عن متقدم..."
          />
        </div>
        <span className="text-sm text-gray-500">{filtered.length} طلب</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-bold">المتقدم</th>
                <th className="px-4 py-3 font-bold">الجامعة</th>
                <th className="px-4 py-3 font-bold">تاريخ التقديم</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">المقابلة</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">{a.name.charAt(0)}</div>
                      <div>
                        <div className="font-bold text-navy-900">{a.name}</div>
                        <div className="text-xs text-gray-400" dir="ltr">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{a.university}<div className="text-xs text-gray-400">{a.major}</div></td>
                  <td className="px-4 py-3 text-gray-600">{a.appliedAt}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${applicationStatusColors[a.status]}`}>{applicationStatusLabels[a.status]}</span>
                  </td>
                  <td className="px-4 py-3">
                    {a.interview ? (
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5 text-sky-500" />{new Date(a.interview.date).toLocaleDateString('ar-EG')}</div>
                        <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-sky-500" />{a.interview.time}</div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {a.status === 'pending' && (
                        <button
                          onClick={() => openInterview(a)}
                          className="flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100"
                        >
                          <Video className="h-3.5 w-3.5" />
                          قبول للمقابلة
                        </button>
                      )}
                      {a.status === 'interview' && (
                        <>
                          <button
                            onClick={() => openDecision(a, 'accepted')}
                            className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            قبول نهائي
                          </button>
                          <button
                            onClick={() => openDecision(a, 'rejected')}
                            className="flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                          >
                            <UserX className="h-3.5 w-3.5" />
                            رفض
                          </button>
                        </>
                      )}
                      {(a.status === 'accepted' || a.status === 'rejected') && (
                        <span className="text-xs text-gray-400">تم البت بتاريخ {a.decidedAt}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interview modal */}
      <Modal open={!!interviewModal} onClose={() => setInterviewModal(null)} title="جدولة مقابلة شخصية" maxWidth="max-w-lg">
        {interviewModal && (
          <form onSubmit={submitInterview} className="space-y-4">
            <div className="rounded-xl bg-navy-50 p-3 text-sm">
              <span className="font-bold text-navy-900">{interviewModal.name}</span>
              <span className="text-gray-500"> - {interviewModal.university}</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-field">تاريخ المقابلة *</label>
                <input type="date" value={interviewForm.date} onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="label-field">الوقت</label>
                <input type="time" value={interviewForm.time} onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label-field">رابط المقابلة (Zoom / Meet)</label>
              <div className="relative">
                <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input type="url" value={interviewForm.meetingUrl} onChange={(e) => setInterviewForm({ ...interviewForm, meetingUrl: e.target.value })} className="input-field pr-10" placeholder="https://meet.google.com/..." dir="ltr" />
              </div>
              <p className="mt-1 text-xs text-gray-400">سيظهر الرابط للطالب في لوحة تحكمه.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setInterviewModal(null)} className="btn-ghost">إلغاء</button>
              <button type="submit" className="btn-primary"><Video className="h-4 w-4" />تأكيد وتجدولة</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Decision modal */}
      <Modal open={!!decisionModal} onClose={() => setDecisionModal(null)} title={decisionForm.status === 'accepted' ? 'تأكيد القبول النهائي' : 'رفض الطلب'} maxWidth="max-w-md">
        {decisionModal && (
          <form onSubmit={submitDecision} className="space-y-4">
            <div className={`rounded-xl p-3 text-sm ${decisionForm.status === 'accepted' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              <span className="font-bold">{decisionModal.name}</span>
              <span> - {decisionModal.email}</span>
            </div>
            {decisionForm.status === 'accepted' ? (
              <p className="text-sm text-gray-600">سيتم منح الطالب صلاحيات العضو الكاملة وتفعيل حسابه. سيظهر له تنبيه القبول في لوحة التحكم.</p>
            ) : (
              <div>
                <p className="mb-3 text-sm text-gray-600">سيتم إرسال رسالة شكر واعتذار للطالب. يمكنك إضافة سبب الرفض (اختياري).</p>
                <label className="label-field">سبب الرفض</label>
                <textarea rows={3} value={decisionForm.reason} onChange={(e) => setDecisionForm({ ...decisionForm, reason: e.target.value })} className="input-field resize-none" placeholder="سبب الرفض..." />
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setDecisionModal(null)} className="btn-ghost">إلغاء</button>
              <button type="submit" className={decisionForm.status === 'accepted' ? 'inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98]' : 'inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-all hover:bg-rose-700 active:scale-[0.98]'}>
                {decisionForm.status === 'accepted' ? <><UserCheck className="h-4 w-4" />تأكيد القبول</> : <><UserX className="h-4 w-4" />تأكيد الرفض</>}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

/* ---------------- Plans & Reports Tab ---------------- */
function PlansTab({ plans, setPlans, reports }: { plans: ReturnType<typeof useApp>['plans']; setPlans: React.Dispatch<React.SetStateAction<ReturnType<typeof useApp>['plans']>>; reports: ReturnType<typeof useApp>['reports'] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', quarter: '', owner: '', status: 'planned' as 'planned' | 'in-progress' | 'completed', progress: 0 });

  const addPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setPlans((prev) => [{ id: 'p' + Date.now(), ...form, progress: Number(form.progress) }, ...prev]);
    setForm({ title: '', description: '', quarter: '', owner: '', status: 'planned', progress: 0 });
    setModalOpen(false);
  };

  const statusMap = {
    planned: { label: 'مخطط', cls: 'bg-gray-100 text-gray-600' },
    'in-progress': { label: 'قيد التنفيذ', cls: 'bg-gold-100 text-gold-700' },
    completed: { label: 'مكتمل', cls: 'bg-emerald-100 text-emerald-700' },
  };

  return (
    <div className="space-y-8">
      {/* Plans */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900">
            <Target className="h-5 w-5 text-navy-600" />
            الخطط الإدارية
          </h3>
          <button onClick={() => setModalOpen(true)} className="btn-primary">
            <Plus className="h-4 w-4" />
            خطة جديدة
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((p) => (
            <div key={p.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-base font-bold text-navy-900">{p.title}</h4>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${statusMap[p.status].cls}`}>{statusMap[p.status].label}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{p.description}</p>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">التقدم</span>
                  <span className="font-bold text-navy-900">{p.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full transition-all ${p.progress === 100 ? 'bg-emerald-500' : 'bg-navy-600'}`} style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.quarter}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{p.owner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-navy-900">
          <FileText className="h-5 w-5 text-navy-600" />
          التقارير
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {reports.map((r) => (
            <div key={r.id} className="card flex flex-col p-5 transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-bold text-navy-700">{r.type}</span>
                <span className="text-xs text-gray-400">{r.period}</span>
              </div>
              <h4 className="mt-3 text-base font-bold text-navy-900">{r.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{r.summary}</p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400">{r.date}</span>
                <button className="inline-flex items-center gap-1 text-xs font-bold text-navy-700 hover:text-navy-900">
                  عرض التقرير <ChevronLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="إضافة خطة إدارية">
        <form onSubmit={addPlan} className="space-y-4">
          <div>
            <label className="label-field">عنوان الخطة *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label-field">الوصف</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">الربع الزمني</label>
              <input type="text" value={form.quarter} onChange={(e) => setForm({ ...form, quarter: e.target.value })} className="input-field" placeholder="مثال: الربع الأول 2027" />
            </div>
            <div>
              <label className="label-field">المسؤول</label>
              <input type="text" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">الحالة</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'planned' | 'in-progress' | 'completed' })} className="input-field">
                <option value="planned">مخطط</option>
                <option value="in-progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>
            <div>
              <label className="label-field">نسبة التقدم: {form.progress}%</label>
              <input type="range" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} className="w-full accent-navy-700" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost">إلغاء</button>
            <button type="submit" className="btn-primary"><CheckCircle2 className="h-4 w-4" />إضافة</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
