
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Configuration avec les clés Supabase mises à jour
const supabaseUrl = "https://uwmkgkdswguferayhqbt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bWtna2Rzd2d1ZmVyYXlocWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDcxNzYsImV4cCI6MjA2NjMyMzE3Nn0.68k9Pvthq02EbiL9PoT3O1u0dG36FFLGQ_JwfmTkh7M";

// Test des clés au démarrage
console.log('🔑 Configuration Supabase:');
console.log('URL:', supabaseUrl);
console.log('Key (début):', supabaseAnonKey.substring(0, 20) + '...');

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'cocoon-ai-v2',
      }
    }
  }
);

// Test de connexion immédiat
if (typeof window !== 'undefined') {
  console.log('🔍 Test de connexion Supabase...');
  
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Erreur session:', error.message);
        if (error.message.includes('Invalid API key')) {
          console.error('🚨 CLÉ API INVALIDE !');
        }
      } else {
        console.log('✅ Supabase OK:', data.session ? 'Session active' : 'Pas de session');
      }
    })
    .catch(err => {
      console.error('❌ Erreur connexion:', err);
    });
}

export { supabaseUrl, supabaseAnonKey };
