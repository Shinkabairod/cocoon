
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import IconGrid from "@/components/mobile/IconGrid";
import AICoach from "@/components/mobile/AICoach";
import CharacterEvolution from "@/components/character/CharacterEvolution";
import useCharacter from "@/hooks/useCharacter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Home, User, Bot, Library, 
  Target, Lightbulb, FileText, Calendar, 
  MessageSquare, Github, BookOpen, Users,
  TrendingUp, Star, Trophy, Zap,
  Video, Mic, Camera
} from "lucide-react";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const { character, addXP, completeContent } = useCharacter();
  const [activeTab, setActiveTab] = useState("home");

  // Fix navigation warning by using useEffect
  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/mobile", { replace: true });
    }
  }, [navigate]);

  const navIcons = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Accueil" },
    { id: "resources", icon: <Library className="h-5 w-5" />, label: "Ressources" },
    { id: "tools", icon: <Bot className="h-5 w-5" />, label: "IA Tools" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "Profil" }
  ];

  const homeIcons = [
    { id: "character", icon: <Star className="h-6 w-6" />, label: "Mon Avatar" },
    { id: "daily", icon: <Target className="h-6 w-6" />, label: "Défis" },
    { id: "create", icon: <Video className="h-6 w-6" />, label: "Créer" },
    { id: "achievements", icon: <Trophy className="h-6 w-6" />, label: "Succès" }
  ];

  const resourceIcons = [
    { id: "github", icon: <Github className="h-6 w-6" />, label: "GitHub" },
    { id: "notion", icon: <BookOpen className="h-6 w-6" />, label: "Notion" },
    { id: "community", icon: <Users className="h-6 w-6" />, label: "Communauté" },
    { id: "training", icon: <TrendingUp className="h-6 w-6" />, label: "Formation" }
  ];

  const aiToolIcons = [
    { id: "concept", icon: <Lightbulb className="h-6 w-6" />, label: "Concepts" },
    { id: "ideas", icon: <Zap className="h-6 w-6" />, label: "Idées" },
    { id: "script", icon: <FileText className="h-6 w-6" />, label: "Scripts" },
    { id: "calendar", icon: <Calendar className="h-6 w-6" />, label: "Planning" },
    { id: "feedback", icon: <MessageSquare className="h-6 w-6" />, label: "Feedback" },
    { id: "shoot", icon: <Camera className="h-6 w-6" />, label: "Tournage" }
  ];

  const handleIconClick = (id: string) => {
    console.log(`Icon clicked: ${id}`);
    // Here you would handle navigation to specific features
    if (id === "create") {
      completeContent(); // Award XP for content creation
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
            {/* Character Evolution Card */}
            <CharacterEvolution character={character} />
            
            {/* Daily Challenge */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-coach-primary" />
                  Défi du Jour
                </h3>
                <Badge variant="outline">+100 XP</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Créez un script de 30 secondes sur votre passion principale
              </p>
              <Progress value={0} className="h-2 mb-3" />
              <Button 
                size="sm" 
                className="w-full gradient-bg"
                onClick={() => addXP(100, 'content')}
              >
                Commencer le Défi
              </Button>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold mb-4">Actions Rapides</h3>
              <IconGrid icons={homeIcons} onIconClick={handleIconClick} />
            </div>

            {/* Recent Activity */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Activité Récente</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Script "Mon Histoire" créé</span>
                  <span className="text-xs text-muted-foreground ml-auto">+50 XP</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Défi quotidien complété</span>
                  <span className="text-xs text-muted-foreground ml-auto">+100 XP</span>
                </div>
              </div>
            </Card>
          </div>
        );

      case "resources":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Mes Ressources</h2>
              
              {/* External Connections */}
              <Card className="p-4 mb-4">
                <h3 className="font-semibold mb-3">Connexions Externes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </div>
                    <Badge variant="outline">Connecté</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Notion</span>
                    </div>
                    <Button variant="outline" size="sm">Connecter</Button>
                  </div>
                </div>
              </Card>

              <IconGrid icons={resourceIcons} onIconClick={handleIconClick} />
            </div>

            {/* Skills & Knowledge */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Compétences & Connaissances</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Créativité</span>
                    <span>{character.stats.creativity}/100</span>
                  </div>
                  <Progress value={character.stats.creativity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Technique</span>
                    <span>{character.stats.technical}/100</span>
                  </div>
                  <Progress value={character.stats.technical} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Marketing</span>
                    <span>{character.stats.marketing}/100</span>
                  </div>
                  <Progress value={character.stats.marketing} className="h-2" />
                </div>
              </div>
            </Card>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Outils IA</h2>
              <p className="text-muted-foreground mb-6">
                Utilisez l'intelligence artificielle pour booster votre création de contenu
              </p>
              
              <IconGrid icons={aiToolIcons} onIconClick={handleIconClick} />
            </div>

            {/* AI Insights */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Insights IA du Jour</h3>
              <div className="space-y-3">
                <div className="p-3 bg-soft-blue rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Les vidéos courtes (30-60s) génèrent 3x plus d'engagement cette semaine
                  </p>
                </div>
                <div className="p-3 bg-soft-green rounded-lg">
                  <p className="text-sm text-green-800">
                    🎯 Votre audience est plus active entre 18h-21h
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
                  <p className="text-muted-foreground">{character.type} • Niveau {character.level}</p>
                </div>
              </div>
            </Card>

            {/* Stats Overview */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Mes Statistiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-soft-purple rounded-lg">
                  <div className="text-2xl font-bold text-coach-primary">{character.contentCreated}</div>
                  <div className="text-sm text-muted-foreground">Contenus Créés</div>
                </div>
                <div className="text-center p-3 bg-soft-green rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${character.revenue}</div>
                  <div className="text-sm text-muted-foreground">Revenus Générés</div>
                </div>
                <div className="text-center p-3 bg-soft-blue rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{character.followers}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-3 bg-soft-orange rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{character.level}</div>
                  <div className="text-sm text-muted-foreground">Niveau Atteint</div>
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Paramètres</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Modifier le Profil
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Connexions Externes
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Notifications
                </Button>
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Niveau {character.level}</span>
            <div className="w-8 h-8 bg-gradient-to-br from-coach-primary to-coach-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
              {character.name[0]}
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
