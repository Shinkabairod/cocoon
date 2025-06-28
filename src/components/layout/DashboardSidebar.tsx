// src/components/dashboard/layout/DashboardSidebar.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, X } from 'lucide-react';

interface DashboardSidebarProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activePage: string;
  navigationItems: any[];
  handleNavigation: (page: string) => void;
  user: any;
  getUserName: () => string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isMobile,
  sidebarOpen,
  setSidebarOpen,
  activePage,
  navigationItems,
  handleNavigation,
  user,
  getUserName
}) => (
  <div className={`
    ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64'} 
    bg-white border-r border-gray-200 flex flex-col
    ${isMobile && !sidebarOpen ? 'transform -translate-x-full' : ''}
    transition-transform duration-200 ease-in-out
  `}>
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-lg">Cocoon AI</span>
      </div>
      {isMobile && (
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-4 space-y-2">
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activePage === item.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => handleNavigation(item.id)}
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Button>
      ))}
    </nav>

    {/* Footer utilisateur */}
    <div className="p-4 border-t">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback>{getUserName().charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{getUserName()}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardSidebar;
