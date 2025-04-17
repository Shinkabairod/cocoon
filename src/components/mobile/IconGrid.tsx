
import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface IconGridProps {
  icons: IconProps[];
  onIconClick: (id: string) => void;
}

const IconGrid = ({ icons, onIconClick }: IconGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {icons.map((item) => (
        <button
          key={item.id}
          onClick={() => onIconClick(item.id)}
          className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-card shadow-sm hover:shadow-md transition-all"
        >
          <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full mb-2",
            item.id === "goals" && "bg-soft-green text-emerald-600",
            item.id === "resources" && "bg-soft-blue text-blue-600",
            item.id === "scripts" && "bg-soft-purple text-coach-primary",
            item.id === "planner" && "bg-soft-yellow text-amber-600",
            item.id === "growth" && "bg-soft-orange text-orange-600",
            item.id === "skills" && "bg-soft-pink text-pink-600",
            item.id === "shoot" && "bg-soft-peach text-red-600",
            item.id === "settings" && "bg-soft-gray text-gray-600"
          )}>
            {item.icon}
          </div>
          <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default IconGrid;
