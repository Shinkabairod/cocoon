
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Video, Mic, Sparkles, FileText, Target, Camera, Users, Clock } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-coach-primary" />,
      title: "Personalized Scripts",
      description: "Get tailored scripts based on your personality, goals, and audience preferences."
    },
    {
      icon: <Target className="h-8 w-8 text-coach-primary" />,
      title: "Content Strategy",
      description: "Develop a focused content strategy that aligns with your long-term goals."
    },
    {
      icon: <Camera className="h-8 w-8 text-coach-primary" />,
      title: "Production Guidance",
      description: "Receive step-by-step guidance on how to film, record, and edit your content."
    },
    {
      icon: <Users className="h-8 w-8 text-coach-primary" />,
      title: "Audience Growth",
      description: "Learn strategies to grow your audience and increase engagement."
    },
    {
      icon: <Clock className="h-8 w-8 text-coach-primary" />,
      title: "Time Management",
      description: "Optimize your content creation process to make the most of your available time."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-coach-primary" />,
      title: "AI-Powered Creativity",
      description: "Overcome creative blocks with AI-generated ideas and inspiration."
    }
  ];
  
  const contentTypes = [
    { icon: <Video className="h-8 w-8" />, label: "Videos" },
    { icon: <Book className="h-8 w-8" />, label: "Blogs" },
    { icon: <Mic className="h-8 w-8" />, label: "Podcasts" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Personal <span className="gradient-text">Content Creation Coach</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your content creation journey with personalized AI guidance tailored to your unique style, goals, and available resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="gradient-bg text-white">Get Started</Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
          
          {/* Content Types */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Create Any Type of Content</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {contentTypes.map((type, index) => (
                <div key={index} className="flex flex-col items-center p-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    {type.icon}
                  </div>
                  <span className="text-lg font-medium">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to <span className="gradient-text">Create Amazing Content</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are using AI to streamline their content creation process and reach new heights.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="gradient-bg text-white">Start Your Journey Today</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
