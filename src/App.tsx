import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ContactPage from './pages/ContactPage';
import MediaGallery from './pages/MediaGallery';
import StudentGuide from './pages/StudentGuide';
import FAQPage from './pages/FAQPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BoardPage from './pages/BoardPage';
import CommitteePage from './pages/CommitteePage';

function Router() {
  const { view } = useApp();

  const isAuthPage = view.kind === 'login' || view.kind === 'register';
  const isDashboard = view.kind === 'admin' || view.kind === 'student-dashboard';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {view.kind === 'home' && <HomePage />}
        {view.kind === 'about' && <AboutPage />}
        {view.kind === 'programs' && <ProgramsPage />}
        {view.kind === 'contact' && <ContactPage />}
        {view.kind === 'gallery' && <MediaGallery />}
        {view.kind === 'guide' && <StudentGuide />}
        {view.kind === 'faq' && <FAQPage />}
        {view.kind === 'login' && <LoginPage />}
        {view.kind === 'register' && <RegisterPage />}
        {view.kind === 'student-dashboard' && <StudentDashboard />}
        {view.kind === 'admin' && <AdminDashboard />}
        {view.kind === 'board' && <BoardPage />}
        {view.kind === 'committee' && <CommitteePage committeeId={view.committeeId} />}
      </main>
      {!isAuthPage && !isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
