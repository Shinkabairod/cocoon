
// src/config/constants.ts
// Fichier de configuration centralisé

export const CONFIG = {
  HF_SPACE_URL: import.meta.env.VITE_HF_SPACE_URL || "https://huggingface.co/spaces/Cocoonai/cocoon-ai-assistant",
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

export const validateConfig = () => {
  console.log("🔗 Backend URL:", CONFIG.HF_SPACE_URL);
  console.log("🗄️ Supabase URL:", CONFIG.SUPABASE_URL ? "✅ Configuré" : "❌ Manquant");
  return true;
};

if (import.meta.env.DEV) {
  validateConfig();
}
