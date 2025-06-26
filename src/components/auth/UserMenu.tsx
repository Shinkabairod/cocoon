import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Crown, 
  Sparkles,
  HelpCircle,
  CreditCard,
  Bell,
  ChevronDown
} from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || '?';
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email || 'User';
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-12 w-auto px-3 rounded-xl hover:bg-violet-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-violet-100 group-hover:ring-violet-200 transition-all">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={getUserDisplayName()} 
              />
              <AvatarFallback className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                {getUserDisplayName()}
              </div>
              <div className="text-xs text-gray-500 truncate max-w-32">
                {user.email}
              </div>
            </div>
            
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 p-2" 
        align="end" 
        forceMount
      >
        {/* User Info Header */}
        <DropdownMenuLabel className="p-3 bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-violet-200">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={getUserDisplayName()} 
              />
              <AvatarFallback className="bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {getUserDisplayName()}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user.email}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Crown className="h-3 w-3 text-violet-500" />
                <span className="text-xs text-violet-600 font-medium">Pro Plan</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem 
          onClick={() => navigate('/dashboard/profile')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-violet-50"
        >
          <User className="mr-3 h-4 w-4 text-violet-600 group-hover:text-violet-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Profile Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate('/dashboard/settings')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-blue-50"
        >
          <Settings className="mr-3 h-4 w-4 text-blue-600 group-hover:text-blue-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate('/dashboard/billing')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-indigo-50"
        >
          <CreditCard className="mr-3 h-4 w-4 text-indigo-600 group-hover:text-indigo-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Billing & Plans</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate('/dashboard/notifications')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-purple-50"
        >
          <Bell className="mr-3 h-4 w-4 text-purple-600 group-hover:text-purple-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Notifications</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={() => navigate('/help')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-green-50"
        >
          <HelpCircle className="mr-3 h-4 w-4 text-green-600 group-hover:text-green-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => navigate('/dashboard/upgrade')}
          className="cursor-pointer rounded-lg p-3 group hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50"
        >
          <Sparkles className="mr-3 h-4 w-4 text-violet-600 group-hover:text-violet-700" />
          <span className="text-gray-700 group-hover:text-gray-900">Upgrade Plan</span>
          <Crown className="ml-auto h-3 w-3 text-violet-500" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="cursor-pointer rounded-lg p-3 group hover:bg-red-50 focus:bg-red-50"
        >
          {isSigningOut ? (
            <>
              <div className="mr-3 h-4 w-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" />
              <span className="text-gray-700">Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="mr-3 h-4 w-4 text-red-600 group-hover:text-red-700" />
              <span className="text-gray-700 group-hover:text-red-900">Sign Out</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;