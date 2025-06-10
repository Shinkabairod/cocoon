
import { Resource, ResourceTopic } from "@/types/onboarding";

export const generateRecommendedResources = (): Resource[] => {
  return [
    {
      id: "1",
      type: "PDF",
      topic: "Storytelling",
      title: "The Art of Storytelling for Content Creators",
      description: "Learn to captivate your audience with memorable and engaging stories.",
      selected: false
    },
    {
      id: "2",
      type: "Video",
      topic: "Storytelling",
      title: "Narrative Structure for Short Videos",
      description: "Storytelling techniques adapted for short formats (TikTok, Instagram Reels).",
      selected: false
    },
    {
      id: "3",
      type: "Book",
      topic: "Storytelling",
      title: "The Hero with a Thousand Faces",
      description: "Fundamental principles of the hero's journey and its application in content creation.",
      selected: false
    },
    {
      id: "4",
      type: "Course",
      topic: "Camera Techniques",
      title: "Mastering Video Fundamentals with Smartphone",
      description: "Professional techniques for filming with a mobile phone.",
      selected: false
    },
    {
      id: "5",
      type: "Template",
      topic: "Scripting",
      title: "Script Templates for Different Video Formats",
      description: "Collection of templates for vlogs, tutorials, interviews and more.",
      selected: false
    },
    {
      id: "6",
      type: "PDF",
      topic: "Editing",
      title: "Essential Video Editing Techniques Guide",
      description: "Fundamental editing principles for beginners and intermediates.",
      selected: false
    },
    {
      id: "7",
      type: "Tool",
      topic: "Content Planning",
      title: "Optimized Editorial Calendar",
      description: "Plan your content strategically with this customizable template.",
      selected: false
    },
    {
      id: "8",
      type: "Community",
      topic: "Business Strategy",
      title: "English-Speaking Content Creators Community",
      description: "Join a group of creators to exchange tips and get feedback.",
      selected: false
    },
    {
      id: "9",
      type: "PDF",
      topic: "SEO",
      title: "SEO for Video Content Creators",
      description: "Optimize your videos for search engines and increase your visibility.",
      selected: false
    }
  ];
};

export const getResourceTopics = (): ResourceTopic[] => {
  return [
    "Storytelling",
    "Camera Techniques",
    "Editing",
    "Scripting",
    "Business Strategy",
    "SEO",
    "Marketing",
    "Content Planning",
    "Analytics"
  ];
};
