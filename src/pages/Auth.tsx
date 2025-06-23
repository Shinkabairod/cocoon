import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const { signUp, signIn, signInWithGoogle, signInWithApple, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if we're in password reset mode
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'reset-password') {
      toast({
        title: "Lien de réinitialisation reçu",
        description: "Veuillez entrer votre nouveau mot de passe.",
      });
    }
  }, [searchParams, toast]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      // Rediriger vers onboarding au lieu du dashboard
      // OnboardingGuard se chargera de rediriger vers dashboard si onboarding déjà terminé
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (signUpForm.password.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(signUpForm.email, signUpForm.password, signUpForm.fullName);
    
    if (error) {
      toast({
        title: "Inscription échouée",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès !",
        description: "Veuillez vérifier votre email pour confirmer votre compte.",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(signInForm.email, signInForm.password);
    
    if (error) {
      let errorMessage = error.message;
      if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Veuillez vérifier votre email et confirmer votre compte avant de vous connecter.';
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe invalide. Veuillez réessayer.';
      }
      
      toast({
        title: "Connexion échouée",
        description: errorMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bienvenue !",
        description: "Vous êtes maintenant connecté.",
      });
      // OnboardingGuard s'occupera de la redirection appropriée
      navigate('/onboarding');
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast({
        title: "Connexion Google échouée",
        description: error.message,
        variant: "destructive",
      });
      setSocialLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    setSocialLoading('apple');
    const { error } = await signInWithApple();
    
    if (error) {
      toast({
        title: "Connexion Apple échouée",
        description: error.message,
        variant: "destructive",
      });
      setSocialLoading(null);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Title */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Cocoon AI Assistant</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Réinitialisation du mot de passe</CardTitle>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold gradient-text">Cocoon AI Assistant</h1>
          <p className="text-muted-foreground">Bienvenue ! Connectez-vous pour continuer.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Authentification</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte ou créez-en un nouveau
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={socialLoading !== null}
                className="w-full"
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continuer avec Google
              </Button>
              <Button
                variant="outline"
                onClick={handleAppleSignIn}
                disabled={socialLoading !== null}
                className="w-full"
              >
                {socialLoading === 'apple' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                )}
                Continuer avec Apple
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou</span>
              </div>
            </div>

            <Tabs defaultValue="signin" className="space-y-4 mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Se connecter</TabsTrigger>
                <TabsTrigger value="signup">S'inscrire</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Entrez votre email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Mot de passe</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="text-right">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Mot de passe oublié ?
                    </Button>
                  </div>
                  
                  <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      'Se connecter'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname">Nom complet</Label>
                    <Input
                      id="signup-fullname"
                      type="text"
                      placeholder="Entrez votre nom complet"
                      value={signUpForm.fullName}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Entrez votre email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Créez un mot de passe (min. 6 caractères)"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirmer le mot de passe</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création du compte...
                      </>
                    ) : (
                      'S\'inscrire'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
