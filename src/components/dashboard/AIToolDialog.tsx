
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface AIToolDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  activeSection: string | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  result: string;
  setResult: (result: string) => void;
  loading: boolean;
  onSubmit: () => void;
}

const AIToolDialog = ({
  dialogOpen,
  setDialogOpen,
  activeSection,
  inputValue,
  setInputValue,
  result,
  setResult,
  loading,
  onSubmit
}: AIToolDialogProps) => {
  const getDialogTitle = () => {
    switch (activeSection) {
      case 'concept-finding': return 'Concepts générés';
      case 'script-creation': return 'Générateur de Script';
      case 'idea-generation': return 'Générateur d\'Idées';
      case 'script-feedback': return 'Feedback IA';
      default: return 'Outil IA';
    }
  };

  const getInputPlaceholder = () => {
    switch (activeSection) {
      case 'script-creation': return 'Décrivez le sujet de votre vidéo...';
      case 'idea-generation': return 'Quelle catégorie de contenu vous intéresse ?';
      case 'script-feedback': return 'Collez votre contenu ici pour obtenir un feedback...';
      default: return 'Entrez votre demande...';
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {(activeSection === 'script-creation' || activeSection === 'idea-generation' || activeSection === 'script-feedback') && !result && (
            <div className="space-y-4">
              {activeSection === 'script-creation' || activeSection === 'idea-generation' ? (
                <Input
                  placeholder={getInputPlaceholder()}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              ) : (
                <Textarea
                  placeholder={getInputPlaceholder()}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={4}
                />
              )}
              <Button onClick={onSubmit} disabled={loading || !inputValue.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  'Générer'
                )}
              </Button>
            </div>
          )}
          
          {result && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setResult('');
                  setInputValue('');
                }}
              >
                Nouveau
              </Button>
            </div>
          )}
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Génération en cours...</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIToolDialog;
