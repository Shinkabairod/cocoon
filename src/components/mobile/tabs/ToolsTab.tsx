
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAITools } from '@/hooks/useAITools';
import { 
  Lightbulb, FileText, Zap, MessageSquare, BarChart3, 
  TrendingUp, Plus, Eye, Github, BookOpen, Shield, Loader2
} from 'lucide-react';

interface ToolsTabProps {
  onIconClick: (id: string) => void;
}

const ToolsTab = ({ onIconClick }: ToolsTabProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string>('');
  
  const { 
    loading, 
    generateConcepts, 
    generateScript, 
    generateIdeas, 
    getFeedback, 
    analyzePerformance, 
    optimizeContent 
  } = useAITools();

  const handleToolClick = async (toolId: string) => {
    setDialogType(toolId);
    setResult('');
    setInputValue('');
    
    if (toolId === 'concept') {
      setDialogOpen(true);
      const concepts = await generateConcepts();
      setResult(concepts);
    } else if (toolId === 'analytics') {
      setDialogOpen(true);
      const analysis = await analyzePerformance();
      setResult(analysis);
    } else if (toolId === 'script' || toolId === 'ideas' || toolId === 'feedback' || toolId === 'optimize') {
      setDialogOpen(true);
    } else {
      onIconClick(toolId);
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    
    try {
      let response = '';
      
      switch (dialogType) {
        case 'script':
          response = await generateScript(inputValue);
          break;
        case 'ideas':
          response = await generateIdeas(inputValue);
          break;
        case 'feedback':
          response = await getFeedback(inputValue);
          break;
        case 'optimize':
          response = await optimizeContent(inputValue);
          break;
      }
      
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getDialogTitle = () => {
    switch (dialogType) {
      case 'concept': return 'Générateur de Concepts';
      case 'script': return 'Générateur de Script';
      case 'ideas': return 'Générateur d\'Idées';
      case 'feedback': return 'Feedback IA';
      case 'analytics': return 'Analyse de Performance';
      case 'optimize': return 'Optimisation de Contenu';
      default: return 'Outil IA';
    }
  };

  const getInputPlaceholder = () => {
    switch (dialogType) {
      case 'script': return 'Décrivez le sujet de votre vidéo...';
      case 'ideas': return 'Quelle catégorie de contenu vous intéresse ?';
      case 'feedback': return 'Collez votre contenu ici pour obtenir un feedback...';
      case 'optimize': return 'Collez le contenu à optimiser...';
      default: return 'Entrez votre demande...';
    }
  };

  const aiToolCategories = [
    {
      title: "Création de Contenu",
      description: "Générez et améliorez vos contenus",
      icons: [
        { id: "concept", icon: <Lightbulb className="h-6 w-6" />, label: "Concepts" },
        { id: "script", icon: <FileText className="h-6 w-6" />, label: "Scripts" },
        { id: "ideas", icon: <Zap className="h-6 w-6" />, label: "Idées" }
      ]
    },
    {
      title: "Analyse & Feedback",
      description: "Améliorez avec l'IA",
      icons: [
        { id: "feedback", icon: <MessageSquare className="h-6 w-6" />, label: "Feedback" },
        { id: "analytics", icon: <BarChart3 className="h-6 w-6" />, label: "Analytics" },
        { id: "optimize", icon: <TrendingUp className="h-6 w-6" />, label: "Optimiser" }
      ]
    },
    {
      title: "Références Créateurs",
      description: "Ajoutez et gérez des comptes pour inspiration",
      icons: [
        { id: "add-creator", icon: <Plus className="h-6 w-6" />, label: "Ajouter" },
        { id: "view-references", icon: <Eye className="h-6 w-6" />, label: "Références" },
        { id: "analyze-creators", icon: <BarChart3 className="h-6 w-6" />, label: "Analyser" }
      ]
    }
  ];

  const resourceIcons = [
    { id: "github", icon: <Github className="h-5 w-5" />, label: "GitHub", status: "connected" },
    { id: "notion", icon: <BookOpen className="h-5 w-5" />, label: "Notion", status: "disconnected" },
    { id: "obsidian", icon: <Eye className="h-5 w-5" />, label: "Obsidian", status: "connected" },
    { id: "logseq", icon: <Shield className="h-5 w-5" />, label: "LogSeq", status: "disconnected" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-coach-primary">Outils de Création</h2>
        <p className="text-sm text-muted-foreground mt-1">Créez, analysez et optimisez vos contenus</p>
      </div>

      {/* Tool Categories */}
      {aiToolCategories.map((category, index) => (
        <Card key={index} className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {category.icons.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                disabled={loading}
                className="flex flex-col items-center p-4 rounded-lg bg-soft-blue hover:bg-soft-blue/80 transition-colors disabled:opacity-50"
              >
                <div className="text-coach-primary mb-2">
                  {loading && ['concept', 'script', 'ideas', 'feedback', 'analytics', 'optimize'].includes(tool.id) ? 
                    <Loader2 className="h-6 w-6 animate-spin" /> : 
                    tool.icon
                  }
                </div>
                <span className="text-xs font-medium text-center">{tool.label}</span>
              </button>
            ))}
          </div>
        </Card>
      ))}

      {/* Connected Resources */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-coach-primary" />
          Ressources Connectées
        </h3>
        <div className="space-y-3">
          {resourceIcons.map(({ id, icon, label, status }) => (
            <div key={id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-coach-primary">{icon}</div>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <Badge 
                variant={status === 'connected' ? 'default' : 'outline'}
                className={status === 'connected' ? 'bg-green-100 text-green-700' : ''}
              >
                {status === 'connected' ? 'Connecté' : 'Connecter'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Tool Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {(dialogType === 'script' || dialogType === 'ideas' || dialogType === 'feedback' || dialogType === 'optimize') && !result && (
              <div className="space-y-4">
                {dialogType === 'script' || dialogType === 'ideas' ? (
                  <Input
                    placeholder={getInputPlaceholder()}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  <Textarea
                    placeholder={getInputPlaceholder()}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                  />
                )}
                <Button onClick={handleSubmit} disabled={loading || !inputValue.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    'Générer'
                  )}
                </Button>
              </div>
            )}
            
            {result && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setResult('');
                    setInputValue('');
                  }}
                >
                  Nouveau
                </Button>
              </div>
            )}
            
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Génération en cours...</span>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToolsTab;
