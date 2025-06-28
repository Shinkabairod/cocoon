// src/pages/Dashboard.tsx - Version complètement refactorisée avec TOUTES les fonctionnalités
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useUserStats } from '@/hooks/useUserStats';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Composants UI de base
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Icônes principales
import {
  Home,
  Folder,
  Sparkles,
  DollarSign,
  Settings,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  User,
  Building
} from 'lucide-react';

// Composants Dashboard modulaires
import DashboardSidebar from '@/components/dashboard/layout/DashboardSidebar';
import DashboardMobileHeader from '@/components/dashboard/layout/DashboardMobileHeader';
import WelcomePage from '@/components/dashboard/pages/WelcomePage';
import ChatPage from '@/components/dashboard/pages/ChatPage';
import ResourcesPage from '@/components/dashboard/pages/ResourcesPage';
import WorkspacePage from '@/components/dashboard/pages/WorkspacePage';
import CreationsPage from '@/components/dashboard/pages/CreationsPage';
import StatsPage from '@/components/dashboard/pages/StatsPage';
import MonetizationPage from '@/components/dashboard/pages/MonetizationPage';
import OnboardingDataSection from '@/components/dashboard/OnboardingDataSection';
import SettingsSection from '@/components/dashboard/SettingsSection';

// Hooks personnalisés pour la logique métier
import { useDashboardState } from '@/hooks/useDashboardState';
import { useResourcesManagement } from '@/hooks/useResourcesManagement';
import { useChatManagement } from '@/hooks/useChatManagement';

const Dashboard = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const { data: userStats, isLoading } = useUserStats(user?.id);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // États principaux via hooks personnalisés
  const {
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    handleNavigation
  } = useDashboardState(isMobile);

  const {
    folders,
    activeCategory,
    setActiveCategory,
    showNewFolderModal,
    setShowNewFolderModal,
    showNewItemModal,
    setShowNewItemModal,
    newFolder,
    setNewFolder,
    newItemData,
    setNewItemData,
    addFolder,
    addItem,
    handleFileUpload
  } = useResourcesManagement();

  const {
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    isGenerating,
    setIsGenerating,
    handleSendMessage
  } = useChatManagement();

  // Menu de navigation - Configuration centralisée
  const navigationItems = [
    { id: 'welcome', label: 'Accueil', icon: Home },
    { id: 'chat', label: 'Chat IA', icon: MessageSquare },
    { id: 'resources', label: 'Ressources', icon: Folder },
    { id: 'workspace', label: 'Workspace', icon: Building },
    { id: 'creations', label: 'Créations', icon: Sparkles },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'monetization', label: 'Monétisation', icon: DollarSign },
    { id: 'onboarding', label: 'Mon Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  // Fonction utilitaire pour obtenir le nom utilisateur
  const getUserName = () => {
    return user?.user_metadata?.full_name || 
           user?.email?.split('@')[0] || 
           'Créateur';
  };

  // Props communes à passer aux pages
  const commonPageProps = {
    user,
    userStats,
    isLoading,
    toast,
    getUserName,
    handleNavigation
  };

  // Props pour les ressources
  const resourcesProps = {
    folders,
    activeCategory,
    setActiveCategory,
    showNewFolderModal,
    setShowNewFolderModal,
    showNewItemModal,
    setShowNewItemModal,
    newFolder,
    setNewFolder,
    newItemData,
    setNewItemData,
    addFolder,
    addItem,
    handleFileUpload,
    ...commonPageProps
  };

  // Props pour le chat
  const chatProps = {
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    isGenerating,
    setIsGenerating,
    handleSendMessage,
    onboardingData,
    ...commonPageProps
  };

  // Fonction de rendu du contenu principal
  const renderMainContent = () => {
    switch (activePage) {
      case 'welcome':
        return <WelcomePage {...commonPageProps} />;
      case 'chat':
        return <ChatPage {...chatProps} />;
      case 'resources':
        return <ResourcesPage {...resourcesProps} />;
      case 'workspace':
        return <WorkspacePage {...commonPageProps} />;
      case 'creations':
        return <CreationsPage {...commonPageProps} />;
      case 'stats':
        return <StatsPage {...commonPageProps} />;
      case 'monetization':
        return <MonetizationPage {...commonPageProps} />;
      case 'onboarding':
        return <OnboardingDataSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <WelcomePage {...commonPageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activePage={activePage}
        navigationItems={navigationItems}
        handleNavigation={handleNavigation}
        user={user}
        getUserName={getUserName}
      />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header mobile */}
        {isMobile && (
          <DashboardMobileHeader
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* Contenu des pages */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;