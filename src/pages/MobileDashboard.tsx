
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import IconGrid from "@/components/mobile/IconGrid";
import AICoach from "@/components/mobile/AICoach";
import CharacterEvolution from "@/components/character/CharacterEvolution";
import ContentLibrary from "@/components/content/ContentLibrary";
import ContentCalendar from "@/components/content/ContentCalendar";
import BotSharingSection from "@/components/bot-sharing/BotSharingSection";
import useCharacter from "@/hooks/useCharacter";
import useContentLibrary from "@/hooks/useContentLibrary";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Home, User, Bot, Library, 
  Target, Lightbulb, FileText, Calendar, 
  MessageSquare, Github, BookOpen, Users,
  TrendingUp, Star, Trophy, Zap,
  Video, Mic, Camera, Shield, Eye, Plus,
  BarChart3, Clock, Sparkles
} from "lucide-react";
import StarDisplay from "@/components/ui/star-display";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const { character, addXP, completeContent } = useCharacter();
  const { contents, addContent, updateContent, getContentsByStatus } = useContentLibrary();
  const [activeTab, setActiveTab] = useState("home");
  const [userStars, setUserStars] = useState(100);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/mobile", { replace: true });
    }
  }, [navigate]);

  const navIcons = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Home" },
    { id: "library", icon: <Library className="h-5 w-5" />, label: "Library" },
    { id: "tools", icon: <Bot className="h-5 w-5" />, label: "AI Tools" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "Profile" }
  ];

  const aiToolCategories = [
    {
      title: "Content Creation",
      description: "Generate and enhance your content",
      icons: [
        { id: "concept", icon: <Lightbulb className="h-6 w-6" />, label: "Concepts" },
        { id: "script", icon: <FileText className="h-6 w-6" />, label: "Scripts" },
        { id: "ideas", icon: <Zap className="h-6 w-6" />, label: "Ideas" }
      ]
    },
    {
      title: "Analysis & Feedback",
      description: "Improve with AI insights",
      icons: [
        { id: "feedback", icon: <MessageSquare className="h-6 w-6" />, label: "Feedback" },
        { id: "analytics", icon: <BarChart3 className="h-6 w-6" />, label: "Analytics" },
        { id: "optimize", icon: <TrendingUp className="h-6 w-6" />, label: "Optimize" }
      ]
    },
    {
      title: "Creator References",
      description: "Add and manage creator accounts for inspiration",
      icons: [
        { id: "add-creator", icon: <Plus className="h-6 w-6" />, label: "Add Creator" },
        { id: "view-references", icon: <Eye className="h-6 w-6" />, label: "References" },
        { id: "analyze-creators", icon: <BarChart3 className="h-6 w-6" />, label: "Analyze" }
      ]
    }
  ];

  const resourceIcons = [
    { id: "github", icon: <Github className="h-5 w-5" />, label: "GitHub", status: "connected" },
    { id: "notion", icon: <BookOpen className="h-5 w-5" />, label: "Notion", status: "disconnected" },
    { id: "obsidian", icon: <Eye className="h-5 w-5" />, label: "Obsidian", status: "connected" },
    { id: "logseq", icon: <Shield className="h-5 w-5" />, label: "LogSeq", status: "disconnected" }
  ];

  const handleIconClick = (id: string) => {
    console.log(`Icon clicked: ${id}`);
    if (id === "create") {
      completeContent();
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Character Evolution - More Prominent */}
            <CharacterEvolution character={character} />
            
            {/* Daily Challenge - Enhanced */}
            <Card className="p-6 bg-gradient-to-r from-coach-primary/10 to-coach-secondary/10 border-coach-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-coach-primary/20 rounded-full">
                    <Target className="h-6 w-6 text-coach-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Today's Challenge</h3>
                    <p className="text-sm text-muted-foreground">Complete to earn XP</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                  +100 XP
                </Badge>
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                Create a 30-second script about your main passion and practice your storytelling skills
              </p>
              <Button 
                className="w-full gradient-bg shadow-lg"
                onClick={() => addXP(100, 'content')}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Start Challenge
              </Button>
            </Card>
          </div>
        );

      case "library":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-coach-primary">Content Library</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage and organize your content</p>
              </div>
              <Button className="gradient-bg shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">{getContentsByStatus('draft').length}</div>
                <div className="text-xs text-blue-700 font-medium">Drafts</div>
                <div className="text-xs text-blue-600 mt-1">Ready to edit</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{getContentsByStatus('planned').length}</div>
                <div className="text-xs text-yellow-700 font-medium">Planned</div>
                <div className="text-xs text-yellow-600 mt-1">Scheduled</div>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">{getContentsByStatus('published').length}</div>
                <div className="text-xs text-green-700 font-medium">Published</div>
                <div className="text-xs text-green-600 mt-1">Live content</div>
              </Card>
            </div>

            {/* Content Library Component */}
            <Card className="p-1 bg-gradient-to-r from-coach-primary/5 to-coach-secondary/5">
              <ContentLibrary 
                contents={contents}
                onEdit={(content) => console.log('Edit:', content)}
                onSchedule={(content) => console.log('Schedule:', content)}
              />
            </Card>

            {/* Editorial Calendar */}
            <Card className="p-6 bg-gradient-to-br from-coach-primary/5 to-coach-secondary/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-coach-primary" />
                  Editorial Calendar
                </h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Schedule
                </Button>
              </div>
              <ContentCalendar contents={contents} />
            </Card>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-6">
            {/* AI Tools Header */}
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold mb-2">AI Content Tools</h2>
              <p className="text-muted-foreground">Supercharge your content creation with AI</p>
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
                      onClick={() => handleIconClick(tool.id)}
                      className="flex flex-col items-center p-4 rounded-lg bg-soft-blue hover:bg-soft-blue/80 transition-colors"
                    >
                      <div className="text-coach-primary mb-2">{tool.icon}</div>
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
                Connected Resources
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
                      {status === 'connected' ? 'Connected' : 'Connect'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-coach-primary" />
                AI Insights
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-0.5">💡</div>
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">Trending Content Format</p>
                      <p className="text-xs text-blue-700">Short videos (30-60s) generate 3x more engagement this week</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-green-600 mt-0.5">🎯</div>
                    <div>
                      <p className="text-sm font-medium text-green-800 mb-1">Optimal Posting Time</p>
                      <p className="text-xs text-green-700">Your audience is most active between 6-9 PM</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-purple-600 mt-0.5">📈</div>
                    <div>
                      <p className="text-sm font-medium text-purple-800 mb-1">Growth Opportunity</p>
                      <p className="text-xs text-purple-700">Consider collaborating with creators in your niche</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                  {character.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{character.name}</h2>
                  <p className="text-muted-foreground">{character.type} • Level {character.level}</p>
                </div>
              </div>
            </Card>

            {/* Bot Monetization Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Monetize Your AI Assistant</h3>
              <BotSharingSection />
            </div>

            {/* Social Media Connections */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Connected Accounts</h3>
              <div className="space-y-2">
                {['Instagram', 'TikTok', 'YouTube', 'Twitter'].map(platform => (
                  <div key={platform} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{platform}</span>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats Overview */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">My Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-soft-purple rounded-lg">
                  <div className="text-2xl font-bold text-coach-primary">{character.contentCreated}</div>
                  <div className="text-sm text-muted-foreground">Content</div>
                </div>
                <div className="text-center p-3 bg-soft-green rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{character.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Content Coach</h1>
          <div className="flex items-center gap-3">
            <StarDisplay count={userStars} size="sm" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Level {character.level}</span>
              <div className="w-8 h-8 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                {character.name[0]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderTabContent()}
      </div>

      {/* AI Coach Floating Button */}
      <AICoach />

      {/* Bottom Navigation */}
      <BottomNavigation 
        icons={navIcons} 
        activeIcon={activeTab}
        onIconClick={handleTabClick}
      />
    </div>
  );
};

export default MobileDashboard;
