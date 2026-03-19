import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CosmicBackground } from './components/CosmicBackground';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardLayout, DashboardHome } from './pages/Dashboard';
import { CampaignsPage } from './pages/CampaignsPage';
import { NewCampaignWizard } from './pages/NewCampaignWizard';
import { AIGenerator } from './pages/AIGenerator';
import { SignalsFeed } from './pages/SignalsFeed';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsIntegrations } from './pages/SettingsIntegrations';
import { ProspectsPage } from './pages/ProspectsPage';
import { SequencesPage } from './pages/SequencesPage';
import { TemplatesPage } from './pages/TemplatesPage';

import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-deep">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <CosmicBackground />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><DashboardLayout><CampaignsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/campaigns/new" element={<ProtectedRoute><DashboardLayout><NewCampaignWizard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/generator" element={<ProtectedRoute><DashboardLayout><AIGenerator /></DashboardLayout></ProtectedRoute>} />
          <Route path="/signals" element={<ProtectedRoute><DashboardLayout><SignalsFeed /></DashboardLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsIntegrations /></DashboardLayout></ProtectedRoute>} />
          <Route path="/prospects" element={<ProtectedRoute><DashboardLayout><ProspectsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/sequences" element={<ProtectedRoute><DashboardLayout><SequencesPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/templates" element={<ProtectedRoute><DashboardLayout><TemplatesPage /></DashboardLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-border-default">
      <div className="w-8 h-8 rounded bg-linear-to-br from-indigo-primary to-teal-primary animate-pulse" />
    </div>
    <h2 className="text-2xl font-display font-bold">{title}</h2>
    <p className="text-white/40">This module is currently in beta. Check back soon!</p>
  </div>
);
