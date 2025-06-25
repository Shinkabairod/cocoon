
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
import { useUserStats } from "@/hooks/useUserStats";
import { supabase } from "@/integrations/supabase/client";
import { 
  Home, User, Wrench, FileText
} from "lucide-react";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const { character, addXP, completeContent } = useCharacter();
  const { contents, getContentsByStatus } = useContentLibrary();
  const [activeTab, setActiveTab] = useState("home");
  const [isAICoachOpen, setIsAICoachOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [userId, setUserId] = useState<string | undefined>();

  // Get user stats with real data
  const { data: userStats, isLoading: statsLoading } = useUserStats(userId);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/mobile", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, []);

  const navIcons = [
    { id: "home", icon: <Home className="h-5 w-5" />, label: "Tableau de Bord" },
    { id: "library", icon: <FileText className="h-5 w-5" />, label: "Mes Ressources" },
    { id: "tools", icon: <Wrench className="h-5 w-5" />, label: "Outils IA" },
    { id: "profile", icon: <User className="h-5 w-5" />, label: "Mon Profil" }
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
          <HomeTab 
            character={character} 
            onAddXP={addXP}
            setActiveTab={setActiveTab}
            setAICoachOpen={setIsAICoachOpen}
            setInitialPrompt={setInitialPrompt}
            userStats={userStats}
            statsLoading={statsLoading}
          />
        );
      case "library":
        return <LibraryTab contents={contents} getContentsByStatus={getContentsByStatus} userStats={userStats} />;
      case "tools":
        return <ToolsTab onIconClick={handleIconClick} />;
      case "profile":
        return <ProfileTab character={character} userStats={userStats} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <MobileDashboardHeader 
        userStars={userStats?.totalScore || 0}
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
        initialPrompt={initialPrompt}
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
