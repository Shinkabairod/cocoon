
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b flex items-center px-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search..." 
          className="pl-10 bg-muted border-none" 
        />
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-coach-accent rounded-full" />
        </Button>
        
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-coach-primary text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Free Plan</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
