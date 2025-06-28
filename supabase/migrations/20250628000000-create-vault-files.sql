
-- Migration pour créer la table vault_files pour My Workspace
-- Créé le 28 juin 2025

-- Créer la table vault_files si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.vault_files (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  content TEXT,
  file_type TEXT DEFAULT 'md',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE public.vault_files ENABLE ROW LEVEL SECURITY;

-- Créer les politiques de sécurité
CREATE POLICY "Users can view their own files" 
  ON public.vault_files 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own files" 
  ON public.vault_files 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own files" 
  ON public.vault_files 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files" 
  ON public.vault_files 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_vault_files_user_id ON public.vault_files(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_files_path ON public.vault_files(path);
CREATE INDEX IF NOT EXISTS idx_vault_files_file_type ON public.vault_files(file_type);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_vault_files_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_vault_files_updated_at
  BEFORE UPDATE ON public.vault_files
  FOR EACH ROW
  EXECUTE FUNCTION update_vault_files_updated_at();
