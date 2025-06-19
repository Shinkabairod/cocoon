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

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string>('');
  
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
    } else if (toolId === 'script-creation' || toolId === 'idea-generation' || toolId === 'script-feedback') {
      setDialogOpen(true);
    } else {
      console.log(`Opening AI tool: ${toolId}`);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    try {
      let response = '';
      
      switch (activeSection) {
        case 'script-creation':
          response = await generateScript(inputValue);
          break;
        case 'idea-generation':
          response = await generateIdeas(inputValue);
          break;
        case 'script-feedback':
          response = await getFeedback(inputValue);
          break;
      }
      
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Your AI-powered content creation workspace</p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-coach-primary to-coach-secondary text-white text-xl">
              JD
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Test de connectivité (temporaire pour validation) */}
        <div className="flex justify-end">
          <ConnectionTest />
        </div>

        {/* User Resources Section */}
        <UserResourcesSection />

        {/* AI Assistant Tools Section */}
        <AIToolsSection loading={loading} onToolClick={handleToolClick} />

        {/* AI Assistant Chat */}
        <AIAssistantChat />

        {/* Quick Stats */}
        <QuickStatsSection />

        {/* AI Tool Dialog */}
        <AIToolDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          activeSection={activeSection}
          inputValue={inputValue}
          setInputValue={setInputValue}
          result={result}
          setResult={setResult}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
