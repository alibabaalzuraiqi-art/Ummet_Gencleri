import { Users, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useApp, type View } from '../context/AppContext';

const links: { label: string; view: View }[] = [
  { label: 'الرئيسية', view: { kind: 'home' } },
  { label: 'عن الاتحاد', view: { kind: 'about' } },
  { label: 'البرامج والأنشطة', view: { kind: 'programs' } },
  { label: 'اتصل بنا', view: { kind: 'contact' } },
  { label: 'الهيئة التنفيذية', view: { kind: 'board' } },
  { label: 'بوابة الطالب', view: { kind: 'student-dashboard' } },
  { label: 'لوحة الإدارة', view: { kind: 'admin' } },
];

export default function Footer() {
  const { setView } = useApp();
  const go = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 bg-navy-950 text-gray-300">
      <div className="container-app py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-white">اتحاد شباب الأمة</div>
                <div className="text-xs text-gray-400">Ummet Gençleri Birliği</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              اتحاد شبابي يهدف إلى بناء جيل واعٍ، مسؤول، ومنتمٍ لأمته، عبر برامج
              تثقيفية وتدريبية وتطوعية متنوعة.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-gray-300 transition-colors hover:bg-navy-700 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => go(l.view)}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              تواصل معنا
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                <span>إسطنبول، تركيا - حي الفاتح</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-navy-400" />
                <span>info@ummet.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-navy-400" />
                <span dir="ltr">+90 212 555 00 00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              النشرة البريدية
            </h4>
            <p className="text-sm text-gray-400">
              اشترك لتصلك آخر أخبار وأنشطة الاتحاد.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full rounded-lg border border-navy-700 bg-navy-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-navy-500 focus:outline-none"
              />
              <button className="shrink-0 rounded-lg bg-gold-400 px-4 py-2 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-300">
                اشترك
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} اتحاد شباب الأمة - جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
