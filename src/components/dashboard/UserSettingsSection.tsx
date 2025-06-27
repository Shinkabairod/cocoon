import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  ArrowRight, 
  FileText, 
  BarChart, 
  FolderOpen, 
  Sparkles,
  Target,
  Calendar,
  Upload,
  CheckCircle,
  Crown,
  Zap,
  Edit,
  Shield,
  Bell,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useToast } from '@/hooks/use-toast';

const UserSettingsSection = () => {
  const { user } = useAuth();
  const { onboardingData } = useOnboarding();
  const { toast } = useToast();

  // Informations utilisateur extraites des données
  const getUserInfo = () => {
    return {
      name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Creator',
      email: user?.email || '',
      status: 'Content Creator',
      experienceLevel: onboardingData?.experienceLevel || 'Not defined',
      niche: onboardingData?.niche || 'Not defined',
      platforms: onboardingData?.platforms || [],
      contentGoal: onboardingData?.contentGoal || 'Not defined'
    };
  };

  const userInfo = getUserInfo();

  const navigateToSection = (section: string) => {
    toast({
      title: `Navigating to ${section}`,
      description: "Feature coming soon!",
    });
  };

  const nextSteps = [
    {
      title: 'Complete My Profile',
      description: 'Update your creator information and preferences',
      icon: <User className="h-5 w-5" />,
      action: () => navigateToSection('profile'),
      completed: onboardingData?.experienceLevel && onboardingData?.niche,
      color: 'from-violet-50 to-purple-50 border-violet-200',
      textColor: 'text-violet-700'
    },
    {
      title: 'Organize Workspace',
      description: 'Upload files and organize your resources',
      icon: <FolderOpen className="h-5 w-5" />,
      action: () => navigateToSection('workspace'),
      completed: false,
      color: 'from-blue-50 to-cyan-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      title: 'Explore AI Tools',
      description: 'Discover personalized content generators',
      icon: <Sparkles className="h-5 w-5" />,
      action: () => navigateToSection('tools'),
      completed: false,
      color: 'from-emerald-50 to-teal-50 border-emerald-200',
      textColor: 'text-emerald-700'
    },
    {
      title: 'View Dashboard',
      description: 'Access your stats and main resources',
      icon: <BarChart className="h-5 w-5" />,
      action: () => navigateToSection('dashboard'),
      completed: false,
      color: 'from-orange-50 to-red-50 border-orange-200',
      textColor: 'text-orange-700'
    }
  ];

  const settingsCategories = [
    {
      title: 'Account Settings',
      description: 'Manage your personal information',
      icon: <User className="h-6 w-6" />,
      color: 'from-violet-500 to-purple-600',
      items: ['Profile Information', 'Email Preferences', 'Password & Security']
    },
    {
      title: 'AI Preferences',
      description: 'Customize your AI assistant behavior',
      icon: <Sparkles className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-600',
      items: ['Content Style', 'Response Length', 'Platform Focus']
    },
    {
      title: 'Notifications',
      description: 'Control what updates you receive',
      icon: <Bell className="h-6 w-6" />,
      color: 'from-emerald-500 to-teal-600',
      items: ['Email Notifications', 'Push Notifications', 'Weekly Reports']
    },
    {
      title: 'Billing & Plans',
      description: 'Manage your subscription',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'from-orange-500 to-red-600',
      items: ['Current Plan', 'Payment Methods', 'Usage Statistics']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-violet-600" />
            Account Settings
          </h2>
          <p className="text-gray-600 mt-2">
            Manage your account and track your progress
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-600 text-white text-2xl font-bold">
                    {userInfo.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full p-2 shadow-lg">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{userInfo.name}</h3>
                  <p className="text-gray-600">{userInfo.email}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className="bg-violet-100 text-violet-700 border-violet-200 rounded-full px-3 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    {userInfo.status}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-full px-3 py-1">
                    {userInfo.experienceLevel}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="h-4 w-4 text-violet-600" />
                    <span><strong>Niche:</strong> {userInfo.niche}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span><strong>Goal:</strong> {userInfo.contentGoal}</span>
                  </div>
                  {userInfo.platforms.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span><strong>Platforms:</strong> {userInfo.platforms.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl px-6 py-3 shadow-lg">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Complete Your Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nextSteps.map((step, index) => (
            <Card 
              key={index} 
              className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${step.color} rounded-3xl hover:scale-105`}
              onClick={step.action}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${step.color.includes('violet') ? 'from-violet-500 to-purple-600' : step.color.includes('blue') ? 'from-blue-500 to-cyan-600' : step.color.includes('emerald') ? 'from-emerald-500 to-teal-600' : 'from-orange-500 to-red-600'} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>
                
                <h4 className={`font-semibold ${step.textColor} mb-2`}>{step.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${step.textColor}`}>
                    {step.completed ? 'Completed' : 'Pending'}
                  </span>
                  <ArrowRight className={`h-4 w-4 ${step.textColor} group-hover:translate-x-1 transition-transform`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings Categories */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingsCategories.map((category, index) => {
            const Icon = category.icon.type;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">{category.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group/item"
                      >
                        <span className="text-sm font-medium text-gray-700">{item}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover/item:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upgrade Section */}
      <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-r from-violet-500 via-purple-600 to-blue-600 text-white overflow-hidden">
        <CardContent className="p-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="20" cy="20" r="2" fill="white">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="30" r="1.5" fill="white">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="70" r="2.5" fill="white">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-3xl mb-4 backdrop-blur-sm">
                <Crown className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Upgrade to Cocoon Pro</h3>
              <p className="text-violet-100 text-lg">
                Unlock unlimited AI generations and advanced features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Zap, label: 'Unlimited AI Chats' },
                { icon: Sparkles, label: 'Advanced Templates' },
                { icon: Shield, label: 'Priority Support' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" />
                    <span className="text-sm font-medium text-white">{feature.label}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-violet-600 hover:bg-gray-100 rounded-2xl font-semibold px-8 py-3 shadow-lg"
                size="lg"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade Now - $19/month
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl font-semibold px-8 py-3"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Account Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50 border border-red-200">
              <div>
                <h4 className="font-semibold text-red-900">Export Data</h4>
                <p className="text-sm text-red-700">Download all your account data</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 rounded-2xl">
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50 border border-red-200">
              <div>
                <h4 className="font-semibold text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700">Permanently delete your account and data</p>
              </div>
              <Button variant="destructive" className="rounded-2xl">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsSection;