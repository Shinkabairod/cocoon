
// Configuration sécurisée avec les nouvelles clés
export const CONFIG = {
  // URL du backend
  HF_SPACE_URL: "https://cocoonai-cocoon-ai-assistant.hf.space",
  
  // Supabase - Configuration mise à jour
  SUPABASE_URL: "https://uwmkgkdswguferayhqbt.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bWtna2Rzd2d1ZmVyYXlocWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NDcxNzYsImV4cCI6MjA2NjMyMzE3Nn0.68k9Pvthq02EbiL9PoT3O1u0dG36FFLGQ_JwfmTkh7M",
};

// Validation stricte
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!CONFIG.SUPABASE_URL) {
    errors.push("❌ SUPABASE_URL manquant dans la configuration");
  } else {
    console.log("✅ Supabase URL configuré:", CONFIG.SUPABASE_URL);
  }
  
  if (!CONFIG.SUPABASE_ANON_KEY) {
    errors.push("❌ SUPABASE_ANON_KEY manquant dans la configuration");
  } else {
    console.log("✅ Supabase Key configuré et mis à jour");
  }
  
  console.log("🔗 Backend URL:", CONFIG.HF_SPACE_URL);
  
  if (errors.length > 0) {
    console.error("🚨 ERREURS DE CONFIGURATION:");
    errors.forEach(error => console.error(error));
    return false;
  }
  
  console.log("✅ Toute la configuration est valide");
  return true;
};

// Validation automatique en développement
if (import.meta.env.DEV) {
  validateConfig();
}
