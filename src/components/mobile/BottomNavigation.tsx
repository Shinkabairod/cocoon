
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface NavIcon {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface BottomNavigationProps {
  icons: NavIcon[];
}

const BottomNavigation = ({ icons }: BottomNavigationProps) => {
  const [activeIcon, setActiveIcon] = useState("home");

  const handleNavClick = (id: string) => {
    setActiveIcon(id);
    // Here we would add navigation logic
    console.log(`Navigating to ${id}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t flex items-center justify-around px-4 z-10">
      {icons.map((item) => (
        <button 
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full",
            activeIcon === item.id ? "text-coach-primary" : "text-muted-foreground"
          )}
        >
          <div className="h-6 w-6">{item.icon}</div>
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
