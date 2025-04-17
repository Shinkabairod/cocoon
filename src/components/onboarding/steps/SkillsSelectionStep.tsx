
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Award } from "lucide-react";
import { useState } from "react";
import { existingSkills } from "@/components/onboarding/content-type/contentTypeData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SkillsSelectionStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [startingPoint, setStartingPoint] = useState(onboardingData.startFromScratch || false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    onboardingData.selectedSkills || []
  );
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleStartingPointToggle = (fromScratch: boolean) => {
    setStartingPoint(fromScratch);
    if (fromScratch) {
      setSelectedSkills([]);
    }
    updateOnboardingData({ 
      startFromScratch: fromScratch,
      selectedSkills: fromScratch ? [] : selectedSkills
    });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      selectedSkills: startingPoint ? [] : selectedSkills
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Your Existing Skills" 
      subtitle="Which skills would you like to leverage in your content creation?"
    >
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Award className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <RadioGroup 
            value={startingPoint ? "scratch" : "skills"}
            onValueChange={(value) => handleStartingPointToggle(value === "scratch")}
            className="mb-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              <RadioGroupItem value="skills" id="skills" />
              <Label htmlFor="skills">I have skills I'd like to leverage</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="scratch" id="scratch" />
              <Label htmlFor="scratch">I want to start from scratch</Label>
            </div>
          </RadioGroup>
          
          {!startingPoint && (
            <>
              <p className="text-sm mb-3">Select skills you already have that could help with your content</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {existingSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <Badge
                      key={skill}
                      variant={isSelected ? "default" : "outline"}
                      className={`
                        px-3 py-1.5 text-sm cursor-pointer 
                        ${isSelected ? 'bg-primary hover:bg-primary/80' : 'hover:bg-muted'}
                      `}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  );
                })}
              </div>
              
              <div className="bg-muted p-3 rounded-md flex items-start space-x-3">
                <Lightbulb className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Identifying your existing skills helps us recommend content types that play to your strengths.
                </p>
              </div>
            </>
          )}
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full"
            onClick={handleContinue}
            disabled={!startingPoint && selectedSkills.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SkillsSelectionStep;
