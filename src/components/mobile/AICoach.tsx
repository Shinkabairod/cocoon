
import React, { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const AICoach = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Floating Coach Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="absolute bottom-20 right-4 w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg animate-float z-20">
            <Sparkles className="h-7 w-7 text-white" />
          </button>
        </SheetTrigger>
        
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
    </>
  );
};

export default AICoach;
