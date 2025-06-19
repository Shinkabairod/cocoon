import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAITools } from "@/hooks/useAITools";
import { 
  User, 
  BookOpen, 
  Brain, 
  Users, 
  Video, 
  Lightbulb, 
  FileText, 
  Calendar, 
  MessageSquare,
  Play,
  PenTool,
  CheckCircle,
  Loader2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AIAssistantChat from "@/components/dashboard/AIAssistantChat";

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
  
  // User resources sections
  const userResourcesSections = [
    {
      id: "user-info",
      title: "User Info",
      icon: <User className="h-5 w-5" />,
      description: "Your profile and preferences",
      items: ["Experience Level: Intermediate", "Content Goals: Build a brand", "Target Audience: Millennials"]
    },
    {
      id: "skills-knowledge",
      title: "Skills & Knowledge",
      icon: <Brain className="h-5 w-5" />,
      description: "Your current skills and areas for improvement",
      items: ["Video Editing: Beginner", "Storytelling: Intermediate", "SEO: Needs improvement"]
    },
    {
      id: "community",
      title: "Community Sharing",
      icon: <Users className="h-5 w-5" />,
      description: "Connect with other creators",
      items: ["3 Active discussions", "5 Shared scripts", "12 Community members"]
    },
    {
      id: "training-videos",
      title: "Training Videos",
      icon: <Video className="h-5 w-5" />,
      description: "Continuous learning content",
      items: ["Advanced Storytelling", "Mobile Filming", "Content Strategy"]
    }
  ];

  // AI Assistant tools
  const aiTools = [
    {
      id: "concept-finding",
      title: "Finding Concept",
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Discover video, blog, and post concepts",
      action: "Generate Concepts"
    },
    {
      id: "idea-generation",
      title: "Finding Ideas",
      icon: <Brain className="h-5 w-5" />,
      description: "Get creative ideas for your content",
      action: "Get Ideas"
    },
    {
      id: "script-creation",
      title: "Create Script",
      icon: <FileText className="h-5 w-5" />,
      description: "Generate personalized scripts",
      action: "Create Script"
    },
    {
      id: "content-calendar",
      title: "Content Calendar",
      icon: <Calendar className="h-5 w-5" />,
      description: "Plan your content schedule",
      action: "Plan Content"
    },
    {
      id: "script-feedback",
      title: "Script Feedback",
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Get AI feedback on your scripts",
      action: "Get Feedback"
    }
  ];

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

  const getDialogTitle = () => {
    switch (activeSection) {
      case 'concept-finding': return 'Concepts générés';
      case 'script-creation': return 'Générateur de Script';
      case 'idea-generation': return 'Générateur d\'Idées';
      case 'script-feedback': return 'Feedback IA';
      default: return 'Outil IA';
    }
  };

  const getInputPlaceholder = () => {
    switch (activeSection) {
      case 'script-creation': return 'Décrivez le sujet de votre vidéo...';
      case 'idea-generation': return 'Quelle catégorie de contenu vous intéresse ?';
      case 'script-feedback': return 'Collez votre contenu ici pour obtenir un feedback...';
      default: return 'Entrez votre demande...';
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

        {/* User Resources Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userResourcesSections.map((section) => (
              <Card key={section.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.items.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-coach-primary mr-2"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Assistant Tools Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">AI Assistant Tools</h2>
            <Badge variant="secondary" className="bg-coach-primary/10 text-coach-primary">
              Powered by your resources
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coach-primary to-coach-secondary flex items-center justify-center mr-3 text-white group-hover:scale-110 transition-transform">
                      {loading && ['concept-finding', 'script-creation', 'idea-generation', 'script-feedback'].includes(tool.id) ? 
                        <Loader2 className="h-5 w-5 animate-spin" /> : 
                        tool.icon
                      }
                    </div>
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleToolClick(tool.id)}
                    className="w-full gradient-bg"
                    variant="default"
                    disabled={loading}
                  >
                    {tool.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Assistant Chat */}
        <AIAssistantChat />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scripts Generated</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <FileText className="h-8 w-8 text-coach-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Content Planned</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="h-8 w-8 text-coach-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Interactions</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <MessageSquare className="h-8 w-8 text-coach-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tool Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{getDialogTitle()}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {(activeSection === 'script-creation' || activeSection === 'idea-generation' || activeSection === 'script-feedback') && !result && (
                <div className="space-y-4">
                  {activeSection === 'script-creation' || activeSection === 'idea-generation' ? (
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
    </DashboardLayout>
  );
};

export default Dashboard;
