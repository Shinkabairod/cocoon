
import React, { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AICoachProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AICoach = ({ isOpen = false, onOpenChange }: AICoachProps) => {
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; content: string }[]>([
    { type: 'ai', content: "Hey there! I'm your AI Content Coach. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages([...messages, { type: 'user', content: inputValue }]);
      
      // Simulate AI response (in a real app, this would call an AI API)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: `I see you're interested in "${inputValue}". Let's explore that together!` 
        }]);
      }, 1000);
      
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl px-0 pt-0 pb-0">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold">AI Coach</h3>
            </div>
            <SheetClose className="rounded-full p-1 hover:bg-muted">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>

          {/* Animated Character Section */}
          <div className="p-6 bg-gradient-to-br from-coach-primary/10 to-coach-secondary/10 border-b">
            <div className="flex flex-col items-center space-y-4">
              {/* Character Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coach-primary to-coach-secondary flex items-center justify-center animate-pulse">
                  <Sparkles className="h-10 w-10 text-white animate-bounce" />
                </div>
                {/* Floating particles effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Character Status */}
              <div className="text-center">
                <p className="text-sm font-medium text-coach-primary">AI Coach is ready!</p>
                <p className="text-xs text-muted-foreground">Ask me anything about content creation</p>
              </div>

              {/* Breathing animation indicator */}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-coach-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-coach-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-coach-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  msg.type === 'user' 
                    ? "bg-coach-primary text-white ml-auto" 
                    : "bg-muted mr-auto"
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t flex items-center gap-2">
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI coach..." 
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="gradient-bg"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AICoach;
