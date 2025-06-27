import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Sparkles, Rocket, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/ui/Logo';

type AuthStep = 'welcome' | 'signup' | 'signin';

const AuthExperience: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      console.log('✅ User authenticated, redirecting to onboarding');
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log('🔄 Starting signup process for:', formData.email);
    
    try {
      const { user: newUser, error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        console.error('❌ Signup error:', error);
        let errorMessage = error.message;
        
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Try signing in instead.';
        } else if (error.message.includes('invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (newUser) {
        console.log('✅ Signup successful for:', newUser.email);
        toast({
          title: "Account created!",
          description: "Welcome! Let's set up your workspace.",
        });
        // User will be redirected by the useEffect above
      } else {
        toast({
          title: "Please check your email",
          description: "We sent you a confirmation link. Please check your email and click the link to verify your account.",
        });
      }
    } catch (error) {
      console.error('❌ Signup exception:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    console.log('🔄 Starting signin process for:', formData.email);
    
    try {
      const { user: signedInUser, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('❌ Signin error:', error);
        let errorMessage = error.message;
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account before signing in.';
        }
        
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (signedInUser) {
        console.log('✅ Signin successful for:', signedInUser.email);
        toast({
          title: "Welcome back!",
          description: "You're now signed in.",
        });
        // User will be redirected by the useEffect above
      }
    } catch (error) {
      console.error('❌ Signin exception:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Page d'accueil (welcome step)
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Logo uniforme */}
        <Logo size="large" className="mb-12" />

        {/* Titre principal */}
        <div className="text-center max-w-md mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Ready to{' '}
            <span className="text-violet-600 font-black uppercase tracking-wide">
              REVOLUTIONIZE
            </span>
            <br />
            your expertise?
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands creating their AI space
          </p>
        </div>

        {/* Boutons d'action avec design cohérent */}
        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => setCurrentStep('signup')}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-3xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚀 Create my AI Space for free
          </Button>
          
          <Button 
            onClick={() => setCurrentStep('signin')}
            variant="outline" 
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 text-lg rounded-3xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I already have an account
          </Button>
        </div>

        {/* Lien retour */}
        <div className="mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </button>
        </div>
      </div>
    );
  }

  // Page d'inscription
  if (currentStep === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Header avec bouton retour */}
        <div className="w-full max-w-md mb-8">
          <button
            onClick={() => setCurrentStep('welcome')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Logo uniforme */}
        <Logo size="medium" className="mb-8" />

        {/* Titre */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Create your AI Space
          </h2>
          <p className="text-gray-600">
            Start building your personalized AI assistant
          </p>
        </div>

        {/* Formulaire avec design cohérent */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-3xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating your space...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Create my AI Space for free
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentStep('signin')}
              className="text-violet-600 hover:text-violet-700 font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page de connexion
  if (currentStep === 'signin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Header avec bouton retour */}
        <div className="w-full max-w-md mb-8">
          <button
            onClick={() => setCurrentStep('welcome')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Logo uniforme */}
        <Logo size="medium" className="mb-8" />

        {/* Titre */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Sign in to access your AI space
          </p>
        </div>

        {/* Formulaire avec design cohérent */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-3xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sign in to my space
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentStep('signup')}
              className="text-violet-600 hover:text-violet-700 font-medium"
            >
              Don't have an account? Create one
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthExperience;