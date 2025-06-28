// src/hooks/useDashboardState.ts
import { useState } from 'react';

export const useDashboardState = (isMobile: boolean) => {
  const [activePage, setActivePage] = useState('welcome');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setActivePage(page);
    if (isMobile) setSidebarOpen(false);
  };

  return {
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    handleNavigation
  };
};
