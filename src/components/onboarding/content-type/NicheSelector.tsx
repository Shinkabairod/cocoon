
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface NicheSelectorProps {
  niche: string;
  setNiche: (niche: string) => void;
  popularNiches: string[];
}

const NicheSelector = ({ niche, setNiche, popularNiches }: NicheSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Sur quelle niche ou sujet vous concentrez-vous ?</h3>
      <Input
        placeholder="Ex: Fitness, Technologie, Cuisine, Mode..."
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />
      
      <div className="mt-3">
        <p className="text-sm text-muted-foreground mb-2">Suggestions populaires :</p>
        <div className="flex flex-wrap gap-2">
          {popularNiches.map((popularNiche) => (
            <Badge
              key={popularNiche}
              variant="outline"
              className="cursor-pointer bg-background hover:bg-secondary"
              onClick={() => setNiche(popularNiche)}
            >
              <Tag className="h-3 w-3 mr-1" />
              {popularNiche}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NicheSelector;
