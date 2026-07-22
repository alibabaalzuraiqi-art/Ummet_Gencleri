import { useEffect, useState } from 'react';
import {
  Menu, X, ChevronDown, Users, Shield, Home, Info, CalendarDays, Mail,
  LogIn, LogOut, LayoutDashboard, Crown, UserCog, Megaphone, GraduationCap,
  ShieldCheck, Wallet, Network, UserRoundCog, Images, BookOpen, HelpCircle,
} from 'lucide-react';
import { useApp, type View } from '../context/AppContext';
import { committeeMeta, committeeOrder, demoAccounts, type CommitteeId } from '../data/mockData';

const committeeIcons: Record<CommitteeId, typeof Crown> = {
  presidency: Crown,
  'vice-presidency': UserCog,
  media: Megaphone,
  academic: GraduationCap,
  supervisory: ShieldCheck,
  activities: CalendarDays,
  finance: Wallet,
};

const navItems: { label: string; view: View; icon: typeof Home }[] = [
  { label: 'الرئيسية', view: { kind: 'home' }, icon: Home },
  { label: 'عن الاتحاد', view: { kind: 'about' }, icon: Info },
  { label: 'البرامج والأنشطة', view: { kind: 'programs' }, icon: CalendarDays },
  { label: 'معرض الصور', view: { kind: 'gallery' }, icon: Images },
  { label: 'دليل الطالب', view: { kind: 'guide' }, icon: BookOpen },
  { label: 'الأسئلة الشائعة', view: { kind: 'faq' }, icon: HelpCircle },
  { label: 'اتصل بنا', view: { kind: 'contact' }, icon: Mail },
];

