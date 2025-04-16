
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookText, Calendar, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScriptGenerator from "@/components/script-generator/ScriptGenerator";
import ScriptViewer from "@/components/script-generator/ScriptViewer";

const Dashboard = () => {
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  
  const sampleResources = [
    {
      title: "Ultimate Guide to YouTube Success",
      type: "E-Book",
      icon: <BookText className="h-5 w-5" />
    },
    {
      title: "How to Film Professionally with a Smartphone",
      type: "Video Tutorial",
      icon: <BookText className="h-5 w-5" />
    },
    {
      title: "Content Calendar Template 2025",
      type: "Template",
      icon: <Calendar className="h-5 w-5" />
    }
  ];
  
  const handleScriptGenerated = (script: string) => {
    setGeneratedScript(script);
  };
  
  const handleEditRequest = () => {
    setGeneratedScript(null);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening with your content journey</p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-coach-primary to-coach-secondary text-white text-xl">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div>
          {!generatedScript ? (
            <ScriptGenerator onScriptGenerated={handleScriptGenerated} />
          ) : (
            <ScriptViewer script={generatedScript} onEditRequest={handleEditRequest} />
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-coach-primary" />
                Scripts
              </CardTitle>
              <CardDescription>
                Create and manage your content scripts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Generated this month</div>
              </div>
              <Link to="/dashboard/scripts">
                <Button variant="outline" className="w-full">
                  View All Scripts <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-coach-primary" />
                Content Calendar
              </CardTitle>
              <CardDescription>
                Plan and schedule your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Upcoming content pieces</div>
              </div>
              <Link to="/dashboard/calendar">
                <Button variant="outline" className="w-full">
                  View Calendar <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-coach-primary" />
                AI Coach
              </CardTitle>
              <CardDescription>
                Get personalized guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-sm text-muted-foreground">Left in trial period</div>
              </div>
              <Link to="/dashboard/coach">
                <Button variant="outline" className="w-full">
                  Chat with Coach <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleResources.map((resource, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {resource.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
