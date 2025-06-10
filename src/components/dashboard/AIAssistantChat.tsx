
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  FileText, 
  Lightbulb,
  Calendar,
  CheckCircle,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  tool?: string;
}

const AIAssistantChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Hello! I'm your AI Content Assistant. I have access to all your resources, skills, and preferences from your onboarding. How can I help you create amazing content today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState<string | null>(null);

  const quickActions = [
    { id: 'concept', label: 'Generate Concept', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'script', label: 'Create Script', icon: <FileText className="h-4 w-4" /> },
    { id: 'ideas', label: 'Get Ideas', icon: <Brain className="h-4 w-4" /> },
    { id: 'calendar', label: 'Plan Content', icon: <Calendar className="h-4 w-4" /> },
    { id: 'feedback', label: 'Get Feedback', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = { type: 'user', content: inputValue };
      setMessages([...messages, newMessage]);
      
      // Simulate AI response based on user resources
      setTimeout(() => {
        const aiResponse: Message = {
          type: 'assistant',
          content: generateAIResponse(inputValue, activeMode),
          tool: activeMode || undefined
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
      
      setInputValue('');
    }
  };

  const generateAIResponse = (userInput: string, mode: string | null): string => {
    // This would integrate with actual AI and user resources
    const responses = {
      concept: `Based on your profile (Intermediate level, targeting Millennials for brand building), here are 3 video concepts: 1) "Day in the Life" series showing your expertise, 2) Tutorial series in your niche, 3) Behind-the-scenes content creation process.`,
      script: `I'll create a script based on your storytelling skills and target audience. Here's a 60-second video script structure: Hook (0-5s), Problem (5-15s), Solution (15-45s), Call to Action (45-60s). Would you like me to write the full script?`,
      ideas: `Here are content ideas tailored to your preferences: 1) Weekly tips series, 2) Community challenges, 3) Collaboration content with other creators in your niche.`,
      calendar: `Based on your available time and goals, I suggest: Monday - Educational content, Wednesday - Behind-the-scenes, Friday - Community engagement. Should I create a detailed calendar?`,
      feedback: `I'll analyze your script against best practices from your selected resources. Please paste your script and I'll provide specific feedback on structure, engagement, and clarity.`,
      default: `I understand you want help with "${userInput}". Based on your onboarding data and selected resources, I can provide personalized guidance. What specific aspect would you like to focus on?`
    };
    
    return responses[mode as keyof typeof responses] || responses.default;
  };

  const handleQuickAction = (actionId: string) => {
    setActiveMode(actionId);
    const actionMessages = {
      concept: "I want to generate new content concepts",
      script: "Help me create a script for my next video",
      ideas: "I need fresh content ideas",
      calendar: "Help me plan my content calendar",
      feedback: "I want feedback on my script"
    };
    
    const message = actionMessages[actionId as keyof typeof actionMessages];
    setInputValue(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            AI Content Assistant
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
              Connected to your resources
            </Badge>
          </CardTitle>
          <CardDescription>
            Your personalized AI assistant with access to your profile, skills, and selected resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.id)}
                className={cn(
                  "flex items-center gap-1",
                  activeMode === action.id && "bg-coach-primary/10 border-coach-primary"
                )}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <div className="max-h-96 overflow-y-auto space-y-3 border rounded-lg p-4 bg-muted/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.type === 'user'
                    ? "bg-coach-primary text-white ml-auto"
                    : "bg-white border mr-auto"
                )}
              >
                {message.tool && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {message.tool}
                  </Badge>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask your AI assistant for help with content creation..."
              className="flex-1 min-h-[60px] resize-none"
            />
            <Button
              onClick={handleSendMessage}
              className="gradient-bg"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {activeMode && (
            <div className="text-xs text-muted-foreground">
              Mode: {quickActions.find(a => a.id === activeMode)?.label} • 
              <button 
                onClick={() => setActiveMode(null)}
                className="ml-1 text-coach-primary hover:underline"
              >
                Clear mode
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantChat;
