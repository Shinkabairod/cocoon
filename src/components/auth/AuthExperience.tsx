// src/components/auth/AuthExperience.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Sparkles, Rocket } from 'lucide-react';

type AuthStep = 'welcome' | 'signup' | 'signin';

const AuthExperience: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { user, error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        console.error('Signup error:', error);
        return;
      }

      if (user) {
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Error in signup process:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { user, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Login error:', error);
        return;
      }

      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error in login process:', error);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    navigate('/');
  };

  // Welcome Step
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        {/* Background pattern subtil */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative max-w-lg w-full text-center space-y-12">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white transform rotate-45 rounded-sm"></div>
              </div>
              <div className="absolute inset-0 bg-black rounded-lg blur opacity-30 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-black">Cocoon AI</span>
          </div>

          {/* Titre principal */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Ready to <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">transform</span> your expertise?
            </h1>
            <p className="text-xl text-gray-600">
              Join thousands creating their AI bot
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentStep('signup')}
              size="lg" 
              className="w-full bg-black hover:bg-gray-800 text-white py-6 text-xl font-semibold group shadow-xl hover:shadow-black/25 transition-all duration-300"
            >
              <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Create my bot for free
            </Button>
            
            <Button 
              onClick={() => setCurrentStep('signin')}
              variant="outline" 
              size="lg"
              className="w-full py-6 text-xl border-2 border-gray-300 hover:border-black hover:scale-105 transition-all duration-300"
            >
              I already have an account
            </Button>
          </div>

          {/* Retour */}
          <Button variant="ghost" onClick={goHome} className="text-gray-500 hover:text-gray-900">
            ← Back to homepage
          </Button>
        </div>
      </div>
    );
  }

  // Sign Up Step
  if (currentStep === 'signup') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative max-w-md w-full space-y-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep('welcome')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Titre */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Create your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">account</span>
            </h1>
            <p className="text-gray-600">Setup takes less than 2 minutes</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Choose a password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create my bot
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            By creating an account, you agree to our terms
          </p>
        </div>
      </div>
    );
  }

  // Sign In Step
  if (currentStep === 'signin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="relative max-w-md w-full space-y-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => setCurrentStep('welcome')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Titre */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">back</span>
            </h1>
            <p className="text-gray-600">Sign in to access your bot</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in to my bot
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
              Forgot password?
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthExperience;