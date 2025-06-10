
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Video, Mic, Sparkles, Zap, Target, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const quickFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "AI Scripts",
      description: "Get personalized content in seconds"
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Smart Strategy",
      description: "Grow faster with AI guidance"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Audience Growth",
      description: "Build your community effortlessly"
    }
  ];
  
  const contentTypes = [
    { icon: <Video className="h-6 w-6" />, label: "Videos", color: "bg-coach-primary" },
    { icon: <Book className="h-6 w-6" />, label: "Blogs", color: "bg-coach-secondary" },
    { icon: <Mic className="h-6 w-6" />, label: "Podcasts", color: "bg-coach-accent" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b w-full py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center animate-float">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">AI Content Coach</h1>
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link to="/onboarding">
            <Button className="gradient-bg">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section - Mobile First */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center max-w-md">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your AI <span className="gradient-text">Content Coach</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              Create amazing content with personalized AI guidance. Perfect for beginners and pros.
            </p>
            
            <div className="space-y-3">
              <Link to="/onboarding" className="block">
                <Button size="lg" className="gradient-bg text-white w-full">
                  Start Creating
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Types - Quick Visual */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-md">
            <h2 className="text-xl font-semibold text-center mb-6">Create Any Content</h2>
            <div className="flex justify-center gap-4">
              {contentTypes.map((type, index) => (
                <div key={index} className="text-center">
                  <div className={`w-14 h-14 rounded-full ${type.color} flex items-center justify-center mb-2 mx-auto`}>
                    <div className="text-white">{type.icon}</div>
                  </div>
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Quick Features - Card Style */}
        <section className="py-8 px-4 bg-muted">
          <div className="container mx-auto max-w-md">
            <h2 className="text-xl font-semibold text-center mb-6">
              Everything You Need in <span className="gradient-text">One App</span>
            </h2>
            
            <div className="space-y-4">
              {quickFeatures.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-4 shadow-sm border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - Simple & Direct */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Go Viral?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join creators who are using AI to create better content faster.
            </p>
            
            <Link to="/onboarding">
              <Button size="lg" className="gradient-bg text-white w-full">
                Start Your Journey
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required • Get started in 2 minutes
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
