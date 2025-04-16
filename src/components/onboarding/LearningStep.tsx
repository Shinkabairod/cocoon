
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { LearningStyle } from "@/types/onboarding";
import OnboardingLayout from "./OnboardingLayout";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Check, BookOpen, Video, FileText, Zap, MessageCircle, Bot, PenTool, School, MessagesSquare } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const LearningStep = () => {
  const { onboardingData, updateOnboardingData, nextStep } = useOnboarding();
  const [personalGoal, setPersonalGoal] = useState(onboardingData.personalGoal || '');
  const [existingSkills, setExistingSkills] = useState(onboardingData.existingSkills || '');
  const [selectedLearningStyles, setSelectedLearningStyles] = useState<LearningStyle[]>(
    onboardingData.learningStyles || []
  );
  const [startingPoint, setStartingPoint] = useState(onboardingData.startFromScratch || false);
  
  const learningStyles: { style: LearningStyle; icon: JSX.Element; description: string }[] = [
    { style: 'Step-by-step guides', icon: <BookOpen className="h-5 w-5" />, description: 'Instructions détaillées à suivre' },
    { style: 'Video tutorials', icon: <Video className="h-5 w-5" />, description: 'Guides visuels et démonstrations' },
    { style: 'Articles', icon: <FileText className="h-5 w-5" />, description: 'Contenus écrits approfondis' },
    { style: 'Interactive exercises', icon: <Zap className="h-5 w-5" />, description: 'Pratique avec feedback immédiat' },
    { style: 'Coaching personnalisé', icon: <MessageCircle className="h-5 w-5" />, description: 'Conseils adaptés à vos besoins' },
    { style: 'AI suggestions', icon: <Bot className="h-5 w-5" />, description: 'Idées générées par notre IA' },
    { style: 'Writing prompts', icon: <PenTool className="h-5 w-5" />, description: 'Exercices d\'écriture guidés' },
    { style: 'Examples analysis', icon: <School className="h-5 w-5" />, description: 'Étude de cas concrets' },
    { style: 'Community feedback', icon: <MessagesSquare className="h-5 w-5" />, description: 'Retours de la communauté' }
  ];
  
  const toggleLearningStyle = (style: LearningStyle) => {
    const updatedStyles = selectedLearningStyles.includes(style)
      ? selectedLearningStyles.filter(s => s !== style)
      : [...selectedLearningStyles, style];
    
    setSelectedLearningStyles(updatedStyles);
    updateOnboardingData({ learningStyles: updatedStyles });
  };
  
  const handleFeedbackToggle = (checked: boolean) => {
    updateOnboardingData({ wantsFeedback: checked });
  };
  
  const handleStartingPointToggle = (fromScratch: boolean) => {
    setStartingPoint(fromScratch);
    updateOnboardingData({ startFromScratch: fromScratch });
  };
  
  const handleExistingSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExistingSkills(e.target.value);
    updateOnboardingData({ existingSkills: e.target.value });
  };
  
  const handleContinue = () => {
    updateOnboardingData({ 
      personalGoal,
      existingSkills,
      learningStyles: selectedLearningStyles
    });
    nextStep();
  };
  
  return (
    <OnboardingLayout 
      title="Votre Façon d'Apprendre" 
      subtitle="Aidez-nous à comprendre comment vous préférez progresser"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Comment souhaitez-vous apprendre à créer du contenu ? (2 choix max)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {learningStyles.map(({ style, icon, description }) => {
              const isSelected = selectedLearningStyles.includes(style);
              const isDisabled = !isSelected && selectedLearningStyles.length >= 2;
              
              return (
                <Card 
                  key={style}
                  className={`p-3 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-primary' 
                      : isDisabled
                        ? 'border-border opacity-50'
                        : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => !isDisabled && toggleLearningStyle(style)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-muted">{icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{style}</div>
                      <div className="text-xs text-muted-foreground">{description}</div>
                    </div>
                    {isSelected && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </Card>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Nous adapterons notre approche selon vos préférences d'apprentissage.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Souhaitez-vous recevoir des retours sur votre contenu ?</h3>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="feedback" 
                checked={onboardingData.wantsFeedback}
                onCheckedChange={handleFeedbackToggle}
              />
              <Label htmlFor="feedback">Oui, j'aimerais recevoir des retours sur mon contenu</Label>
            </div>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Souhaitez-vous partir de zéro ou valoriser des compétences existantes ?</h3>
          <div className="space-y-3">
            <RadioGroup 
              value={startingPoint ? "scratch" : "skills"}
              onValueChange={(value) => handleStartingPointToggle(value === "scratch")}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="scratch" id="scratch" />
                <Label htmlFor="scratch">Je souhaite partir de zéro sur ce projet</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="skills" id="skills" />
                <Label htmlFor="skills">J'ai des compétences que je souhaite valoriser</Label>
              </div>
            </RadioGroup>
            
            {!startingPoint && (
              <Textarea
                placeholder="Quelles compétences souhaitez-vous mettre en valeur ? (ex: photographie, écriture, expertise dans un domaine...)"
                value={existingSkills}
                onChange={handleExistingSkillsChange}
                className="h-20 mt-2"
              />
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">À quoi ressemblerait le succès pour vous dans les 6 prochains mois ?</h3>
          <Textarea
            placeholder="Ex: Atteindre 1000 abonnés sur YouTube, Créer un blog avec des publications hebdomadaires, Monétiser mon contenu à hauteur de 500€/mois..."
            value={personalGoal}
            onChange={(e) => setPersonalGoal(e.target.value)}
            className="h-24"
          />
        </div>
        
        <div className="pt-4 flex justify-center">
          <Button 
            className="gradient-bg w-full max-w-xs"
            onClick={handleContinue}
            disabled={
              selectedLearningStyles.length === 0 || 
              onboardingData.wantsFeedback === undefined ||
              !personalGoal ||
              (!startingPoint && !existingSkills)
            }
          >
            Continuer
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default LearningStep;
