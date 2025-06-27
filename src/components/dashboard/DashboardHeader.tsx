import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  Crown,
  Zap,
  HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center px-6 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search resources, conversations..." 
          className="pl-10 bg-gray-50 border-gray-200 rounded-2xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500" 
        />
      </div>
      
      {/* Right Section */}
      <div className="ml-auto flex items-center gap-4">
        {/* Quick Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-2xl border-violet-200 text-violet-700 hover:bg-violet-50"
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-2xl relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full border-2 border-white"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-2xl"
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-2xl p-0">
              <Avatar className="h-10 w-10 border-2 border-violet-200 shadow-lg">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full p-1">
                <Crown className="h-3 w-3 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-3xl border-0 shadow-xl bg-white" align="end" forceMount>
            {/* User Info */}
            <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                  <Badge className="bg-violet-100 text-violet-700 border-violet-200 rounded-full text-xs mt-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Creator
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-2">
              <DropdownMenuItem className="rounded-2xl p-3 cursor-pointer hover:bg-gray-50">
                <User className="mr-3 h-4 w-4 text-violet-600" />
                <span className="font-medium">Profile Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="rounded-2xl p-3 cursor-pointer hover:bg-gray-50">
                <Settings className="mr-3 h-4 w-4 text-gray-600" />
                <span className="font-medium">Account Settings</span>
              </DropdownMenuItem>
              
              {/* Upgrade Button */}
              <div className="my-2 p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Upgrade to Pro</p>
                    <p className="text-xs text-violet-100">Unlock premium features</p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-2 bg-white text-violet-600 hover:bg-gray-100 rounded-xl text-sm font-semibold"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </div>
              
              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuItem 
                className="rounded-2xl p-3 cursor-pointer hover:bg-red-50 text-red-600"
                onClick={() => signOut()}
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;