
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  chatInput: string;
  setChatInput: (value: string) => void;
  chatMessages: Array<{ type: 'user' | 'ai'; content: string }>;
  isGenerating: boolean;
  onSend: () => void;
}

const ChatModal = ({ 
  open, 
  onClose, 
  chatInput, 
  setChatInput, 
  chatMessages, 
  isGenerating, 
  onSend 
}: ChatModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assistant IA Personnel</DialogTitle>
          <DialogDescription>
            Discutez avec votre assistant IA pour obtenir de l'aide créative
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="max-h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Commencez une conversation avec votre IA</p>
              </div>
            ) : (
              chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-500">L'IA réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Textarea
              placeholder="Posez votre question à l'IA..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <Button onClick={onSend} disabled={isGenerating || !chatInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
