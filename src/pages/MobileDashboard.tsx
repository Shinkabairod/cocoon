
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Target, BookOpen, FileText, Calendar, BarChart2, 
  Brain, Camera, Settings, Home, MessageCircle, Plus,
  Github, Database, Cloud, Users, Video, Lightbulb,
  CheckCircle, ExternalLink, Bell, TrendingUp, Zap,
  Star, Clock, Award, BookmarkPlus, Share2, Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
      description: "Code repositories and documentation",
      lastSync: "2 hours ago"
    },
    { 
      id: "notion", 
      name: "Notion", 
      icon: <FileText className="h-5 w-5" />, 
      connected: false,
      description: "Knowledge base and notes",
      lastSync: "Never"
    },
    { 
      id: "discord", 
      name: "Discord", 
      icon: <Users className="h-5 w-5" />, 
      connected: true,
      description: "Community discussions",
      lastSync: "5 minutes ago"
    },
    { 
      id: "obsidian", 
      name: "Obsidian", 
      icon: <Brain className="h-5 w-5" />, 
      connected: false,
      description: "Personal knowledge management",
      lastSync: "Never"
    }
  ];

  // AI Assistant tools
  const aiTools = [
    {
      id: "concept-finding",
      title: "Find Concepts",
      icon: <Lightbulb className="h-4 w-4" />,
      description: "Video, blog, post ideas",
      count: "12 generated",
      trending: true
    },
    {
      id: "idea-generation",
      title: "Generate Ideas",
      icon: <Brain className="h-4 w-4" />,
      description: "Creative content ideas",
      count: "8 saved",
      trending: false
    },
    {
      id: "script-creation",
      title: "Create Scripts",
      icon: <FileText className="h-4 w-4" />,
      description: "AI-powered scripts",
      count: "24 created",
      trending: true
    },
    {
      id: "content-calendar",
      title: "Plan Calendar",
      icon: <Calendar className="h-4 w-4" />,
      description: "Content scheduling",
      count: "Next 7 days",
      trending: false
    },
    {
      id: "script-feedback",
      title: "Script Feedback",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "AI analysis & tips",
      count: "3 reviews",
      trending: false
    },
    {
      id: "content-analytics",
      title: "Analytics Insights",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Performance tracking",
      count: "New insights",
      trending: true
    }
  ];

  // User stats with progress
  const userStats = [
    { label: "Scripts", value: "24", icon: <FileText className="h-4 w-4" />, progress: 75 },
    { label: "Ideas", value: "48", icon: <Lightbulb className="h-4 w-4" />, progress: 60 },
    { label: "Videos", value: "12", icon: <Video className="h-4 w-4" />, progress: 40 }
  ];

  // Daily challenges
  const dailyChallenges = [
    { id: 1, title: "Create 3 content ideas", reward: "10 XP", completed: true },
    { id: 2, title: "Write a script", reward: "15 XP", completed: false },
    { id: 3, title: "Connect a new resource", reward: "20 XP", completed: false }
  ];

  // Recent activity
  const recentActivity = [
    { action: "Generated script", item: "YouTube Tutorial", time: "2h ago", type: "script" },
    { action: "Connected", item: "GitHub", time: "1d ago", type: "connection" },
    { action: "Created ideas", item: "5 video concepts", time: "2d ago", type: "ideas" }
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
      <Card className="gradient-bg text-white">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/20 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">Welcome back, John!</h2>
              <p className="text-sm text-white/80">Level 5 Creator • 245 XP</p>
            </div>
            <div className="ml-auto">
              <Award className="h-6 w-6 text-yellow-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats with Progress */}
      <div className="grid grid-cols-3 gap-3">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-3 text-center">
              <div className="flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="font-bold text-lg">{stat.value}</div>
              <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
              <Progress value={stat.progress} className="h-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Challenges */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Daily Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {dailyChallenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                <CheckCircle className={`h-4 w-4 ${challenge.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                <div>
                  <div className="font-medium text-sm">{challenge.title}</div>
                  <div className="text-xs text-muted-foreground">{challenge.reward}</div>
                </div>
              </div>
              {!challenge.completed && (
                <Button size="sm" variant="outline">
                  Start
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick AI Tools */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {aiTools.slice(0, 3).map((tool) => (
            <div key={tool.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                {tool.icon}
                <div>
                  <div className="font-medium text-sm flex items-center gap-1">
                    {tool.title}
                    {tool.trending && <TrendingUp className="h-3 w-3 text-orange-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{tool.count}</div>
                </div>
              </div>
              <Button size="sm" className="gradient-bg" onClick={() => handleToolClick(tool.id)}>
                Use
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2">
              <div className="h-2 w-2 rounded-full bg-coach-primary"></div>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">{activity.action}</span> {activity.item}
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const ResourcesTab = () => (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ExternalLink className="h-5 w-5 mr-2" />
            External Resources
          </CardTitle>
          <CardDescription>Connect to boost your AI assistant's power</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {externalResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                {resource.icon}
                <div>
                  <div className="font-medium">{resource.name}</div>
                  <div className="text-sm text-muted-foreground">{resource.description}</div>
                  <div className="text-xs text-muted-foreground">Last sync: {resource.lastSync}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {resource.connected ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Connected
                    </div>
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

      {/* Skills Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Skills Development</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Video Editing</span>
              <span className="text-sm text-muted-foreground">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storytelling</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">SEO</span>
              <span className="text-sm text-muted-foreground">30%</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Recommended Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-2 rounded-lg border border-dashed border-coach-primary bg-coach-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">Advanced Video Editing</div>
                <div className="text-xs text-muted-foreground">Based on your GitHub projects</div>
              </div>
              <BookmarkPlus className="h-4 w-4 text-coach-primary" />
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
          <CardDescription>Powered by your connected resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiTools.map((tool) => (
            <div key={tool.id} className="p-3 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {tool.icon}
                  <span className="font-medium flex items-center gap-1">
                    {tool.title}
                    {tool.trending && <TrendingUp className="h-3 w-3 text-orange-500" />}
                  </span>
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

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-blue-900">Content Opportunity</div>
                <div className="text-xs text-blue-700">Your GitHub activity suggests you could create tutorials on React hooks</div>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-start space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-green-900">Trending Topic</div>
                <div className="text-xs text-green-700">AI development is trending in your networks - perfect timing!</div>
              </div>
            </div>
          </div>
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
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary">Free Plan</Badge>
            <Badge variant="outline" className="border-coach-primary text-coach-primary">
              Level 5
            </Badge>
          </div>
          <div className="mt-3">
            <div className="text-sm text-muted-foreground mb-1">Next level in 55 XP</div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-xs font-medium">First Script</div>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-xs font-medium">Community</div>
          </div>
          <div className="text-center opacity-50">
            <div className="h-12 w-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Share2 className="h-6 w-6 text-gray-400" />
            </div>
            <div className="text-xs font-medium">Viral Content</div>
          </div>
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
      <BottomNavigation 
        icons={navIcons} 
        activeIcon={activeTab} 
        onIconClick={setActiveTab}
      />
    </div>
  );
};

export default MobileDashboard;
