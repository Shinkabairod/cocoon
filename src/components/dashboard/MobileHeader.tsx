
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Sparkles } from "lucide-react";

interface MobileHeaderProps {
  onMenuClick: () => void;
  user: any;
}

const MobileHeader = ({ onMenuClick, user }: MobileHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <Button variant="ghost" size="sm" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900">Cocoon AI</h1>
      </div>

      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.user_metadata?.avatar_url} />
        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
          {user?.email?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default MobileHeader;
