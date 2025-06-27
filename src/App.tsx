
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <OnboardingProvider>
            <Router>
              <div className="min-h-screen bg-white">
                <Routes>
                  {/* Public Landing Page */}
                  <Route path="/" element={<CocoonLandingPage />} />
                  
                  {/* Auth Routes - Only accessible when NOT authenticated */}
                  <Route 
                    path="/auth/*" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <AuthExperience />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Onboarding Routes - Requires auth + incomplete onboarding */}
                  <Route 
                    path="/onboarding/*" 
                    element={
                      <OnboardingGuard requireOnboarding={true}>
                        <OnboardingFlow />
                      </OnboardingGuard>
                    } 
                  />
                  
                  {/* Dashboard Routes - Requires auth + completed onboarding */}
                  <Route 
                    path="/dashboard/*" 
                    element={
                      <OnboardingGuard requireOnboarding={false}>
                        <Dashboard />
                      </OnboardingGuard>
                    } 
                  />
                  
                  {/* Redirect unknown routes to landing */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                
                {/* Global Toast Notifications */}
                <Toaster />
              </div>
            </Router>
          </OnboardingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
