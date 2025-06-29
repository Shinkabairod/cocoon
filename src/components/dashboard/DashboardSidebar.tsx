
// src/components/dashboard/DashboardSidebar.tsx
import React from 'react';
import { Icons, Icon2D } from '@/components/ui/icons';

const DashboardSidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Icon2D icon={Icons.navigation.Home} size={24} />
          <span className="font-semibold">Dashboard</span>
        </div>
        
        <nav className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Icon2D icon={Icons.navigation.Home} size={16} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Icon2D icon={Icons.folders.FolderOpen} size={16} />
            <span>Workspace</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Icon2D icon={Icons.navigation.Settings} size={16} />
            <span>Settings</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
