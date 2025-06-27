// src/integrations/supabase/client.ts
// Configuration Supabase corrigée et sécurisée

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Configuration centralisée
const supabaseUrl = "https://uwmkgkdswguferayhqbt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bWtna2Rzd2d1ZmVyYXlocWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDYxNjYsImV4cCI6MjA2NTcyMjE2Nn0.z5sgAIof1dHY8kyxulF3TaFzjy7emYalr4XLJ9uJdeE";

// Vérification des clés au démarrage
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Configuration Supabase manquante');
  console.error('URL:', supabaseUrl ? '✅' : '❌');
  console.error('Key:', supabaseAnonKey ? '✅' : '❌');
}

// Création du client avec options optimisées
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      // Configuration d'authentification améliorée
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce', // Plus sécurisé
    },
    global: {
      headers: {
        'X-Client-Info': 'cocoon-ai-assistant',
      }
    },
    // Configuration pour éviter les erreurs CORS
    realtime: {
      headers: {
        'apikey': supabaseAnonKey,
      }
    }
  }
);

// Test de connexion au démarrage
if (typeof window !== 'undefined') {
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.warn('⚠️ Erreur session Supabase:', error.message);
      } else {
        console.log('✅ Supabase connecté:', data.session ? 'Session active' : 'Pas de session');
      }
    })
    .catch(err => {
      console.error('❌ Erreur connexion Supabase:', err);
    });
}

export { supabaseUrl, supabaseAnonKey };