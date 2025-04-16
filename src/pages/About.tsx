
import Layout from "@/components/layout/Layout";
import { ArrowRight, BrainCircuit, Lightbulb, Target, Clock, BarChart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const benefits = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-coach-primary" />,
      title: "AI-Powered Personalization",
      description: "Our AI learns your preferences, style, and goals to provide tailored guidance that evolves with you."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-coach-primary" />,
      title: "Creative Inspiration",
      description: "Never run out of ideas with personalized content suggestions and script generation."
    },
    {
      icon: <Target className="h-8 w-8 text-coach-primary" />,
      title: "Strategic Focus",
      description: "Stay on track with your content goals through customized planning and organization."
    },
    {
      icon: <Clock className="h-8 w-8 text-coach-primary" />,
      title: "Time Efficiency",
      description: "Streamline your content creation process and make the most of your available time."
    },
    {
      icon: <BarChart className="h-8 w-8 text-coach-primary" />,
      title: "Growth Insights",
      description: "Get actionable feedback and analytics to continuously improve your content."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-coach-primary" />,
      title: "Unlimited Potential",
      description: "Scale your content creation efforts across multiple platforms and formats."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AI Content Coach</h1>
          <div className="prose max-w-none">
            <p className="text-xl mb-4">
              AI Content Coach was created to democratize content creation and empower creators of all experience levels.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our mission is to make high-quality content creation accessible to everyone, regardless of their background, experience, or available resources. By combining artificial intelligence with proven content strategies, we provide personalized guidance that adapts to each creator's unique journey.
            </p>
            <div className="mt-8">
              <Link to="/onboarding">
                <Button className="gradient-bg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose AI Content Coach?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Personalization</h3>
              <p className="text-muted-foreground mb-4">
                We believe that no two creators are alike. That's why our AI coach learns your unique preferences, goals, and constraints to provide guidance that's specifically tailored to you.
              </p>
              <h3 className="text-xl font-semibold mb-4 mt-6">Continuous Learning</h3>
              <p className="text-muted-foreground">
                The content landscape is always evolving, and so is our AI. We constantly update our knowledge base with the latest trends, strategies, and best practices to ensure you stay ahead.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Practical Guidance</h3>
              <p className="text-muted-foreground mb-4">
                We focus on actionable advice that you can immediately apply to your content creation process, from ideation to production to promotion.
              </p>
              <h3 className="text-xl font-semibold mb-4 mt-6">Empowerment</h3>
              <p className="text-muted-foreground">
                Our goal is not just to help you create better content, but to help you become a better creator. We provide the tools, resources, and knowledge you need to grow and succeed on your own terms.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of creators and discover how AI Content Coach can help you take your content to the next level.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="gradient-bg">Start Your Journey Today</Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default About;
