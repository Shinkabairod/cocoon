
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingLayout from "../OnboardingLayout";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Award } from "lucide-react";
import { useState } from "react";
import { existingSkills } from "@/components/onboarding/content-type_old/contentTypeData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

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
      <div className="space-y-8">
        {/* Header Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Award className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        {/* Starting Point Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Starting Point</h3>
          <RadioGroup 
            value={startingPoint ? "scratch" : "skills"}
            onValueChange={(value) => handleStartingPointToggle(value === "scratch")}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="skills" id="skills" />
              <Label htmlFor="skills" className="flex-1 cursor-pointer">
                <div className="font-medium">I have skills I'd like to leverage</div>
                <div className="text-sm text-muted-foreground">Build on your existing expertise</div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="scratch" id="scratch" />
              <Label htmlFor="scratch" className="flex-1 cursor-pointer">
                <div className="font-medium">I want to start from scratch</div>
                <div className="text-sm text-muted-foreground">Begin with a fresh approach</div>
              </Label>
            </div>
          </RadioGroup>
        </Card>
        
        {/* Skills Selection */}
        {!startingPoint && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Select Your Skills</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Choose the skills you already have that could help with your content creation
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {existingSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <Badge
                    key={skill}
                    variant={isSelected ? "default" : "outline"}
                    className={`
                      px-4 py-2 text-sm cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md' 
                        : 'hover:bg-muted hover:border-primary/50'
                      }
                    `}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Pro Tip</p>
                  <p className="text-sm text-blue-800">
                    Identifying your existing skills helps us recommend content types that play to your strengths and accelerate your growth.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Continue Button */}
        <div className="flex justify-center pt-4">
          <Button 
            className="gradient-bg w-full max-w-xs h-12 text-base font-medium"
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
