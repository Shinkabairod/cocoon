
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface LocationOption {
  id: string;
  label: string;
  icon: ReactNode;
}

interface FilmingLocationSelectorProps {
  locations: LocationOption[];
  selectedLocation: string;
  customLocation: string;
  onLocationSelect: (locationId: string) => void;
  onCustomLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilmingLocationSelector = ({
  locations,
  selectedLocation,
  customLocation,
  onLocationSelect,
  onCustomLocationChange
}: FilmingLocationSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Où prévoyez-vous de tourner principalement votre contenu ?</h3>
      <RadioGroup 
        value={selectedLocation}
        onValueChange={onLocationSelect}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {locations.map(location => (
          <div key={location.id} className="flex items-start space-x-2">
            <RadioGroupItem value={location.id} id={location.id} className="mt-1" />
            <Label htmlFor={location.id} className="flex items-center cursor-pointer">
              <div className="mr-2">{location.icon}</div>
              <span>{location.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {selectedLocation === 'custom' && (
        <div className="mt-3">
          <Input
            placeholder="Précisez le lieu de tournage"
            value={customLocation}
            onChange={onCustomLocationChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilmingLocationSelector;
