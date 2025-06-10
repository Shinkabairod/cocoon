
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import IconGrid from "@/components/mobile/IconGrid";
import AICoach from "@/components/mobile/AICoach";
import CharacterEvolution from "@/components/character/CharacterEvolution";
import ContentLibrary from "@/components/content/ContentLibrary";
import ContentCalendar from "@/components/content/ContentCalendar";
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
  Video, Mic, Camera, Shield, Eye
} from "lucide-react";
import StarDisplay from "@/components/ui/star-display";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const { character, addXP, completeContent } = useCharacter();
  const { contents, addContent, updateContent, getContentsByStatus } = useContentLibrary();
  const [activeTab, setActiveTab] = useState("home");
  const [userStars, setUserStars] = useState(100); // Default stars for demo

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

  const homeIcons = [
    { id: "character", icon: <Star className="h-6 w-6" />, label: "My Avatar" },
    { id: "daily", icon: <Target className="h-6 w-6" />, label: "Challenges" },
    { id: "create", icon: <Video className="h-6 w-6" />, label: "Create" },
    { id: "calendar", icon: <Calendar className="h-6 w-6" />, label: "Planning" }
  ];

  const resourceIcons = [
    { id: "github", icon: <Github className="h-6 w-6" />, label: "GitHub" },
    { id: "notion", icon: <BookOpen className="h-6 w-6" />, label: "Notion" },
    { id: "obsidian", icon: <Eye className="h-6 w-6" />, label: "Obsidian" },
    { id: "logseq", icon: <Shield className="h-6 w-6" />, label: "LogSeq" }
  ];

  const aiToolIcons = [
    { id: "concept", icon: <Lightbulb className="h-6 w-6" />, label: "Concepts" },
    { id: "ideas", icon: <Zap className="h-6 w-6" />, label: "Ideas" },
    { id: "script", icon: <FileText className="h-6 w-6" />, label: "Scripts" },
    { id: "feedback", icon: <MessageSquare className="h-6 w-6" />, label: "Feedback" }
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
            <CharacterEvolution character={character} />
            
            {/* Daily Challenge - Simplified */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-coach-primary" />
                  Daily Challenge
                </h3>
                <Badge variant="outline">+100 XP</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Create a 30-second script about your main passion
              </p>
              <Button 
                size="sm" 
                className="w-full gradient-bg"
                onClick={() => addXP(100, 'content')}
              >
                Start Challenge
              </Button>
            </Card>

            <div>
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <IconGrid icons={homeIcons} onIconClick={handleIconClick} />
            </div>
          </div>
        );

      case "library":
        return (
          <div className="space-y-6">
            <ContentLibrary 
              contents={contents}
              onEdit={(content) => console.log('Edit:', content)}
              onSchedule={(content) => console.log('Schedule:', content)}
            />
            <ContentCalendar contents={contents} />
          </div>
        );

      case "tools":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">AI Tools</h2>
              <p className="text-muted-foreground mb-6">
                Use artificial intelligence to boost your content creation
              </p>
              
              <IconGrid icons={aiToolIcons} onIconClick={handleIconClick} />
            </div>

            {/* Connected Resources */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Connected Resources</h3>
              <div className="grid grid-cols-2 gap-3">
                {resourceIcons.map(({ id, icon, label }) => (
                  <div key={id} className="flex items-center gap-2 p-2 border rounded">
                    <div className="text-coach-primary">{icon}</div>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Daily AI Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-soft-blue rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Short videos (30-60s) generate 3x more engagement this week
                  </p>
                </div>
                <div className="p-3 bg-soft-green rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 Your audience is most active between 6-9 PM
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
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

            {/* Stats Overview - Simplified */}
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
