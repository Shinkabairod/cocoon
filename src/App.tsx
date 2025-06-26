import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

// Layout Components
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import OnboardingGuard from '@/components/layout/OnboardingGuard';

// Auth Components
import AuthExperience from '@/components/auth/AuthExperience';

// Pages
import CocoonLandingPage from '@/components/landing/CocoonLandingPage';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import Dashboard from '@/pages/Dashboard';

// Error Boundary
import ErrorBoundary from '@/components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<CocoonLandingPage />} />
              
              {/* Auth Routes - Protected against already authenticated users */}
              <Route 
                path="/auth/*" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <AuthExperience />
                  </ProtectedRoute>
                } 
              />
              
              {/* Onboarding Routes - Requires auth but not completed onboarding */}
              <Route 
                path="/onboarding/*" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <OnboardingGuard requireOnboarding={true}>
                      <OnboardingProvider>
                        <OnboardingFlow />
                      </OnboardingProvider>
                    </OnboardingGuard>
                  </ProtectedRoute>
                } 
              />
              
              {/* Dashboard Routes - Requires auth AND completed onboarding */}
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute requireAuth={true}>
                    <OnboardingGuard requireOnboarding={false}>
                      <Dashboard />
                    </OnboardingGuard>
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect unknown routes to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Global Toast Notifications */}
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;