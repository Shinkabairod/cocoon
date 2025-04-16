
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ContentCategory } from "@/types/onboarding";

interface CategoriesSelectorProps {
  categories: ContentCategory[];
  selectedCategories: ContentCategory[];
  onToggle: (category: ContentCategory) => void;
}

const CategoriesSelector = ({ categories, selectedCategories, onToggle }: CategoriesSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Dans quelle(s) catégorie(s) se situe votre contenu ?</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          
          return (
            <Badge
              key={category}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer text-sm py-1 px-3 ${
                isSelected ? 'bg-primary' : 'bg-background hover:bg-secondary'
              }`}
              onClick={() => onToggle(category)}
            >
              {category}
              {isSelected && <Check className="h-3 w-3 ml-1" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSelector;
