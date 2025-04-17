
import { TimeAvailable } from "@/types/onboarding";
import { Card } from "@/components/ui/card";

interface TimeAvailableSelectorProps {
  timeOptions: TimeAvailable[];
  selectedTime: TimeAvailable | undefined;
  onTimeSelect: (time: TimeAvailable) => void;
}

const TimeAvailableSelector = ({ 
  timeOptions, 
  selectedTime, 
  onTimeSelect 
}: TimeAvailableSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Combien de temps pouvez-vous consacrer à la création de contenu chaque semaine ?</h3>
      <div className="grid grid-cols-2 gap-3">
        {timeOptions.map((time) => (
          <Card 
            key={time}
            className={`p-3 cursor-pointer border-2 ${
              selectedTime === time 
                ? 'border-primary' 
                : 'border-border hover:border-muted-foreground'
            }`}
            onClick={() => onTimeSelect(time)}
          >
            <div className="font-medium text-sm">{time}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimeAvailableSelector;
