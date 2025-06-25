import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScriptGeneratorProps {
  onScriptGenerated: (script: string) => void;
}

const ScriptGenerator = ({ onScriptGenerated }: ScriptGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    contentType: "video",
    audienceType: "beginners",
    duration: "5-10 minutes",
    tone: "conversational",
    keyPoints: ""
  });
  const { toast } = useToast();

  const contentTypes = [
    { value: "video", label: "Video" },
    { value: "blog", label: "Blog Post" },
    { value: "podcast", label: "Podcast" },
    { value: "social", label: "Social Media Post" }
  ];

  const audienceTypes = [
    { value: "beginners", label: "Beginners" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "mixed", label: "Mixed Audience" }
  ];

  const durations = [
    { value: "1-3 minutes", label: "1-3 minutes" },
    { value: "5-10 minutes", label: "5-10 minutes" },
    { value: "10-20 minutes", label: "10-20 minutes" },
    { value: "20+ minutes", label: "20+ minutes" }
  ];

  const tones = [
    { value: "conversational", label: "Conversational" },
    { value: "professional", label: "Professional" },
    { value: "educational", label: "Educational" },
    { value: "entertaining", label: "Entertaining" },
    { value: "inspiring", label: "Inspiring" }
  ];
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = () => {
    if (!formData.title) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a title for your content."
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate a fake script based on the input
      const script = generateSampleScript(formData);
      
      onScriptGenerated(script);
      setIsGenerating(false);
      
      toast({
        title: "Script Generated!",
        description: "Your personalized script is ready.",
      });
    }, 2000);
  };
  
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Generate a Personalized Script</h2>
          <p className="text-muted-foreground">
            Provide some details about the content you want to create
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Content Title/Topic</Label>
            <Input
              id="title"
              placeholder="E.g., 'Beginner's Guide to iPhone Photography'"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select 
                value={formData.contentType} 
                onValueChange={(value) => handleChange("contentType", value)}
              >
                <SelectTrigger id="contentType">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="audienceType">Target Audience</Label>
              <Select 
                value={formData.audienceType} 
                onValueChange={(value) => handleChange("audienceType", value)}
              >
                <SelectTrigger id="audienceType">
                  <SelectValue placeholder="Select audience type" />
                </SelectTrigger>
                <SelectContent>
                  {audienceTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration">Duration/Length</Label>
              <Select 
                value={formData.duration} 
                onValueChange={(value) => handleChange("duration", value)}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tone">Content Tone</Label>
              <Select 
                value={formData.tone} 
                onValueChange={(value) => handleChange("tone", value)}
              >
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map(tone => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="keyPoints">Key Points to Cover (Optional)</Label>
            <Textarea
              id="keyPoints"
              placeholder="List any specific points you want to include in your content..."
              className="h-24"
              value={formData.keyPoints}
              onChange={(e) => handleChange("keyPoints", e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          className="w-full gradient-bg"
          onClick={handleSubmit}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Script
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

// Function to generate a sample script based on form data
function generateSampleScript(formData: any) {
  const {title, contentType, audienceType, tone} = formData;
  
  let intro = '';
  let mainContent = '';
  let conclusion = '';
  
  // Introduction
  if (contentType === 'video') {
    intro = `[Camera facing you, friendly smile]\n\nHey everyone! Welcome back to the channel. Today we're going to be diving into ${title}. Whether you're ${audienceType === 'beginners' ? 'just starting out' : audienceType === 'advanced' ? 'an expert looking to refine your skills' : 'looking to take your skills to the next level'}, this video is going to give you some amazing insights.`;
  } else if (contentType === 'blog') {
    intro = `# ${title}\n\nIn today's fast-paced world, mastering ${title} can give you a significant advantage. This comprehensive guide will walk you through everything you need to know, regardless of your current expertise level.`;
  } else if (contentType === 'podcast') {
    intro = `[Upbeat intro music fades]\n\nHello and welcome to another episode of your favorite podcast! I'm your host, and today we're exploring ${title}. I'm really excited about this topic because it's something that can truly transform how you approach content creation.`;
  } else {
    intro = `📱 **${title}** 📱\n\nWant to level up your skills? Here's what you need to know about ${title}! #ContentCreation #Tips`;
  }
  
  // Main content
  if (contentType === 'video' || contentType === 'podcast') {
    mainContent = `
Let's break this down into three key areas:

1. **Understanding the Basics**
   ${audienceType === 'beginners' ? "If you're just starting out, don't worry! We're going to cover all the fundamentals." : "Let's quickly refresh on the basics before diving deeper."}
   The most important thing to remember is that consistency is key to success.

2. **Advanced Techniques**
   Now, let's get into some strategies that will help you stand out from the crowd:
   - Focus on creating value for your audience
   - Develop a unique style that represents your personal brand
   - Use tools and resources efficiently to maximize your productivity

3. **Common Mistakes to Avoid**
   Here are some pitfalls I've seen many creators make:
   - Trying to please everyone instead of focusing on your target audience
   - Inconsistent posting schedule
   - Not engaging with your community
`;
  } else if (contentType === 'blog') {
    mainContent = `
## Understanding the Fundamentals

When approaching ${title}, it's essential to first master the core concepts. This foundation will support everything else you build.

### Key Principles to Remember

1. **Focus on Quality Over Quantity**
   Creating valuable content consistently is more important than producing large volumes of mediocre work.

2. **Know Your Audience Deeply**
   Research and understand who you're creating for. What are their pain points? What solutions are they seeking?

3. **Develop Your Unique Voice**
   In a crowded digital landscape, your authentic perspective is your greatest asset.

## Advanced Strategies for Growth

Once you've mastered the basics, these strategies will help you scale your efforts:

* **Content Repurposing** - Learn how to transform one piece of content into multiple formats
* **Community Building** - Techniques for fostering engagement and loyalty
* **Data-Driven Decision Making** - Using analytics to refine your approach
`;
  } else {
    mainContent = `
Here are 3 game-changing tips for ${title}:

1️⃣ Start with a clear goal for each piece of content
2️⃣ Batch your content creation to save time
3️⃣ Use analytics to understand what resonates with your audience

Want to learn more? Check out my profile for a free guide! 👆
`;
  }
  
  // Conclusion
  if (contentType === 'video') {
    conclusion = `
[Close up shot]

So there you have it! I hope this guide to ${title} has been helpful. If you enjoyed this video, please give it a thumbs up and subscribe for more content like this. Drop your questions in the comments below, and I'll do my best to answer them.

Until next time, keep creating amazing content!

[Outro with logo and social media handles]
`;
  } else if (contentType === 'blog') {
    conclusion = `
## Conclusion

Mastering ${title} is a journey rather than a destination. As you implement these strategies, remember to track your progress and adjust as needed. The digital landscape is constantly evolving, and your approach should evolve with it.

I'd love to hear your experiences with ${title} in the comments below. What challenges have you faced? What strategies have worked well for you?

*If you found this guide helpful, please share it with others who might benefit!*
`;
  } else if (contentType === 'podcast') {
    conclusion = `
Before we wrap up today's episode on ${title}, I want to remind you that success doesn't happen overnight. It's about consistent effort and continuous learning.

If you enjoyed this episode, please rate and review us on your favorite podcast platform. It helps us reach more people like you who are passionate about content creation.

Next week, we'll be discussing [related topic], so make sure you're subscribed so you don't miss it!

[Outro music fades in]

This has been another episode of [Podcast Name]. Until next time, keep creating and inspiring!

[Music fades out]
`;
  } else {
    conclusion = `
Don't forget to like, comment, and share if this was helpful! 

What topic should I cover next? Let me know below! 👇

#ContentCreator #${title.replace(/\s+/g, '')} #DigitalMarketing
`;
  }
  
  return `${intro}\n\n${mainContent}\n\n${conclusion}`;
}

export default ScriptGenerator;
