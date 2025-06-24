
// src/config/constants.ts
// Fichier de configuration centralisé

export const CONFIG = {
  // URL du backend - utilise une variable d'environnement ou fallback
  HF_SPACE_URL: import.meta.env.VITE_HF_SPACE_URL || "http://localhost:7860",
  
  // Token HuggingFace - à configurer selon votre déploiement
  HF_TOKEN: import.meta.env.VITE_HF_TOKEN || "",
  
  // Configuration Supabase (déjà configurée dans client.ts)
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Validation des variables importantes
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!CONFIG.SUPABASE_URL) {
    errors.push("VITE_SUPABASE_URL manquant");
  }
  
  if (!CONFIG.SUPABASE_ANON_KEY) {
    errors.push("VITE_SUPABASE_ANON_KEY manquant");
  }
  
  if (errors.length > 0) {
    console.error("❌ Configuration manquante:", errors.join(", "));
    return false;
  }
  
  console.log("✅ Configuration validée");
  console.log("📍 Backend URL:", CONFIG.HF_SPACE_URL);
  return true;
};

// Appeler la validation au démarrage (optionnel)
if (import.meta.env.DEV) {
  validateConfig();
}
