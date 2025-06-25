
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, Download, Loader2 } from "lucide-react";

interface ScriptModalProps {
  open: boolean;
  onClose: () => void;
  scriptTopic: string;
  setScriptTopic: (value: string) => void;
  generatedContent: string;
  isGenerating: boolean;
  onGenerate: () => void;
}

const ScriptModal = ({ 
  open, 
  onClose, 
  scriptTopic, 
  setScriptTopic, 
  generatedContent, 
  isGenerating, 
  onGenerate 
}: ScriptModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Générateur de Scripts IA</DialogTitle>
          <DialogDescription>
            Créez des scripts personnalisés pour vos vidéos
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="scriptTopic">Sujet du script</Label>
              <Input
                id="scriptTopic"
                placeholder="Ex: Comment créer du contenu viral"
                value={scriptTopic}
                onChange={(e) => setScriptTopic(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={onGenerate} 
              disabled={isGenerating || !scriptTopic.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Générer le script
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-4">
            <Label>Script généré</Label>
            <Textarea
              placeholder="Votre script apparaîtra ici..."
              value={generatedContent}
              readOnly
              className="min-h-[300px] resize-none"
            />
            {generatedContent && (
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le script
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScriptModal;
