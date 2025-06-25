// src/pages/Dashboard.tsx - Noms de sections clarifiés
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAITools } from "@/hooks/useAITools";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AIAssistantChat from "@/components/dashboard/AIAssistantChat";
import UserResourcesSection from "@/components/dashboard/UserResourcesSection";
import AIToolsSection from "@/components/dashboard/AIToolsSection";
import QuickStatsSection from "@/components/dashboard/QuickStatsSection";
import AIToolDialog from "@/components/dashboard/AIToolDialog";
import ConnectionTest from "@/components/dashboard/ConnectionTest";
import OnboardingTester from "@/components/dashboard/OnboardingTester";
import OnboardingDataSection from "@/components/dashboard/OnboardingDataSection";
import UserSettingsSection from "@/components/dashboard/UserSettingsSection";
import UserWorkspace from "@/components/dashboard/UserWorkspace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// AJOUTS POUR CONNEXIONS API ⬇️
import { apiService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string>('');
  
  // AJOUTS POUR API ⬇️
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { 
    loading, 
    generateConcepts, 
    generateScript, 
    generateIdeas, 
    getFeedback 
  } = useAITools();

  const handleToolClick = async (toolId: string) => {
    setActiveSection(toolId);
    setResult('');
    setInputValue('');
    
    if (toolId === 'concept-finding') {
      setDialogOpen(true);
      const concepts = await generateConcepts();
      setResult(concepts);
    } else if (toolId === 'script-creation' || toolId === 'idea-generation') {
      setDialogOpen(true);
    }
  };

  // CONNEXION API POUR LES OUTILS ⬇️
  const handleSubmit = async () => {
    if (!inputValue.trim() || !user) {
      toast({
        title: "❌ Erreur",
        description: !user ? "Vous devez être connecté" : "Veuillez saisir une question",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Utiliser l'API réelle au lieu de la simulation
      const response = await apiService.askAI(user.id, inputValue);
      setResult(response.answer || 'Réponse non disponible');
      
      toast({
        title: "✅ Contenu généré !",
        description: "Votre demande a été traitée avec succès.",
      });
    } catch (error) {
      console.error('Erreur API:', error);
      toast({
        title: "❌ Erreur",
        description: "Impossible de générer le contenu.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Creator Hub</h1>
            <p className="text-muted-foreground">
              Gérez votre contenu et utilisez l'IA pour booster votre créativité
            </p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback>{user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </div>

        {/* ONGLETS AVEC NOMS CLARIFIÉS ⬇️ */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="workspace">Espace de travail</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
            <TabsTrigger value="tools">Outils IA</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Mes Fichiers et Ressources */}
            <UserResourcesSection />

            {/* Chat Assistant IA */}
            <AIAssistantChat />

            {/* Statistiques Rapides */}
            <QuickStatsSection />
          </TabsContent>

          <TabsContent value="workspace" className="space-y-6">
            {/* Espace de Travail - Gestion des fichiers */}
            <UserWorkspace />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Données de Mon Profil */}
            <OnboardingDataSection />
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {/* Outils de Création IA */}
            <AIToolsSection loading={loading} onToolClick={handleToolClick} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Paramètres Utilisateur */}
            <UserSettingsSection />
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-6">
            {/* Tests de Connectivité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConnectionTest />
              <OnboardingTester />
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog Outils IA - Conservé avec connexion API ⬇️ */}
        <AIToolDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          activeSection={activeSection}
          inputValue={inputValue}
          setInputValue={setInputValue}
          result={result}
          setResult={setResult}
          loading={loading}
          onSubmit={handleSubmit} // CONNEXION API
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;