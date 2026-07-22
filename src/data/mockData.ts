export type EventCategory = 'workshop' | 'lecture' | 'volunteer' | 'training' | 'trip';

export interface UEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string; // ISO
  location: string;
  description: string;
  status: 'upcoming' | 'past';
  capacity: number;
  registered: number;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  university: string;
  major: string;
  year: string;
  joinedAt: string;
  registeredEvents: string[];
  status: 'active' | 'inactive';
}

export interface Suggestion {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'implemented';
}

export interface AdminPlan {
  id: string;
  title: string;
  description: string;
  quarter: string;
  progress: number; // 0-100
  owner: string;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface AdminReport {
  id: string;
  title: string;
  period: string;
  date: string;
  type: string;
  summary: string;
}

export const categoryLabels: Record<EventCategory, string> = {
  workshop: 'ورشة عمل',
  lecture: 'محاضرة',
  volunteer: 'عمل تطوعي',
  training: 'تدريب',
  trip: 'رحلة',
};

export const categoryColors: Record<EventCategory, string> = {
  workshop: 'bg-navy-100 text-navy-700',
  lecture: 'bg-gold-100 text-gold-700',
  volunteer: 'bg-emerald-100 text-emerald-700',
  training: 'bg-sky-100 text-sky-700',
  trip: 'bg-rose-100 text-rose-700',
};

export const mockEvents: UEvent[] = [
  {
    id: 'e1',
    title: 'ورشة عمل: مهارات القيادة الشبابية',
    category: 'workshop',
    date: '2026-08-15T16:00:00',
    location: 'قاعة المؤتمرات الرئيسية - إسطنبول',
    description:
      'ورشة عمل تفاعلية تهدف إلى تنمية مهارات القيادة لدى الشباب، مع التركيز على اتخاذ القرار وإدارة الفرق وخطاب الجمهور.',
    status: 'upcoming',
    capacity: 80,
    registered: 54,
    image:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e2',
    title: 'محاضرة: هوية الأمة وتحديات العصر',
    category: 'lecture',
    date: '2026-08-22T18:00:00',
    location: 'المركز الثقافي - أنقرة',
    description:
      'محاضرة قيمة يتناول فيها المُحاضر التحديات التي تواجه هوية الأمة في العصر الحديث وسبائل التعامل معها بوعي ومسؤولية.',
    status: 'upcoming',
    capacity: 200,
    registered: 132,
    image:
      'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e3',
    title: 'حملة تطوعية: معًا نزرع الأمل',
    category: 'volunteer',
    date: '2026-09-05T09:00:00',
    location: 'حديقة المدينة العامة - بورصة',
    description:
      'حملة تطوعية لزراعة الأشجار وتنظيف الحدائق العامة، ضمن مبادرة الاتحاد للحفاظ على البيئة وتعزيز المسؤولية المجتمعية.',
    status: 'upcoming',
    capacity: 120,
    registered: 41,
    image:
      'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e4',
    title: 'برنامج تدريبي: أساسيات الإعلام الرقمي',
    category: 'training',
    date: '2026-09-12T14:00:00',
    location: 'مختبر الحاسوب - مقر الاتحاد',
    description:
      'برنامج تدريبي مكثف يقدم أساسيات صناعة المحتوى الإعلامي الرقمي وإدارة منصات التواصل الاجتماعي باحترافية ومسؤولية.',
    status: 'upcoming',
    capacity: 40,
    registered: 38,
    image:
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e5',
    title: 'رحلة تثقيفية: آثار إسطنبول',
    category: 'trip',
    date: '2026-09-20T08:00:00',
    location: 'المعالم التاريخية - إسطنبول',
    description:
      'رحلة تثقيفية إلى أبرز المعالم التاريخية في إسطنبول، تستكشف المشاركون إرث المدينة العثماني وروائع عمارتها.',
    status: 'upcoming',
    capacity: 60,
    registered: 60,
    image:
      'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e6',
    title: 'ملتقى الشباب الأول',
    category: 'lecture',
    date: '2026-05-10T17:00:00',
    location: 'قاعة الكبرى - إسطنبول',
    description:
      'ملتقى شبابي حضره أكثر من 300 شاب وشابة، تضمن لقاءات حوارية وورش مصاحبة وتوجيهات من قيادات الاتحاد.',
    status: 'past',
    capacity: 300,
    registered: 312,
    image:
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e7',
    title: 'دورة: إدارة المشاريع الشبابية',
    category: 'training',
    date: '2026-04-22T15:00:00',
    location: 'مقر الاتحاد - أنقرة',
    description:
      'دورة عملية في إدارة المشاريع الشبابية من التخطيط إلى التنفيذ والتقييم، خرج منها 45 متدربًا بشهادات معتمدة.',
    status: 'past',
    capacity: 45,
    registered: 45,
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'e8',
    title: 'حملة: إفطار جماعي في رمضان',
    category: 'volunteer',
    date: '2026-03-18T18:30:00',
    location: 'ساحات المدينة - بورصة',
    description:
      'حملة خيرية نظمها الاتحاد لتقديم وجبات إفطار للمحتاجين طوال شهر رمضان، شارك فيها 80 متطوعًا ووزع 2400 وجبة.',
    status: 'past',
    capacity: 80,
    registered: 80,
    image:
      'https://images.pexels.com/photos/4252142/pexels-photo-4252142.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const mockNews: NewsItem[] = [
  {
    id: 'n1',
    title: 'الاتحاد يوقع اتفاقية شراكة مع جامعة إسطنبول',
    excerpt:
      'في خطوة لتعزيز التعاون الأكاديمي، وقّع الاتحاد اتفاقية شراكة مع جامعة إسطنبول تتيح للطلاب برامج تبادل وتدريب.',
    date: '2026-07-12',
    category: 'شراكات',
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'n2',
    title: 'انطلاق التسجيل في برنامج القادة الشبابي الصيفي',
    excerpt:
      'يفتح الاتحاد باب التسجيل في النسخة الثالثة من برنامج القادة الشبابي الصيفي، الذي يستقطب 100 طالب من مختلف الجامعات.',
    date: '2026-07-08',
    category: 'إعلانات',
    image:
      'https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'n3',
    title: 'فريق الاتحاد يحصد المركز الأول في مسابقة الابتكار',
    excerpt:
      'حقق فريق الاتحاد المركز الأول في مسابقة الابتكار الشبابي على مستوى الجامعات، بمشروع بيئي لتحويل النفايات إلى طاقة.',
    date: '2026-06-30',
    category: 'إنجازات',
    image:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'أحمد يلدز',
    email: 'ahmed.yildiz@student.ummet.org',
    university: 'جامعة إسطنبول',
    major: 'هندسة الحاسوب',
    year: 'السنة الثالثة',
    joinedAt: '2025-09-14',
    registeredEvents: ['e1', 'e2', 'e6'],
    status: 'active',
  },
  {
    id: 's2',
    name: 'فاطمة كايا',
    email: 'fatima.kaya@student.ummet.org',
    university: 'جامعة أنقرة',
    major: 'العلاقات الدولية',
    year: 'السنة الثانية',
    joinedAt: '2025-10-02',
    registeredEvents: ['e2', 'e3', 'e8'],
    status: 'active',
  },
  {
    id: 's3',
    name: 'عمر ديمير',
    email: 'omar.demir@student.ummet.org',
    university: 'جامعة بورصة التقنية',
    major: 'إدارة الأعمال',
    year: 'السنة الرابعة',
    joinedAt: '2025-08-21',
    registeredEvents: ['e4', 'e7'],
    status: 'active',
  },
  {
    id: 's4',
    name: 'مريم شاهين',
    email: 'meryem.sahin@student.ummet.org',
    university: 'جامعة مرمرة',
    major: 'الإعلام والاتصال',
    year: 'السنة الأولى',
    joinedAt: '2026-01-10',
    registeredEvents: ['e1', 'e5'],
    status: 'active',
  },
  {
    id: 's5',
    name: 'يوسف أكسوي',
    email: 'yusuf.aksoy@student.ummet.org',
    university: 'جامعة إسطنبول التقنية',
    major: 'الهندسة المدنية',
    year: 'السنة الثالثة',
    joinedAt: '2025-11-05',
    registeredEvents: ['e3', 'e6', 'e8'],
    status: 'active',
  },
  {
    id: 's6',
    name: 'سارة أوزترك',
    email: 'sara.ozturk@student.ummet.org',
    university: 'جامعة حاجي تبه',
    major: 'الطب البشري',
    year: 'السنة الثانية',
    joinedAt: '2026-02-18',
    registeredEvents: ['e2'],
    status: 'inactive',
  },
  {
    id: 's7',
    name: 'خالد أرسلان',
    email: 'khaled.arslan@student.ummet.org',
    university: 'جامعة إسطنبول',
    major: 'الحقوق',
    year: 'السنة الرابعة',
    joinedAt: '2025-07-30',
    registeredEvents: ['e6', 'e7', 'e8'],
    status: 'active',
  },
  {
    id: 's8',
    name: 'نور هاكان',
    email: 'nour.hakan@student.ummet.org',
    university: 'جامعة بيلجي',
    major: 'تصميم الجرافيك',
    year: 'السنة الثانية',
    joinedAt: '2026-03-12',
    registeredEvents: ['e1', 'e4'],
    status: 'active',
  },
];

export const mockSuggestions: Suggestion[] = [
  {
    id: 'sg1',
    studentId: 's1',
    studentName: 'أحمد يلدز',
    title: 'إضافة دورات في البرمجة والتقنية',
    body: 'أقترح تنظيم دورات تعليمية في أساسيات البرمجة وتطوير المواقع، لأن هناك إقبالًا كبيرًا من الطلاب على هذا المجال.',
    category: 'برامج',
    createdAt: '2026-07-05',
    status: 'reviewed',
  },
  {
    id: 'sg2',
    studentId: 's2',
    studentName: 'فاطمة كايا',
    title: 'تخصيص ركن للطالبات في الفعاليات',
    body: 'سيكون من الرائع تخصيص أنشطة وندوات للطالبات بشكل دوري، تتناسب مع اهتماماتهن وتعزز مشاركتهن.',
    category: 'اقتراحات',
    createdAt: '2026-07-09',
    status: 'new',
  },
  {
    id: 'sg3',
    studentId: 's5',
    studentName: 'يوسف أكsoy',
    title: 'إنشاء نادٍ رياضي للاتحاد',
    body: 'أقترح تأسيس نادٍ رياضي ينظم مباريات دورية في كرة القدم والتنس، لتعزيز روح الفريق بين الأعضاء.',
    category: 'أنشطة',
    createdAt: '2026-06-28',
    status: 'implemented',
  },
];

export const mockPlans: AdminPlan[] = [
  {
    id: 'p1',
    title: 'توسيع البرامج الصيفية',
    description: 'زيادة عدد البرامج الصيفية بنسبة 40% والوصول إلى 500 طالب مشارك.',
    quarter: 'الربع الثالث 2026',
    progress: 65,
    owner: 'د. عبد الله قوني',
    status: 'in-progress',
  },
  {
    id: 'p2',
    title: 'إطلاق منصة رقمية للأنشطة',
    description: 'تطوير منصة إلكترونية متكاملة لإدارة التسجيل ومتابعة الأنشطة والاقتراحات.',
    quarter: 'الربع الرابع 2026',
    progress: 30,
    owner: 'م. سلمى أردوغان',
    status: 'in-progress',
  },
  {
    id: 'p3',
    title: 'شراكات مع 5 جامعات جديدة',
    description: 'عقد اتفاقيات تعاون مع خمس جامعات إضافية لتوسيع قاعدة المستفيدين.',
    quarter: 'الربع الثالث 2026',
    progress: 100,
    owner: 'أ. خليل جوربوز',
    status: 'completed',
  },
  {
    id: 'p4',
    title: 'تدريب 100 قائد شبابي',
    description: 'إعداد وتدريب 100 قائد شبابي قادر على إدارة المبادرات المجتمعية.',
    quarter: 'الربع الأول 2027',
    progress: 10,
    owner: 'د. عبد الله قوني',
    status: 'planned',
  },
];

export const mockReports: AdminReport[] = [
  {
    id: 'r1',
    title: 'التقرير السنوي 2025',
    period: 'سنوي',
    date: '2026-01-15',
    type: 'إنجازات',
    summary: 'ملخص شامل لإنجازات الاتحاد خلال عام 2025، شمل 24 فعالية و1200 مستفيد.',
  },
  {
    id: 'r2',
    title: 'تقرير الربع الثاني 2026',
    period: 'ربع سنوي',
    date: '2026-07-01',
    type: 'أداء',
    summary: 'تحليل أداء الأنشطة والبرامج في الربع الثاني ومؤشرات المشاركة.',
  },
  {
    id: 'r3',
    title: 'تقرير الحملة التطوعية الرمضانية',
    period: 'فعالية',
    date: '2026-04-05',
    type: 'فعاليات',
    summary: 'توثيق نتائج حملة الإفطار الجماعي وتقييم الأثر المجتمعي.',
  },
];

export const stats = {
  members: 1248,
  events: 86,
  universities: 24,
  volunteers: 540,
};

/* ===================== Student Application & Interview ===================== */

export type ApplicationStatus =
  | 'pending'        // طلب جديد قيد المراجعة
  | 'interview'      // تمت الموافقة المبدئية - مقابلة مجدولة
  | 'accepted'       // قبول نهائي
  | 'rejected';      // رفض

export interface InterviewInfo {
  date: string;   // ISO date
  time: string;   // HH:MM
  meetingUrl: string;
}

export interface StudentApplication {
  id: string;
  studentId: string;
  name: string;
  email: string;
  university: string;
  major: string;
  year: string;
  motivation: string;
  appliedAt: string;
  status: ApplicationStatus;
  interview?: InterviewInfo;
  decidedAt?: string;
  rejectionReason?: string;
}

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  pending: 'قيد المراجعة',
  interview: 'مقابلة مجدولة',
  accepted: 'مقبول',
  rejected: 'مرفوض',
};

export const applicationStatusColors: Record<ApplicationStatus, string> = {
  pending: 'bg-gold-100 text-gold-700',
  interview: 'bg-sky-100 text-sky-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-rose-100 text-rose-700',
};

export const mockApplications: StudentApplication[] = [
  {
    id: 'app1',
    studentId: 'app-s1',
    name: 'إبراهيم تشيليك',
    email: 'ibrahim.celik@app.ummet.org',
    university: 'جامعة إسطنبول',
    major: 'العلوم السياسية',
    year: 'السنة الثانية',
    motivation: 'أرغب في الانضمام إلى الاتحاد لتطوير مهاراتي القيادية والمساهمة في خدمة المجتمع.',
    appliedAt: '2026-07-10',
    status: 'pending',
  },
  {
    id: 'app2',
    studentId: 'app-s2',
    name: 'عائشة كارا',
    email: 'ayshe.kara@app.ummet.org',
    university: 'جامعة أنقرة',
    major: 'الإعلام والاتصال',
    year: 'السنة الثالثة',
    motivation: 'أبحث عن منصة شبابية فعّالة أعبّر فيها عن طاقاتي وأخدم أمتي.',
    appliedAt: '2026-07-08',
    status: 'interview',
    interview: {
      date: '2026-07-28',
      time: '16:00',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
    },
  },
  {
    id: 'app3',
    studentId: 'app-s3',
    name: 'مصطفى أوزدمير',
    email: 'mustafa.ozdemir@app.ummet.org',
    university: 'جامعة بورصة التقنية',
    major: 'الهندسة الميكانيكية',
    year: 'السنة الأولى',
    motivation: 'طالب طموح يحب العمل التطوعي ويبحث عن بيئة شبابية محفّزة.',
    appliedAt: '2026-07-05',
    status: 'pending',
  },
  {
    id: 'app4',
    studentId: 'app-s4',
    name: 'زينب يلدريم',
    email: 'zeynep.yildirim@app.ummet.org',
    university: 'جامعة مرمرة',
    major: 'الحقوق',
    year: 'السنة الرابعة',
    motivation: 'خبرة في العمل التطوعي وأرغب في قيادة مبادرات مجتمعية ضمن الاتحاد.',
    appliedAt: '2026-06-28',
    status: 'interview',
    interview: {
      date: '2026-07-25',
      time: '14:00',
      meetingUrl: 'https://zoom.us/j/1234567890',
    },
  },
  {
    id: 'app5',
    studentId: 'app-s5',
    name: 'براء شين',
    email: 'baris.shin@app.ummet.org',
    university: 'جامعة إسطنبول التقنية',
    major: 'هندسة البرمجيات',
    year: 'السنة الثانية',
    motivation: 'مطور برمجيات أرغب في المساهمة التقنية في مشاريع الاتحاد.',
    appliedAt: '2026-06-20',
    status: 'accepted',
    decidedAt: '2026-07-01',
  },
  {
    id: 'app6',
    studentId: 'app-s6',
    name: 'ليلى مراد',
    email: 'leyla.murad@app.ummet.org',
    university: 'جامعة حاجي تبه',
    major: 'الصيدلة',
    year: 'السنة الثالثة',
    motivation: 'مهتمة بالعمل المجتمعي والصحي.',
    appliedAt: '2026-06-15',
    status: 'rejected',
    decidedAt: '2026-06-25',
    rejectionReason: 'لم يستوفي معايير القبول في هذه الدورة، نرحب بتقديمه مجددًا.',
  },
];

/* ===================== RBAC & Executive Board ===================== */

export type CommitteeId =
  | 'presidency'
  | 'vice-presidency'
  | 'media'
  | 'academic'
  | 'supervisory'
  | 'activities'
  | 'finance';

export type Role = 'student' | 'president' | 'committee-head';

export interface Committee {
  id: CommitteeId;
  name: string;
  shortName: string;
  icon: string; // lucide icon name
  color: string; // tailwind gradient classes
  description: string;
  responsibilities: string[];
  head: BoardMember;
  members: CommitteeMember[];
  stats: { label: string; value: string }[];
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  photo: string;
}

export const committeeMeta: Record<
  CommitteeId,
  { name: string; shortName: string; icon: string; color: string }
> = {
  presidency: { name: 'رئاسة الاتحاد', shortName: 'الرئاسة', icon: 'Crown', color: 'from-navy-700 to-navy-950' },
  'vice-presidency': { name: 'نائب الرئيس', shortName: 'النائب', icon: 'UserCog', color: 'from-navy-600 to-navy-800' },
  media: { name: 'اللجنة الإعلامية', shortName: 'الإعلام', icon: 'Megaphone', color: 'from-sky-600 to-sky-800' },
  academic: { name: 'اللجنة الأكاديمية', shortName: 'الأكاديمية', icon: 'GraduationCap', color: 'from-emerald-600 to-emerald-800' },
  supervisory: { name: 'اللجنة الرقابية', shortName: 'الرقابة', icon: 'ShieldCheck', color: 'from-rose-600 to-rose-800' },
  activities: { name: 'لجنة الأنشطة', shortName: 'الأنشطة', icon: 'CalendarDays', color: 'from-gold-500 to-gold-700' },
  finance: { name: 'اللجنة المالية', shortName: 'المالية', icon: 'Wallet', color: 'from-teal-600 to-teal-800' },
};

export const committeeOrder: CommitteeId[] = [
  'presidency',
  'vice-presidency',
  'media',
  'academic',
  'supervisory',
  'activities',
  'finance',
];

export const mockCommittees: Committee[] = [
  {
    id: 'presidency',
    name: 'رئاسة الاتحاد',
    shortName: 'الرئاسة',
    icon: 'Crown',
    color: 'from-navy-700 to-navy-950',
    description:
      'القيادة العليا للاتحاد، تتولى رسم السياسات العامة وتمثيل الاتحاد داخليًا وخارجيًا، والإشراف على عمل جميع اللجان والمكاتب.',
    responsibilities: [
      'رسم الرؤية الاستراتيجية والسياسات العامة للاتحاد',
      'تمثيل الاتحاد أمام المؤسسات والجهات الخارجية',
      'الإشراف العام على أداء جميع اللجان',
      'إقرار الخطط السنوية والموازنات',
      'رئاسة الاجتماعات الدورية للهيئة التنفيذية',
    ],
    head: {
      id: 'b1',
      name: 'د. عبد الله قوني',
      role: 'رئيس الاتحاد',
      bio: 'أكاديمي وقائد شبابي يحمل دكتوراه في العلوم السياسية، له خبرة واسعة في العمل المؤسسي والشبابي، يقود الاتحاد منذ عام 2024.',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'president@ummet.org',
    },
    members: [
      { id: 'pm1', name: 'م. سلمى أردوغان', position: 'مستشار أول', photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'pm2', name: 'أ. خليل جوربوز', position: 'منسق عام', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'قرارات صادرة', value: '47' },
      { label: 'اجتماعات الهيئة', value: '32' },
      { label: 'شراكات خارجية', value: '18' },
    ],
  },
  {
    id: 'vice-presidency',
    name: 'نائب الرئيس',
    shortName: 'النائب',
    icon: 'UserCog',
    color: 'from-navy-600 to-navy-800',
    description:
      'المكتب التنفيذي لنائب الرئيس، يتولى متابعة تنفيذ القرارات وتنسيق العمل بين اللجان، ويتولى صلاحيات الرئيس في حال غيابه.',
    responsibilities: [
      'متابعة تنفيذ قرارات الرئيس والهيئة التنفيذية',
      'تنسيق العمل بين اللجان المختلفة',
      'الإشراف على الخطط التشغيلية',
      'تولي صلاحيات الرئيس في حال غيابه',
      'إعداد تقارير الأداء الدورية',
    ],
    head: {
      id: 'b2',
      name: 'أ. خليل جوربوز',
      role: 'نائب الرئيس',
      bio: 'قائد شبابي ومدير مشاريع، يحمل ماجستير في إدارة المؤسسات، يشغل منصب نائب الرئيس ويتولى التنسيق بين جميع اللجان.',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'vice.president@ummet.org',
    },
    members: [
      { id: 'vm1', name: 'نور هاكان', position: 'منسق تنفيذي', photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'متابعات تنفيذية', value: '64' },
      { label: 'جلسات تنسيق', value: '28' },
      { label: 'تقارير دورية', value: '12' },
    ],
  },
  {
    id: 'media',
    name: 'اللجنة الإعلامية',
    shortName: 'الإعلام',
    icon: 'Megaphone',
    color: 'from-sky-600 to-sky-800',
    description:
      'تتولى اللجنة الإعلامية إدارة صورة الاتحاد وتواصله مع الجمهور عبر المنصات الرقمية والمواد الإعلامية والتغطيات.',
    responsibilities: [
      'إدارة حسابات التواصل الاجتماعي للاتحاد',
      'تغطية الفعاليات والأنشطة إعلاميًا',
      'إنتاج المحتوى الرقمي والمطبوع',
      'التنسيق مع وسائل الإعلام الخارجية',
      'إصدار النشرات والمطبوعات الدورية',
    ],
    head: {
      id: 'b3',
      name: 'مريم شاهين',
      role: 'رئيسة اللجنة الإعلامية',
      bio: 'إعلامية متخصصة في الإعلام الرقمي، طالبة دراسات عليا في الاتصال، تقود فريق الإعلام وتشرف على منصات الاتحاد.',
      photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'media@ummet.org',
    },
    members: [
      { id: 'mm1', name: 'يوسف أكسوي', position: 'مصور صحفي', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'mm2', name: 'سارة أوزترك', position: 'كاتلة محتوى', photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'منشورات سنوية', value: '320' },
      { label: 'متابعون', value: '12.4K' },
      { label: 'تغطيات إعلامية', value: '86' },
    ],
  },
  {
    id: 'academic',
    name: 'اللجنة الأكاديمية',
    shortName: 'الأكاديمية',
    icon: 'GraduationCap',
    color: 'from-emerald-600 to-emerald-800',
    description:
      'تهتم اللجنة الأكاديمية بالشأن العلمي للطلاب، عبر تنظيم الدورات التدريبية والندوات وورش العمل ودعم المسار الأكاديمي.',
    responsibilities: [
      'تنظيم الدورات التدريبية وورش العمل',
      'عقد الندوات والمحاضرات الأكاديمية',
      'دعم الطلاب أكاديميًا وتوجيههم',
      'الإشراف على المكتبة العلمية للاتحاد',
      'تنسيق البرامج مع الجامعات الشريكة',
    ],
    head: {
      id: 'b4',
      name: 'د. عبد الله قوني',
      role: 'رئيس اللجنة الأكاديمية',
      bio: 'أكاديمي متخصص في العلوم السياسية، يشرف على البرامج الأكاديمية ويقود فريق التنسيق مع الجامعات الشريكة.',
      photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'academic@ummet.org',
    },
    members: [
      { id: 'am1', name: 'أحمد يلدز', position: 'منسق برامج', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'am2', name: 'فاطمة كايا', position: 'مدرّب', photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'دورات منفذة', value: '24' },
      { label: 'متدربون', value: '680' },
      { label: 'شراكات جامعية', value: '24' },
    ],
  },
  {
    id: 'supervisory',
    name: 'اللجنة الرقابية',
    shortName: 'الرقابة',
    icon: 'ShieldCheck',
    color: 'from-rose-600 to-rose-800',
    description:
      'اللجنة الرقابية هي الجهة المستقلة المسؤولة عن مراقبة الالتزام والشفافية داخل الاتحاد، وتقييم الأداء وضمان نزاهة العمل المؤسسي.',
    responsibilities: [
      'مراقبة الالتزام باللوائح والأنظمة',
      'تدقيق التقارير المالية والإدارية',
      'التحقيق في الشكاوى والمخالفات',
      'تقييم أداء اللجان والأعضاء',
      'إعداد تقارير الشفافية الدورية',
    ],
    head: {
      id: 'b5',
      name: 'أ. خالد أرسلان',
      role: 'رئيس اللجنة الرقابية',
      bio: 'خبير قانوني ومراجع حسابات، طالب دكتوراه في القانون العام، يشرف على الرقابة والالتزام داخل الاتحاد.',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'supervisory@ummet.org',
    },
    members: [
      { id: 'sm1', name: 'عمر ديمير', position: 'مراجع مالي', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'تدقيقات منجزة', value: '18' },
      { label: 'تقارير شفافية', value: '6' },
      { label: 'شكاوى محلولة', value: '14' },
    ],
  },
  {
    id: 'activities',
    name: 'لجنة الأنشطة',
    shortName: 'الأنشطة',
    icon: 'CalendarDays',
    color: 'from-gold-500 to-gold-700',
    description:
      'تنظيم وإدارة الفعاليات والأنشطة الشبابية المتنوعة، من رحلات وندوات وحملات تطوعية، وتفعيل المشاركة الطلابية.',
    responsibilities: [
      'تخطيط وتنظيم الفعاليات والأنشطة',
      'إدارة الحملات التطوعية',
      'تنظيم الرحلات التثقيفية والترفيهية',
      'الإشراف على الأندية الطلابية',
      'تفعيل المشاركة الطلابية في الأنشطة',
    ],
    head: {
      id: 'b6',
      name: 'م. سلمى أردوغان',
      role: 'رئيسة لجنة الأنشطة',
      bio: 'مهندسة وقائدة شبابية، تنسق الفعاليات الكبرى للاتحاد وتشرف على فرق المتطوعين في مختلف المدن.',
      photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'activities@ummet.org',
    },
    members: [
      { id: 'acm1', name: 'يوسف أكسوي', position: 'منسق فعاليات', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 'acm2', name: 'نور هاكان', position: 'منسق متطوعين', photo: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'فعاليات منفذة', value: '86' },
      { label: 'متطوعون', value: '540' },
      { label: 'مستفيدون', value: '4.2K' },
    ],
  },
  {
    id: 'finance',
    name: 'اللجنة المالية',
    shortName: 'المالية',
    icon: 'Wallet',
    color: 'from-teal-600 to-teal-800',
    description:
      'تتولى اللجنة المالية إدارة الموارد المالية للاتحاد، وإعداد الموازنات ومتابعة الإيرادات والمصروفات وضمان الاستدامة المالية.',
    responsibilities: [
      'إعداد الموازنة السنوية للاتحاد',
      'متابعة الإيرادات والمصروفات',
      'إدارة التبرعات والرعايات',
      'إعداد التقارير المالية الدورية',
      'التنسيق مع اللجنة الرقابية للتدقيق',
    ],
    head: {
      id: 'b7',
      name: 'أ. عمر ديمير',
      role: 'رئيس اللجنة المالية',
      bio: 'خبير مالي ومحاسب معتمد، يدير الموازنة السنوية للاتحاد ويشرف على التبرعات والرعايات وضمان الشفافية المالية.',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      email: 'finance@ummet.org',
    },
    members: [
      { id: 'fm1', name: 'خالد أرسلان', position: 'محاسب', photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    stats: [
      { label: 'موازنة 2026', value: '480K ₺' },
      { label: 'تمويل مشاريع', value: '320K ₺' },
      { label: 'رعاة', value: '11' },
    ],
  },
];

/* Demo accounts for role-based login simulation */
export interface DemoAccount {
  email: string;
  name: string;
  role: Role;
  committee?: CommitteeId; // for committee-head role
}

export const demoAccounts: DemoAccount[] = [
  { email: 'president@ummet.org', name: 'د. عبد الله قوني', role: 'president' },
  { email: 'media@ummet.org', name: 'مريم شاهين', role: 'committee-head', committee: 'media' },
  { email: 'academic@ummet.org', name: 'د. عبد الله قوني', role: 'committee-head', committee: 'academic' },
  { email: 'supervisory@ummet.org', name: 'أ. خالد أرسلان', role: 'committee-head', committee: 'supervisory' },
  { email: 'activities@ummet.org', name: 'م. سلمى أردوغان', role: 'committee-head', committee: 'activities' },
  { email: 'finance@ummet.org', name: 'أ. عمر ديمير', role: 'committee-head', committee: 'finance' },
  { email: 'ahmed.yildiz@student.ummet.org', name: 'أحمد يلدز', role: 'student' },
];
