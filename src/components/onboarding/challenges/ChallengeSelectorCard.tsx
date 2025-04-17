
import { ContentChallenge } from "@/types/onboarding";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface ChallengeSelectorCardProps {
  challenge: ContentChallenge;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (challenge: ContentChallenge) => void;
}

const ChallengeSelectorCard = ({ 
  challenge, 
  isSelected, 
  isDisabled, 
  onToggle 
}: ChallengeSelectorCardProps) => {
  return (
    <Card 
      className={`p-3 cursor-pointer border-2 ${
        isSelected 
          ? 'border-primary' 
          : isDisabled
            ? 'border-border opacity-50'
            : 'border-border hover:border-muted-foreground'
      }`}
      onClick={() => !isDisabled && onToggle(challenge)}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-sm">{challenge}</div>
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </div>
    </Card>
  );
};

export default ChallengeSelectorCard;
