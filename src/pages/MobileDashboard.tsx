
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Target, BookOpen, FileText, Calendar, BarChart2, 
  Brain, Camera, Settings, Home, MessageCircle, Plus,
  Github, Database, Cloud, Users, Video, Lightbulb,
  CheckCircle, ExternalLink, Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AICoach from "@/components/mobile/AICoach";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("home");

  // External resources connections
  const externalResources = [
    { 
      id: "github", 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      connected: true,
      description: "Code repositories and documentation"
    },
    { 
      id: "notion", 
      name: "Notion", 
      icon: <FileText className="h-5 w-5" />, 
      connected: false,
      description: "Knowledge base and notes"
    },
    { 
      id: "discord", 
      name: "Discord", 
      icon: <Users className="h-5 w-5" />, 
      connected: true,
      description: "Community discussions"
    },
    { 
      id: "obsidian", 
      name: "Obsidian", 
      icon: <Brain className="h-5 w-5" />, 
      connected: false,
      description: "Personal knowledge management"
    }
  ];

  // AI Assistant tools
  const aiTools = [
    {
      id: "concept-finding",
      title: "Find Concepts",
      icon: <Lightbulb className="h-4 w-4" />,
      description: "Video, blog, post ideas",
      count: "12 generated"
    },
    {
      id: "idea-generation",
      title: "Generate Ideas",
      icon: <Brain className="h-4 w-4" />,
      description: "Creative content ideas",
      count: "8 saved"
    },
    {
      id: "script-creation",
      title: "Create Scripts",
      icon: <FileText className="h-4 w-4" />,
      description: "AI-powered scripts",
      count: "24 created"
    },
    {
      id: "content-calendar",
      title: "Plan Calendar",
      icon: <Calendar className="h-4 w-4" />,
      description: "Content scheduling",
      count: "Next 7 days"
    },
    {
      id: "script-feedback",
      title: "Script Feedback",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "AI analysis & tips",
      count: "3 reviews"
    }
  ];

  // User stats
  const userStats = [
    { label: "Scripts", value: "24", icon: <FileText className="h-4 w-4" /> },
    { label: "Ideas", value: "48", icon: <Lightbulb className="h-4 w-4" /> },
    { label: "Videos", value: "12", icon: <Video className="h-4 w-4" /> }
  ];

  // Bottom navigation icons
  const navIcons = [
    { id: "home", icon: <Home />, label: "Home" },
    { id: "resources", icon: <BookOpen />, label: "Resources" },
    { id: "ai-tools", icon: <Brain />, label: "AI Tools" },
    { id: "profile", icon: <Settings />, label: "Profile" },
  ];

  const handleResourceConnect = (resourceId: string) => {
    console.log(`Connecting to ${resourceId}`);
    // Here would be the actual connection logic
  };

  const handleToolClick = (toolId: string) => {
    console.log(`Opening AI tool: ${toolId}`);
    // Here would open the specific AI tool
  };

  // Redirect to desktop dashboard if not mobile
  if (!isMobile) {
    navigate("/dashboard");
    return null;
  }

  const HomeTab = () => (
    <div className="space-y-4">
      {/* User Welcome */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-coach-primary to-coach-secondary text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">Welcome back, John!</h2>
              <p className="text-sm text-muted-foreground">Ready to create amazing content?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-3 text-center">
              <div className="flex justify-center mb-1">
                {stat.icon}
              </div>
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick AI Tools */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Quick AI Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {aiTools.slice(0, 3).map((tool) => (
            <div key={tool.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                {tool.icon}
                <div>
                  <div className="font-medium text-sm">{tool.title}</div>
                  <div className="text-xs text-muted-foreground">{tool.count}</div>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleToolClick(tool.id)}>
                Use
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const ResourcesTab = () => (
    <div className="space-y-4">
      {/* Connected Resources */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            External Resources
          </CardTitle>
          <CardDescription>Connect to your favorite tools and platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {externalResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                {resource.icon}
                <div>
                  <div className="font-medium">{resource.name}</div>
                  <div className="text-sm text-muted-foreground">{resource.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {resource.connected ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Connected
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleResourceConnect(resource.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills & Knowledge */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Skills & Knowledge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>Video Editing</span>
              <span className="text-muted-foreground">Intermediate</span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div className="h-2 bg-coach-primary rounded-full w-2/3"></div>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>Storytelling</span>
              <span className="text-muted-foreground">Advanced</span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div className="h-2 bg-coach-primary rounded-full w-5/6"></div>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>SEO</span>
              <span className="text-muted-foreground">Beginner</span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div className="h-2 bg-coach-primary rounded-full w-1/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AIToolsTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI Content Tools
          </CardTitle>
          <CardDescription>AI-powered tools using your connected resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiTools.map((tool) => (
            <div key={tool.id} className="p-3 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {tool.icon}
                  <span className="font-medium">{tool.title}</span>
                </div>
                <Button size="sm" className="gradient-bg" onClick={() => handleToolClick(tool.id)}>
                  Open
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{tool.description}</p>
              <p className="text-xs text-coach-primary">{tool.count}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-4">
      {/* User Profile */}
      <Card>
        <CardContent className="p-4 text-center">
          <Avatar className="h-20 w-20 mx-auto mb-3">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-coach-primary to-coach-secondary text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-xl">John Doe</h2>
          <p className="text-muted-foreground">Content Creator</p>
          <Badge variant="secondary" className="mt-2">Free Plan</Badge>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Database className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="home" className="text-xs">Home</TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
            <TabsTrigger value="ai-tools" className="text-xs">AI Tools</TabsTrigger>
            <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="mt-0">
            <HomeTab />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <ResourcesTab />
          </TabsContent>
          
          <TabsContent value="ai-tools" className="mt-0">
            <AIToolsTab />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-0">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating AI Coach */}
      <AICoach />
      
      {/* Bottom Navigation */}
      <BottomNavigation icons={navIcons} />
    </div>
  );
};

export default MobileDashboard;
