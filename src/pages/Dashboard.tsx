import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Calendar, 
  BookOpen, 
  BarChart, 
  Settings, 
  Sparkles,
  Bot,
  Users,
  Target,
  TrendingUp,
  Clock,
  Upload,
  MessageCircle,
  ArrowRight,
  Zap,
  Crown,
  Bell,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import Logo from '@/components/ui/Logo';
import UserSettingsSection from '@/components/dashboard/UserSettingsSection';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'scripts', name: 'AI Assistant', icon: Bot },
    { id: 'resources', name: 'My Resources', icon: BookOpen },
    { id: 'analytics', name: 'Analytics', icon: BarChart },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const stats = [
    {
      title: 'AI Conversations',
      value: '234',
      change: '+12%',
      icon: MessageCircle,
      color: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Content Created',
      value: '18',
      change: '+23%',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Time Saved',
      value: '47h',
      change: '+8%',
      icon: Clock,
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Engagement Rate',
      value: '89%',
      change: '+15%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const quickActions = [
    {
      title: 'Generate Script',
      description: 'Create viral TikTok content',
      icon: Sparkles,
      color: 'from-violet-50 to-purple-50 border-violet-200',
      textColor: 'text-violet-700',
      action: () => console.log('Generate script')
    },
    {
      title: 'Upload Resources',
      description: 'Add new training materials',
      icon: Upload,
      color: 'from-blue-50 to-cyan-50 border-blue-200',
      textColor: 'text-blue-700',
      action: () => console.log('Upload resources')
    },
    {
      title: 'AI Chat',
      description: 'Ask your personal assistant',
      icon: Bot,
      color: 'from-emerald-50 to-teal-50 border-emerald-200',
      textColor: 'text-emerald-700',
      action: () => console.log('Open AI chat')
    },
    {
      title: 'View Analytics',
      description: 'Check your performance',
      icon: BarChart,
      color: 'from-orange-50 to-red-50 border-orange-200',
      textColor: 'text-orange-700',
      action: () => console.log('View analytics')
    }
  ];

  const renderDashboardContent = () => {
    if (activePage === 'settings') {
      return <UserSettingsSection />;
    }

    return (
      <div className="space-y-8">
        {/* Header avec salutation */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Creator'}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Ready to revolutionize your content creation today?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-2xl">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm" className="rounded-2xl relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-violet-500 rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 rounded-full">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card 
                  key={index} 
                  className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${action.color} rounded-3xl hover:scale-105`}
                  onClick={action.action}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color.includes('violet') ? 'from-violet-500 to-purple-600' : action.color.includes('blue') ? 'from-blue-500 to-cyan-600' : action.color.includes('emerald') ? 'from-emerald-500 to-teal-600' : 'from-orange-500 to-red-600'} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className={`font-semibold ${action.textColor} mb-2`}>{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Generated viral TikTok script', time: '2 hours ago', icon: Sparkles, color: 'text-violet-600' },
                { action: 'Uploaded new training materials', time: '5 hours ago', icon: Upload, color: 'text-blue-600' },
                { action: 'AI conversation completed', time: '1 day ago', icon: Bot, color: 'text-emerald-600' },
                { action: 'Analytics report generated', time: '2 days ago', icon: BarChart, color: 'text-orange-600' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-xl bg-gray-100 ${item.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out 
        ${isMobile ? 'w-80' : 'w-72'}
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Logo size="medium" />
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(false)}
                className="rounded-2xl"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* User Profile Card */}
          <Card className="mb-6 rounded-3xl border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
            <CardContent className="p-4">
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
                  <div className="flex items-center gap-2">
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 rounded-full text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Creator
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-2xl text-left transition-all duration-200 group ${
                    activePage === item.id
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${
                    activePage === item.id ? 'text-white' : ''
                  }`} />
                  <span className="font-medium">{item.name}</span>
                  {activePage === item.id && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Upgrade Card */}
          <Card className="mt-8 rounded-3xl border-0 shadow-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                <h3 className="font-bold mb-1">Upgrade to Pro</h3>
                <p className="text-sm text-violet-100 mb-3">
                  Unlock unlimited AI generations
                </p>
                <Button 
                  className="w-full bg-white text-violet-600 hover:bg-gray-100 rounded-2xl font-semibold"
                  size="sm"
                >
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isMobile ? '' : 'ml-72'}`}>
        {/* Header Mobile */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(true)}
              className="rounded-2xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo size="small" />
            <div className="w-10" />
          </div>
        )}

        {/* Page Content */}
        <div className={`p-6 md:p-8 ${isMobile ? 'pt-4' : ''}`}>
          {renderDashboardContent()}
        </div>
      </div>

      {/* Overlay mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;