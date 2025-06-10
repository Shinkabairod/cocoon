
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import BottomNavigation from '@/components/mobile/BottomNavigation';
import CharacterAvatar from '@/components/character/CharacterAvatar';
import CharacterProgress from '@/components/character/CharacterProgress';
import CharacterEvolution from '@/components/character/CharacterEvolution';
import ContentLibrary from '@/components/content/ContentLibrary';
import ContentCalendar from '@/components/content/ContentCalendar';
import { useCharacter } from '@/hooks/useCharacter';
import useContentLibrary from '@/hooks/useContentLibrary';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Zap, 
  Trophy,
  BookOpen,
  Brain,
  Lightbulb,
  Palette,
  FileText,
  Clock,
  CheckCircle,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Plus,
  Star,
  Award
} from 'lucide-react';

type TabType = 'home' | 'library' | 'calendar' | 'character' | 'analytics';

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const character = useCharacter();
  const { contents, addContent, updateContent } = useContentLibrary();

  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Target },
    { id: 'library' as TabType, label: 'Library', icon: BookOpen },
    { id: 'calendar' as TabType, label: 'Calendar', icon: Calendar },
    { id: 'character' as TabType, label: 'Character', icon: Star },
    { id: 'analytics' as TabType, label: 'Analytics', icon: TrendingUp },
  ];

  const dailyChallenges = [
    { id: 1, title: 'Write a catchy hook', completed: false, xp: 50 },
    { id: 2, title: 'Create a content outline', completed: true, xp: 75 },
    { id: 3, title: 'Engage with 10 posts', completed: false, xp: 25 }
  ];

  const recentAchievements = [
    { id: 1, title: 'First Script Created', description: 'Created your first script', unlocked: true },
    { id: 2, title: 'Content Creator', description: 'Published 5 pieces of content', unlocked: false }
  ];

  const handleEditContent = (content: any) => {
    console.log('Edit content:', content);
  };

  const handleScheduleContent = (content: any) => {
    console.log('Schedule content:', content);
  };

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Character Section */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Creator</h3>
          <Badge className="gradient-bg text-white">Level {character.level}</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <CharacterAvatar character={character} size="lg" />
          <div className="flex-1">
            <h4 className="font-medium">{character.name}</h4>
            <p className="text-sm text-muted-foreground">{character.type} • {character.stage}</p>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>XP</span>
                <span>{character.xp}/{character.xpToNextLevel}</span>
              </div>
              <Progress value={(character.xp / character.xpToNextLevel) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Daily Challenges */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Daily Challenges</h3>
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          {dailyChallenges.map(challenge => (
            <div key={challenge.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <CheckCircle className={`h-5 w-5 ${challenge.completed ? 'text-green-500' : 'text-gray-300'}`} />
                <div>
                  <p className="font-medium text-sm">{challenge.title}</p>
                  <p className="text-xs text-muted-foreground">+{challenge.xp} XP</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{contents.length}</p>
          <p className="text-xs text-muted-foreground">Content Created</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground">Days Active</p>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {recentAchievements.slice(0, 2).map(achievement => (
            <div key={achievement.id} className="flex items-center space-x-3 p-2 border rounded">
              <Trophy className={`h-5 w-5 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-300'}`} />
              <div>
                <p className="font-medium text-sm">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Social Connections */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Connected Accounts</h3>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <Instagram className="h-6 w-6 mx-auto mb-1 text-pink-500" />
            <p className="text-xs">Instagram</p>
          </div>
          <div className="text-center opacity-50">
            <Youtube className="h-6 w-6 mx-auto mb-1" />
            <p className="text-xs">YouTube</p>
          </div>
          <div className="text-center opacity-50">
            <Twitter className="h-6 w-6 mx-auto mb-1" />
            <p className="text-xs">Twitter</p>
          </div>
          <div className="text-center opacity-50">
            <Linkedin className="h-6 w-6 mx-auto mb-1" />
            <p className="text-xs">LinkedIn</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderLibraryTab = () => (
    <ContentLibrary 
      contents={contents}
      onEdit={handleEditContent}
      onSchedule={handleScheduleContent}
    />
  );

  const renderCalendarTab = () => (
    <ContentCalendar contents={contents} />
  );

  const renderCharacterTab = () => (
    <div className="space-y-6">
      <CharacterEvolution character={character} />
      <CharacterProgress character={character} />
      
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">All Achievements</h3>
        <div className="space-y-3">
          {recentAchievements.map(achievement => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded">
              <Award className={`h-6 w-6 ${achievement.unlocked ? 'text-yellow-500' : 'text-gray-300'}`} />
              <div className="flex-1">
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <Badge variant="secondary">Unlocked</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Content Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">1.2k</p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">89</p>
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Growth Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Content Creation</span>
              <span className="text-sm">75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Audience Engagement</span>
              <span className="text-sm">60%</span>
            </div>
            <Progress value={60} />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'library':
        return renderLibraryTab();
      case 'calendar':
        return renderCalendarTab();
      case 'character':
        return renderCharacterTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderHomeTab();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold gradient-text">AI Content Coach</h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'home' && 'Your Creator Dashboard'}
              {activeTab === 'library' && 'Content Library'}
              {activeTab === 'calendar' && 'Editorial Calendar'}
              {activeTab === 'character' && 'Character Evolution'}
              {activeTab === 'analytics' && 'Performance Analytics'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{character.stage}</Badge>
            <CharacterAvatar character={character} size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {renderActiveTab()}
      </main>

      <BottomNavigation 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default MobileDashboard;
