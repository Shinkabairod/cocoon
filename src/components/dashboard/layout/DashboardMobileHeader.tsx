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
