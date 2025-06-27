import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ user: User | null; error: any }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 AuthProvider: Initializing auth state');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event, session?.user?.email || 'No user');
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        console.log('🔐 Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('🔐 Error getting session:', error);
        } else {
          console.log('🔐 Initial session:', session?.user?.email || 'No session');
          setSession(session);
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error('🔐 Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log('🔐 Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      console.log('🔐 Attempting signup for:', email);
      const redirectUrl = `${window.location.origin}/onboarding`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName || ''
          }
        }
      });

      if (error) {
        console.error('🔐 Signup error:', error);
        return { user: null, error };
      }

      console.log('🔐 Signup successful:', data.user?.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('🔐 Signup exception:', error);
      return { user: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting signin for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('🔐 Signin error:', error);
        return { user: null, error };
      }

      console.log('🔐 Signin successful:', data.user?.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('🔐 Signin exception:', error);
      return { user: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🔐 Attempting signout');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('🔐 Signout error:', error);
        throw error;
      }
      console.log('🔐 Signout successful');
    } catch (error) {
      console.error('🔐 Signout exception:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('🔐 Attempting password reset for:', email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        console.error('🔐 Reset password error:', error);
        return { error };
      }

      console.log('🔐 Password reset email sent');
      return { error: null };
    } catch (error) {
      console.error('🔐 Reset password exception:', error);
      return { error };
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

  console.log('🔐 AuthProvider rendering with:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading,
    userEmail: user?.email 
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
