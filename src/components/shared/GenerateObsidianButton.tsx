
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";

interface GenerateObsidianButtonProps {
  userProfileData: any;
  onSuccess?: () => void;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

const GenerateObsidianButton = ({ 
  userProfileData, 
  onSuccess, 
  variant = "default",
  className = ""
}: GenerateObsidianButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateObsidian = async () => {
    if (!user) {
      toast({
        title: "❌ Authentication Error",
        description: "You must be logged in to generate your Obsidian space.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const payload = {
        user_id: user.id,
        profile: userProfileData,
      };

      console.log('🚀 Generating Obsidian space with payload:', payload);

      const res = await fetch("https://Cocoonai-cocoon-ai-assistant.hf.space/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (res.ok) {
        toast({
          title: "✅ Obsidian Space Generated!",
          description: result.status || "Your personalized Obsidian workspace has been created successfully.",
        });
        
        console.log('✅ Obsidian generation successful:', result);
        onSuccess?.();
      } else {
        throw new Error(result.detail || result.message || 'Generation failed');
      }

    } catch (error) {
      console.error('❌ Obsidian generation error:', error);
      toast({
        title: "❌ Generation Failed",
        description: error instanceof Error ? error.message : "Unable to generate your Obsidian space.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGenerateObsidian}
      disabled={isGenerating}
      variant={variant}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2" />
          📄 Generate my Obsidian Space
        </>
      )}
    </Button>
  );
};

export default GenerateObsidianButton;
