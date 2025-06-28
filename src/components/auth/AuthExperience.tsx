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
      console.log('✅ User authenticated, redirecting to onboarding...');
      navigate('/onboarding', { replace: true });
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs
    if (!formData.email.trim()) {
      toast({
        title: "❌ Email requis",
        description: "Veuillez saisir votre adresse email",
        variant: "destructive"
      });
      return;
    }

    if (!formData.password.trim()) {
      toast({
        title: "❌ Mot de passe requis",
        description: "Veuillez créer un mot de passe",
        variant: "destructive"
      });
      return;
    }

    if (!formData.fullName.trim()) {
      toast({
        title: "❌ Nom requis",
        description: "Veuillez saisir votre nom complet",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "❌ Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return;
    }

    // Validation email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "❌ Email invalide",
        description: "Veuillez saisir une adresse email valide",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    console.log('🚀 Début de l\'inscription pour:', formData.email);
    
    try {
      const { user: newUser, error } = await signUp(
        formData.email.trim(), 
        formData.password, 
        formData.fullName.trim()
      );
      
      console.log('📋 Résultat inscription:', { newUser, error });
      
      if (error) {
        console.error('❌ Erreur inscription:', error);
        
        let errorMessage = error.message;
        
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          errorMessage = 'Cette adresse email est déjà utilisée. Essayez de vous connecter.';
        } else if (error.message.includes('invalid email')) {
          errorMessage = 'Adresse email invalide.';
        } else if (error.message.includes('password')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
        } else if (error.message.includes('weak password')) {
          errorMessage = 'Le mot de passe est trop faible. Utilisez au moins 6 caractères avec lettres et chiffres.';
        }
        
        toast({
          title: "❌ Échec de l'inscription",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      if (newUser) {
        console.log('✅ Inscription réussie pour:', newUser.email);
        console.log('📧 Email confirmé?', newUser.email_confirmed_at);
        
        toast({
          title: "🎉 Compte créé !",
          description: "Bienvenue ! Configurons maintenant votre espace.",
        });
        
        // Attendre un peu que le contexte se mette à jour
        setTimeout(() => {
          console.log('🔄 Redirection vers onboarding...');
          navigate('/onboarding', { replace: true });
        }, 1500);
        
      } else {
        console.log('📧 Confirmation d\'email requise');
        toast({
          title: "📧 Vérifiez votre email",
          description: "Nous vous avons envoyé un lien de confirmation. Cliquez sur le lien dans l'email pour activer votre compte.",
        });
        
        // Réinitialiser le formulaire
        setFormData({ email: '', password: '', fullName: '' });
        setCurrentStep('signin');
      }
      
    } catch (error) {
      console.error('❌ Exception lors de l\'inscription:', error);
      toast({
        title: "❌ Erreur technique",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "❌ Informations manquantes",
        description: "Veuillez saisir votre email et mot de passe",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    console.log('🔄 Début de la connexion pour:', formData.email);
    
    try {
      const { user: signedInUser, error } = await signIn(formData.email.trim(), formData.password);
      
      if (error) {
        console.error('❌ Erreur de connexion:', error);
        
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect. Vérifiez vos identifiants.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter.';
        }
        
        toast({
          title: "❌ Connexion échouée",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }
      
      if (signedInUser) {
        console.log('✅ Connexion réussie pour:', signedInUser.email);
        toast({
          title: "✅ Bienvenue !",
          description: "Vous êtes maintenant connecté.",
        });
        // La redirection se fera via useEffect
      }
      
    } catch (error) {
      console.error('❌ Exception lors de la connexion:', error);
      toast({
        title: "❌ Erreur technique",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Page d'accueil (welcome step)
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
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Create my AI Space for free
          </Button>
          
          <Button 
            onClick={() => setCurrentStep('signin')} 
            variant="outline" 
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 text-lg rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I already have an account
          </Button>
        </div>
        
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
        <div className="w-full max-w-md mb-8">
          <button 
            onClick={() => setCurrentStep('welcome')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <Logo size="medium" className="mb-8" />

        <div className="text-center mb-8">
          <h2 className="font-bold mb-2 text-4xl md:text-6xl text-violet-600">
            Create your AI Space
          </h2>
          <p className="text-gray-600">Start building your personalized AI space</p>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input 
                type="text" 
                placeholder="Nom complet" 
                value={formData.fullName} 
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} 
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <Input 
                type="email" 
                placeholder="Adresse email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm" 
                required 
                disabled={loading}
              />
            </div>
            <div>
              <Input 
                type="password" 
                placeholder="Mot de passe (min. 6 caractères)" 
                value={formData.password} 
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} 
                className="w-full py-3 px-4 rounded-2xl border border-gray-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm" 
                required 
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Créer mon espace IA gratuitement
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentStep('signin')} 
              className="text-violet-600 hover:text-violet-700 font-medium"
              disabled={loading}
            >
              Déjà un compte ? Se connecter
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
        <div className="w-full max-w-md mb-8">
          <button 
            onClick={() => setCurrentStep('welcome')} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <Logo size="medium" className="mb-8" />

        <div className="text-center mb-8">
          <h2 className="font-bold mb-2 text-violet-600 text-4xl md:text-6xl">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Sign in to access your AI space
          </p>
        </div>

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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Se connecter à mon espace
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentStep('signup')} 
              className="text-violet-600 hover:text-violet-700 font-medium"
              disabled={loading}
            >
              Pas de compte ? En créer un
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthExperience;