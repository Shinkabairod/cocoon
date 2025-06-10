
import Layout from "@/components/layout/Layout";
import BottomNavigation from "@/components/mobile/BottomNavigation";
import IconGrid from "@/components/mobile/IconGrid";
import AICoach from "@/components/mobile/AICoach";
import ContentLibrary from "@/components/content/ContentLibrary";
import ContentCalendar from "@/components/content/ContentCalendar";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  BookOpen,
  Target
} from "lucide-react";
import useContentLibrary from "@/hooks/useContentLibrary";

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { contents } = useContentLibrary();

  const stats = [
    { label: "Total Content", value: "24", icon: <BookOpen className="h-4 w-4" />, change: "+3 this week" },
    { label: "Views", value: "12.5K", icon: <TrendingUp className="h-4 w-4" />, change: "+15%" },
    { label: "Followers", value: "1.2K", icon: <Users className="h-4 w-4" />, change: "+8%" },
    { label: "Engagement", value: "4.8%", icon: <Star className="h-4 w-4" />, change: "+0.3%" }
  ];

  const quickActions = [
    { icon: <Play className="h-5 w-5" />, label: "New Video", color: "bg-red-500" },
    { icon: <BookOpen className="h-5 w-5" />, label: "Write Blog", color: "bg-blue-500" },
    { icon: <Calendar className="h-5 w-5" />, label: "Schedule", color: "bg-green-500" },
    { icon: <Target className="h-5 w-5" />, label: "Analytics", color: "bg-purple-500" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <IconGrid />;
      case 'coach':
        return <AICoach />;
      case 'library':
        return <ContentLibrary contents={contents} />;
      case 'calendar':
        return <ContentCalendar contents={contents} />;
      default:
        return (
          <div className="p-4 space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
              <h2 className="text-xl font-bold mb-2">Welcome back!</h2>
              <p className="text-sm opacity-90">Ready to create amazing content today?</p>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-xs">Progress: step 10/22</span>
                <Progress value={45} className="flex-1 h-2" />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Card key={index} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <span className="font-medium text-sm">{action.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="font-semibold mb-3">Your Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-green-600">{stat.change}</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <Card className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Published "My Story"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Video</Badge>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Started "Creative Tips" draft</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Blog</Badge>
                  </div>
                </Card>
              </div>
            </div>

            {/* AI Suggestions */}
            <div>
              <h3 className="font-semibold mb-3">AI Suggestions</h3>
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">Time for a new video!</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Based on your audience engagement, Tuesday evenings work best for you.
                    </p>
                    <Button size="sm" className="text-xs">
                      Create Video
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 overflow-auto pb-20">
        {renderContent()}
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MobileDashboard;
