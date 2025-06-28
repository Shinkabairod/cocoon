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

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isMobile, sidebarOpen, setSidebarOpen, activePage, navigationItems, handleNavigation, user, getUserName
}) => (
  <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-64' : 'w-64'} bg-white border-r border-gray-200 flex flex-col ${isMobile && !sidebarOpen ? 'transform -translate-x-full' : ''} transition-transform duration-200 ease-in-out`}>
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
    <nav className="flex-1 p-4 space-y-2">
      {navigationItems.map((item) => (
        <Button key={item.id} variant={activePage === item.id ? "default" : "ghost"} className="w-full justify-start" onClick={() => handleNavigation(item.id)}>
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Button>
      ))}
    </nav>
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

// src/components/dashboard/layout/DashboardMobileHeader.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface DashboardMobileHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const DashboardMobileHeader: React.FC<DashboardMobileHeaderProps> = ({ setSidebarOpen }) => (
  <div className="bg-white border-b p-4 flex items-center justify-between">
    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
      <Menu className="h-4 w-4" />
    </Button>
    <h1 className="font-semibold">Cocoon AI</h1>
    <div className="w-8" />
  </div>
);

// src/components/dashboard/pages/ChatPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export const ChatPage: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Chat IA
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Interface de chat avec l'IA</p>
    </CardContent>
  </Card>
);

// src/components/dashboard/pages/ResourcesPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-react';

export const ResourcesPage: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Folder className="h-5 w-5" />
        Ressources
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Gestion des ressources</p>
    </CardContent>
  </Card>
);

// src/components/dashboard/pages/WorkspacePage.tsx
import React from 'react';
import MyWorkspace from '../MyWorkspace';

export const WorkspacePage: React.FC = () => <MyWorkspace />;

// src/components/dashboard/pages/CreationsPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const CreationsPage: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        Créations
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Vos créations IA</p>
    </CardContent>
  </Card>
);

// src/components/dashboard/pages/StatsPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const StatsPage: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Statistiques
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Vos statistiques d'utilisation</p>
    </CardContent>
  </Card>
);

// src/components/dashboard/pages/MonetizationPage.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export const MonetizationPage: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <DollarSign className="h-5 w-5" />
        Monétisation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Options de monétisation</p>
    </CardContent>
  </Card>
);
