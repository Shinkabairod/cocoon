// src/config/constants.ts
// Configuration sécurisée - SANS clés hardcodées

export const CONFIG = {
  // URL du backend
  HF_SPACE_URL: import.meta.env.VITE_HF_SPACE_URL || "https://cocoonai-cocoon-ai-assistant.hf.space",
  
  // Supabase - DOIT venir des variables d'environnement
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
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