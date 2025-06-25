
import React from "react";
import { cn } from "@/lib/utils";

interface NavIcon {
  id: string;
  icon: React.ReactNode;
  label: string;
  isCenter?: boolean;
}

interface BottomNavigationProps {
  icons: NavIcon[];
  activeIcon?: string;
  onIconClick?: (id: string) => void;
}

const BottomNavigation = ({ icons, activeIcon = "home", onIconClick }: BottomNavigationProps) => {
  const handleNavClick = (id: string) => {
    if (onIconClick) {
      onIconClick(id);
    } else {
      // Fallback for existing usage
      console.log(`Navigating to ${id}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 glass-nav flex items-center justify-around px-4 z-10">
      {icons.map((item) => (
        <button 
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={cn(
            "flex flex-col items-center justify-center transition-all duration-200 relative",
            item.isCenter 
              ? "w-14 h-14 rounded-full gradient-bg shadow-lg -mt-2" 
              : "w-16 h-full",
            item.isCenter 
              ? "text-white" 
              : activeIcon === item.id ? "text-coach-primary" : "text-muted-foreground"
          )}
        >
          <div className={cn(
            item.isCenter ? "h-6 w-6" : "h-6 w-6"
          )}>
            {item.icon}
          </div>
          {!item.isCenter && (
            <span className="text-xs mt-1">{item.label}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
