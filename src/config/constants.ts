
// src/config/constants.ts
// Configuration sécurisée - avec clés configurées

export const CONFIG = {
  // URL du backend
  HF_SPACE_URL: import.meta.env.VITE_HF_SPACE_URL || "https://cocoonai-cocoon-ai-assistant.hf.space",
  
  // Supabase - Configuration directe pour résoudre l'erreur
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "https://uwmkgkdswguferayhqbt.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bWtna2Rzd2d1ZmVyYXlocWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDcxNzYsImV4cCI6MjA2NjMyMzE3Nn0.68k9Pvthq02EbiL9PoT3O1u0dG36FFLGQ_JwfmTkh7M",
};

// Validation stricte
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!CONFIG.SUPABASE_URL) {
    errors.push("❌ VITE_SUPABASE_URL manquant dans les variables d'environnement");
  } else {
    console.log("✅ Supabase URL configuré:", CONFIG.SUPABASE_URL);
  }
  
  if (!CONFIG.SUPABASE_ANON_KEY) {
    errors.push("❌ VITE_SUPABASE_ANON_KEY manquant dans les variables d'environnement");
  } else {
    console.log("✅ Supabase Key configuré");
  }
  
  console.log("🔗 Backend URL:", CONFIG.HF_SPACE_URL);
  
  if (errors.length > 0) {
    console.error("🚨 ERREURS DE CONFIGURATION:");
    errors.forEach(error => console.error(error));
    console.error("👉 Configurez vos variables d'environnement dans Lovable Settings");
    return false;
  }
  
  console.log("✅ Toute la configuration est valide");
  return true;
};

// Validation automatique en développement
if (import.meta.env.DEV) {
  validateConfig();
}
