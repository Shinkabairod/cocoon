import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Import des composants d'auth
import AuthWelcomePage from './AuthWelcomePage';
import SignupSteps from './SignupSteps';
import LoginPage from './LoginPage';
import ForgotPasswordForm from './ForgotPasswordForm';

// Types
type AuthFlow = 'welcome' | 'signup' | 'login' | 'forgot-password';

const AuthExperience: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<AuthFlow>('welcome');
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  // Handlers pour la navigation
  const handleLoginClick = () => setCurrentFlow('login');
  const handleSignupClick = () => setCurrentFlow('signup');
  const handleBackToWelcome = () => setCurrentFlow('welcome');
  const handleForgotPassword = () => setCurrentFlow('forgot-password');

  // Handler pour la completion de l'inscription
  const handleSignupComplete = async (formData: {
    email: string;
    password: string;
    fullName: string;
    agreeToTerms: boolean;
  }) => {
    try {
      const { user, error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        console.error('Signup error:', error);
        return;
      }

      if (user) {
        // Redirect to onboarding after successful signup
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Error in signup process:', error);
    }
  };

  // Handler pour la connexion
  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const { user, error } = await signIn(credentials.email, credentials.password);
      
      if (error) {
        console.error('Login error:', error);
        return;
      }

      if (user) {
        // Navigation will be handled by OnboardingGuard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error in login process:', error);
    }
  };

  // Handler pour le succès du mot de passe oublié
  const handleForgotPasswordSuccess = () => {
    setCurrentFlow('login');
  };

  // Rendu conditionnel basé sur le flow actuel
  const renderCurrentFlow = () => {
    switch (currentFlow) {
      case 'welcome':
        return (
          <AuthWelcomePage
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
          />
        );
      
      case 'signup':
        return (
          <SignupSteps
            onComplete={handleSignupComplete}
            onBack={handleBackToWelcome}
          />
        );
      
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={handleBackToWelcome}
            onForgotPassword={handleForgotPassword}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBack={() => setCurrentFlow('login')}
            onSuccess={handleForgotPasswordSuccess}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderCurrentFlow()}
    </div>
  );
};

export default AuthExperience;