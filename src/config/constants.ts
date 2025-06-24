
// src/config/constants.ts
// Fichier de configuration centralisé

export const CONFIG = {
  HF_SPACE_URL: import.meta.env.VITE_HF_SPACE_URL || "https://cocoonai-cocoon-ai-assistant.hf.space",
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "https://uwmkgkdswguferayhqbt.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bWtna2Rzd2d1ZmVyYXlocWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDYxNjYsImV4cCI6MjA2NTcyMjE2Nn0.z5sgAIof1dHY8kyxulF3TaFzjy7emYalr4XLJ9uJdeE",
};

export const validateConfig = () => {
  console.log("🔗 Backend URL:", CONFIG.HF_SPACE_URL);
  console.log("🗄️ Supabase URL:", CONFIG.SUPABASE_URL ? "✅ Configuré" : "❌ Manquant");
  console.log("🔑 Supabase Key:", CONFIG.SUPABASE_ANON_KEY ? "✅ Configuré" : "❌ Manquant");
  return true;
};

if (import.meta.env.DEV) {
  validateConfig();
}
