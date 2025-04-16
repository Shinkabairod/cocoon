
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Platform } from "@/types/onboarding";

interface PlatformsSelectorProps {
  platforms: Platform[];
  selectedPlatforms: Platform[];
  onToggle: (platform: Platform) => void;
}

const PlatformsSelector = ({ platforms, selectedPlatforms, onToggle }: PlatformsSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Sur quelles plateformes êtes-vous intéressé(e) ?</h3>
      <div className="grid grid-cols-3 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms?.includes(platform);
          
          return (
            <Card 
              key={platform}
              className={`p-3 cursor-pointer border-2 ${
                isSelected 
                  ? 'border-primary' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => onToggle(platform)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{platform}</div>
                {isSelected && <Check className="h-4 w-4 text-primary" />}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformsSelector;
