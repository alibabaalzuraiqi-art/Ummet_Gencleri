import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, GraduationCap, CheckCircle2, AlertCircle, Users, Crown, Shield, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { demoAccounts, committeeMeta, type CommitteeId } from '../data/mockData';

export function LoginPage() {
  const { login, loginAs, setView } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [roleOpen, setRoleOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('الرجاء إدخال البريد وكلمة المرور');
      return;
    }
    const ok = login(email.trim());
    if (!ok) setError('البريد الإلكتروني غير مسجل. جرّب: ahmed.yildiz@student.ummet.org');
  };

  const roleLabel = (role: string, committee?: CommitteeId) => {
    if (role === 'president') return 'رئيس الاتحاد';
    if (role === 'committee-head' && committee) return `مسؤول ${committeeMeta[committee].shortName}`;
    return 'طالب';
  };

  return (
    <AuthShell title="تسجيل الدخول" subtitle="ادخل إلى بوابتك الخاصة">
      {/* Quick role login */}
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
          <Crown className="h-3.5 w-3.5" />
          الدخول السريع حسب الدور (محاكاة)
        </div>
        <div className="relative">
          <button
            onClick={() => setRoleOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-xl border border-gold-200 bg-gold-50 px-4 py-3 text-sm font-bold text-gold-800 transition-colors hover:bg-gold-100"
          >
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              اختر دورًا للدخول السريع
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 animate-scale-in rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  onClick={() => { loginAs(a.email); setRoleOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right transition-colors hover:bg-navy-50"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.role === 'president' ? 'bg-gold-100 text-gold-600' : 'bg-navy-100 text-navy-600'}`}>
                    {a.role === 'president' ? <Crown className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy-900">{a.name}</div>
                    <div className="text-[10px] text-gray-400">{roleLabel(a.role, a.committee)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs text-gray-400">أو دخول يدوي</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <div>
          <label className="label-field">البريد الإلكتروني</label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="input-field pr-10"
              placeholder="student@ummet.org"
              dir="ltr"
            />
          </div>
        </div>
        <div>
          <label className="label-field">كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="input-field pr-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          <LogIn className="h-4 w-4" />
          دخول
        </button>
        <div className="rounded-xl bg-navy-50 p-3 text-xs text-navy-700">
          <span className="font-bold">للتجربة كطالب:</span> استخدم ahmed.yildiz@student.ummet.org وأي كلمة مرور.
        </div>
        <p className="text-center text-sm text-gray-500">
          ليس لديك حساب؟{' '}
          <button type="button" onClick={() => setView({ kind: 'register' })} className="font-bold text-navy-700 hover:text-navy-900">
            أنشئ حسابًا
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

export function RegisterPage() {
  const { registerWithApplication, setView } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', university: '', major: '', year: 'السنة الأولى', motivation: '' });
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('بريد إلكتروني غير صالح');
      return;
    }
    registerWithApplication(form.name.trim(), form.email.trim(), form.university.trim() || 'غير محدد', form.major.trim() || 'غير محدد', form.year, form.motivation.trim());
  };

  return (
    <AuthShell title="إنشاء حساب جديد" subtitle="انضم إلى عائلة اتحاد شباب الأمة" wide>
      <div className="mb-4 rounded-xl border border-gold-200 bg-gold-50 p-3 text-xs text-gold-800">
        <span className="font-bold">ملاحظة:</span> بعد إنشاء الحساب، سيكون طلبك قيد المراجعة من قبل إدارة الاتحاد قبل الموافقة والمقابلة.
      </div>
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-field">الاسم الكامل *</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }}
                className="input-field pr-10"
                placeholder="اسمك الكامل"
              />
            </div>
          </div>
          <div>
            <label className="label-field">البريد الإلكتروني *</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(''); }}
                className="input-field pr-10"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="label-field">كلمة المرور *</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(''); }}
              className="input-field pr-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label-field">الجامعة</label>
            <div className="relative">
              <GraduationCap className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className="input-field pr-10"
                placeholder="اسم جامعتك"
              />
            </div>
          </div>
          <div>
            <label className="label-field">التخصص</label>
            <input
              type="text"
              value={form.major}
              onChange={(e) => setForm({ ...form, major: e.target.value })}
              className="input-field"
              placeholder="تخصصك"
            />
          </div>
          <div>
            <label className="label-field">السنة الدراسية</label>
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="input-field"
            >
              <option>السنة الأولى</option>
              <option>السنة الثانية</option>
              <option>السنة الثالثة</option>
              <option>السنة الرابعة</option>
              <option>دراسات عليا</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label-field">دوافع الانضمام</label>
          <textarea
            rows={3}
            value={form.motivation}
            onChange={(e) => setForm({ ...form, motivation: e.target.value })}
            className="input-field resize-none"
            placeholder="اكتب باختصار لماذا ترغب في الانضمام إلى الاتحاد..."
          />
        </div>
        <button type="submit" className="btn-gold w-full">
          <UserPlus className="h-4 w-4" />
          تقديم طلب الانضمام
        </button>
        <p className="text-center text-sm text-gray-500">
          لديك حساب بالفعل؟{' '}
          <button type="button" onClick={() => setView({ kind: 'login' })} className="font-bold text-navy-700 hover:text-navy-900">
            سجّل الدخول
          </button>
        </p>
      </form>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children, wide }: { title: string; subtitle: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-50 via-gray-50 to-navy-100 pt-16 lg:pt-20">
      <div className={`w-full animate-slide-up px-4 py-10 ${wide ? 'max-w-2xl' : 'max-w-md'}`}>
        <div className="card overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-l from-navy-800 to-navy-950 px-6 py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Users className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-white">{title}</h1>
            <p className="mt-1 text-sm text-gray-300">{subtitle}</p>
          </div>
          <div className="p-6 lg:p-8">{children}</div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          اتحاد شباب الأمة
        </div>
      </div>
    </div>
  );
}
