import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import {
  mockEvents,
  mockNews,
  mockStudents,
  mockSuggestions,
  mockPlans,
  mockReports,
  mockCommittees,
  demoAccounts,
  type UEvent,
  type NewsItem,
  type Student,
  type Suggestion,
  type AdminPlan,
  type AdminReport,
  type CommitteeId,
  type Role,
  type StudentApplication,
  type ApplicationStatus,
  type InterviewInfo,
} from '../data/mockData';

export type View =
  | { kind: 'home' }
  | { kind: 'about' }
  | { kind: 'programs' }
  | { kind: 'contact' }
  | { kind: 'gallery' }
  | { kind: 'guide' }
  | { kind: 'faq' }
  | { kind: 'login' }
  | { kind: 'register' }
  | { kind: 'student-dashboard' }
  | { kind: 'admin' }
  | { kind: 'board' }
  | { kind: 'committee'; committeeId: CommitteeId };

export interface CurrentUser {
  name: string;
  email: string;
  role: Role;
  committee?: CommitteeId;
}

interface AppContextValue {
  view: View;
  setView: (v: View) => void;
  events: UEvent[];
  setEvents: React.Dispatch<React.SetStateAction<UEvent[]>>;
  news: NewsItem[];
  students: Student[];
  suggestions: Suggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
  plans: AdminPlan[];
  setPlans: React.Dispatch<React.SetStateAction<AdminPlan[]>>;
  reports: AdminReport[];
  committees: typeof mockCommittees;
  currentStudent: Student | null;
  currentUser: CurrentUser | null;
  login: (email: string) => boolean;
  loginAs: (accountEmail: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  contactMessages: ContactMessage[];
  addContactMessage: (m: Omit<ContactMessage, 'id' | 'date'>) => void;
  canAccessCommittee: (committeeId: CommitteeId) => boolean;
  canAccessAdmin: () => boolean;
  applications: StudentApplication[];
  setApplications: React.Dispatch<React.SetStateAction<StudentApplication[]>>;
  myApplication: StudentApplication | null;
  registerWithApplication: (name: string, email: string, university: string, major: string, year: string, motivation: string) => void;
  scheduleInterview: (applicationId: string, interview: InterviewInfo) => void;
  decideApplication: (applicationId: string, status: 'accepted' | 'rejected', rejectionReason?: string) => void;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  date: string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>({ kind: 'home' });
  const [events, setEvents] = useState<UEvent[]>(mockEvents);
  const [news] = useState<NewsItem[]>(mockNews);
  const [students] = useState<Student[]>(mockStudents);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [plans, setPlans] = useState<AdminPlan[]>(mockPlans);
  const [reports] = useState<AdminReport[]>(mockReports);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [applicationsLoaded, setApplicationsLoaded] = useState(false);

  // Fetch applications from Supabase on mount
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('student_applications')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: StudentApplication[] = data.map((row: Record<string, unknown>) => ({
            id: row.id as string,
            studentId: row.student_id as string,
            name: row.name as string,
            email: row.email as string,
            university: row.university as string,
            major: row.major as string,
            year: row.year as string,
            motivation: row.motivation as string,
            appliedAt: row.applied_at as string,
            status: row.status as ApplicationStatus,
            interview: row.interview_date ? {
              date: row.interview_date as string,
              time: row.interview_time as string,
              meetingUrl: row.interview_meeting_url as string,
            } : undefined,
            decidedAt: row.decided_at as string | undefined,
            rejectionReason: row.rejection_reason as string | undefined,
          }));
          setApplications(mapped);
        }
      } catch (err) {
        console.error('Failed to load applications from Supabase:', err);
      } finally {
        setApplicationsLoaded(true);
      }
    })();
  }, []);

  const login = (email: string) => {
    const found = students.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );
    if (found) {
      setCurrentStudent(found);
      setCurrentUser({ name: found.name, email: found.email, role: 'student' });
      setView({ kind: 'student-dashboard' });
      return true;
    }
    // also allow demo accounts that are committee heads / president
    const demo = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (demo) {
      setCurrentUser({ name: demo.name, email: demo.email, role: demo.role, committee: demo.committee });
      if (demo.role === 'student') {
        const s = students.find((s) => s.email.toLowerCase() === demo.email.toLowerCase());
        if (s) setCurrentStudent(s);
        setView({ kind: 'student-dashboard' });
      } else {
        setView({ kind: 'admin' });
      }
      return true;
    }
    return false;
  };

  const loginAs = (accountEmail: string) => {
    const demo = demoAccounts.find((a) => a.email === accountEmail);
    if (!demo) return;
    setCurrentUser({ name: demo.name, email: demo.email, role: demo.role, committee: demo.committee });
    if (demo.role === 'student') {
      const s = students.find((s) => s.email.toLowerCase() === demo.email.toLowerCase());
      if (s) setCurrentStudent(s);
      setView({ kind: 'student-dashboard' });
    } else {
      setCurrentStudent(null);
      setView({ kind: 'admin' });
    }
  };

  const register = (name: string, email: string) => {
    const newStudent: Student = {
      id: 's' + (students.length + 1) + Date.now(),
      name,
      email,
      university: 'غير محدد',
      major: 'غير محدد',
      year: 'السنة الأولى',
      joinedAt: new Date().toISOString().slice(0, 10),
      registeredEvents: [],
      status: 'inactive',
    };
    setCurrentStudent(newStudent);
    setCurrentUser({ name, email, role: 'student' });
    // Auto-create a pending application
    const app: StudentApplication = {
      id: 'app' + Date.now(),
      studentId: newStudent.id,
      name,
      email,
      university: 'غير محدد',
      major: 'غير محدد',
      year: 'السنة الأولى',
      motivation: '',
      appliedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    setApplications((prev) => [app, ...prev]);
    setView({ kind: 'student-dashboard' });
  };

  const registerWithApplication = async (name: string, email: string, university: string, major: string, year: string, motivation: string) => {
    const newStudent: Student = {
      id: 's' + (students.length + 1) + Date.now(),
      name,
      email,
      university,
      major,
      year,
      joinedAt: new Date().toISOString().slice(0, 10),
      registeredEvents: [],
      status: 'inactive',
    };
    setCurrentStudent(newStudent);
    setCurrentUser({ name, email, role: 'student' });
    const app: StudentApplication = {
      id: 'app' + Date.now(),
      studentId: newStudent.id,
      name,
      email,
      university,
      major,
      year,
      motivation,
      appliedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
    };
    setApplications((prev) => [app, ...prev]);
    setView({ kind: 'student-dashboard' });
    // Persist to Supabase
    try {
      await supabase.from('student_applications').insert({
        id: app.id,
        student_id: app.studentId,
        name: app.name,
        email: app.email,
        university: app.university,
        major: app.major,
        year: app.year,
        motivation: app.motivation,
        applied_at: app.appliedAt,
        status: app.status,
      });
    } catch (err) {
      console.error('Failed to persist application to Supabase:', err);
    }
  };

  const scheduleInterview = async (applicationId: string, interview: InterviewInfo) => {
    setApplications((prev) => prev.map((a) => a.id === applicationId ? { ...a, status: 'interview' as ApplicationStatus, interview } : a));
    try {
      await supabase.from('student_applications').update({
        status: 'interview',
        interview_date: interview.date,
        interview_time: interview.time,
        interview_meeting_url: interview.meetingUrl,
      }).eq('id', applicationId);
    } catch (err) {
      console.error('Failed to update interview in Supabase:', err);
    }
  };

  const decideApplication = async (applicationId: string, status: 'accepted' | 'rejected', rejectionReason?: string) => {
    const decidedAt = new Date().toISOString().slice(0, 10);
    setApplications((prev) => prev.map((a) => a.id === applicationId ? { ...a, status, decidedAt, rejectionReason } : a));
    const app = applications.find((a) => a.id === applicationId);
    if (app && currentStudent && currentStudent.email === app.email && status === 'accepted') {
      setCurrentStudent((prev) => prev ? { ...prev, status: 'active' } : prev);
    }
    try {
      await supabase.from('student_applications').update({
        status,
        decided_at: decidedAt,
        rejection_reason: status === 'rejected' ? rejectionReason : null,
      }).eq('id', applicationId);
    } catch (err) {
      console.error('Failed to update decision in Supabase:', err);
    }
  };

  const logout = () => {
    setCurrentStudent(null);
    setCurrentUser(null);
    setView({ kind: 'home' });
  };

  const registerForEvent = (eventId: string) => {
    if (!currentStudent) return;
    setCurrentStudent((prev) =>
      prev
        ? {
            ...prev,
            registeredEvents: prev.registeredEvents.includes(eventId)
              ? prev.registeredEvents
              : [...prev.registeredEvents, eventId],
          }
        : prev
    );
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registered: Math.min(e.registered + 1, e.capacity) }
          : e
      )
    );
  };

  const unregisterFromEvent = (eventId: string) => {
    if (!currentStudent) return;
    setCurrentStudent((prev) =>
      prev
        ? {
            ...prev,
            registeredEvents: prev.registeredEvents.filter((id) => id !== eventId),
          }
        : prev
    );
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, registered: Math.max(e.registered - 1, 0) }
          : e
      )
    );
  };

  const addContactMessage = (m: Omit<ContactMessage, 'id' | 'date'>) => {
    setContactMessages((prev) => [
      { ...m, id: 'm' + Date.now(), date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
  };

  const canAccessCommittee = (committeeId: CommitteeId): boolean => {
    if (!currentUser) return true; // public access when not logged in
    if (currentUser.role === 'president') return true;
    if (currentUser.role === 'committee-head') return currentUser.committee === committeeId;
    return true; // students and others can view public committee pages
  };

  const canAccessAdmin = (): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'president' || currentUser.role === 'committee-head';
  };

  const myApplication = currentStudent ? applications.find((a) => a.email.toLowerCase() === currentStudent.email.toLowerCase()) ?? null : null;

  const value = useMemo<AppContextValue>(
    () => ({
      view,
      setView,
      events,
      setEvents,
      news,
      students,
      suggestions,
      setSuggestions,
      plans,
      setPlans,
      reports,
      committees: mockCommittees,
      currentStudent,
      currentUser,
      login,
      loginAs,
      register,
      logout,
      registerForEvent,
      unregisterFromEvent,
      contactMessages,
      addContactMessage,
      canAccessCommittee,
      canAccessAdmin,
      applications,
      setApplications,
      myApplication,
      registerWithApplication,
      scheduleInterview,
      decideApplication,
    }),
    [view, events, news, students, suggestions, plans, reports, currentStudent, currentUser, contactMessages, applications, myApplication]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
