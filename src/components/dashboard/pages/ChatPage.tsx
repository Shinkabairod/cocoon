
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send } from 'lucide-react';

interface ChatPageProps {
  chatInput: string;
  setChatInput: (value: string) => void;
  chatMessages: any[];
  setChatMessages: (messages: any[]) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  handleSendMessage: () => void;
  onboardingData: any;
  user: any;
  userStats: any;
  isLoading: boolean;
  toast: any;
  getUserName: () => string;
  handleNavigation: (page: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  chatInput,
  setChatInput,
  chatMessages,
  isGenerating,
  handleSendMessage,
  getUserName
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chat IA</h1>
          <p className="text-gray-600">Discutez avec votre assistant IA personnel</p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Assistant IA - {getUserName()}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Commencez une conversation avec votre assistant IA</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-100 ml-8'
                        : 'bg-white mr-8 border'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {message.sender === 'user' ? 'Vous' : 'Assistant IA'}
                    </p>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tapez votre message..."
              onKeyPress={(e) => e.key === 'Enter' && !isGenerating && handleSendMessage()}
              disabled={isGenerating}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isGenerating || !chatInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
