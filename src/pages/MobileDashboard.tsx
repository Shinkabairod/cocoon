
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Target, BookOpen, FileText, Calendar, BarChart2, 
  Brain, Camera, Settings, Home, MessageCircle, Plus
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AICoach from "@/components/mobile/AICoach";
import IconGrid from "@/components/mobile/IconGrid";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Grid icons for the dashboard
  const dashboardIcons = [
    { id: "goals", icon: <Target />, label: "Goals" },
    { id: "resources", icon: <BookOpen />, label: "Resources" },
    { id: "scripts", icon: <FileText />, label: "Script Builder" },
    { id: "planner", icon: <Calendar />, label: "Content Planner" },
    { id: "growth", icon: <BarChart2 />, label: "Growth Tracker" },
    { id: "skills", icon: <Brain />, label: "Skills Focus" },
    { id: "shoot", icon: <Camera />, label: "Shoot Mode" },
    { id: "settings", icon: <Settings />, label: "Settings" },
  ];

  // Bottom navigation icons
  const navIcons = [
    { id: "home", icon: <Home />, label: "Home" },
    { id: "coach", icon: <MessageCircle />, label: "Coach" },
    { id: "create", icon: <Plus />, label: "Create" },
    { id: "settings", icon: <Settings />, label: "Profile" },
  ];

  const handleIconClick = (id: string) => {
    setActiveFeature(id);
    // Here we would typically open a specific panel or feature
    console.log(`Opening ${id} feature`);
  };

  // Redirect to desktop dashboard if not mobile
  if (!isMobile) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto pb-20">
        <IconGrid icons={dashboardIcons} onIconClick={handleIconClick} />
      </div>
      
      {/* Floating AI Coach */}
      <AICoach />
      
      {/* Bottom Navigation Bar */}
      <BottomNavigation icons={navIcons} />
    </div>
  );
};

export default MobileDashboard;
