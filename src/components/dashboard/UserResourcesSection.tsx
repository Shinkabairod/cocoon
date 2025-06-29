import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Brain, 
  Users, 
  Video
} from "lucide-react";

const UserResourcesSection = () => {
  const userResourcesSections = [
    {
      id: "user-info",
      title: "User Info",
      icon: <User className="h-5 w-5" />,
      description: "Your profile and preferences",
      items: ["Experience Level: Intermediate", "Content Goals: Build a brand", "Target Audience: Millennials"]
    },
    {
      id: "skills-knowledge",
      title: "Skills & Knowledge",
      icon: <Brain className="h-5 w-5" />,
      description: "Your current skills and areas for improvement",
      items: ["Video Editing: Beginner", "Storytelling: Intermediate", "SEO: Needs improvement"]
    },
    {
      id: "community",
      title: "Community Sharing",
      icon: <Users className="h-5 w-5" />,
      description: "Connect with other creators",
      items: ["3 Active discussions", "5 Shared scripts", "12 Community members"]
    },
    {
      id: "training-videos",
      title: "Training Videos",
      icon: <Video className="h-5 w-5" />,
      description: "Continuous learning content",
      items: ["Advanced Storytelling", "Mobile Filming", "Content Strategy"]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userResourcesSections.map((section) => (
          <Card key={section.id} variant="neomorphic" className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  {section.icon}
                </div>
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-coach-primary mr-2"></div>
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserResourcesSection;