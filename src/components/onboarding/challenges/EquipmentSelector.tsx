
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface EquipmentSelectorProps {
  equipment: string[];
  selectedEquipment: string[] | undefined;
  onEquipmentToggle: (item: string) => void;
}

const EquipmentSelector = ({ 
  equipment, 
  selectedEquipment, 
  onEquipmentToggle 
}: EquipmentSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">What equipment do you already have?</h3>
      <div className="grid grid-cols-2 gap-3">
        {equipment.map((item) => {
          const isSelected = selectedEquipment?.includes(item);
          
          return (
            <Card 
              key={item}
              className={`p-3 cursor-pointer border-2 ${
                isSelected 
                  ? 'border-primary' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => onEquipmentToggle(item)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{item}</div>
                {isSelected ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentSelector;
