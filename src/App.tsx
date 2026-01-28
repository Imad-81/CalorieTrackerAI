
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Stats } from './pages/Stats';
import { LandingPage } from './pages/LandingPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

// Placeholder for Login
const Login = () => <div className="p-10 text-4xl font-black text-white">Login Page (WIP)</div>;
const Profile = () => <div className="p-10 text-4xl font-black text-white">Profile Settings (WIP)</div>;

function App() {
  return (
    <Router>
      {/* Global Modals */}
      <OnboardingModal />

      <div className="min-h-screen bg-obsidian text-crisp-white font-sans selection:bg-electric-lime selection:text-obsidian">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard Routes wrapped in Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
