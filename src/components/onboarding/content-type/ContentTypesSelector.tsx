
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ContentType } from "@/types/onboarding";

interface ContentTypesSelectorProps {
  contentTypes: ContentType[];
  selectedTypes: ContentType[];
  onToggle: (type: ContentType) => void;
}

const ContentTypesSelector = ({ contentTypes, selectedTypes, onToggle }: ContentTypesSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Quel type de contenu souhaitez-vous créer ?</h3>
      <div className="grid grid-cols-2 gap-3">
        {contentTypes.map((type) => {
          const isSelected = selectedTypes?.includes(type);
          
          return (
            <Card 
              key={type}
              className={`p-3 cursor-pointer border-2 ${
                isSelected 
                  ? 'border-primary' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => onToggle(type)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{type}</div>
                {isSelected && <Check className="h-4 w-4 text-primary" />}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContentTypesSelector;
