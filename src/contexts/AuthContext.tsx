// src/contexts/AuthContext.tsx
// Contexte d'authentification corrigé avec gestion d'erreurs améliorée

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 AuthProvider: Initialisation...');
    
    // Fonction pour gérer les changements d'état d'auth
    const handleAuthStateChange = async (event: string, session: Session | null) => {
      console.log(`🔐 État auth changé: ${event}`, session?.user?.email || 'Aucun utilisateur');
      
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);

      // Log détaillé pour debug
      if (session) {
        console.log('✅ Session active:', {
          userId: session.user.id,
          email: session.user.email,
          expiresAt: new Date(session.expires_at! * 1000).toLocaleString()
        });
      } else {
        console.log('❌ Aucune session active');
      }
    };

    // Configuration du listener d'état d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Vérification de la session existante
    const checkInitialSession = async () => {
      try {
        console.log('🔐 Vérification de la session existante...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erreur lors de la récupération de la session:', error);
          if (error.message.includes('Invalid API key')) {
            console.error('🚨 CLÉ API INVALIDE - Vérifiez votre configuration Supabase');
          }
        } else {
          console.log('🔐 Session initiale:', session?.user?.email || 'Aucune session');
          setSession(session);
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error('❌ Exception lors de la vérification de session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkInitialSession();

    // Nettoyage
    return () => {
      console.log('🔐 Nettoyage de l\'abonnement auth');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      console.log('🔐 Tentative d\'inscription pour:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: {
            full_name: fullName || '',
            created_at: new Date().toISOString()
          }
        }
      });

      if (error) {
        console.error('❌ Erreur d\'inscription:', error);
        return { user: null, error };
      }

      console.log('✅ Inscription réussie:', data.user?.email);
      return { user: data.user, error: null };
      
    } catch (error) {
      console.error('❌ Exception lors de l\'inscription:', error);
      return { user: null, error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Tentative de connexion pour:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Erreur de connexion:', error);
        if (error.message.includes('Invalid login credentials')) {
          console.error('🚨 Identifiants incorrects');
        } else if (error.message.includes('Invalid API key')) {
          console.error('🚨 CLÉ API INVALIDE - Vérifiez votre configuration');
        }
        return { user: null, error };
      }

      console.log('✅ Connexion réussie:', data.user?.email);
      return { user: data.user, error: null };
      
    } catch (error) {
      console.error('❌ Exception lors de la connexion:', error);
      return { user: null, error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      console.log('🔐 Tentative de déconnexion');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Erreur de déconnexion:', error);
        throw error;
      }
      
      console.log('✅ Déconnexion réussie');
      
    } catch (error) {
      console.error('❌ Exception lors de la déconnexion:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('🔐 Demande de réinitialisation pour:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        console.error('❌ Erreur réinitialisation:', error);
        return { error };
      }

      console.log('✅ Email de réinitialisation envoyé');
      return { error: null };
      
    } catch (error) {
      console.error('❌ Exception lors de la réinitialisation:', error);
      return { error: error as AuthError };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  };

  console.log('🔐 AuthProvider état actuel:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading,
    userEmail: user?.email || 'Aucun'
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;