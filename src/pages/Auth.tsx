
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const { signUp, signIn, user } = useAuth();
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
      navigate('/onboarding');
    }
    
    setIsLoading(false);
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
            <Tabs defaultValue="signin" className="space-y-4">
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
