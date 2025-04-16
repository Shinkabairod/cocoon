
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Edit, ThumbsUp, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ScriptViewerProps {
  script: string;
  onEditRequest: () => void;
}

const ScriptViewer = ({ script, onEditRequest }: ScriptViewerProps) => {
  const { toast } = useToast();
  const [isStarred, setIsStarred] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    toast({
      description: "Script copied to clipboard",
    });
  };
  
  const handleDownload = () => {
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      description: "Script downloaded",
    });
  };
  
  const handleStarred = () => {
    setIsStarred(!isStarred);
    toast({
      description: isStarred ? "Removed from favorites" : "Added to favorites",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Your Generated Script</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleStarred}>
              <Star className={`h-4 w-4 ${isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onEditRequest}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 max-h-[600px] overflow-y-auto whitespace-pre-wrap font-mono text-sm">
          {script}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Was this script helpful?
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Yes
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2 rotate-180" />
                No
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScriptViewer;
