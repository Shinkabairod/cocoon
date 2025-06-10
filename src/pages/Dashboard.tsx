
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  CheckCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AIAssistantChat from "@/components/dashboard/AIAssistantChat";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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

  const handleToolClick = (toolId: string) => {
    setActiveSection(toolId);
    // Here we would open the specific AI tool
    console.log(`Opening AI tool: ${toolId}`);
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
                      {tool.icon}
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
