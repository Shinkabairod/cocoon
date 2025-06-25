// src/pages/MobileDashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import AICoach from "@/components/mobile/AICoach";
import MobileDashboardHeader from "@/components/mobile/MobileDashboardHeader";
import HomeTab from "@/components/mobile/tabs/HomeTab";
import LibraryTab from "@/components/mobile/tabs/LibraryTab";
import ToolsTab from "@/components/mobile/tabs/ToolsTab";
import ProfileTab from "@/components/mobile/tabs/ProfileTab";
import useCharacter from "@/hooks/useCharacter";
import useContentLibrary from "@/hooks/useContentLibrary";
import { 
  Home, User, Bot, Library, Sparkles
} from "lucide-react";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const { character, addXP, completeContent } = useCharacter();
  const { contents, getContentsByStatus } = useContentLibrary();
  const [activeTab, setActiveTab] = useState("home");
  const [userStars, setUserStars] = useState(100);
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState(""); // AJOUTÉ

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/mobile", { replace: true });
    }
  }, [navigate]);

  const navIcons = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Accueil" },
    { id: "library", icon: <Library className="h-5 w-5" />, label: "Bibliothèque" },
    { id: "ai-assistant", icon: <Sparkles className="h-6 w-6" />, label: "Assistant IA", isCenter: true },
    { id: "tools", icon: <Bot className="h-5 w-5" />, label: "Outils IA" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "Profil" }
  ];

  const handleIconClick = (id: string) => {
    console.log(`Icon clicked: ${id}`);
    if (id === "create") {
      completeContent();
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === "ai-assistant") {
      setIsAICoachOpen(true);
    } else {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab 
            character={character} 
            onAddXP={addXP}
            setActiveTab={setActiveTab} // AJOUTÉ
            setAICoachOpen={setIsAICoachOpen} // AJOUTÉ
            setInitialPrompt={setInitialPrompt} // AJOUTÉ
          />
        );
      case "library":
        return <LibraryTab contents={contents} getContentsByStatus={getContentsByStatus} />;
      case "tools":
        return <ToolsTab onIconClick={handleIconClick} />;
      case "profile":
        return <ProfileTab character={character} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <MobileDashboardHeader 
        userStars={userStars}
        characterName={character.name}
        characterLevel={character.level}
      />

      {/* Content */}
      <div className="p-4">
        {renderTabContent()}
      </div>

      {/* AI Coach avec prompt initial */}
      <AICoach 
        isOpen={isAICoachOpen} 
        onOpenChange={setIsAICoachOpen}
        initialPrompt={initialPrompt} // AJOUTÉ si votre composant le supporte
      />

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