export default function Navbar() {
  const { view, setView, currentStudent, currentUser, logout, loginAs } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (v: View) => v.kind === view.kind;
  const isBoardActive =
    view.kind === 'board' || view.kind === 'committee';

  const go = (v: View) => {
    setView(v);
    setMobileOpen(false);
    setPortalOpen(false);
    setBoardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const roleLabel = (role: string, committee?: CommitteeId) => {
    if (role === 'president') return 'رئيس الاتحاد';
    if (role === 'committee-head' && committee) return `مسؤول ${committeeMeta[committee].shortName}`;
    return 'طالب';
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <button
          onClick={() => go({ kind: 'home' })}
          className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 text-white shadow-lg shadow-navy-900/30">
            <Users className="h-6 w-6" />
          </div>
          <div className="text-right">
            <div className="text-base font-extrabold leading-tight text-navy-900 lg:text-lg">
              اتحاد شباب الأمة
            </div>
            <div className="text-[10px] font-medium text-gray-500 lg:text-xs">
              Ummet Gençleri Birliği
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.view);
            return (
              <button
                key={item.label}
                onClick={() => go(item.view)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'bg-navy-50 text-navy-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}

          {/* Board dropdown */}
          <div className="relative">
            <button
              onClick={() => setBoardOpen((o) => !o)}
              onBlur={() => setTimeout(() => setBoardOpen(false), 150)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isBoardActive
                  ? 'bg-navy-50 text-navy-800'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-navy-700'
              }`}
            >
              <Network className="h-4 w-4" />
              الهيئة التنفيذية
              <ChevronDown className={`h-4 w-4 transition-transform ${boardOpen ? 'rotate-180' : ''}`} />
            </button>
            {boardOpen && (
              <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 animate-scale-in rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                <button
                  onMouseDown={() => go({ kind: 'board' })}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-bold text-navy-900 transition-colors hover:bg-navy-50"
                >
                  <Network className="h-4 w-4 text-navy-600" />
                  نظرة عامة على الهيئة
                </button>
                <div className="my-1 h-px bg-gray-100" />
                {committeeOrder.map((id) => {
                  const Icon = committeeIcons[id];
                  return (
                    <button
                      key={id}
                      onMouseDown={() => go({ kind: 'committee', committeeId: id })}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm font-medium text-gray-700 transition-colors hover:bg-navy-50 hover:text-navy-800"
                    >
                      <Icon className="h-4 w-4 text-navy-500" />
                      {committeeMeta[id].name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Portals dropdown */}
          <div className="relative">
            <button
              onClick={() => setPortalOpen((o) => !o)}
              onBlur={() => setTimeout(() => setPortalOpen(false), 150)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                ['student-dashboard', 'login', 'register', 'admin'].includes(view.kind)
                  ? 'bg-navy-50 text-navy-800'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-navy-700'
              }`}
            >
              البوابات
              <ChevronDown className={`h-4 w-4 transition-transform ${portalOpen ? 'rotate-180' : ''}`} />
            </button>
            {portalOpen && (
              <div className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 animate-scale-in rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                <button
                  onMouseDown={() => go({ kind: 'student-dashboard' })}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-medium text-gray-700 transition-colors hover:bg-navy-50 hover:text-navy-800"
                >
                  <LayoutDashboard className="h-4 w-4 text-navy-600" />
                  بوابة الطالب
                </button>
                <button
                  onMouseDown={() => go({ kind: 'admin' })}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-right text-sm font-medium text-gray-700 transition-colors hover:bg-navy-50 hover:text-navy-800"
                >
                  <Shield className="h-4 w-4 text-navy-600" />
                  لوحة الإدارة
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Role switcher (when logged in as non-student) */}
          {currentUser && currentUser.role !== 'student' && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleOpen((o) => !o)}
                onBlur={() => setTimeout(() => setRoleOpen(false), 150)}
                className="flex items-center gap-2 rounded-xl border border-gold-200 bg-gold-50 px-3 py-2 text-xs font-bold text-gold-800 transition-colors hover:bg-gold-100"
              >
                <UserRoundCog className="h-4 w-4" />
                {roleLabel(currentUser.role, currentUser.committee)}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
              </button>
              {roleOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 animate-scale-in rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    تبديل الدور (محاكاة)
                  </div>
                  {demoAccounts.map((a) => (
                    <button
                      key={a.email}
                      onMouseDown={() => { loginAs(a.email); setRoleOpen(false); }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-xs transition-colors hover:bg-navy-50 ${
                        currentUser.email === a.email ? 'bg-navy-50 font-bold text-navy-900' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
                        {a.role === 'president' ? <Crown className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <div>{a.name}</div>
                        <div className="text-[10px] text-gray-400">{roleLabel(a.role, a.committee)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStudent || (currentUser && currentUser.role === 'student') ? (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => go({ kind: 'student-dashboard' })}
                className="flex items-center gap-2 rounded-xl bg-navy-50 px-3 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                  {(currentStudent?.name || currentUser?.name || '?').charAt(0)}
                </div>
                {(currentStudent?.name || currentUser?.name || '').split(' ')[0]}
              </button>
              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : currentUser ? (
            /* logged in as president / committee-head */
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => go({ kind: 'admin' })}
                className="flex items-center gap-2 rounded-xl bg-navy-50 px-3 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">
                  {(currentUser.name || '?').charAt(0)}
                </div>
                {currentUser.name.split(' ')[0]}
              </button>
              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => go({ kind: 'login' })}
              className="hidden items-center gap-1.5 rounded-xl bg-navy-800 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-navy-900/20 transition-all hover:bg-navy-700 sm:flex"
            >
              <LogIn className="h-4 w-4" />
              دخول
            </button>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-navy-800 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in-fast max-h-[80vh] overflow-y-auto border-t border-gray-100 bg-white lg:hidden">
          <div className="container-app space-y-1 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.view);
              return (
                <button
                  key={item.label}
                  onClick={() => go(item.view)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active ? 'bg-navy-50 text-navy-800' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="my-1 h-px bg-gray-100" />
            <button
              onClick={() => go({ kind: 'board' })}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${isBoardActive ? 'bg-navy-50 text-navy-800' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Network className="h-5 w-5" />
              الهيئة التنفيذية
            </button>
            {committeeOrder.map((id) => {
              const Icon = committeeIcons[id];
              return (
                <button
                  key={id}
                  onClick={() => go({ kind: 'committee', committeeId: id })}
                  className="flex w-full items-center gap-3 rounded-xl pr-10 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4 text-navy-500" />
                  {committeeMeta[id].name}
                </button>
              );
            })}
            <div className="my-1 h-px bg-gray-100" />
            <button
              onClick={() => go({ kind: 'student-dashboard' })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <LayoutDashboard className="h-5 w-5" />
              بوابة الطالب
            </button>
            <button
              onClick={() => go({ kind: 'admin' })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Shield className="h-5 w-5" />
              لوحة الإدارة
            </button>

            {/* Role switcher in mobile */}
            {currentUser && currentUser.role !== 'student' && (
              <>
                <div className="my-1 h-px bg-gray-100" />
                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  تبديل الدور (محاكاة)
                </div>
                {demoAccounts.map((a) => (
                  <button
                    key={a.email}
                    onClick={() => { loginAs(a.email); setMobileOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm ${currentUser.email === a.email ? 'bg-navy-50 font-bold text-navy-900' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {a.role === 'president' ? <Crown className="h-4 w-4 text-gold-500" /> : <Shield className="h-4 w-4 text-navy-500" />}
                    <div>
                      <div>{a.name}</div>
                      <div className="text-[10px] text-gray-400">{roleLabel(a.role, a.committee)}</div>
                    </div>
                  </button>
                ))}
              </>
            )}

            {!currentUser && (
              <button
                onClick={() => go({ kind: 'login' })}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-800 px-4 py-3 text-sm font-semibold text-white"
              >
                <LogIn className="h-4 w-4" />
                دخول
              </button>
            )}
            {currentUser && (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
