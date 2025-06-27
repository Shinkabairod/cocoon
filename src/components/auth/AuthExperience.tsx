// src/components/auth/AuthExperience.tsx - Version corrigée
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
  const [justSignedUp, setJustSignedUp] = useState(false); // Nouveau état
  
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Redirection pour utilisateurs authentifiés
  useEffect(() => {
    if (user && !justSignedUp) {
      console.log('✅ User authenticated, redirecting to onboarding...');
      navigate('/onboarding', { replace: true });
    }
  }, [user, navigate, justSignedUp]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setJustSignedUp(true); // Marquer qu'on vient de s'inscrire
    
    console.log('🔄 Starting signup process for:', formData.email);
    
    try {
      const { user: newUser, error } = await signUp(formData.email, formData.password, formData.fullName);
      
      console.log('📋 Signup result:', { newUser, error });
      
      if (error) {
        console.error('❌ Signup error:', error);
        
        let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        
        if (error.message.includes('User already registered')) {
          errorMessage = "Un compte avec cet email existe déjà. Connectez-vous plutôt.";
        } else if (error.message.includes('Invalid email')) {
          errorMessage = "Format d'email invalide.";
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
        }
        
        toast({
          title: "Inscription échouée",
          description: errorMessage,
          variant: "destructive"
        });
        
        setJustSignedUp(false);
        return;
      }
      
      if (newUser) {
        console.log('✅ Signup successful for:', newUser.email);
        
        // ✅ Vérifier si l'email est confirmé
        if (newUser.email_confirmed_at) {
          console.log('📧 Email already confirmed, redirecting immediately');
          toast({
            title: "Compte créé !",
            description: "Bienvenue ! Configurons votre espace de travail."
          });
          
          // Redirection immédiate si email confirmé
          setTimeout(() => {
            navigate('/onboarding', { replace: true });
          }, 1500);
          
        } else {
          console.log('📧 Email confirmation required');
          toast({
            title: "Vérifiez votre email",
            description: "Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour activer votre compte.",
            duration: 8000 // Toast plus long
          });
          
          // Rester sur la page d'inscription
          setJustSignedUp(false);
        }
        
      } else {
        console.log('❓ No user returned but no error');
        toast({
          title: "Vérifiez votre email",
          description: "Un lien de confirmation vous a été envoyé.",
          duration: 8000
        });
        setJustSignedUp(false);
      }
      
    } catch (error) {
      console.error('❌ Signup exception:', error);
      toast({
        title: "Erreur inattendue",
        description: "Veuillez réessayer ou contacter le support.",
        variant: "destructive"
      });
      setJustSignedUp(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    console.log('🔄 Starting signin process for:', formData.email);
    
    try {
      const { user: signedInUser, error } = await signIn(formData.email, formData.password);
      
      console.log('📋 Signin result:', { signedInUser, error });
      
      if (error) {
        console.error('❌ Signin error:', error);
        
        let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter.';
        }
        
        toast({
          title: "Connexion échouée",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      if (signedInUser) {
        console.log('✅ Signin successful for:', signedInUser.email);
        toast({
          title: "Bon retour !",
          description: "Vous êtes maintenant connecté."
        });
        // L'utilisateur sera redirigé par le useEffect
      }
      
    } catch (error) {
      console.error('❌ Signin exception:', error);
      toast({
        title: "Erreur inattendue",
        description: "Veuillez réessayer ou contacter le support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Page d'accueil (welcome step)
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <Logo size="large" className="mb-12" />

        <div className="text-center max-w-md mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight text-center md:text-6xl">
            Ready to{' '}
            <span className="text-violet-600 font-black uppercase tracking-wide">
              OPTIMIZE
            </span>
            <br />
            your skills?
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands creating their AI space
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => setCurrentStep('signup')} 
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Create my AI Space for free
          </Button>
          
          <Button 
            onClick={() => setCurrentStep('signin')} 
            variant="outline" 
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 text-lg rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I already have an account
          </Button>
        </div>

        <div className="mt-8">
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </button>
        </div>
      </div>
    );
  }

  // ✅ Page d'inscription
  if (currentStep === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <Logo size="medium" className="mb-8" />

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create your AI Space
            </h2>
            <p className="text-gray-600">
              Join the content creation revolution
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-4 text-lg"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 text-lg"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 text-lg"
                disabled={loading}
                minLength={6}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating your space...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create my AI Space
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

          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentStep('welcome')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Page de connexion
  if (currentStep === 'signin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <Logo size="medium" className="mb-8" />

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600">
              Sign in to your AI Space
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 text-lg"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-4 text-lg"
                disabled={loading}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-lg transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Access my AI Space
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentStep('signup')}
              className="text-violet-600 hover:text-violet-700 font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentStep('welcome')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};